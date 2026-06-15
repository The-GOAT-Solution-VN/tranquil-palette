import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { writeClient } from "@/sanity/lib/writeClient";
import { sanityConfigured } from "@/sanity/env";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1).max(4000),
  company: z.string().optional().default(""), // honeypot
  source: z.enum(["visit", "newsletter", "artwork"]).optional().default("visit"),
  artworkTitle: z.string().max(200).optional(),
});

// Very small in-memory rate limiter (per warm instance) to blunt abuse.
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }
  const data = parsed.data;

  // Honeypot: silently accept (so bots don't learn) but do nothing.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const createdAt = new Date().toISOString();

  // 1) Persist the enquiry in Sanity (best-effort; never blocks the user).
  if (sanityConfigured && process.env.SANITY_API_WRITE_TOKEN) {
    try {
      await writeClient.create({
        _type: "enquiry",
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        source: data.source,
        artworkTitle: data.artworkTitle,
        createdAt,
      });
    } catch {
      /* logged server-side by platform; do not fail the request */
    }
  }

  // 2) Send the notification email via Resend (best-effort).
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || "Tranquil Palette <onboarding@resend.dev>",
        to: process.env.CONTACT_TO_EMAIL,
        replyTo: data.email,
        subject: data.subject || `New enquiry from ${data.name}`,
        html: `
          <h2>New ${escapeHtml(data.source)} enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          ${data.artworkTitle ? `<p><strong>Artwork:</strong> ${escapeHtml(data.artworkTitle)}</p>` : ""}
          <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
        `,
      });
    } catch {
      // If email fails but we stored the enquiry, still report success.
      if (!sanityConfigured) {
        return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
      }
    }
  }

  return NextResponse.json({ ok: true });
}

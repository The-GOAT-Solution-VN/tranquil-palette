"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/lib/i18n";

type Status = "idle" | "loading" | "sent" | "error";

export function ContactForm() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const artwork = searchParams.get("artwork") ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      company: String(data.get("company") ?? ""), // honeypot
      source: artwork ? "artwork" : "visit",
      artworkTitle: artwork || undefined,
    };

    const nextErrors: Record<string, boolean> = {};
    if (!payload.name) nextErrors.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) nextErrors.email = true;
    if (!payload.message) nextErrors.message = true;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const buttonLabel =
    status === "sent" ? t.formSent : status === "loading" ? "…" : t.formBtn;

  return (
    <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="tp-grid-2">
        <input name="name" placeholder={t.formName} aria-label={t.formName} aria-invalid={errors.name || undefined} className="tp-input" style={field(errors.name)} />
        <input name="email" type="email" placeholder={t.formEmail} aria-label={t.formEmail} aria-invalid={errors.email || undefined} className="tp-input" style={field(errors.email)} />
      </div>
      <input name="subject" defaultValue={artwork ? `${t.lbEnquire}: ${artwork}` : ""} placeholder={t.formSubject} aria-label={t.formSubject} className="tp-input" style={field(false)} />
      <textarea name="message" rows={4} placeholder={t.formMessage} aria-label={t.formMessage} aria-invalid={errors.message || undefined} className="tp-input" style={{ ...field(errors.message), resize: "vertical" }} />
      {/* Honeypot — hidden from humans, catches naive bots. */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

      <button
        type="submit"
        disabled={status === "loading" || status === "sent"}
        className={status === "sent" ? "" : "tp-cta-dark"}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#fff",
          background: status === "sent" ? "var(--tp-olive)" : "#2C2C28",
          border: "none",
          padding: 15,
          borderRadius: 2,
          cursor: status === "sent" ? "default" : "pointer",
          transition: "background .3s",
          marginTop: 6,
        }}
      >
        {buttonLabel}
      </button>

      {status === "error" && (
        <div role="alert" style={{ fontSize: 13, color: "#c0392b" }}>{t.formError}</div>
      )}
    </form>
  );
}

function field(invalid: boolean): React.CSSProperties {
  return {
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    color: "#2c2c28",
    padding: "13px 14px",
    border: `1px solid ${invalid ? "#c0392b" : "#e0e0d6"}`,
    borderRadius: 2,
    background: "#fcfcf9",
    outline: "none",
    width: "100%",
  };
}

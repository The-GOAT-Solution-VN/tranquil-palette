"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/** Uppercase overline / eyebrow label. */
export function Eyebrow({
  children,
  color = "var(--tp-olive-label)",
  withRule = false,
  style,
}: {
  children: ReactNode;
  color?: string;
  withRule?: boolean;
  style?: React.CSSProperties;
}) {
  if (withRule) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, ...style }}>
        <span style={{ width: 34, height: 1, background: color }} />
        <span
          style={{
            fontSize: 12,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color,
            fontWeight: 500,
          }}
        >
          {children}
        </span>
      </div>
    );
  }
  return (
    <div
      style={{
        fontSize: 11.5,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Filled pill button (olive or dark), rendered as a link. */
export function PillLink({
  href,
  children,
  variant = "green",
}: {
  href: string;
  children: ReactNode;
  variant?: "green" | "dark";
}) {
  const isGreen = variant === "green";
  return (
    <Link
      href={href}
      className={isGreen ? "tp-cta-green" : "tp-cta-dark"}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "#fff",
        background: isGreen ? "var(--tp-olive)" : "#2C2C28",
        border: "none",
        padding: "16px 32px",
        borderRadius: 999,
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-block",
      }}
    >
      {children}
    </Link>
  );
}

/** Underlined text link (secondary CTA). */
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="tp-link-underline"
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--tp-ink)",
        background: "none",
        padding: "12px 6px",
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-block",
      }}
    >
      {children}
    </Link>
  );
}

/** Framed artwork: white mat + soft shadow around an ArtworkImage child. */
export function Frame({
  children,
  pad = 12,
}: {
  children: ReactNode;
  pad?: number;
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: pad,
        boxShadow: "0 34px 70px -40px rgba(44,44,40,0.45)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

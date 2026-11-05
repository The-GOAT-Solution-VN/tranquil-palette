"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

const footerNav = [
  { href: "/gallery", key: "navGallery" },
  { href: "/about", key: "navAbout" },
  { href: "/journal", key: "navJournal" },
  { href: "/exhibitions", key: "navExhibitions" },
  { href: "/visit", key: "navVisit" },
] as const;

export function Footer() {
  const { t, lang } = useLang();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter",
          email,
          subject: "Newsletter signup",
          message: "Newsletter subscription request",
          source: "newsletter",
        }),
      });
    } catch {
      /* non-blocking */
    }
    setSent(true);
    setEmail("");
  }

  return (
    <footer
      style={{
        position: "relative",
        background: "#27271f",
        color: "#cfcfc4",
        padding: "clamp(54px,8vh,96px) clamp(20px,4.5vw,68px) 36px",
        overflow: "hidden",
      }}
    >
      <Image
        src="/brand/logo-mark.png"
        alt=""
        aria-hidden
        width={220}
        height={220}
        style={{ position: "absolute", bottom: -60, right: "4%", width: 220, height: "auto", opacity: 0.08 }}
      />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto" }}>
        <div
          className="tp-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
            gap: "clamp(24px,3vw,56px)",
            paddingBottom: 48,
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, color: "#f3f1e9", marginBottom: 16 }}>
              Tranquil Palette
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#b1b1a6", fontWeight: 300, margin: 0, maxWidth: 320 }}>
              {t.footerBlurb}
            </p>
          </div>

          <div>
            <div style={footHeadStyle}>{t.footExplore}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {footerNav.map((item) => (
                <Link key={item.href} href={item.href} className="tp-foot-link" style={footLinkStyle}>
                  {t[item.key]}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div style={footHeadStyle}>{t.footVisit}</div>
            <div style={{ fontSize: 14, lineHeight: 1.9, color: "#b1b1a6", fontWeight: 300 }}>
              <div>{t.footAddr1}</div>
              <div>{t.footAddr2}</div>
              <div style={{ marginTop: 10 }}>{t.footHours}</div>
            </div>
          </div>

          <div>
            <div style={footHeadStyle}>{t.footFollow}</div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#b1b1a6", fontWeight: 300, margin: "0 0 16px" }}>
              {t.footNews}
            </p>
            {sent ? (
              <div style={{ fontSize: 13, color: "#EEA71E", letterSpacing: "0.04em" }}>{t.newsletterSent}</div>
            ) : (
              <form onSubmit={subscribe} style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footEmail}
                  aria-label={t.footEmail}
                  style={{
                    flex: 1,
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    color: "#f3f1e9",
                    padding: "11px 12px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: 2,
                    background: "rgba(255,255,255,0.04)",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#27271f",
                    background: "#EEA71E",
                    border: "none",
                    padding: "0 16px",
                    borderRadius: 2,
                    cursor: "pointer",
                  }}
                >
                  {t.newsletterBtn}
                </button>
              </form>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            fontSize: 12,
            color: "#9a9a8e",
            letterSpacing: "0.04em",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>© {new Date().getFullYear()} Tranquil Palette · {lang === "VI" ? "Phạm Hương" : "Kim Pham"}</span>
          <span>Hanoi, Vietnam</span>
        </div>
      </div>
    </footer>
  );
}

const footHeadStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#9a9a8e",
  marginBottom: 20,
};

const footLinkStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#cfcfc4",
  textDecoration: "none",
  fontWeight: 300,
  transition: "color .3s",
};

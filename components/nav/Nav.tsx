"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

const navItems = [
  { href: "/gallery", key: "navGallery" },
  { href: "/about", key: "navAbout" },
  { href: "/journal", key: "navJournal" },
  { href: "/exhibitions", key: "navExhibitions" },
  { href: "/visit", key: "navVisit" },
] as const;

export function Nav() {
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkColor = (href: string) =>
    pathname === href ? "var(--tp-olive)" : "var(--tp-ink)";

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        padding: "16px clamp(20px,4.5vw,68px)",
        background: "rgba(251,250,247,0.8)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(44,44,40,0.08)",
      }}
    >
      <Link href="/" aria-label="Tranquil Palette — home" style={{ display: "block", lineHeight: 0 }}>
        <Image
          src="/brand/logo-full.png"
          alt="Tranquil Palette"
          width={160}
          height={40}
          priority
          style={{ height: 40, width: "auto", display: "block" }}
        />
      </Link>

      {/* Desktop links */}
      <div className="tp-nav-links" style={{ display: "flex", alignItems: "center", gap: "clamp(14px,2vw,34px)" }}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="tp-nav-link"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              letterSpacing: "0.02em",
              color: linkColor(item.href),
              textDecoration: "none",
              transition: "color .3s",
            }}
          >
            {t[item.key]}
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            letterSpacing: "0.12em",
          }}
        >
          <button
            type="button"
            onClick={() => setLang("EN")}
            aria-pressed={lang === "EN"}
            style={langBtn(lang === "EN")}
          >
            EN
          </button>
          <span style={{ color: "#cdcdc4" }}>/</span>
          <button
            type="button"
            onClick={() => setLang("VI")}
            aria-pressed={lang === "VI"}
            style={langBtn(lang === "VI")}
          >
            VI
          </button>
        </div>
        <Link
          href="/visit"
          className="tp-cta-dark"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11.5,
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#FBFAF7",
            background: "#2C2C28",
            border: "none",
            padding: "12px 22px",
            borderRadius: 999,
            cursor: "pointer",
            textDecoration: "none",
            transition: "background .3s, transform .3s",
          }}
        >
          {t.navVisitCta}
        </Link>
        <button
          type="button"
          className="tp-burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
            color: "var(--tp-ink)",
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div
          className="tp-mobile-menu"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(251,250,247,0.98)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(44,44,40,0.08)",
            display: "flex",
            flexDirection: "column",
            padding: "12px clamp(20px,4.5vw,68px) 22px",
            gap: 4,
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                padding: "12px 0",
                fontFamily: "var(--font-serif)",
                fontSize: 22,
                color: linkColor(item.href),
                textDecoration: "none",
                borderBottom: "1px solid rgba(44,44,40,0.06)",
              }}
            >
              {t[item.key]}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

function langBtn(active: boolean): React.CSSProperties {
  return {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-sans)",
    fontSize: 11,
    letterSpacing: "0.12em",
    padding: "2px 4px",
    color: active ? "var(--tp-olive)" : "#6f6f64",
    fontWeight: active ? 600 : 400,
  };
}

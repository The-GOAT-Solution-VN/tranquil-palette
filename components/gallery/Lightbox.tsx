"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { toneGradient } from "@/lib/tones";
import type { Artwork } from "@/lib/types";

export function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: Artwork[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const { t, loc } = useLang();
  const dialogRef = useRef<HTMLDivElement>(null);
  const a = items[index];

  const step = useCallback(
    (dir: number) => {
      onIndex((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  // Keyboard: Esc / arrows. Scroll lock + initial focus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        // Simple focus trap within the dialog.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [step, onClose]);

  if (!a) return null;

  const size = a.w && a.h ? `${a.w} × ${a.h} cm` : "";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={loc(a.title) ?? "Artwork"}
      data-testid="lightbox"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(20,20,16,0.92)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px,4vw,56px)",
      }}
    >
      <button type="button" aria-label="Close" onClick={onClose} style={iconBtn(24, 24)}>✕</button>
      <button type="button" aria-label="Previous" data-testid="lb-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} style={{ ...iconBtn(undefined, undefined), left: "clamp(12px,3vw,40px)", top: "50%", transform: "translateY(-50%)" }}>‹</button>
      <button type="button" aria-label="Next" data-testid="lb-next" onClick={(e) => { e.stopPropagation(); step(1); }} style={{ ...iconBtn(undefined, undefined), right: "clamp(12px,3vw,40px)", top: "50%", transform: "translateY(-50%)" }}>›</button>

      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="tp-lb-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1.2fr) minmax(0,0.8fr)",
          gap: "clamp(20px,3vw,52px)",
          alignItems: "center",
          maxWidth: 1180,
          width: "100%",
          outline: "none",
        }}
      >
        <div style={{ background: "#fff", padding: 12, borderRadius: 2, boxShadow: "0 40px 90px -40px rgba(0,0,0,0.6)" }}>
          <div style={{ position: "relative", width: "100%", paddingTop: a.w && a.h ? `${(a.h / a.w) * 100}%` : "120%", background: toneGradient(a.tone) }}>
            {a.image?.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.image.url} alt={loc(a.title) ?? "Artwork"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </div>
        </div>

        <div style={{ color: "#e9e9e1" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a9b389", marginBottom: 14 }}>{loc(a.series)}</div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(30px,3.4vw,46px)", lineHeight: 1.05, margin: "0 0 4px", color: "#fff" }}>{loc(a.title)}</h2>
          <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 20, color: "#b9c293", marginBottom: 24 }}>{a.title.vi}</div>

          <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "10px 24px", margin: "0 0 26px", fontSize: 13.5 }}>
            <dt style={dtStyle}>{t.lbMedium}</dt><dd style={ddStyle}>{loc(a.medium)}</dd>
            {size && (<><dt style={dtStyle}>{t.lbSize}</dt><dd style={ddStyle}>{size}</dd></>)}
            <dt style={dtStyle}>{t.lbYear}</dt><dd style={ddStyle}>{a.year}</dd>
          </dl>

          <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "#b1b1a6", fontWeight: 300, margin: "0 0 26px" }}>{loc(a.note)}</p>

          <Link
            href={`/visit?artwork=${encodeURIComponent(loc(a.title) ?? "")}`}
            className="tp-cta-gold"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-sans)",
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#27271f",
              background: "#EEA71E",
              border: "none",
              padding: "14px 26px",
              borderRadius: 999,
              cursor: "pointer",
              textDecoration: "none",
              transition: "background .3s",
            }}
          >
            {t.lbEnquire}
          </Link>
          <div style={{ marginTop: 22, fontSize: 12, letterSpacing: "0.1em", color: "#9a9a8e" }}>
            {index + 1} / {items.length}
          </div>
        </div>
      </div>
    </div>
  );
}

function iconBtn(top?: number, right?: number): React.CSSProperties {
  return {
    position: "absolute",
    top: top !== undefined ? top : undefined,
    right: right !== undefined ? right : undefined,
    zIndex: 110,
    width: 46,
    height: 46,
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    fontSize: 22,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

const dtStyle: React.CSSProperties = { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a3a396", margin: 0 };
const ddStyle: React.CSSProperties = { margin: 0, color: "#e9e9e1" };

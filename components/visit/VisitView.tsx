"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Atoms";
import { ContactForm } from "./ContactForm";
import type { SiteContent } from "@/lib/types";

export function VisitView({ site }: { site: SiteContent }) {
  const { t, loc } = useLang();

  return (
    <div>
      <section style={{ position: "relative", padding: "clamp(44px,7vh,84px) clamp(20px,4.5vw,68px) clamp(24px,4vh,48px)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -30, width: 220, height: 220, background: "radial-gradient(circle at 45% 40%,#FCEEDD,#F3C49A)", borderRadius: "56% 44% 60% 40%/52% 52% 48% 48%", opacity: 0.5, animation: "tpDrift 17s ease-in-out infinite" }} />
        <Reveal style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow style={{ marginBottom: 18 }}>{t.visitOver}</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(44px,5.6vw,82px)", margin: "0 0 18px", color: "#27271f" }}>{t.visitTitle}</h1>
          <p style={{ maxWidth: 560, margin: "0 auto", fontSize: 16, lineHeight: 1.7, color: "#6a6a60", fontWeight: 300 }}>{t.visitSub}</p>
        </Reveal>
      </section>

      <section style={{ padding: "clamp(24px,4vh,48px) clamp(20px,4.5vw,68px) clamp(60px,9vh,120px)" }}>
        <div className="tp-grid-2" style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "clamp(28px,4vw,64px)", alignItems: "start" }}>
          <Reveal>
            {site.visitInfo.map((v, i) => (
              <div key={i} style={{ padding: "22px 0", borderBottom: "1px solid rgba(44,44,40,0.1)" }}>
                <div style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6f6f64", marginBottom: 10 }}>{loc(v.label)}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 23, color: "#2a2a22", lineHeight: 1.35, whiteSpace: "pre-line" }}>{loc(v.value)}</div>
              </div>
            ))}
            <div style={{ marginTop: 26, position: "relative", overflow: "hidden", borderRadius: 2, background: "linear-gradient(135deg,#EEF2E0,#DDE6C6)" }}>
              <div style={{ position: "relative", width: "100%", paddingTop: "52%", background: "repeating-linear-gradient(45deg,rgba(102,131,49,0.06) 0 12px,transparent 12px 24px)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <Image src="/brand/logo-mark.png" alt="" aria-hidden width={40} height={40} style={{ width: 40, height: "auto", opacity: 0.8 }} />
                <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6c7a4a" }}>{t.mapTag}</span>
              </div>
            </div>
          </Reveal>

          <Reveal style={{ background: "#fff", padding: "clamp(28px,3.5vw,46px)", borderRadius: 3, boxShadow: "0 34px 70px -46px rgba(44,44,40,0.35)", border: "1px solid rgba(44,44,40,0.06)" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(26px,3vw,38px)", margin: "0 0 8px", color: "#27271f" }}>{t.formTitle}</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#6c6c62", fontWeight: 300, margin: "0 0 28px" }}>{t.formSub}</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

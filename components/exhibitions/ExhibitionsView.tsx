"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { ArtworkImage } from "@/components/ArtworkImage";
import { Eyebrow } from "@/components/ui/Atoms";
import type { Exhibition } from "@/lib/types";

export function ExhibitionsView({ exhibitions }: { exhibitions: Exhibition[] }) {
  const { t, loc } = useLang();

  return (
    <div>
      <section style={{ padding: "clamp(44px,7vh,84px) clamp(20px,4.5vw,68px) clamp(24px,4vh,48px)" }}>
        <Reveal style={{ maxWidth: 1320, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow style={{ marginBottom: 18 }}>{t.exPageOver}</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(44px,5.6vw,82px)", margin: "0 0 18px", color: "#27271f" }}>{t.exPageTitle}</h1>
          <p style={{ maxWidth: 540, margin: "0 auto", fontSize: 16, lineHeight: 1.7, color: "#6a6a60", fontWeight: 300 }}>{t.exPageSub}</p>
        </Reveal>
      </section>

      <section style={{ padding: "clamp(24px,4vh,48px) clamp(20px,4.5vw,68px) clamp(60px,9vh,120px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          {exhibitions.map((e) => {
            const color = e.up ? "var(--tp-olive)" : "#9a6410";
            return (
              <Reveal key={e.slug}>
                <article className="tp-card tp-grid-2" style={{ display: "grid", gridTemplateColumns: "0.42fr 0.58fr", gap: "clamp(24px,3.5vw,56px)", alignItems: "center", padding: "clamp(26px,4vh,46px) 0", borderTop: "1px solid rgba(44,44,40,0.12)", cursor: "pointer" }}>
                  <div style={{ overflow: "hidden", borderRadius: 2 }}>
                    <ArtworkImage image={e.image} tone={e.tone} paddingTop="66%" alt={loc(e.name) ?? "Exhibition"} zoom sizes="(max-width:768px) 100vw, 42vw" />
                  </div>
                  <div>
                    <div style={{ display: "inline-block", fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", color, border: `1px solid ${color}`, padding: "5px 12px", borderRadius: 999, marginBottom: 18 }}>{loc(e.status)}</div>
                    <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(28px,3.2vw,42px)", lineHeight: 1.06, margin: "0 0 10px", color: "#27271f" }}>{loc(e.name)}</h2>
                    <div style={{ fontSize: 13, letterSpacing: "0.06em", color: "#6c6c62", marginBottom: 18 }}>{loc(e.dates)} · {e.place}</div>
                    <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "#5d5d54", fontWeight: 300, margin: 0 }}>{loc(e.description)}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}

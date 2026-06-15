"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { ArtworkImage } from "@/components/ArtworkImage";
import { Eyebrow } from "@/components/ui/Atoms";
import type { Post } from "@/lib/types";

export function JournalView({ posts }: { posts: Post[] }) {
  const { t, loc } = useLang();
  const feature = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== feature);

  return (
    <div>
      <section style={{ padding: "clamp(44px,7vh,84px) clamp(20px,4.5vw,68px) clamp(24px,4vh,48px)" }}>
        <Reveal style={{ maxWidth: 1320, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow style={{ marginBottom: 18 }}>{t.journalOver}</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(44px,5.6vw,82px)", margin: "0 0 18px", color: "#27271f" }}>{t.journalPageTitle}</h1>
          <p style={{ maxWidth: 540, margin: "0 auto", fontSize: 16, lineHeight: 1.7, color: "#6a6a60", fontWeight: 300 }}>{t.journalPageSub}</p>
        </Reveal>
      </section>

      <section style={{ padding: "clamp(24px,4vh,48px) clamp(20px,4.5vw,68px) clamp(60px,9vh,120px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          {feature && (
            <Reveal>
              <article className="tp-card tp-grid-2" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "clamp(24px,3.5vw,56px)", alignItems: "center", marginBottom: "clamp(48px,7vh,86px)", cursor: "pointer" }}>
                <div style={{ overflow: "hidden", borderRadius: 2 }}>
                  <ArtworkImage image={feature.image} tone={feature.tone} paddingTop="62%" alt={loc(feature.title) ?? "Journal"} zoom sizes="(max-width:768px) 100vw, 55vw" />
                </div>
                <div>
                  <div style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--tp-gold-label)", marginBottom: 16 }}>{t.featuredPost} · {feature.date}</div>
                  <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(30px,3.6vw,48px)", lineHeight: 1.08, margin: "0 0 18px", color: "#27271f" }}>{loc(feature.title)}</h2>
                  <p style={{ fontSize: 16, lineHeight: 1.8, color: "#5d5d54", fontWeight: 300, margin: "0 0 24px" }}>{loc(feature.excerpt)}</p>
                  <span className="tp-link-underline" style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--tp-ink)", paddingBottom: 4 }}>{t.readMore}</span>
                </div>
              </article>
            </Reveal>
          )}

          <div className="tp-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(20px,2.5vw,40px)" }}>
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <article className="tp-card" style={{ cursor: "pointer" }}>
                  <div style={{ overflow: "hidden", borderRadius: 2, marginBottom: 20 }}>
                    <ArtworkImage image={p.image} tone={p.tone} paddingTop="70%" alt={loc(p.title) ?? "Journal"} zoom sizes="(max-width:768px) 100vw, 33vw" />
                  </div>
                  <div style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--tp-gold-label)", marginBottom: 11 }}>{loc(p.category)} · {p.date}</div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 24, lineHeight: 1.2, margin: "0 0 10px", color: "#2a2a22" }}>{loc(p.title)}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6c6c62", fontWeight: 300, margin: 0 }}>{loc(p.excerpt)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

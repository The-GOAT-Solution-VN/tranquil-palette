"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { ArtworkImage } from "@/components/ArtworkImage";
import { LoopVideo } from "./LoopVideo";
import { Eyebrow, PillLink, Frame } from "@/components/ui/Atoms";
import type { Artwork, SiteContent } from "@/lib/types";

export function AboutView({
  site,
  homeArtwork,
}: {
  site: SiteContent;
  homeArtwork: Artwork | null;
}) {
  const { t, loc } = useLang();
  const story = site.about.story;
  const dropcap = t.dropcap;

  return (
    <div>
      <section style={{ position: "relative", padding: "clamp(44px,7vh,90px) clamp(20px,4.5vw,68px) clamp(30px,5vh,60px)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: "8%", width: 200, height: 200, background: "radial-gradient(circle at 40% 40%,#E9F0D7,#C2D295)", borderRadius: "60% 40% 50% 50%/55% 50% 50% 45%", opacity: 0.5, animation: "tpFloat 12s ease-in-out infinite" }} />
        <Reveal style={{ position: "relative", zIndex: 2, maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow style={{ marginBottom: 20 }}>{t.aboutPageOver}</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(44px,5.6vw,84px)", lineHeight: 1.02, margin: "0 0 22px", color: "#27271f" }}>{t.aboutPageTitle}</h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: "#6a6a60", fontWeight: 300, fontStyle: "italic", fontFamily: "var(--font-serif)", maxWidth: 640, margin: "0 auto" }}>{loc(site.about.lede)}</p>
        </Reveal>
      </section>

      <section style={{ padding: "clamp(20px,3vh,40px) clamp(20px,4.5vw,68px) clamp(30px,5vh,60px)" }}>
        <div className="tp-grid-2" style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(28px,4vw,72px)", alignItems: "start" }}>
          <Reveal style={{ position: "sticky", top: 100 }}>
            <Frame pad={14}>
              <div style={{ position: "relative", width: "100%", paddingTop: "122%", background: "#E9E4D4", overflow: "hidden" }}>
                <LoopVideo
                  mp4="/video/artist-loop.mp4"
                  webm="/video/artist-loop.webm"
                  poster="/video/artist-poster.jpg"
                  label={t.portraitTag}
                />
              </div>
            </Frame>
            <span style={{ display: "block", marginTop: 14, fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6f64", textAlign: "center" }}>{t.portraitTag}</span>
          </Reveal>
          <Reveal style={{ fontSize: 16.5, lineHeight: 1.9, color: "#54544b", fontWeight: 300 }}>
            <p style={{ margin: "0 0 22px" }}>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 58, lineHeight: 0.7, float: "left", margin: "8px 14px 0 0", color: "var(--tp-olive)" }}>{dropcap}</span>
              {stripDropcap(loc(story[0]) ?? "", dropcap)}
            </p>
            <p style={{ margin: "0 0 22px" }}>{loc(story[1])}</p>
            <p style={{ margin: "0 0 22px" }}>{loc(story[2])}</p>
            <p style={{ margin: 0 }}>{loc(story[3])}</p>
          </Reveal>
        </div>
      </section>

      <section style={{ marginTop: "clamp(30px,5vh,60px)", padding: "clamp(46px,7vh,86px) clamp(20px,4.5vw,68px)", background: "linear-gradient(180deg,#F4F6EC,#EEF2E0)" }}>
        <div className="tp-stats-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "clamp(16px,2.5vw,40px)" }}>
          {site.stats.map((st, i) => (
            <Reveal key={st.value + i} delay={i * 80} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(44px,5vw,68px)", color: "var(--tp-olive)", lineHeight: 1 }}>{st.value}</div>
              <div style={{ fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6c6c62", marginTop: 10 }}>{loc(st.label)}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ padding: "clamp(46px,7vh,90px) clamp(20px,4.5vw,68px)" }}>
        <div className="tp-grid-2" style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "clamp(28px,4vw,68px)", alignItems: "center" }}>
          <Reveal>
            <Eyebrow color="var(--tp-gold-label)" style={{ marginBottom: 18 }}>{t.homeGalOver}</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(30px,3.6vw,48px)", lineHeight: 1.05, margin: "0 0 22px", color: "#27271f" }}>{t.homeGalTitle}</h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.8, color: "#5d5d54", fontWeight: 300, margin: "0 0 30px" }}>{t.homeGalP}</p>
            <PillLink href="/visit">{t.homeGalCta}</PillLink>
          </Reveal>
          <Reveal>
            <Frame pad={12}>
              <ArtworkImage image={homeArtwork?.image ?? null} tone={homeArtwork?.tone ?? "sage"} paddingTop="78%" alt={loc(homeArtwork?.title) ?? "Gallery"} sizes="(max-width:768px) 100vw, 45vw" />
            </Frame>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/** The seed story[0] begins with the dropcap letter inline; remove it so the
 *  floated dropcap doesn't duplicate. */
function stripDropcap(text: string, cap: string): string {
  return text.startsWith(cap) ? text.slice(cap.length) : text;
}

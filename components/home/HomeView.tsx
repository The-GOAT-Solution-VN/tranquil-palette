"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ArtworkImage } from "@/components/ArtworkImage";
import { LoopVideo } from "@/components/about/LoopVideo";
import { Eyebrow, PillLink, TextLink, Frame } from "@/components/ui/Atoms";
import type { Artwork, Exhibition, Post, SiteContent } from "@/lib/types";

export function HomeView({
  site,
  featured,
  posts,
  exhibition,
}: {
  site: SiteContent;
  featured: Artwork[];
  posts: Post[];
  exhibition: Exhibition | null;
}) {
  const { t, loc } = useLang();

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          padding: "clamp(48px,8vh,110px) clamp(20px,4.5vw,68px) clamp(60px,9vh,120px)",
          overflow: "hidden",
        }}
      >
        <Parallax speed={0.06} style={blob(340, "6%", "-60px", "right", "top")}>
          <div style={{ ...blobInner("radial-gradient(circle at 35% 35%,#FBE3CB,#F3C49A)"), borderRadius: "62% 38% 47% 53% / 55% 47% 53% 45%", filter: "blur(2px)", opacity: 0.6, animation: "tpDrift 16s ease-in-out infinite" }} />
        </Parallax>
        <Parallax speed={-0.04} style={blob(240, "-60px", "-40px", "left", "bottom")}>
          <div style={{ ...blobInner("radial-gradient(circle at 60% 40%,#E9F0D7,#C2D295)"), borderRadius: "46% 54% 62% 38% / 49% 60% 40% 51%", opacity: 0.55, animation: "tpFloatB 13s ease-in-out infinite" }} />
        </Parallax>

        <div
          className="tp-hero-grid"
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1320,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.04fr 0.96fr",
            gap: "clamp(28px,4vw,68px)",
            alignItems: "center",
          }}
        >
          <Reveal>
            <Eyebrow withRule style={{ marginBottom: 26 }}>
              {loc(site.hero.eyebrow)}
            </Eyebrow>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                fontSize: "clamp(46px,6vw,92px)",
                lineHeight: 0.98,
                letterSpacing: "-0.01em",
                margin: "0 0 26px",
                color: "#27271f",
              }}
            >
              {loc(site.hero.titleA)}
              <span style={{ fontStyle: "italic", color: "var(--tp-olive)" }}> {loc(site.hero.titleB)}</span>
            </h1>
            <p style={{ maxWidth: 480, fontSize: 17, lineHeight: 1.75, color: "#5d5d54", margin: "0 0 38px", fontWeight: 300 }}>
              {loc(site.hero.sub)}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
              <PillLink href="/gallery">{t.heroCta1}</PillLink>
              <TextLink href="/about">{t.heroCta2}</TextLink>
            </div>
            <div
              style={{
                display: "flex",
                gap: "clamp(22px,3vw,48px)",
                marginTop: 54,
                paddingTop: 30,
                borderTop: "1px solid rgba(44,44,40,0.1)",
              }}
            >
              {[
                [t.metaHoursL, t.metaHoursV],
                [t.metaMediumL, t.metaMediumV],
                [t.metaWhereL, t.metaWhereV],
              ].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6f6f64", marginBottom: 7 }}>{l}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 21, color: "#33332b" }}>{v}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <div style={{ position: "relative", height: "clamp(420px,62vh,620px)" }}>
            <Parallax speed={0.05} style={{ position: "absolute", top: 0, right: "4%", width: "62%", zIndex: 3 }}>
              <Frame pad={12}>
                <ArtworkImage image={featured[0]?.image ?? null} tone={featured[0]?.tone ?? "sage"} paddingTop="128%" alt={loc(featured[0]?.title) ?? "Artwork"} sizes="40vw" priority />
              </Frame>
            </Parallax>
            <Parallax speed={-0.07} style={{ position: "absolute", bottom: "2%", left: 0, width: "48%", zIndex: 4 }}>
              <Frame pad={10}>
                <ArtworkImage image={featured[1]?.image ?? null} tone={featured[1]?.tone ?? "peach"} paddingTop="118%" alt={loc(featured[1]?.title) ?? "Artwork"} sizes="30vw" />
              </Frame>
            </Parallax>
            <Image
              src="/brand/logo-mark.png"
              alt=""
              aria-hidden
              width={78}
              height={78}
              style={{ position: "absolute", top: "8%", left: "2%", width: 78, height: "auto", opacity: 0.92, zIndex: 5, filter: "drop-shadow(0 12px 24px rgba(44,44,40,0.18))", animation: "tpFloat 9s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section style={{ padding: "clamp(40px,7vh,90px) clamp(20px,4.5vw,68px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 54 }}>
            <Eyebrow color="var(--tp-gold-label)" style={{ marginBottom: 16 }}>{t.featOver}</Eyebrow>
            <h2 style={sectionTitle}>{t.featTitle}</h2>
          </Reveal>
          <div className="tp-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(20px,2.5vw,44px)" }}>
            {featured.slice(0, 3).map((a, i) => (
              <Reveal key={a.id} delay={(i % 3) * 90}>
                <Link href={`/gallery?art=${encodeURIComponent(a.slug)}`} className="tp-card" style={{ textAlign: "left", textDecoration: "none", cursor: "zoom-in", display: "block" }}>
                  <Frame pad={10}>
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <ArtworkImage image={a.image} tone={a.tone} paddingTop="122%" alt={loc(a.title) ?? "Artwork"} zoom sizes="(max-width:768px) 100vw, 33vw" />
                      <div data-cap style={captionStyle}>
                        <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 22, color: "#fff", lineHeight: 1.1 }}>{a.title.vi}</div>
                        <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.82)", marginTop: 8 }}>{t.viewWork}</div>
                      </div>
                    </div>
                  </Frame>
                  <div style={{ paddingTop: 18 }}>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 25, color: "#2a2a22", lineHeight: 1.1 }}>{loc(a.title)}</div>
                    <div style={{ fontSize: 12.5, color: "#6f6f64", marginTop: 7, letterSpacing: "0.02em" }}>
                      {loc(a.series)} · {a.year}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ textAlign: "center", marginTop: 56 }}>
            <TextLink href="/gallery">{t.viewAll}</TextLink>
          </Reveal>
        </div>
      </section>

      {/* EXHIBITION FEATURE */}
      {exhibition && (
        <section
          style={{
            position: "relative",
            margin: "clamp(30px,5vh,70px) 0",
            padding: "clamp(56px,8vh,110px) clamp(20px,4.5vw,68px)",
            background: "linear-gradient(180deg,#F4F6EC,#EEF2E0)",
            overflow: "hidden",
          }}
        >
          <Image src="/brand/logo-mark.png" alt="" aria-hidden width={130} height={130} style={{ position: "absolute", top: -30, right: "5%", width: 130, height: "auto", opacity: 0.12, zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto" }}>
            <Reveal style={{ marginBottom: 48 }}>
              <Eyebrow style={{ marginBottom: 16 }}>{t.exOver}</Eyebrow>
              <h2 style={sectionTitle}>{t.exTitle}</h2>
            </Reveal>
            <div className="tp-grid-2" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "clamp(24px,3.5vw,60px)", alignItems: "center" }}>
              <Reveal>
                <Frame pad={14}>
                  <ArtworkImage image={exhibition.image} tone={exhibition.tone} paddingTop="64%" alt={loc(exhibition.name) ?? "Exhibition"} sizes="(max-width:768px) 100vw, 55vw" />
                </Frame>
              </Reveal>
              <Reveal>
                <div style={{ display: "inline-block", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#27271f", background: "#F47F15", padding: "7px 15px", borderRadius: 999, marginBottom: 20 }}>{t.exBadge}</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(30px,3.4vw,46px)", margin: "0 0 6px", color: "#27271f" }}>{loc(exhibition.name)}</h3>
                <div style={{ fontSize: 13, letterSpacing: "0.08em", color: "#6c6c62", marginBottom: 22 }}>{loc(exhibition.dates)} · {exhibition.place}</div>
                <p style={{ fontSize: 16, lineHeight: 1.75, color: "#5d5d54", fontWeight: 300, margin: "0 0 30px" }}>{loc(exhibition.description)}</p>
                <PillLink href="/exhibitions">{t.exCta}</PillLink>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ABOUT TEASER */}
      <section style={{ padding: "clamp(40px,7vh,90px) clamp(20px,4.5vw,68px)" }}>
        <div className="tp-grid-2" style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: "clamp(28px,4vw,72px)", alignItems: "center" }}>
          <Reveal style={{ position: "relative" }}>
            <Frame pad={12}>
              <div style={{ position: "relative", width: "100%", paddingTop: "124%", background: "#E9E4D4", overflow: "hidden" }}>
                <LoopVideo
                  mp4="/video/artist-loop.mp4"
                  webm="/video/artist-loop.webm"
                  poster="/video/artist-poster.jpg"
                  label={t.portraitTag}
                />
              </div>
            </Frame>
            <span style={{ position: "absolute", left: -14, bottom: -14, fontFamily: "var(--font-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6f6f64", background: "var(--tp-bg)", padding: "4px 8px" }}>{t.portraitTag}</span>
          </Reveal>
          <Reveal>
            <Eyebrow color="var(--tp-gold-label)" style={{ marginBottom: 18 }}>{t.aboutOver}</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(32px,4vw,54px)", lineHeight: 1.04, margin: "0 0 24px", color: "#27271f" }}>{t.aboutTeaseTitle}</h2>
            <p style={teaseP}>{t.aboutTeaseP1}</p>
            <p style={{ ...teaseP, marginBottom: 32 }}>{t.aboutTeaseP2}</p>
            <TextLink href="/about">{t.aboutCta}</TextLink>
          </Reveal>
        </div>
      </section>

      {/* JOURNAL TEASER */}
      <section style={{ padding: "clamp(40px,7vh,90px) clamp(20px,4.5vw,68px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 48, flexWrap: "wrap" }}>
            <div>
              <Eyebrow style={{ marginBottom: 16 }}>{t.journalOver}</Eyebrow>
              <h2 style={sectionTitle}>{t.journalTitle}</h2>
            </div>
            <TextLink href="/journal">{t.journalCta}</TextLink>
          </Reveal>
          <div className="tp-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(20px,2.5vw,40px)" }}>
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <Link href="/journal" className="tp-card" style={{ display: "block", textDecoration: "none", cursor: "pointer" }}>
                  <div style={{ overflow: "hidden", borderRadius: 2, marginBottom: 20 }}>
                    <ArtworkImage image={p.image} tone={p.tone} paddingTop="68%" alt={loc(p.title) ?? "Journal"} zoom sizes="(max-width:768px) 100vw, 33vw" />
                  </div>
                  <div style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--tp-gold-label)", marginBottom: 11 }}>{loc(p.category)} · {p.date}</div>
                  <h3 style={postTitle}>{loc(p.title)}</h3>
                  <p style={postExcerpt}>{loc(p.excerpt)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontWeight: 500,
  fontSize: "clamp(34px,4.4vw,58px)",
  margin: 0,
  color: "#27271f",
};
const teaseP: React.CSSProperties = { fontSize: 16.5, lineHeight: 1.8, color: "#5d5d54", fontWeight: 300, margin: "0 0 20px" };
const postTitle: React.CSSProperties = { fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 24, lineHeight: 1.2, margin: "0 0 10px", color: "#2a2a22" };
const postExcerpt: React.CSSProperties = { fontSize: 14, lineHeight: 1.7, color: "#6c6c62", fontWeight: 300, margin: 0 };
const captionStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  padding: "22px 20px",
  background: "linear-gradient(0deg,rgba(31,31,26,0.78),rgba(31,31,26,0))",
  opacity: 0,
  transform: "translateY(10px)",
  transition: "opacity .4s, transform .4s",
};

function blob(size: number, h: string, v: string, hSide: "left" | "right", vSide: "top" | "bottom"): React.CSSProperties {
  return { position: "absolute", [hSide]: h, [vSide]: v, width: size, height: size, zIndex: 0 } as React.CSSProperties;
}
function blobInner(bg: string): React.CSSProperties {
  return { width: "100%", height: "100%", background: bg };
}

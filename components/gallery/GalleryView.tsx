"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { ArtworkImage } from "@/components/ArtworkImage";
import { Eyebrow } from "@/components/ui/Atoms";
import { Lightbox } from "./Lightbox";
import type { Artwork, SeriesItem } from "@/lib/types";

type Layout = "editorial" | "grid" | "masonry";

const layoutOptions: { k: Layout; icon: string }[] = [
  { k: "editorial", icon: "▦" },
  { k: "grid", icon: "▤" },
  { k: "masonry", icon: "☷" },
];

/** Real aspect ratio (padding-top) from cm dimensions, clamped to a tasteful range. */
function padOf(a: Artwork): string {
  if (!a.w || !a.h) return "120%";
  const ratio = (a.h / a.w) * 100;
  return `${Math.min(150, Math.max(75, ratio))}%`;
}

export function GalleryView({
  artworks,
  series,
}: {
  artworks: Artwork[];
  series: SeriesItem[];
}) {
  const { t, lang, loc } = useLang();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [seriesFilter, setSeriesFilter] = useState("All");
  const [mediumFilter, setMediumFilter] = useState("All");
  const [layout, setLayout] = useState<Layout>("editorial");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const mediums = useMemo(() => {
    const set = new Map<string, { en: string; vi: string }>();
    artworks.forEach((a) => set.set(a.medium.en, a.medium));
    return Array.from(set.values());
  }, [artworks]);

  const filtered = useMemo(
    () =>
      artworks.filter(
        (a) =>
          (seriesFilter === "All" || a.series.en === seriesFilter) &&
          (mediumFilter === "All" || a.medium.en === mediumFilter),
      ),
    [artworks, seriesFilter, mediumFilter],
  );

  // Deep-link: open the lightbox for ?art=<slug>.
  useEffect(() => {
    const art = searchParams.get("art");
    if (!art) return;
    const idx = filtered.findIndex((a) => a.slug === art);
    // Opening the lightbox in response to the URL (external) deep-link param.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (idx >= 0) setLightbox(idx);
    // Intentionally only re-run when the URL params change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const close = useCallback(() => {
    setLightbox(null);
    if (searchParams.get("art")) router.replace("/gallery", { scroll: false });
  }, [router, searchParams]);

  const galSeries = ["All", ...series.map((s) => s.title.en)];
  const seriesLabel = (key: string) => {
    if (key === "All") return t.seriesAll;
    const found = series.find((s) => s.title.en === key);
    return found ? loc(found.title) : key;
  };

  return (
    <div>
      <section
        style={{
          position: "relative",
          padding: "clamp(44px,7vh,84px) clamp(20px,4.5vw,68px) clamp(20px,3vh,36px)",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -50, left: -40, width: 240, height: 240, background: "radial-gradient(circle at 50% 40%,#FCEEDD,#F3C49A)", borderRadius: "54% 46% 60% 40%/50% 55% 45% 50%", opacity: 0.5, animation: "tpDrift 18s ease-in-out infinite" }} />
        <Reveal style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow style={{ marginBottom: 18 }}>{t.galOver}</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(44px,5.6vw,82px)", margin: "0 0 18px", color: "#27271f" }}>{t.galTitle}</h1>
          <p style={{ maxWidth: 560, margin: "0 auto", fontSize: 16, lineHeight: 1.7, color: "#6a6a60", fontWeight: 300 }}>{t.galSub}</p>
        </Reveal>
      </section>

      {/* Controls */}
      <section
        style={{
          position: "sticky",
          top: 73,
          zIndex: 40,
          background: "rgba(251,250,247,0.86)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(44,44,40,0.07)",
          borderBottom: "1px solid rgba(44,44,40,0.07)",
          padding: "14px clamp(20px,4.5vw,68px)",
        }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {galSeries.map((key) => (
              <button key={key} type="button" onClick={() => { setSeriesFilter(key); setLightbox(null); }} style={chip(seriesFilter === key)}>
                {seriesLabel(key)}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={ctrlLabel}>{t.galMedium}</span>
              <button type="button" onClick={() => { setMediumFilter("All"); setLightbox(null); }} style={chip(mediumFilter === "All")}>{t.mediumAll}</button>
              {mediums.map((m) => (
                <button key={m.en} type="button" onClick={() => { setMediumFilter(m.en); setLightbox(null); }} style={chip(mediumFilter === m.en)}>
                  {(lang === "EN" ? m.en : m.vi).split(" ")[0]}
                </button>
              ))}
            </div>
            <div style={{ width: 1, height: 20, background: "rgba(44,44,40,0.12)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={ctrlLabel}>{t.galLayout}</span>
              {layoutOptions.map((l) => (
                <button key={l.k} type="button" aria-label={l.k} aria-pressed={layout === l.k} onClick={() => setLayout(l.k)} title={l.k} style={layoutBtn(layout === l.k)}>
                  {l.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(34px,5vh,64px) clamp(20px,4.5vw,68px) clamp(60px,9vh,120px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div data-testid="gal-count" style={{ fontSize: 12, letterSpacing: "0.04em", color: "#6f6f64", marginBottom: 26 }}>
            {filtered.length} {filtered.length === 1 ? "work" : "works"}
          </div>
          <div data-testid="gal-container" data-layout={layout} style={containerStyle(layout)}>
            {filtered.map((a, i) => {
              const editorialSpan = layout === "editorial" ? editorialSpans[i % editorialSpans.length] : undefined;
              return (
                <div
                  key={a.id}
                  style={{
                    ...(layout === "masonry" ? { breakInside: "avoid", marginBottom: "clamp(20px,2.5vw,40px)" } : {}),
                    ...(layout === "editorial" ? { gridColumn: `span ${editorialSpan}` } : {}),
                  }}
                >
                  <Reveal>
                    <button
                      type="button"
                      onClick={() => setLightbox(i)}
                      className="tp-card"
                      style={{ textAlign: "left", background: "none", border: "none", padding: 0, cursor: "zoom-in", display: "block", width: "100%" }}
                    >
                      <div style={{ background: "#fff", padding: 9, boxShadow: "0 22px 50px -34px rgba(44,44,40,0.4)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ position: "relative", overflow: "hidden" }}>
                          <ArtworkImage image={a.image} tone={a.tone} paddingTop={layout === "grid" ? "118%" : padOf(a)} alt={loc(a.title) ?? "Artwork"} zoom sizes="(max-width:768px) 100vw, 33vw" />
                          <span style={{ position: "absolute", left: 10, bottom: 10, fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(40,40,34,0.4)" }}>{loc(a.series)}</span>
                          <div data-cap style={capStyle}>
                            <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 23, color: "#fff", lineHeight: 1.1 }}>{a.title.vi}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", marginTop: 9 }}>
                              <span style={{ fontSize: 14 }}>⊕</span>
                              {t.viewWork}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: "16px 2px 0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                          <div style={{ fontFamily: "var(--font-serif)", fontSize: 23, color: "#2a2a22", lineHeight: 1.12 }}>{loc(a.title)}</div>
                          <div style={{ fontSize: 12, color: "#6f6f64", whiteSpace: "nowrap" }}>{a.year}</div>
                        </div>
                        <div style={{ fontSize: 12.5, color: "#6f6f64", marginTop: 6 }}>{loc(a.medium)}</div>
                      </div>
                    </button>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {lightbox !== null && filtered[lightbox] && (
        <Lightbox
          items={filtered}
          index={lightbox}
          onIndex={setLightbox}
          onClose={close}
        />
      )}
    </div>
  );
}

const editorialSpans = [7, 5, 5, 7, 6, 6, 8, 4, 4, 8, 6, 6];

function containerStyle(layout: Layout): React.CSSProperties {
  if (layout === "grid") {
    return { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(20px,2.5vw,40px)" };
  }
  if (layout === "masonry") {
    return { columns: 3, columnGap: "clamp(20px,2.5vw,40px)" } as React.CSSProperties;
  }
  return { display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "clamp(20px,2.5vw,44px)", alignItems: "start" };
}

function chip(active: boolean): React.CSSProperties {
  return {
    fontFamily: "var(--font-sans)",
    fontSize: 12,
    letterSpacing: "0.02em",
    padding: "8px 16px",
    borderRadius: 999,
    cursor: "pointer",
    transition: "all .25s",
    border: active ? "1px solid var(--tp-olive)" : "1px solid rgba(44,44,40,0.14)",
    background: active ? "var(--tp-olive)" : "transparent",
    color: active ? "#fff" : "#5a5a50",
  };
}

function layoutBtn(active: boolean): React.CSSProperties {
  return {
    fontFamily: "sans-serif",
    fontSize: 15,
    width: 38,
    height: 34,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all .25s",
    border: active ? "1px solid var(--tp-olive)" : "1px solid rgba(44,44,40,0.14)",
    background: active ? "rgba(102,131,49,0.1)" : "transparent",
    color: active ? "var(--tp-olive)" : "#6f6f64",
  };
}

const ctrlLabel: React.CSSProperties = { fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6f6f64" };
const capStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  padding: "24px 20px 20px",
  background: "linear-gradient(0deg,rgba(31,31,26,0.8),rgba(31,31,26,0))",
  opacity: 0,
  transform: "translateY(10px)",
  transition: "opacity .4s, transform .4s",
};

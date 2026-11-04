import "server-only";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { sanityConfigured } from "@/sanity/env";
import {
  ARTWORKS_QUERY,
  EXHIBITIONS_QUERY,
  POSTS_QUERY,
  SERIES_QUERY,
  SETTINGS_QUERY,
} from "@/sanity/lib/queries";
import {
  ARTWORKS,
  EXHIBITIONS,
  POSTS,
  SERIES,
  STATS,
  VISIT_INFO,
  type Locale,
} from "./seed";
import { getMessages } from "./messages";
import type {
  Artwork,
  Exhibition,
  ImageRef,
  Post,
  SeriesItem,
  SiteContent,
} from "./types";
import type { Tone } from "./tones";

const REVALIDATE = 60;

/** Build an ImageRef from a Sanity image, or null if absent. */
function imageRef(
  source: unknown,
  width: number,
): ImageRef | null {
  const img = source as { asset?: unknown; alt?: Locale } | null | undefined;
  if (!img?.asset) return null;
  try {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      url: urlForImage(img as any).width(width).url(),
      alt: img.alt ?? null,
    };
  } catch {
    return null;
  }
}

async function safeFetch<T>(
  query: string,
  fallback: T,
  tag: string,
): Promise<T> {
  if (!sanityConfigured) return fallback;
  try {
    const data = await client.fetch<T>(
      query,
      {},
      { next: { revalidate: REVALIDATE, tags: [tag] } },
    );
    // Treat empty results as "use fallback" so the design always renders.
    if (data == null || (Array.isArray(data) && data.length === 0)) {
      return fallback;
    }
    return data;
  } catch {
    return fallback;
  }
}

// ---------------------------------------------------------------------------
// Seed → normalized mappers (fallback when Sanity is empty/unconfigured)
// ---------------------------------------------------------------------------

const seedArtworks: Artwork[] = ARTWORKS.map((a) => ({
  id: String(a.id),
  slug: String(a.id),
  title: { en: a.title, vi: a.vi },
  series: { en: a.series, vi: a.seriesVi },
  medium: { en: a.medium, vi: a.mediumVi },
  year: a.year,
  w: a.w,
  h: a.h,
  tone: a.tone,
  note: a.note,
  image: a.image
    ? { url: a.image.src, alt: a.image.alt, width: a.image.width, height: a.image.height }
    : null,
  featured: a.featured,
  available: a.available ?? true,
}));

const seedPosts: Post[] = POSTS.map((p, i) => ({
  slug: p.slug,
  title: p.title,
  category: p.category,
  date: p.date,
  tone: p.tone,
  excerpt: p.excerpt,
  image: null,
  featured: i === 0,
}));

const seedExhibitions: Exhibition[] = EXHIBITIONS.map((e) => ({
  slug: e.slug,
  name: e.name,
  dates: e.dates,
  place: e.place,
  tone: e.tone,
  status: e.status,
  up: e.up,
  description: e.description,
  image: null,
}));

const seedSeries: SeriesItem[] = SERIES.map((s) => ({
  slug: s.key.toLowerCase().replace(/\s+/g, "-"),
  title: { en: s.key, vi: s.vi },
}));

function seedSiteContent(): SiteContent {
  const en = getMessages("EN");
  const vi = getMessages("VI");
  const L = (k: keyof typeof en): Locale => ({ en: en[k], vi: vi[k] });
  return {
    hero: {
      eyebrow: L("heroEyebrow"),
      titleA: L("heroTitleA"),
      titleB: L("heroTitleB"),
      sub: L("heroSub"),
    },
    about: {
      lede: L("aboutPageLede"),
      story: [
        { en: en.dropcap + en.story1, vi: vi.dropcap + vi.story1 },
        L("story2"),
        L("story3"),
        L("story4"),
      ],
    },
    stats: STATS.map((s) => ({ value: s.value, label: s.label })),
    visitInfo: VISIT_INFO.map((v) => ({ label: v.label, value: v.value })),
    contact: {
      email: VISIT_INFO[2].value.en,
      phone: VISIT_INFO[3].value.en,
    },
    portrait: null,
  };
}

// ---------------------------------------------------------------------------
// Public loaders
// ---------------------------------------------------------------------------

export async function getArtworks(): Promise<Artwork[]> {
  const raw = await safeFetch<Record<string, unknown>[] | null>(
    ARTWORKS_QUERY,
    null,
    "artwork",
  );
  if (!raw) return seedArtworks;
  return raw.map(mapArtwork);
}

export async function getSeries(): Promise<SeriesItem[]> {
  const raw = await safeFetch<Record<string, unknown>[] | null>(
    SERIES_QUERY,
    null,
    "series",
  );
  if (!raw) return seedSeries;
  return raw.map((s) => ({
    slug: (s.slug as string) ?? "",
    title: (s.title as Locale) ?? { en: "", vi: "" },
  }));
}

export async function getPosts(): Promise<Post[]> {
  const raw = await safeFetch<Record<string, unknown>[] | null>(
    POSTS_QUERY,
    null,
    "journalPost",
  );
  if (!raw) return seedPosts;
  return raw.map(mapPost);
}

export async function getExhibitions(): Promise<Exhibition[]> {
  const raw = await safeFetch<Record<string, unknown>[] | null>(
    EXHIBITIONS_QUERY,
    null,
    "exhibition",
  );
  if (!raw) return seedExhibitions;
  return raw.map(mapExhibition);
}

export async function getSiteContent(): Promise<SiteContent> {
  const raw = await safeFetch<Record<string, unknown> | null>(
    SETTINGS_QUERY,
    null,
    "siteSettings",
  );
  const seed = seedSiteContent();
  if (!raw) return seed;
  const s = raw as Record<string, unknown>;
  return {
    hero: {
      eyebrow: (s.heroEyebrow as Locale) ?? seed.hero.eyebrow,
      titleA: (s.heroTitleA as Locale) ?? seed.hero.titleA,
      titleB: (s.heroTitleB as Locale) ?? seed.hero.titleB,
      sub: (s.heroSub as Locale) ?? seed.hero.sub,
    },
    about: {
      lede: (s.aboutLede as Locale) ?? seed.about.lede,
      story: mapStory(s.story, seed.about.story),
    },
    stats: Array.isArray(s.stats) && s.stats.length
      ? (s.stats as { value: string; label: Locale }[])
      : seed.stats,
    visitInfo: Array.isArray(s.visitInfo) && s.visitInfo.length
      ? (s.visitInfo as { label: Locale; value: Locale }[])
      : seed.visitInfo,
    contact: {
      email: (s.contactEmail as string) ?? seed.contact.email,
      phone: (s.contactPhone as string) ?? seed.contact.phone,
    },
    portrait: imageRef(s.portrait, 900),
  };
}

function mapStory(
  story: unknown,
  fallback: [Locale, Locale, Locale, Locale],
): [Locale, Locale, Locale, Locale] {
  const st = story as Record<string, Locale> | undefined;
  if (!st) return fallback;
  return [
    st.p1 ?? fallback[0],
    st.p2 ?? fallback[1],
    st.p3 ?? fallback[2],
    st.p4 ?? fallback[3],
  ];
}

function mapArtwork(a: Record<string, unknown>): Artwork {
  return {
    id: (a._id as string) ?? "",
    slug: (a.slug as string) ?? (a._id as string) ?? "",
    title: (a.title as Locale) ?? { en: "", vi: "" },
    series: (a.series as Locale) ?? { en: "", vi: "" },
    medium: (a.medium as Locale) ?? { en: "", vi: "" },
    year: (a.year as number) ?? null,
    w: (a.widthCm as number) ?? null,
    h: (a.heightCm as number) ?? null,
    tone: (a.tone as Tone) ?? "sage",
    note: (a.note as Locale) ?? { en: "", vi: "" },
    image: imageRef(a.image, 1100),
    featured: (a.featured as boolean) ?? false,
    available: (a.available as boolean) ?? true,
  };
}

function mapPost(p: Record<string, unknown>): Post {
  return {
    slug: (p.slug as string) ?? "",
    title: (p.title as Locale) ?? { en: "", vi: "" },
    category: (p.category as Locale) ?? { en: "", vi: "" },
    date: (p.date as string) ?? "",
    tone: (p.tone as Tone) ?? "sage",
    excerpt: (p.excerpt as Locale) ?? { en: "", vi: "" },
    image: imageRef(p.image, 900),
    featured: (p.featured as boolean) ?? false,
  };
}

function mapExhibition(e: Record<string, unknown>): Exhibition {
  const status = (e.status as string) ?? "upcoming";
  const statusLabel = e.statusLabel as Locale | undefined;
  const up = status !== "past";
  const fallbackLabel: Locale =
    status === "current"
      ? { en: "On now", vi: "Đang diễn ra" }
      : status === "past"
        ? { en: "Past", vi: "Đã qua" }
        : { en: "Upcoming", vi: "Sắp tới" };
  return {
    slug: (e.slug as string) ?? "",
    name: (e.name as Locale) ?? { en: "", vi: "" },
    dates: (e.dates as Locale) ?? { en: "", vi: "" },
    place: (e.place as string) ?? "",
    tone: (e.tone as Tone) ?? "sage",
    status: statusLabel ?? fallbackLabel,
    up,
    description: (e.description as Locale) ?? { en: "", vi: "" },
    image: imageRef(e.image, 1100),
  };
}

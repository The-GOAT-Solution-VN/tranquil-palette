import type { Locale } from "./seed";
import type { Tone } from "./tones";

/** Normalized shapes consumed by components, identical whether the data comes
 *  from Sanity or the local seed fallback. */

export interface ImageRef {
  url: string;
  alt: Locale | null;
  lqip?: string | null;
  /** Intrinsic pixel size, when known — lets the gallery avoid cropping photos. */
  width?: number;
  height?: number;
}

export interface Artwork {
  id: string;
  slug: string;
  title: Locale;
  series: Locale;
  medium: Locale;
  year: number | null;
  w: number | null;
  h: number | null;
  tone: Tone;
  note: Locale;
  image: ImageRef | null;
  featured?: boolean;
  /** False once the work is in a private collection. */
  available: boolean;
}

export interface Post {
  slug: string;
  title: Locale;
  category: Locale;
  date: string;
  tone: Tone;
  excerpt: Locale;
  image: ImageRef | null;
  featured?: boolean;
}

export interface Exhibition {
  slug: string;
  name: Locale;
  dates: Locale;
  place: string;
  tone: Tone;
  status: Locale;
  up: boolean;
  description: Locale;
  image: ImageRef | null;
}

export interface SeriesItem {
  slug: string;
  title: Locale;
}

export interface SiteContent {
  hero: {
    eyebrow: Locale;
    titleA: Locale;
    titleB: Locale;
    sub: Locale;
  };
  about: {
    lede: Locale;
    story: [Locale, Locale, Locale, Locale];
  };
  stats: { value: string; label: Locale }[];
  visitInfo: { label: Locale; value: Locale }[];
  contact: { email: string; phone: string };
  portrait: ImageRef | null;
}

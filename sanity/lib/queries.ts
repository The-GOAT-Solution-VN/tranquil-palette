import { defineQuery } from "next-sanity";

const localeStr = `{ en, vi }`;
const imageProj = `"image": image{ ..., "alt": alt${localeStr} }`;

export const ARTWORKS_QUERY = defineQuery(`
  *[_type == "artwork"] | order(order asc, year desc) {
    _id,
    "slug": slug.current,
    title { en, vi },
    "series": series->{ "en": title.en, "vi": title.vi },
    medium { en, vi },
    year,
    widthCm,
    heightCm,
    tone,
    note { en, vi },
    available,
    featured,
    ${imageProj}
  }
`);

export const FEATURED_ARTWORKS_QUERY = defineQuery(`
  *[_type == "artwork" && featured == true] | order(order asc, year desc) [0...3] {
    _id,
    "slug": slug.current,
    title { en, vi },
    "series": series->{ "en": title.en, "vi": title.vi },
    medium { en, vi },
    year, widthCm, heightCm, tone,
    note { en, vi },
    ${imageProj}
  }
`);

export const SERIES_QUERY = defineQuery(`
  *[_type == "series"] | order(order asc) {
    _id, "slug": slug.current, title { en, vi }
  }
`);

export const POSTS_QUERY = defineQuery(`
  *[_type == "journalPost"] | order(order asc, publishedAt desc) {
    _id,
    "slug": slug.current,
    title { en, vi },
    category { en, vi },
    date,
    tone,
    excerpt { en, vi },
    featured,
    ${imageProj}
  }
`);

export const EXHIBITIONS_QUERY = defineQuery(`
  *[_type == "exhibition"] | order(order asc) {
    _id,
    "slug": slug.current,
    name { en, vi },
    dates { en, vi },
    place,
    tone,
    status,
    statusLabel { en, vi },
    description { en, vi },
    ${imageProj}
  }
`);

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    heroEyebrow { en, vi },
    heroTitleA { en, vi },
    heroTitleB { en, vi },
    heroSub { en, vi },
    artistName,
    aboutLede { en, vi },
    story { p1{en,vi}, p2{en,vi}, p3{en,vi}, p4{en,vi} },
    stats[]{ value, label { en, vi } },
    contactEmail,
    contactPhone,
    visitInfo[]{ label { en, vi }, value { en, vi } },
    metaDescription { en, vi },
    "portrait": portrait,
    "ogImage": ogImage
  }
`);

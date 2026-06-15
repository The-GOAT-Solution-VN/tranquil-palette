/**
 * Seeds a Sanity dataset from the bundled design content (lib/seed.ts).
 *
 * Usage (after creating a project + dataset and setting env):
 *   node --env-file=.env.local scripts/seed.ts
 *
 * Requires: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *           SANITY_API_WRITE_TOKEN
 */
import { createClient } from "@sanity/client";
import {
  ARTWORKS,
  EXHIBITIONS,
  MEDIUMS,
  POSTS,
  SERIES,
  STATS,
  VISIT_INFO,
} from "../lib/seed.ts";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN. Aborting.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const mediumLookup = Object.fromEntries(MEDIUMS.map((m) => [m.key, m.vi]));

async function run() {
  const tx = client.transaction();

  // Series (deterministic ids so artworks can reference them).
  const seriesId = (key: string) => `series-${slugify(key)}`;
  SERIES.forEach((s, i) => {
    tx.createOrReplace({
      _id: seriesId(s.key),
      _type: "series",
      title: { en: s.key, vi: s.vi },
      slug: { _type: "slug", current: slugify(s.key) },
      order: i,
    });
  });

  // Artworks.
  ARTWORKS.forEach((a, i) => {
    tx.createOrReplace({
      _id: `artwork-${a.id}`,
      _type: "artwork",
      title: { en: a.title, vi: a.vi },
      slug: { _type: "slug", current: slugify(a.title) },
      series: { _type: "reference", _ref: seriesId(a.series) },
      medium: { en: a.medium, vi: mediumLookup[a.medium] ?? a.medium },
      year: a.year,
      widthCm: a.w,
      heightCm: a.h,
      tone: a.tone,
      note: a.note,
      available: true,
      featured: !!a.featured,
      order: i,
    });
  });

  // Journal posts.
  POSTS.forEach((p, i) => {
    tx.createOrReplace({
      _id: `post-${p.slug}`,
      _type: "journalPost",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      category: p.category,
      date: p.date,
      tone: p.tone,
      excerpt: p.excerpt,
      featured: i === 0,
      order: i,
    });
  });

  // Exhibitions.
  EXHIBITIONS.forEach((e, i) => {
    tx.createOrReplace({
      _id: `exhibition-${e.slug}`,
      _type: "exhibition",
      name: e.name,
      slug: { _type: "slug", current: e.slug },
      status: e.up ? (i === 1 ? "current" : "upcoming") : "past",
      statusLabel: e.status,
      dates: e.dates,
      place: e.place,
      tone: e.tone,
      description: e.description,
      order: i,
    });
  });

  // Site settings singleton.
  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    artistName: "Huong Pham",
    contactEmail: VISIT_INFO[2].value.en,
    contactPhone: VISIT_INFO[3].value.en,
    stats: STATS.map((s) => ({
      _key: slugify(s.value + s.label.en),
      value: s.value,
      label: s.label,
    })),
    visitInfo: VISIT_INFO.map((v, idx) => ({
      _key: `visit-${idx}`,
      label: v.label,
      value: v.value,
    })),
  });

  await tx.commit();
  console.log(
    `Seeded ${SERIES.length} series, ${ARTWORKS.length} artworks, ${POSTS.length} posts, ${EXHIBITIONS.length} exhibitions, settings.`,
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

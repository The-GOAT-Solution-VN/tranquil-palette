import { HomeView } from "@/components/home/HomeView";
import { JsonLd } from "@/components/JsonLd";
import { dayKey, seededShuffle } from "@/lib/shuffle";
import { getArtworks, getExhibitions, getPosts, getSiteContent } from "@/lib/data";

// Re-render at least hourly so the daily shuffle rolls over soon after midnight.
export const revalidate = 3600;

export default async function HomePage() {
  const [site, artworks, posts, exhibitions] = await Promise.all([
    getSiteContent(),
    getArtworks(),
    getPosts(),
    getExhibitions(),
  ]);

  // Every day shows a fresh selection: 2 for the hero parallax pair, then 3 for
  // the featured row — all distinct, drawn from the whole collection.
  const pool = artworks.filter((a) => a.image?.url);
  const shuffled = seededShuffle(pool.length >= 5 ? pool : artworks, dayKey());

  const upcoming = exhibitions.find((e) => e.up) ?? exhibitions[0] ?? null;

  return (
    <>
      <JsonLd />
      <HomeView
        site={site}
        featured={shuffled}
        posts={posts}
        exhibition={upcoming}
      />
    </>
  );
}

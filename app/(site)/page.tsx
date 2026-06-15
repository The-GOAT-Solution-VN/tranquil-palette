import { HomeView } from "@/components/home/HomeView";
import { JsonLd } from "@/components/JsonLd";
import { getArtworks, getExhibitions, getPosts, getSiteContent } from "@/lib/data";

export default async function HomePage() {
  const [site, artworks, posts, exhibitions] = await Promise.all([
    getSiteContent(),
    getArtworks(),
    getPosts(),
    getExhibitions(),
  ]);

  const featured = artworks.filter((a) => a.featured);
  const featuredOrFirst = featured.length >= 2 ? featured : artworks;
  const upcoming = exhibitions.find((e) => e.up) ?? exhibitions[0] ?? null;

  return (
    <>
      <JsonLd />
      <HomeView
        site={site}
        featured={featuredOrFirst}
        posts={posts}
        exhibition={upcoming}
      />
    </>
  );
}

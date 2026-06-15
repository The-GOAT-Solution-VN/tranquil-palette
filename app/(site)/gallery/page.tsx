import { Suspense } from "react";
import type { Metadata } from "next";
import { GalleryView } from "@/components/gallery/GalleryView";
import { getArtworks, getSeries } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "More than thirty true-to-life paintings of Hanoi and its quiet moments, in oil and acrylic by Huong Pham.",
};

export default async function GalleryPage() {
  const [artworks, series] = await Promise.all([getArtworks(), getSeries()]);

  return (
    <Suspense fallback={null}>
      <GalleryView artworks={artworks} series={series} />
    </Suspense>
  );
}

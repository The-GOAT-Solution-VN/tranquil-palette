import type { Metadata } from "next";
import { AboutView } from "@/components/about/AboutView";
import { getArtworks, getSiteContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Artist — Kim Pham",
  description:
    "Kim Pham took up the brush at sixty. Today her home gallery in Hanoi, Tranquil Palette, holds more than thirty true-to-life paintings.",
};

export default async function AboutPage() {
  const [site, artworks] = await Promise.all([getSiteContent(), getArtworks()]);
  const homeArtwork = artworks.find((a) => a.tone === "sage") ?? artworks[0] ?? null;
  return <AboutView site={site} homeArtwork={homeArtwork} />;
}

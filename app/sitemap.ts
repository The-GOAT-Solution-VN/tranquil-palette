import type { MetadataRoute } from "next";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tranquilpalette.art";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/gallery", "/about", "/journal", "/exhibitions", "/visit"];
  const now = new Date();
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}

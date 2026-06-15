import type { Page } from "@playwright/test";

/** Scroll through the page to trigger scroll-reveal animations, then return to top. */
export async function revealAll(page: Page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((_y) => window.scrollTo(0, _y), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
}

export const ROUTES = [
  { name: "home", path: "/" },
  { name: "gallery", path: "/gallery" },
  { name: "about", path: "/about" },
  { name: "journal", path: "/journal" },
  { name: "exhibitions", path: "/exhibitions" },
  { name: "visit", path: "/visit" },
];

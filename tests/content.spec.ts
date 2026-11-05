import { test, expect } from "@playwright/test";
import { revealAll } from "./helpers";

test.describe("content / CMS integration", () => {
  test("home renders seeded featured works and journal posts", async ({ page }) => {
    await page.goto("/");
    await revealAll(page);
    await expect(page.getByRole("heading", { name: "Selected works" })).toBeVisible();
    await expect(page.getByText("The Fragrant Family Garden").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Upcoming exhibition" })).toBeVisible();
  });

  test("gallery renders all fifteen seeded works", async ({ page }) => {
    await page.goto("/gallery");
    const cards = page.locator('[data-testid="gal-container"] button.tp-card');
    await expect(cards).toHaveCount(15);
  });

  test("exhibitions render with status pills", async ({ page }) => {
    await page.goto("/exhibitions");
    await expect(page.getByRole("heading", { name: "Seasons of a Quiet Life" })).toBeVisible();
    await expect(page.getByText("On now").first()).toBeVisible();
    await expect(page.getByText("Past").first()).toBeVisible();
  });

  test("artwork image boxes keep a gradient tone behind the photo", async ({ page }) => {
    await page.goto("/gallery");
    const box = page.locator('[data-testid="gal-container"] [data-zoom]').first();
    const bg = await box.evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(bg).toContain("gradient");
  });
});

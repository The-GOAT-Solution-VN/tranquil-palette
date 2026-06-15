import { test, expect } from "@playwright/test";
import { ROUTES } from "./helpers";

test.describe("smoke / routing", () => {
  for (const route of ROUTES) {
    test(`${route.name} loads without console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      page.on("pageerror", (e) => errors.push(e.message));

      const res = await page.goto(route.path, { waitUntil: "networkidle" });
      expect(res?.status()).toBeLessThan(400);
      await expect(page.locator("h1").first()).toBeVisible();
      // Ignore benign third-party noise; fail on real app errors.
      const real = errors.filter((e) => !/favicon|preload|hydrat/i.test(e));
      expect(real, real.join("\n")).toHaveLength(0);
    });
  }

  // Open the mobile menu if the burger is visible (narrow viewports).
  async function openMenuIfMobile(page: import("@playwright/test").Page) {
    const burger = page.getByRole("button", { name: "Menu" });
    if (await burger.isVisible()) await burger.click();
  }

  test("nav links navigate between pages", async ({ page }) => {
    await page.goto("/");
    await openMenuIfMobile(page);
    await page.getByRole("link", { name: "Gallery", exact: true }).first().click();
    await expect(page).toHaveURL(/\/gallery/);
    await openMenuIfMobile(page);
    await page.getByRole("link", { name: "About", exact: true }).first().click();
    await expect(page).toHaveURL(/\/about/);
  });

  test("logo returns home", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("link", { name: /home/i }).first().click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("scroll resets on route change", async ({ page }) => {
    await page.goto("/gallery");
    await page.evaluate(() => window.scrollTo(0, 600));
    await openMenuIfMobile(page);
    await page.getByRole("link", { name: "About", exact: true }).first().click();
    await expect(page).toHaveURL(/\/about/);
    await expect.poll(async () => page.evaluate(() => window.scrollY)).toBeLessThan(100);
  });
});

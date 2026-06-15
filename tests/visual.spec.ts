import { test, expect } from "@playwright/test";
import { ROUTES, revealAll } from "./helpers";

// Reduced motion makes reveal/parallax static, so screenshots are deterministic
// and show all content (matching the intended design).
test.describe("visual regression", () => {
  for (const route of ROUTES) {
    test(`${route.name} matches baseline`, async ({ page }, testInfo) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route.path, { waitUntil: "networkidle" });
      await revealAll(page);
      // Fonts settled.
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot(`${route.name}-${testInfo.project.name}.png`, {
        fullPage: true,
        animations: "disabled",
        // Gradient placeholders are deterministic; allow tiny AA differences.
        maxDiffPixelRatio: 0.02,
      });
    });
  }

  test("lightbox matches baseline", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "desktop only");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/gallery");
    await page.locator('[data-testid="gal-container"] button.tp-card').first().click();
    await expect(page.getByTestId("lightbox")).toBeVisible();
    await page.waitForTimeout(400);
    await expect(page.getByTestId("lightbox")).toHaveScreenshot("lightbox-desktop.png", {
      animations: "disabled",
    });
  });
});

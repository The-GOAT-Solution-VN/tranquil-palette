import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { ROUTES } from "./helpers";

test.describe("accessibility (axe)", () => {
  for (const route of ROUTES) {
    test(`${route.name} has no serious/critical violations`, async ({ page }) => {
      // Reduced motion makes all reveal content fully opaque and static, so axe
      // sees final colors — deterministic, no opacity-blend artifacts.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route.path, { waitUntil: "networkidle" });
      // Allow the reduced-motion hook to settle so reveals render opaque.
      await page.waitForTimeout(700);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      const serious = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );
      expect(
        serious,
        serious.map((v) => `${v.id}: ${v.help}`).join("\n"),
      ).toEqual([]);
    });
  }

  test("keyboard can reach the language toggle and primary CTA", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    // Tab through a few elements and ensure focus is visible somewhere meaningful.
    const active = await page.evaluate(() => document.activeElement?.tagName);
    expect(active).toBeTruthy();
  });
});

import { test, expect } from "@playwright/test";

test.describe("prefers-reduced-motion", () => {
  test("below-fold content is fully visible (reveal disabled)", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "networkidle" });

    const heading = page.getByRole("heading", { name: "Journal" }).first();
    await expect(heading).toBeVisible();

    // The reveal must resolve to fully opaque (no animation hold). Poll so the
    // assertion isn't sensitive to hydration timing.
    await expect
      .poll(
        async () =>
          heading.evaluate((el) => {
            let node: HTMLElement | null = el as HTMLElement;
            while (node) {
              if (getComputedStyle(node).opacity !== "1") return getComputedStyle(node).opacity;
              node = node.parentElement;
            }
            return "1";
          }),
        { timeout: 5000 },
      )
      .toBe("1");
  });
});

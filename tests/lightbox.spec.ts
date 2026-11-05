import { test, expect, type Page } from "@playwright/test";

/**
 * The lightbox must work on every screen shape: the painting stays fully on
 * screen and is the focal point, the caption stays reachable, and controls are
 * large enough to tap. Sizes cover foldable cover displays, small and large
 * phones, a single-screen dual-display device, landscape phones, tablets and
 * desktops.
 */
const VIEWPORTS = [
  { name: "foldable cover 360x374", width: 360, height: 374 },
  { name: "small phone 320x568", width: 320, height: 568 },
  { name: "iPhone 390x844", width: 390, height: 844 },
  { name: "dual-screen single 540x720", width: 540, height: 720 },
  { name: "landscape phone 844x390", width: 844, height: 390 },
  { name: "iPad portrait 768x1024", width: 768, height: 1024 },
  { name: "laptop 1366x768", width: 1366, height: 768 },
  { name: "desktop short 1440x700", width: 1440, height: 700 },
];

// A tall painting and a wide one (indexes in the default ordering).
const TALL = 8;
const WIDE = 12;

async function openCard(page: Page, index: number) {
  await page.goto("/gallery");
  const card = page.locator('[data-testid="gal-container"] button.tp-card').nth(index);
  // dispatch directly: the sticky filter bar can cover cards on tiny screens
  await card.dispatchEvent("click");
  const lb = page.getByTestId("lightbox");
  await expect(lb).toBeVisible();
  await expect(lb.locator(".tp-lb-img")).toBeVisible();
  // wait for the photograph itself so its box has its real proportions
  await expect
    .poll(() => lb.locator(".tp-lb-img").evaluate((el) => (el as HTMLImageElement).complete))
    .toBe(true);
  return lb;
}

for (const vp of VIEWPORTS) {
  for (const [label, index] of [["tall", TALL], ["wide", WIDE]] as const) {
    test(`lightbox fits ${vp.name} (${label} painting)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      const lb = await openCard(page, index);

      const img = (await lb.locator(".tp-lb-img").boundingBox())!;
      const stage = (await lb.getByTestId("lb-stage").boundingBox())!;
      const close = (await lb.getByRole("button", { name: "Close" }).boundingBox())!;
      const cap = (await lb.locator(".tp-lb-cap").boundingBox())!;

      // The whole painting is on screen.
      expect(img.x).toBeGreaterThanOrEqual(-0.5);
      expect(img.y).toBeGreaterThanOrEqual(-0.5);
      expect(img.x + img.width).toBeLessThanOrEqual(vp.width + 0.5);
      expect(img.y + img.height).toBeLessThanOrEqual(vp.height + 0.5);

      // It is the focal point: in the column layout the stage takes most of the
      // height; in the side-by-side layout it takes most of the width.
      const columnLayout = stage.width >= vp.width * 0.95;
      if (columnLayout) {
        expect(stage.height).toBeGreaterThanOrEqual(vp.height * 0.5);
        // caption sits underneath, inside the screen
        expect(cap.y).toBeGreaterThanOrEqual(stage.y + stage.height - 1);
        expect(cap.y + cap.height).toBeLessThanOrEqual(vp.height + 0.5);
      } else {
        expect(stage.width).toBeGreaterThanOrEqual(vp.width * 0.5);
      }

      // Title is visible; close is a comfortable tap target on screen.
      await expect(lb.locator("h2")).toBeVisible();
      expect(close.width).toBeGreaterThanOrEqual(44);
      expect(close.height).toBeGreaterThanOrEqual(44);
      expect(close.x + close.width).toBeLessThanOrEqual(vp.width + 0.5);

      // No sideways scrolling.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
}

test.describe("lightbox caption on phones", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("details expand and collapse, and reset when moving to the next work", async ({ page }) => {
    const lb = await openCard(page, TALL);
    const toggle = lb.getByRole("button", { name: /details/i });
    const enquire = lb.getByRole("link", { name: /enquire/i });

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(enquire).toBeHidden();

    await toggle.click();
    await expect(lb.getByRole("button", { name: /hide/i })).toHaveAttribute("aria-expanded", "true");
    await expect(enquire).toBeVisible();

    await lb.getByTestId("lb-next").click();
    await expect(lb.getByRole("button", { name: /details/i })).toHaveAttribute("aria-expanded", "false");
    await expect(enquire).toBeHidden();
  });

  test("tapping the empty space around the painting closes the viewer", async ({ page }) => {
    const lb = await openCard(page, WIDE); // wide painting leaves empty space above/below
    const stage = (await lb.getByTestId("lb-stage").boundingBox())!;
    await page.mouse.click(stage.x + stage.width / 2, stage.y + 4);
    await expect(lb).toBeHidden();
  });

  test("swiping the painting moves to the next and previous work", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "synthetic touch events are Chromium-only");
    const lb = await openCard(page, TALL);
    const title = lb.locator("h2");
    const first = await title.textContent();

    const swipe = (fromX: number, toX: number) =>
      page.evaluate(
        ([a, b]) => {
          const el = document.querySelector('[data-testid="lb-stage"]')!;
          const touch = (x: number) =>
            new Touch({ identifier: 1, target: el, clientX: x, clientY: 300 });
          el.dispatchEvent(new TouchEvent("touchstart", { touches: [touch(a)], changedTouches: [touch(a)], bubbles: true, cancelable: true }));
          el.dispatchEvent(new TouchEvent("touchend", { touches: [], changedTouches: [touch(b)], bubbles: true, cancelable: true }));
        },
        [fromX, toX],
      );

    await swipe(300, 100); // swipe left → next
    await expect.poll(async () => title.textContent()).not.toBe(first);
    await swipe(100, 300); // swipe right → previous
    await expect.poll(async () => title.textContent()).toBe(first);
  });
});

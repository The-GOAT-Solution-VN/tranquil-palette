import { test, expect } from "@playwright/test";

test.describe("gallery — filters, layouts, lightbox", () => {
  test("series filter narrows the set and updates the count", async ({ page }) => {
    await page.goto("/gallery");
    const count = page.getByTestId("gal-count");
    await expect(count).toContainText("5");

    await page.getByRole("button", { name: "Portraits", exact: true }).click();
    await expect(count).toContainText("1");
    const cards = page.locator('[data-testid="gal-container"] button.tp-card');
    await expect(cards).toHaveCount(1);
  });

  test("medium filter works", async ({ page }) => {
    await page.goto("/gallery");
    await page.getByRole("button", { name: "Acrylic", exact: true }).click();
    const cards = page.locator('[data-testid="gal-container"] button.tp-card');
    await expect(cards).toHaveCount(5);
  });

  test("layout switch changes the container layout", async ({ page }) => {
    await page.goto("/gallery");
    const container = page.getByTestId("gal-container");
    await expect(container).toHaveAttribute("data-layout", "editorial");

    await page.getByRole("button", { name: "grid", exact: true }).click();
    await expect(container).toHaveAttribute("data-layout", "grid");

    await page.getByRole("button", { name: "masonry", exact: true }).click();
    await expect(container).toHaveAttribute("data-layout", "masonry");
  });

  test("lightbox opens, navigates with arrows, closes with Escape", async ({ page }) => {
    await page.goto("/gallery");
    await page.locator('[data-testid="gal-container"] button.tp-card').first().click();
    const lb = page.getByTestId("lightbox");
    await expect(lb).toBeVisible();
    const first = await lb.locator("h2").textContent();

    await page.keyboard.press("ArrowRight");
    await expect.poll(async () => lb.locator("h2").textContent()).not.toBe(first);

    await page.keyboard.press("Escape");
    await expect(lb).toBeHidden();
  });

  test("lightbox Enquire deep-links to Visit with the artwork", async ({ page }) => {
    await page.goto("/gallery");
    await page.locator('[data-testid="gal-container"] button.tp-card').first().click();
    await page.getByRole("link", { name: /enquire/i }).click();
    await expect(page).toHaveURL(/\/visit\?artwork=/);
  });

  test("home featured work deep-links into the gallery lightbox", async ({ page }) => {
    await page.goto("/");
    await page.locator('a[href^="/gallery?art="]').first().click();
    await expect(page).toHaveURL(/\/gallery\?art=/);
    await expect(page.getByTestId("lightbox")).toBeVisible();
  });

  test("photographed works show their image, size and collection status", async ({ page }) => {
    await page.goto("/gallery");
    const first = page.locator('[data-testid="gal-container"] button.tp-card').first();
    await expect(first.locator("img")).toHaveAttribute("src", /fragrant-family-garden/);

    await page.getByRole("button", { name: "Spiritual", exact: true }).click();
    const cards = page.locator('[data-testid="gal-container"] button.tp-card');
    await expect(cards).toHaveCount(2);
    await cards.first().click();
    const lb = page.getByTestId("lightbox");
    await expect(lb.locator("h2")).toHaveText("Buddha of Prosperity");
    await expect(lb).toContainText("90 × 120 cm");
    await expect(lb).toContainText("Private collection");
    await expect(lb.locator("img")).toHaveAttribute("src", "/artworks/buddha-of-prosperity.jpg");
  });
});

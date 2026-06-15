import { test, expect } from "@playwright/test";

test.describe("internationalization (EN / VI)", () => {
  test("toggling to VI swaps copy and updates <html lang>", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1").first()).toContainText("Where stillness");

    await page.getByRole("button", { name: "VI" }).click();
    await expect(page.locator("h1").first()).toContainText("Nơi tĩnh lặng");
    await expect(page.locator("html")).toHaveAttribute("lang", "vi");

    // Nav also localizes.
    await expect(page.getByRole("link", { name: "Phòng tranh" }).first()).toBeVisible();
  });

  test("language choice persists across navigation and reload", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "VI" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "vi");

    await page.getByRole("link", { name: "Giới thiệu" }).first().click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator("html")).toHaveAttribute("lang", "vi");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "vi");
  });
});

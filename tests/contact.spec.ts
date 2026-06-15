import { test, expect } from "@playwright/test";

test.describe("contact form", () => {
  test("rejects empty / invalid submissions client-side", async ({ page }) => {
    let requested = false;
    await page.route("**/api/contact", (route) => {
      requested = true;
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
    });

    await page.goto("/visit");
    await page.getByRole("button", { name: /send request/i }).click();
    // Validation should block the network request.
    await page.waitForTimeout(300);
    expect(requested).toBe(false);
    await expect(page.locator('input[name="name"]')).toHaveAttribute("aria-invalid", "true");
  });

  test("happy path shows the success state", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) }),
    );

    await page.goto("/visit");
    await page.locator('input[name="name"]').fill("Mai Tran");
    await page.locator('input[name="email"]').fill("mai@example.com");
    await page.locator('textarea[name="message"]').fill("I would love to visit next week.");
    await page.getByRole("button", { name: /send request/i }).click();

    await expect(page.getByRole("button", { name: /thank you/i })).toBeVisible();
  });

  test("error path shows the error state", async ({ page }) => {
    await page.route("**/api/contact", (route) => route.fulfill({ status: 500, body: "{}" }));

    await page.goto("/visit");
    await page.locator('input[name="name"]').fill("Mai Tran");
    await page.locator('input[name="email"]').fill("mai@example.com");
    await page.locator('textarea[name="message"]').fill("Hello there.");
    await page.getByRole("button", { name: /send request/i }).click();

    await expect(page.getByRole("alert").filter({ hasText: /wrong|lỗi/i })).toBeVisible();
  });

  test("invalid email is rejected", async ({ page }) => {
    let requested = false;
    await page.route("**/api/contact", (route) => {
      requested = true;
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
    });
    await page.goto("/visit");
    await page.locator('input[name="name"]').fill("Mai Tran");
    await page.locator('input[name="email"]').fill("not-an-email");
    await page.locator('textarea[name="message"]').fill("Hi.");
    await page.getByRole("button", { name: /send request/i }).click();
    await page.waitForTimeout(300);
    expect(requested).toBe(false);
    await expect(page.locator('input[name="email"]')).toHaveAttribute("aria-invalid", "true");
  });
});

import { test, expect } from "@playwright/test";

test("home page renders", async ({ page }) => {
  await page.goto("http://localhost:4321");
  await expect(page).toHaveTitle(/Astro/);
});

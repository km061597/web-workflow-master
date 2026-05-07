/**
 * Verify responsive breakpoints by checking key viewport sizes.
 * Requires the dev server to be running.
 */
import { chromium } from "playwright";

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 667 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const BASE_URL = process.env.SITE_URL || "http://localhost:3000";

async function main() {
  const browser = await chromium.launch();
  let errors = 0;

  console.log("\n📐 Verifying viewports…\n");

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: vp });
    await page.goto(BASE_URL, { waitUntil: "networkidle" });

    // Check no horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (overflow) {
      console.error(`  ✗ ${vp.name} (${vp.width}x${vp.height}): horizontal overflow detected`);
      errors++;
    } else {
      console.log(`  ✓ ${vp.name} (${vp.width}x${vp.height}): no overflow`);
    }

    // Check <meta viewport> exists
    const viewportMeta = await page.locator('meta[name="viewport"]').count();
    if (viewportMeta === 0) {
      console.error(`  ✗ ${vp.name}: missing viewport meta tag`);
      errors++;
    }

    await page.close();
  }

  await browser.close();

  console.log(`\n${errors === 0 ? "✅ All viewport checks passed." : `❌ ${errors} viewport check(s) failed.`}\n`);
  process.exit(errors);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

console.log("\n♿ Running accessibility scan…\n");

const url = process.env.A11Y_URL ?? "http://localhost:3000";
const browser = await chromium.launch();

try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  const results = await new AxeBuilder({ page }).analyze();
  const seriousViolations = results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? "")
  );

  if (seriousViolations.length > 0) {
    for (const violation of seriousViolations) {
      console.error(`- ${violation.id}: ${violation.help}`);
    }
    throw new Error(`${seriousViolations.length} serious/critical accessibility violation(s)`);
  }

  console.log("\n✅ Accessibility scan passed.\n");
} catch (error) {
  console.error(error.message);
  console.error("\n❌ Accessibility issues found. Fix before shipping.\n");
  process.exit(1);
} finally {
  await browser.close();
}

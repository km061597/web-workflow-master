/**
 * Automated accessibility scan using pa11y-ci.
 * Runs against the built static output.
 */
import { execSync } from "node:child_process";

console.log("\n♿ Running accessibility scan…\n");

try {
  execSync("npx pa11y-ci --sitemap http://localhost:3000/sitemap.xml --sitemap-find http://localhost:3000 --sitemap-replace https://example.com", {
    stdio: "inherit",
  });
  console.log("\n✅ Accessibility scan passed.\n");
} catch {
  console.error("\n❌ Accessibility issues found. Fix before shipping.\n");
  process.exit(1);
}

#!/usr/bin/env node
import { writeFileSync } from "node:fs";

const [url, ...args] = process.argv.slice(2);
const outputIndex = args.indexOf("--output");
const output = outputIndex >= 0 ? args[outputIndex + 1] : "screenshot-request.json";

if (!url || !output) {
  console.error("Usage: node scripts/screenshot.js <url> --output <file>");
  process.exit(1);
}

new URL(url);
writeFileSync(output, JSON.stringify({ url, capturedAt: new Date().toISOString(), note: "Use browser automation for visual image capture." }, null, 2));
console.log(`Wrote screenshot request metadata to ${output}`);

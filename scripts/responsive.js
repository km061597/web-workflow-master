#!/usr/bin/env node
const url = process.argv[2];

if (!url) {
  console.error("Usage: node scripts/responsive.js <url>");
  process.exit(1);
}

new URL(url);

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

console.log(JSON.stringify({ url, viewports }, null, 2));

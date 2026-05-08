#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const targetUrl = process.argv[2];

if (targetUrl) {
  try {
    const response = await fetch(targetUrl, { method: "GET" });
    if (!response.ok) {
      console.error(`URL check failed: ${targetUrl} returned ${response.status}`);
      process.exit(1);
    }
    console.log(`URL reachable: ${targetUrl} (${response.status})`);
  } catch (error) {
    console.error(`URL check failed: ${targetUrl}`);
    console.error(error.message);
    process.exit(1);
  }
}

const result = spawnSync("node", ["scripts/verify-repo.mjs"], { stdio: "inherit" });
process.exit(result.status ?? 1);

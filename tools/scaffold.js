#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { basename, resolve } from "node:path";

const TEMPLATE_ALIASES = new Map([
  ["landing-page", "nextjs-canonical"],
  ["nextjs", "nextjs-canonical"],
  ["next", "nextjs-canonical"],
  ["local-business", "local-business-template"],
  ["astro", "astro-canonical"],
]);

function usage() {
  console.error("Usage: node tools/scaffold.js <site-name> [--template nextjs-canonical|local-business-template|astro-canonical|landing-page]");
}

const args = process.argv.slice(2);
const siteName = args[0];
const templateFlag = args.indexOf("--template");
const requestedTemplate = templateFlag >= 0 ? args[templateFlag + 1] : "nextjs-canonical";

if (!siteName || siteName.startsWith("-") || (templateFlag >= 0 && !requestedTemplate)) {
  usage();
  process.exit(1);
}

const templateName = TEMPLATE_ALIASES.get(requestedTemplate) ?? requestedTemplate;
const source = resolve("scaffolds", templateName);
const target = resolve("sites", basename(siteName));

if (!existsSync(source)) {
  console.error(`Unknown template: ${requestedTemplate}`);
  console.error("Available templates: nextjs-canonical, local-business-template, astro-canonical");
  process.exit(1);
}

if (existsSync(target)) {
  console.error(`Target already exists: ${target}`);
  process.exit(1);
}

mkdirSync(resolve("sites"), { recursive: true });
cpSync(source, target, { recursive: true, errorOnExist: true });

console.log(`Created ${target} from ${templateName}`);

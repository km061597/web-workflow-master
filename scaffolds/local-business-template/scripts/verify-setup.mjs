import { existsSync, readFileSync } from 'node:fs';

const checks = [
  { name: 'Node 22+', test: () => process.version.match(/^v(\d+)/)?.[1] >= '22' },
  { name: 'Next.js config', test: () => existsSync('next.config.ts') || existsSync('next.config.mjs') },
  { name: 'Tailwind/PostCSS config', test: () => existsSync('postcss.config.mjs') },
  { name: 'App router', test: () => existsSync('src/app/layout.tsx') },
  { name: 'Utils lib', test: () => existsSync('src/lib/utils.ts') },
  { name: 'Tailwind CSS entry', test: () => existsSync('src/app/globals.css') && readFileSync('src/app/globals.css', 'utf8').includes('@import "tailwindcss"') },
  { name: 'Env example', test: () => existsSync('.env.example') && readFileSync('.env.example', 'utf8').includes('BUSINESS_EMAIL=') },
];

let passed = 0;
for (const check of checks) {
  const ok = check.test();
  console.log(`${ok ? '✅' : '❌'} ${check.name}`);
  if (ok) passed++;
}

console.log(`\n${passed}/${checks.length} checks passed`);
if (passed < checks.length) process.exit(1);
console.log('✅ Scaffold setup verified');

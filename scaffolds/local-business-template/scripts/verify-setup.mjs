import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const checks = [
  { name: 'Node 22+', test: () => process.version.match(/^v(\d+)/)?.[1] >= '22' },
  { name: 'Next.js config', test: () => existsSync('next.config.ts') || existsSync('next.config.mjs') },
  { name: 'Tailwind config', test: () => existsSync('postcss.config.mjs') },
  { name: 'App router', test: () => existsSync('src/app/layout.tsx') },
  { name: 'Utils lib', test: () => existsSync('src/lib/utils.ts') },
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

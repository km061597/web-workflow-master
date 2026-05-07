import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';

console.log('🔍 Running Astro audit...\n');

// Check for common issues
const checks = [
  { name: 'Astro build', cmd: 'npx astro build' },
  { name: 'TypeScript check', cmd: 'npx tsc --noEmit' },
  { name: 'ESLint', cmd: 'npx eslint .' },
];

let passed = 0;
for (const check of checks) {
  try {
    execSync(check.cmd, { stdio: 'pipe' });
    console.log(`✅ ${check.name}`);
    passed++;
  } catch {
    console.log(`❌ ${check.name}`);
  }
}

console.log(`\n${passed}/${checks.length} checks passed`);
if (passed < checks.length) process.exit(1);
console.log('✅ Audit complete');

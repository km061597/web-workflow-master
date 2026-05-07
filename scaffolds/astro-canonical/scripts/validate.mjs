import { execSync } from 'node:child_process';

console.log('🔍 Validating project structure...\n');

const checks = [
  { name: 'astro.config.mjs', cmd: 'test -f astro.config.mjs' },
  { name: 'tsconfig.json', cmd: 'test -f tsconfig.json' },
  { name: 'src/pages/', cmd: 'test -d src/pages' },
  { name: 'src/layouts/', cmd: 'test -d src/layouts' },
];

let passed = 0;
for (const check of checks) {
  try {
    execSync(check.cmd);
    console.log(`✅ ${check.name}`);
    passed++;
  } catch {
    console.log(`❌ ${check.name}`);
  }
}

console.log(`\n${passed}/${checks.length} structure checks passed`);
if (passed < checks.length) process.exit(1);
console.log('✅ Validation complete');

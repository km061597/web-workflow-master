import { execSync } from 'node:child_process';

const checks = [
  { name: 'Landmark regions', cmd: 'npx axe-core --tags landmark --stdout' },
  { name: 'Form labels', cmd: 'npx axe-core --tags label --stdout' },
  { name: 'Color contrast', cmd: 'npx axe-core --tags color-contrast --stdout' },
];

let passed = 0;
for (const check of checks) {
  try {
    execSync(check.cmd, { stdio: 'pipe' });
    console.log(`✅ ${check.name}`);
    passed++;
  } catch {
    console.log(`❌ ${check.name} (install axe-core or run manually)`);
  }
}

console.log(`\n${passed}/${checks.length} a11y checks passed`);

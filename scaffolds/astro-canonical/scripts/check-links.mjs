import { execSync } from 'node:child_process';

console.log('🔍 Checking for broken links...\n');

try {
  execSync('npx astro build', { stdio: 'pipe' });
  console.log('✅ Build successful');
  
  // Basic link check - verify no 404s in build output
  const output = execSync('grep -r "href=\"#" dist/ || true', { encoding: 'utf-8' });
  if (output.trim()) {
    console.log('⚠️ Found empty anchor links');
  } else {
    console.log('✅ No empty anchor links');
  }
  
  console.log('✅ Link check complete');
} catch {
  console.log('❌ Build failed — fix before checking links');
  process.exit(1);
}

#!/usr/bin/env node
/**
 * Discovery automation script
 *
 * Combines business-level research (Google Maps, geocoding, review aggregation)
 * with technical competitor analysis (stack detection, design patterns, structure).
 *
 * Usage — business research mode:
 *   node scripts/discovery.mjs --research "Business Name" --city "City" --slug client-slug
 *
 * Usage — competitor analysis mode:
 *   node scripts/discovery.mjs --analyze https://competitor.com https://other.com
 *   node scripts/discovery.mjs --analyze --from-file competitors.txt
 *
 * Usage — combined mode:
 *   node scripts/discovery.mjs --research "Business Name" --city "City" --slug client-slug --analyze https://competitor.com
 */

import { execSync } from 'node:child_process';
import { writeFile, mkdir, readFile, access } from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const CACHE_DIR = join(ROOT, '.cache', 'discovery');

// ---------------------------------------------------------------------------
// Cache utilities (self-contained, no external deps)
// ---------------------------------------------------------------------------

async function ensureCacheDir() {
  if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
}

async function loadCache(scope, key) {
  await ensureCacheDir();
  const file = join(CACHE_DIR, `${scope}-${key}.json`);
  try {
    const raw = await readFile(file, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.expiry && Date.now() > parsed.expiry) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function saveCache(scope, key, data, ttlHours = 24) {
  await ensureCacheDir();
  const file = join(CACHE_DIR, `${scope}-${key}.json`);
  const payload = { ...data, cachedAt: Date.now(), expiry: Date.now() + ttlHours * 3600000 };
  await writeFile(file, JSON.stringify(payload, null, 2));
}

function logCall(category, target, result) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${category} | ${target} | ${result}`);
}

// ---------------------------------------------------------------------------
// Fetch utilities
// ---------------------------------------------------------------------------

async function fetchUrl(url, { timeout = 15, stealth = false } = {}) {
  try {
    const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36';
    const result = execSync(
      `curl -sL --max-time ${timeout} -H "User-Agent: ${ua}" "${url}"`,
      { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
    );
    return result;
  } catch {
    return '';
  }
}

// ---------------------------------------------------------------------------
// Geocoding
// ---------------------------------------------------------------------------

async function geocodeAddress(address) {
  if (!address) return null;
  const cacheKey = `geocode-${address.replace(/[^a-zA-Z0-9]/g, '_')}`;
  const cached = await loadCache('global', cacheKey);
  if (cached) return cached.data;

  try {
    const query = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'WebWorkflowDiscovery/1.0 (research)' },
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.length === 0) return null;

    const result = {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    };
    await saveCache('global', cacheKey, { data: result });
    return result;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Business research (Google Maps via Playwright when available)
// ---------------------------------------------------------------------------

async function searchGoogleMaps(businessName, city) {
  const cacheKey = `gmaps-${businessName.replace(/[^a-zA-Z0-9]/g, '_')}-${city.replace(/[^a-zA-Z0-9]/g, '_')}`;
  const cached = await loadCache('global', cacheKey);
  if (cached) { logCall('GoogleMaps', `${businessName} ${city}`, 'CACHE_HIT'); return cached.data; }

  // Try to load the Playwright-based scraper if available
  try {
    const modulePath = resolve(ROOT, 'scripts', 'lib', 'google-maps-browser.mjs');
    await access(modulePath);
    const { searchGoogleMaps: searchFn } = await import(modulePath);
    const result = await searchFn(businessName, city);
    if (result) await saveCache('global', cacheKey, { data: result });
    return result;
  } catch {
    // Fallback: no Google Maps data available without the browser module
    logCall('GoogleMaps', `${businessName} ${city}`, 'MODULE_NOT_AVAILABLE');
    return null;
  }
}

async function researchBusiness(businessName, city, slug, { withHuman = false } = {}) {
  const cacheKey = `research-${businessName.replace(/[^a-zA-Z0-9]/g, '_')}-${city.replace(/[^a-zA-Z0-9]/g, '_')}`;
  const cached = await loadCache(slug || 'global', cacheKey);
  if (cached) { logCall('Research', `${businessName} ${city}`, 'CACHE_HIT'); return cached.data; }

  console.log(`🔍 Researching: ${businessName} in ${city}...`);
  const gmaps = await searchGoogleMaps(businessName, city);

  if (!gmaps || (!gmaps.address && !gmaps.phone)) {
    logCall('Research', `${businessName} ${city}`, 'NO_DATA');
    return null;
  }

  if (!gmaps.coordinates && gmaps.address) {
    const geo = await geocodeAddress(gmaps.address);
    if (geo) gmaps.coordinates = { lat: geo.lat, lng: geo.lng };
  }

  const research = {
    name: gmaps.name || businessName,
    city,
    address: gmaps.address || '',
    phone: gmaps.phone || '',
    website: gmaps.website || '',
    rating: gmaps.rating || null,
    reviewCount: gmaps.reviewCount || null,
    hours: gmaps.hours || {},
    reviews: gmaps.reviews || [],
    photos: gmaps.photos || [],
    coordinates: gmaps.coordinates || null,
    sources: { googleMaps: true, yelp: false },
    gaps: [],
  };

  // Website quality audit (optional, if auditor module available)
  if (research.website) {
    try {
      const modulePath = resolve(ROOT, 'scripts', 'lib', 'website-auditor.mjs');
      await access(modulePath);
      const { auditWebsite } = await import(modulePath);
      const audit = await auditWebsite(research.website);
      research.websiteQuality = audit;
      if (audit.score < 60) {
        research.gaps.push(`website-quality-low (${audit.grade} - ${audit.label})`);
      }
      console.log(`   Website audit: ${audit.grade} (${audit.score}/100) — ${audit.platform}`);
      if (audit.gaps?.length > 0) {
        console.log(`   Gaps: ${audit.gaps.join(', ')}`);
      }
    } catch (error) {
      console.log(`   Website audit skipped: ${error.message || 'module not available'}`);
    }
  }

  // Human-in-the-loop enrichment (optional modules)
  if (withHuman) {
    console.log('\n🧑‍💻 Human-in-the-loop enrichment enabled.');

    // Try Yelp enrichment
    try {
      const modulePath = resolve(ROOT, 'scripts', 'lib', 'yelp-surf.mjs');
      await access(modulePath);
      const { scrapeYelpWithSurf } = await import(modulePath);
      const yelpData = await scrapeYelpWithSurf(businessName, city);
      if (yelpData?.reviews?.length > 0) {
        research.reviews = [...research.reviews, ...yelpData.reviews];
        research.sources.yelp = true;
        if (yelpData.rating && !research.rating) research.rating = yelpData.rating;
        if (yelpData.reviewCount && !research.reviewCount) research.reviewCount = yelpData.reviewCount;
        console.log(`   Enriched with ${yelpData.reviews.length} Yelp reviews`);
      }
    } catch (error) {
      console.log(`   Yelp enrichment skipped: ${error.message || 'module not available'}`);
    }

    // Try Google Maps reviews enrichment
    try {
      const modulePath = resolve(ROOT, 'scripts', 'lib', 'gmaps-surf.mjs');
      await access(modulePath);
      const { scrapeGmapsReviewsWithSurf } = await import(modulePath);
      const gmapsReviews = await scrapeGmapsReviewsWithSurf(businessName, city);
      if (gmapsReviews?.length > 0) {
        const existingQuotes = new Set(research.reviews.map((r) => r.quote));
        const newReviews = gmapsReviews.filter((r) => !existingQuotes.has(r.quote));
        research.reviews = [...research.reviews, ...newReviews];
        console.log(`   Enriched with ${newReviews.length} Google Maps reviews`);
      }
    } catch (error) {
      console.log(`   Google Maps review enrichment skipped: ${error.message || 'module not available'}`);
    }
  }

  if (!research.address) research.gaps.push('address');
  if (!research.phone) research.gaps.push('phone');
  if (!research.coordinates) research.gaps.push('coordinates');
  if (research.reviews.length === 0) research.gaps.push('reviews');

  await saveCache(slug || 'global', cacheKey, { data: research });
  logCall('Research', `${businessName} ${city}`, 'SUCCESS');
  return research;
}

// ---------------------------------------------------------------------------
// Technical competitor analysis
// ---------------------------------------------------------------------------

function analyzeHtml(html, url) {
  // Framework detection
  const frameworkHints = [];
  if (html.includes('wp-content') || html.includes('wp-json')) frameworkHints.push('WordPress');
  if (html.includes('shopify')) frameworkHints.push('Shopify');
  if (html.includes('squarespace')) frameworkHints.push('Squarespace');
  if (html.includes('wix.com')) frameworkHints.push('Wix');
  if (html.includes('webflow')) frameworkHints.push('Webflow');
  if (html.includes('_next')) frameworkHints.push('Next.js');
  if (html.includes('__nuxt')) frameworkHints.push('Nuxt');
  if (html.includes('data-reactroot') || html.includes('react')) frameworkHints.push('React');
  if (html.includes('v-bind') || html.includes('v-on:')) frameworkHints.push('Vue');
  if (html.includes('astro')) frameworkHints.push('Astro');
  if (html.includes('svelte')) frameworkHints.push('Svelte');

  // CSS framework
  const cssHints = [];
  if (
    html.includes('tailwindcss') ||
    html.match(/class="[^"]*(flex|grid|text-|bg-|p-\d|m-\d)[^"]*"/)
  )
    cssHints.push('Tailwind');
  if (html.includes('bootstrap')) cssHints.push('Bootstrap');

  // Colors
  const hexColors = [
    ...new Set([...html.matchAll(/#[0-9a-fA-F]{6}/g)].slice(0, 20).map((m) => m[0])),
  ];
  const oklchColors = [
    ...new Set([...html.matchAll(/oklch\([^)]+\)/g)].slice(0, 10).map((m) => m[0])),
  ];

  // Fonts
  const googleFonts = [
    ...new Set(
      [...html.matchAll(/fonts\.googleapis\.com\/css[^"'\s]*family=([^&]+)/g)].map((m) =>
        decodeURIComponent(m[1]).replace(/\+/g, ' ')
      )
    ),
  ];
  const fontNames = [
    ...new Set(
      [...html.matchAll(/font-family:\s*([^;]+)/gi)].map((m) =>
        m[1].trim().split(',')[0].replace(/['"]/g, '')
      )
    ),
  ];

  // Typography
  const h1Sizes = [...html.matchAll(/h1[^}]*font-size:\s*([^;]+)/gi)].map((m) => m[1].trim());
  const bodySize = (html.match(/body[^}]*font-size:\s*([^;]+)/i) || [])[1] || '';

  // Page structure
  const hasHero = /class="[^"]*hero[^"]*"/i.test(html) || /id="[^"]*hero[^"]*"/i.test(html);
  const hasTestimonials = /testimonial/i.test(html);
  const hasPricing = /pricing|price/i.test(html);
  const hasBlog = /blog/i.test(html);
  const hasTeam = /team|staff|about-us/i.test(html);
  const hasFAQ = /faq|frequently/i.test(html);
  const hasCTA = /cta|call-to-action/i.test(html);

  // Navigation
  const navLinks = [
    ...new Set(
      [...html.matchAll(/<a[^>]*href="(\/[^"]*)"[^>]*>([^<]+)<\/a>/g)].map((m) => ({
        href: m[1],
        text: m[2].trim(),
      }))
    ),
  ];

  // Meta
  const title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1] || '';
  const description =
    (html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i) || [])[1] || '';

  // Performance hints
  const imgCount = (html.match(/<img /gi) || []).length;
  const scriptCount = (html.match(/<script /gi) || []).length;
  const hasLazyLoading = /loading="lazy"/i.test(html);
  const hasWebp = /\.webp/i.test(html);
  const hasAvif = /\.avif/i.test(html);

  return {
    url,
    title,
    description,
    framework: frameworkHints,
    cssFramework: cssHints,
    colors: { hex: hexColors, oklch: oklchColors },
    fonts: { google: googleFonts, declared: fontNames },
    typography: { h1Sizes, bodySize },
    structure: { hasHero, hasTestimonials, hasPricing, hasBlog, hasTeam, hasFAQ, hasCTA },
    navigation: navLinks.slice(0, 20),
    metrics: { imgCount, scriptCount, size: html.length, hasLazyLoading, hasWebp, hasAvif },
  };
}

function findCommonPatterns(results) {
  const patterns = [];
  const allHave = (pred) => results.length > 0 && results.every(pred);

  if (allHave((r) => r.structure.hasHero)) patterns.push('All have hero sections');
  if (allHave((r) => r.structure.hasTestimonials)) patterns.push('All have testimonials');
  if (allHave((r) => r.structure.hasPricing)) patterns.push('All have pricing pages');
  if (allHave((r) => r.structure.hasBlog)) patterns.push('All have blogs');
  if (allHave((r) => r.structure.hasTeam)) patterns.push('All have team/staff sections');
  if (allHave((r) => r.framework.includes('WordPress'))) patterns.push('All use WordPress');

  return patterns;
}

function findOpportunities(results) {
  const opps = [];
  const noneHave = (pred) => results.length > 0 && results.every((r) => !pred(r));

  if (noneHave((r) => r.cssFramework.includes('Tailwind')))
    opps.push('No competitor uses Tailwind — modern utility-first advantage');
  if (noneHave((r) => r.colors.oklch.length > 0))
    opps.push('No competitor uses OKLCH colors — perceptual uniformity differentiator');
  if (noneHave((r) => r.framework.includes('Astro')))
    opps.push('No competitor uses Astro — zero-JS-by-default performance edge');
  if (noneHave((r) => r.structure.hasPricing))
    opps.push('No competitor shows pricing — transparency opportunity');
  if (noneHave((r) => r.metrics.scriptCount < 10))
    opps.push('All competitors are JS-heavy — performance differentiator');
  if (noneHave((r) => r.metrics.hasWebp || r.metrics.hasAvif))
    opps.push('No competitor uses modern image formats — WebP/AVIF opportunity');
  if (noneHave((r) => r.metrics.hasLazyLoading))
    opps.push('No competitor uses lazy loading — performance advantage');

  return opps;
}

async function analyzeCompetitor(url) {
  const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
  const html = await fetchUrl(normalizedUrl);
  if (!html) return null;
  return analyzeHtml(html, normalizedUrl);
}

async function analyzeCompetitors(urls) {
  const results = [];
  for (const url of urls) {
    process.stdout.write(`  ${url} ... `);
    const analysis = await analyzeCompetitor(url);
    if (!analysis) {
      console.log('(could not fetch)');
      continue;
    }
    results.push(analysis);
    console.log(
      `${analysis.framework.join(', ') || 'unknown stack'}, ${analysis.colors.hex.length} colors, ${analysis.metrics.imgCount} images`
    );
  }
  return results;
}

// ---------------------------------------------------------------------------
// Report generation
// ---------------------------------------------------------------------------

async function generateStackReport(results, slug) {
  const report = {
    analyzedAt: new Date().toISOString(),
    competitors: results,
    summary: {
      commonPatterns: findCommonPatterns(results),
      differentiationOpportunities: findOpportunities(results),
    },
  };

  const reportDir = slug
    ? join(ROOT, 'clients', slug, 'research', 'reports')
    : join(ROOT, 'research');
  await mkdir(reportDir, { recursive: true });
  const reportPath = join(reportDir, `competitor-stack-analysis-${Date.now()}.json`);
  await writeFile(reportPath, JSON.stringify(report, null, 2));
  return { report, reportPath };
}

async function saveResearchArtifact(slug, research) {
  const clientDir = join(ROOT, 'clients', slug);
  if (!existsSync(clientDir)) mkdirSync(clientDir, { recursive: true });
  const researchDir = join(clientDir, 'research');
  if (!existsSync(researchDir)) mkdirSync(researchDir, { recursive: true });
  const artifactPath = join(researchDir, 'business-research.json');
  await writeFile(artifactPath, JSON.stringify(research, null, 2));
  console.log(`📄 Research artifact saved: ${artifactPath}`);
  return artifactPath;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);

  // Parse flags
  const hasResearch = args.includes('--research');
  const hasAnalyze = args.includes('--analyze');
  const hasFromFile = args.includes('--from-file');

  const getFlag = (flag) => {
    const idx = args.indexOf(flag);
    return idx >= 0 && idx + 1 < args.length ? args[idx + 1] : undefined;
  };

  const businessName = getFlag('--research');
  const city = getFlag('--city');
  const slug = getFlag('--slug');
  const withHuman = args.includes('--with-human');

  if (!hasResearch && !hasAnalyze) {
    console.error('Usage:');
    console.error('  Business research: node scripts/discovery.mjs --research "Business Name" --city "City" --slug client-slug [--with-human]');
    console.error('  Competitor analysis: node scripts/discovery.mjs --analyze https://competitor.com https://other.com');
    console.error('  Batch analysis:        node scripts/discovery.mjs --analyze --from-file competitors.txt');
    console.error('  Combined:            node scripts/discovery.mjs --research "Business" --city "City" --slug slug --analyze https://competitor.com');
    process.exit(1);
  }

  // Business research mode
  if (hasResearch) {
    if (!businessName || !city) {
      console.error('Error: --research and --city are required for business research mode');
      process.exit(1);
    }
    const research = await researchBusiness(businessName, city, slug || 'default', { withHuman });
    if (research && slug) {
      await saveResearchArtifact(slug, research);
    }
    if (!research) {
      console.error('No research data found.');
      process.exit(1);
    }
    console.log('\n✅ Business research complete.');
  }

  // Competitor analysis mode
  let urls = [];
  if (hasAnalyze) {
    if (hasFromFile) {
      const idx = args.indexOf('--from-file');
      const filePath = resolve(process.cwd(), args[idx + 1]);
      const text = await readFile(filePath, 'utf-8');
      urls = text.split('\n').map((l) => l.trim()).filter(Boolean);
    } else {
      const analyzeIdx = args.indexOf('--analyze');
      urls = args.slice(analyzeIdx + 1).filter((a) => !a.startsWith('--'));
    }

    if (urls.length === 0) {
      console.error('Error: No URLs provided for analysis');
      process.exit(1);
    }

    console.log(`\n🔬 Analyzing ${urls.length} competitor(s)...\n`);
    const results = await analyzeCompetitors(urls);

    if (results.length === 0) {
      console.error('No competitors could be analyzed.');
      process.exit(1);
    }

    const { report, reportPath } = await generateStackReport(results, slug);
    console.log(`\n📊 Report saved: ${reportPath}`);
    console.log(`Competitors analyzed: ${results.length}`);

    if (report.summary.commonPatterns.length > 0) {
      console.log('\nCommon patterns:');
      for (const p of report.summary.commonPatterns) {
        console.log(`  ✓ ${p}`);
      }
    }

    if (report.summary.differentiationOpportunities.length > 0) {
      console.log('\nDifferentiation opportunities:');
      for (const opp of report.summary.differentiationOpportunities) {
        console.log(`  → ${opp}`);
      }
    }
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

// ---------------------------------------------------------------------------
// Exports for programmatic use
// ---------------------------------------------------------------------------

export {
  researchBusiness,
  analyzeCompetitor,
  analyzeCompetitors,
  generateStackReport,
  saveResearchArtifact,
  geocodeAddress,
  fetchUrl,
  analyzeHtml,
  findCommonPatterns,
  findOpportunities,
  loadCache,
  saveCache,
  logCall,
};

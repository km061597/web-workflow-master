> Stack: Master-repo portable intake playbook. Use project-provided crawler, audit, and ship commands when present; otherwise treat command blocks as examples to adapt.

# Intake — existing site rebuild

The client has a working website. We're replacing it. This playbook ensures nothing of value is lost in the transition — every URL that ranks, every form that collects leads, every integration that runs the business must survive the rebuild or be explicitly acknowledged as removed.

The operating metaphor: **heart transplant, not demolition.** The business keeps running while the replacement is built.

## Before you touch code

### 1. URL inventory

Crawl the existing site and save every internal route. This becomes the redirect map input and the feature parity checklist's skeleton.

```bash
# Option A: firecrawl-cli (fast, handles JS-rendered sites)
firecrawl crawl https://client-site.com --limit 500 -o crawl-output/

# Option B: surf (lightweight, good for smaller sites)
surf go "https://client-site.com/sitemap.xml" --read
# Save sitemap URLs manually, or:
curl -sL "https://client-site.com/sitemap.xml" | grep "<loc>" | sed 's/.*<loc>//;s/<\/loc>.*//' > urls-from-sitemap.txt

# Option C: if no sitemap exists, spider internal links with the active project's crawler/audit tool.
# Save the resulting route list and audit report beside the migration files.
```

The click-path audit also catches broken internal links, missing alt text, placeholder content, and forms that submit to nowhere — problems you'll want to document but NOT recreate.

Save the raw URL list as `clients/<slug>/migration/urls-raw.txt`.

### 2. Feature parity checklist

Walk every page of the existing site and document interactive features. This is not "what pages exist" — it's "what does the site DO."

Create `clients/<slug>/migration/feature-parity.md`:

```markdown
## Feature parity checklist

| Feature | Location (old site) | Type | Status (new) | Verified |
|---|---|---|---|---|
| Contact form → email | /contact | form | [ ] planned | |
| Newsletter signup | footer, /blog sidebar | form | [ ] planned | |
| Google Maps embed | /location | embed | [ ] planned | |
| Product catalog | /shop/* | commerce | [ ] planned | |
| Stripe checkout | /checkout | payment | [ ] planned | |
| Instagram feed | /home#social | embed | [ ] planned | |
| Search | /search, header | interactive | [ ] planned | |
| Login/account | /account | auth | [ ] planned | |
| PDF downloads | /resources | asset | [ ] planned | |
| Booking/scheduling | /book | integration | [ ] planned | |
```

For each feature, note:
- Does the client actually use it? (Check analytics — unused features are candidates for removal)
- Is it a third-party embed or custom-built?
- What breaks if it's removed? (Revenue features are non-negotiable)

### 3. SEO preservation audit

This is the thing that bites you hardest if you skip it. A site that ranks on page 1 for "best plumber in Austin" and loses that ranking after a rebuild is a business disaster.

```bash
# Capture every page's meta tags and structured data
for url in $(cat clients/<slug>/migration/urls-raw.txt); do
  echo "---"
  echo "url: $url"
  curl -sL "$url" | node -e "
    const html = require('fs').readFileSync('/dev/stdin','utf8');
    const title = html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1]?.trim() || '';
    const desc = html.match(/<meta[^>]*name=[\"']description[\"'][^>]*content=[\"']([^\"']*)/)?.[1] || '';
    const canonical = html.match(/<link[^>]*rel=[\"']canonical[\"'][^>]*href=[\"']([^\"']*)/)?.[1] || '';
    const jsonld = [...html.matchAll(/<script[^>]*type=[\"']application\/ld\+json[\"'][^>]*>(.*?)<\/script>/gs)].map(m=>m[1]);
    console.log('title:', title);
    console.log('description:', desc);
    console.log('canonical:', canonical);
    console.log('jsonld_count:', jsonld.length);
    jsonld.forEach((j,i) => console.log('jsonld_'+i+':', j.trim().substring(0,200)));
  "
done > clients/<slug>/migration/seo-audit.txt
```

Save this. Every page with a title, description, and canonical URL must have an equivalent or better version in the new site. JSON-LD schemas should be preserved — use the schemas directory for drop-in replacements.

### 4. Backlink-bearing URLs

These are the URLs that other sites link to. They CANNOT 404 after the rebuild.

```bash
# If client has Google Search Console access, export the "Links" report
# Otherwise, use the crawl data to identify pages with inbound links:
# Pages in the sitemap with non-trivial content are assumed to have backlinks.
# At minimum, preserve: homepage, /about, /contact, /blog/*, any product pages.
```

Mark these as `must_redirect: true` in the migration URLs spreadsheet.

### 5. Content migration

#### Text content

```bash
# Scrape clean markdown from every page
for url in $(cat clients/<slug>/migration/urls-raw.txt); do
  slug=$(echo "$url" | sed 's|https\?://[^/]*/||;s|/$||;s|/|__|g')
  firecrawl scrape "$url" -f markdown -o "clients/<slug>/migration/content/${slug}.md"
done
```

#### Images

```bash
# Download all images from the crawl
mkdir -p clients/<slug>/migration/images
for url in $(cat clients/<slug>/migration/urls-raw.txt); do
  curl -sL "$url" | grep -Eo '(src|data-src)="[^"]*\.(jpg|jpeg|png|gif|webp|avif|svg)[^"]*"' | \
    sed 's/.*"//;s/".*//' | while read img; do
      # Resolve relative URLs
      case "$img" in
        http*) full_url="$img" ;;
        //*) full_url="https:$img" ;;
        /*) full_url="$(echo "$url" | sed -E 's#(https?://[^/]+).*#\\1#')$img" ;;
        *) full_url="$(echo "$url" | sed 's|/[^/]*$|/')$img" ;;
      esac
      filename=$(echo "$full_url" | sed 's|.*/||;s|?.*||')
      curl -sL "$full_url" -o "clients/<slug>/migration/images/$filename" 2>/dev/null
    done
done
```

Review downloaded images manually. Client-original photography and logos are keepers. Generic stock photos are replacement candidates; apply the active project's voice, tone, and imagery guidelines.

### 6. Analytics handoff

Document the client's existing analytics so you can verify traffic continuity after launch.

Create `clients/<slug>/migration/analytics-baseline.md`:

```markdown
## Analytics baseline (captured YYYY-MM-DD)

### Properties
- Google Analytics: UA-XXXXXXX or G-XXXXXXXXXX
- Google Search Console: verified for domain.com
- Other: (Hotjar, Plausible, etc.)

### Key metrics (last 30 days)
- Monthly sessions: ___
- Top 5 pages by traffic:
  1. / — ___ sessions
  2. /about — ___ sessions
  3. /services — ___ sessions
  4. /contact — ___ sessions
  5. /blog/top-post — ___ sessions
- Organic search share: ___%
- Top 5 search queries (from GSC):
  1. "___" — ___ clicks, avg position ___
  2. "___" — ___ clicks, avg position ___

### Conversion events
- Form submissions: ___ / month
- Phone clicks: ___ / month
- Map directions clicks: ___ / month
```

This is what you're benchmarking against 30 days post-launch.

## Redirect map

Generate the redirect map from the URL inventory. This is the safety net that prevents SEO and bookmark breakage.

Create `clients/<slug>/migration/redirects.csv`:

```csv
old_url,new_url,status_code,priority,has_backlinks,notes
/,/,200,critical,yes,homepage
/about,/about,200,critical,yes,
/about-us,/about,301,high,maybe,consolidating
/services,/services,200,critical,yes,
/services/plumbing,/services#plumbing,301,high,no,section anchor now
/blog/old-post-slug,/blog/old-post-slug,200,medium,yes,preserve slug
/wp-content/uploads/2023/logo.png,/images/logo.png,301,low,no,asset path change
/category/uncategorized,,-1,low,no,remove — no value
```

### Verify redirects post-deploy

```bash
#!/usr/bin/env bash
set -euo pipefail

# verify-redirects.sh — test every redirect resolves correctly
DEPLOY_URL="${1:?Usage: verify-redirects.sh <deploy-url>}"
REDIRECTS_CSV="clients/<slug>/migration/redirects.csv"
FAILURES=0

while IFS=',' read -r old_url new_url status_code priority has_backlinks notes; do
  [[ "$status_code" == "-1" ]] && continue  # explicitly removed
  full_old="${DEPLOY_URL}${old_url}"
  actual_status=$(curl -s -o /dev/null -w "%{http_code}" "$full_old")
  if [[ "$status_code" == "301" ]]; then
    if [[ "$actual_status" != "301" ]]; then
      echo "FAIL: $old_url → expected 301, got $actual_status"
      FAILURES=$((FAILURES + 1))
      continue
    fi
    redirect_target=$(curl -sI "$full_old" 2>/dev/null | grep -i "^location:" | tr -d '\r' | awk '{print $2}')
    if [[ "$redirect_target" != *"$new_url"* ]]; then
      echo "FAIL: $old_url → expected redirect to $new_url, got $redirect_target"
      FAILURES=$((FAILURES + 1))
    fi
  elif [[ "$actual_status" != "200" ]]; then
    echo "FAIL: $old_url → expected 200, got $actual_status"
    FAILURES=$((FAILURES + 1))
  fi
done < <(tail -n +2 "$REDIRECTS_CSV")

if [[ "$FAILURES" -gt 0 ]]; then
  echo "$FAILURES redirect(s) failed"
  exit 1
fi
echo "All redirects verified."
```

### Vercel/Next.js redirect config

Convert the CSV to a `next.config.js` redirects array:

```bash
tail -n +2 clients/<slug>/migration/redirects.csv | \
  awk -F',' '$3 == "301" { printf "  { source: \"%s\", destination: \"%s\", permanent: true },\n", $1, $2 }'
```

Paste the output into `next.config.js` under `redirects()`.

## Cutover plan

The actual DNS swap. This is the highest-risk moment.

### Pre-cutover (build + audit complete)

1. New site deployed to Vercel with a temporary `*.vercel.app` URL
2. Run full release gate: run the active project's release/readiness gate against the preview URL
3. Run click-path audit on new site: run the active project's click-path audit on the preview URL
4. Run click-path audit on old site (re-run): compare defect counts
5. Feature parity matrix: every row must be `[x] verified` or `[x] explicitly removed`
6. Redirect map: every row tested against temp URL
7. Mobile verification: `surf emulate.device "iPhone 15" && surf go "https://temp.vercel.app"` — check every page

### Cutover window

1. Set DNS TTL to 300 (5 min) 24 hours before cutover
2. Point DNS A/CNAME records to Vercel
3. Wait for propagation (typically 5-30 min)
4. Verify HTTPS cert is issued: `curl -sI https://domain.com | head -5`
5. Run redirect verification: `bash verify-redirects.sh https://domain.com`
6. Run click-path audit: run the active project's click-path audit on the production URL
7. Monitor Vercel analytics for 404s in the first 24 hours

### Post-cutover (first 7 days)

- Day 1: Check Google Search Console for crawl errors — new URL structure should be discoverable
- Day 3: Check analytics baseline — sessions and pages/session should be comparable to pre-migration baseline
- Day 7: Run `unlighthouse --site https://domain.com` — full mobile CWV sweep
- Day 14: Compare GSC impressions and clicks vs baseline

### Rollback plan

If something is critically broken:
1. Point DNS back to old hosting (if old site is still deployed)
2. Or: roll back to previous Vercel deployment via dashboard
3. Document what broke and fix before attempting cutover again

Keep the old site live for at least 30 days post-cutover.

## Mobile parity

Every step in this playbook applies to mobile first:

- URL inventory: crawl with mobile user agent (`surf emulate.device "iPhone 15"`)
- Feature parity: test every interactive feature on mobile (forms, booking, payment)
- Content migration: verify images are responsive-ready (no fixed-width assets)
- Redirect verification: test redirects from mobile user agent
- Cutover: first manual check is always on a real phone

The new site must pass mobile CWV gates (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1) per the mobile requirements spec.

## Definition of done for intake-existing-site

- [ ] `clients/<slug>/migration/urls-raw.txt` — complete URL inventory saved
- [ ] `clients/<slug>/migration/feature-parity.md` — every interactive feature documented
- [ ] `clients/<slug>/migration/seo-audit.txt` — meta tags + JSON-LD captured for every page
- [ ] `clients/<slug>/migration/content/` — text content exported as markdown
- [ ] `clients/<slug>/migration/images/` — original images downloaded
- [ ] `clients/<slug>/migration/analytics-baseline.md` — traffic numbers captured
- [ ] `clients/<slug>/migration/redirects.csv` — every old URL mapped to new or explicitly removed
- [ ] Click-path audit run on old site — defect count documented as baseline
- [ ] Feature parity matrix reviewed with client — removals acknowledged
- [ ] Site scaffold script run — client directory scaffolded
- [ ] Design phase advance script — BRIEF phase passed its DoD
- [ ] Mobile check completed on at least one device profile via surf

---
name: build-gotchas
aliases: build-guide, technical-gotchas
description: Technical issues, breaking changes, fixes, and workarounds discovered during real builds with Next.js 16, TypeScript, Zod v4, jsdom, React, and project scaffolding. Read before writing code.
type: project
---

# Build Gotchas

## Build Gotchas

### Next.js 16 Gotchas

#### Static Export Build Broken (Framework Bug — Next.js 16.2.4 + React 19.2.4)

`npm run build` fails on `/_global-error` prerender:

```
TypeError: Cannot read properties of null (reading 'useContext')
```

**Root cause**: Next.js 16.2.4 framework bug. Confirmed by testing with a bare `<html><body>{children}</body></html>` layout — still fails. The error is inside Next.js internals ("at ignore-listed frames"), not user code. Happens with or without `output: "export"`.

**What we fixed** (partial):

- Added `generateStaticParams` to `store/[slug]/page.tsx` — resolved the "missing generateStaticParams" error
- Added `turbopack.root: process.cwd()` — resolved workspace root detection warning
- Moved `CartProvider` from root layout to `store/layout.tsx` — cleaner separation, cart only wraps store pages

**Workaround**: Use `npm run dev` for development. Awaiting Next.js fix. Do NOT attempt to fix by modifying user code — this is a framework bug.

#### Turbopack Workspace Root Detection

Turbopack detects incorrect workspace root when `package-lock.json` exists at `/Users/<user>/`. This causes module resolution to fail (Can't resolve 'tailwindcss').
**Fix**: Set `turbopack.root` in next.config.ts:

```ts
turbopack: {
  root: process.cwd();
}
```

Or remove the offending lockfile from the home directory.

#### `asChild` Prop Not Supported

shadcn/ui v4 with base-ui uses `render` prop instead of `asChild`. Components like DialogTrigger don't accept `asChild`.
**Fix**: Remove `asChild` prop from Button/DialogTrigger. Use base-ui's `render` pattern or nest components directly.

#### Middleware Incompatible with Static Export

`middleware.ts` cannot be used with `output: "export"`. Next.js 16 warns to use `proxy` convention instead, but neither works for static export.
**Fix**: Remove middleware.ts. Security headers must be set at hosting/CDN level. Use `public/_headers` (Netlify format) or `vercel.json` headers config.

#### `generateStaticParams` Required for Dynamic Routes

Next.js 16 requires explicit `generateStaticParams` for dynamic routes with `output: "export"`.
**Fix**: Export `generateStaticParams` in `[slug]/page.tsx` returning all possible slugs.

### TypeScript Strict Mode Gotchas

#### `noUncheckedIndexedAccess: true` (Enabled)

Catches real bugs. Requires null checks on array indexing:

```ts
// Before (passes without noUncheckedIndexedAccess)
const first = items[0]; // type: Item
// After (with flag)
const first = items[0]; // type: Item | undefined
// Fix
const first = items[0];
if (!first) return;
```

#### `noPropertyAccessFromIndexSignature: true` (NOT Enabled — Too Strict)

Breaks on `Partial<T>` types where dot-notation property access uses index signatures:

```ts
// BREAKS on Partial<ShippingData>
shipping.fullName; // Error: Property 'fullName' comes from an index signature
// Must use bracket notation everywhere
shipping["fullName"];
```

Decision: Leave this flag disabled. Too much churn for minimal benefit.

### Zod v4 Breaking Changes

#### `z.literal()` second argument changed

```ts
// Zod v3 (broken in v4)
z.literal(true, { errorMap: () => ({ message: "..." }) });
// Zod v4 (working)
z.literal(true, { message: "..." });
```

#### `issue.path` returns `(string | symbol)[]`

```ts
// Zod v3
fieldErrors[issue.path[0]] = issue.message; // path[0] was string
// Zod v4
fieldErrors[String(issue.path[0])] = issue.message; // path[0] is string | symbol
```

#### `issue.path` includes `symbol` keys

Using path index as Record key requires `String()` cast because Zod v4 adds symbol indices.

### jsdom Testing Gotchas

#### `type="email"` inputs strip invalid values from FormData

In jsdom, setting `input.value = "not-an-email"` on a `type="email"` input gets cleared by browser validation when FormData is constructed. The value doesn't survive to `formData.get("email")`.
**Fix**: Skip email validation tests in jsdom, or use `@testing-library/user-event` which properly simulates typing. Document as jsdom limitation.

#### `window.location.href` assignment halts jsdom execution

Setting `location.href = "mailto:..."` triggers navigation in jsdom, stopping further script execution. `setSubmitted(true)` after the assignment never runs.
**Fix**: Test mailto flow via Formspree path instead (mock fetch). For pure mailto testing, stub `window.location` or accept as jsdom limitation.

#### `fireEvent.change` doesn't populate FormData consistently

`fireEvent.change` updates the input's `.value` property but may not correctly update FormData in all jsdom versions.
**Fix**: Use `@testing-library/user-event` for complex form interactions, or directly set `.value` + dispatch event.

### React / Component Gotchas

#### `"use client"` components in root layout OK for dev, fail for static export SSR

Server Components in root layout work fine in dev. Client Components in root layout `useState`/`useContext` trigger SSR errors during static export build for special pages (`/_not-found`, `/_global-error`).
**Fix**: Keep root layout as server-only. Use per-page `"use client"` where needed. For shared client providers, dynamically import with `ssr: false`.

#### base-ui DialogTrigger renders as `<button>` by default

Wrapping a `<Button>` inside DialogTrigger creates nested buttons (invalid HTML). base-ui supports `render` prop for this:

```tsx
<DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
```

#### shadcn Button component doesn't accept `href` or `asChild`

Cannot do `<Button asChild><a href="/page">Link</a></Button>`. Use `<Link>` from next/link inside Button children, or style an `<a>` directly with the button classes.

### Project Scaffolding Gotchas

#### `create-project.sh` copies node_modules → broken

Copying an app source tree to `Projects/<name>/` can include `node_modules/`. Binary symlinks in `.bin/` point to relative paths that break in the new location. npm install is required in the new project directory.
**Fix**: Update create-project.sh to exclude node_modules from copy and run `npm install` in the new project. Or use a template approach that never copies node_modules.

#### Project directory naming matters for Turbopack

`Projects/` vs `projects/` (case difference) confuses Turbopack's workspace root detection when both exist.
**Fix**: Use consistent naming. Prefer lowercase `projects/` for scaffold output.

---

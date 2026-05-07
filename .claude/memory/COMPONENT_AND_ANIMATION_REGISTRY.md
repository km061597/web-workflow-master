---
name: component-and-animation-registry
aliases: component-registry, animation-registry
description: Living registry of all UI components, page sections, business components, hooks, utilities, and animated components. Updated whenever components are added, modified, or deprecated.
type: project
---

# Component & Animation Registry

## shadcn/ui Components

| Component    | File                              | Variants                                              | Test              | Story                | Usage            |
| ------------ | --------------------------------- | ----------------------------------------------------- | ----------------- | -------------------- | ---------------- |
| Button       | `components/ui/button.tsx`        | default, outline, secondary, ghost, destructive, link | `button.test.tsx` | `button.stories.tsx` | Global           |
| Card         | `components/ui/card.tsx`          | —                                                     | —                 | —                    | Features, Agents |
| Badge        | `components/ui/badge.tsx`         | default, secondary, outline, destructive              | —                 | —                    | Header           |
| Accordion    | `components/ui/accordion.tsx`     | —                                                     | —                 | —                    | —                |
| Tabs         | `components/ui/tabs.tsx`          | —                                                     | —                 | —                    | —                |
| Dialog       | `components/ui/dialog.tsx`        | —                                                     | —                 | —                    | —                |
| DropdownMenu | `components/ui/dropdown-menu.tsx` | —                                                     | —                 | —                    | —                |
| Separator    | `components/ui/separator.tsx`     | —                                                     | —                 | —                    | Footer           |
| Avatar       | `components/ui/avatar.tsx`        | —                                                     | —                 | —                    | —                |
| Tooltip      | `components/ui/tooltip.tsx`       | —                                                     | —                 | —                    | —                |
| Input        | `components/ui/input.tsx`         | —                                                     | —                 | —                    | ContactForm      |
| Textarea     | `components/ui/textarea.tsx`      | —                                                     | —                 | —                    | —                |
| Label        | `components/ui/label.tsx`         | —                                                     | —                 | —                    | —                |

## Page Sections

| Section         | File                                       | Client/Server | Animation     | Test              | Usage     |
| --------------- | ------------------------------------------ | ------------- | ------------- | ----------------- | --------- |
| Header          | `components/sections/header.tsx`           | Server        | —             | `header.test.tsx` | All pages |
| Hero            | `components/sections/hero-section.tsx`     | Client        | Framer Motion | —                 | Home      |
| Features        | `components/sections/features-section.tsx` | Client        | Framer Motion | —                 | Home      |
| ServicesPreview | `components/sections/services-preview.tsx` | Server        | —             | —                 | Home      |
| ReviewsSection  | `components/sections/reviews-section.tsx`  | Server        | —             | —                 | Home      |
| Agents          | `components/sections/agents-section.tsx`   | Server        | —             | —                 | Demo      |
| Stack           | `components/sections/stack-section.tsx`    | Server        | —             | —                 | Demo      |
| Footer          | `components/sections/footer.tsx`           | Server        | —             | —                 | All pages |

## Business Components

| Component        | File                                        | Client/Server | Props                                                | Test                    | Usage         |
| ---------------- | ------------------------------------------- | ------------- | ---------------------------------------------------- | ----------------------- | ------------- |
| BookingForm      | `components/business/booking-form.tsx`      | Client        | services, onSubmit                                   | —                       | Booking       |
| Breadcrumb       | `components/business/breadcrumb.tsx`        | Server        | items: {label, href}[]                               | —                       | Any page      |
| BusinessHours    | `components/business/business-hours.tsx`    | Server        | hours: DayHours[]                                    | —                       | Contact page  |
| CartDrawer       | `components/business/cart-drawer.tsx`       | Client        | — (uses CartProvider context)                        | —                       | Store         |
| CartProvider     | `components/business/cart-provider.tsx`     | Client        | children                                             | —                       | Root layout   |
| CheckoutForm     | `components/business/checkout-form.tsx`     | Client        | — (uses CartProvider context)                        | —                       | Checkout page |
| ContactForm      | `components/business/contact-form.tsx`      | Client        | businessEmail, formspreeEndpoint?                    | `contact-form.test.tsx` | Contact page  |
| CookieConsent    | `components/business/cookie-consent.tsx`    | Client        | —                                                    | —                       | Root layout   |
| Gallery          | `components/business/gallery.tsx`           | Client        | images: {src, alt, category}[]                       | —                       | Portfolio     |
| NewsletterSignup | `components/business/newsletter-signup.tsx` | Client        | provider?: "mailchimp" \| "convertkit"               | —                       | Footer        |
| ProductCard      | `components/business/product-card.tsx`      | Client        | product: {id, name, price, image, category, inStock} | —                       | Store         |
| ProductGrid      | `components/business/product-grid.tsx`      | Client        | products, categories                                 | —                       | Store         |
| ProductFilters   | `components/business/product-filters.tsx`   | Client        | attributes, onFilterChange                           | —                       | Store         |
| ReviewCard       | `components/business/review-card.tsx`       | Server        | name, rating, text, date?, service?                  | —                       | Reviews       |
| SchemaMarkup     | `components/business/schema-markup.tsx`     | Server        | schema: Record<string, unknown>                      | —                       | Any page      |

## Hooks

| Hook             | File                                    | Purpose                          | Status  |
| ---------------- | --------------------------------------- | -------------------------------- | ------- |
| useMediaQuery    | `hooks/use-media-query.ts`              | Match media query string         | Planned |
| useBreakpoint    | `hooks/use-breakpoint.ts`               | Current Tailwind breakpoint      | Planned |
| useReducedMotion | `hooks/use-reduced-motion.ts`           | prefers-reduced-motion detection | Planned |
| useTouch         | `hooks/use-touch.ts`                    | Touch-capable device detection   | Planned |
| useSwipe         | `hooks/use-swipe.ts`                    | Swipe gesture detection          | Planned |
| useCart          | `components/business/cart-provider.tsx` | Cart state access                | Built   |

## Utilities

| Utility                   | File                | Purpose                 |
| ------------------------- | ------------------- | ----------------------- |
| cn                        | `lib/utils.ts`      | clsx + tailwind-merge   |
| fadeInUp                  | `lib/animations.ts` | GSAP scroll reveal      |
| staggerReveal             | `lib/animations.ts` | GSAP stagger reveal     |
| parallax                  | `lib/animations.ts` | GSAP parallax           |
| createSEOMeta             | `lib/seo.ts`        | Metadata generator      |
| createLocalBusinessSchema | `lib/seo.ts`        | JSON-LD LocalBusiness   |
| createBreadcrumbSchema    | `lib/seo.ts`        | JSON-LD Breadcrumb      |
| createFAQSchema           | `lib/seo.ts`        | JSON-LD FAQ             |
| createReviewSchema        | `lib/seo.ts`        | JSON-LD AggregateRating |

## Component Registry Rules

- Every new component MUST have a corresponding test file before merge
- Every new UI component MUST have a Storybook story
- Every component with client interactivity MUST have `whileInView` or GSAP cleanup
- Props interfaces MUST be exported
- Default props MUST be documented in registry

---

# Animation Registry

## Selection Rules

1. Never use the same animation component on 2 consecutive projects
2. Pick from different categories for variety (text + background + scroll, not all text)
3. Respect `prefers-reduced-motion` — use `useReducedMotion()` hook
4. UI feedback animations ≤300ms, reveals 400-600ms
5. MagicUI components: install via `npx shadcn@latest add @magicui/<slug>`
6. React-bits components: copy from the reference-pack function group when emitted.

## By Use Case

### Hero Sections (visual impact, 1 per page)

| Component             | Source     | Slugs                   |
| --------------------- | ---------- | ----------------------- |
| Globe (3D)            | magicui    | `globe`                 |
| Warp Background       | magicui    | `warp-background`       |
| Animated Grid Pattern | magicui    | `animated-grid-pattern` |
| Particles             | magicui    | `particles`             |
| Aurora                | react-bits | `Aurora`                |
| Hyperspeed            | react-bits | `Hyperspeed`            |
| LiquidChrome          | react-bits | `LiquidChrome`          |
| PlasmaWave            | react-bits | `PlasmaWave`            |
| LetterGlitch          | react-bits | `LetterGlitch`          |

### Text Animations (headlines, taglines, values)

| Component       | Source     | Slugs            |
| --------------- | ---------- | ---------------- |
| Blur Fade       | magicui    | `blur-fade`      |
| Text Animate    | magicui    | `text-animate`   |
| Word Rotate     | magicui    | `word-rotate`    |
| Sparkles Text   | magicui    | `sparkles-text`  |
| Scroll Velocity | react-bits | `ScrollVelocity` |
| SplitText       | react-bits | `SplitText`      |
| TrueFocus       | react-bits | `TrueFocus`      |
| ShinyText       | react-bits | `ShinyText`      |
| GradientText    | react-bits | `GradientText`   |
| DecryptedText   | react-bits | `DecryptedText`  |

### CTA Buttons (conversion emphasis)

| Component         | Source  | Slugs                      |
| ----------------- | ------- | -------------------------- |
| Shiny Button      | magicui | `shiny-button`             |
| Shimmer Button    | magicui | `shimmer-button`           |
| Rainbow Button    | magicui | `rainbow-button`           |
| Pulsating Button  | magicui | `pulsating-button`         |
| Ripple Button     | magicui | `ripple-button`            |
| Interactive Hover | magicui | `interactive-hover-button` |

### Backgrounds (ambient, non-distracting)

| Component       | Source     | Slugs             |
| --------------- | ---------- | ----------------- |
| Grid Pattern    | magicui    | `grid-pattern`    |
| Dot Pattern     | magicui    | `dot-pattern`     |
| Retro Grid      | magicui    | `retro-grid`      |
| Flickering Grid | magicui    | `flickering-grid` |
| Noise Texture   | magicui    | `noise-texture`   |
| Meteors         | magicui    | `meteors`         |
| Silk            | react-bits | `Silk`            |
| Dither          | react-bits | `Dither`            |
| Waves           | react-bits | `Waves`             |
| Beams           | react-bits | `Beams`             |
| Iridescence     | react-bits | `Iridescence`     |

### Scroll Animations (reveal on scroll)

| Component       | Source     | Slugs                   |
| --------------- | ---------- | ----------------------- |
| Scroll Progress | magicui    | `scroll-progress`       |
| Scroll Velocity | magicui    | `scroll-based-velocity` |
| FadeContent     | react-bits | `FadeContent`           |
| ScrollReveal    | react-bits | `ScrollReveal`          |
| StaggeredMenu   | react-bits | `StaggeredMenu`         |

### Social Proof & Logos

| Component       | Source     | Slugs              |
| --------------- | ---------- | ------------------ |
| Marquee         | magicui    | `marquee`          |
| Avatar Circles  | magicui    | `avatar-circles`   |
| LogoLoop        | react-bits | `LogoLoop`         |
| OrbitingCircles | magicui    | `orbiting-circles` |

### Cards & Layouts

| Component          | Source     | Slugs                |
| ------------------ | ---------- | -------------------- |
| Magic Card         | magicui    | `magic-card`         |
| Bento Grid         | magicui    | `bento-grid`         |
| Neon Gradient Card | magicui    | `neon-gradient-card` |
| TiltedCard         | react-bits | `TiltedCard`         |
| DecayCard          | react-bits | `DecayCard`          |
| Masonry            | react-bits | `Masonry`            |
| MagicBento         | react-bits | `MagicBento`         |
| GlassSurface       | react-bits | `GlassSurface`       |

### Special Effects (use sparingly)

| Component        | Source     | Slugs             |
| ---------------- | ---------- | ----------------- |
| Confetti         | magicui    | `confetti`        |
| Cool Mode        | magicui    | `cool-mode`       |
| Lens             | magicui    | `lens`            |
| Pixel Transition | react-bits | `PixelTransition` |
| SplashCursor     | react-bits | `SplashCursor`    |
| ClickSpark       | react-bits | `ClickSpark`      |
| Magnetic         | react-bits | `Magnet`          |
| TrueFocus        | react-bits | `TrueFocus`       |

## Anti-Slop Rules for Animation

- Everything fades in = slop. Vary: slide, scale, blur, mask, split.
- 1s+ durations = slop. Keep UI under 300ms, reveals under 600ms.
- No reduced-motion check = broken. Always use `useReducedMotion()`.
- Linear easing = amateur. Use exponential ease-out.
- Animating height/width/top/left = performance bug. Use `transform` only.
- Same animation on back-to-back projects = lazy. Rotate categories.

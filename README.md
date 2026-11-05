# Tranquil Palette

A bilingual (EN / VI) home-gallery website for the Hanoi painter **Kim Pham**, rebuilt from the original design as a production Next.js app with a Sanity CMS.

- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **CMS:** Sanity v3 (embedded Studio at `/studio`)
- **Animation:** `motion` (Framer Motion) with full `prefers-reduced-motion` support
- **Email:** Resend (contact form) + enquiries stored in Sanity
- **Tests:** Playwright (smoke, gallery, i18n, contact, content, a11y/axe, reduced-motion, visual regression) on desktop + mobile
- **Hosting:** Vercel

## Architecture

Public pages are React Server Components that load content through `lib/data.ts`. That layer reads from Sanity when configured and **falls back to the bundled seed content** (`lib/seed.ts`, ported verbatim from the original design) when the dataset is empty or unconfigured — so the site always renders the intended design. Localized fields are simple `{ en, vi }` objects resolved client-side by the language toggle (`lib/i18n.tsx`).

```
app/(site)/        # Home, Gallery, About, Journal, Exhibitions, Visit
app/studio/        # Embedded Sanity Studio
app/api/contact/   # Contact handler (validation, Resend, Sanity write, rate limit, honeypot)
components/         # Nav, Footer, motion wrappers, gallery + lightbox, page views
lib/               # i18n, messages (UI copy), seed content, data layer, tones, types
sanity/            # schema, client, queries, image, structure
tests/             # Playwright suites + visual baselines
```

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                  # http://localhost:3000
```

Without a Sanity project id the site runs entirely from seed content — fully functional.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project (omit to run on seed data) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-02-01` |
| `SANITY_API_WRITE_TOKEN` | Editor token for storing contact enquiries (server only) |
| `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | Contact email delivery |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata, sitemap) |

## Connecting Sanity

1. Create a Sanity project + `production` dataset (sanity.io/manage or `npx sanity init`).
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` (and a write token) in `.env.local` / Vercel.
3. Seed the dataset from the bundled content: `npm run seed` (needs `SANITY_API_WRITE_TOKEN`).
   - **Already-seeded dataset?** The site reads Sanity first and only falls back to `lib/seed.ts` when the dataset is empty, so changes to the seed file do not appear until the dataset is updated. Use `npm run seed:artworks` to replace only artworks and series (uploads the photos in `public/artworks/`, removes legacy placeholders) without touching site settings, journal or exhibitions. Add `-- --dry-run` to preview the changes without a token.
4. Generate typed queries: `npm run typegen`.
5. Add your domains under Sanity **CORS origins**.
6. Edit content at `/studio`.

## Tests

```bash
npm run build
npm run test:e2e             # all suites, desktop + mobile
npm run test:e2e:functional  # everything except visual regression
npm run test:e2e:update      # refresh visual baselines after intentional UI changes
```

## Deploy

Connected to Vercel — pushes to `main` deploy automatically. TLS/HTTPS and HSTS are handled by Vercel + `next.config.ts` security headers.

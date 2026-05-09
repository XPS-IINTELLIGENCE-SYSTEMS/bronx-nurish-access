# Bronx Nourish Access — Vercel PWA Food Help Funnel

Status: **Draft / staging-control operating system**. Do not publish paid campaigns, make public benefit guarantees, or scale outreach until Jeremy approves launch and required compliance items are verified.

## Active launch stack

This project is launched through **Vercel**, not Shopify.

```text
GitHub repo
→ Vercel production deployment
→ Next.js PWA landing app
→ /api/leads
→ Neon/Postgres lead database
→ Admin / proof / cron routes
→ Google Drive campaign operating system
```

## Live production URL

```text
https://bronx-nourish-access.vercel.app/
```

## GitHub repo

```text
XPS-IINTELLIGENCE-SYSTEMS/bronx-nourish-access
```

## Purpose

Bronx Nourish Access is a mobile-first food-help routing PWA designed to help Bronx households check available food support options, request callback support, save the app to their phone, and share it with others.

Primary campaign identity:

```text
Tap the Green Bag
```

Primary CTA:

```text
Check Food Help Options
```

Share CTA:

```text
Share This — Help another Bronx household check available food help options.
```

## Active app features

- Next.js app hosted on Vercel
- PWA manifest for Add to Home Screen behavior
- bilingual English / Spanish copy
- target ZIP gate for 10451, 10452, 10453, 10454, and 10455
- compliance-safe copy
- short lead form
- consent checkbox
- UTM capture
- honeypot spam field
- `/api/leads` lead intake route
- Neon/Postgres backend dependency
- duplicate phone submission block
- proof logging
- admin / summary / cron / health routes

## Primary repo files

| File | Purpose |
|---|---|
| `app/page.tsx` | Main Vercel/Next.js landing app and lead form |
| `app/api/leads/route.ts` | Lead intake API with validation, ZIP gate, duplicate control, and database insert |
| `app/layout.tsx` | Metadata, PWA manifest, app shell |
| `public/manifest.webmanifest` | PWA install metadata |
| `public/icon.svg` | App icon |
| `package.json` | Next.js / React / Neon / Zod stack |
| `docs/PROJECT_HANDOFF.md` | Project handoff notes |
| `docs/QA_CHECKLIST.md` | Prelaunch QA checklist |
| `docs/ICON_STRATEGY.md` | PWA icon strategy |
| `docs/CULTURAL_ICON_DIRECTION.md` | Cultural icon direction |

## Google Drive operating assets

Active Drive command system:

- **Bronx Nourish Access - Landing App Operating Package**
- **Bronx Nourish Access - Tap the Green Bag Campaign Tracker**

These assets operate the launch campaign, compliance, content, budget simulation, partner outreach, QR tracking, UTM tracking, daily metrics, and weekly optimization.

## Shopify status

Shopify is **not** the active launch platform.

Shopify files remain in the repo only as:

```text
reference workflow / optional future channel / legacy build package
```

Do not treat Shopify as the production launch stack for this campaign unless Jeremy explicitly changes the platform strategy.

## Safe claim language

Use:

```text
You may qualify for free or low-cost food support through available community, health-plan, nonprofit, or government-supported programs.
```

Also approved:

```text
Check available food help options.
No payment required to check.
A team member may follow up with available next steps.
```

## Do not claim unless verified

- 3 meals per day
- guaranteed approval
- guaranteed free meals
- federal government paid
- 84 days or 90 days
- official government program
- CORR proof numbers
- approval rates
- testimonials
- exact government budget claims

## Do not collect

- SSN
- Medicaid ID
- case number
- immigration status
- diagnosis
- private documents
- children’s private details

## Required before scale

- Verify `DATABASE_URL` or `POSTGRES_URL` in Vercel
- Test live form submission end-to-end
- Confirm Neon/Postgres tables are receiving leads
- Confirm `/admin` is protected before real lead traffic
- Add / verify privacy policy
- Replace or confirm public phone/callback process
- Confirm partner-site content permission before exact copy use
- Confirm final Spanish copy review
- Run npm audit/security review
- Complete mobile PWA install/share QA
- Complete Drive campaign tracker daily formulas and launch dashboard review

## Launch captain note

The campaign should be operated from the Google Drive tracker, while the app itself is deployed through Vercel. Paid and organic campaigns should use UTM-tagged Vercel URLs.

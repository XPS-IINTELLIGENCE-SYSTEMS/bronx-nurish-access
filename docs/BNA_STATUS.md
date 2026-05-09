# Bronx Nourish Access Status

Status date: 2026-05-09
Finish target: 2026-05-10

## Current status

Production MVP is primarily built.

## Completed

- Vercel app exists.
- Next.js app is installed.
- English and Spanish intake page is implemented.
- Bronx ZIP validation is implemented for 10451, 10452, 10453, 10454, and 10455.
- Consent checkbox is required.
- Sensitive fields are excluded.
- UTM capture is implemented.
- Supabase path was removed from Bronx MVP.
- Neon Postgres lead API is implemented.
- Neon schema is committed.
- Vercel Cron config is committed.
- Daily content draft cron route is committed.
- Proof-loop scan cron route is committed.
- Daily report cron route is committed.

## Remaining blockers

1. Connect Neon to Vercel.
2. Confirm DATABASE_URL exists in Vercel.
3. Run neon/schema.sql in Neon.
4. Add CRON_SECRET in Vercel.
5. Add AI_GATEWAY_API_KEY if AI drafting should use AI Gateway.
6. Test live form submission.
7. Confirm bna_leads receives the row.
8. Trigger content-draft cron.
9. Confirm bna_content_queue receives drafts.
10. Trigger proof-loop cron.
11. Confirm bna_proof_log records events.

## Done definition

- /api/health returns ok true.
- Form writes to bna_leads.
- Content draft route writes to bna_content_queue.
- Proof-loop route updates approval status.
- Daily report route writes to bna_proof_log.

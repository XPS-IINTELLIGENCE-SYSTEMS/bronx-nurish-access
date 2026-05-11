# Tool and Template Catalog

## Purpose
Document all template categories and external tool classes that may be integrated later by implementation teams.

No credentials or proprietary keys belong in this file.

## Template Categories

| Category | Templates Required | Agent Owner |
|---|---|---|
| Shopify | homepage, collection, product, blog, metaobject, Shopify Flow | ShopifyWorkflowAgent |
| Email | welcome, lead magnet delivery, nurture, invoice, abandoned lead, reactivation | EmailAgent |
| Invoice | service invoice, recurring invoice, payment reminder, final notice | InvoiceAgent |
| Music | intro, outro, background loop, training video, ad soundbed | MusicAgent |
| Social | hook, caption, short script, carousel, YouTube description, LinkedIn post | SocialMediaAgent |
| App Builder | v0 prompt, Lovable prompt, Bolt prompt, Taskade Genesis prompt | AppGeneratorAgent |
| Prompt Library | strategy, build packet, validation, SEO, copy, simulation, refactor | PromptLibraryAgent |
| Lead Gen | free tool, form, thank-you page, delivery email, segmentation tags | LeadGenAgent |
| Digital Assets | logo use, hero image, open graph, YouTube banner, social square, print proof | CreativeAgent |

## Benchmark Tool Classes

| Tool Class | Examples | Intended Use |
|---|---|---|
| General AI | ChatGPT, Claude, Gemini | reasoning, drafting, validation |
| App builders | v0, Lovable, Bolt, Taskade Genesis | rapid UI and app scaffolds |
| Video | HeyGen, Runway, CapCut, Descript, OpusClip | short-form and training content |
| Visual | Canva, Midjourney, Ideogram | graphics and brand assets |
| Audio | Suno, ElevenLabs, Mubert | voice, music, soundbeds |
| SEO | Semrush, keyword tools, analytics | research and optimization |
| Email | Klaviyo, Mailchimp, SendGrid, beehiiv | campaigns and delivery |
| Billing | QuickBooks, FreshBooks, Zoho Invoice | invoice workflows |
| Scheduling | Vercel cron, Google Calendar, social schedulers | recurring execution and content calendar |

## Selection Rule

A tool is eligible only when:
1. It supports the required output type.
2. It can operate in draft or sandbox mode.
3. It has a clear human approval path.
4. It does not require exposing secrets in source code.
5. It has a fallback manual workflow.

## Fallback Rule
If a tool integration is unavailable, create a manual-ready draft artifact in GitHub or Drive and mark the task `Blocked - External tool integration required`.

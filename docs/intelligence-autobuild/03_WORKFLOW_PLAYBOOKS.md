# Workflow Playbooks

## Playbook 1: Source Intake

Purpose: collect and classify all source files before any build action.

Steps:
1. Register source path.
2. Classify source type: doc, workbook, template, asset, code, log, benchmark.
3. Assign source owner and approval state.
4. Identify destination system.
5. Add source to source ledger.
6. Mark missing proof as `Could not verify`.

Definition of done:
- Source has location, purpose, owner, status, risk, next action.

## Playbook 2: Build Packet Creation

Purpose: convert a request into a controlled implementation packet.

Steps:
1. Read source ledger.
2. Select approved source documents.
3. Create build packet with objective, constraints, affected systems, test criteria.
4. Assign target agent.
5. Add validation requirements.
6. Add release gate requirements.

Definition of done:
- Build packet can be implemented without guessing.

## Playbook 3: GPT Draft Generation

Purpose: generate draft-only content from approved sources.

Steps:
1. Load task context.
2. Load source references.
3. Select prompt template.
4. Generate draft.
5. Mark unverifiable claims.
6. Route to validation.
7. Log prompt, output, risk, and next action.

Blocked content:
- unverified product specs
- unverified pricing
- unverified claims
- unsupported health, legal, financial, or safety claims
- live publish commands

## Playbook 4: Shopify Workflow Drafting

Purpose: stage Shopify-ready artifacts without publishing.

Outputs:
- page drafts
- collection specs
- product CSV drafts
- metaobject specs
- navigation specs
- Shopify Flow blueprints

Approval required:
- product specs
- pricing
- shipping
- warranties
- training claims
- certification claims
- ads
- email blasts

## Playbook 5: Social Media Pipeline

Purpose: create social content drafts routed to lead capture.

Steps:
1. Select content objective.
2. Pick platform: TikTok, Instagram, YouTube, Facebook, LinkedIn.
3. Generate hook, caption, scene plan, CTA, destination URL.
4. Validate claim safety.
5. Add to social queue.
6. Require approval before publishing.

## Playbook 6: Lead Generation Workflow

Purpose: turn traffic into owned leads.

Required route:
Traffic -> Education -> Free Tool -> Email/SMS Lead -> Product Path -> Training Path -> Contractor Success -> AI Tools -> Repeat Engagement

Required artifacts:
- lead magnet page
- form schema
- delivery email
- tag map
- follow-up sequence
- analytics event map

## Playbook 7: Validation and Auto-Hardening

Purpose: prevent unsafe or incomplete launches.

Validation gates:
1. Source proof exists.
2. Required fields complete.
3. No unsafe publish action.
4. Draft destination defined.
5. Logs are written.
6. Recovery path exists.
7. User-facing copy is clear and mobile-friendly.

Auto-hardening rule:
If safe fix exists, create fix packet. If not, create blocker with owner and next action.

## Playbook 8: Release Gate

Purpose: decide if a system can merge, deploy, publish, or launch.

Release states:
- Draft
- Validating
- Blocked
- Approved for staging
- Approved for production
- Released
- Rolled back

Production cannot proceed unless:
- validation score is 100
- simulation passes 5 of 5
- all P0/P1 blockers are closed
- human approval is recorded

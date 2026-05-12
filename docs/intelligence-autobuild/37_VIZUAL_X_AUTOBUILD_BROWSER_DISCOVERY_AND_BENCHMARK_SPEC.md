# Vizual-X AutoBuild Browser Discovery and Benchmark Specification

## Purpose

Define the discovery phase that runs after the AutoBuild intake form is submitted. This phase uses the form information to produce a targeted browser research plan, benchmark comparable systems, verify required facts, and prepare inputs for builder-doc generation.

## Workflow Placement

```text
intake_form_validation
-> goal_normalization_and_gap_detection
-> browser_discovery_plan
-> source_research_and_benchmarking
-> builder_docs_generation
```

## Discovery Inputs

The discovery phase consumes:

- project/system name;
- core goal;
- doubled stretch goal;
- definition of success;
- primary users;
- business/revenue paths;
- workflow/autonomy scope;
- AI/agent requirements;
- research topics;
- benchmark targets;
- source domains;
- facts that must be verified.

## Discovery Outputs

The phase creates:

1. `discovery_research_plan`
2. `source_shortlist`
3. `benchmark_target_list`
4. `fact_verification_matrix`
5. `benchmark_summary`
6. `research_gap_list`
7. `builder_doc_input_pack`

## Research Plan Structure

```json
{
  "project_name": "string",
  "research_topics": [],
  "benchmark_targets": [],
  "preferred_domains": [],
  "must_verify_facts": [],
  "required_outputs": [],
  "source_quality_rules": []
}
```

## Source Quality Rules

The research step must:

- prioritize primary and official sources;
- use current sources when market, product, or platform facts can change;
- record source title, publisher, date, and topic relevance;
- separate facts from assumptions;
- mark unverified items explicitly;
- avoid inventing benchmark claims;
- capture platform-specific implementation constraints.

## Required Benchmark Categories

Depending on the form input, the workflow should benchmark appropriate systems in these categories:

### Platform / Builder Systems

- v0.app style product builder systems;
- Vercel templates and runtime systems;
- AI chatbot template patterns;
- agent platform patterns.

### Workflow / Automation Systems

- workflow orchestration patterns;
- scheduled trigger systems;
- stateful workflow models;
- sandboxing / build safety systems.

### Industry / Niche Systems

- the operator's specified niche;
- leading product/service examples;
- strongest public-facing competitors;
- strongest workflow/tool examples.

### Revenue / Business Systems

- monetization patterns;
- conversion paths;
- lead capture systems;
- recurring revenue models;
- enterprise/package models where applicable.

## Benchmark Scorecard

Each benchmark target should be scored across:

| Dimension | Description |
|---|---|
| relevance | fit to operator goal |
| execution quality | quality of implementation |
| speed | how quickly it produces value |
| autonomy | degree of automated operation |
| usability | operator/client friendliness |
| monetization | value capture model |
| extensibility | ease of reuse and scaling |
| risk control | safety, review, and compliance structure |

## Fact Verification Matrix

```json
{
  "fact": "string",
  "priority": "high|medium|low",
  "verification_status": "verified|could_not_verify|conflicting",
  "sources": [],
  "notes": "string"
}
```

## Discovery Completion Criteria

The discovery stage is complete when:

1. all research topics have a source plan;
2. benchmark targets are selected;
3. critical facts are verified or marked `could_not_verify`;
4. builder-doc inputs are generated;
5. downstream document generation can begin without guessing.

## Integration With Vizual-X

Vizual-X should show this phase inside the workflow tracker with:

- discovery status;
- benchmark targets selected;
- facts verified;
- facts unresolved;
- research gap count;
- next phase readiness.

## Integration With Browser / API Systems

The workflow spec allows discovery through:

- browser search;
- official product docs;
- official platform docs;
- approved public APIs where relevant;
- future connector-backed research tools.

## Guardrail

The discovery phase informs the build package. It does not perform live production actions. It creates intelligence and specifications only.

# Roadmap

## Current State

Recall OS has reached the first release-ready foundation.

Completed capabilities:

- Repository memory initialization.
- Optional presets as opinion packs.
- Feature memory creation.
- Proposed ADR creation.
- Module memory creation.
- Structural Doctor checks.
- AI command memory.
- Packaged `recall` CLI build.
- README, examples, CI, release-candidate workflow, and package validation.

## Release Foundation

The current release foundation proves:

- Recall OS can create memory.
- Recall OS can validate memory structure.
- Recall OS can run as a packaged CLI.
- Recall OS can dogfood its own feature, module, review, and completion workflow.

## Next Product Priority: Drift Detection

The next major product leap is drift detection.

Doctor currently answers:

```txt
Is the memory structure present?
```

Drift detection should begin answering:

```txt
Does new or changed memory conflict with accepted repository memory?
```

Initial drift detection should stay deterministic and local.

Recommended first checks:

- ADR status and required sections.
- Proposed versus accepted decision references.
- Feature docs referencing missing ADRs.
- Module docs referencing missing decisions.
- Security-sensitive feature changes missing security review notes.
- Completion reports missing test evidence.

## Future Product Sequence

### P11: Product Vision And Roadmap Alignment

Lock the product thesis, future levels, anti-scope, and roadmap into durable product memory.

### P12: Doctor Standards Checks

Extend Doctor from structural checks into deterministic governance checks.

Examples:

- Feature folder has completion report but review is still pending.
- Completion report exists without tests run.
- ADR exists without consequences.
- Security-sensitive architecture impact lacks security notes.

### P13: Drift Detection MVP

Add first deterministic drift checks against accepted repository memory.

Examples:

- Docs mention an architecture decision that has no ADR.
- Accepted ADR is contradicted by a proposed decision or feature note.
- Module ownership docs disagree with feature planning docs.

### P14: Legacy Adoption Planning

Define `recall adopt` as a reviewable memory extraction workflow for existing repositories.

Adoption must produce proposed memory, not silently accepted truth.

### P15: Organization Memory Planning

Define organization memory as shared standards, ADRs, architecture guidance, and opinion packs
across repositories.

Organization memory must remain explicit and reviewable.

## Non-Roadmap

Recall OS should not pursue:

- AI coding agent runtime.
- IDE replacement.
- Cloud execution platform.
- Model hosting.
- Automatic architecture selection.
- Production app generation.

Those areas distract from the durable category: engineering memory, quality gates, governance, and
drift detection.

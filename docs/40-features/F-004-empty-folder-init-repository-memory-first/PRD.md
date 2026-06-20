# PRD: Empty-Folder Init And Repository Memory First

## Purpose

Lock the product decision that Recall OS initializes repository memory, not application code.

Recall OS must work before the first line of app code exists.

## Problem

If `recall init` requires an existing Flutter, Next.js, Swift, Android, or other app, Recall OS becomes tied to implementation frameworks.

That weakens the architecture-neutral memory engine position.

## Decision

`recall init` must work in an empty folder as a first-class workflow.

Git initializes source control.

Recall OS initializes repository memory.

Code may come before or after Recall OS.

## Users

- Solo founders starting a new AI-built product.
- Developers adding memory to an existing repository.
- Teams that want to adopt repository memory later.

## Workflows

### Greenfield

```bash
mkdir expense-tracker
cd expense-tracker
recall init
```

Recall OS creates neutral repository memory. The app framework may be created later.

### Existing Repository

```bash
cd existing-app
recall init
```

Recall OS initializes neutral memory and may later offer detected guidance.

Technology detection may suggest guidance, but detection must not become accepted repository memory by itself.

### Legacy Adoption

```bash
cd mature-repo
recall adopt
```

`adopt` is future scope. It may create repository memory from existing systems after review.

## In Scope

- Document empty-folder init as first-class.
- Document `recall init` as neutral repository memory.
- Document preset behavior as guidance and proposed decisions.
- Document technology detection as guidance only.
- Add module memory for repository init and repository memory semantics.

## Non-Goals

- Implement CLI runtime.
- Implement config changes.
- Implement templates.
- Implement presets.
- Implement technology detection.
- Implement `adopt`.
- Add network, telemetry, MCP runtime, or dependency changes.

## Success Criteria

- Product docs say empty-folder init is supported.
- Architecture docs say Recall OS initializes memory independent of app code.
- Preset docs say `--preset` produces guidance or proposed ADRs, not accepted decisions.
- Existing-repo detection is guidance only.
- P1.7 changes no runtime behavior.

# PRD: Drift Detection MVP

## Purpose

Doctor can confirm that repository memory exists, is structurally healthy (P9), and carries the
engineering evidence required when memory claims work is complete (P12).

P13 adds the first deterministic drift checks. Drift detection should begin answering:

```txt
Does new or changed memory conflict with accepted repository memory?
```

This is the first step of Product Vision Level 4. It stays deterministic and local. It does not
attempt semantic understanding.

## Problem

Repository memory can reference decisions that do not exist or are not yet accepted:

- A feature doc can cite an ADR identifier that has no ADR file. The decision is dangling.
- A module decision doc can reference an ADR that was never created.
- Memory can rely on an ADR that is still proposed, as if it were accepted.

These cases are drift: the repository remembers a decision that the accepted decision record does
not actually support. P9 and P12 do not catch them because they check structure and completion
evidence, not cross-references between memory and accepted decisions.

## In Scope

- Add a read-only drift check to Doctor.
- Detect feature and module memory that references an `ADR-####` identifier with no matching ADR
  file (dangling decision reference).
- Detect feature and module memory that references an ADR whose status is not accepted (reliance on
  a proposed decision).
- Keep findings deterministic and local.
- Add unit and integration tests for drift checks.
- Update Doctor module memory, product roadmap, product vision, and completion evidence.

## Non-Goals

- No semantic architecture drift detection.
- No code-to-doc drift detection.
- No dependency drift detection.
- No natural-language contradiction detection.
- No auto-fix behavior.
- No JSON reporter.
- No network, telemetry, MCP runtime, AI API, cloud behavior, or generated production app code.

## Users

- AI agents using Doctor as a completion gate.
- Maintainers checking whether memory still agrees with accepted decisions.
- Contributors who need actionable feedback before claiming work is done.

## Success Criteria

- Healthy initialized repositories still pass Doctor.
- Feature memory that references a missing ADR fails Doctor with an error.
- Module memory that references a missing ADR fails Doctor with an error.
- Memory that references an existing but not-yet-accepted ADR produces a warning.
- Memory that references an existing accepted ADR produces no drift finding.
- Doctor remains read-only.

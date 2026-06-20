# PRD: Doctor Standards Checks

## Purpose

Doctor currently verifies whether repository memory exists and has the required structure.

P12 extends Doctor into the first deterministic governance layer. It should report when repository
memory claims work is complete but lacks the evidence required by engineering standards.

This moves Recall OS from memory creation toward memory protection without attempting semantic drift
detection yet.

## Problem

AI-assisted work can leave a repository in a misleading state:

- A completion report can claim a feature is complete while review is still pending.
- A completion report can omit tests or result evidence.
- An ADR can include required headings but no meaningful consequences.
- A feature can mention security-sensitive scope without documenting security impact.

P9 Doctor cannot catch these cases because it only checks structure.

## In Scope

- Add read-only standards checks to Doctor.
- Check completed feature memory for review, test evidence, and result evidence.
- Check ADR consequence sections for meaningful content.
- Check security-sensitive feature planning for documented security impact.
- Keep findings deterministic and local.
- Add unit and integration tests for standards checks.
- Update Doctor module memory and completion evidence.

## Non-Goals

- No semantic architecture drift detection.
- No code-to-doc drift detection.
- No dependency drift detection.
- No auto-fix behavior.
- No JSON reporter.
- No network, telemetry, MCP runtime, AI API, cloud behavior, or generated production app code.

## Users

- AI agents using Doctor as a completion gate.
- Maintainers reviewing whether repository memory is reliable.
- Contributors who need actionable feedback before claiming work is done.

## Success Criteria

- Healthy initialized repositories still pass Doctor.
- Completed feature memory fails when review is still pending.
- Completed feature memory fails when tests or result evidence are missing.
- Proposed ADR drafts with incomplete consequences produce warnings.
- Accepted ADRs with incomplete consequences produce errors.
- Security-sensitive feature planning without security impact notes is reported.
- Doctor remains read-only.

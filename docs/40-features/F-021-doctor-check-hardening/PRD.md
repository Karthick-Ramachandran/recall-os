# PRD: Doctor Check Hardening

## Purpose

Before `recall doctor` can be trusted as a gate, its heuristic checks must be solid. Two weaknesses
exist: the drift check flags `ADR-####` tokens even inside illustrative code blocks (a false
positive hit on this project's own docs), and nothing flags feature scaffolds that were generated
but never filled in.

This feature hardens those checks so Doctor is trustworthy enough to gate work.

## Problem

- Drift detection treats example ADR identifiers in fenced code or inline code as real references.
- Generated feature PRDs can sit unfilled (template stubs) with no signal.

## In Scope

- Make the drift check ignore ADR identifiers inside fenced code blocks and inline code.
- Add a content-completeness check that warns when a feature PRD's Purpose or In Scope is still an
  unfilled template.
- Keep all checks deterministic, local, and read-only.
- Add tests.

## Non-Goals

- No semantic contradiction detection or module-ownership comparison (separate, later work).
- No hard failure for unfilled content; it is a warning.

## Success Criteria

- An ADR identifier that appears only inside a code block produces no drift finding.
- A real prose reference to a missing ADR still produces a drift error.
- An unfilled feature PRD produces a content warning; a filled PRD produces none.
- A healthy initialized repository still passes Doctor.

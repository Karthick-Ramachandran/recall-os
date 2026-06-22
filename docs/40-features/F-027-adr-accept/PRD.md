# PRD: ADR Accept

## Purpose

Presets, adopt, and mcp all generate proposed ADRs, but nothing could accept one. Accepting a
decision is the moment it becomes repository source of truth and the anchor that drift is measured
against. This feature closes the propose -> accept loop.

## Problem

- Proposed ADRs accumulated in `docs/adrs/proposed/` with no command to accept them.
- Accepting required manual editing and moving files.
- The governance cycle was incomplete: the tool proposes everywhere but could not close a decision.

## In Scope

- Add `persist adr accept <name>`.
- Promote a `docs/adrs/proposed/ADR-PROPOSED-<slug>.md` to a numbered, accepted
  `docs/adrs/ADR-####-<slug>.md` and remove the proposal.
- Accept an existing numbered Proposed ADR in place by flipping its status.
- Guide the user and keep `--dry-run` and `--force` consistent with other commands.

## Non-Goals

- No automatic acceptance; the human runs the command.
- No editing of decision body prose beyond status and title.

## Users

- Maintainers turning a reviewed proposal into accepted memory.
- Teams adopting preset, adopt, or mcp proposals.

## Success Criteria

- `persist adr accept kotlin-android-ui-compose` writes `ADR-0001-kotlin-android-ui-compose.md` with
  `Status: Accepted`, rewrites the title to the ADR id, and removes the proposal.
- An existing numbered Proposed ADR is accepted in place.
- A missing name errors clearly.
- `--dry-run` writes nothing and removes nothing.

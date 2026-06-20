# PRD: ADR Create Command

## Purpose

Implement `specforge adr create <title>` so repositories can create architecture decision drafts before decisions become accepted repository memory.

P7 turns ADR drafting into a repeatable local command.

## Problem

SpecForge records architecture decisions, but it cannot yet create ADR files through the CLI.

Without ADR create support, users and agents can skip the structure needed to capture context, decision, alternatives, consequences, and related docs.

## Decision

P7 adds an ADR create command that creates one proposed ADR markdown file.

Generated ADRs are drafts. Humans own final acceptance.

## In Scope

- ADR title slugging.
- ADR number scanning.
- Same-title ADR file reuse.
- ADR document generation.
- CLI command wiring for `adr create <title>`.
- Config-based ADR directory selection.
- Safe write planning and execution.
- `--dry-run`.
- `--force`.
- Unit and integration tests.

## Non-Goals

- Accepting ADRs automatically.
- ADR status flags.
- ADR review workflow.
- Doctor command.
- Module create command.
- Package `bin` or release wiring.
- Rich templates.
- Network, telemetry, MCP runtime, AI API, cloud behavior, or production app code.

## Success Criteria

- Command requires initialized SpecForge config.
- Command creates `ADR-####-<slug>.md` files.
- Numbering starts at `ADR-0001`.
- Numbering increments from valid existing ADR files.
- Re-running the same ADR slug targets the existing ADR file instead of creating duplicate decision memory.
- Malformed ADR files are ignored.
- Unsafe titles are rejected.
- Existing files are skipped by default.
- Dry run writes nothing.
- Force overwrites explicitly.
- Generated ADR status is always `Proposed` in P7.

# Module: ADR Workflow

## Purpose

ADR workflow owns the repository-memory process for drafting and accepting architecture decisions.

## Owns

- ADR file shape.
- Required ADR sections.
- Relationship between proposed ADR drafts and accepted repository decisions.
- Rerun semantics for ADR draft creation.

## Does Not Own

- CLI parser wiring.
- Filesystem writes.
- ADR number scanning internals.
- Template rendering internals.
- Feature creation.
- Module creation.
- Doctor checks.

## Public Interface Direction

`specforge adr create <title>` creates proposed ADR memory before a decision is accepted.

## Current Decision

P7 creates concise proposed ADR drafts.

Humans accept ADRs by reviewing and editing repository memory.

Rerunning an ADR create command for an existing slug should target the existing ADR file so write policy controls skip or overwrite behavior.

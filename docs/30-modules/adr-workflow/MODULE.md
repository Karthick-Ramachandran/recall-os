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

`recall adr create <title>` creates proposed ADR memory before a decision is accepted.

`recall adr accept <name>` promotes a proposed ADR to accepted repository memory.

## Current Decision

`recall adr create` creates concise proposed ADR drafts.

`recall adr accept` (ADR-0006) closes the propose-to-accept loop: a proposal under
`docs/adrs/proposed/` becomes a numbered, accepted ADR and the proposal is removed; an existing
numbered Proposed ADR is accepted in place. This is the only command that removes a file, and only
the named proposal after the accepted ADR is written.

Rerunning an ADR create command for an existing slug should target the existing ADR file so write
policy controls skip or overwrite behavior.

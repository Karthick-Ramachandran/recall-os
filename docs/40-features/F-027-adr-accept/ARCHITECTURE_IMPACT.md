# Architecture Impact: ADR Accept

## Affected Modules

- `cli`: registers `recall adr accept`.
- `adr-workflow`: the accept/promote command logic.

Reuses `config`, `filesystem` (write pipeline + safe-path), and `naming` (adr-number, slugify).

## New Behavior

- New `src/commands/adr/accept.ts` with `acceptAdr` and `formatAdrAcceptResult`.
- Promotion writes a numbered accepted ADR and removes the proposal source.
- In-place acceptance flips an existing numbered Proposed ADR's status.

## Decision Records

- Governed by ADR-0006 (ADR Accept Promotes And Removes The Proposal), which is accepted.

## Security Impact

- Introduces one narrowly scoped delete: the named proposal file, resolved through safe-path within
  the project root, removed only after the accepted file is written and never on `--dry-run`.
- The accepted file is written through the safe, non-destructive pipeline.
- No network, telemetry, or dependency is added.

## Compatibility

- Adds a command; existing commands are unchanged.
- `docs/adrs/proposed/` shrinks as proposals are accepted; numbered ADRs grow.

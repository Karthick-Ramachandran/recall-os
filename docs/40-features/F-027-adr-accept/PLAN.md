# Plan: ADR Accept

## Steps

1. Add `src/commands/adr/accept.ts`: resolve the proposal, write a numbered accepted ADR, remove the
   proposal; or accept a numbered Proposed ADR in place.
2. Register `recall adr accept` in the CLI and wire `AdrAcceptError`.
3. Write ADR-0006 for the promote-and-remove behavior.
4. Add integration tests; update module memory and docs.

## Out Of Scope

- `recall adr reject`.
- Editing decision body prose.

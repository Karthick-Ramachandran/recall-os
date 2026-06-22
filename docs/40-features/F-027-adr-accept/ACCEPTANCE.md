# Acceptance Criteria: ADR Accept

- `persist adr accept <slug>` promotes `docs/adrs/proposed/ADR-PROPOSED-<slug>.md` to a numbered
  `docs/adrs/ADR-####-<slug>.md` with `## Status\n\nAccepted` and the title rewritten to the ADR id.
- The proposal file is removed after the accepted file is written (on a real run only).
- An existing numbered ADR with `Status: Proposed` is accepted in place.
- The command accepts either the slug (`mcp-figma`) or the full proposed name
  (`ADR-PROPOSED-mcp-figma`).
- A name with no matching proposal errors with a clear message.
- `--dry-run` writes nothing and leaves the proposal in place.
- The output guides the user that the decision is now source of truth.

## Regression

- The full test suite passes and Doctor still passes.

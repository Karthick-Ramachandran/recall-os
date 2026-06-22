# Architecture Impact: Strategic Reframe

## Affected Areas

- Product positioning.
- Architecture docs.
- Future preset model.
- Future config language.
- Future doctor and drift behavior.

## Runtime Impact

No runtime impact in P1.5.

This is a docs-only strategic reframe.

## Security Impact

P1.5 did not change authentication, authorization, secrets, storage, networking, telemetry, file
writes, dependencies, MCP runtime, AI API behavior, cloud behavior, or generated application code.

Future accepted-decision validation or organization-memory import may become security-sensitive and
must receive ADR and security review when implemented.

## Future Interface Direction

Future implementation should prefer:

- `preset`
- `memoryProfile`
- `acceptedDecisions`
- `proposedDecisions`
- `organizationStandards`

Future implementation should avoid required architecture IDs that imply Persist OS owns the user's
architecture.

## ADR Impact

No ADR is required for P1.5 because it clarifies product strategy without changing runtime
architecture.

Future runtime changes for presets, organization import, or accepted-decision validation may require
ADRs.

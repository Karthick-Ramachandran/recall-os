# Acceptance Criteria: Doctor Standards Checks

## Core Behavior

- Doctor includes deterministic standards checks after config and structural checks.
- Doctor does not mutate files.
- Doctor keeps using the existing severity model:
  - `ERROR`: repository memory is unsafe to rely on.
  - `WARNING`: repository memory needs attention but is not structurally broken.
  - `INFO`: useful detected state.

## Feature Completion Evidence

- A feature marked complete in `COMPLETION_REPORT.md` must not have `REVIEW.md` marked pending.
- A feature marked complete must have meaningful `Tests Run` content.
- A feature marked complete must have meaningful `Results` content.
- Missing or placeholder completion evidence is an `ERROR`.

## ADR Consequence Evidence

- Valid ADR files must have meaningful `Consequences` content.
- Proposed ADRs with missing or placeholder consequences produce a `WARNING`.
- Accepted ADRs with missing or placeholder consequences produce an `ERROR`.

## Security Impact Evidence

- If feature architecture impact content outside the security section mentions security-sensitive
  scope, the `Security Impact` section must contain meaningful notes.
- Security-sensitive scope includes auth, authorization, secrets, storage, networking, telemetry,
  file writes, dependencies, MCP, AI API, cloud behavior, and runtime behavior.
- Incomplete security impact evidence produces a `WARNING`, or an `ERROR` when the feature is marked
  complete.

## Boundaries

- Doctor must remain read-only.
- P12 must not infer architecture decisions from code.
- P12 must not attempt accepted ADR contradiction detection.
- P12 must not add dependencies.
- P12 must not change config, init generation, package release behavior, or preset behavior.

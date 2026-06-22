# Test Plan: Drift Detection MVP

Test plan is risk-based. The main risks are false positives on healthy repos, missed dangling
references, and accidental file mutation.

## Unit Tests (`tests/unit/doctor/drift-check.test.ts`)

- Feature doc references a missing ADR identifier -> error `drift-adr-reference` with doc path.
- Module doc references a missing ADR identifier -> error `drift-adr-reference` with doc path.
- Feature doc references an existing ADR whose status is `Proposed` -> warning
  `drift-proposed-reference`.
- Feature doc references an existing ADR whose status is `Accepted` -> no finding.
- A reference repeated within one document is reported once.
- A repository with no ADR references produces no drift findings.

## Integration Tests (`tests/integration/doctor-command.test.ts`)

- Healthy initialized repo: drift checks add no findings; Doctor still passes.
- Feature memory referencing a missing ADR: `persist doctor` exits `2` and prints the dangling
  reference message.
- Feature memory referencing a proposed ADR: `persist doctor` exits `1` and prints the proposed
  reference warning.

## Safety

- Confirm Doctor performs no writes during drift checks (covered by read-only design and existing
  doctor read-only expectations).

## Regression

- `pnpm test:run` for the full suite.
- `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build`, `pnpm pack:check`.
- `node dist/cli.js doctor` on this repository must still pass.

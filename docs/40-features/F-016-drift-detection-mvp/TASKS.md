# Tasks: Drift Detection MVP

Build one task at a time. Do not start the next task until the current task has completion evidence.

## T1: Define scope and acceptance

- Status: Complete.
- Scope: PRD, acceptance criteria, architecture impact, and test plan for P13 drift MVP.
- Acceptance: Docs describe deterministic, local, read-only ADR-reference drift checks.
- Tests: None (documentation task).
- Do not: Expand scope into semantic drift.

## T2: Implement drift check

- Status: Complete.
- Scope: `src/core/doctor/checks/drift-check.ts` and wiring in `src/core/doctor/doctor-check.ts`.
- Acceptance: Dangling ADR references error; proposed ADR references warn; accepted references pass.
- Tests: Covered by T3.
- Do not: Mutate files, add network, or add new output surfaces.

## T3: Add tests

- Status: Complete.
- Scope: Unit tests for `checkDrift` and integration tests for the `doctor` command.
- Acceptance: Tests cover dangling, proposed, accepted, and healthy-repo cases.
- Tests: `tests/unit/doctor/drift-check.test.ts`, additions to
  `tests/integration/doctor-command.test.ts`.
- Do not: Weaken existing test coverage.

## T4: Update docs and memory

- Status: Complete.
- Scope: Doctor module memory, roadmap, product vision, README, command reference and generator.
- Acceptance: Docs reflect that Doctor now performs first deterministic drift checks.
- Tests: Generator-backed command reference test still passes.
- Do not: Claim semantic drift detection.

## T5: Review and completion

- Status: Complete.
- Scope: Review notes, drift review, and completion report with evidence.
- Acceptance: All quality gates recorded with results.
- Tests: Full suite, typecheck, lint, format, build, pack, and `recall doctor`.
- Do not: Claim completion without evidence.

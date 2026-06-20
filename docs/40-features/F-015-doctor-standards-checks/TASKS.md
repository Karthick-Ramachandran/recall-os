# Tasks: Doctor Standards Checks

## T1: Define Feature Scope

Status: Done

Scope:

- P12 feature docs.
- Doctor standards acceptance criteria.

Acceptance:

- Scope distinguishes standards checks from drift detection.
- Security and architecture boundaries are explicit.

Tests:

- Manual docs review.

Do Not:

- Start semantic drift detection.

## T2: Implement Standards Checks

Status: Done

Scope:

- `src/core/doctor/checks/standards-check.ts`
- `src/core/doctor/doctor-check.ts`

Acceptance:

- Completed features require review, test evidence, and result evidence.
- ADR consequence evidence is checked.
- Security-sensitive architecture impact needs security impact notes.
- Doctor remains read-only.

Tests:

- `tests/unit/doctor/doctor-standards-check.test.ts`
- Existing Doctor checks continue passing.

Do Not:

- Mutate repository files.
- Add dependencies.

## T3: Add Command Integration Coverage

Status: Done

Scope:

- `tests/integration/doctor-command.test.ts`

Acceptance:

- CLI output includes standards findings.
- Exit codes remain `0`, `1`, and `2`.

Tests:

- Focused Doctor integration tests.

Do Not:

- Change command output format beyond new findings.

## T4: Update Module Memory And Completion Evidence

Status: Done

Scope:

- `docs/30-modules/doctor/`
- P12 review and completion docs.

Acceptance:

- Doctor module memory records P12 ownership and tests.
- Completion report includes commands and results.

Tests:

- Manual review.

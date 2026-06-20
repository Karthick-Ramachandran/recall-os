# Doctor Test Plan

## P9 Tests

- Healthy initialized repo exits `0`.
- Missing config exits `2`.
- Invalid config exits `2`.
- Missing required docs exits `2`.
- Missing configured directories exits `2`.
- Feature folders missing docs exit `2`.
- Module folders missing docs exit `2`.
- ADR files missing required sections exit `2`.
- Warnings-only reports exit `1`.
- Info counts appear in output.

## P9 Results

- Covered by `tests/unit/doctor/doctor-report.test.ts`.
- Covered by `tests/unit/doctor/doctor-checks.test.ts`.
- Covered by `tests/integration/doctor-command.test.ts`.
- Focused P9 verification passed for Doctor, init command, and generic golden tests.
- Full verification passed with `pnpm test:run`, `pnpm typecheck`, and `git diff --check`.

## Future Tests

- Module ownership drift detection.
- Dependency drift detection.
- Semantic contradiction detection.

## P10 Results

- Doctor tests passed after the `.recall/config.json` and `RECALL_COMMANDS.md` rename.
- Binary integration tests verify built `recall doctor` succeeds after `recall init`.

## P12 Tests

- Completed feature with pending review exits with standards errors.
- Completed feature with missing tests or result evidence exits with standards errors.
- Proposed ADR with placeholder consequences exits with warnings.
- Accepted ADR with placeholder consequences exits with standards errors.
- Security-sensitive feature planning without security impact notes exits with warnings or errors
  based on completion status.

## P13 Tests

- Feature memory referencing a missing ADR exits with a drift error.
- Module memory referencing a missing ADR exits with a drift error.
- Memory referencing a not-yet-accepted ADR exits with a drift warning.
- Memory referencing an existing accepted ADR produces no drift finding.
- A repeated reference within one document is reported once.
- Covered by `tests/unit/doctor/drift-check.test.ts` and `tests/integration/doctor-command.test.ts`.

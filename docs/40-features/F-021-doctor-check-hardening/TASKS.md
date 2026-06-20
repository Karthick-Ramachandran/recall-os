# Tasks: Doctor Check Hardening

## T1: Drift false-positive fix

- Status: Complete.
- Scope: Strip fenced code blocks and inline code before scanning for ADR references.
- Tests: Drift unit test for code-block ignoring.

## T2: Content-completeness check

- Status: Complete.
- Scope: Warn on unfilled feature PRD Purpose or In Scope.
- Tests: Content-check unit tests.

## T3: Verify and complete

- Status: Complete.
- Scope: Wire into Doctor, run gates, confirm the repository still passes.
- Tests: Full suite, typecheck, lint, format, build, pack, and `recall doctor`.

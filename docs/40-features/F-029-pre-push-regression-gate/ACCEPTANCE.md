# Acceptance Criteria: Pre Push Regression Gate

## Criteria

- `persist init` generates an executable `.persist/hooks/pre-push` that runs `persist doctor` then
  each configured gate, with `set -e`.
- With no gates configured, the pre-push hook still runs `persist doctor`.
- Default output is otherwise unchanged (only one new file added); existing hooks/files are
  untouched.
- The hook is not auto-activated (same safe behavior as pre-commit).
- All gates green and `persist doctor` PASSED on this repo.

## Out Of Scope

- Differentiating pre-commit vs pre-push gate sets.

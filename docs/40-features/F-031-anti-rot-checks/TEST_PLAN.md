# Test Plan: Anti Rot Checks

## Unit Tests

- `checkContextBudget`: no finding for small files; warns past budget; counts a Cursor rule.
- `checkStaleness`: warns on a 90-day+ commit gap; quiet when committed together; skips off-git.

## Integration Tests

- This repository's own `persist doctor` stays PASSED (no false positives from either check).

## Security Tests

- Read-only; staleness runs `git log` only, skips gracefully without git.

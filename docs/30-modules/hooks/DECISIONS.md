# Hooks Decisions

## ADR-0002: Tracked Pre-Commit Hook

The pre-commit hook is tracked at `.persist/hooks/pre-commit`, not written into `.git/hooks`, so it
is shared and reviewable.

## Neutral Detection Only

Detected toolchain commands are written into `.persist/config.json` as proposed, editable
`preCommitGates`. They are never hardcoded into core. An undetected toolchain yields an empty list,
and the hook then runs only `persist doctor`.

## No Git Mutation

`persist init` proposes `git config core.hooksPath .persist/hooks` and never runs it. Activation
stays a deliberate human step.

## Trust Boundary

`preCommitGates` are executed by the hook as written. They are user-authored and trusted like
`package.json` scripts. The config schema rejects multi-line and control characters.

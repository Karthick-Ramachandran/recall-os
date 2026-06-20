# Test Plan: OSS Contribution Scaffolding

This is a documentation-only change, so verification is gate-based rather than unit-tested.

## Checks

- `pnpm format:check` passes for the new Markdown that falls under the format globs.
- `pnpm test:run`, `pnpm typecheck`, `pnpm lint`, `pnpm build`, and `pnpm pack:check` pass unchanged.
- `node dist/cli.js doctor` still passes, confirming no memory structure regressed.

## Manual Review

- Follow `CONTRIBUTING.md` "Adding a preset" steps against the existing `kotlin-android` preset to
  confirm the steps are accurate.
- Confirm `SECURITY.md` matches the accepted security model.

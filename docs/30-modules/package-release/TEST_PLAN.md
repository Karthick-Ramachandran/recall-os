# Package Release Test Plan

## P10 Tests

- Build produces a runnable CLI entrypoint.
- Built `persist --help` succeeds.
- Built `persist init` creates `.persist/config.json` in an empty directory.
- Built `persist doctor` succeeds after init.
- Package dry-run includes release files and excludes source-only or local artifacts.
- CI includes lint, format check, typecheck, tests, build, and pack check.

## Security Expectations

- No postinstall script.
- No runtime network behavior.
- No telemetry.
- No secret collection.
- Package contents are inspectable.

## P10 Results

- `pnpm build` passed.
- `tests/integration/binary-command.test.ts` verifies the built CLI entrypoint.
- `pnpm pack:check` passed and validated 100 package files.
- CI and release-candidate workflows were added.
- Release-candidate workflow does not publish to npm.

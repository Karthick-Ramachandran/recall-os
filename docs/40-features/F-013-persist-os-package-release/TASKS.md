# Tasks: Persist OS Package Release

## T0: Feature Docs And Module Memory

Status: Done

Scope:

- `docs/40-features/F-013-persist-os-package-release/`
- `docs/30-modules/package-release/`

Acceptance:

- Feature docs and package-release module memory exist before implementation.

Tests:

- Manual docs review.

## T1: Rename Product And Config

Status: Done

Scope:

- Product references.
- CLI references.
- Config path and public config types.
- Generated command memory.

Acceptance:

- Persist OS naming is consistent across tracked code, docs, tests, and generated output.
- `.persist/config.json` is the only supported config path.

Tests:

- Existing unit, integration, security, and golden tests updated and passing.

## T2: Package Build And CLI Binary

Status: Done

Scope:

- Package metadata.
- Build entrypoint.
- Build scripts.
- Package contents validation.

Acceptance:

- Built `persist` binary runs help, init, and doctor in tests.
- Package dry-run contains only intended release files.

Tests:

- Binary integration tests.
- Package contents test or script.

## T3: Preset List Command

Status: Done

Scope:

- CLI preset command wiring.
- Read-only preset list orchestration.

Acceptance:

- `persist preset list` lists built-in presets deterministically.

Tests:

- Integration test for preset list output.

## T4: README, Examples, CI, And Release Candidate Workflow

Status: Done

Scope:

- `README.md`
- `examples/`
- `.github/workflows/`
- `LICENSE`
- lint and format check scripts

Acceptance:

- README quickstart is accurate.
- Examples are committed and professional.
- CI validates lint, format, typecheck, tests, build, and pack check.
- Release workflow validates artifacts without publishing.

Tests:

- Full verification commands.
- Manual docs review.

## T5: Review And Completion

Status: Done

Scope:

- Feature review.
- Completion report.
- Module memory updates.
- Security and drift review.

Acceptance:

- Verification results and remaining risks are recorded.

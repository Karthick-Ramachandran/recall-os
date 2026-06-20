# Architecture Impact: OSS Contribution Scaffolding

## Affected Modules

None. This change adds repository meta-documentation only.

## New Behavior

- New root files `CONTRIBUTING.md` and `SECURITY.md`.
- New `.github/PULL_REQUEST_TEMPLATE.md` and `.github/ISSUE_TEMPLATE/` files.

No source, schema, config, generator, preset, or doctor behavior changes.

## Decision Records

No new ADR is required. This documents existing accepted decisions (the opinion-pack content
standard, the security model, and the completion gate) for contributors.

## Security Impact

- No code or capability change. `SECURITY.md` documents the existing model and a private reporting
  channel, reducing the chance that vulnerabilities are disclosed publicly.

## Compatibility

- Documentation-only. No effect on generated output, the CLI, or existing tests.

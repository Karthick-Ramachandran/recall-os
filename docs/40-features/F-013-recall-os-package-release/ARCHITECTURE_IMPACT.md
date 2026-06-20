# Architecture Impact: Recall OS Package Release

## Affected Modules

- `cli`: adds packaged binary execution and `preset list`.
- `core/config`: renames config path and public config type.
- `core/generator`: updates generated command memory and product naming.
- `core/doctor`: updates required command memory path and config diagnostics.
- `core/presets`: supports read-only preset listing through the existing registry.
- `package-release`: owns build, package validation, CI, and release-candidate evidence.

## Architecture Decisions

No new runtime architecture is introduced.

P10 adds build and release tooling, which is already part of the accepted tech stack. Dependency
additions stay within the approved test, build, lint, and formatting categories.

## Security Impact

The runtime remains local and deterministic.

P10 affects supply-chain posture through package metadata, package contents, CI, and
release-candidate validation. It must not add postinstall scripts, runtime downloads, telemetry,
cloud behavior, MCP runtime, or AI API calls.

## Compatibility Impact

This is a pre-public rename. P10 intentionally does not support the old `.specforge/config.json`
path or the old `specforge` command.

## Documentation Impact

The rename requires a broad documentation update. Public-facing docs must be professional and
consistent because README and examples are part of the release surface.

# Module: Package Release

## Purpose

The package-release module owns build, package validation, CI release checks, package metadata, and
release evidence for Recall OS.

## Owns

- Build tooling.
- Package metadata.
- CLI binary packaging.
- Package contents validation.
- CI workflow expectations.
- Release-candidate validation workflow.
- Release documentation and evidence.

## Does Not Own

- Command business rules.
- Config schema semantics.
- File write safety.
- Runtime network behavior.
- npm publishing credentials.
- Real publish automation in P10.

## Public Interfaces

- Package scripts for build, lint, format check, tests, typecheck, and pack check.
- npm package metadata.
- `recall` CLI binary after build.

## Boundaries

Package-release work must not change runtime behavior beyond making the existing CLI commands
available through the packaged binary.

It must not add postinstall scripts, runtime downloads, telemetry, cloud behavior, runtime MCP, AI
API calls, or generated application code.

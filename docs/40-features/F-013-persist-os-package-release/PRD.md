# PRD: Persist OS Package Release

## Purpose

Persist OS needs to move from an integration-tested TypeScript project to a publish-ready CLI
package.

This milestone also completes the pre-public rename from SpecForge to Persist OS so the product
name, package name, CLI command, generated memory, docs, examples, and tests all describe one
coherent product.

## Goals

- Rename tracked product references to Persist OS.
- Use npm package name `persist-os`.
- Expose CLI binary `persist`.
- Use `.persist/config.json` as the repository config path.
- Add build, package validation, CI, release-candidate validation, README, examples, and MIT
  license.
- Add `persist preset list`.
- Keep runtime local, deterministic, and architecture-neutral.

## Non-Goals

- Publishing to npm.
- Creating tags or pushing to GitHub.
- Adding real npm publish automation.
- Adding telemetry, network calls, cloud behavior, runtime MCP, AI API calls, or generated
  application code.
- Supporting backward compatibility with the old pre-public `.specforge` path or `specforge`
  command.

## Users

- Developers installing the CLI locally or globally.
- AI agents using repository memory and Doctor as a completion gate.
- Contributors evaluating the project through README, examples, CI, and package contents.

## Success Criteria

- A user can install from the local package artifact and run `persist`.
- `persist init` works in an empty directory.
- `persist doctor` validates an initialized repository.
- `persist preset list` reports built-in presets.
- README and examples explain the product professionally.
- CI verifies lint, formatting, typecheck, tests, build, and package contents.
- The package is ready for a later manual npm publish decision.

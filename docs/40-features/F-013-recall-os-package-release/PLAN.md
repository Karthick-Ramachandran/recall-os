# Plan: Recall OS Package Release

## Implementation Order

1. Create feature docs and package-release module memory.
2. Rename product, CLI, config path, command memory, and public config types.
3. Add build entrypoint, package metadata, build scripts, and package validation.
4. Add `preset list`.
5. Add README, examples, license, CI, and release-candidate workflow.
6. Update tests for renamed behavior and packaged binary behavior.
7. Run full verification and package checks.
8. Complete review, security review, drift review, module memory, and completion evidence.

## Boundaries

- Do not publish to npm.
- Do not add real release automation that publishes packages.
- Do not add runtime network behavior.
- Do not add telemetry.
- Do not add backward compatibility for pre-public names.

## Documentation Standard

Documentation must be concise, professional, and consistent.

Avoid emojis, decorative symbols, filler claims, uneven heading structure, and rough placeholders in
public-facing docs.

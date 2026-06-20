# Review: OSS Contribution Scaffolding

## Status

Passed.

## Scope Review

- Documentation only: `CONTRIBUTING.md`, `SECURITY.md`, pull request template, and issue templates.
- No source, schema, generator, preset, or doctor behavior changed.

## Correctness Review

- The "Adding a preset" steps match the real workflow and the content standard in OPINION_PACKS.md.
- `SECURITY.md` matches the accepted security model and ADR-0002 hook capability.
- The pull request template mirrors the project completion gate.

## Dogfooding Review

### Did the workflow catch any issue?

The decision to stop shipping every stack and instead document a contribution path keeps core small
and shifts breadth to the community. The contribution guide also encodes the lesson from the F-017
incident: never run `recall init` in the repository root.

### What should Recall OS improve before public release?

Add a CODE_OF_CONDUCT and consider whether external preset loading is ever in scope (it would need an
ADR because of the no-remote-templates rule).

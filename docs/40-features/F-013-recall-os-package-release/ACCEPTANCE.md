# Acceptance Criteria: Recall OS Package Release

## Rename

- Product references use Recall OS.
- CLI references use `recall`.
- Config references use `.recall/config.json`.
- Generated command memory uses `docs/ai/RECALL_COMMANDS.md`.
- Public config types use `RecallConfig`.
- No tracked `SpecForge`, `specforge`, `SPECFORGE`, or `.specforge` references remain unless
  explicitly documented as historical context.

## Package

- `package.json` uses package name `recall-os`.
- The package exposes `recall` as its binary.
- Build output contains a runnable CLI entrypoint.
- Package contents are limited to release-relevant files.
- `npm pack --dry-run` can be checked in CI.
- P10 does not publish to npm.

## Commands

- `recall init` creates `.recall/config.json` and repository memory.
- `recall doctor` validates an initialized repository.
- `recall preset list` lists built-in presets deterministically.
- Existing `init`, `feature create`, `adr create`, `module create`, and `doctor` behavior remains
  covered by tests after the rename.

## Documentation

- README is professional, concise, and useful for first-time users.
- Examples are committed for generic, Next.js, iOS Swift, and Flutter presets.
- Public docs avoid emojis, decorative filler, uneven formatting, and low-quality placeholders.
- Release docs state that npm publishing is not performed in P10.

## Runtime Boundary

- No network calls are added to runtime behavior.
- No telemetry is added.
- No MCP runtime is added.
- No AI API calls are added.
- No generated production app code is added.

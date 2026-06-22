# Acceptance Criteria: Persist OS Package Release

## Rename

- Product references use Persist OS.
- CLI references use `persist`.
- Config references use `.persist/config.json`.
- Generated command memory uses `docs/ai/PERSIST_COMMANDS.md`.
- Public config types use `PersistConfig`.
- No tracked `SpecForge`, `specforge`, `SPECFORGE`, or `.specforge` references remain unless
  explicitly documented as historical context.

## Package

- `package.json` uses package name `persist-os`.
- The package exposes `persist` as its binary.
- Build output contains a runnable CLI entrypoint.
- Package contents are limited to release-relevant files.
- `npm pack --dry-run` can be checked in CI.
- P10 does not publish to npm.

## Commands

- `persist init` creates `.persist/config.json` and repository memory.
- `persist doctor` validates an initialized repository.
- `persist preset list` lists built-in presets deterministically.
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

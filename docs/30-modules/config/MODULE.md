# Module: Config

## Purpose

The config module owns `.recall/config.json` schema, defaults, loading, and safe writing.

## Owns

- Config schema.
- Default config values.
- Config parsing and validation.
- Config file loading.
- Config file writing through safe write policy.

## Does Not Own

- CLI command parsing.
- Template rendering.
- Preset runtime.
- Doctor checks.
- Decision indexing in P2.
- Organization standards indexing in P2.
- Secrets.
- Network behavior.

## Public Interfaces

- `RecallConfig`
- `MemoryProfile`
- `AiToolTarget`
- `ConfigWritePolicy`
- `createDefaultConfig`
- `parseConfig`
- `loadConfig`
- `writeConfig`

## Current Decision

P2 keeps config boring and useful.

The config manifest records repository memory settings and paths, but not decisions or organization
standards yet.

P10 renames the config path to `.recall/config.json` and public config type to `RecallConfig`.

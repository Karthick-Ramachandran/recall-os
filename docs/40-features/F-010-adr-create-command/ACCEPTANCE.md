# Acceptance Criteria: ADR Create Command

## Command Behavior

- `adr create <title>` creates an ADR file under configured `adrDir`.
- Command requires `.recall/config.json`.
- Command fails clearly when config is missing.
- ADR titles are slugified.
- Unsafe ADR titles are rejected.
- Existing same-slug ADR files are skipped by default.
- `--dry-run` reports planned writes and writes nothing.
- `--force` overwrites explicitly.

## Generated ADR

Created ADR files include:

- title heading with ADR number and title
- `Status`
- `Context`
- `Decision`
- `Alternatives Considered`
- `Consequences`
- `Related Documents`

## Status

- Generated ADRs use `Proposed`.
- P7 does not provide a status flag.
- Humans accept ADRs by editing repository memory after review.

## Numbering

- First valid ADR number is `ADR-0001`.
- Next number increments from the highest valid `ADR-####-*` file.
- A valid existing file with the same slug is reused so reruns are idempotent.
- Malformed ADR files are ignored.

## Runtime Boundary

- No app code is generated.
- No package `bin`, build, release, module create, doctor, technology detection, network, telemetry, MCP runtime, AI API, or cloud behavior is added.

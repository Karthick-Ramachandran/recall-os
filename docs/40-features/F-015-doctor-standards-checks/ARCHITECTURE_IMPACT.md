# Architecture Impact: Doctor Standards Checks

## Affected Modules

- `core/doctor`
- `commands/doctor`
- `docs/30-modules/doctor`

## Module Boundaries

Doctor owns read-only repository memory checks.

P12 adds standards checks inside `core/doctor` because the checks read repository memory and produce
findings. Command code continues to orchestrate only.

The generator, filesystem, config, preset, naming, and CLI parser modules do not own this behavior.

## ADR Impact

No new ADR is required.

P12 does not change runtime architecture, file write policy, dependency policy, network behavior,
telemetry behavior, MCP posture, or template execution semantics.

## Security Impact

Doctor reads repository memory files and reports deterministic findings.

P12 does not write files, execute docs, load remote content, read `.env`, collect secrets, make
network calls, add telemetry, connect to MCP, call AI APIs, or add cloud behavior.

Security-sensitive feature planning is checked only from repository memory text. Doctor reports
missing security impact evidence; it does not infer implementation behavior from source code.

## Dependency Impact

No dependency is added.

## Test Impact

P12 adds unit and integration tests for standards checks and preserves existing Doctor behavior.

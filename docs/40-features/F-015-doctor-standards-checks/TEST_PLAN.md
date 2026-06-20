# Test Plan: Doctor Standards Checks

## Unit Tests

- Completed feature with pending review produces an error.
- Completed feature with missing test evidence produces an error.
- Completed feature with missing result evidence produces an error.
- Proposed ADR with placeholder consequences produces a warning.
- Accepted ADR with placeholder consequences produces an error.
- Security-sensitive feature impact with placeholder security notes produces a warning.
- Security-sensitive completed feature impact with placeholder security notes produces an error.

## Integration Tests

- Healthy initialized repo still exits `0`.
- Standards warnings return exit code `1`.
- Standards errors return exit code `2`.
- Doctor output includes actionable standards finding messages.

## Security Tests

- Doctor remains read-only.
- P12 adds no network, telemetry, MCP runtime, AI API, cloud behavior, or generated app code.

## Regression Tests

- Existing P9 Doctor structure checks continue passing.
- Binary Doctor behavior remains covered by existing binary integration tests after build.

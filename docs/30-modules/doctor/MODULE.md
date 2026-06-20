# Module: Doctor

## Purpose

Doctor owns read-only repository memory health checks.

It validates whether repository memory is structurally healthy enough for AI-assisted work.

## Owns

- Doctor findings.
- Severity model.
- Doctor report formatting.
- Doctor exit-code mapping.
- Config, required-doc, feature-doc, module-doc, and ADR-section health checks.
- Standards checks for completion evidence, review evidence, ADR consequences, and security impact
  notes.
- Recall command memory health checks.

## Does Not Own

- File writes.
- Init generation.
- CLI parser wiring.
- Semantic architecture drift detection.
- Dependency drift detection.
- JSON reporting in P9.
- Auto-fix behavior.
- Network, telemetry, MCP runtime, AI API, or cloud behavior.

## Public Interfaces

- `DoctorSeverity`
- `DoctorFinding`
- `DoctorReport`
- `DoctorCheck`
- `runDoctor`
- `formatDoctorReport`
- `getDoctorExitCode`

## Boundaries

Doctor reads repository memory and reports findings.

Doctor must not mutate files.

## Current Decision

P12 implements deterministic standards checks for repository memory evidence:

- completed features require review evidence;
- completed features require test and result evidence;
- ADRs require consequence substance;
- security-sensitive feature planning requires security-impact notes.

Semantic drift detection remains future work.

P10 updates Doctor checks for `.recall/config.json` and `docs/ai/RECALL_COMMANDS.md`.

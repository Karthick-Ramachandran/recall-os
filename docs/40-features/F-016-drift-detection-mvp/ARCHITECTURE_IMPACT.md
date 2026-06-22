# Architecture Impact: Drift Detection MVP

## Affected Modules

- `doctor`: gains a new read-only drift check and wires it into `runDoctor`.

No other module changes behavior. Filesystem, config, generator, presets, and naming are unchanged.

## New Behavior

- A new check module `src/core/doctor/checks/drift-check.ts` exposes `checkDrift(context)`.
- `checkDrift` reads the configured ADR directory to build the set of known ADR identifiers and
  their statuses, then scans the configured features and modules directories for `ADR-####`
  references.
- Findings are emitted through the existing `DoctorFinding` model and severity mapping. No new
  reporting surface, exit-code path, or output format is added.

## Decision Records

No new ADR is required.

- The direction is already accepted repository memory: Product Vision Level 4 and Roadmap P13 define
  drift detection as the next product step.
- The implementation reuses the existing Doctor check architecture (one check module returning
  `DoctorFinding[]`, wired into `runDoctor`), which is already covered by accepted decisions for the
  deterministic, local, read-only design.

If a future drift phase introduces semantic comparison, persistence, or a new reporting surface, an
ADR will be required at that time.

## Security Impact

- Drift detection is strictly read-only. It calls `readdir` and `readFile` within the project root
  through the same patterns the existing standards check already uses.
- No new file writes, no path acceptance from user input, no network, no telemetry, no MCP runtime,
  no AI API, and no cloud behavior are introduced.
- The check does not execute any repository content; it only matches text against fixed patterns.
- Worst-case failure mode is a false-positive or false-negative finding in a report, not data loss
  or escape from the project root.

## Compatibility

- Repositories that only reference existing, accepted ADRs see no change in Doctor results.
- Repositories with dangling or proposed ADR references will now see new findings, which is the
  intended detection behavior.

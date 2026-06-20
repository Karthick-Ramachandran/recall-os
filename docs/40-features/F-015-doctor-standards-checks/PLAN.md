# Plan: Doctor Standards Checks

## Approach

Implement P12 as a small read-only extension to Doctor.

1. Add feature docs and scope.
2. Add a `standards-check` module under `core/doctor/checks`.
3. Reuse existing Doctor report and exit-code behavior.
4. Add unit tests for completed-feature evidence, ADR consequence evidence, and security impact
   evidence.
5. Add integration tests for CLI output and exit codes.
6. Update Doctor module memory.
7. Run verification and record completion evidence.

## Design Notes

- Structural checks remain separate from standards checks.
- Standards checks operate on repository memory files, not source code.
- Warnings are used for incomplete drafts.
- Errors are used when memory claims completion or acceptance without required evidence.
- The current repository must remain healthy after P12.

## Out Of Scope

- Semantic drift detection.
- Dependency drift detection.
- Accepted ADR contradiction detection.
- Auto-fix behavior.
- JSON output.
- Package or release changes.

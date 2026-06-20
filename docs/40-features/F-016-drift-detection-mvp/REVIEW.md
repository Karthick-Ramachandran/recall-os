# Review: Drift Detection MVP

## Status

Passed.

## Scope Review

- The change adds one read-only Doctor check and wires it into `runDoctor`.
- No new command, output surface, exit-code path, network, telemetry, or file write was introduced.
- The check reuses the existing `DoctorFinding` model and severity mapping.

## Correctness Review

- Dangling ADR references produce errors; not-yet-accepted references produce warnings; accepted
  references produce nothing.
- References are deduplicated per document and identifier.
- ADR status is read deterministically from the `Status` section.

## Security Review

- The check only reads files within the configured directories. It does not accept user paths,
  execute repository content, or write any file.

## Dogfooding Review

### Did Recall OS-generated docs help implementation?

Yes. The doctor module memory and the P12 standards check provided a precise pattern to follow,
which kept the new check consistent with existing conventions.

### Which docs were useful?

`priority.md`, `ROADMAP.md`, `docs/30-modules/doctor/`, and the existing `standards-check.ts`.

### Which docs were ignored?

None material to this change.

### Which docs were too vague?

The roadmap listed several candidate drift checks without prioritization. Scope was narrowed to ADR
reference integrity for a deterministic MVP.

### Which docs were missing?

None blocking.

### Did the workflow catch any issue?

Yes. After implementation, `recall doctor` flagged that this feature's own `ACCEPTANCE.md` cited
example ADR numbers that do not exist. This was the new drift check correctly detecting drift in the
repository's own memory. The acceptance doc was rewritten to use non-numeric placeholders.

### Did the workflow slow us down unnecessarily?

No. The doc workflow added overhead but caught a real self-referential issue.

### What should Recall OS improve before public release?

Consider whether drift checks should ignore identifiers inside fenced code blocks or clearly marked
examples, so documentation can cite example ADR numbers without being flagged.

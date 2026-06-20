# Architecture Impact: Doctor Check Hardening

## Affected Modules

- `doctor`: the drift check gains code-stripping; a new content check is added and wired into
  `runDoctor`.

## New Behavior

- `drift-check` strips fenced code blocks and inline code before scanning for ADR references.
- New `src/core/doctor/checks/content-check.ts` warns on unfilled feature PRD sections.
- `runDoctor` runs `checkContent` after `checkDrift`.

## Decision Records

No new ADR is required. This refines existing deterministic, read-only Doctor checks within the
accepted Doctor architecture.

## Security Impact

- No new capability. Both checks only read files within configured directories. No writes, network,
  or execution of repository content.

## Compatibility

- Repositories with filled feature PRDs and prose-only ADR references are unaffected.
- Repositories with unfilled PRDs now see warnings; repositories that referenced example ADR numbers
  in code blocks no longer see false drift errors.

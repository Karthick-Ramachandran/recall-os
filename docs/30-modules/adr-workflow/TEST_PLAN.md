# ADR Workflow Test Plan

## P7 Tests

- ADR command creates required ADR sections.
- ADR command starts at `ADR-0001`.
- ADR command increments ADR numbers.
- ADR command reuses existing same-slug ADR files.
- ADR command rejects unsafe titles.
- ADR command skips existing files by default.
- ADR command supports dry run and force.

## Future Tests

- Doctor detects missing or stale accepted ADR references.
- ADR review workflow validates proposed-to-accepted changes.

## P7 Results

- Covered by `tests/integration/adr-create-command.test.ts`.
- Full verification passed with `pnpm test:run` and `pnpm typecheck`.

# Tasks: ADR Create Command

## T0: Add P7 Docs And Module Memory

Status: Done

Scope:

- `docs/40-features/F-010-adr-create-command/`
- `docs/30-modules/adr-workflow/`
- related module memory

Acceptance:

- ADR delivery docs exist.
- ADR workflow module memory exists.

## T1: Implement ADR Numbering

Status: Done

Scope:

- `src/core/naming/adr-number.ts`

Acceptance:

- Starts at `ADR-0001`.
- Increments from valid existing ADR files.
- Reuses an existing valid file for the same ADR slug.
- Ignores malformed ADR files.

## T2: Implement ADR Generation

Status: Done

Scope:

- `src/core/generator/generate-adr.ts`

Acceptance:

- Generates one proposed ADR markdown file.
- Includes required ADR sections.
- Returns write inputs only.
- Does not write files.

## T3: Implement ADR Command And CLI Wiring

Status: Done

Scope:

- `src/commands/adr/create.ts`
- `src/cli/main.ts`

Acceptance:

- `adr create <title>` works through `main(argv, io)`.
- Missing config and unsafe titles fail clearly.
- Dry run and force route through safe write planning.

## T4: Add Tests

Status: Done

Scope:

- `tests/unit/naming/adr-number.test.ts`
- `tests/unit/generator/generate-adr.test.ts`
- `tests/integration/adr-create-command.test.ts`

Acceptance:

- Unit and integration tests cover P7 acceptance criteria.

## T5: Verify And Complete

Status: Done

Scope:

- Automated checks.
- Manual docs review.
- Drift and security review.
- Completion report.

Acceptance:

- `pnpm test:run` passes.
- `pnpm typecheck` passes.
- `git diff --check` passes.
- Completion evidence is recorded.

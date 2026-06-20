# Test Plan: ADR Accept

## Integration Tests (`tests/integration/adr-accept-command.test.ts`)

- Promote a proposed preset ADR: accepted file has `Status: Accepted` and the id title; the proposal
  is removed.
- Accept an in-place numbered Proposed ADR: status flips to Accepted.
- A missing name errors clearly.
- A dry run writes nothing and leaves the proposal in place.

## Safety

- The delete is scoped to the named proposal, resolved within the project root, only on a real run.

## Regression

- `pnpm test:run`, `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build`,
  `pnpm pack:check`, `node dist/cli.js doctor`.

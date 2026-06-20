# Test Plan: MCP Capture Skill

## Unit Tests

- `tests/unit/skills/skill-catalog.test.ts`: the catalog includes `capture-mcp-context` and it is
  valid per the Agent Skills format.

## Integration Tests

- `tests/integration/mcp-command.test.ts`: `recall mcp add figma` installs the capture skill into the
  Claude target and reports it.

## Regression

- `pnpm test:run`, `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build`,
  `pnpm pack:check`, `node dist/cli.js doctor`.

# Completion Report: MCP Capture Skill

## Status

Complete.

## Tasks Completed

- T1: Added the `capture-mcp-context` skill to the catalog.
- T2: Wired `recall mcp add` to install the capture skill and added Jira as a known server.
- T3: Updated the strategy doc and command reference, dogfooded the capture skill, and recorded
  completion evidence.

## Files Changed

- `src/core/skills/skill-catalog.ts`
- `src/core/mcp/known-servers.ts`
- `src/commands/mcp/add.ts`
- `tests/unit/skills/skill-catalog.test.ts`, `tests/integration/mcp-command.test.ts`
- `docs/ai/AI_AGENTS_SKILLS_MCP_STRATEGY.md`, `docs/ai/RECALL_COMMANDS.md`,
  `src/core/generator/generate-init.ts`
- `docs/30-modules/mcp/TASKS.md`
- `docs/40-features/F-025-mcp-capture-skill/` (new feature memory)
- `.claude/skills/capture-mcp-context/`, `.agents/skills/capture-mcp-context/` (dogfood)
- `examples/generated-*/` (regenerated command reference)

## Tests Run

- `pnpm test:run`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm format:check`
- `pnpm build`
- `pnpm pack:check`
- `node dist/cli.js doctor`

## Results

- Full test suite passed: 48 files, 227 tests (1 new for the capture skill).
- `pnpm typecheck`, `pnpm lint`, and `pnpm format:check` passed.
- `pnpm build` passed; `pnpm pack:check` validated 169 files.
- `node dist/cli.js doctor` passed after this report was written.
- Manual verification: `recall mcp add figma` wrote the memory doc, the proposed ADR, and the
  `capture-mcp-context` skill to both targets; `recall mcp add jira` produced task-tool-aware memory.

## Remaining Risks

- One shared capture skill covers all servers; server-specific capture nuance is not modeled.
- A Doctor check that adopted MCP memory carries captured context is future work.

## Docs Updated

- Skills strategy doc, command reference, MCP module memory, and F-025 feature memory.

## Engineering Standards

Engineering standards were followed. The change composes accepted decisions (ADR-0004, ADR-0005),
adds no runtime behavior, network, telemetry, or scripts, and the capture skill is plain Markdown.

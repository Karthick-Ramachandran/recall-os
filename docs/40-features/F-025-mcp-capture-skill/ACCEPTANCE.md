# Acceptance Criteria: MCP Capture Skill

- The skill catalog includes `capture-mcp-context` with a "Use when" trigger covering MCP servers
  like Figma, Linear, Jira, and Sentry.
- `persist mcp add <server>` writes the memory doc, the proposed ADR, and the capture skill to both
  `.claude/skills/` and `.agents/skills/`.
- The capture skill instructs the agent to record durable context into `docs/ai/mcp/<server>.md` as
  proposed memory and to promote accepted decisions to ADRs.
- `persist mcp add jira` pre-fills a task-tool purpose.
- The capture skill is shared across servers and skipped if it already exists (unless `--force`).
- The skills strategy doc lists `capture-mcp-context`.

## Regression

- The full test suite passes and Doctor still passes.

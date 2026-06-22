# Architecture Impact: MCP Capture Skill

## Affected Modules

- `skills`: adds the `capture-mcp-context` catalog skill.
- `mcp`: `persist mcp add` now also generates the capture skill; adds Jira to known servers.

## New Behavior

- The skill catalog gains `capture-mcp-context`.
- `mcpAdd` composes `generateMcpFiles` with `generateSkillFiles("capture-mcp-context")`.
- Jira is a known server.

## Decision Records

No new ADR is required. This composes accepted decisions: ADR-0004 (portable, scriptless skills) and
ADR-0005 (proposed, offline MCP memory). The capture skill is a generated skill, not runtime code.

## Security Impact

- No new capability. The capture skill is plain Markdown instructions with no scripts.
- `persist mcp add` remains offline and non-destructive; the capture skill is skip-existing.

## Compatibility

- `persist mcp add` writes one additional pair of skill files; existing files are never overwritten
  by default.
- The skill catalog grows by one; `persist skill list` reflects it.

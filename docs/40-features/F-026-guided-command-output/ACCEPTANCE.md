# Acceptance Criteria: Guided Command Output

- `persist init` prints a "Next steps" block pointing at CLAUDE.md/AGENTS.md and the first commands.
- `persist adr create` names the ADR file and the sections to fill, and notes it is Proposed.
- `persist feature create` points at PRD.md and ACCEPTANCE.md and suggests `persist doctor`.
- `persist module create` points at MODULE.md and DECISIONS.md.
- `persist skill create` states where the skill is and whether to fill it (skeleton) or load it
  (catalog).
- `persist mcp add` points at the memory doc and the capture skill and the proposed ADR.
- `persist adopt` points at the adoption report and the proposed ADRs.
- No "Next steps" block is printed on a dry run.

## Regression

- The full test suite passes and Doctor still passes.

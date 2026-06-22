# Review: MCP Capture Skill

## Status

Passed.

## Scope Review

- Adds one catalog skill and composes it into `mcp add`; adds Jira. Reuses skill generation and the
  write pipeline. No new capability.

## Correctness Review

- `mcp add` installs the capture skill to both targets; the skill is skip-existing.
- The capture skill routes context into `docs/ai/mcp/<server>.md` as proposed and promotes accepted
  decisions to ADRs.

## Security Review

- The capture skill is plain Markdown with no scripts. `mcp add` stays offline and non-destructive.

## Dogfooding Review

### Did the workflow catch any issue?

It closed the gap raised in review: `persist mcp add` previously produced a memory slot with no
mechanism to fill it. The capture skill completes the cycle using the skill generation already
built, rather than adding runtime behavior.

### What should Persist OS improve before public release?

Consider a Doctor check that an `docs/ai/mcp/<server>.md` with adopted status has captured context,
and broaden known servers.

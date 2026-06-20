# PRD: MCP Capture Skill

## Purpose

F-024 generates a memory slot for an MCP server but nothing makes an agent actually record context
into it, so on its own it is just a template. This feature completes the cycle: when a user works
through an MCP server (Figma, Linear, Jira, Sentry), durable context is captured into repository
memory so future sessions remember it.

It leverages the skill generation built in F-023 — the capture behavior ships as a generated agent
skill, not runtime code.

## Problem

- MCP context is ephemeral; without a capture step it is lost after the conversation.
- `recall mcp add` produced a slot and a rule but no mechanism to fill the slot.
- Task tools like Jira and Linear are common MCP uses and should be supported.

## In Scope

- Add a `capture-mcp-context` agent skill to the catalog.
- Have `recall mcp add <server>` install the capture skill alongside the memory doc and proposed ADR.
- Add Jira to the known servers.
- Update the skills strategy doc and tests.

## Non-Goals

- No connection to MCP servers, no network, no live data import (unchanged from ADR-0005).
- No runtime agent execution; the capture behavior is a generated skill the agent follows.

## Users

- Teams using Figma, Linear, Jira, or Sentry through MCP who want durable, reusable context.
- AI agents that should record and re-read MCP-derived context instead of re-deriving it.

## Success Criteria

- `recall mcp add figma` installs `capture-mcp-context` into both skill targets.
- The capture skill triggers on MCP/design/ticket work and routes context into
  `docs/ai/mcp/<server>.md` as proposed memory.
- `recall mcp add jira` produces task-tool-aware memory.
- Captured context stays proposed; accepted decisions are promoted to ADRs.

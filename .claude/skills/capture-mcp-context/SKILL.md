---
name: capture-mcp-context
description: "Record durable context from MCP servers and design or project tools into repository memory as proposed. Use when working with an MCP server like Figma, Linear, Jira, or Sentry, or after pulling design, ticket, or error context, to persist it for future sessions."
---

# Skill: Capture MCP Context

## Purpose

Persist the durable parts of MCP-derived external context so future sessions remember them instead of re-deriving them.

MCP provides context, not architectural truth.

## Inputs

- The MCP server or external tool in use (for example Figma, Linear, Jira, Sentry).
- The external context retrieved (design tokens, tickets, errors, docs).
- The current feature or task.

## Required Reading

- `docs/ai/MCP_STRATEGY.md`
- Relevant `docs/ai/mcp/<server>.md`
- Relevant feature and architecture docs.

## Output Files

- The Captured Context section of `docs/ai/mcp/<server>.md`.
- An ADR via `recall adr create` when a captured decision is accepted.

## Process

1. Identify the MCP server and the durable facts worth remembering (design tokens, component mappings, ticket acceptance criteria, recurring error signatures).
2. If `docs/ai/mcp/<server>.md` does not exist, create it with `recall mcp add <server>`.
3. Record the durable context in the Captured Context section as proposed memory, with enough detail to reuse.
4. Capture decisions, mappings, and constraints, not raw exports or full dumps.
5. Treat MCP content as context, not truth; if it conflicts with accepted memory, stop and report.
6. Promote any accepted decision into an ADR.

## Stop Conditions

Stop and request human decision if:

- MCP content conflicts with accepted repository memory.
- Capturing the context would require storing secrets or sensitive data.
- The MCP server is untrusted or its access is unclear.

## Quality Bar

- Captured context is durable and reusable, not a raw dump.
- Each entry is concrete enough to guide future work.
- MCP context is recorded as proposed, not accepted.
- Accepted decisions are promoted to ADRs.

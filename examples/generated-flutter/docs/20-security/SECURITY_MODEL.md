# Security Model

## Status

Draft — fill the prompted sections below with this repository's real model as it grows.
`persist doctor` flags these as warnings once the repository has real work (a feature, module, or
accepted decision).

## Baseline Rules

- Never commit secrets or credentials, and never read or copy `.env` files into docs.
- Validate and authorize untrusted input at every trust boundary.
- Do not add network, telemetry, cloud, MCP runtime, or AI API behavior without explicit review.

## Authentication And Authorization

Describe how this repository authenticates users or clients and how it authorizes actions, including
where those checks live.

## Secrets And Configuration

Describe where secrets live, how they are injected, and how configuration is kept out of version
control.

## Sensitive Data

Describe the sensitive or personal data this repository handles, and how it is protected at rest and
in transit.

## Dependencies And Supply Chain

Describe how third-party dependencies are vetted, pinned, and updated.

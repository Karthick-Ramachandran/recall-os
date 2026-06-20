# Recall OS

Recall OS is a local-first CLI for creating and maintaining repository memory for AI-assisted
software work.

It does not generate application code. It gives a repository durable memory: product intent,
architecture decisions, module ownership, testing expectations, engineering standards, AI
instructions, and health checks.

## Why It Exists

AI coding tools are useful, but their context is temporary. Repositories need a stable source of
truth that humans and agents can re-read, review, and validate.

Recall OS treats the repository as the authority. Agents are executors. Accepted repository memory
wins over model preference and chat history.

## Install

P10 prepares the package for release but does not publish it to npm.

After publishing, the intended install command is:

```bash
npm install -g recall-os
```

During local development:

```bash
pnpm install
pnpm build
node dist/cli.js --help
```

## Quickstart

Initialize repository memory in an empty folder:

```bash
mkdir my-app
cd my-app
recall init
```

Create feature, decision, and module memory:

```bash
recall feature create auth
recall adr create auth-strategy
recall module create auth
```

Check whether the repository memory is structurally healthy:

```bash
recall doctor
```

## Commands

| Command                        | Purpose                                              |
| ------------------------------ | ---------------------------------------------------- |
| `recall init`                  | Create neutral repository memory.                    |
| `recall init --preset <id>`    | Add optional preset guidance and proposed decisions. |
| `recall preset list`           | List built-in presets.                               |
| `recall feature create <name>` | Create feature memory docs.                          |
| `recall adr create <title>`    | Create a proposed ADR.                               |
| `recall module create <name>`  | Create module memory docs.                           |
| `recall doctor`                | Validate repository memory structure.                |

## Presets

Presets are optional opinion packs. They can provide guidance and proposed decisions, but they do
not silently accept architecture choices.

Built-in presets:

- `generic`
- `nextjs`
- `ios-swift`
- `flutter`

Default `recall init` is architecture-neutral.

## Repository Memory

Recall OS creates a memory structure under `docs/` and `.recall/config.json`.

The default source-of-truth order is:

1. Accepted ADRs and repository decisions
2. Architecture docs
3. Engineering standards
4. Current PRD and accepted change requests
5. Security and testing docs
6. Module docs
7. Feature plans
8. Task files
9. External context
10. Chat history

If external context or chat history conflicts with repository memory, repository memory wins.

## Local-First Runtime

Recall OS MVP does not:

- Make network calls at runtime.
- Collect telemetry.
- Connect to MCP servers.
- Call AI APIs.
- Generate production application code.
- Install dependencies into target repositories.
- Overwrite existing files by default.

## Examples

Example generated outputs are committed under `examples/`:

- `examples/generated-generic/`
- `examples/generated-nextjs/`
- `examples/generated-ios-swift/`
- `examples/generated-flutter/`

These examples show the shape of repository memory created by `recall init`.

## Development

```bash
pnpm install
pnpm lint
pnpm format:check
pnpm test:run
pnpm typecheck
pnpm build
pnpm pack:check
```

Before claiming implementation work is complete, run the test and quality gates listed above. Use
`recall doctor` once the CLI binary is built.

## Release Status

Recall OS is prepared for package release in P10. P10 does not publish to npm, create tags, or
require npm credentials.

Before any public publish, recheck package name ownership for `recall-os` and review the package
contents with:

```bash
pnpm build
pnpm pack:check
```

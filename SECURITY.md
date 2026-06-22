# Security Policy

## Reporting A Vulnerability

Please report security issues privately. Do not open a public issue for a suspected vulnerability.

Use GitHub's private vulnerability reporting for this repository, or contact the maintainers
directly. Include reproduction steps and the affected version. You will receive an acknowledgement,
and fixes for confirmed issues will be released as soon as practical.

## Security Model Summary

Persist OS is local-first and deliberately small in attack surface. See
`docs/20-security/SECURITY_MODEL.md` and `docs/20-security/THREAT_MODEL.md` for detail. In the
current release the tool:

- makes no network calls at runtime;
- collects no telemetry;
- connects to no MCP servers and calls no AI APIs;
- executes no remote templates;
- never overwrites existing files by default;
- never writes outside the project root, and refuses to write through symlinks.

The one privileged capability is generating an executable git pre-commit hook at
`.persist/hooks/pre-commit` during `persist init`. This is governed by
`docs/adrs/ADR-0002-pre-commit-hook-generation.md`:

- the hook is written inside the project root through the safe write pipeline;
- `persist init` proposes, but never runs, `git config core.hooksPath .persist/hooks`;
- `preCommitGates` in `.persist/config.json` are executed by the hook as written and are trusted at
  the same level as `package.json` scripts; the config schema rejects multi-line and control
  characters.

## Supported Versions

Persist OS is pre-1.0. Security fixes target the latest released version.

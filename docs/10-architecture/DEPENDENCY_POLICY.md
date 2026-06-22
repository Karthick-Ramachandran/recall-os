# Dependency Policy

## Purpose

Dependencies should make Persist OS safer, simpler, or more maintainable. They should not expand the
MVP trust boundary without review.

## MVP Allowed Categories

- CLI parsing
- Schema validation
- Template rendering
- Test/build/lint tooling

## Review Required

ADR consideration is required before adding dependencies that:

- Execute templates or user content dynamically.
- Add network behavior.
- Add telemetry or analytics.
- Run install-time scripts.
- Manage secrets or credentials.
- Parse untrusted archives.
- Add native binaries.
- Create long-running background processes.

## Dependency Quality Bar

A dependency should have:

- Clear license.
- Active maintenance.
- Minimal transitive risk.
- Deterministic behavior.
- No hidden network calls in Persist OS runtime.

## Generated Output

Persist OS must not install dependencies into target projects during MVP. It may generate
documentation describing recommended stack dependencies, but it must not run install commands.

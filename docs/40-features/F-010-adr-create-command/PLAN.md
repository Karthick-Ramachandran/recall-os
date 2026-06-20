# Plan: ADR Create Command

## Approach

Implement ADR creation as a narrow command workflow.

Keep business logic in core modules and command code focused on orchestration.

## Tasks

1. Add P7 feature docs and ADR workflow module memory.
2. Implement ADR numbering and idempotent existing-slug resolution.
3. Implement ADR document generation.
4. Implement ADR create command orchestration.
5. Wire `adr create <title>` into the CLI parser.
6. Add unit and integration tests.
7. Run verification and complete review evidence.

## Boundaries

Do not implement:

- accepted-status creation
- ADR review workflow
- module create
- doctor
- rich templates
- package binary wiring
- network, telemetry, MCP runtime, AI API, cloud behavior, or app code generation

# Proposed ADR: Validate with Form Requests and authorize with Policies

## Status

Proposed

## Context

Input validation and authorization must be consistent and centralized, not scattered across
controllers.

## Decision

Consider Form Requests for validation (and request-level authorization) plus Policies and Gates for
per-model and per-action permission checks, awaiting human acceptance.

## Alternatives Considered

- Inline validation and authorization in controllers.
- A third-party permissions package layered on top.

## Consequences

- Controllers stay thin; validation and authorization are testable in isolation.
- Every state-changing action must have an explicit authorization path.

## Related Documents

- `docs/ai/presets/laravel-api-guidance.md` — the proposed Laravel stack guidance.
- `docs/10-architecture/ARCHITECTURE.md` — record the accepted architecture here once promoted.

# Proposed ADR: Expose a versioned REST API with API Resources

## Status

Proposed

## Context

A decoupled SPA or mobile client consumes Laravel over HTTP, so the API contract must be stable and
explicit.

## Decision

Consider a versioned REST API (for example `/api/v1`) whose responses are shaped by API Resources,
authenticated with Sanctum, and documented (OpenAPI). This is not accepted until a human accepts it.

## Alternatives Considered

- GraphQL.
- Server-driven Inertia pages instead of a decoupled API.

## Consequences

- A stable, documented contract that multiple clients can rely on.
- Versioning and serialization become an explicit, maintained concern.

## Related Documents

- `docs/ai/presets/laravel-api-guidance.md` — the proposed Laravel stack guidance.
- `docs/10-architecture/ARCHITECTURE.md` — record the accepted architecture here once promoted.
- `docs/20-security/SECURITY_MODEL.md` — record token scopes and the SPA cookie guard here.

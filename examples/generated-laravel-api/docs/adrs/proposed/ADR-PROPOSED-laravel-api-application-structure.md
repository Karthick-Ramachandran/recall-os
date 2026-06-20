# Proposed ADR: Keep controllers thin with Action and Service classes

## Status

Proposed

## Context

Business logic tends to accumulate in controllers and models, which makes it hard to test and reuse.

## Decision

Consider thin controllers that delegate to single-purpose Action or Service classes, with outbound
payloads shaped by API Resources (or typed Inertia props). This is not accepted until a human
accepts it.

## Alternatives Considered

- Fat controllers.
- Fat models holding business logic.

## Consequences

- Reusable, unit-testable business logic and consistent response shapes.
- More classes and a convention the team must follow.

## Related Documents

- `docs/ai/presets/laravel-api-guidance.md` — the proposed Laravel stack guidance.
- `docs/10-architecture/ARCHITECTURE.md` — record the accepted architecture here once promoted.

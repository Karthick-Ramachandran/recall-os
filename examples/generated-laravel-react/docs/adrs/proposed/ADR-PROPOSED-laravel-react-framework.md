# Proposed ADR: Use Laravel

## Status

Proposed

## Context

The team needs a productive, batteries-included PHP framework for a production web application.

## Decision

Consider Laravel 12 on PHP 8.3+ as the application framework, following its standard conventions and
directory structure. This is not accepted until a human reviews and accepts it.

## Alternatives Considered

- Symfony for a more component-assembled approach.
- A different language or framework entirely.

## Consequences

- A mature ecosystem (Eloquent, queues, Sanctum, Horizon) and strong conventions.
- Couples the application to Laravel's conventions and release cadence.

## Related Documents

- `docs/ai/presets/laravel-react-guidance.md` — the proposed Laravel stack guidance.
- `docs/10-architecture/ARCHITECTURE.md` — record the accepted architecture here once promoted.

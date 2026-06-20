# Proposed ADR: Use Eloquent and migrations on PostgreSQL

## Status

Proposed

## Context

The application needs a relational database and a schema workflow.

## Decision

Consider PostgreSQL (MySQL as the alternative) accessed through Eloquent and versioned migrations,
awaiting human acceptance.

## Alternatives Considered

- MySQL or MariaDB.
- The query builder or raw SQL without Eloquent.

## Consequences

- Expressive models, relationships, and reproducible schema migrations.
- Requires discipline against N+1 queries and unbounded result sets.

## Related Documents

- `docs/ai/presets/laravel-react-guidance.md` — the proposed Laravel stack guidance.
- `docs/10-architecture/ARCHITECTURE.md` — record the accepted architecture here once promoted.
- `docs/50-quality/TESTING_STRATEGY.md` — how database tests use factories and a disposable
  database.

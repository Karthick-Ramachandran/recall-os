# Proposed ADR: Use Pest for testing

## Status

Proposed

## Context

The application needs a fast, readable testing workflow.

## Decision

Consider Pest with model factories and feature tests that exercise real routes against a disposable
database, awaiting human acceptance.

## Alternatives Considered

- PHPUnit directly.
- A thinner test suite focused only on unit tests.

## Consequences

- Concise, expressive tests that cover routes, validation, and authorization.
- The team standardizes on Pest's syntax and plugins.

## Related Documents

- `docs/ai/presets/laravel-react-guidance.md` — the proposed Laravel stack guidance.
- `docs/10-architecture/ARCHITECTURE.md` — record the accepted architecture here once promoted.
- `docs/50-quality/TESTING_STRATEGY.md` — record the accepted testing approach here.

# Proposed ADR: Use Inertia with React 19

## Status

Proposed

## Context

The application needs a modern SPA experience without standing up and securing a separate API for
first-party screens.

## Decision

Consider Inertia 2 with React 19 and TypeScript, built with Vite, using shadcn/ui components on
Tailwind. Controllers return Inertia responses with typed props. This is not accepted until a human
reviews and accepts it.

## Alternatives Considered

- A decoupled REST or GraphQL API with a standalone SPA.
- Blade with Livewire.

## Consequences

- Server-driven routing and auth with a reactive React 19 frontend and no duplicate API layer.
- Couples the frontend to Inertia's model and the React 19 ecosystem.

## Related Documents

- `docs/ai/presets/laravel-react-guidance.md` — the proposed Laravel stack guidance.
- `docs/10-architecture/ARCHITECTURE.md` — record the accepted architecture here once promoted.

# Proposed ADR: Use Inertia with Vue 3

## Status

Proposed

## Context

The application needs a modern SPA experience without standing up and securing a separate API for
first-party screens.

## Decision

Consider Inertia 2 with Vue 3 and TypeScript, built with Vite, using Tailwind with single-file
components (script setup). Controllers return Inertia responses with typed props. This is not
accepted until a human reviews and accepts it.

## Alternatives Considered

- A decoupled REST or GraphQL API with a standalone SPA.
- Blade with Livewire.

## Consequences

- Server-driven routing and auth with a reactive Vue 3 frontend and no duplicate API layer.
- Couples the frontend to Inertia's model and the Vue 3 ecosystem.

## Related Documents

- `docs/ai/presets/laravel-vue-guidance.md` — the proposed Laravel stack guidance.
- `docs/10-architecture/ARCHITECTURE.md` — record the accepted architecture here once promoted.

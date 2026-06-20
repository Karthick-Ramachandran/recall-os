# Proposed ADR: Use Laravel Sanctum for authentication

## Status

Proposed

## Context

The application needs authentication for first-party clients (a separate SPA and mobile apps).

## Decision

Consider Laravel Sanctum: the cookie-based guard for first-party SPAs and API tokens for mobile or
scripted clients. This is not accepted until a human reviews and accepts it.

## Alternatives Considered

- Laravel Passport for full OAuth2 (third-party delegated access).
- A managed identity provider.

## Consequences

- Lightweight first-party auth without standing up a full OAuth2 server.
- If third-party delegated access is ever required, revisit with Passport.

## Related Documents

- `docs/ai/presets/laravel-api-guidance.md` — the proposed Laravel stack guidance.
- `docs/10-architecture/ARCHITECTURE.md` — record the accepted architecture here once promoted.
- `docs/20-security/SECURITY_MODEL.md` — record the accepted auth and session model here.

# Proposed ADR: Run slow work on queues

## Status

Proposed

## Context

Email, exports, and third-party calls slow down requests and can fail independently.

## Decision

Consider queued jobs for slow or failure-prone work, using the database driver early and Redis with
Laravel Horizon as throughput grows. This is not accepted until a human reviews and accepts it.

## Alternatives Considered

- Doing the work synchronously in the request.
- An external task queue or serverless functions.

## Consequences

- Faster responses and isolated, retryable background work.
- Adds a worker process and queue infrastructure to operate and monitor.

## Related Documents

- `docs/ai/presets/laravel-vue-guidance.md` — the proposed Laravel stack guidance.
- `docs/10-architecture/ARCHITECTURE.md` — record the accepted architecture here once promoted.

# Laravel Preset Guidance (React via Inertia)

This is proposed guidance, not accepted. Convert any architecture choice into a proposed ADR, then
an accepted ADR, before treating it as repository truth. Repository rules override model preference.

## The stack (proposed)

- Laravel 12 on PHP 8.3+, using the official conventions and directory layout.
- Frontend: Inertia 2 + React 19 + TypeScript + Tailwind, built with Vite (the official React
  starter kit, with shadcn/ui for components).
- Database: PostgreSQL (MySQL is the alternative) through Eloquent and migrations.
- Auth: Laravel Sanctum for first-party SPA and mobile clients (Passport only if you need
  third-party OAuth2).
- Background work: queues, with Redis and Laravel Horizon when throughput grows.
- Tests: Pest, with database factories and feature tests over real routes.

The app is a server-driven SPA: Laravel controllers return Inertia responses with typed props; there
is no separate REST client for first-party screens.

## Decision forks this stack forces

- Frontend delivery: Inertia (server-driven SPA) vs a decoupled API + separate SPA vs Blade +
  Livewire.
- Auth: Sanctum (first-party SPA and mobile) vs Passport (third-party OAuth2) vs a managed identity
  provider.
- Database: PostgreSQL vs MySQL, and where read scaling and queues live (Redis vs database driver).
- Authorization: Policies and Gates vs ad-hoc checks; validation via Form Requests vs inline.
- Business logic: thin controllers with Action/Service classes vs fat controllers and models.
- Testing: Pest vs PHPUnit.

## Recommended structure (proposed)

- Keep controllers thin: they validate, authorize, delegate, and return a response — nothing more.
- Put request validation **and** authorization in Form Requests (`authorize()` + `rules()`).
- Put per-model and per-action permission logic in Policies and Gates, not in controllers.
- Put business logic in single-purpose Action or Service classes, not in controllers or models.
- Shape every outbound payload with API Resources (or typed Inertia props), never raw models.
- Declare `$fillable` (or `$guarded`) explicitly on every Eloquent model to stop mass assignment.

## Data and performance (proposed)

- Eager-load relationships (`with(...)`) to avoid N+1 queries; enable `Model::preventLazyLoading()`
  in local and CI.
- Wrap multi-write operations in database transactions.
- Paginate list endpoints; never return unbounded collections.
- Move email, exports, third-party calls, and other slow work into queued jobs.
- Cache expensive reads deliberately, with explicit invalidation.

## Testing (proposed)

- Write Pest feature tests that exercise real routes end to end, using `RefreshDatabase`.
- Build state with model factories, not hand-rolled fixtures.
- Test authorization explicitly: a forbidden action must assert a 403, not just a happy path.
- Cover validation failures, not only the success case.

## Security considerations (proposed)

- Validate every inbound request through Form Requests; persist only validated data.
- Authorize every state-changing action through a Policy or Gate.
- Keep secrets in `.env`; never commit `.env` or hardcode credentials.
- Apply rate limiting to auth and write endpoints.
- Keep mass assignment locked down and never trust client-supplied IDs without an ownership check.
- Inertia uses Laravel's session and CSRF protection; keep auth and authorization on the server,
  never the client.

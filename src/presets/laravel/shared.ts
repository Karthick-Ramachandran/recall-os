import type { PresetGuidance, PresetProposedDecision } from "../../core/presets/preset-schema.js";

/**
 * Shared building blocks for the Laravel opinion packs. Three presets compose these: `laravel-react`
 * and `laravel-vue` (Inertia SPAs) and `laravel-api` (API/SPA backend). Every decision is *proposed*
 * — a human accepts it with `persist adr accept`. Nothing here is accepted truth.
 */
export type LaravelVariant = "react" | "vue" | "api";

type VariantProfile = {
  id: string;
  label: string;
  description: string;
  frontendLine: string;
  deliveryLine: string;
};

const VARIANTS: Record<LaravelVariant, VariantProfile> = {
  react: {
    id: "laravel-react",
    label: "React via Inertia",
    description:
      "Opinionated Laravel + Inertia + React opinion pack (proposed decisions only). Matches the official Laravel React starter kit.",
    frontendLine:
      "Frontend: Inertia 2 + React 19 + TypeScript + Tailwind, built with Vite (the official React starter kit, with shadcn/ui for components).",
    deliveryLine:
      "The app is a server-driven SPA: Laravel controllers return Inertia responses with typed props; there is no separate REST client for first-party screens.",
  },
  vue: {
    id: "laravel-vue",
    label: "Vue via Inertia",
    description:
      "Opinionated Laravel + Inertia + Vue opinion pack (proposed decisions only). Matches the official Laravel Vue starter kit.",
    frontendLine:
      "Frontend: Inertia 2 + Vue 3 (script setup) + TypeScript + Tailwind, built with Vite (the official Vue starter kit).",
    deliveryLine:
      "The app is a server-driven SPA: Laravel controllers return Inertia responses with typed props; there is no separate REST client for first-party screens.",
  },
  api: {
    id: "laravel-api",
    label: "API / SPA backend",
    description:
      "Opinionated Laravel API-only opinion pack (proposed decisions only) for a decoupled SPA or mobile client.",
    frontendLine:
      "No server-rendered frontend: Laravel is an HTTP JSON API consumed by a separate SPA or mobile app.",
    deliveryLine:
      "Controllers return JSON via API Resources; first-party SPAs authenticate with Sanctum cookies, mobile clients with Sanctum tokens.",
  },
};

function adr(presetId: string, topic: string, title: string, body: string): PresetProposedDecision {
  return {
    id: `${presetId}-${topic}`,
    title,
    status: "proposed",
    destination: `docs/adrs/proposed/ADR-PROPOSED-${presetId}-${topic}.md`,
    body,
  };
}

function related(presetId: string, ...extra: string[]): string {
  return [
    `## Related Documents`,
    ``,
    `- \`docs/ai/presets/${presetId}-guidance.md\` — the proposed Laravel stack guidance.`,
    `- \`docs/10-architecture/ARCHITECTURE.md\` — record the accepted architecture here once promoted.`,
    ...extra.map((line) => `- ${line}`),
    ``,
  ].join("\n");
}

export function laravelGuidance(variant: LaravelVariant): string {
  const profile = VARIANTS[variant];

  return `# Laravel Preset Guidance (${profile.label})

This is proposed guidance, not accepted. Convert any architecture choice into a proposed ADR, then an
accepted ADR, before treating it as repository truth. Repository rules override model preference.

## The stack (proposed)

- Laravel 12 on PHP 8.3+, using the official conventions and directory layout.
- ${profile.frontendLine}
- Database: PostgreSQL (MySQL is the alternative) through Eloquent and migrations.
- Auth: Laravel Sanctum for first-party SPA and mobile clients (Passport only if you need third-party OAuth2).
- Background work: queues, with Redis and Laravel Horizon when throughput grows.
- Tests: Pest, with database factories and feature tests over real routes.

${profile.deliveryLine}

## Decision forks this stack forces

- Frontend delivery: Inertia (server-driven SPA) vs a decoupled API + separate SPA vs Blade + Livewire.
- Auth: Sanctum (first-party SPA and mobile) vs Passport (third-party OAuth2) vs a managed identity provider.
- Database: PostgreSQL vs MySQL, and where read scaling and queues live (Redis vs database driver).
- Authorization: Policies and Gates vs ad-hoc checks; validation via Form Requests vs inline.
- Business logic: thin controllers with Action/Service classes vs fat controllers and models.
- Testing: Pest vs PHPUnit.

## Recommended structure (proposed)

- Keep controllers thin: they validate, authorize, delegate, and return a response — nothing more.
- Put request validation **and** authorization in Form Requests (\`authorize()\` + \`rules()\`).
- Put per-model and per-action permission logic in Policies and Gates, not in controllers.
- Put business logic in single-purpose Action or Service classes, not in controllers or models.
- Shape every outbound payload with API Resources (or typed Inertia props), never raw models.
- Declare \`$fillable\` (or \`$guarded\`) explicitly on every Eloquent model to stop mass assignment.

## Data and performance (proposed)

- Eager-load relationships (\`with(...)\`) to avoid N+1 queries; enable \`Model::preventLazyLoading()\` in local and CI.
- Wrap multi-write operations in database transactions.
- Paginate list endpoints; never return unbounded collections.
- Move email, exports, third-party calls, and other slow work into queued jobs.
- Cache expensive reads deliberately, with explicit invalidation.

## Testing (proposed)

- Write Pest feature tests that exercise real routes end to end, using \`RefreshDatabase\`.
- Build state with model factories, not hand-rolled fixtures.
- Test authorization explicitly: a forbidden action must assert a 403, not just a happy path.
- Cover validation failures, not only the success case.

## Security considerations (proposed)

- Validate every inbound request through Form Requests; persist only validated data.
- Authorize every state-changing action through a Policy or Gate.
- Keep secrets in \`.env\`; never commit \`.env\` or hardcode credentials.
- Apply rate limiting to auth and write endpoints.
- Keep mass assignment locked down and never trust client-supplied IDs without an ownership check.
${
  variant === "api"
    ? "- Scope Sanctum tokens to least privilege; SPA clients use the cookie guard with CSRF protection.\n"
    : "- Inertia uses Laravel's session and CSRF protection; keep auth and authorization on the server, never the client.\n"
}`;
}

export function laravelGuidanceItems(): PresetGuidance[] {
  return [
    {
      title: "Keep stack choices proposed",
      body: "Framework, frontend delivery, database, auth, and testing choices stay proposed until accepted in repository memory.",
    },
    {
      title: "Thin controllers, explicit authorization",
      body: "Validate and authorize in Form Requests and Policies, keep business logic in Action or Service classes, and shape output with Resources — propose these as decisions before treating them as truth.",
    },
  ];
}

export function laravelProposedDecisions(variant: LaravelVariant): PresetProposedDecision[] {
  const presetId = VARIANTS[variant].id;

  const base: PresetProposedDecision[] = [
    adr(
      presetId,
      "framework",
      "Use Laravel",
      `# Proposed ADR: Use Laravel

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

${related(presetId)}`,
    ),
    adr(
      presetId,
      "database-eloquent",
      "Use Eloquent and migrations on PostgreSQL",
      `# Proposed ADR: Use Eloquent and migrations on PostgreSQL

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

${related(presetId, "`docs/50-quality/TESTING_STRATEGY.md` — how database tests use factories and a disposable database.")}`,
    ),
    adr(
      presetId,
      "auth-sanctum",
      "Use Laravel Sanctum for authentication",
      `# Proposed ADR: Use Laravel Sanctum for authentication

## Status

Proposed

## Context

The application needs authentication for first-party clients (${
        variant === "api"
          ? "a separate SPA and mobile apps"
          : "an Inertia SPA, and possibly mobile apps"
      }).

## Decision

Consider Laravel Sanctum: the cookie-based guard for first-party SPAs and API tokens for mobile or
scripted clients. This is not accepted until a human reviews and accepts it.

## Alternatives Considered

- Laravel Passport for full OAuth2 (third-party delegated access).
- A managed identity provider.

## Consequences

- Lightweight first-party auth without standing up a full OAuth2 server.
- If third-party delegated access is ever required, revisit with Passport.

${related(presetId, "`docs/20-security/SECURITY_MODEL.md` — record the accepted auth and session model here.")}`,
    ),
    adr(
      presetId,
      "validation-authorization",
      "Validate with Form Requests and authorize with Policies",
      `# Proposed ADR: Validate with Form Requests and authorize with Policies

## Status

Proposed

## Context

Input validation and authorization must be consistent and centralized, not scattered across
controllers.

## Decision

Consider Form Requests for validation (and request-level authorization) plus Policies and Gates for
per-model and per-action permission checks, awaiting human acceptance.

## Alternatives Considered

- Inline validation and authorization in controllers.
- A third-party permissions package layered on top.

## Consequences

- Controllers stay thin; validation and authorization are testable in isolation.
- Every state-changing action must have an explicit authorization path.

${related(presetId)}`,
    ),
    adr(
      presetId,
      "application-structure",
      "Keep controllers thin with Action and Service classes",
      `# Proposed ADR: Keep controllers thin with Action and Service classes

## Status

Proposed

## Context

Business logic tends to accumulate in controllers and models, which makes it hard to test and reuse.

## Decision

Consider thin controllers that delegate to single-purpose Action or Service classes, with outbound
payloads shaped by API Resources (or typed Inertia props). This is not accepted until a human accepts
it.

## Alternatives Considered

- Fat controllers.
- Fat models holding business logic.

## Consequences

- Reusable, unit-testable business logic and consistent response shapes.
- More classes and a convention the team must follow.

${related(presetId)}`,
    ),
    adr(
      presetId,
      "queues-horizon",
      "Run slow work on queues",
      `# Proposed ADR: Run slow work on queues

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

${related(presetId)}`,
    ),
    adr(
      presetId,
      "testing-pest",
      "Use Pest for testing",
      `# Proposed ADR: Use Pest for testing

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

${related(presetId, "`docs/50-quality/TESTING_STRATEGY.md` — record the accepted testing approach here.")}`,
    ),
  ];

  return [...base, frontendDecision(variant)];
}

function frontendDecision(variant: LaravelVariant): PresetProposedDecision {
  const presetId = VARIANTS[variant].id;

  if (variant === "api") {
    return adr(
      presetId,
      "api-design-rest",
      "Expose a versioned REST API with API Resources",
      `# Proposed ADR: Expose a versioned REST API with API Resources

## Status

Proposed

## Context

A decoupled SPA or mobile client consumes Laravel over HTTP, so the API contract must be stable and
explicit.

## Decision

Consider a versioned REST API (for example \`/api/v1\`) whose responses are shaped by API Resources,
authenticated with Sanctum, and documented (OpenAPI). This is not accepted until a human accepts it.

## Alternatives Considered

- GraphQL.
- Server-driven Inertia pages instead of a decoupled API.

## Consequences

- A stable, documented contract that multiple clients can rely on.
- Versioning and serialization become an explicit, maintained concern.

${related(presetId, "`docs/20-security/SECURITY_MODEL.md` — record token scopes and the SPA cookie guard here.")}`,
    );
  }

  const framework = variant === "react" ? "React 19" : "Vue 3";
  const components =
    variant === "react"
      ? "shadcn/ui components on Tailwind"
      : "Tailwind with single-file components (script setup)";

  return adr(
    presetId,
    `frontend-inertia-${variant}`,
    `Use Inertia with ${framework}`,
    `# Proposed ADR: Use Inertia with ${framework}

## Status

Proposed

## Context

The application needs a modern SPA experience without standing up and securing a separate API for
first-party screens.

## Decision

Consider Inertia 2 with ${framework} and TypeScript, built with Vite, using ${components}. Controllers
return Inertia responses with typed props. This is not accepted until a human reviews and accepts it.

## Alternatives Considered

- A decoupled REST or GraphQL API with a standalone SPA.
- Blade with Livewire.

## Consequences

- Server-driven routing and auth with a reactive ${framework} frontend and no duplicate API layer.
- Couples the frontend to Inertia's model and the ${framework} ecosystem.

${related(presetId)}`,
  );
}

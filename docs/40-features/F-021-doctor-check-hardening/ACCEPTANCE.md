# Acceptance Criteria: Doctor Check Hardening

## Drift false-positive fix

- An ADR identifier that appears only inside a fenced code block or inline code is not reported.
- A prose reference to a missing ADR is still reported as a `drift-adr-reference` error.
- A prose reference to a proposed ADR is still reported as a `drift-proposed-reference` warning.

## Content completeness

- A feature PRD whose Purpose still contains the template instruction text produces a
  `content-feature-prd` warning.
- A feature PRD whose In Scope is `- TBD` produces a `content-feature-prd` warning.
- A filled PRD produces no content finding.

## Safety

- Checks remain deterministic, local, and read-only.
- A healthy `recall init` repository still passes Doctor.
- The existing repository (filled PRDs) still passes Doctor.

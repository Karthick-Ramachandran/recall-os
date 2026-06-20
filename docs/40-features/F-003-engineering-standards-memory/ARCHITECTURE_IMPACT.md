# Architecture Impact: Engineering Standards Memory

## Affected Areas

- Repository memory model.
- Product positioning.
- Agent routing.
- Review and drift workflows.
- Project structure docs.

## Runtime Impact

No runtime impact.

P1.6 is docs-only.

## Security Impact

P1.6 added security-relevant engineering standards as repository memory but did not add runtime
enforcement, file writes, dependency changes, network calls, telemetry, MCP runtime, AI API
behavior, cloud behavior, or generated application code.

Future Doctor enforcement of engineering standards must stay read-only unless an ADR approves
auto-fix behavior.

## Source-Of-Truth Impact

The source-of-truth order becomes:

1. Accepted ADRs and repository decisions
2. Architecture docs
3. Engineering standards
4. Current PRD and accepted change requests
5. Security and testing docs
6. Module docs
7. Feature plans
8. Task files
9. MCP external context
10. Chat history

## ADR Impact

No ADR is required for P1.6 because this is a product/memory-model documentation change without
runtime architecture change.

Future enforcement, doctor checks, or template generation for engineering standards may require ADR
review.

# PRD: Product Vision Roadmap Alignment

## Purpose

Recall OS has reached a release-ready foundation through P10. The repository now needs durable
product memory that states what the product is becoming, what it is not becoming, and what roadmap
comes next.

This prevents future work from drifting toward AI agent runtime, app generation, framework
generation, or generic documentation scaffolding.

## Problem

The product thesis is clear in conversation but must be preserved in repository memory.

Without durable product memory, future agents and contributors may optimize for the wrong surface:

- More templates instead of memory protection.
- App generation instead of repository memory.
- AI agent behavior instead of source-of-truth governance.
- Missing-file checks instead of drift detection.

## In Scope

- Add durable product vision.
- Add positioning.
- Add roadmap from current foundation through drift detection, adoption, and organization memory.
- Update README and root agent files to route to the product vision docs.
- Update build priority to show post-P10 direction.
- Update product-memory module memory.

## Non-Goals

- Implementing drift detection.
- Implementing `recall adopt`.
- Implementing organization memory runtime.
- Adding new package dependencies.
- Changing CLI behavior.
- Publishing to npm.

## Product Thesis

AI can write the code.

Recall OS makes sure the repository does not forget what it is doing.

Git tracks what changed.

Recall OS tracks why it changed.

## Success Criteria

- Product vision is available as canonical product memory.
- Roadmap names the next meaningful product layers.
- Anti-scope is explicit.
- README communicates the core promise.
- Root agent docs route agents to product vision, positioning, and roadmap.
- No runtime behavior changes are introduced.

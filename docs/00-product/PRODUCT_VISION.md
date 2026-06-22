# Product Vision: Persist OS

## Category

Persist OS is an Engineering Memory Operating System for AI-assisted software development.

It is not an AI coding agent, app generator, architecture generator, framework generator, code
completion model, or agent runtime.

It is also not just docs, ADRs, or templates. Those are storage formats. The product is the memory
layer, quality gate, and governance system that makes those artifacts useful.

## Core Promise

AI can write the code.

Persist OS makes sure the repository does not forget what it is doing.

## Product Thesis

Modern AI coding tools can produce implementation quickly, but they are unreliable long-term memory
systems. They forget context, compact conversations, miss previous decisions, and may continue from
partial instructions.

Persist OS makes the repository the authority.

Agents can read repository memory before work. Doctor can validate memory after work. Future drift
detection can compare new changes against accepted memory.

## Simple Explanation

Git tracks what changed.

Persist OS tracks why it changed.

## Current Product Levels

### Level 1: Create Memory

Persist OS creates durable repository memory through:

```bash
persist init
persist feature create
persist adr create
persist module create
```

This memory includes product, architecture, decision, module, engineering standards, testing, and
security memory.

### Level 2: Validate Memory

Persist OS validates repository memory through:

```bash
persist doctor
```

Doctor checks required docs, config validity, feature structure, ADR structure, module structure,
completion evidence, ADR consequence evidence, security-impact evidence, ADR reference integrity,
and repository health. This is where the product becomes more than a generator.

### Level 3: AI Completion Gate

Persist OS should be part of the completion gate for AI-assisted work.

Before claiming work is complete, agents should run:

```bash
pnpm test:run
pnpm typecheck
persist doctor
```

If checks fail, the agent should fix the issues or explain why they remain.

## Future Product Levels

### Level 4: Drift Detection

Persist OS should detect mismatch with accepted repository memory.

The first deterministic drift checks are implemented. Doctor reports when feature or module memory
references an ADR that does not exist, and warns when memory references an ADR that is not yet
accepted.

Future drift detection examples:

- Accepted ADR says PostgreSQL, but new docs mention MongoDB.
- Module ownership no longer matches implementation notes.
- Security assumptions changed without review.

Drift is not difference from a Persist OS preference. Drift is mismatch with accepted repository
memory.

### Level 5: AI Context Distribution

Persist OS should distribute durable context to AI tools through root instructions, generated
command memory, feature docs, module docs, ADRs, standards, and future tool-specific guidance.

The goal is not to assume agents always remember. The goal is to make the repository memory easy to
re-read and validate.

### Level 6: Repository Governance

Persist OS should make engineering standards increasingly checkable.

Examples:

- Feature missing review.
- Completion report missing.
- ADR missing consequences section.
- Tests not recorded.
- Security review missing for sensitive changes.

### Level 7: Legacy Adoption

Future `persist adopt` should inspect existing repositories and produce reviewable memory.

It must not silently accept inferred decisions. Inferred decisions should be proposed or flagged for
human review.

### Level 8: Organization Memory

Persist OS should eventually support shared organization memory across repositories.

Examples:

- Organization standards.
- Organization ADRs.
- Organization architecture guidance.
- Organization opinion packs.

This expands Persist OS from repository memory to team memory.

## Anti-Scope

Persist OS should actively resist becoming:

- AI coding agent.
- Code generation platform.
- Editor or IDE competitor.
- Agent runtime.
- Model hosting platform.
- Cloud execution platform.

The durable product surface is memory, discipline, governance, decision tracking, and drift
detection.

## Long-Term Vision

Persist OS should become the system teams trust when AI can write code but the repository must
remember intent, decisions, constraints, and standards.

The product wins when a developer, reviewer, or AI agent can ask:

```txt
What are we building?
Why did we decide this?
What must not drift?
What evidence proves this work is complete?
```

and the repository can answer.

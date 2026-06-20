# Architecture Impact: ADR Create Command

## Affected Modules

- `cli`
- `commands`
- `core/config`
- `core/filesystem`
- `core/generator`
- `core/naming`
- `adr-workflow`

## New Behavior

P7 adds command orchestration for ADR draft creation.

Command code loads config, calls naming/generator/filesystem modules, and formats output.

ADR creation is idempotent by slug. If `ADR-####-deterministic-cache-policy.md` already exists, `adr create deterministic-cache-policy` targets that file and lets the write policy skip or overwrite it. New ADR slugs receive the next number after the highest valid ADR file.

## Module Boundary Check

- `core/naming` owns slug safety, ADR number scanning, and existing ADR file resolution.
- `core/generator` owns deterministic ADR document plans.
- `core/filesystem` owns safe write planning and execution.
- `cli` owns command registration and output routing.
- `commands` owns orchestration.

## Dependency Impact

No dependency is added.

## File Write Impact

ADR creation uses one safe write plan.

If the plan has errors, execution refuses to write.

## Security Impact

User-provided ADR titles are a trust boundary.

Controls:

- unsafe titles are rejected through `slugify`
- destinations are validated through safe write planning
- existing files skip by default
- dry run writes nothing
- force is explicit

## ADR Impact

No new accepted ADR is required.

P7 creates proposed ADR drafts and does not change architecture policy.

# Acceptance Criteria: Anti Rot Checks

## Criteria

- `context-budget` is silent for a normal repo (~few KB) and warns past the budget.
- `staleness` is silent when memory and code are committed together, warns on a 90-day+ gap, and
  produces nothing outside a git repository.
- Both are warnings, gated, and additive — default `init` + doctor on a fresh/real repo stays clean.

## Out Of Scope

- Tuning thresholds via config.

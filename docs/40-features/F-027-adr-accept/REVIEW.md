# Review: ADR Accept

## Status

Passed.

## Scope Review

- Adds one command and ADR-0006. Reuses config, the write pipeline, safe-path, and naming.

## Correctness Review

- Promotion numbers the ADR, sets Accepted, rewrites the title, and removes the proposal.
- In-place acceptance flips status for an existing numbered Proposed ADR.
- Dry run writes and removes nothing.

## Security Review

- The single delete is resolved through safe-path within the project root and runs only after the
  accepted file is written, never on dry run. The accepted file uses the safe write pipeline.

## Dogfooding Review

### Did the workflow catch any issue?

It closed the governance gap surfaced while reviewing the ADR feature: the tool proposed decisions
everywhere but could not accept one. Accept makes a proposal become source of truth, which is what
drift is measured against.

### What should Persist OS improve before public release?

Add `persist adr reject` with a recorded reason, and consider a Doctor check that flags
long-standing proposals that have never been accepted or rejected.

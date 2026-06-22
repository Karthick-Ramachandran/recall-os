# ADR-0006: ADR Accept Promotes And Removes The Proposal

## Status

Accepted

## Context

Presets, adopt, and mcp generate proposed ADRs under `docs/adrs/proposed/`, but there was no way to
accept one. Accepting a decision is the moment a proposal becomes repository source of truth (the
top of the source-of-truth order, and the anchor drift is measured against). The governance loop was
open.

Persist OS is otherwise strictly non-destructive. Promoting a proposal cleanly means moving it:
writing an accepted, numbered ADR and removing the proposal source. That introduces a scoped delete.

## Decision

`persist adr accept <name>` promotes a proposed decision to accepted memory.

- For a proposal in `docs/adrs/proposed/ADR-PROPOSED-<slug>.md`: write a numbered
  `docs/adrs/ADR-####-<slug>.md` with `Status: Accepted` and the title rewritten to the ADR id, then
  remove the proposal file. This is a deliberate move, not a silent overwrite.
- For an existing numbered ADR with `Status: Proposed`: flip its status to `Accepted` in place.
- The new accepted file is written through the safe, root-confined write pipeline. The proposal is
  removed only after the accepted file is written, and only on a real run (never on `--dry-run`).
- The removed path is reported in the command output.

## Alternatives Considered

- Copy and leave the proposal in place. Rejected: a still-"proposed" duplicate of an accepted
  decision is confusing and invites drift.
- Require manual editing to accept. Rejected: it leaves the governance loop open and undocumented.
- Keep Persist OS delete-free. Rejected: an explicit accept that moves a file is the expected
  behavior; the content is preserved in the accepted ADR.

## Consequences

- The propose -> accept loop is closed: proposals can become source-of-truth with one command.
- Persist OS gains a single, narrowly scoped delete: the named proposal file, after promotion,
  within the project root.
- Drift checks resolve once a referenced proposal is accepted.

## Related Documents

- `docs/40-features/F-027-adr-accept/`
- `docs/10-architecture/FILE_WRITE_POLICY.md`
- `docs/00-product/PRODUCT_VISION.md`

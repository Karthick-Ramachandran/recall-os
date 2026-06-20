# Plan: Drift Detection MVP

## Approach

Implement drift detection as a new Doctor check, mirroring how P12 added the standards check. This
keeps Doctor as the single read-only validation surface and avoids a new command or module.

## Detection Logic

1. Read the configured ADR directory (including a `proposed/` subdirectory if present). For each
   file whose name matches `ADR-(\d{4,})-*.md`, record the identifier `ADR-####` and its `Status`
   section value.
2. Scan the configured features and modules directories recursively for `.md` files. In each file,
   match `ADR-\d{4,}` tokens.
3. For each referenced identifier, deduplicated per `(document, identifier)`:
   - If no ADR file declares it, emit an error finding `drift-adr-reference`.
   - If an ADR file declares it but its status is not `Accepted`, emit a warning finding
     `drift-proposed-reference`.
   - If an ADR file declares it and the status is `Accepted`, emit nothing.

## Wiring

- Add `checkDrift` to `runDoctor` after `checkStandards`, guarded by the presence of valid config,
  matching the existing memory-integrity and standards calls.

## Reuse

- Reuse the section-reading and safe directory/file reading patterns already present in
  `standards-check.ts`. Shared helpers stay local to the check module to keep the change scoped.

## Out Of Scope For This Plan

- Semantic contradiction detection.
- Module-ownership-versus-feature-plan comparison.
- Persisted baselines or snapshots.
- JSON output and auto-fix.

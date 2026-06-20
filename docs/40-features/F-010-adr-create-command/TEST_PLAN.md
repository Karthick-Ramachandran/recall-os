# Test Plan: ADR Create Command

## Unit Tests

- ADR numbering starts at `ADR-0001`.
- ADR numbering increments from existing valid files.
- ADR numbering reuses an existing file for the same slug.
- Malformed ADR files are ignored.
- ADR generator emits the required sections.
- ADR generator paths are deterministic.
- ADR generator uses `Status` = `Proposed`.
- Unsafe ADR titles are rejected.

## Integration Tests

- Command requires initialized config.
- Command creates ADR file.
- Command skips existing files by default.
- Command supports `--dry-run`.
- Command supports `--force`.
- Command rejects unsafe titles.
- Command increments ADR number.
- Command respects configured `adrDir`.
- Command output is actionable.

## Verification

Run:

```txt
pnpm test:run
pnpm typecheck
git diff --check
```

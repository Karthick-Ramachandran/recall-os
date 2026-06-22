<!-- Persist OS pull request template -->

## Summary

<!-- What does this change do and why? -->

## Linked Memory

<!-- Feature folder (docs/40-features/F-###-...) and any ADR (docs/adrs/ADR-####-...). -->

- Feature:
- ADR (if any):

## Completion Evidence

- [ ] `pnpm test:run`
- [ ] `pnpm typecheck`
- [ ] `pnpm lint`
- [ ] `pnpm format:check`
- [ ] `pnpm build`
- [ ] `pnpm pack:check`
- [ ] `node dist/cli.js doctor`

Results / notes:

<!-- Paste key results, list skipped checks, and remaining risks. -->

## Neutrality And Safety

- [ ] No architecture or technology choice is encoded as accepted core truth.
- [ ] Any preset decision is `Proposed`, not accepted.
- [ ] No new network, telemetry, MCP runtime, AI API, or remote-template behavior.
- [ ] File writes stay inside the project root and remain non-destructive by default.
- [ ] Docs and memory updated where behavior or standards changed.

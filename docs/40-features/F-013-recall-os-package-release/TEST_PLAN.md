# Test Plan: Recall OS Package Release

## Unit Tests

- Config schema and load/write tests use `.recall/config.json`.
- Doctor report and checks use Recall OS naming and command memory.
- Preset registry still validates built-in presets.

## Integration Tests

- `recall init` behavior through `main(argv, io)` remains covered.
- `recall doctor` behavior through `main(argv, io)` remains covered.
- `recall preset list` lists built-in presets deterministically.
- Built CLI binary runs `--help`.
- Built CLI binary runs `init` in an empty directory.
- Built CLI binary runs `doctor` after init.

## Golden Tests

- Generated generic, Next.js, iOS Swift, and Flutter output use Recall OS naming.
- Generated command memory path is `docs/ai/RECALL_COMMANDS.md`.
- Generated config path is `.recall/config.json`.

## Package Tests

- Build succeeds.
- Package dry-run includes `dist`, README, LICENSE, and examples.
- Package dry-run excludes tests, source-only files, caches, and local artifacts.

## Verification

Run:

```txt
pnpm lint
pnpm format:check
pnpm test:run
pnpm typecheck
pnpm build
pnpm pack:check
git diff --check
```

Manual review must confirm professional README and example quality.

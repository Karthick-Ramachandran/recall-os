# Test Plan: Pre Push Regression Gate

## Unit Tests

- `renderPrePushHook` starts with a POSIX `sh` shebang, runs `persist doctor`, appends gates in
  order, and documents the activation command without running it.

## Integration Tests

- `persist init` writes an executable `.persist/hooks/pre-push`; the generic golden file list
  includes it.
- Existing files (pre-commit hook, docs, skills) are unchanged.

## Security Tests

- The hook only runs user-configured commands and `persist doctor`; no network, no new write
  surface.

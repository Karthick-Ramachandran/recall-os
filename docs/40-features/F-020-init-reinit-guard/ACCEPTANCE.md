# Acceptance Criteria: Init Reinit Guard

- Given a directory with `.persist/config.json`, `persist init --force` exits non-zero, writes
  nothing, and prints a refusal that mentions `--reinit`.
- Given the same directory, `persist init --force --reinit` succeeds and overwrites generated files.
- Given a directory without `.persist/config.json`, `persist init --force` overwrites as before.
- `persist init` without `--force` is unchanged and still skips existing files.
- `--dry-run` plus `--force` without `--reinit` is also refused when an installation exists, so a
  preview cannot imply a destructive run is allowed.
- The `--reinit` flag is documented in the command reference and contribution guide.

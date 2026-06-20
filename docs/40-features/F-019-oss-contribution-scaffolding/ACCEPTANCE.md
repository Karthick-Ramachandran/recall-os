# Acceptance Criteria: OSS Contribution Scaffolding

- `CONTRIBUTING.md` exists and documents setup, the full completion gate, the feature workflow, and
  a step-by-step "Adding a preset" guide referencing `docs/10-architecture/OPINION_PACKS.md`.
- `CONTRIBUTING.md` warns not to run `recall init` in the repository root.
- `SECURITY.md` exists, documents private reporting, and summarizes the local-first security model
  including the pre-commit hook capability.
- `.github/PULL_REQUEST_TEMPLATE.md` lists the completion-evidence commands and the neutrality and
  safety checklist.
- `.github/ISSUE_TEMPLATE/` contains a bug report template and a preset request template.
- No source or runtime behavior changes; `node dist/cli.js doctor` still passes.

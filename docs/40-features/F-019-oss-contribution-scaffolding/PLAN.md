# Plan: OSS Contribution Scaffolding

## Approach

Author documentation files only. No source changes.

## Steps

1. Add `CONTRIBUTING.md` covering setup, the completion gate, the feature workflow, and the
   "Adding a preset" guide.
2. Add `SECURITY.md` with private reporting and a security-model summary.
3. Add `.github/PULL_REQUEST_TEMPLATE.md` with the completion-evidence and neutrality checklist.
4. Add `.github/ISSUE_TEMPLATE/` bug and preset-request templates.
5. Run the completion gate and confirm Doctor still passes.

## Out Of Scope

- Plugin or external preset loading.
- Runtime changes.

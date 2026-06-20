# PRD: OSS Contribution Scaffolding

## Purpose

Recall OS is open source but lacks the files contributors expect. There is no contribution guide, no
security policy, no pull request template, and no issue templates. The decision is to grow preset
coverage through community contributions rather than shipping every stack, so the path to contribute
a preset must be documented and easy to follow.

## Problem

- A contributor has no documented way to add a preset, run the gates, or structure a change.
- There is no private channel documented for security reports.
- Pull requests have no completion-evidence or neutrality checklist.

## In Scope

- Add `CONTRIBUTING.md` with setup, the completion gate, the feature workflow, and a step-by-step
  "Adding a preset" guide that points at the existing content standard.
- Add `SECURITY.md` summarizing the security model and private reporting.
- Add `.github/PULL_REQUEST_TEMPLATE.md` with a completion-evidence and neutrality checklist.
- Add issue templates for bug reports and preset requests.

## Non-Goals

- No runtime behavior change.
- No external or plugin preset loading; presets are contributed as code.
- No CODE_OF_CONDUCT in this batch.

## Users

- Contributors adding presets or fixes.
- Security reporters.
- Maintainers triaging issues and reviewing pull requests.

## Success Criteria

- A contributor can follow `CONTRIBUTING.md` to add a preset end to end.
- `SECURITY.md` documents private reporting and the security model.
- The pull request template lists the completion gate and neutrality checks.
- Doctor still passes; no runtime behavior changes.

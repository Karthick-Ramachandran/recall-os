# Module: Repository Memory

## Purpose

Repository memory is the durable source of truth that lets humans and AI agents understand a repo
before, during, and after implementation work.

## Owns

- Repository-memory-first product semantics.
- Relationship between memory and code.
- Greenfield, existing repository, and legacy adoption workflows.
- Rule that detected technology is guidance, not accepted memory.
- Relationship between repository memory, Doctor, and future drift detection.

## Does Not Own

- Source control.
- Framework-specific app generation.
- Accepted architecture decisions.
- Organization memory import runtime.
- Doctor runtime checks.

## Current Decision

Recall OS is a repository memory layer.

It can be initialized before app code exists.

Code may come before or after repository memory.

P11 clarifies that repository memory is the long-term product surface. Doctor validates that memory
today, and future drift detection should compare changes against accepted repository memory.

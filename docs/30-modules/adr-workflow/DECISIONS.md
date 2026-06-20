# ADR Workflow Decisions

## P7: ADRs Start Proposed

P7 creates ADR drafts with status `Proposed`.

Accepting an ADR remains a human-owned repository memory update.

## P7: ADR Create Is Idempotent By Slug

Rerunning `adr create <title>` for an existing valid ADR slug should not allocate duplicate decision memory.

The existing file is reused, and the filesystem write policy determines whether it is skipped or explicitly overwritten.

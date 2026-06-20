# Doctor Decisions

## P9: Doctor Is Read-Only

P9 Doctor validates repository memory health and reports findings.

It does not fix or mutate files.

## P9: Exit Code Severity

Doctor uses:

```txt
0 = healthy
1 = warnings only
2 = errors
```

This makes Doctor useful as an AI completion gate.

## P9: Structural Checks First

P9 validates deterministic memory structure and required sections.

Semantic drift detection remains future work.

## P10: Recall Paths

Doctor treats `.recall/config.json` and `docs/ai/RECALL_COMMANDS.md` as required repository memory.

## P12: Standards Evidence Checks

Doctor now checks deterministic engineering evidence in repository memory.

Completed features require review, test evidence, and result evidence. ADRs require consequence
substance. Security-sensitive feature planning requires security impact notes.

These checks are read-only and deterministic. Semantic drift detection remains future work.

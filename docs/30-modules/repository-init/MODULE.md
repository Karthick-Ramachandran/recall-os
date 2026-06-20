# Module: Repository Init

## Purpose

Repository init defines what `recall init` means.

It initializes repository memory, not application code.

## Owns

- Empty-folder init semantics.
- Neutral init expectations.
- Init command product behavior.
- Init-generated command-reference memory.
- Relationship between init, presets, and detected guidance.

## Does Not Own

- Template rendering implementation.
- Config schema implementation.
- Technology detection implementation.
- Legacy adoption implementation.
- Production app generation.

## Public Interface Direction

CLI behavior:

```bash
recall init
recall init --preset <name>
```

`recall init` should be valid in an empty folder and should not require existing app code or a
framework.

## Current Decision

P5 implements repository memory init.

Git initializes source control.

Recall OS initializes repository memory.

P9 adds local command-reference memory so humans and AI agents can discover available Recall OS
workflows after init.

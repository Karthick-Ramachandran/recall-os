# Test Plan: Product Vision Roadmap Alignment

## Manual Review

- Product docs state what Recall OS is.
- Product docs state what Recall OS is not.
- README includes the core promise and simple explanation.
- Roadmap points next toward drift detection, governance, legacy adoption, and organization memory.
- Anti-scope rejects AI agent runtime, IDE competition, app generation, model hosting, and cloud
  execution.
- Root agent files route to product vision, positioning, and roadmap.

## Automated Checks

Run:

```txt
pnpm format:check
node dist/cli.js doctor
git diff --check
```

## Non-Required Checks

No unit, integration, build, or package tests are required because this milestone does not change
runtime behavior.

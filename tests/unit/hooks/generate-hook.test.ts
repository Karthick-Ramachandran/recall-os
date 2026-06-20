import { describe, expect, it } from "vitest";

import {
  HOOKS_PATH_ACTIVATION_COMMAND,
  PRE_COMMIT_HOOK_PATH,
  SESSION_START_HOOK_PATH,
  renderClaudeSettings,
  renderPreCommitHook,
  renderSessionStartHook,
} from "../../../src/core/hooks/generate-hook.js";

describe("renderPreCommitHook", () => {
  it("starts with a POSIX sh shebang", () => {
    expect(renderPreCommitHook([]).startsWith("#!/bin/sh\n")).toBe(true);
  });

  it("runs recall doctor", () => {
    expect(renderPreCommitHook([])).toContain("\nrecall doctor\n");
  });

  it("runs only recall doctor when there are no gates", () => {
    const hook = renderPreCommitHook([]);
    expect(hook).not.toContain("pnpm");
    expect(hook).not.toContain("npm run");
  });

  it("appends each configured gate in order after recall doctor", () => {
    const hook = renderPreCommitHook(["pnpm run test", "pnpm run typecheck"]);
    const doctorIndex = hook.indexOf("recall doctor");
    const testIndex = hook.indexOf("pnpm run test");
    const typecheckIndex = hook.indexOf("pnpm run typecheck");

    expect(doctorIndex).toBeLessThan(testIndex);
    expect(testIndex).toBeLessThan(typecheckIndex);
  });

  it("documents the activation command without running it", () => {
    expect(renderPreCommitHook([])).toContain(HOOKS_PATH_ACTIVATION_COMMAND);
  });

  it("exposes the tracked hook path", () => {
    expect(PRE_COMMIT_HOOK_PATH).toBe(".recall/hooks/pre-commit");
  });

  it("renders a read-only SessionStart hook that emits valid additionalContext JSON", () => {
    const hook = renderSessionStartHook();

    expect(hook.startsWith("#!/bin/sh")).toBe(true);
    expect(hook).toContain("SessionStart");
    expect(hook).toContain("additionalContext");
    // It makes no network calls (read-only, offline).
    expect(hook).not.toMatch(/\bcurl\b|\bwget\b/u);
  });

  it("wires the SessionStart hook in valid Claude settings JSON", () => {
    const settings = JSON.parse(renderClaudeSettings()) as {
      hooks: { SessionStart: { hooks: { command: string }[] }[] };
    };

    expect(settings.hooks.SessionStart[0].hooks[0].command).toBe(`./${SESSION_START_HOOK_PATH}`);
  });
});

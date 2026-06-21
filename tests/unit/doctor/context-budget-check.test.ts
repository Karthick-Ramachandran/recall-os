import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { createDefaultConfig } from "../../../src/core/config/default-config.js";
import { checkContextBudget } from "../../../src/core/doctor/checks/context-budget-check.js";
import { createTempRoot, removeTempRoot } from "../../helpers/init-test-helpers.js";

describe("doctor context-budget check", () => {
  const roots: string[] = [];

  async function createRoot(prefix: string): Promise<string> {
    const rootDir = await createTempRoot(prefix);
    roots.push(rootDir);
    return rootDir;
  }

  afterEach(async () => {
    await Promise.all(roots.splice(0).map((rootDir) => removeTempRoot(rootDir)));
  });

  it("produces no finding for a normal-sized always-loaded set", async () => {
    const rootDir = await createRoot("budget-ok");
    await writeFile(path.join(rootDir, "AGENTS.md"), "# Agents\n\nShort floor.\n", "utf8");
    await writeFile(path.join(rootDir, "CLAUDE.md"), "# Claude\n\n@AGENTS.md\n", "utf8");

    const findings = await checkContextBudget({ rootDir, config: createDefaultConfig() });

    expect(findings).toEqual([]);
  });

  it("warns when the always-loaded files exceed the budget", async () => {
    const rootDir = await createRoot("budget-over");
    await writeFile(path.join(rootDir, "AGENTS.md"), "x".repeat(30 * 1024), "utf8");

    const findings = await checkContextBudget({ rootDir, config: createDefaultConfig() });

    expect(findings).toContainEqual(
      expect.objectContaining({
        severity: "warning",
        check: "context-budget",
        message: expect.stringContaining("budget"),
      }),
    );
  });

  it("counts a Cursor rule toward the budget", async () => {
    const rootDir = await createRoot("budget-cursor");
    const cursorDir = path.join(rootDir, ".cursor/rules");
    await mkdir(cursorDir, { recursive: true });
    await writeFile(path.join(cursorDir, "recall-memory.mdc"), "y".repeat(25 * 1024), "utf8");

    const findings = await checkContextBudget({ rootDir, config: createDefaultConfig() });

    expect(findings.some((finding) => finding.check === "context-budget")).toBe(true);
  });
});

import { afterEach, describe, expect, it } from "vitest";

import { createTempRoot, removeTempRoot, runCommand } from "../helpers/init-test-helpers.js";

describe("preset list command", () => {
  let rootDir: string | undefined;

  afterEach(async () => {
    if (rootDir !== undefined) {
      await removeTempRoot(rootDir);
      rootDir = undefined;
    }
  });

  it("lists built-in presets deterministically", async () => {
    rootDir = await createTempRoot("preset-list");

    const result = await runCommand(rootDir, ["preset", "list"]);

    expect(result.exitCode).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("Recall OS presets");
    expect(result.stdout).toMatch(/- flutter:.*\n.*- generic:.*\n.*- ios-swift:.*\n.*- nextjs:/s);
  });
});

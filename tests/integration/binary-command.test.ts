import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const cliPath = path.join(process.cwd(), "dist", "cli.js");

describe("built recall binary", () => {
  const roots: string[] = [];

  beforeAll(async () => {
    await execFileAsync("pnpm", ["build"], { cwd: process.cwd() });
  }, 30_000);

  afterAll(async () => {
    await Promise.all(roots.map((rootDir) => rm(rootDir, { recursive: true, force: true })));
  });

  async function createRoot(prefix: string): Promise<string> {
    const rootDir = await mkdtemp(path.join(os.tmpdir(), `recall-binary-${prefix}-`));
    roots.push(rootDir);
    return rootDir;
  }

  it("runs help from the built CLI entrypoint", async () => {
    const { stdout } = await execFileAsync(process.execPath, [cliPath, "--help"]);

    expect(stdout).toContain("Usage: recall");
    expect(stdout).toContain("doctor");
  });

  it("initializes an empty folder and runs doctor", async () => {
    const rootDir = await createRoot("init");

    const initResult = await execFileAsync(process.execPath, [cliPath, "init"], {
      cwd: rootDir,
    });
    expect(initResult.stdout).toContain("Recall OS init complete.");

    const doctorResult = await execFileAsync(process.execPath, [cliPath, "doctor"], {
      cwd: rootDir,
    });
    expect(doctorResult.stdout).toContain("Result: PASSED");
  });
});

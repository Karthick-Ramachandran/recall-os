import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  createTempRoot,
  listRelativeFiles,
  readGeneratedFile,
  removeTempRoot,
  runCommand,
  runInitCommand
} from "../helpers/init-test-helpers.js";

describe("ADR create command", () => {
  const roots: string[] = [];

  async function createRoot(prefix: string): Promise<string> {
    const rootDir = await createTempRoot(prefix);
    roots.push(rootDir);
    return rootDir;
  }

  afterEach(async () => {
    await Promise.all(roots.splice(0).map((rootDir) => removeTempRoot(rootDir)));
  });

  it("requires initialized config", async () => {
    const rootDir = await createRoot("adr-config-required");
    const result = await runCommand(rootDir, ["adr", "create", "cache-policy"]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("Run `specforge init` first.");
    expect(await listRelativeFiles(rootDir)).toEqual([]);
  });

  it("creates ADR file with required sections", async () => {
    const rootDir = await createRoot("adr-create");
    await runInitCommand(rootDir);

    const result = await runCommand(rootDir, [
      "adr",
      "create",
      "deterministic-cache-policy"
    ]);

    expect(result.exitCode).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("SpecForge ADR create complete.");
    expect(result.stdout).toContain(
      "ADR: docs/adrs/ADR-0001-deterministic-cache-policy.md"
    );
    expect(
      await readGeneratedFile(
        rootDir,
        "docs/adrs/ADR-0001-deterministic-cache-policy.md"
      )
    ).toContain("# ADR-0001: Deterministic Cache Policy");
  });

  it("increments ADR numbers and ignores malformed files", async () => {
    const rootDir = await createRoot("adr-increment");
    await runInitCommand(rootDir);
    await writeFile(
      path.join(rootDir, "docs/adrs/ADR-0002-existing.md"),
      "",
      "utf8"
    );
    await writeFile(path.join(rootDir, "docs/adrs/ADR-9999.md"), "", "utf8");

    const result = await runCommand(rootDir, ["adr", "create", "file-write-policy"]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("ADR: docs/adrs/ADR-0003-file-write-policy.md");
  });

  it("rejects unsafe ADR titles", async () => {
    const rootDir = await createRoot("adr-unsafe");
    await runInitCommand(rootDir);

    const result = await runCommand(rootDir, ["adr", "create", "../../evil"]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("Name cannot contain path separators.");
    expect(await listRelativeFiles(rootDir)).not.toContain(
      "docs/adrs/ADR-0001-evil.md"
    );
  });

  it("skips existing files by default", async () => {
    const rootDir = await createRoot("adr-skip");
    await runInitCommand(rootDir);
    await runCommand(rootDir, ["adr", "create", "cache-policy"]);

    const adrPath = path.join(rootDir, "docs/adrs/ADR-0001-cache-policy.md");
    await writeFile(adrPath, "custom adr\n", "utf8");

    const result = await runCommand(rootDir, ["adr", "create", "cache-policy"]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Skipped:");
    expect(await readFile(adrPath, "utf8")).toBe("custom adr\n");
  });

  it("dry run writes nothing and reports planned files", async () => {
    const rootDir = await createRoot("adr-dry-run");
    await runInitCommand(rootDir);

    const result = await runCommand(rootDir, [
      "adr",
      "create",
      "cache-policy",
      "--dry-run"
    ]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("SpecForge ADR create dry run complete.");
    expect(result.stdout).toContain("Planned creates:");
    expect(await listRelativeFiles(rootDir)).not.toContain(
      "docs/adrs/ADR-0001-cache-policy.md"
    );
  });

  it("force overwrites explicitly", async () => {
    const rootDir = await createRoot("adr-force");
    await runInitCommand(rootDir);
    await runCommand(rootDir, ["adr", "create", "cache-policy"]);

    const adrPath = path.join(rootDir, "docs/adrs/ADR-0001-cache-policy.md");
    await writeFile(adrPath, "custom adr\n", "utf8");

    const result = await runCommand(rootDir, [
      "adr",
      "create",
      "cache-policy",
      "--force"
    ]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Overwritten:");
    expect(await readFile(adrPath, "utf8")).toContain("# ADR-0001: Cache Policy");
  });

  it("uses configured adrDir", async () => {
    const rootDir = await createRoot("adr-configured-dir");
    await runInitCommand(rootDir);
    const configPath = path.join(rootDir, ".specforge/config.json");
    const config = JSON.parse(await readFile(configPath, "utf8")) as Record<
      string,
      unknown
    >;
    config.adrDir = "memory/adrs";
    await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
    await mkdir(path.join(rootDir, "memory/adrs"), { recursive: true });

    const result = await runCommand(rootDir, ["adr", "create", "cache-policy"]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("ADR: memory/adrs/ADR-0001-cache-policy.md");
    expect(await readGeneratedFile(rootDir, "memory/adrs/ADR-0001-cache-policy.md"))
      .toContain("# ADR-0001: Cache Policy");
  });
});

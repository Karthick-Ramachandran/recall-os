import { readFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  createTempRoot,
  listRelativeFiles,
  removeTempRoot,
  runCommand,
  runInitCommand,
} from "../helpers/init-test-helpers.js";

describe("adr accept command", () => {
  const roots: string[] = [];

  async function createRoot(prefix: string): Promise<string> {
    const rootDir = await createTempRoot(prefix);
    roots.push(rootDir);
    return rootDir;
  }

  afterEach(async () => {
    await Promise.all(roots.splice(0).map((rootDir) => removeTempRoot(rootDir)));
  });

  it("promotes a proposed preset ADR and removes the proposal", async () => {
    const rootDir = await createRoot("adr-accept-promote");
    await runInitCommand(rootDir, ["--preset", "kotlin-android"]);

    const result = await runCommand(rootDir, ["adr", "accept", "kotlin-android-ui-compose"]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Accepted: docs/adrs/ADR-0001-kotlin-android-ui-compose.md");

    const accepted = await readFile(
      path.join(rootDir, "docs/adrs/ADR-0001-kotlin-android-ui-compose.md"),
      "utf8",
    );
    expect(accepted).toContain("# ADR-0001: Use Jetpack Compose");
    expect(accepted).toContain("## Status\n\nAccepted");

    const files = await listRelativeFiles(rootDir);
    expect(files).not.toContain("docs/adrs/proposed/ADR-PROPOSED-kotlin-android-ui-compose.md");
  });

  it("accepts an in-place numbered Proposed ADR", async () => {
    const rootDir = await createRoot("adr-accept-in-place");
    await runInitCommand(rootDir);
    await runCommand(rootDir, ["adr", "create", "use-postgres"]);

    const result = await runCommand(rootDir, ["adr", "accept", "use-postgres"]);

    expect(result.exitCode).toBe(0);
    const adr = await readFile(path.join(rootDir, "docs/adrs/ADR-0001-use-postgres.md"), "utf8");
    expect(adr).toContain("## Status\n\nAccepted");
  });

  it("accepts using the full ADR-####-<slug> filename, not only the bare slug", async () => {
    const rootDir = await createRoot("adr-accept-filename");
    await runInitCommand(rootDir);
    await runCommand(rootDir, ["adr", "create", "use-postgres"]);

    // The review friction: passing the printed filename should work, not just the bare slug.
    const result = await runCommand(rootDir, ["adr", "accept", "ADR-0001-use-postgres.md"]);

    expect(result.exitCode).toBe(0);
    const adr = await readFile(path.join(rootDir, "docs/adrs/ADR-0001-use-postgres.md"), "utf8");
    expect(adr).toContain("## Status\n\nAccepted");
  });

  it("fails clearly when no matching proposal exists", async () => {
    const rootDir = await createRoot("adr-accept-missing");
    await runInitCommand(rootDir);

    const result = await runCommand(rootDir, ["adr", "accept", "nonexistent"]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain('No proposed ADR found for "nonexistent".');
  });

  it("writes nothing on a dry run", async () => {
    const rootDir = await createRoot("adr-accept-dry-run");
    await runInitCommand(rootDir, ["--preset", "kotlin-android"]);

    await runCommand(rootDir, ["adr", "accept", "kotlin-android-ui-compose", "--dry-run"]);

    const files = await listRelativeFiles(rootDir);
    expect(files).toContain("docs/adrs/proposed/ADR-PROPOSED-kotlin-android-ui-compose.md");
    expect(files).not.toContain("docs/adrs/ADR-0001-kotlin-android-ui-compose.md");
  });
});

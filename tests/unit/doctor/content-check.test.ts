import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { createDefaultConfig } from "../../../src/core/config/default-config.js";
import { checkContent } from "../../../src/core/doctor/checks/content-check.js";
import { createTempRoot, removeTempRoot } from "../../helpers/init-test-helpers.js";

describe("doctor content checks", () => {
  const roots: string[] = [];

  async function createRoot(prefix: string): Promise<string> {
    const rootDir = await createTempRoot(prefix);
    roots.push(rootDir);
    return rootDir;
  }

  afterEach(async () => {
    await Promise.all(roots.splice(0).map((rootDir) => removeTempRoot(rootDir)));
  });

  async function writePrd(rootDir: string, purpose: string, inScope: string): Promise<void> {
    const featureDir = path.join(rootDir, "docs/40-features/F-001-example");
    await mkdir(featureDir, { recursive: true });
    await writeFile(
      path.join(featureDir, "PRD.md"),
      `# PRD: Example\n\n## Purpose\n\n${purpose}\n\n## In Scope\n\n${inScope}\n`,
      "utf8",
    );
  }

  it("warns when a feature PRD is still the unfilled template", async () => {
    const rootDir = await createRoot("content-unfilled");
    await writePrd(
      rootDir,
      "Describe why this feature exists and what user or business problem it solves.",
      "- TBD",
    );

    const findings = await checkContent({ rootDir, config: createDefaultConfig() });

    expect(findings).toContainEqual(
      expect.objectContaining({
        severity: "warning",
        check: "content-feature-prd",
        message: "Feature PRD purpose is still an unfilled template.",
      }),
    );
    expect(findings).toContainEqual(
      expect.objectContaining({
        severity: "warning",
        message: "Feature PRD in-scope section is still an unfilled template.",
      }),
    );
  });

  it("produces no findings for a filled PRD", async () => {
    const rootDir = await createRoot("content-filled");
    await writePrd(
      rootDir,
      "This feature adds rate limiting to protect the API from abuse.",
      "- Token-bucket limiter on the public API.",
    );

    const findings = await checkContent({ rootDir, config: createDefaultConfig() });

    expect(findings).toEqual([]);
  });
});

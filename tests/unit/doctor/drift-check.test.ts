import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { createDefaultConfig } from "../../../src/core/config/default-config.js";
import { checkDrift } from "../../../src/core/doctor/checks/drift-check.js";
import { createTempRoot, removeTempRoot } from "../../helpers/init-test-helpers.js";

describe("doctor drift checks", () => {
  const roots: string[] = [];

  async function createRoot(prefix: string): Promise<string> {
    const rootDir = await createTempRoot(prefix);
    roots.push(rootDir);
    return rootDir;
  }

  afterEach(async () => {
    await Promise.all(roots.splice(0).map((rootDir) => removeTempRoot(rootDir)));
  });

  it("reports feature memory referencing a missing ADR as an error", async () => {
    const rootDir = await createRoot("drift-missing-feature-adr");
    await writeFeatureDoc(rootDir, "PRD.md", "Implements ADR-0007 for auth.");

    const findings = await checkDrift({ rootDir, config: createDefaultConfig() });

    expect(findings).toContainEqual(
      expect.objectContaining({
        severity: "error",
        check: "drift-adr-reference",
        message: "Repository memory references ADR-0007 but no matching ADR exists.",
        path: "docs/40-features/F-001-auth-provider/PRD.md",
      }),
    );
  });

  it("reports module memory referencing a missing ADR as an error", async () => {
    const rootDir = await createRoot("drift-missing-module-adr");
    await writeModuleDoc(rootDir, "DECISIONS.md", "Bound by ADR-0009.");

    const findings = await checkDrift({ rootDir, config: createDefaultConfig() });

    expect(findings).toContainEqual(
      expect.objectContaining({
        severity: "error",
        check: "drift-adr-reference",
        message: "Repository memory references ADR-0009 but no matching ADR exists.",
        path: "docs/30-modules/auth/DECISIONS.md",
      }),
    );
  });

  it("reports references to a not-yet-accepted ADR as a warning", async () => {
    const rootDir = await createRoot("drift-proposed-adr");
    await writeAdr(rootDir, "ADR-0002-example.md", "Proposed");
    await writeFeatureDoc(rootDir, "PRD.md", "Follows ADR-0002.");

    const findings = await checkDrift({ rootDir, config: createDefaultConfig() });

    expect(findings).toContainEqual(
      expect.objectContaining({
        severity: "warning",
        check: "drift-proposed-reference",
        message: "Repository memory references ADR-0002 which is not accepted.",
        path: "docs/40-features/F-001-auth-provider/PRD.md",
      }),
    );
  });

  it("produces no finding when referencing an existing accepted ADR", async () => {
    const rootDir = await createRoot("drift-accepted-adr");
    await writeAdr(rootDir, "ADR-0001-example.md", "Accepted");
    await writeFeatureDoc(rootDir, "PRD.md", "Follows ADR-0001.");

    const findings = await checkDrift({ rootDir, config: createDefaultConfig() });

    expect(findings).toEqual([]);
  });

  it("reports a repeated reference within one document only once", async () => {
    const rootDir = await createRoot("drift-repeated-reference");
    await writeFeatureDoc(rootDir, "PRD.md", "ADR-0007 here. Again ADR-0007 there. And ADR-0007.");

    const findings = await checkDrift({ rootDir, config: createDefaultConfig() });

    const dangling = findings.filter((finding) => finding.check === "drift-adr-reference");
    expect(dangling).toHaveLength(1);
  });

  it("ignores ADR identifiers inside fenced code blocks and inline code", async () => {
    const rootDir = await createRoot("drift-code-block");
    await writeFeatureDoc(
      rootDir,
      "ACCEPTANCE.md",
      "Example only: `ADR-0007`.\n\n```\nreferences ADR-0008 here\n```\n",
    );

    const findings = await checkDrift({ rootDir, config: createDefaultConfig() });

    expect(findings).toEqual([]);
  });

  it("produces no findings when memory references no ADRs", async () => {
    const rootDir = await createRoot("drift-no-references");
    await writeFeatureDoc(rootDir, "PRD.md", "No decision references here.");

    const findings = await checkDrift({ rootDir, config: createDefaultConfig() });

    expect(findings).toEqual([]);
  });
});

async function writeFeatureDoc(rootDir: string, fileName: string, body: string): Promise<void> {
  const featureDir = path.join(rootDir, "docs/40-features/F-001-auth-provider");
  await mkdir(featureDir, { recursive: true });
  await writeFile(path.join(featureDir, fileName), `# Feature\n\n${body}\n`, "utf8");
}

async function writeModuleDoc(rootDir: string, fileName: string, body: string): Promise<void> {
  const moduleDir = path.join(rootDir, "docs/30-modules/auth");
  await mkdir(moduleDir, { recursive: true });
  await writeFile(path.join(moduleDir, fileName), `# Module\n\n${body}\n`, "utf8");
}

async function writeAdr(rootDir: string, fileName: string, status: string): Promise<void> {
  const adrDir = path.join(rootDir, "docs/adrs");
  await mkdir(adrDir, { recursive: true });
  await writeFile(
    path.join(adrDir, fileName),
    `# ADR: Example

## Status

${status}

## Consequences

Example consequence.
`,
    "utf8",
  );
}

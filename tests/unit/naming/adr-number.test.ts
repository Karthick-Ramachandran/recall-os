import { randomUUID } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  formatAdrNumber,
  getAdrFileForSlug,
  getNextAdrNumber,
  parseAdrNumber
} from "../../../src/core/naming/adr-number.js";

describe("ADR number", () => {
  const roots: string[] = [];

  async function createRoot(): Promise<string> {
    const rootDir = path.join(tmpdir(), `specforge-adr-number-${randomUUID()}`);
    roots.push(rootDir);
    await mkdir(rootDir, { recursive: true });
    return rootDir;
  }

  async function touch(filePath: string): Promise<void> {
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, "", "utf8");
  }

  afterEach(async () => {
    await Promise.all(
      roots.splice(0).map((rootDir) => rm(rootDir, { recursive: true, force: true }))
    );
  });

  it("starts at ADR-0001 when no ADR directory exists", async () => {
    const rootDir = await createRoot();
    const adrNumber = await getNextAdrNumber(path.join(rootDir, "docs/adrs"));

    expect(adrNumber).toEqual({
      number: 1,
      id: "ADR-0001"
    });
  });

  it("increments from the highest valid existing ADR file", async () => {
    const rootDir = await createRoot();
    const adrDir = path.join(rootDir, "docs/adrs");
    await touch(path.join(adrDir, "ADR-0001-renderer.md"));
    await touch(path.join(adrDir, "ADR-0007-cache-policy.md"));
    await touch(path.join(adrDir, "ADR-0003-cli-parser.md"));

    expect(await getNextAdrNumber(adrDir)).toEqual({
      number: 8,
      id: "ADR-0008"
    });
  });

  it("ignores malformed ADR files", async () => {
    const rootDir = await createRoot();
    const adrDir = path.join(rootDir, "docs/adrs");
    await touch(path.join(adrDir, "ADR-0001-renderer.md"));
    await touch(path.join(adrDir, "ADR-9999.md"));
    await touch(path.join(adrDir, "ADR-abc-bad.md"));
    await touch(path.join(adrDir, "ADR-0010-Bad-Case.md"));
    await touch(path.join(adrDir, "ADR-0002-no-md.txt"));

    expect(await getNextAdrNumber(adrDir)).toEqual({
      number: 2,
      id: "ADR-0002"
    });
  });

  it("reuses an existing ADR file for the same slug", async () => {
    const rootDir = await createRoot();
    const adrDir = path.join(rootDir, "docs/adrs");
    await touch(path.join(adrDir, "ADR-0001-renderer.md"));
    await touch(path.join(adrDir, "ADR-0007-cache-policy.md"));

    expect(await getAdrFileForSlug(adrDir, "renderer")).toEqual({
      number: 1,
      id: "ADR-0001",
      slug: "renderer",
      fileName: "ADR-0001-renderer.md"
    });
  });

  it("allocates the next ADR file for a new slug", async () => {
    const rootDir = await createRoot();
    const adrDir = path.join(rootDir, "docs/adrs");
    await touch(path.join(adrDir, "ADR-0001-renderer.md"));
    await touch(path.join(adrDir, "ADR-0007-cache-policy.md"));

    expect(await getAdrFileForSlug(adrDir, "file-write-policy")).toEqual({
      number: 8,
      id: "ADR-0008",
      slug: "file-write-policy",
      fileName: "ADR-0008-file-write-policy.md"
    });
  });

  it("parses and formats valid ADR numbers", () => {
    expect(parseAdrNumber("ADR-0001-renderer.md")).toBe(1);
    expect(parseAdrNumber("ADR-10000-large-number.md")).toBe(10000);
    expect(parseAdrNumber("not-an-adr.md")).toBeNull();
    expect(formatAdrNumber(12)).toBe("ADR-0012");
    expect(formatAdrNumber(10000)).toBe("ADR-10000");
  });
});

import { describe, expect, it } from "vitest";

import { generateAdrFile } from "../../../src/core/generator/generate-adr.js";
import { SlugifyError } from "../../../src/core/naming/slugify.js";

describe("generateAdrFile", () => {
  it("generates a proposed ADR with a deterministic path", () => {
    const files = generateAdrFile({
      adrDir: "docs/adrs",
      adrId: "ADR-0002",
      title: "Deterministic Cache Policy"
    });

    expect(files.map((file) => file.path)).toEqual([
      "docs/adrs/ADR-0002-deterministic-cache-policy.md"
    ]);
  });

  it("creates required ADR sections", () => {
    const files = generateAdrFile({
      adrDir: "docs/adrs",
      adrId: "ADR-0003",
      title: "file-write-policy"
    });
    const content = files[0]?.content ?? "";

    expect(content).toContain("# ADR-0003: File Write Policy");
    expect(content).toContain("## Status\n\nProposed");
    expect(content).toContain("## Context");
    expect(content).toContain("## Decision");
    expect(content).toContain("## Alternatives Considered");
    expect(content).toContain("## Consequences");
    expect(content).toContain("## Related Documents");
  });

  it("rejects unsafe ADR titles", () => {
    expect(() =>
      generateAdrFile({
        adrDir: "docs/adrs",
        adrId: "ADR-0001",
        title: "../../evil"
      })
    ).toThrow(SlugifyError);
  });
});

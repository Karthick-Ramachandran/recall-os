import { afterEach, describe, expect, it } from "vitest";

import {
  createTempRoot,
  listRelativeFiles,
  readGeneratedFile,
  readGeneratedJson,
  removeTempRoot,
  runInitCommand,
} from "../helpers/init-test-helpers.js";
import type { PersistConfig } from "../../src/core/config/config-schema.js";

const VARIANTS = [
  {
    preset: "laravel-react",
    guidancePath: "docs/ai/presets/laravel-react-guidance.md",
    guidanceMarker: "Inertia 2 + React 19",
    frameworkAdr: "docs/adrs/proposed/ADR-PROPOSED-laravel-react-framework.md",
    frontendAdr: "docs/adrs/proposed/ADR-PROPOSED-laravel-react-frontend-inertia-react.md",
  },
  {
    preset: "laravel-vue",
    guidancePath: "docs/ai/presets/laravel-vue-guidance.md",
    guidanceMarker: "Inertia 2 + Vue 3",
    frameworkAdr: "docs/adrs/proposed/ADR-PROPOSED-laravel-vue-framework.md",
    frontendAdr: "docs/adrs/proposed/ADR-PROPOSED-laravel-vue-frontend-inertia-vue.md",
  },
  {
    preset: "laravel-api",
    guidancePath: "docs/ai/presets/laravel-api-guidance.md",
    guidanceMarker: "HTTP JSON API",
    frameworkAdr: "docs/adrs/proposed/ADR-PROPOSED-laravel-api-framework.md",
    frontendAdr: "docs/adrs/proposed/ADR-PROPOSED-laravel-api-api-design-rest.md",
  },
] as const;

describe("laravel init golden output", () => {
  let rootDir: string | undefined;

  afterEach(async () => {
    if (rootDir !== undefined) {
      await removeTempRoot(rootDir);
      rootDir = undefined;
    }
  });

  for (const variant of VARIANTS) {
    it(`generates deterministic ${variant.preset} guidance and proposed decisions`, async () => {
      rootDir = await createTempRoot(`golden-${variant.preset}`);
      const result = await runInitCommand(rootDir, ["--preset", variant.preset]);

      expect(result.exitCode).toBe(0);

      const files = await listRelativeFiles(rootDir);
      expect(files).toContain(variant.frameworkAdr);
      expect(files).toContain(variant.frontendAdr);

      const config = await readGeneratedJson<PersistConfig>(rootDir, ".persist/config.json");
      expect(config.preset).toBe(variant.preset);

      const guidance = await readGeneratedFile(rootDir, variant.guidancePath);
      expect(guidance).toContain(variant.guidanceMarker);
      expect(guidance).toContain("Laravel Sanctum");
      expect(guidance).toContain("Pest");

      const framework = await readGeneratedFile(rootDir, variant.frameworkAdr);
      expect(framework).toContain("## Status\n\nProposed");
      // Regression: proposed ADRs must carry every section Doctor requires on acceptance.
      expect(framework).toContain("## Related Documents");
    });
  }
});

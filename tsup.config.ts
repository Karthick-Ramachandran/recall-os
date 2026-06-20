import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    cli: "src/cli.ts",
    index: "src/index.ts",
  },
  format: ["esm"],
  clean: true,
  dts: true,
  sourcemap: true,
  target: "node20",
  splitting: false,
});

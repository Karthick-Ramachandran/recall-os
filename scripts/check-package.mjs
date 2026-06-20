#!/usr/bin/env node
import { execFileSync } from "node:child_process";

const output = execFileSync("npm", ["pack", "--dry-run", "--json"], {
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"],
});

const [packResult] = JSON.parse(output);
const files = packResult.files.map((file) => file.path).sort();
const fileSet = new Set(files);

const requiredFiles = [
  "LICENSE",
  "README.md",
  "dist/cli.js",
  "dist/index.js",
  "examples/generated-generic/README.md",
  "examples/generated-nextjs/README.md",
  "examples/generated-ios-swift/README.md",
  "examples/generated-flutter/README.md",
  "examples/generated-laravel-react/README.md",
  "examples/generated-laravel-vue/README.md",
  "examples/generated-laravel-api/README.md",
  "package.json",
];

const blockedPrefixes = [
  ".github/",
  ".recall/",
  ".agents/",
  ".claude/",
  "coverage/",
  "docs/",
  "node_modules/",
  "src/",
  "tests/",
];

const missing = requiredFiles.filter((file) => !fileSet.has(file));
const blocked = files.filter((file) => blockedPrefixes.some((prefix) => file.startsWith(prefix)));

if (missing.length > 0 || blocked.length > 0) {
  if (missing.length > 0) {
    console.error("Package dry-run is missing required files:");
    for (const file of missing) {
      console.error(`- ${file}`);
    }
  }

  if (blocked.length > 0) {
    console.error("Package dry-run includes blocked files:");
    for (const file of blocked) {
      console.error(`- ${file}`);
    }
  }

  process.exit(1);
}

console.log(`Package dry-run validated ${files.length} files.`);

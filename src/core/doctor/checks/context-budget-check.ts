import { readFile } from "node:fs/promises";
import path from "node:path";

import type { DoctorCheckContext, DoctorFinding } from "../doctor-check.js";

// Files an AI tool loads into context every session (auto-loaded, not on-demand). Whichever exist for
// the repo's selected tools count toward the budget.
const ALWAYS_LOADED = ["CLAUDE.md", "AGENTS.md", ".cursor/rules/recall-memory.mdc"];

// Generous ceiling: a fresh repo's always-loaded set is a few KB, so real repos never trip this; it
// only fires when the per-session memory has bloated, which buries the signal and wastes the budget.
const BUDGET_BYTES = 24 * 1024;

/**
 * Deterministic, local, read-only context-budget check. Memory only helps if it stays an index the
 * agent reads on demand, not a wall of text loaded every session. This warns when the always-loaded
 * agent files grow past a budget, so the memory stays a map, not a dump.
 */
export async function checkContextBudget(context: DoctorCheckContext): Promise<DoctorFinding[]> {
  if (context.config === undefined) {
    return [];
  }

  let total = 0;
  for (const relativePath of ALWAYS_LOADED) {
    const content = await readFileIfExists(context.rootDir, relativePath);
    if (content !== undefined) {
      total += Buffer.byteLength(content, "utf8");
    }
  }

  if (total <= BUDGET_BYTES) {
    return [];
  }

  return [
    {
      severity: "warning",
      check: "context-budget",
      message: `The always-loaded agent files total ${formatKb(total)} (over the ${formatKb(
        BUDGET_BYTES,
      )} budget) — trim them or move detail into on-demand docs so every session stays lean.`,
    },
  ];
}

function formatKb(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function readFileIfExists(
  rootDir: string,
  relativePath: string,
): Promise<string | undefined> {
  try {
    return await readFile(path.join(rootDir, relativePath), "utf8");
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === "ENOENT") {
      return undefined;
    }
    throw error;
  }
}

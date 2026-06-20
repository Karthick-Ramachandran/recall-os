import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import type { DoctorCheckContext, DoctorFinding } from "../doctor-check.js";

const adrFilePattern = /^ADR-(\d{4,})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/iu;
const adrReferencePattern = /ADR-\d{4,}/giu;

type KnownAdr = {
  id: string;
  accepted: boolean;
};

/**
 * Deterministic, local, read-only drift check.
 *
 * Detects repository memory that references ADR identifiers which either do not exist
 * (dangling decision references) or are not yet accepted (reliance on a proposed decision).
 */
export async function checkDrift(context: DoctorCheckContext): Promise<DoctorFinding[]> {
  if (context.config === undefined) {
    return [];
  }

  const knownAdrs = await loadKnownAdrs(context.rootDir, context.config.adrDir);

  const findings: DoctorFinding[] = [];
  findings.push(...(await checkReferences(context.rootDir, context.config.featuresDir, knownAdrs)));
  findings.push(...(await checkReferences(context.rootDir, context.config.modulesDir, knownAdrs)));

  return findings;
}

async function loadKnownAdrs(rootDir: string, adrDir: string): Promise<Map<string, KnownAdr>> {
  const known = new Map<string, KnownAdr>();
  const files = await readMarkdownFiles(rootDir, adrDir);

  for (const file of files) {
    const match = adrFilePattern.exec(path.basename(file));
    if (match === null) {
      continue;
    }

    const id = `ADR-${match[1]}`;
    const content = await readFile(path.join(rootDir, file), "utf8");
    const accepted = sectionContains(content, "Status", /\baccepted\b/iu);

    // First accepted declaration wins; otherwise keep the existing record.
    const existing = known.get(id);
    if (existing === undefined || (!existing.accepted && accepted)) {
      known.set(id, { id, accepted });
    }
  }

  return known;
}

async function checkReferences(
  rootDir: string,
  referenceDir: string,
  knownAdrs: Map<string, KnownAdr>,
): Promise<DoctorFinding[]> {
  const findings: DoctorFinding[] = [];
  const files = await readMarkdownFiles(rootDir, referenceDir);

  for (const file of files) {
    const content = await readFile(path.join(rootDir, file), "utf8");
    const referenced = new Set<string>();

    // Ignore ADR identifiers inside fenced code blocks and inline code so illustrative
    // examples are not treated as real references.
    for (const match of stripCode(content).matchAll(adrReferencePattern)) {
      referenced.add(match[0].toUpperCase());
    }

    for (const id of referenced) {
      const known = knownAdrs.get(id);

      if (known === undefined) {
        findings.push({
          severity: "error",
          check: "drift-adr-reference",
          message: `Repository memory references ${id} but no matching ADR exists.`,
          path: file,
        });
        continue;
      }

      if (!known.accepted) {
        findings.push({
          severity: "warning",
          check: "drift-proposed-reference",
          message: `Repository memory references ${id} which is not accepted.`,
          path: file,
        });
      }
    }
  }

  return findings;
}

function stripCode(content: string): string {
  return content
    .replace(/```[\s\S]*?```/gu, " ")
    .replace(/~~~[\s\S]*?~~~/gu, " ")
    .replace(/`[^`]*`/gu, " ");
}

async function readMarkdownFiles(rootDir: string, relativeDir: string): Promise<string[]> {
  const entries = await readDirIfExists(rootDir, relativeDir);
  const files: string[] = [];

  for (const entry of entries) {
    const childRelative = path.posix.join(relativeDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await readMarkdownFiles(rootDir, childRelative)));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      files.push(childRelative);
    }
  }

  return files;
}

function sectionContains(content: string, heading: string, pattern: RegExp): boolean {
  const section = getSection(content, heading);
  return section !== undefined && pattern.test(section);
}

function getSection(content: string, heading: string): string | undefined {
  const lines = content.split(/\r?\n/u);
  const normalizedHeading = `## ${heading.toLowerCase()}`;
  const startIndex = lines.findIndex((line) => line.trim().toLowerCase() === normalizedHeading);

  if (startIndex === -1) {
    return undefined;
  }

  const body: string[] = [];

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    if (/^##\s+/u.test(lines[index])) {
      break;
    }

    body.push(lines[index]);
  }

  return body.join("\n").trim();
}

async function readDirIfExists(rootDir: string, relativePath: string) {
  try {
    return await readdir(path.join(rootDir, relativePath), { withFileTypes: true });
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

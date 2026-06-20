import { readdir } from "node:fs/promises";

const ADR_FILE_PATTERN = /^ADR-(\d{4,})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/u;

export type AdrNumber = {
  number: number;
  id: string;
};

export type AdrFile = AdrNumber & {
  slug: string;
  fileName: string;
};

export async function getNextAdrNumber(adrDirAbsolutePath: string): Promise<AdrNumber> {
  const existingFiles = await readExistingAdrFiles(adrDirAbsolutePath);
  return getNextAdrNumberFromFiles(existingFiles);
}

export async function getAdrFileForSlug(
  adrDirAbsolutePath: string,
  slug: string
): Promise<AdrFile> {
  const existingFiles = await readExistingAdrFiles(adrDirAbsolutePath);
  const existingFile = existingFiles
    .filter((file) => file.slug === slug)
    .sort((left, right) => left.number - right.number)[0];

  if (existingFile !== undefined) {
    return existingFile;
  }

  const nextAdrNumber = getNextAdrNumberFromFiles(existingFiles);

  return {
    ...nextAdrNumber,
    slug,
    fileName: `${nextAdrNumber.id}-${slug}.md`
  };
}

function getNextAdrNumberFromFiles(existingFiles: AdrFile[]): AdrNumber {
  const existingNumbers = existingFiles.map((file) => file.number);
  const highestNumber =
    existingNumbers.length === 0 ? 0 : Math.max(...existingNumbers);
  const nextNumber = highestNumber + 1;

  return {
    number: nextNumber,
    id: formatAdrNumber(nextNumber)
  };
}

export function formatAdrNumber(adrNumber: number): string {
  if (!Number.isInteger(adrNumber) || adrNumber < 1) {
    throw new Error("ADR number must be a positive integer.");
  }

  return `ADR-${String(adrNumber).padStart(4, "0")}`;
}

export function parseAdrNumber(fileName: string): number | null {
  const match = ADR_FILE_PATTERN.exec(fileName);

  if (match === null) {
    return null;
  }

  return Number.parseInt(match[1] ?? "", 10);
}

async function readExistingAdrFiles(adrDirAbsolutePath: string): Promise<AdrFile[]> {
  let entries;

  try {
    entries = await readdir(adrDirAbsolutePath, { withFileTypes: true });
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === "ENOENT") {
      return [];
    }

    throw error;
  }

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => parseAdrFile(entry.name))
    .filter((adrFile): adrFile is AdrFile => adrFile !== null);
}

function parseAdrFile(fileName: string): AdrFile | null {
  const match = ADR_FILE_PATTERN.exec(fileName);

  if (match === null) {
    return null;
  }

  const number = Number.parseInt(match[1] ?? "", 10);
  const id = formatAdrNumber(number);
  const slug = match[2] ?? "";

  return {
    number,
    id,
    slug,
    fileName
  };
}

import { readFile } from "node:fs/promises";
import { resolveSafePath } from "../filesystem/safe-path.js";
import { parseConfig, type RecallConfig } from "./config-schema.js";

export const CONFIG_PATH = ".recall/config.json";

export class ConfigLoadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigLoadError";
  }
}

export async function loadConfig(rootDir: string): Promise<RecallConfig> {
  const configPath = resolveSafePath(rootDir, CONFIG_PATH);

  let rawConfig: string;
  try {
    rawConfig = await readFile(configPath.absolutePath, "utf8");
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === "ENOENT") {
      throw new ConfigLoadError(`Recall OS config not found at ${CONFIG_PATH}.`);
    }
    throw error;
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawConfig);
  } catch {
    throw new ConfigLoadError(`Recall OS config at ${CONFIG_PATH} is not valid JSON.`);
  }

  return parseConfig(parsedJson);
}

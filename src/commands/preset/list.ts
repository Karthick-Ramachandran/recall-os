import { listPresets } from "../../core/presets/preset-registry.js";

export type PresetListEntry = {
  id: string;
  name: string;
  description: string;
};

export type PresetListResult = {
  presets: PresetListEntry[];
};

export function listPresetEntries(): PresetListResult {
  return {
    presets: listPresets()
      .map((preset) => ({
        id: preset.id,
        name: preset.name,
        description: preset.description,
      }))
      .sort((left, right) => left.id.localeCompare(right.id)),
  };
}

export function formatPresetListResult(result: PresetListResult): string {
  const lines = ["Persist OS presets", ""];

  for (const preset of result.presets) {
    lines.push(`- ${preset.id}: ${preset.name}`);
    lines.push(`  ${preset.description}`);
  }

  return `${lines.join("\n")}\n`;
}

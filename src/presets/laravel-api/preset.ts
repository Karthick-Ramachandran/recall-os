import type { Preset } from "../../core/presets/preset-schema.js";
import {
  laravelGuidance,
  laravelGuidanceItems,
  laravelProposedDecisions,
} from "../laravel/shared.js";

export const laravelApiPreset: Preset = {
  id: "laravel-api",
  name: "Laravel API",
  description: "Opinionated Laravel API-only opinion pack with proposed decisions only.",
  templates: [
    {
      destination: "docs/ai/presets/laravel-api-guidance.md",
      description: "Laravel API-only guidance that remains proposed until accepted.",
      content: laravelGuidance("api"),
    },
  ],
  guidance: laravelGuidanceItems(),
  proposedDecisions: laravelProposedDecisions("api"),
};

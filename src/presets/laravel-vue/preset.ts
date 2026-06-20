import type { Preset } from "../../core/presets/preset-schema.js";
import {
  laravelGuidance,
  laravelGuidanceItems,
  laravelProposedDecisions,
} from "../laravel/shared.js";

export const laravelVuePreset: Preset = {
  id: "laravel-vue",
  name: "Laravel + Vue",
  description: "Opinionated Laravel + Inertia + Vue opinion pack with proposed decisions only.",
  templates: [
    {
      destination: "docs/ai/presets/laravel-vue-guidance.md",
      description: "Laravel + Vue (Inertia) guidance that remains proposed until accepted.",
      content: laravelGuidance("vue"),
    },
  ],
  guidance: laravelGuidanceItems(),
  proposedDecisions: laravelProposedDecisions("vue"),
};

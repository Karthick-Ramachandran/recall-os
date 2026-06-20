import type { Preset } from "../../core/presets/preset-schema.js";
import {
  laravelGuidance,
  laravelGuidanceItems,
  laravelProposedDecisions,
} from "../laravel/shared.js";

export const laravelReactPreset: Preset = {
  id: "laravel-react",
  name: "Laravel + React",
  description: "Opinionated Laravel + Inertia + React opinion pack with proposed decisions only.",
  templates: [
    {
      destination: "docs/ai/presets/laravel-react-guidance.md",
      description: "Laravel + React (Inertia) guidance that remains proposed until accepted.",
      content: laravelGuidance("react"),
    },
  ],
  guidance: laravelGuidanceItems(),
  proposedDecisions: laravelProposedDecisions("react"),
};

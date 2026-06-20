import path from "node:path";

import type { WriteFileInput } from "../filesystem/write-plan.js";
import { slugify } from "../naming/slugify.js";
import { createTemplateContext } from "./template-context.js";
import { renderTemplate } from "./render-template.js";

export type GenerateAdrFileOptions = {
  adrDir: string;
  adrId: string;
  title: string;
};

const adrTemplate = `# {{adrId}}: {{title}}

## Status

Proposed

## Context

What decision needs to be made, and why now?

## Decision

What option is proposed?

## Alternatives Considered

What other options were considered?

## Consequences

What improves, what worsens, and what risks remain?

## Related Documents

- PRD:
- Architecture:
- Security:
- Feature:
`;

export function generateAdrFile(options: GenerateAdrFileOptions): WriteFileInput[] {
  const slug = slugify(options.title);
  const title = titleizeAdrTitle(options.title);
  const context = createTemplateContext({
    adrId: options.adrId,
    slug,
    title,
  });

  return [
    {
      path: path.posix.join(options.adrDir, `${options.adrId}-${slug}.md`),
      content: renderTemplate(adrTemplate, context),
    },
  ];
}

function titleizeAdrTitle(title: string): string {
  return title
    .trim()
    .replace(/[-_]+/gu, " ")
    .replace(/\s+/gu, " ")
    .replace(/\b\w/gu, (character) => character.toUpperCase());
}

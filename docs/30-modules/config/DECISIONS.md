# Config Decisions

## P2: Boring Manifest First

P2 config includes only the fields needed by near-term commands:

- version.
- template version.
- preset.
- memory profile.
- AI tools.
- docs paths.
- write policy.

## P2: No Decision Index Yet

P2 does not include decision indexes.

Accepted decisions, proposed decisions, and organization standards remain in docs until later work
defines a stronger indexing model.

## P2: Safe Writes

Config writes must use the existing safe write planning and execution path.

## P10: Recall Config Path

P10 uses `.recall/config.json` as the only supported config path.

No compatibility shim is added for the pre-public config path.

# Package Release Decisions

## P10: Publish-Ready Without Publishing

P10 makes Persist OS package-ready and CI-verified.

It does not publish to npm, create tags, push to GitHub, or require npm credentials.

## P10: Package Name And Binary

The npm package name is `persist-os`.

The CLI binary is `persist`.

## P10: Clean Pre-Public Rename

The project is renamed from SpecForge to Persist OS before public release.

No backward compatibility shim is added for the previous `.specforge` config path or `specforge`
command.

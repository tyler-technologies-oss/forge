# Forge Schematics

A collection of Angular Schematics for working with `@tylertech/forge` and Web Components in general:

- The [custom-elements](./src/custom-elements) schematic generates Angular components that act as proxies to native web components, but eliminate the need to use `CUSTOM_ELEMENTS_SCHEMA`, restoring type-safety and IntelliSense to your Angular templates.

## Development

See [CLAUDE.md](./CLAUDE.md) for architecture notes.

To build and test locally from the monorepo root:

```sh
pnpm run --filter @tylertech/forge-schematics build
pnpm run --filter @tylertech/forge-schematics test
```

To try the schematic against a real manifest, build first, then run it via the Schematics CLI:

```sh
npm install -g @angular-devkit/schematics-cli
schematics ./dist/collection.json:custom-elements --manifest="..." --dry-run=false
```

Omit `--dry-run=false` to perform a dry run and only report which files would be created or modified.

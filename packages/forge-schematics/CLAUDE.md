# Forge Schematics

Angular Schematics for generating typed proxy components/modules from a [custom-elements-manifest](https://github.com/webcomponents/custom-elements-manifest).

## Purpose

Angular can't type-check `forge-*` custom elements referenced through `CUSTOM_ELEMENTS_SCHEMA`. This package's
`custom-elements` schematic reads a `custom-elements.json` manifest and generates one typed `Component` +
`NgModule` proxy pair per custom element, registering `define<X>Component()`/`customElements.define()` in the
constructor. `packages/forge-angular` is the primary consumer: its
`pnpm run --filter @tylertech/forge-angular generate-proxies` script invokes this schematic (configured via
`packages/forge-angular/generate-proxies.json`) against `@tylertech/forge`'s own `custom-elements.json` to
(re)generate all of `packages/forge-angular/src/lib/<component>/`.

## Architecture

- `src/collection.json` — the schematics collection manifest; declares the single `custom-elements` schematic,
  pointing at `./custom-elements/index#customElements` (factory) and `./custom-elements/schema.json` (CLI/prompt
  schema).
- `src/custom-elements/index.ts` — the schematic `Rule` factory. Reads a manifest (`--manifest` or `--config`),
  filters declarations down to tagged custom elements (`utils.ts`'s `isCustomElement`, accounting for
  inheritance), and applies two EJS template trees (`files/component`, `files/module`) per element via
  `@angular-devkit/schematics`' `apply`/`template`/`mergeWith`.
- `src/custom-elements/files/**` — EJS-style template files (`.ts` extension, NOT valid/compilable TypeScript —
  contain `<% %>` directives). Excluded from `tsconfig.json` (`exclude: ["src/*/files/**/*"]`) and from ESLint.
  Copied into `dist/` as-is by the build's asset-copy step (see Build below) since these are read as raw
  templates at runtime, not imported as modules.
- `src/custom-elements/schema.json` — JSON schema describing the schematic's CLI options/prompts
  (`manifest`, `importPath`, `outDir`, `outDirExcludePrefix`, `exclude`, `modulePrefix`, `useDefineFunction`,
  `componentDependencies`, or a `config` file path as a shorthand for all of the above).
- `src/custom-elements/options.interface.ts` / `utils.ts` — supporting types and pure helper functions
  (`getOutDir`, `toBaseName`, `moduleExists`, `toJsDocBlock`, `isCustomElement`).

## Known wart (carried over, not fixed during migration)

`index.ts` calls `url('./files/module ')` with a trailing space in the path string — a pre-existing typo from
the original standalone repo. It's tolerant in practice (existing tests pass), so it was carried over unchanged
during the monorepo migration rather than silently "fixed" as a drive-by change. If touching this schematic for
other reasons, consider cleaning this up in its own PR.

## Build

`pnpm run --filter @tylertech/forge-schematics build` runs `tsc -p tsconfig.build.json` to compile
`src/**/*.ts` (excluding `files/**/*` and `*.test.ts`) into `dist/`, then runs `scripts/copy-assets.mjs` to copy
`src/collection.json`, `src/custom-elements/schema.json`, and `src/custom-elements/files/**` into their
equivalent paths under `dist/` — plain `tsc` never touches non-TS/non-JSON-module assets, and the schematic's
`factory`/`schema`/`url()` references are resolved relative to `collection.json`'s own location at runtime, so
the published `"schematics": "./dist/collection.json"` entry point requires these files to physically exist
alongside the compiled JS in `dist/`.

## Testing

Uses Vitest in **Node environment** (no `browser` block in `vitest.config.ts`) — the first package in this
monorepo to do so. Every other package (`forge`, `forge-core`, `forge-react`, `forge-angular`) tests in real
Chromium via Vitest browser mode because they exercise DOM/custom-element behavior. This package is different:
its tests use `SchematicTestRunner` (from `@angular-devkit/schematics/testing`) to run the schematic `Rule`
against an in-memory `Tree`, plus real Node `fs.readFileSync`/`path.join(__dirname, ...)` to load fixture JSON
files (`test-manifest.json`, `test-config.json`). None of this needs, or would benefit from, a browser.

Unlike every other package, `test` runs `pnpm run build` first (`"test": "pnpm run build && vitest run"`).
`SchematicTestRunner` resolves the schematic's `factory` string (`./custom-elements/index#customElements`) via
Node's `require()` under the hood — it cannot load TypeScript source directly, even though Vitest itself could
transpile it on the fly. The test file points `SchematicTestRunner` at `dist/collection.json`, so a build must
exist and be current before running tests. This mirrors the original standalone repo's own `test` script
(`npm run build && jasmine ...`) — it's a hard constraint of how the Angular schematics tooling resolves
factories, not an artifact of the old toolchain.

## Commands

```bash
pnpm run --filter @tylertech/forge-schematics build   # tsc + asset-copy to dist/
pnpm run --filter @tylertech/forge-schematics test     # Vitest (Node environment)
```

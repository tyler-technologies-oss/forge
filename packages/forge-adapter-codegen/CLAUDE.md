# Forge Adapter Codegen

Shared, build-time generation of framework adapters from a web component package's
`custom-elements.json`.

## Purpose

`private: true` **intentionally** — this is a build-time tool for this monorepo, never published.
It exists so the React and Angular adapter generators are not duplicated per adapter package, and so
hand-maintained adapters have a path to adopt generation.

Consumed by `packages/forge-rich-text-editor-react` and
`packages/forge-rich-text-editor-angular`, each of whose `scripts/generate-proxies.mjs` is config
only.

**`README.md` in this directory is the reference** — it documents the entry points, the config
shape, the manifest corrections and the output-verification traps in detail. Read it before changing
anything here.

## Architecture

Plain `.mjs` ESM, no TypeScript and **no build step** — consumers import the source directly through
the package's export subpaths.

- `src/core/` — framework-agnostic: `manifest.mjs` (loading), `entry-points.mjs` (mapping manifest
  module paths to export subpaths, longest prefix wins), `normalize.mjs` (the manifest corrections).
- `src/react/` — `generateReactAdapter`, wrapping `custom-element-react-wrappers`.
- `src/angular/` — `generateAngularAdapter`, wrapping `@tylertech/forge-schematics`'
  `custom-elements` schematic, once per entry point.

## The manifest is corrected before either generator reads it

Both corrections compensate for the **manifest**, not for a framework, and both **fail the build**
rather than emitting bad output:

- **Attributes with no `fieldName`** — an attribute documented with a manual `@attribute` JSDoc tag
  has no link back to its class field, and generators naming props from `fieldName` emit a prop
  literally named `undefined`. Fields are recovered by normalized-name matching, which is necessary
  because the two do not always differ by dashes alone (`forge-rich-text-context` maps the
  `readonly` attribute to a `readOnly` property). `@tylertech/forge`'s own manifest has several
  hundred such attributes.
- **Double-wrapped event types** — `@event {CustomEvent<Detail>}` gets wrapped in `CustomEvent<...>`
  again, and the React generator skips importing any type containing `<`, leaving the detail type
  referenced but never imported.

## Commands

```bash
pnpm run --filter @tylertech/forge-adapter-codegen lint
```

No build and no test script. It is exercised through its consumers: run either adapter's
`generate-proxies` and diff the output.

## When changing a generator

Regenerate **both** adapters and confirm the diff is what you intended — byte-identical output is
the expected result of a no-op change, and both adapter packages were verified that way after an
upstream CEM config change. Repeat that check after any upstream change to
`custom-elements-manifest.config.js` or `packages/forge/plugins/cem/`.

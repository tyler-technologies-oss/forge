# Forge Table

Lit-based data table Web Component for `@tylertech/forge`, built on
[TanStack Table](https://tanstack.com/table) (`@tanstack/lit-table`) with row virtualization from
`@tanstack/lit-virtual`.

## Purpose

Lifted out of the base `@tylertech/forge` package into its own so consumers of the main library do not
pay for TanStack. `@tylertech/forge` is a **peerDependency** — the table renders Forge elements
(`forge-checkbox`, `forge-popover`, `forge-list`, `forge-tooltip`, `forge-date-picker`, and with the
filter feature `forge-select` and `forge-text-field`) and does not bundle them.

The element is **`forge-data-table`**, not `forge-table`: `forge-table` is an existing, unrelated element
in the base package. The package name and the tag intentionally differ.

## Status

`package.json` is `"private": true`, so this package is not versioned or published. `changeset publish`
publishes any non-private package whose version is not on npm yet, so the flag is what keeps this WIP
component out of a release. To publish: remove `private`, add a changeset, and review the peer range.

## Architecture

- `src/lib/data-table/data-table.ts` — the `DataTableElement`. A plain `LitElement` that registers itself
  with `@customElement('forge-data-table')`, so importing the module is what defines the element. It does
  not use `BaseLitElement` or `defineCustomElement`, unlike most of Forge.
- Rows come from the `dataSource` property, a `DataSource` from `@tylertech/forge-core`. `willUpdate` calls its
  `fetch()` whenever the property changes and stores the result in internal state, so the first render is empty
  and rows arrive in a follow-up update. `await element.updateComplete` therefore does not wait for the fetch.
  `forge-core` is a regular dependency (not a peer) because `DataSource` is in the public type surface; the
  source only does `import type` from it, so the built JS has no runtime import.
- `src/lib/data-table/controllers/` — Lit reactive controllers for column reordering, column visibility,
  and the shared `ColumnHierarchyHelper` for grouped (nested) columns.
- `src/lib/data-table/directives/light-dom-render.ts` — renders custom cell templates into the light DOM
  and projects them through named slots (`col-<id>:row-<id>`).
- `src/lib/data-table/features/` — opt-in pieces. `expander.ts` is re-exported from the main entry.
  `filter/index.ts` is only side-effect imports that register `forge-select` and `forge-text-field`; it is
  a directory so the `./*` export pattern can resolve it as `@tylertech/forge-table/data-table/features/filter`.
- `src/lib/column-menu/` — `forge-data-table-column-menu`, an icon button + `forge-menu` of actions for one column.
  Takes the TanStack `column` and `table` as properties; sort, move and hide are applied directly, while pin and
  maximize only dispatch `forge-data-table-column-menu-action`. It assigns `forge-menu`'s `options` in
  `firstUpdated` because `forge-menu` drops an `options` value that Lit sets during the first render.
- `src/dev/` — a scratch page on **localhost:3470**. `vite.config.mts` aliases this package to `src/lib` and
  compiles its SCSS from source (including forge's SCSS), so edits reload the page with no rebuild. forge itself
  still resolves to its built `esm/`, so forge changes need a forge rebuild. Not published.

## Commands

```bash
pnpm run --filter @tylertech/forge-table build   # rollup ESM + CEM + types
pnpm run --filter @tylertech/forge-table test    # Vitest browser mode
pnpm run --filter @tylertech/forge-table dev     # scratch page at localhost:3470 (reloads on source edits)
```

### Build through turbo, not just this package

The SCSS pulls forge's styles from `@tylertech/forge/sass/*`, which is forge's **built, gitignored**
`sass/` directory — a copy of `src/lib/**/*.scss`. If forge has not been rebuilt since its SCSS changed,
that copy is stale and this build fails with a confusing `Can't find stylesheet to import` pointing at a
file inside `node_modules/@tylertech/forge/sass/`. Run `pnpm exec turbo run build --filter=@tylertech/forge-table`
so forge is rebuilt first. Vitest does not hit this: its config reads forge's SCSS from source.

The build also removes `esm/` and `custom-elements.json` first, so a failed build leaves them gone.

### Importing from forge

- Import elements as side effects from their public subpath: `import '@tylertech/forge/checkbox'`.
- Import everything else from the **root**: `import { toggleState } from '@tylertech/forge'`.
- **Do not import from `@tylertech/forge/core`.** Its type declarations are real, but forge's built
  `esm/core/index.js` contains no exports, so it type-checks and then fails in the browser with
  `does not provide an export named ...`. Neither the build nor the tests catch this because the tests
  alias forge to its source — only the dev page (which uses forge's build) or a real consumer does.

### Storybook

The stories live in `packages/forge/src/stories/components/data-table/`, not here. `packages/forge/.storybook/main.ts`
aliases this package to its built `esm/`, and `packages/forge/src/stories/utils.ts` merges this package's
`custom-elements.json` so the API table resolves. After changing source, rebuild **and restart storybook**.

## Testing

Vitest browser mode in real Chromium, mirroring `packages/forge`.

- `vitest.setup.ts` is forge's own setup: per-test cleanup (viewport reset, removing leftover popovers and
  tooltips, clearing `DismissibleStack`) and the `toBeAccessible` matcher, typed in `src/testing/vitest.d.ts`.
  A setup file with only cleanup makes the suite fail with `Invalid Chai property: toBeAccessible`.
- `vitest.config.ts` aliases `@tylertech/forge` to `../forge/src/lib`, so tests run against forge's source,
  not its build.

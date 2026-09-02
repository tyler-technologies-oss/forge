---
name: forge-extended-migration
description: This skill should be used when the user asks to "migrate the X component", "migrate X from forge-extended", "port the extended X component into forge", or otherwise discusses moving a component (plus its tests, stories, and docs) from the sibling `forge-extended` repo into this monorepo's `packages/forge` package.
---

# Forge Extended Component Migration

Migrate a component (implementation + tests + Storybook stories/MDX) from the sibling `forge-extended` repo into `packages/forge` in this monorepo, converting it to this repo's Lit conventions along the way. Live reference implementations from this exact workflow: `packages/forge/src/lib/busy-indicator`, `packages/forge/src/lib/footer`, `packages/forge/src/lib/app-layout`.

## When to Use

- The user names a component that currently lives in `@tylertech/forge-extended` and asks to move/migrate/port it into this repo.
- Working on a branch like `feat/forge-extended-migration`.

## Locating the source

`forge-extended` is a sibling checkout, not a subdirectory. Find it once per session:

```bash
find ~/Desktop/dev -maxdepth 1 -iname "forge-extended"
```

Inside it, a component named `<name>` lives at:

- `packages/extended/src/lib/<name>/` — implementation, `.scss`, `.test.ts`, `index.ts`, and possibly a subcomponent folder (e.g. `footer/footer-item/`, matching how this repo nests `tabs/tab-bar/`)
- `packages/extended/src/stories/components/<name>/` — `<Name>.stories.ts` (there may be several, e.g. a docs-referenced `Demo` plus standalone showcase variants) and `<Name>.mdx`
- `packages/extended/src/stories/migration/<Name>.mdx` — **skip this.** It documents migrating from the old `forge-internal` package to `forge-extended`, which has no bearing on this monorepo migration.

Read the component's real `.ts` file, not just the story/docs — extended components sometimes carry dead imports (unused icon registrations, unused side-effect imports) that shouldn't be carried forward. Cross-check every import is actually referenced in the render output before porting it.

## Target conventions checklist

`packages/forge` components already follow a consistent Lit shape. Read 2-3 recently-migrated siblings (`busy-indicator`, `footer`, `divider`, `skip-link`, `tabs/tab-bar`) before writing new code — don't guess. Key conventions:

- Extend `BaseLitElement` (from `../core/base/base-lit-element.js`), not raw `LitElement`.
- Declare the tag name as `export const X_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-x';` **inside the main `.ts` file**, not the constants file.
- `<name>-constants.ts` holds only: the deprecated `X_CONSTANTS = { elementName }` object (built from `COMPONENT_NAME_PREFIX` in `../constants.js`) and any shared type aliases (e.g. `type FooterLayout = ...`). It does not hold the tag name constant.
- `export interface IXComponent extends BaseLitElement { ...public members... }` and `implements IXComponent` on the class — skip the interface only if the component has zero public members beyond the base (see `footer-item.ts`).
- Static members, in order: `[CUSTOM_ELEMENT_NAME_PROPERTY]`, then `[CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [OtherComponent, ...]` (list every custom element tag used in the render template), then a `static { IconRegistry.define([...]); }` block if icons are used (see `tabs/tab-bar/tab-bar.ts` for the exact shape), then `public static styles = unsafeCSS(styles);`.
- For every class listed in `CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY`, add a matching side-effect import (e.g. `import '../button/button.js';`) alongside the named class import — this mirrors `busy-indicator.ts` and is the established convention for components migrated in this effort specifically (older components like `tabs/tab-bar.ts` skip the side-effect import; follow the newer sibling, not the old one).
- Private internal state: native `#fields` and `#methods`, except Lit-decorated fields (`@state()`, `@queryAssignedNodes(...)`) which keep the codebase's existing `private _camelCase` convention — check a sibling with the same decorator before renaming.
- `readonly #internals: ElementInternals;` set via `this.attachInternals()` in the constructor, mutated with `toggleState(this.#internals, 'state-name', bool)` from `../core/utils/utils.js`.
- If the extended source sets ARIA roles manually with a `// TODO: use setDefaultAria once extended is merged into the mono repo` comment — that day has come. Replace it with `setDefaultAria(this, this.#internals, { role: '...' })` from `../core/utils/a11y-utils.js`, called in `connectedCallback()`.
- Add `@meta extended` to the class JSDoc (drives the `@meta` custom-elements-manifest tag, already configured with `isArray: true` in `custom-elements-manifest.config.js` — no config changes needed for a new extended component). Add one `@dependency forge-x` JSDoc line per sub-component (also already `isArray: true`).
- Wildcard package export: `@tylertech/forge/<segment>/<segment>` resolves to `src/lib/<segment>/<segment>/index.ts` — multi-segment subpaths work (see `tabs/tab-bar`, `app-bar/app-bar`). Don't invent a flat top-level folder for a subcomponent if the source nests it; nest it the same way and rely on the multi-segment wildcard.

## SCSS conversion

Extended components style with either raw hex/hardcoded px values or `@tylertech/forge/sass/...` imports. Convert to this repo's internal token modules, keeping the **public** `--forge-x-*` custom property names and their documented fallback values unchanged (they're the component's public API, referenced in `@cssproperty` JSDoc and the MDX docs):

- `@use '../core/styles/spacing';` → `spacing.variable(large)` etc. Token names (`xxxsmall` … `xxxlarge`) match forge-extended's spacing scale 1:1 — see `core/styles/tokens/spacing/tokens.scss` if unsure.
- `@use '../core/styles/theme';` → `theme.variable(...)`. For a fixed dark background (extended's typical `color-palette.$grey-800` chip/footer look), use `theme.variable(surface-inverse)` / `theme.variable(on-surface-inverse)` — same tokens `toast`/`tooltip` use for their dark surfaces, and they theme-flip correctly in dark mode.
- `@use '../core/styles/typography';` → `@include typography.style(body1)` etc.
- Drop any `@use` that ends up unreferenced (extended's SCSS often imports `theme`/`typography` and never uses them).

**Stylelint gotcha**: this repo's effective `custom-property-pattern` rule (resolved from `stylelint-config-standard-scss`, _not_ the `custom-property-pattern` override that appears to live in `@tylertech/stylelint-rules`'s own `.stylelintrc.json` — that file isn't part of the package's `exports` and never actually applies) rejects `--_private-name` custom properties outright. The established workaround, already used in `timeline/timeline-break/_core.scss`, is an explicit disable comment spanning every declaration _and_ every `var(--_...)` usage of that name:

```scss
/* stylelint-disable custom-property-pattern */

:host {
  --_footer-background: var(--forge-footer-background, #{theme.variable(surface-inverse)});
}

.container {
  background-color: var(--_footer-background);
}

/* stylelint-enable custom-property-pattern */
```

Wrapping just the declaration and not the later `var(--_...)` usages will still fail lint — scope the disable/enable pair around the whole file if the private var is referenced in multiple rule blocks.

## Test conversion

Extended tests use WTR + Mocha + Chai + `@open-wc/testing` + Sinon. Invoke the **`vitest-migration`** skill for the assertion/mock/fixture mapping tables — don't duplicate that reference here. Extended-specific notes on top of that skill:

- `sinon.stub(window, 'matchMedia').returns({...})` → `vi.spyOn(window, 'matchMedia').mockReturnValue({...} as unknown as MediaQueryList)`, restored with `vi.restoreAllMocks()` in `afterEach`.
- Extended's harness classes (`class XHarness { constructor(public el) {} get fooElement() {...} }`) can usually collapse to plain helper functions using `getShadowElement` from `@tylertech/forge-core`, matching how sibling components in this repo structure their tests — but keep a `createFixture()` helper for any component with more than 2-3 fixture variants.
- Don't "fix" a test assertion that looks inconsistent with the class's declared default without checking the actual fixture template first. A Lit property binding like `.appTitleHref=${appTitleHref}` explicitly sets the property to `undefined` when the local `appTitleHref` variable is undefined, overriding the class's `= ''` default — the original assertion (`to.be.undefined`) can be entirely correct even though it looks contradictory next to the field declaration.
- Re-export check: if the component's `-constants.ts` file exports event-data types (`XChangeEventData`), the main `.ts` file typically does _not_ re-export them (matches `busy-indicator-constants.ts`/`busy-indicator.ts`). Import those types directly from `./x-constants.js` in the test, not from `./x.js`.

## Story & MDX conversion

- Replace `import '$lib/x';` with `import '@tylertech/forge/x';` (side-effect import only — don't call the deprecated `defineXComponent()` functions; that's the extended repo's older convention, not this repo's).
- Replace `import { defineFooComponent, ... } from '@tylertech/forge';` + explicit `defineFooComponent()` calls with plain side-effect imports per tag actually used in the render template: `import '@tylertech/forge/foo';`. Skip this for any tag that's already a dependency of the component under migration (its side-effect import already fires when the main component's module loads).
- `IconRegistry` comes from `@tylertech/forge/icon`, not the bare `@tylertech/forge` package.
- Audit every `IconRegistry.define([...])` call and its `tylIcon*` imports against the actual template: icons rendered with the `external` attribute load from an external font/API and need no registry entry at all. It's common for extended demo stories to import and register icons that are either never rendered or rendered with `external` — drop the dead ones rather than porting them verbatim.
- `CustomArgTypes` import path from a story's MDX is `../../blocks/CustomArgTypes` (relative to `src/stories/components/<name>/`) — confirm the file exists at `src/stories/blocks/CustomArgTypes.tsx` before assuming the path.
- If the extended component has multiple story files and the MDX only references one of them (check `<Canvas of={...}>` usages), **ask the user** whether to port just the MDX-referenced story or all of them — this is a real scope/cost decision (extra story files can be 10-20KB each of composed demo markup), not an implementation detail to decide unilaterally.
- When porting extra story files not referenced by the original MDX, consider adding `<Canvas>` sections for them in the migrated MDX so they're not orphaned in the Storybook sidebar with no documentation context.

## Wiring into `src/lib/index.ts` — check for a tag-name collision first

Before touching `src/lib/index.ts`, check whether `forge-extended` still ships its own copy of the component being migrated (it usually does — migration doesn't delete the source repo):

```bash
find ~/Desktop/dev/forge-extended/packages/extended/src/lib -maxdepth 1 -iname "<name>"
```

If it still exists there, **do not** wire the migrated component into the root barrel at all. Reason: `packages/forge/package.json` declares no `"sideEffects": false`, and every Lit component registers itself eagerly via the `@customElement(...)` decorator at module-evaluation time — not lazily, not gated by `defineComponents()`. That means _any_ module reachable from `src/lib/index.ts`'s static import graph gets registered the instant something imports the bare `@tylertech/forge` package: guaranteed in local dev (the package's `"development"` export condition points straight at unbundled `src/lib/index.ts`, so there is no tree-shaking to strip it), and not reliably prevented in production either (no `sideEffects: false` to let bundlers drop the unused ones). A consumer who has `@tylertech/forge-extended` on the page for an unrelated component, plus the new `@tylertech/forge` for anything at all, would get a hard `customElements.define()` collision — a runtime crash — purely from the root barrel dragging in a component they never asked for.

The fix already has precedent in this codebase (`footer`, `app-layout`, and — after this was caught once — `busy-indicator`): keep the component reachable **only** via its own subpath (`@tylertech/forge/<name>`), never through the root package:

1. Do **not** add an import for `defineXComponent` to `src/lib/index.ts`.
2. Do **not** add `export * from './x/index.js';` to the export block.
3. Do **not** add `defineXComponent();` inside `defineComponents()`.
4. In the component's own `<name>/index.ts`, mark the definition function itself deprecated in favor of the side-effect import, matching the existing convention (see `footer/index.ts`, `app-layout/index.ts`, `busy-indicator/index.ts`):
   ```ts
   /** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/<name>'`). */
   export function defineXComponent(): void { ... }
   ```
5. If `blocks/` uses the component anywhere, add the explicit side-effect import to `blocks/forge-register.ts` (e.g. `import '@tylertech/forge/busy-indicator';`) — `defineComponents()` no longer reaches it, so the blocks gallery must opt in itself, same as any other consumer would.
6. **Add the component's folder name to `SUBPATH_ONLY_ENTRIES` in `packages/forge/scripts/build-esm.js`.** `buildEsm` bundles from a single `src/lib/index.ts` Rollup entry with `preserveModules: true`, so it only emits `.js` for modules reachable from that barrel — anything not wired into `src/lib/index.ts` per steps 1-3 above gets **no `.js` output at all** in `esm/<name>/` (only `.d.ts`, from the separate glob-based `tsc` declaration pass), which makes the `@tylertech/forge/<name>` subpath export a dead reference that fails to resolve for any consumer (this exact bug broke `blocks/forge-register.ts`'s build after the `app-layout`/`busy-indicator`/`footer` migrations). `SUBPATH_ONLY_ENTRIES` is an explicit array — not a glob over every `index.ts` — specifically so internal, non-public barrels (`core/base`, `core/utils`, etc.) never get promoted into buildable/importable subpaths by accident; every component migrated via this subpath-only path must be added to it by name.

If `forge-extended` has already dropped the component (no remaining collision risk), the old three-edit pattern is fine — matching the existing surrounding entries exactly, alphabetical by folder name (not tag name; e.g. `app-layout` sorts between `app-bar` and `autocomplete`):

1. Import block near the top: `import { defineXComponent } from './x/index.js';`
2. `export * from './x/index.js';` in the export block.
3. `defineXComponent();` inside `defineComponents()`.

## Verification (run all of these before reporting done)

```bash
cd packages/forge
npx vitest run --browser.headless src/lib/<name>      # new tests pass
npx eslint src/lib/<name> src/lib/index.ts src/stories/components/<name>
npx stylelint "src/lib/<name>/**/*.scss"
npx prettier --check src/lib/<name> src/stories/components/<name> src/lib/index.ts
npx tsc --noEmit -p . 2>&1 | grep -i "<name>"          # should be empty; ignore pre-existing unrelated errors elsewhere
pnpm run build                                          # full package build: CEM, types, CSS, CDN bundling
```

After `pnpm run build`, spot-check `custom-elements.json` for the new tag's `dependencies` and `slots` arrays to confirm the JSDoc tags were picked up correctly (see the Python one-liner pattern used during the `app-layout` migration — load the JSON, filter `declarations` by `tagName`).

If the component was wired in via the subpath-only path (tag-name collision still exists in `forge-extended`), also confirm `esm/<name>/index.js` actually exists (not just `index.d.ts`) — `ls packages/forge/esm/<name>/`. Its absence means `SUBPATH_ONLY_ENTRIES` in `build-esm.js` wasn't updated, and the `@tylertech/forge/<name>` subpath will fail to resolve for any downstream consumer (e.g. `blocks/`) even though the package build itself succeeds.

Optionally run `npx storybook build --quiet` and check `storybook-static/assets/` for chunks matching the new story file names, then `rm -rf storybook-static` — build artifacts (`dist/`, `esm/`, `custom-elements.json`, `storybook-static/`) are gitignored; confirm with `git status --short` that nothing untracked leaked in.

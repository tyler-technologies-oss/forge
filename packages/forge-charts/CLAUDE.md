# Forge Charts

Lit-based chart web components, published (eventually) as `@tylertech/forge-charts`. Built on `@tanstack/charts`.

## Status

Private (`"private": true`, version `0.0.0`) so `changeset publish` cannot release it by accident. Flipping that and adding a changeset is a deliberate release decision.

## Commands

```bash
pnpm --filter @tylertech/forge-charts build   # rimraf dist, Vite library build + d.ts
pnpm --filter @tylertech/forge-charts test    # Vitest browser mode (headless Chromium)
pnpm --filter @tylertech/forge-charts lint    # tsc --noEmit + eslint + stylelint
pnpm dev:forge-charts                         # dev site (from repo root), port 3451
```

## Architecture

- Same layout as `packages/forge-ai`: components in `src/lib/<name>/` (`<name>.ts`, `<name>.scss`, `<name>.test.ts`, `index.ts`), Vite library build with one entry per `index.ts`, `@customElement` registration, `experimentalDecorators` on.
- `forge-chart` is the base component. Each chart type is its own element extending it: `forge-bar-chart`, `forge-line-chart`, `forge-area-chart`, `forge-scatter-chart` (all via the abstract `CartesianChartComponent`, which owns `data`, `x`, `y`, `color`, `x-scale`, `x-label`, `y-label`) and `forge-pie-chart` (`data`, `category`, `value`, `inner-radius`). The base `definition` property stays as the escape hatch for charts with no dedicated element.
- To add a chart type: extend `ChartComponent` (or `CartesianChartComponent` and implement `_createMark`) and override `_createDefinition()`, building the spec through `defineForgeChart()` (`chart/define-chart.ts`, which adds the tooltip and widens the type). The base re-runs `_createDefinition()` only when a property other than `height`, `aspect-ratio` changes, so the chart isn't rebuilt on sizing edits. Return `undefined` to render nothing. Field names are passed to TanStack as strings, which is why `ChartDatum` is `Record<string, any>`.
- Bar and area series stack when `color` is set (TanStack's default); `forge-bar-chart` has `grouped` for side-by-side. `x-scale` defaults to `auto` (dates → time, numbers → linear, else point); `forge-bar-chart` defaults it to `band`.
- X scales are tree-shakable subpath exports (`@tylertech/forge-charts/scales/{band,linear,point,time}`, `src/lib/scales/`). Each re-exports TanStack's scale function and registers itself in `scale-registry.ts` on import; `CartesianChartComponent` resolves `x-scale` through that registry instead of importing the scales, so unused ones drop out of a consumer's bundle. `linear` is always loaded (the y axis), `forge-bar-chart` imports `band`, and line/area/scatter import `point`. `time` is opt-in: an unregistered `x-scale` warns and renders nothing. New scales need a `scales/<name>/index.ts` that calls `registerChartScale`.
- TanStack's mark functions are re-exported one subpath per TanStack module, `@tylertech/forge-charts/marks/<name>` (`src/lib/marks/<name>/index.ts`, each just `export * from '@tanstack/charts/<name>'`), for use with `definition` or `defineChart()`. Like the scales there is deliberately no barrel, and the main entry does not export them (apart from `createMark`, below). Layouts and guides (`group`, `stack`, `dodge`, `crosshair`, `hierarchy/tree`, `network/force`) are not marks and are not re-exported. `marks/decorative` re-exports `mark/decorative`. `createMark` has no TanStack subpath, so it is a named re-export from the `@tanstack/charts` root in the main entry (`src/lib/index.ts`) instead; the main entry exports nothing else from TanStack. A new TanStack mark module needs only a new `marks/<name>/index.ts`.
- The host is a `figure` (`role="figure"` is set as an attribute on connect unless the consumer set a role; an attribute rather than `ElementInternals` so it is visible to role queries in tests) and takes `aria-label`, `aria-labelledby` and `aria-describedby` directly; there are no `label`/`description` properties. The focusable `role="img"` svg that TanStack renders needs its own name, so the host's `aria-label` (or the text of the `aria-labelledby` targets, resolved in the host's root node when the chart updates) is passed to `mountChart` as `ariaLabel`.
- Protected members use an underscore prefix (`_createDefinition`, `_createMark`) because the repo's ESLint rule requires it; Lit's own lifecycle hooks stay public overrides.
- `forge-chart` wraps TanStack's framework-neutral `mountChart` (`@tanstack/charts/dom`) inside its own shadow root. Do NOT use `@tanstack/charts/lit`: that element renders into light DOM, so it can't be themed or encapsulated by a Forge component.
- The consumer builds the chart with `defineChart()` and passes it as the `definition` property. Replacing the definition is the update boundary (TanStack's rule); do not mutate one in place.
- Theming is done in `chart.scss` by mapping TanStack's `--ts-chart-*` CSS variables to `--forge-theme-*` tokens on the shadow container. Label typography comes from `forge-typography.style(label2, ...)` (`@tylertech/forge-tokens/sass/typography`, resolved via `loadPaths: ['node_modules']` in `vite.config.mts`) on the container, excluding `font-size` and `line-height` because TanStack sizes SVG text itself and measures it from the options, not CSS. It reads `font-family`, weight and letter-spacing from the container's computed style. The tooltip font is set through `--ts-chart-tooltip-font` from the `label1` tokens. Tooltips use the inverse surface tokens (`surface-container-high` is a dark grey in Forge). Tooltips rendered through TanStack's `portal` extension live outside the shadow root and won't pick up these variables.
- Like `forge-ai`, component TypeScript must not import runtime code from `@tylertech/forge`; Forge is used for styling in the dev site only.

## Dev site

`src/dev` is a Vite root (`vite src/dev`), a trimmed version of `packages/forge/src/dev`. It imports Forge's **built** output (`packages/forge/esm`, `dist/*.css`) through aliases in `src/dev/vite.config.mts`, because Forge's `development` export condition points at raw source that needs Forge's own Vite plugins. Build `@tylertech/forge` first (`pnpm turbo run build --filter=@tylertech/forge-charts...`). Add new demos as sections in `index.html` with their data in `charts.ts`.

## Testing

Vitest browser mode, `src/lib/**/*.test.ts`. Use `renderFixture` from `src/testing/fixture.ts`. Assert through the public API and rendered output; do not access private members.

# Forge React Adapter

Thin React wrapper components, hooks, and utilities around `@tylertech/forge` custom elements.

## Purpose

React doesn't pass complex data (arrays/objects/functions) through HTML attributes to custom elements, and
doesn't support attaching listeners for `CustomEvent`s dispatched by web components. This package wraps every
Forge custom element in a React component that sets values via the JS property API and supports events via an
`on-*` prop convention (e.g. `on-forge-table-sort={...}`).

`@tylertech/forge` is a **peerDependency**, not bundled — consumers must call `defineComponents()` or targeted
`define<X>Component()` functions from `@tylertech/forge` themselves to register the elements they use.

## Architecture

- `src/utils.ts` — `createElementProxy(tagName, options?)`, built on `reactify-wc`. Every generated wrapper in
  `src/components/component-wrappers.tsx` is one line calling this.
- `src/components/component-wrappers.tsx` — one `export const Forge<Name> = createElementProxy('forge-<name>')`
  per Forge component. Pass `IElementProxyOptions` (`forceProperty`/`forceAttribute`/`forceEvent`) only when a
  prop must bypass `reactify-wc`'s default attribute/property heuristics.
- `src/core/createOverlayComponent.tsx` — factory for stateful overlay components (dialog, toast, popover,
  bottom sheet) using `React.forwardRef` + `ReactDOM.createPortal`, driven by an `IOverlayController`.
- `src/hooks/` — imperative hooks (`useForgeDialog`, `useForgeBottomSheet`, `useForgePopover`, `useForgeToast`)
  built on the shared `useDynamicForgeComponent` primitive, which creates/mounts/unmounts the underlying custom
  element and delegates show/hide behavior per component.
- `src/index.ts` — barrel export plus the ambient `declare global { namespace JSX { interface IntrinsicElements
{...} } }` block giving TypeScript typings for every `forge-*` tag when used directly as JSX (not through a
  wrapper component).
- `src/dev/` — internal Vite + React Router demo app exercising the wrappers/hooks against the workspace's
  `@tylertech/forge` build. Not published (excluded from `tsconfig.build.json`).

## Commands

```bash
pnpm run --filter @tylertech/forge-react build   # tsc build to dist/
pnpm run --filter @tylertech/forge-react test     # Vitest (browser mode)
pnpm dev:forge-react                              # dev app at localhost:3451
```

## Testing

Prefer smoke tests through the public API (`createElementProxy`, hook return values) over exhaustively testing
each of the ~95 generated one-line component wrappers.

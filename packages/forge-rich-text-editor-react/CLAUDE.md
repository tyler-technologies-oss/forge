# Forge React Rich Text Editor Adapter

React wrapper components around `@tylertech/forge-rich-text-editor`'s custom elements.

## Purpose

Same reason `@tylertech/forge-react` exists: React does not pass complex data through HTML
attributes to custom elements and cannot attach listeners for `CustomEvent`s. Every element in the
editor package gets a React component that sets values via the JS property API and exposes events
through the `on-*` prop convention.

`@tylertech/forge-rich-text-editor` is a **peerDependency**. Consumers register the elements
themselves via `defineRichTextEditorComponents()` / `defineRteFeatureComponents()`.

## Architecture — everything is generated

**There is no hand-written component source in this package.** The entire React surface is generated
from the editor package's `custom-elements.json` by `@tylertech/forge-adapter-codegen/react`, so the
adapter cannot drift from the elements it wraps.

- `scripts/generate-proxies.mjs` — **config only**, and the one file to edit when the surface
  changes. It declares the two entry points (`''` for `src/lib/`, `features` for
  `src/lib/features/`) and the `propertyProps` overrides.
- `test/wrappers.test.tsx` — the only hand-written source.
- `src/dev/` — a Vite demo on **localhost:3461**. Not published.

**Generated output is not committed.** `pnpm run build` runs `rimraf ./dist`, regenerates, then
type-checks — so `dist/` is the generated surface and is gitignored. This differs from
`@tylertech/forge-react`, which commits `src/components/component-wrappers.tsx`; do not assume the
two packages work the same way.

### `content` must be forwarded as a property

`generate-proxies.mjs` lists `content` under `propertyProps` for `forge-rich-text-editor` and
`forge-rich-text-context`. That property accepts an HTML string **or a ProseMirror document**, and
React would set an attribute-backed prop as an attribute, stringifying the object to
`[object Object]`. Removing those entries silently breaks document content.

### Type-check with `skipLibCheck` off

`tsconfig.build.json` type-checks the generated `.d.ts` files deliberately. The React generator
names components after their tag and derives the element type import from that same name, which
would import a class the source package does not export; the codegen repoints those imports
afterwards. **With `skipLibCheck` on, TypeScript skips declaration files entirely and this check
passes even when an import resolves to nothing** — which is the state
`@tylertech/forge-extended-react` ships in today.

## Commands

```bash
pnpm run --filter @tylertech/forge-rich-text-editor-react build   # regenerate + typecheck
pnpm run --filter @tylertech/forge-rich-text-editor-react test    # Vitest browser mode
pnpm run --filter @tylertech/forge-rich-text-editor-react dev     # demo at localhost:3461
```

`pretest` runs `build`, so tests always exercise freshly generated output.

## Do not remove the `sass` devDependency

`sass` is declared here **even though this package has no stylesheets of its own.** It is an
optional peer of vite, and vite a peer of vitest: a package declaring `vite` without a matching
`sass` forks a second vitest instance, and pnpm's single deduped `@angular/build` then links the
wrong one — which deadlocked `@tylertech/forge-angular`'s suite. Both new adapter packages declare
`sass` from the catalog for this reason, and it must stay pinned to the same catalog entry.

## Testing

Smoke tests through the public API, matching `@tylertech/forge-react`'s posture: validate the
generated proxy pattern rather than exhaustively testing every generated wrapper.

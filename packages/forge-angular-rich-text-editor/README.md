# @tylertech/forge-angular-rich-text-editor

The official Tyler Forge™ rich text editor adapter library for Angular.

This package provides Angular proxy components and modules for the custom elements in
[`@tylertech/forge-rich-text-editor`](../forge-rich-text-editor). It is kept separate from
`@tylertech/forge-angular` so that consumers who do not need an editor never take on TipTap.

## Installation

```bash
npm install @tylertech/forge-angular-rich-text-editor @tylertech/forge-rich-text-editor
```

## Usage

Import `ForgeRteModule` to get every editor element, or import the individual modules you need.

```ts
import { ForgeRteModule } from '@tylertech/forge-angular-rich-text-editor';

@NgModule({
  imports: [ForgeRteModule]
})
export class AppModule {}
```

```html
<forge-rich-text-editor [maxLength]="500" (change)="onChange($event)">
  <forge-rte-standard-tools></forge-rte-standard-tools>
</forge-rich-text-editor>
```

Importing a module registers its underlying custom element in the module constructor.

## Development

Everything under `src/lib` and `src/public-api.ts` is generated from the editor package's
`custom-elements.json` and is overwritten on every build — do not edit it by hand. The generation
logic lives in `@tylertech/forge-adapter-codegen`, which is shared with the React adapter and is the
migration path for the hand-maintained adapters; `scripts/generate-proxies.mjs` here is config only.

```bash
pnpm build   # regenerate the proxies, then build the library with ng-packagr
```

Under the hood it runs the shared `@tylertech/forge-schematics:custom-elements` schematic twice,
because the schematic takes a single `importPath` while the editor package ships two barrels: the
four core elements come from the package root and the `forge-rte-*` features come from
`./features`. The split is derived from the manifest so the two passes cannot drift.

It then writes the per-directory `index.ts` barrels, `src/public-api.ts` and the aggregate
`ForgeRteModule`, none of which the schematic emits. That gap is worth knowing about: the rich text
editor proxies in `@tylertech/forge-extended-angular` are generated but have no barrels and are
absent from its `public-api.ts`, so they are unreachable to consumers.

### Dev harness

```bash
pnpm dev   # build, then serve a scratch page at localhost:3462
```

`src/dev` is a page for looking at the components in a real browser. It is never published, and it
imports built output rather than source, so it exercises the same artifact a consumer gets.

Note that `forge-rich-text-editor` takes `content` as an **HTML string**, while
`forge-rich-text-renderer` takes **ProseMirror JSON** — the shape the editor's `change` event
emits. They are deliberately different formats.

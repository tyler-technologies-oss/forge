# @tylertech/forge-rich-text-editor-react

The official Tyler Forge™ rich text editor adapter library for React.

This package provides React components for the custom elements in
[`@tylertech/forge-rich-text-editor`](../forge-rich-text-editor). It is kept separate from
`@tylertech/forge-react` so that consumers who do not need an editor never take on TipTap.

## Installation

```bash
npm install @tylertech/forge-rich-text-editor-react @tylertech/forge-rich-text-editor
```

## Usage

```tsx
import { ForgeRichTextEditor, ForgeRteStandardTools } from '@tylertech/forge-rich-text-editor-react';

export const Editor = () => (
  <ForgeRichTextEditor maxLength={500} onChange={event => console.log(event.detail)}>
    <ForgeRteStandardTools />
  </ForgeRichTextEditor>
);
```

Importing a component registers its underlying custom element as a side effect, so there is no
separate `define*()` call to make.

## Development

The components are generated from the editor package's `custom-elements.json`, so there is no
hand-written component source in this package. The generation logic itself lives in
`@tylertech/forge-adapter-codegen`, which is shared with the Angular adapter and is the migration
path for the hand-maintained adapters; `scripts/generate-proxies.mjs` here is config only.

```bash
pnpm build   # generate the wrappers into dist/, then type-check the generated output
pnpm test    # build, then verify the wrappers register and forward props in a browser
```

`pnpm build` fails if a generated declaration references a type the editor package does not
export, or if an attribute cannot be matched to a public property. The type check deliberately runs
with `skipLibCheck` off — with it on, TypeScript skips declaration files entirely and the check
passes even when an import resolves to nothing. See that package's README for why both cases are
worth guarding.

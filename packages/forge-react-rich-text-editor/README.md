# @tylertech/forge-react-rich-text-editor

The official Tyler Forge™ rich text editor adapter library for React.

This package provides React components for the custom elements in
[`@tylertech/forge-rich-text-editor`](../forge-rich-text-editor). It is kept separate from
`@tylertech/forge-react` so that consumers who do not need an editor never take on TipTap.

## Installation

```bash
npm install @tylertech/forge-react-rich-text-editor @tylertech/forge-rich-text-editor
```

## Usage

```tsx
import { ForgeRichTextEditor, ForgeRteStandardTools } from '@tylertech/forge-react-rich-text-editor';

export const Editor = () => (
  <ForgeRichTextEditor maxLength={500} onChange={event => console.log(event.detail)}>
    <ForgeRteStandardTools />
  </ForgeRichTextEditor>
);
```

Importing a component registers its underlying custom element as a side effect, so there is no
separate `define*()` call to make.

### Known limitation: `content` accepts only HTML through the prop

`forge-rich-text-editor`'s `content` accepts an HTML string or a ProseMirror document, but the
generated wrapper forwards props to the custom element as attributes, so a document passed through
the `content` prop is stringified to `"[object Object]"`.

Assign it through a ref instead:

```tsx
const editor = useRef<ForgeRichTextEditorElement>(null);
useEffect(() => {
  editor.current!.content = proseMirrorDocument;
}, []);

<ForgeRichTextEditor ref={editor} />;
```

Strings work through the prop as normal. The Angular adapter is unaffected — its generated proxies
assign the native property directly.

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

### Dev harness

```bash
pnpm dev   # build, then serve a scratch page at localhost:3461
```

`src/dev` is a page for looking at the components in a real browser. It is never published, and it
imports built output rather than source, so it exercises the same artifact a consumer gets.

Note that `forge-rich-text-editor` takes `content` as an **HTML string**, while
`forge-rich-text-renderer` takes **ProseMirror JSON** — the shape the editor's `change` event
emits. They are deliberately different formats.

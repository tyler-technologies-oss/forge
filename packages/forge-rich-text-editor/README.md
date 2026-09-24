# Tyler Forge™ Rich Text Editor

A rich text editor Web Component library for [Tyler Forge™](https://github.com/tyler-technologies-oss/forge), built on
[Tiptap](https://tiptap.dev/).

## Installation

```bash
npm install @tylertech/forge-rich-text-editor
```

`@tylertech/forge` is a peer dependency and must be installed alongside this package.

## Usage

```ts
import '@tylertech/forge-rich-text-editor';
```

```html
<forge-rich-text-editor>
  <forge-rte-standard-tools></forge-rte-standard-tools>
</forge-rich-text-editor>
```

## Development

```bash
pnpm dev     # serve a scratch page at localhost:3460
pnpm test    # 529 tests in a real browser
pnpm build   # rollup ESM, custom elements manifest and types
```

`src/dev` is a page for looking at the components in a real browser. It is never published, and it
imports the built `esm/` output rather than source, so it exercises the same artifact a consumer
gets.

Note that `forge-rich-text-editor` takes `content` as an **HTML string**, while
`forge-rich-text-renderer` takes **ProseMirror JSON** — the shape the editor's `change` event
emits. They are deliberately different formats.

## License

Apache-2.0

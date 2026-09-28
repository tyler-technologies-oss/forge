# Forge Rich Text Editor

Lit-based rich text editor Web Components for `@tylertech/forge`, built on [Tiptap](https://tiptap.dev/)
(ProseMirror).

## Purpose

Lifted out of `@tylertech/forge-extended` into its own package because Tiptap is a heavy dependency
that consumers of the main library should not pay for. `@tylertech/forge` is a **peerDependency** —
the editor renders Forge elements (`forge-icon-button`, `forge-popover`, `forge-text-field`) and does
not bundle them.

Registration is split so consumers only pay for the tools they use:
`defineRichTextEditorComponents()` registers the four core elements, and
`defineRteFeatureComponents()` (from the `./features` subpath) registers the 14 `forge-rte-*` feature
elements.

## The composition model — read this first

**The editor's Tiptap schema is built from whichever feature elements are slotted into it.** Each
`forge-rte-*` element contributes its own Tiptap extension through `IRichTextEditorFeature`, and the
editor collects them via `@lit/context`. An editor with nothing slotted supports nothing.

This is the single most common source of false diagnoses in this package: content handling looks
broken when the feature providing the mark simply is not slotted. **Slot
`forge-rte-standard-tools` before concluding content handling is broken.**

The two content surfaces are not symmetrical:

- `forge-rich-text-editor`'s `content` takes an **HTML string or a ProseMirror document**.
- `forge-rich-text-renderer`'s `content` takes **only a document** — HTML renders as escaped text.
- The `content` **attribute** is necessarily HTML-only, since an attribute cannot carry an object.

Document input is also stricter than HTML input: ProseMirror discards the **entire** document for one
unknown mark, whereas HTML parsing drops the unknown formatting and keeps the text. Rejected
documents are reported through the `error` event (`context: 'Invalid document content'`) because
Tiptap alone only logs a warning an application cannot react to.

## Architecture

- `src/lib/rich-text-editor.ts` — the editable component. Owns the Tiptap `Editor` instance and
  provides the editor context.
- `src/lib/rich-text-renderer.ts` — read-only rendering of a ProseMirror document.
- `src/lib/rich-text-content.ts` / `rich-text-context.ts` — the content host element and a
  context-only wrapper for composing a toolbar against an editor elsewhere in the tree.
- `src/lib/editor-context.ts` — the `@lit/context` context plus the package's public types
  (`RichTextDocument`, `RichTextEditorContent`, and every event detail interface).
- `src/lib/features/` — one file per feature element. Each implements `IRichTextEditorFeature`
  (`extensions` + `requestUpdate()`), and most render `forge-rte-tool-button` from
  `features/core/`. `rte-standard-tools.ts` composes ten of them — not `code` or `link`, which are
  opt-in.
- `src/lib/extensions/` — Tiptap extensions and helpers that are not feature elements:
  `character-limit.ts`, `paste-handler.ts`, `markdown-serializer.ts` and `sanitize-utils.ts`.
- `src/testing/` — `renderFixture` and the axe helpers. Not published.
- `src/dev/` — a scratch page on **localhost:3460** that imports the built `esm/` rather than
  source, so it exercises the artifact a consumer gets. Not published.

### Sanitization

`sanitizeHTML` in `extensions/sanitize-utils.ts` keeps an **allow-list** of `style` declarations
(`text-align`, `color`, `background-color`) with validated values, and strips `class` and `data-*`
entirely. Anything needing those attributes must add an entry: task lists (`data-checked`),
code-block languages (`class="language-*"`) and mentions each would. Note the task-list case
**loses meaning, not just formatting** — a checked task would load unchecked.

Every URL-bearing attribute is protocol-checked, not just `href`.

## Commands

```bash
pnpm run --filter @tylertech/forge-rich-text-editor build   # rollup ESM + CEM + types
pnpm run --filter @tylertech/forge-rich-text-editor test    # Vitest browser mode
pnpm run --filter @tylertech/forge-rich-text-editor dev     # scratch page at localhost:3460
```

### The build cleans its outputs first

`scripts/build.js` removes `esm/` and `custom-elements.json` **before** building. If a later step
fails, those are simply gone, and every subsequent command fails with confusing
`Cannot find module` errors that have nothing to do with the real problem. **If you see those,
rebuild before believing anything else.**

The same applies to `packages/forge`, whose build additionally clears `dist/`, `sass/` and `cdn/`.

### Storybook serves built output

`packages/forge/.storybook/main.ts` aliases this package to its built `esm/`. After changing source
you must rebuild **and restart storybook** — Vite does not pick up changes inside an aliased
directory.

## Testing

Vitest browser mode in real Chromium, mirroring `packages/forge`.

- **Use `renderFixture` from `src/testing/fixture.ts`**, never `vitest-browser-lit`'s `render()`
  directly. `render()` is synchronous where open-wc's `fixture()` was not, so the shadow DOM is
  otherwise empty at assertion time.
- **Assert effects, not attributes.** A `disabled` attribute assertion passes whether or not the
  state does anything; several inherited tests did exactly that and missed real bugs.
- When a component-level assertion would pass regardless — the schema drops a dangerous `src`
  anyway, alignment only reaches the schema with `forge-rte-align` slotted — **test the function
  directly and say why in a comment.**
- `src/testing/a11y.ts` wraps `axe-core`. `expectNoA11yViolations` fails with the full violation
  list rather than a count, so a regression is readable without a rerun.

### Properties that only apply at construction

Most properties are read once when the Tiptap editor is created. Only `content`, `maxLength`,
`disabled` and `readOnly` have reconfiguration handling; **`allowPasteFormatting` and
`allowPasteImages` do not, and changing them on a live editor has no effect.** This is a known
inherited defect.

The practical consequence for tests: the inherited suite covered construction thoroughly and
reconfiguration not at all, which is why several bugs were only reachable by changing a property on
an already-initialized editor. **When adding coverage, change the property after first render.**

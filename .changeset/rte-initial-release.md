---
'@tylertech/forge-rich-text-editor': minor
---

Initial release of the Tyler Forge™ rich text editor Web Components, lifted from
`@tylertech/forge-extended`. Ships `forge-rich-text-editor`, `forge-rich-text-renderer`,
`forge-rich-text-content`, `forge-rich-text-context` and the `forge-rte-*` feature elements.
TipTap is bundled as a dependency of this package so that `@tylertech/forge` consumers who do
not need a rich text editor are unaffected.

Every custom element tag name except one is unchanged from `@tylertech/forge-extended`, so
markup ports across almost as-is. The TypeScript API was normalized to match the rest of the
monorepo:

- The `forge-rte-feature-divider` element is renamed to `forge-rte-divider`, the only tag
  change. It was the one tag that did not follow the `forge-rte-<tool>` pattern.
- Tag constants are now `SCREAMING_SNAKE_CASE`, e.g. `RichTextEditorComponentTagName` is now
  `RICH_TEXT_EDITOR_TAG_NAME`.
- Feature classes are named after their tag, e.g. `RichTextFeatureBoldComponent` is now
  `RteBoldComponent`. Affects `Align`, `Bold`, `Code`, `Divider`, `Heading`, `Link`, `Strike`
  and `UndoRedo`.
- The `RichTextEditorFeature` interface is now `IRichTextEditorFeature`.
- Every component exposes a `defineXComponent()` function, plus the
  `defineRichTextEditorComponents()` and `defineRteFeatureComponents()` aggregates.
- The `forge-rte-tool-toggle` event is now correctly declared on `HTMLElementEventMap`; the
  previous declaration named an event that was never dispatched.

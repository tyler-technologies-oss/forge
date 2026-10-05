# @tylertech/forge-rich-text-editor-angular

## 0.2.0

### Minor Changes

- efc46d0: Add `forge-rich-text-toolbar`, which groups tool buttons into an accessible toolbar with a single
  tab stop. It brings the keyboard model of the `forge-rich-text-editor` toolbar to composed layouts
  built from `forge-rich-text-context`: Tab enters the toolbar on the last button used, the arrow
  keys move between buttons, and Home and End jump to the first and last.

  It also supplies what a plain container in a composed layout did not have: `role="toolbar"`, an
  accessible name through its `label` property (default "Rich text formatting toolbar"), and
  `aria-orientation`. It dims when its editor is readonly, as the `forge-rich-text-editor` toolbar
  already did, which composed layouts previously never showed; `--forge-rich-text-toolbar-readonly-opacity`
  adjusts it. Several toolbars in one layout are each their own tab stop. Tool buttons in a
  plain container are unchanged and remain individually tabbable.

  `forge-rich-text-editor` now renders a `forge-rich-text-toolbar` around its slotted features, so
  both layouts share one implementation. `defineRichTextEditorComponents()` registers it, and
  `defineRichTextToolbarComponent()` registers it on its own.

- a685e03: Keep focus in the editor when undo or redo is used. Undo/redo was the only feature that rendered
  `forge-icon-button` directly instead of `forge-rte-tool-button`, so it had neither the pointer
  guard that stops a click from taking focus nor a `focus()` in its command chain. A click left focus
  on the button, unlike every other tool. When the last undo disabled the focused button, the browser
  dropped focus to `body` before the feature's own hand-off to the redo button could run.

  Undo and redo now render `forge-rte-tool-button` and run `chain().focus()`, so focus returns to the
  editor after every step, from the mouse or the keyboard, and the hand-off is no longer needed. They
  also gain `aria-keyshortcuts` (`Control+Z`, `Control+Shift+Z`) and the controls relationship every
  other tool already had.

  `forge-rte-tool-button` gains a `no-toggle` attribute (`noToggle` property) for momentary actions,
  which renders a plain action button rather than a toggle. It also gains a `focus()` method that
  forwards to the button in its shadow root.

### Patch Changes

- Updated dependencies [4c1d9dd]
- Updated dependencies [efc46d0]
- Updated dependencies [dc49c1a]
- Updated dependencies [a685e03]
  - @tylertech/forge-rich-text-editor@0.2.0

## 0.1.0

### Minor Changes

- 696fc4d: initial release

# @tylertech/forge-rich-text-editor

## 0.3.0

### Minor Changes

- 527aef7: Added `toRichTextDocument(html, features?)`, which converts HTML to the document the editor would produce from it. It defaults to the `forge-rte-standard-tools` features, and `RICH_TEXT_FEATURES` lists every feature name it accepts. The editor, renderer and converter now share one set of extension configs.

## 0.2.0

### Minor Changes

- 4c1d9dd: feat(rich-text-editor): add custom properties to override the content padding of the editor and renderer
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

- dc49c1a: Make the `forge-rich-text-editor` toolbar a single tab stop, following the WAI-ARIA toolbar
  pattern. Every button used to be its own tab stop, so reaching the content meant tabbing through
  every toolbar button - fifteen with `forge-rte-standard-tools` alone. Tab now enters the toolbar
  on the last button used, ArrowLeft and ArrowRight move between buttons (reversed in right-to-left
  layouts), and Home and End jump to the first and last. Movement stops at either end rather than
  wrapping.

  Disabled buttons are skipped, consistent with forge's buttons, which drop their tabindex when
  disabled. Keys typed into a feature's popover, such as the link URL field, are not intercepted.

  Tool buttons outside an editor's own toolbar - in a composed layout built from
  `forge-rich-text-context` - are unchanged and remain individually tabbable.

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

- Updated dependencies [ea6ee64]
  - @tylertech/forge-core@3.6.0

## 0.1.0

### Minor Changes

- 696fc4d: initial release

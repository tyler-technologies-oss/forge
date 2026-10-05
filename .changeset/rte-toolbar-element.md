---
'@tylertech/forge-rich-text-editor': minor
'@tylertech/forge-rich-text-editor-angular': minor
---

Add `forge-rich-text-toolbar`, which groups tool buttons into an accessible toolbar with a single
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

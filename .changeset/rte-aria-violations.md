---
'@tylertech/forge-rich-text-editor': minor
---

Fix three ARIA defects and add an automated accessibility suite.

- **The editable element had no accessible name.** TipTap builds its own contenteditable element
  inside the one it is handed, and that inner element is the real textbox — focusable, and where
  assistive technology lands. The name was on the container instead, so the field a user actually
  reaches was anonymous. It is now named through `editorProps`.
- **`aria-controls` referenced an id across a shadow boundary.** The toolbar and all thirteen tool
  buttons carried `aria-controls="forge-rte-content"`, but that id lives inside
  `forge-rich-text-content`'s shadow root. IDREF attributes cannot cross a shadow boundary, so all
  fourteen references were invalid — axe rates this critical. The relationship is now expressed with
  `ariaControlsElements`, which can cross a boundary, exposed on the editor context as
  `controlsElement`. It targets `forge-rich-text-editor` (or `forge-rich-text-context` when composed)
  rather than the editable element: element references only resolve into the same tree or an
  ancestor tree, and the editable element sits in a sibling branch. Feature-detected, so engines without ARIA element reflection simply carry no controls
  relationship.
- **The renderer advertised itself as an unnamed text input.** ProseMirror marks its element
  `role="textbox"` even when not editable, leaving the renderer as an unnamed, read-only text field.
  It is display surface, and the host already carries `role="article"` and the consumer's label, so
  the inner element now carries `role="presentation"` while its children keep their own semantics.

The new suite runs axe over the editable, readonly, disabled, counted and error states, the link
popover while open, a composed layout, and the renderer. All three defects were invisible to the
existing 600 specs, and two of those specs asserted the invalid `aria-controls` value as expected
behavior.

---
'@tylertech/forge-rich-text-editor': minor
'@tylertech/forge-rich-text-editor-angular': minor
---

Keep focus in the editor when undo or redo is used. Undo/redo was the only feature that rendered
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

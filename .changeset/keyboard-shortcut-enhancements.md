---
'@tylertech/forge': minor
---

Enhanced `forge-keyboard-shortcut` with scoped keyboard shortcut handling.

**New properties:** `anchor`, `anchorElement`, `scope`, `scopeElement`, `allowRepeat`, `fallthrough`, and `anchorAccessibility`.

**Behavior changes:**
- Closest scope wins: when the same key is bound in nested scopes, only the innermost scope containing the event target activates. Opt out with `fallthrough`.
- Broader typing suppression: `textarea`, `select`, `contenteditable`, and elements with `textbox`/`searchbox`/`combobox` roles now block activation by default.
- Held-key repeats ignored by default; opt in with `allow-repeat`.
- IME composition events (`isComposing`) are ignored.
- Keys already `defaultPrevented` by external handlers are ignored.
- `target` is deprecated in favor of `anchor` and `scope`.
- Missing targets warn via `console.warn` instead of `console.error`, and resolution always falls back to the parent element.

**Key sequences:** Multi-step keyboard shortcuts using `>` syntax (e.g. `Ctrl+K>Ctrl+C`). Two separate keydown events must be pressed in order within a 1-second timeout window. When a sequence start conflicts with a standalone shortcut, the standalone is deferred until the sequence completes or times out.

**New utilities:** `registerKeyboardShortcut()` imperative API, key aliases (`mod`, `ctrl`, `cmd`, `esc`, arrow shortcuts), `parseKeySequences()`, `matchChord()`, `formatKeyBinding()`, `formatAriaKeyShortcuts()`, platform detection.

**Accessibility:** `aria-keyshortcuts` is automatically set on the anchor element when `anchorAccessibility` is `'auto'` (the default). Multi-chord sequences are omitted from `aria-keyshortcuts` as the ARIA spec has no sequence syntax.

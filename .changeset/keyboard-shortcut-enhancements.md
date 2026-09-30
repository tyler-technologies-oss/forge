---
'@tylertech/forge': minor
---

Enhanced `forge-keyboard-shortcut` with scoped keyboard shortcut handling.

**New properties:** `anchor`, `anchorElement`, `scope`, `scopeElement`, `allowRepeat`, `fallthrough`, `anchorAccessibility`, and `action`. Set `action` to `'click'` to click the anchor element when the shortcut is activated (default: `'default'`, which only emits the event and invokes the callback). `action` is a property only and does not reflect to an attribute.

**Behavior changes:**

- Closest scope wins: when the same key is bound in nested scopes, only the innermost scope containing the event target activates. Opt out with `fallthrough`.
- Broader typing suppression: `textarea`, `select`, `contenteditable`, and elements with `textbox`/`searchbox`/`combobox` roles now block activation by default.
- Held-key repeats ignored by default; opt in with `allow-repeat`.
- IME composition events (`isComposing`) are ignored.
- Keys already `defaultPrevented` by external handlers are ignored.
- **Key syntax:** alternative bindings are now separated by a comma instead of a space (`a,b` instead of `a b`), because a space now separates the steps of a key sequence. A comma preceded by whitespace or `+`, or at the start of a binding, is the comma key itself (e.g. `Control+,`).
- `target` is deprecated in favor of `anchor` and `scope`.
- Missing targets warn via `console.warn` instead of `console.error`, and resolution always falls back to the parent element.

**Key sequences:** Multi-step keyboard shortcuts are defined by separating chords with a space (e.g. `Ctrl+K Ctrl+C`). Two separate keydown events must be pressed in order within a 1-second timeout window. When a sequence start conflicts with a standalone shortcut, the standalone is deferred until the sequence completes or times out.

**Key aliases:** `mod` (`meta` on Apple platforms, `control` elsewhere), `ctrl`, `cmd`, `command`, `option`, `esc`, `return`, `del`, and arrow aliases (`up`, `down`, `left`, `right`).

**New utilities:**

- `registerKeyboardShortcut()` registers a shortcut imperatively, without rendering an element. Options mirror the element's properties, and the returned registration exposes `dispose()`. Scope comes from `scopeElement`, `global`, or the nearest scope marker above `ownerElement`.
- `formatKeyboardShortcutBinding()` formats a key binding for display, using platform-appropriate modifier labels (`Ctrl+K Ctrl+C` on PC, `Cmd+K Cmd+C` on Apple platforms).

**Accessibility:** `aria-keyshortcuts` is automatically set on the anchor element when `anchorAccessibility` is `'auto'` (the default). Multi-chord sequences are omitted from `aria-keyshortcuts` as the ARIA spec has no sequence syntax.

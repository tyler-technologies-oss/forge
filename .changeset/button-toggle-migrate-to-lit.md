---
'@tylertech/forge': major
---

feat(button-toggle): migrate to Lit

**BREAKING CHANGE:** `forge-button-toggle` now extends `BaseLitElement` instead of `BaseComponent`. The `value`, `selected`, `disabled`, and `readonly` properties and attributes, the `forge-button-toggle-select` event, `focus()`/`click()` behavior, slots, parts, and CSS properties are unchanged.

- `ButtonToggleCore` and `ButtonToggleAdapter` have been removed.
- `IButtonToggleComponent` is deprecated and no longer includes the `WithElementInternals`, `WithDefaultAria`, and `WithFocusable` mixin members.
- The `aria-pressed` and `aria-disabled` state is now applied as part of Lit's asynchronous update cycle. Await `updateComplete` before inspecting it after changing `selected` or `disabled`.

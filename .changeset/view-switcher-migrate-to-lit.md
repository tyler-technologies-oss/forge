---
'@tylertech/forge': major
---

feat(view-switcher): migrate to Lit

**BREAKING CHANGE:** `forge-view-switcher` and `forge-view` now extend `BaseLitElement` instead of `BaseComponent`. The public properties, attributes, and methods are unchanged.

- Removed the exported `ViewSwitcherCore` and `ViewSwitcherAdapter` classes (and their interfaces).
- The `slide` and `fade` classes are no longer added to the host element. Use the `:state(slide)` and `:state(fade)` custom states instead.
- Changing `index` or `animationType` now updates the views as part of Lit's asynchronous update cycle. Await `updateComplete` before inspecting the views after changing a property.
- `index` and `animation-type` are no longer reflected as attributes when they are set to their default values.

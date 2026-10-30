---
'@tylertech/forge': major
---

feat(backdrop): migrate to Lit

**BREAKING CHANGE:** `forge-backdrop` now extends `BaseLitElement` instead of `BaseComponent`. The `visible` and `fixed` properties and attributes, the `show()`, `hide()`, `fadeIn()`, and `fadeOut()` methods, parts, CSS properties, and CSS classes are unchanged.

- The `fixed` attribute is now reflected as part of Lit's asynchronous update cycle. Await `updateComplete` before inspecting the attribute after setting the property.
- The `entering` and `exiting` animation classes are now applied as part of Lit's asynchronous update cycle.
- A `fadeIn()` or `fadeOut()` promise now resolves when its animation is interrupted by another visibility change or when the backdrop is disconnected, instead of never resolving.

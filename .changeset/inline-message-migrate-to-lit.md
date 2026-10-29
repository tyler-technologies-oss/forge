---
'@tylertech/forge': major
---

feat(inline-message): migrate to Lit

**BREAKING CHANGE:** `forge-inline-message` now extends `BaseLitElement` instead of `BaseComponent`. The `theme` property and attribute, slots, parts, CSS properties, and CSS classes are unchanged.

- The `theme` attribute is now reflected as part of Lit's asynchronous update cycle. Await `updateComplete` before inspecting the attribute after setting the property.

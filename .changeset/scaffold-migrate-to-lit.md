---
'@tylertech/forge': major
---

feat(scaffold): migrate to Lit

**BREAKING CHANGE:** `forge-scaffold` now extends `BaseLitElement` instead of `BaseComponent`. The `viewport` property and attribute, slots, parts, CSS properties, and CSS classes are unchanged.

- The `viewport` attribute is now reflected as part of Lit's asynchronous update cycle. Await `updateComplete` before inspecting the attribute after setting the property.

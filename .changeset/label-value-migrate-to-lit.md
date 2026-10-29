---
'@tylertech/forge': major
---

feat(label-value): migrate to Lit

**BREAKING CHANGE:** `forge-label-value` now extends `BaseLitElement` instead of `BaseComponent`. The `empty`, `ellipsis`, `inline`, and deprecated `dense` properties and attributes, slots, parts, CSS properties, and CSS classes are unchanged.

- The `empty`, `ellipsis`, and `inline` attributes are now reflected as part of Lit's asynchronous update cycle. Await `updateComplete` before inspecting the attributes after setting a property.

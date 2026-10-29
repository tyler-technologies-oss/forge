---
'@tylertech/forge': major
---

feat(chip-set): migrate to Lit

**BREAKING CHANGE:** `forge-chip-set` now extends `BaseLitElement` instead of `BaseComponent`. The public properties, attributes, slots, parts, CSS properties, and CSS classes are unchanged.

- Changing `type`, `dense`, `disabled`, `invalid`, or `theme` now reflects the attribute as part of Lit's asynchronous update cycle. Await `updateComplete` before inspecting the attributes after changing a property.
- `type` and `theme` are no longer reflected as attributes when they are set to their default values.
- The shadow DOM is now rendered as part of Lit's asynchronous update cycle. Await `updateComplete` after creating a chip set before focusing its chips.

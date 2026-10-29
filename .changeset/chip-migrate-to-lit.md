---
'@tylertech/forge': major
---

feat(chip): migrate to Lit

**BREAKING CHANGE:** `forge-chip` now extends `BaseLitElement` instead of `BaseComponent`. The public properties, attributes, methods, events, slots, parts, CSS properties, and CSS classes are unchanged.

- Removed the exported `ChipCore` and `ChipAdapter` classes (and their interfaces).
- `forge-chip-set` now shares its `type`, `dense`, `disabled`, `invalid`, and `theme` values with its chips using Lit context instead of reading from and writing to the chips directly.
- A chip no longer overwrites its own `type`, `dense`, `disabled`, `invalid`, or `theme` with the default value of its parent chip set when it connects.
- Changing chip properties now updates the rendered chip and reflected attributes as part of Lit's asynchronous update cycle. Await `updateComplete` before inspecting the shadow DOM or attributes after changing a property.
- `type` and `theme` are no longer reflected as attributes when they are set to their default values.
- The optional `href`, `target`, `download`, `rel`, and `removeButtonLabel` properties on `IChipComponent` are now typed as optional.

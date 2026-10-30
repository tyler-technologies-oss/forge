---
'@tylertech/forge': major
---

feat(circular-progress): migrate to Lit

**BREAKING CHANGE:** `forge-circular-progress` now extends `BaseLitElement` instead of `BaseComponent`. The `determinate`, `progress`, `theme`, and `track` properties and attributes, the `track` global configuration, slots, parts, and CSS properties are unchanged.

- `CircularProgressCore` and `CircularProgressAdapter` have been removed.
- `ICircularProgressComponent` is deprecated and no longer includes the `WithElementInternals` and `WithDefaultAria` mixin members.
- Reflected attributes, `aria-valuenow`, and the determinate/indeterminate template are now updated as part of Lit's asynchronous update cycle. Await `updateComplete` before inspecting them after changing a property.

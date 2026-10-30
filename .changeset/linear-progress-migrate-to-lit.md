---
'@tylertech/forge': major
---

feat(linear-progress): migrate to Lit

**BREAKING CHANGE:** `forge-linear-progress` now extends `BaseLitElement` instead of `BaseComponent`. The `determinate`, `progress`, `buffer`, and `theme` properties and attributes, slots, parts, and CSS properties are unchanged.

- `LinearProgressCore` and `LinearProgressAdapter` have been removed.
- `ILinearProgressComponent` is deprecated and no longer includes the `WithElementInternals` and `WithDefaultAria` mixin members.
- Reflected attributes, `aria-valuenow`, and the track and progress bar transforms are now updated as part of Lit's asynchronous update cycle. Await `updateComplete` before inspecting them after changing a property.

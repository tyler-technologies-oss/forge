---
'@tylertech/forge': major
---

feat(banner): migrate to Lit

**BREAKING CHANGE:** `forge-banner` now extends `BaseLitElement` instead of `BaseComponent`. The `dismissed`, `persistent`, `theme`, and deprecated `canDismiss` properties and attributes, the `forge-banner-before-dismiss` and `forge-banner-dismissed` events, slots, parts, CSS properties, and CSS classes are unchanged.

- `BannerCore` and `BannerAdapter` have been removed.
- `IBannerComponent` is deprecated and now extends `BaseLitElement`.
- Reflected attributes, the dismiss button visibility, the `inert` state, and the `has-icon` and `has-button` classes are now updated as part of Lit's asynchronous update cycle. Await `updateComplete` before inspecting them after changing a property.
- The `theme` attribute is no longer written when set to the default value (`info`).

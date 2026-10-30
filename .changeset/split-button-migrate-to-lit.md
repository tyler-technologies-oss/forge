---
'@tylertech/forge': major
---

feat(split-button): migrate to Lit

**BREAKING CHANGE:** `forge-split-button` now extends `BaseLitElement` instead of `BaseComponent`. The `variant`, `theme`, `disabled`, `dense`, and `pill` properties and attributes, slots, and CSS properties are unchanged.

- `SplitButtonCore` and `SplitButtonAdapter` have been removed.
- `ISplitButtonComponent` is deprecated and now extends `BaseLitElement`.
- Changes to split button properties are applied to the slotted buttons, and reflected as attributes, as part of Lit's asynchronous update cycle. Await `updateComplete` before inspecting the buttons after changing a property.
- The `variant` and `theme` attributes are no longer written when set to their default values (`text` and `primary`). Setting `variant` to `text` now matches the default styling that applies when the attribute is absent.

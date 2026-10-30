---
'@tylertech/forge': major
---

feat(split-view): migrate to Lit

**BREAKING CHANGE:** `forge-split-view` and `forge-split-view-panel` now extend `BaseLitElement` instead of `BaseComponent`. The properties, attributes, events, and the `layerSlottedPanels()`, `unlayerSlottedPanels()`, `refit()`, `getContentSize()`, `getCollapsibleSize()`, and `setContentSize()` methods are unchanged.

- **BREAKING:** The `update()` method on `forge-split-view` has been renamed to `updatePanels()` and the `update()` method on `forge-split-view-panel` has been renamed to `updatePanel()` because `update()` is Lit's reserved update lifecycle method.
- **BREAKING:** `ISplitViewUpdateConfig` no longer has `orientation` or `properties`. A split view now shares its `orientation`, `disabled`, `allowClose`, `autoClose`, and `autoCloseThreshold` properties with its panels through Lit context.
- `SplitViewCore`, `SplitViewAdapter`, `SplitViewPanelCore`, and `SplitViewPanelAdapter` have been removed. Their resize operations used by the exported utility functions are now described by `ISplitViewPanelResizeAdapter`, which replaces `ISplitViewPanelAdapter`.
- `ISplitViewComponent` and `ISplitViewPanelComponent` are deprecated and now extend `BaseLitElement`.
- Property changes are now applied as part of Lit's asynchronous update cycle. Await `updateComplete` on the split view and its panels before expecting the rendered result of a change, including changes that a split view makes to its panels.
- A panel attribute set to `false`, such as `disabled="false"`, now keeps the panel's value instead of reverting to inheriting from the split view.

---
'@tylertech/forge': major
---

feat(label): migrate to Lit

**BREAKING CHANGE:** `forge-label` now extends `BaseLitElement` instead of `BaseComponent`. The `for`, `forElement`, `clickTarget`, `dynamic`, `nonInteractive`, and `legend` properties, and the `forge-label-connected` event are unchanged.

- **BREAKING:** The `update()` method has been renamed to `updateTargetLabel()` because `update()` is Lit's reserved update lifecycle method. Replace `label.update()` with `label.updateTargetLabel()`.
- `LabelCore` and `LabelAdapter` have been removed.
- `ILabelComponent` is deprecated and now extends `BaseLitElement`.
- Changes to `for`, `forElement`, `dynamic`, `nonInteractive`, and `legend` made after the label is connected are now applied as part of Lit's asynchronous update cycle. Await `updateComplete` before expecting the target element to be notified after changing a property.
- The `for` attribute is removed when the property is set to an empty value.

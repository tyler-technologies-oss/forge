---
'@tylertech/forge': major
---

feat(file-picker): migrate to Lit

**BREAKING CHANGE:** `forge-file-picker` now extends `BaseLitElement` instead of `BaseComponent`. The `accept`, `maxSize`, `capture`, `multiple`, `disabled`, `compact`, and `borderless` properties, the `forge-file-picker-change` event, and `FilePickerComponentDelegate` are unchanged.

- `FilePickerCore` and `FilePickerAdapter` have been removed.
- `IFilePickerComponent` is deprecated and now extends `BaseLitElement`.
- Property changes are now applied as part of Lit's asynchronous update cycle. Await `updateComplete` before expecting the rendered `<input>`, the highlight, or the slotted button's `disabled` attribute to reflect a change.
- Removing the `max-size` attribute now sets `maxSize` to `null` instead of `0`.
- The `accept` and `capture` attributes are removed when the property is set to an empty value.

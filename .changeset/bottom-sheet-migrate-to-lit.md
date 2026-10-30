---
'@tylertech/forge': major
---

feat(bottom-sheet): migrate to Lit

**BREAKING CHANGE:** `forge-bottom-sheet` now extends `BaseLitElement` instead of `BaseComponent`. The `open`, `mode`, `persistent`, and `fullscreen` properties and all `forge-bottom-sheet-*` events are unchanged.

- `BottomSheetCore` and `BottomSheetAdapter` have been removed.
- `IBottomSheetComponent` is deprecated and now extends `BaseLitElement`. It no longer extends `IWithDefaultAria` or `IWithElementInternals`.
- The internal `<forge-dialog>` is now rendered as part of Lit's asynchronous update cycle. Await `updateComplete` before accessing it after the bottom sheet connects, and before expecting its `mode`, `persistent`, or fullscreen class to reflect a property change. Opening and closing, and their events, are still synchronous once the bottom sheet has rendered.
- A bottom sheet that is open when it first connects now opens, and dispatches `forge-bottom-sheet-open`, after its first render instead of synchronously.
- The `open` attribute is now removed when the bottom sheet is dismissed through the backdrop or the escape key. It was previously left on the element.
- `aria-modal` now updates when `mode` changes instead of only being set when the bottom sheet connects.
- Opening a bottom sheet no longer sets an `open` attribute on `document.body`.

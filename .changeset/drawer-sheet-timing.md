---
'@tylertech/forge': patch
---

Drawers, modal drawers and sheet dialogs (the `left-sheet`, `right-sheet`, `top-sheet` and `bottom-sheet` presets) now open in 500ms and close in 400ms, instead of 250ms and 200ms (300ms and 200ms for sheets), so large surfaces sliding in from an edge feel calm rather than abrupt. Centered and full-screen dialogs open in 250ms and close in 200ms, instead of 200ms and 150ms.

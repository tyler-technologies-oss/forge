---
'@tylertech/forge': patch
---

fix(focus-indicator): keep the focus indicator on its anchor when the layout shifts, such as when a page scrollbar disappears. The position is now checked every frame while the indicator is active.

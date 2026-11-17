---
'@tylertech/forge': patch
---

Dragging a bottom sheet does less work per move. It updates the sheet's height at most once per frame, and sets it on the dialog surface directly instead of through an inherited `--forge-dialog-max-height` custom property, which made the browser recalculate styles for everything inside the sheet on every move.

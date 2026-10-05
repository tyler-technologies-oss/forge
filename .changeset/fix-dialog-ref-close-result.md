---
'@tylertech/forge-angular': patch
---

Fixed `DialogRef.afterClosed` emitting `undefined` instead of the provided result when the dialog uses `animationType: 'none'`.

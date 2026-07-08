---
'@tylertech/forge': patch
---

fix(time-picker): preserve typed leading zeros so a completed segment does not coerce the next digit (e.g. `0205` now yields `02:05`)

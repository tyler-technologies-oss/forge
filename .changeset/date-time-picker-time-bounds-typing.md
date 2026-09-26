---
'@tylertech/forge': patch
---

fix(date-time-picker): type `minTime`/`maxTime` as `string` instead of the narrowed default literal values (`'09:00'`/`'17:00'`), so consumers can assign any time string without a type error.

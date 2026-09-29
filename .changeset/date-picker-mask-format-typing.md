---
'@tylertech/forge': patch
---

fix(date-picker): Emit `forge-date-picker-change` when the input value is coerced to a different date on blur.
fix(date-picker): When `showMaskFormat` is enabled, single digit months and days are now padded when the
cursor moved to the next segment (typing `42125` produces `04/21/25`), and typing `/` after a single digit pads that
segment.

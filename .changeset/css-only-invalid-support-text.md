---
'@tylertech/forge': patch
---

`.forge-support-text` uses `text-critical` when it directly follows an invalid CSS-only `.forge-field`. A new `.forge-support-text--invalid` modifier applies the same color when the support text is not adjacent to the field.

---
'@tylertech/forge': patch
---

Plain fields no longer draw an error or warning border, which overlapped the text because plain fields have no inline padding. The status icon and support text carry the invalid and warning states. The focus indicator on plain fields, including the CSS-only `.forge-field--plain`, now sits 4px outside the field so it no longer touches the text.

---
'@tylertech/forge': patch
---

Tonal fields now use the `control-bg-tonal` background and no longer change on hover. Previously the dark theme background was slate 2, which disappeared on hover and on slate 2 surfaces such as cards. The CSS-only `.forge-field--tonal` uses the same background instead of `primary-container-low`. `--forge-field-tonal-background-hover` is deprecated and has no effect.

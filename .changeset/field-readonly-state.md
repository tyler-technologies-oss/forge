---
'@tylertech/forge': minor
---

Added a readonly state to `forge-field`. Readonly outlined and filled fields use a transparent background (`--forge-field-readonly-background`) and the `outline-low` border (`--forge-field-readonly-outline-color`), with no hover change. `forge-text-field` follows the slotted input's `readonly` attribute, `forge-select` passes its `readonly` property to the field, and the CSS-only `.forge-field` applies the state when its input or textarea is readonly.

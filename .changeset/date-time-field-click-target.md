---
'@tylertech/forge': patch
---

fix(date-time-field): focus the nearest masked input when clicking empty space in the field

The masked date/time inputs are fixed-width and left-aligned, so when the field is wider than its input row (e.g. a long label or support text), clicking the empty area to the right of the inputs focused nothing. Pressing anywhere on the field's input row now focuses the nearest input, matching a native field where the single input fills the box. Previously this dead zone was only hidden on picker-linked fields, where the trailing toggle button happened to absorb the clicks.

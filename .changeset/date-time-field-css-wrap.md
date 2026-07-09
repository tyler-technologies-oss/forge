---
'@tylertech/forge': minor
---

feat(date-time-field): CSS-driven responsive layout, label variations, and placeholder/show-mask

The field now wraps its inputs by endpoint (start over end) when its container is
too narrow, instead of swapping to a viewport-driven mobile display. This makes the
layout respond to the field's own width rather than the viewport. The embedded field
forwards `label-position`, `label-alignment`, `variant`, `density`, `shape`, and
`theme` for full label and appearance control.

Adds `show-mask` (on by default) and `persist-mask`. With `show-mask` on, the format
guide appears when the field is engaged (focused or holding a value) and hides at rest
so the inset label / placeholder shows through — the inset label rests inside the field
and floats on focus, like a normal text field. `persist-mask` pins the guide on even at
rest. With `show-mask` off the guide never auto-shows. A `placeholder` (non-inset label)
shows the resting hint; an inset label rests as its own placeholder.

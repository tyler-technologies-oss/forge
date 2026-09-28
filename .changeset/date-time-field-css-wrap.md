---
'@tylertech/forge': minor
---

feat(date-time-field): add `show-mask` and `persist-mask`

Adds `show-mask` (on by default) and `persist-mask`. With `show-mask` on, the format
guide appears when the field is engaged (focused or holding a value) and hides at rest
so the inset label / placeholder shows through — the inset label rests inside the field
and floats on focus, like a normal text field. `persist-mask` pins the guide on even at
rest. With `show-mask` off the guide never auto-shows. An input `placeholder` (non-inset label)
shows the resting hint; an inset label rests as its own placeholder.

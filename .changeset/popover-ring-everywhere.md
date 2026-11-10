---
'@tylertech/forge': patch
---

fix(popover): every popover edge, including the arrow, is a 1px ring drawn outside the surface in both themes, using Radix's panel ring colors. Popovers with an arrow no longer use a border, so they are no longer 2px larger than popovers without one

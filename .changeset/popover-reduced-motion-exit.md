---
'@tylertech/forge': patch
---

Popovers now fade out when the user prefers reduced motion, matching how they fade in, instead of disappearing at once. The popover docs now list the animation tokens that exist (`--forge-popover-animation-enter-duration`, `--forge-popover-zoom-exit-timing` and so on). The old names in the docs, such as `--forge-popover-zoom-duration`, never had any effect.

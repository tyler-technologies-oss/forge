---
'@tylertech/forge': patch
---

Popovers and dialogs now open and close with subtler, faster motion. Zoom animations start from 96% scale instead of 80%, and exits use the `easing-decelerate` curve instead of an accelerating curve. Dialogs enter in 200ms (was 250ms) and exit in 150ms (was 100ms). Fullscreen dialogs fade in with a short rise instead of zooming, and fade out. The `slide` animation type now moves dialogs 16px instead of 30% of their height, and popovers 8px instead of 24px. The popover `fade` type now enters in 150ms (was 300ms), matching the other types. Sheet presets slide without fading, over 300ms in and 200ms out with `easing-emphasized-decelerate`. With reduced motion, popovers fade instead of not animating. Adds the `--forge-dialog-fullscreen-translate`, `--forge-dialog-preset-sheet-enter-animation-easing`, and `--forge-dialog-preset-sheet-exit-animation-easing` tokens.

---
'@tylertech/forge': minor
---

Toasts now slide and fade in and out over 400ms with `easing-gentle`, using CSS transitions instead of keyframe animations. Showing a toast again while it's closing turns it around from where it is, instead of restarting the animation. Under reduced motion, toasts fade without sliding. The default `--forge-toast-enter-duration` and `--forge-toast-exit-duration` are now 400ms, and `--forge-toast-enter-timing` and `--forge-toast-exit-timing` default to `easing-gentle`.

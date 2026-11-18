---
'@tylertech/forge': minor
---

feat(app-bar): make the notification button's badge strong and color it with new `--forge-app-bar-badge-background` and `--forge-app-bar-badge-color` tokens (amber on the brand app bar, red in dark theme and on the white app bar). Setting `theme` on the button still wins. Adds a `max` property (default 99) that shows larger counts as `99+`, and makes one-digit counts circles.

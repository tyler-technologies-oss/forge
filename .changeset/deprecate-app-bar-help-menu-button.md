---
'@tylertech/forge': minor
---

feat(app-bar): deprecate `forge-app-bar-menu-button` and `forge-app-bar-help-button`

`forge-app-bar-menu-button` and `forge-app-bar-help-button` are deprecated and will be removed in a future version. Use a `forge-icon-button` in the app bar's `start` slot in place of the menu button, and a `forge-icon-button` wrapped in a `forge-menu` in the `end` slot in place of the help button.

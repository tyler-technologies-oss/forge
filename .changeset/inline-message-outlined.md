---
'@tylertech/forge': minor
---

Inline message backgrounds now use the `bg-{role}-default` (a3) tokens, and the text and icon are tinted with the theme color. A new `variant="outlined"` (or the `forge-inline-message--outlined` class) uses a lighter `bg-{role}-subtle` (a2) background with an inset `border-{role}-subtle` (a6) ring, at the same height as the default `tonal` variant. The `--forge-inline-message-border-width`, `--forge-inline-message-border-style`, and `--forge-inline-message-border-color` properties are deprecated and will be removed in the next major.

**Migration:** if you set `--forge-inline-message-border-style: solid` to add a border, use `variant="outlined"` instead.

---
'@tylertech/forge': minor
---

Dialogs and raised cards now draw the same hairline ring as popovers, using the new `surface-elevated-ring` theme token, so elevated surfaces keep a visible edge in dark theme. Use `--forge-dialog-ring-width`/`--forge-dialog-ring-color` and `--forge-card-raised-ring-width`/`--forge-card-raised-ring-color` to adjust them. The popover ring now uses the same token, which removes its dark theme override.

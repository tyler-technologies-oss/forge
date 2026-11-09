---
'@tylertech/forge': minor
'@tylertech/forge-tokens': minor
---

Added an optional Radix-based theme. Load `forge-radix.css` after `forge.css` to opt in, and `forge-radix-dark.css` for dark mode. Both are available from `@tylertech/forge/dist` and the CDN. The default theme is unchanged. `@tylertech/forge-tokens` adds the `radix-color-palette`, `radix-color-palette-dark`, and `radix-theme` Sass modules.

`forge-radix-dark.css` replaces `forge-dark.css` and should not be loaded with it. Adds the `--forge-card-raised-background`, `--forge-toolbar-backdrop-filter`, `--forge-field-default-outline-color`, and `--forge-field-default-outline-color-hover` tokens, which default to the existing rendering. The new `tokens/theme/radix-light.json` and `radix-dark.json` files live alongside the default theme files, so tooling that globs `tokens/theme/*.json` will see them.

---
'@tylertech/forge': minor
---

Banners now use a neutral default and four semantic themes: `info`, `success`, `warning`, and `error`, with `critical` as an alias for `error` and `danger` still supported. The `primary`, `secondary`, `tertiary`, and `info-secondary` themes are deprecated and render as the neutral default. Backgrounds use the `bg-{role}-default` (a3) tokens, and text, icons, and buttons are tinted with the theme color. A new `variant="outlined"` (or the `forge-banner--outlined` class) uses a lighter `bg-{role}-subtle` (a2) background, a rounded corner, and an inset `border-{role}-subtle` (a6) ring, at the same height as the default `tonal` variant.

**Migration:** a banner without a `theme` (including the CSS-only `.forge-banner`) was blue and is now neutral. Add `theme="info"` to keep the blue appearance.

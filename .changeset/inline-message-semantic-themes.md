---
'@tylertech/forge': minor
---

Inline messages now use a neutral default and four semantic themes: `info` (blue), `success` (green), `warning` (amber), and `error` (red), with `critical` as an alias for `error` and `danger` still supported. The `primary`, `secondary`, `tertiary`, and `info-secondary` themes are deprecated and render as the neutral default. Optional borders use the `border-{role}-default` tokens.

**Migration:** an inline message without a `theme` (including the CSS-only `.forge-inline-message`) was blue and is now neutral. Add `theme="info"` to keep the blue appearance.

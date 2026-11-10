---
'@tylertech/forge': minor
---

Badges now use the same semantic themes as banners and inline messages: a neutral default plus `info`, `success`, `warning`, and `error`, with `critical` and `danger` rendering as `error` and `info-primary` as `info`. The `primary`, `secondary`, `tertiary`, and `info-secondary` themes are deprecated and render as the default. Tonal badges use the `bg-{role}-default` (a3) background with a12 text. A new `variant="outlined"` uses an a2 background with an inset a6 ring, and setting it turns off `strong` (setting `strong` resets the variant to `tonal`). A new `color` attribute accepts any of 26 Radix hues, such as `color="plum"`, for badges that label a category, and takes precedence over `theme`. Strong badges use the accent `solid` step so every theme and color meets WCAG AA contrast in both themes. The CSS-only badge adds `forge-badge--outlined` and `forge-badge--strong` classes.

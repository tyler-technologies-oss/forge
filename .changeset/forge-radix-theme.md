---
'@tylertech/forge': minor
'@tylertech/forge-tokens': minor
---

Added an optional Radix-based theme. Load `forge-radix.css` after `forge.css` to opt in, and `forge-radix-dark.css` for dark mode. Both are available from `@tylertech/forge/dist` and the CDN. The default theme is unchanged. `@tylertech/forge-tokens` adds the `radix-color-palette`, `radix-color-palette-dark`, `radix-theme`, and `radix-typography` Sass modules. The Radix stylesheets also set the Radix typography values (weights, letter spacing, and label sizes) and add the code, numbers, helper, and badge typography styles as `--forge-typography-*` custom properties.

`forge-radix-dark.css` replaces `forge-dark.css` and should not be loaded with it. Adds the `--forge-card-raised-background`, `--forge-toolbar-backdrop-filter`, `--forge-field-default-outline-color`, and `--forge-field-default-outline-color-hover` tokens, which default to the existing rendering. The new `tokens/theme/radix-light.json` and `radix-dark.json` files live alongside the default theme files, so tooling that globs `tokens/theme/*.json` will see them.

Also adds the `--forge-table-theme-border-color`, `--forge-split-view-handle-color`, `--forge-dialog-scrollable-border-color`, `--forge-calendar-menu-border-color`, and `--forge-calendar-theme-today-color` custom properties, which default to the existing border and accent colors.

Adds a `readonly` property and attribute to `forge-field` (followed by `forge-text-field` from its input and forwarded by `forge-select`) with the `--forge-field-readonly-background` and `--forge-field-readonly-outline-color` properties, which default to the current field colors. Also adds the `--forge-card-raised-outline-color`, `--forge-popover-ring-width`, `--forge-popover-ring-color`, `--forge-popover-arrow-ring-width`, `--forge-modal-drawer-elevation`, `--forge-step-selected-label-color`, `--forge-step-error-label-color`, and `--forge-toast-focus-indicator-color` custom properties, which default to the existing rendering.

The Radix stylesheet renders the legacy badge, banner, and inline message themes (`primary`, `secondary`, `tertiary`, and `info-secondary`) with the Radix neutral colors, and the `info`, `success`, `warning`, `error`, and `danger` themes with the Radix role colors.

Adds the `--forge-color-picker-slider-thumb-shadow`, `--forge-color-picker-preview-shadow`, `--forge-color-picker-preview-ring-shadow`, `--forge-color-picker-input-focus-color`, `--forge-color-picker-gradient-thumb-size`, `--forge-color-picker-gradient-thumb-border-width`, and `--forge-color-picker-gradient-thumb-shadow` custom properties, which default to the existing rendering. The CSS-only `.forge-field` now reads `--forge-field-default-outline-color` and `--forge-field-default-outline-color-hover` too.

The color picker opacity track now fills with the selected color, the gradient and slider thumbs show a focus indicator when focused, and the value inputs now animate their border color on focus (the transition named a misspelled property).

Adds the `--forge-chip-border-tint` and `--forge-chip-invalid-border-tint` custom properties. The chip border color is now drawn as an outline over the tinted border, which is transparent by default. Default chips render the same except for sub-pixel anti-aliasing along the rounded edge of selected chips.

Adds the `--forge-calendar-menu-background` custom property, which defaults to the current surface colors. The calendar date view is now hidden, with a short fade, while the month or year menu is open, so the menu can be transparent.

Adds a faint 1px ring around the default dialog, non-modal dialog, and modal drawer, drawn from `outline-low`. Override it with `--forge-dialog-elevation`, `--forge-dialog-nonmodal-elevation`, or `--forge-modal-drawer-elevation`. The popover is unchanged.

Adds `critical` to the `theme` of `forge-badge`, `forge-banner`, and `forge-inline-message` (an alias of `error`) and marks the legacy `primary`, `secondary`, `tertiary`, `info-primary`, `info-secondary`, and `danger` values as deprecated without changing how they render. Adds the `variant` property (`tonal` or `outlined`) to the three components, the `color` property to `forge-badge`, and the CSS-only `forge-badge--strong`, `forge-badge--outlined`, `forge-banner--outlined`, and `forge-inline-message--outlined` classes. The new properties are `--forge-badge-outlined-*`, `--forge-badge-strong-background`, `--forge-badge-strong-color`, `--forge-banner-outlined-*`, `--forge-banner-shape`, `--forge-banner-min-height`, `--forge-banner-dismissible-padding-inline-end`, and `--forge-inline-message-outlined-*`, which default to the existing rendering. `@tylertech/forge-tokens` adds the `--forge-color-<hue>-*` accent custom properties to the Radix themes.

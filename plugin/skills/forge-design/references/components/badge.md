# Badge

Badges display small amounts of non-interactive information like counts, status indicators, or notifications.

## Overview

Badges are used to highlight an item's status for quick recognition. They are non-interactive and are typically used to convey information such as a count, status, or category.

## Usage

`forge-badge` communicates a status, count, or short label through theme, strong, and dot. Reserve badges for glanceable, non-interactive information; reach for a [chip](./chip.md) instead when the element needs to support selection or filtering.

## Rules

**Do**

- Use consistent color meanings across your application so users can learn and recognize status patterns.
- Position badges consistently in relation to their associated content.
- Keep badge content to a word, short label, or number.
- Use the default, muted theme when many badges appear on screen, such as in a long table.
- Reserve strong for views where only a few badges need extra emphasis.
- Limit to one badge per record.

**Don't**

- Don’t mix color meanings.
- Don't use a badge for a long phrase or sentence.
- Don't stack more than one badge on a single record.
- Don't use a badge for interactive selection or filtering — use a chip instead.
- Don’t override established color conventions without good reason.

## Theme

Badges default to a neutral theme. Use a semantic theme — `info`, `success`, `warning`, or `error` — to reinforce the meaning of the status being shown. `critical` is an alias for `error`. The `primary`, `secondary`, `tertiary`, and `info-secondary` themes are deprecated and render as the neutral default, and `info-primary` renders as `info`. To label a category rather than a status, use `color` instead.

Example (Every theme in its default, muted appearance.): `get_forge_blocks(blockId: "components/badge/themed/themed")`

## Strong

Set the `strong` attribute for a bolder fill when a badge needs to stand out. Reserve it for views where only a few badges are visible at once — overusing strong across a dense view defeats the emphasis.

Example (The same themes rendered with strong for more visual weight.): `get_forge_blocks(blockId: "components/badge/strong/strong")`

## Outlined

Set `variant="outlined"` for a lighter background with a border in the same color. Outlined and strong are mutually exclusive: setting `variant="outlined"` turns off `strong`, and setting `strong` resets the variant to `tonal`.

```html
<forge-badge theme="success" variant="outlined">Approved</forge-badge>
```

## Color

Set `color` to a Radix hue when a badge labels a category, like a department or tag, rather than a status. The available hues are `gray`, `gold`, `bronze`, `brown`, `yellow`, `amber`, `orange`, `tomato`, `red`, `ruby`, `crimson`, `pink`, `plum`, `purple`, `violet`, `iris`, `indigo`, `blue`, `cyan`, `teal`, `jade`, `green`, `grass`, `lime`, `mint`, and `sky`. Colors work with the tonal, outlined, and strong appearances and meet WCAG AA contrast in both themes. When both are set, `color` controls the appearance.

```html
<forge-badge color="plum">Design</forge-badge>
<forge-badge color="teal" variant="outlined">Engineering</forge-badge>
<forge-badge color="amber" strong>Marketing</forge-badge>
```

Don't use color to convey status — use a theme so the meaning stays consistent across the product.

## With an icon

Pair a badge's label with a leading icon via the `start` slot to reinforce its meaning.

Example (An icon in the start slot reinforces the badge's label.): `get_forge_blocks(blockId: "components/badge/with-icon/with-icon")`

## On an icon button

Pass a badge into an icon button's `badge` slot to overlay a count, most often for unread or new content.

Example (A numeric badge overlaid on an icon button.): `get_forge_blocks(blockId: "components/badge/with-icon-button/with-icon-button")`

## Dot

Set `dot` to render the badge as a small dot with no visible content — useful for signaling unread content without a count.

Example (A dot badge signals unread content without a count.): `get_forge_blocks(blockId: "components/badge/dot/dot")`

## Accessibility

### Color and contrast

A badge conveys status largely through color — pair that color with an icon or other visual cue for users with color vision deficiencies, and make sure its foreground text meets WCAG 2.2 contrast requirements against the background.

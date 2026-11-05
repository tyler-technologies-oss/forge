# Count Card

A count card displays a count or key metric with an icon and label, for dashboards and summary views.

## Overview

A count card highlights a single number or metric alongside an icon and a short label, so people can scan key figures at a glance. It's built for dashboards and summary views, where several count cards sit side by side to summarize the state of a system.

Count cards can carry supporting details, such as a trend badge, a progress meter, or a sparkline, and a card-level action menu.

## Usage

`forge-count-card` is built from named slots (`icon`, `label`, `header-end`, `action`, `count`, `count-end`, `body`, and `full-width`) plus `theme` to apply semantic color and `no-border` to remove the border. Every slot is optional, but include at least an icon and a count, and use the same slots across the cards on a page so they stay aligned in a grid. Put a `forge-icon-button` in `action`, not `header-end`, so its 48px touch target aligns correctly. Use a count card for a single metric; for a general container with a header, body, and footer, use a [structured card](./structured-card.md) instead.

## Rules

**Do**

- Use the same slots across all count cards on a page, and always include an icon and a count.
- Keep labels short so they fit on one line.
- Put icon buttons in the action slot, not header-end.
- Use theme to convey meaning, like success or error, and pair color with text or an icon.
- Arrange several count cards in a responsive grid.

**Don't**

- Don't use a count card for content that isn't a single metric.
- Don't put long text or complex layouts in the count slot.
- Don't rely on theme color alone to communicate status.
- Don't mix cards with different structures in the same row.

## Basic usage

Slot an icon, a label, and a count. Add a badge to `header-end` for supporting context.

Example (A count card with an icon, label, header badge, and count.): `get_forge_blocks(blockId: "components/count-card/demo/demo")`

## Multiple cards

Count cards work well in a grid to build a dashboard-style summary.

Example (Four count cards in a responsive grid.): `get_forge_blocks(blockId: "components/count-card/multiple-cards/multiple-cards")`

## With full width

Use the `full-width` slot for content that spans the card's width below the count, such as a sparkline or progress indicator.

Example (A count card with a sparkline spanning its full width.): `get_forge_blocks(blockId: "components/count-card/with-full-width/with-full-width")`

## Additional body content

Use the `body` slot to add supporting content below the count, such as a progress meter or a last-updated time.

Example (A count card with a trend badge, a meter, and a last-updated line in the body.): `get_forge_blocks(blockId: "components/count-card/additional-body-content/additional-body-content")`

## With menu

Use the `action` slot to add an icon button that opens a card-level menu.

Example (A count card with an icon button that opens an options menu.): `get_forge_blocks(blockId: "components/count-card/with-menu/with-menu")`

## Themes

Set `theme` to `primary`, `secondary`, `tertiary`, `success`, `error`, `warning`, `info`, or `info-secondary` to apply semantic color. The default is `none`.

Example (Count cards in each available theme.): `get_forge_blocks(blockId: "components/count-card/themes/themes")`

## Accessibility

### Screen reader behavior

A count card has no role of its own: its icon, label, count, and other slotted content are read in order as ordinary content. Keep the label and count as plain text so they read naturally in sequence, such as "Revenue $12,450.00". The label and count also show a tooltip with their full text.

### Labeling

Always slot a text `label` so the count has context. Decorative icons in the `icon` slot don't need a name, but an `aria-label` is required on any `forge-icon-button` in the `action` slot, such as "More options".

```html
<forge-count-card>
  <forge-icon slot="icon" name="people"></forge-icon>
  <span slot="label">Total users</span>
  <span slot="count">1,234</span>
  <forge-icon-button slot="action" aria-label="More options">
    <forge-icon name="more_vert"></forge-icon>
  </forge-icon-button>
</forge-count-card>
```

### Color and contrast

Themes change the card's colors, but color shouldn't be the only signal of meaning. Pair a `success`, `error`, or `warning` theme with text or an icon, such as a badge reading "Over budget".

### Keyboard interaction

The card itself isn't focusable. Interactive content you slot into it, such as the `action` icon button, is reachable in its normal order with Tab and activated with Enter or Space.

For a progress indicator in the `body` or `full-width` slot, such as `forge-meter`, give it an accessible label that describes what it measures. Add text alternatives for charts like sparklines.

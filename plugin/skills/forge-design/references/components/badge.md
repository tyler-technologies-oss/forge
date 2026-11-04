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

Badges default to a neutral theme. Use a semantic theme — `success`, `warning`, `error`, `info` — to reinforce the meaning of the status being shown, or `primary`/`secondary`/`tertiary` to match the badge to its surrounding context.

Example (Every theme in its default, muted appearance.): `get_forge_blocks(blockId: "components/badge/themed/themed")`

## Strong

Set the `strong` attribute for a bolder fill when a badge needs to stand out. Reserve it for views where only a few badges are visible at once — overusing strong across a dense view defeats the emphasis.

Example (The same themes rendered with strong for more visual weight.): `get_forge_blocks(blockId: "components/badge/strong/strong")`

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

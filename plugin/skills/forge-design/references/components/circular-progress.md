# Circular Progress

Circular progress indicators display progress along a circular track, for both determinate and indeterminate waits.

## Usage

`forge-circular-progress` communicates that a single component or a small area of the page is loading or changing, through `determinate`, `progress`, `theme`, and `track`. Place it close to the content it describes, such as inside a [button](./button.md), a list item, or a card, rather than for the whole page. For a page-level or full-region block, use a busy indicator instead, and for a horizontal, linear alternative, use a [linear progress](./linear-progress.md) indicator instead.

## Rules

**Do**

- Only show a progress indicator when the expected wait is more than a second.
- Place the indicator inside or directly beside the specific content that's loading or changing.
- Pick one indicator style — linear or circular — for a given action, and use it consistently everywhere that action appears.

**Don't**

- Don't show more than one spinner on a single page at once — use a busy indicator or a parent-level indicator instead.
- Don't mix linear and circular indicators for the same kind of activity in different parts of the app.
- Don't use a circular progress indicator for a full-page load — use a busy indicator instead.

## Basic usage

An indeterminate spinner is the default — it animates continuously with no specific progress value.

Example (An indeterminate circular progress indicator.): `get_forge_blocks(blockId: "components/circular-progress/demo/demo")`

## Determinate

Set `determinate` and `progress` (a value from `0` to `1`) when the actual completion percentage is known.

Example (A determinate indicator showing a specific completion percentage.): `get_forge_blocks(blockId: "components/circular-progress/determinate/determinate")`

## Theme and track

Set `theme` to match the indicator's surrounding context, and `track` to keep its background ring visible.

Example (A themed indicator with its track visible.): `get_forge_blocks(blockId: "components/circular-progress/theme-and-track/theme-and-track")`

## Accessibility

### Screen reader behavior

Always set a meaningful `aria-label` on the progress indicator — without one, a screen reader has no way to tell the user what's loading.

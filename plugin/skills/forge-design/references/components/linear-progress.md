# Linear Progress

Linear progress indicators display progress by animating along a horizontal track, for both determinate and indeterminate waits.

## Usage

`forge-linear-progress` communicates that a component is loading through `determinate`, `progress`, `buffer`, and `theme`. Reach for it at the bottom of a field, dropdown, or expansion panel; for a spinner that fits inside a smaller component like a button, list item, or card, use a [circular progress](./circular-progress.md) indicator instead.

## Rules

**Do**

- Only show a progress indicator when the expected wait is more than a second.
- Use determinate progress whenever the completion rate is actually known.
- Pick one indicator style — linear or circular — for a given action, and use it consistently everywhere that action appears.

**Don't**

- Don't mix linear and circular indicators for the same kind of activity in different parts of the app.
- Don't fake a determinate value — use indeterminate when the actual completion rate is unknown.
- Don't use a linear progress indicator for a full-page load — use a busy indicator instead.

## Basic usage

An indeterminate bar is the default — it animates continuously with no specific progress value.

Example (An indeterminate linear progress indicator.): `get_forge_blocks(blockId: "components/linear-progress/demo/demo")`

## Determinate

Set `determinate` and `progress` (a value from `0` to `1`) when the actual completion percentage is known.

Example (A determinate indicator showing a specific completion percentage.): `get_forge_blocks(blockId: "components/linear-progress/determinate/determinate")`

## Buffer

Set `buffer` (a value from `0` to `1`) alongside `progress` to show a second, lighter fill for content that's ready but not yet the active position — the pattern used by media scrubbers.

Example (A buffered indicator shows progress and a secondary buffered amount together.): `get_forge_blocks(blockId: "components/linear-progress/buffer/buffer")`

## Theme

Set `theme` to match the indicator to its surrounding context.

Example (A themed linear progress indicator.): `get_forge_blocks(blockId: "components/linear-progress/theme/theme")`

## Accessibility

### Labeling

Give the progress bar a meaningful `aria-label` so screen reader users know what's loading — without one, a purely visual indicator conveys nothing to assistive technology.

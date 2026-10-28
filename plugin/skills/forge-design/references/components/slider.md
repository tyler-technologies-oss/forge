# Slider

Sliders allow users to make selections from a range of values.

## Overview

Sliders reflect a range of values along a bar, from which users may select a single value or a range. They are ideal for adjusting settings such as volume, brightness, or applying image filters.

Sliders can be somewhat difficult to manipulate, so they should be used when an approximate value is good enough. When using sliders, consider the unit. If only whole numbers can be chosen, for example, default the slider to use whole values only.

## Usage

`forge-slider` selects a value — or, with `range`, a start and end value — along a bounded track through `min`, `max`, `step`, `tickmarks`, and `labeled`, and participates in form submission via `name`. Reserve it for a value that's fine to be approximate; when a user needs to enter a known, specific number, use a [text field](./text-field.md) instead.

## Rules

**Do**

- Use a slider when an approximate value is good enough and dragging gives immediate feedback, like volume or a filter range.
- Keep the current value's label visible so users aren't guessing where the handle sits.
- Live-update any dependent results as the handle drags, not just after it's released.
- Offer a text field alternative alongside a slider when a user might want to enter an exact value.

**Don't**

- Don't use a slider for a binary on/off setting — use a switch instead.
- Don't use a slider when a user needs to enter a known, specific value — use a text field instead.
- Don't hide the current value's label unless space is truly constrained.
- Don't use a slider when the range is very large making it difficult to select specific values accurately.

## Range

Set `range` to render two handles — `valueStart` and `valueEnd` — instead of one, for selecting a span rather than a single point.

Example (Two handles select a start and end value instead of a single point.): `get_forge_blocks(blockId: "components/slider/range/range")`

## Tickmarks

Set `tickmarks` to show marks spaced by `step`, giving the handle discrete stops to snap to.

Example (Tickmarks spaced by step give the handle discrete stops to snap to.): `get_forge_blocks(blockId: "components/slider/tickmarks/tickmarks")`

## Disabled and readonly

`disabled` excludes the slider from the form; `readonly` keeps it in the form but locks its value.

Example (Disabled excludes the slider from the form; readonly keeps it in the form but locks its value.): `get_forge_blocks(blockId: "components/slider/disabled-and-readonly/disabled-and-readonly")`

## Custom labels

Set `labelBuilder` (or `label`/`labelStart`/`labelEnd`) to caption the handle with something other than a bare number.

Example (A custom label captions the handle instead of a bare number.): `get_forge_blocks(blockId: "components/slider/custom-labels/custom-labels")`

## Accessibility

### Keyboard interaction

Ensure every slider control is reachable by the tab key and can be adjusted with the left and right arrow keys — for a range slider, that applies to each thumb independently.

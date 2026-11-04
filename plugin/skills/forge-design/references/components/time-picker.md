# Time Picker

A time input component with an integrated dropdown for selecting time values, with support for various formats, masking, and validation.

## Overview

Time pickers allow users to select specific time values through an interactive interface. They provide a structured way to input time data while reducing errors and ensuring consistent formatting across different time systems and locales.

## Usage

`forge-time-picker` wraps a child [text field](./text-field.md) and adds a dropdown of selectable time options, through `use24HourTime`, `min`/`max`/`step`, `restrictedTimes`, `masked`, and `allowInput`. Use it when a person is entering a specific time; for a time range, place two time pickers side by side. Reach for a [select](./select.md) instead when the choice is really a vague description ("now", "in 30 minutes") rather than a specific time, or a plain [text field](./text-field.md) instead when the value isn't a time at all.

## Rules

**Do**

- Support both 12-hour and 24-hour formats depending on locale and context.
- Pair a 12-hour format with a visible AM/PM indicator.
- Place two time pickers side by side to capture a time range.
- Show a timezone alongside the value when the time is specific to a place or event.

**Don't**

- Don't use a time picker for vague time descriptions like "now" or "in an hour" — use a select instead.
- Don't use a time picker for free-text entry that isn't actually a time — use a text field instead.
- Don't restrict input to the dropdown alone unless typing a time would be error-prone for your data.

## Basic usage

A time picker's text field accepts typed input and its trailing icon button opens a dropdown of selectable times.

Example (A time picker combining a text field with a dropdown of time options.): `get_forge_blocks(blockId: "components/time-picker/demo/demo")`

## Format

Set `use24HourTime` to switch between the default 12-hour format and 24-hour time.

Example (12-hour (default) and 24-hour formats.): `get_forge_blocks(blockId: "components/time-picker/format/format")`

## Working with values

**Always use 24-hour format in code**

Regardless of the display format shown to the user, every programmatic read or write of `value` — and the `change` event — uses 24-hour time (e.g. `"15:30"`). This keeps the format locale-independent. Set values through `forge-time-picker` itself, never the wrapped `<input>` (the input only takes cosmetic attributes like `placeholder`). If the field needs to be `required` or `invalid`, set that on the embedded `forge-text-field`, not on `forge-time-picker`.

```js
const picker = document.querySelector("forge-time-picker");
picker.value = "15:30"; // always 24-hour, even if use24HourTime is false
picker.addEventListener("change", () => console.log(picker.value)); // also 24-hour
```

## Now and hour shortcuts

Set `showNow` and `showHourOptions` to add shortcuts for the current time and whole-hour options to the dropdown.

Example (Shortcuts for the current time and whole-hour options.): `get_forge_blocks(blockId: "components/time-picker/shortcuts/shortcuts")`

## Constraints

Set `min`, `max`, and `step` to bound selectable times and control the interval between dropdown options.

Example (A time picker bounded to a range, in 30-minute steps.): `get_forge_blocks(blockId: "components/time-picker/constraints/constraints")`

## Masking and input

Set `masked` to apply an input mask, shown as a placeholder, so typed times are corrected to a consistent format as the user types.

Example (A masked time picker showing its format as a placeholder.): `get_forge_blocks(blockId: "components/time-picker/masking/masking")`

## Disabled

Set `disabled` to prevent typing or opening the dropdown.

Example (A disabled time picker.): `get_forge_blocks(blockId: "components/time-picker/disabled/disabled")`

## Accessibility

### Labeling

Add an `aria-label` to the `<input>` if you're not pairing it with a `<label for>` — the time picker doesn't infer one on its own.

### Automatic ARIA attributes

The component applies `role="combobox"`, `aria-live`, `aria-atomic`, `aria-haspopup`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, and `aria-disabled` to the input for you, so you don't need to set those yourself.

### Keyboard interaction

As you arrow through the dropdown, the highlighted option is announced via `aria-activedescendant`.

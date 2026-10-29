# Date Picker

A date input component with an integrated calendar popup for selecting single dates.

## Overview

Date pickers allow users to select dates through multiple input methods. They combine a text input field with a calendar dropdown, giving users the flexibility to either manually type familiar dates or visually select dates from a calendar view. The component automatically handles date formatting and validation for manual entries, making it versatile for both quick familiar date entry and visual date selection.

## Usage

`forge-date-picker` wraps a child [text field](./text-field.md) and adds a calendar dropdown, through `min`/`max`/`disabledDates`/`disabledDaysOfWeek`, `masked`/`maskFormat`/`showMaskFormat`, `dateFormat`, `shortcuts`, `showToday`, and `showClear`. Use it for a single, specific date; for a start and end date together, use a date range picker instead, and for a time instead of a date, use a [time picker](./time-picker.md).

## Rules

**Do**

- Apply an input mask so typed dates are corrected to a consistent format as the user types.
- Match the field's width to its expected input, not the full width of the form.
- Let users type a date directly instead of requiring the calendar dropdown.

**Don't**

- Don't stretch a date picker to the full width of a form — size it to the expected input.
- Don't split day, month, and year into separate fields — use one date picker field instead.
- Don't restrict entry to the calendar dropdown alone when typed input is reliable for your data.

## Basic usage

A date picker's text field accepts typed input and its trailing icon button opens a calendar dropdown for picking a date instead.

Example (A date picker combining a text field with a calendar dropdown.): `get_forge_blocks(blockId: "components/date-picker/demo/demo")`

## Date format

Set `dateFormat` to control how a typed or selected date is displayed in the field, independent of the calendar's own locale. The default is `MM/DD/YYYY`; the built-in formats are:

- `MM/DD/YYYY`
- `MM/DD/YY`
- `DD/MMM/YYYY`
- `MM-DD-YYYY`
- `MM-DD-YY`
- `DD-MMM-YYYY`
- `YYYY-MM-DD`
- `YYYY-MMM-DD`
- `DD.MM.YYYY`
- `DD.MM.YY`

Changing `dateFormat` automatically updates the input mask to match, and handles parsing/formatting for you.

Example (A date picker with an explicit date format.): `get_forge_blocks(blockId: "components/date-picker/date-formats/date-formats")`

## Custom mask

Set `maskFormat` for a non-default input mask, pair it with `showMaskFormat` to display that mask as a placeholder, and set `shortcuts="off"` to remove the default quick-entry shortcuts when they don't make sense for a custom format.

Example (A custom mask format shown as a placeholder, with support text describing it.): `get_forge_blocks(blockId: "components/date-picker/custom-format/custom-format")`

For a format that isn't one of the built-in options, pair `maskFormat` with `parseCallback`/`formatCallback` to take over parsing and formatting entirely. `maskFormat` supports these segment tokens: `Mmm` (Jan), `MMM` (JAN), `DD`, `YYYY`, and `YY`.

```js
dateInput.maskFormat = "Mmm DD, YYYY";

dateInput.parseCallback = (str) => {
  const match = str.match(/(\w{3}) (\d{2}), (\d{4})/);
  if (!match) return null;
  const [, monthStr, day, year] = match;
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(monthStr);
  return new Date(Number(year), month, Number(day));
};

dateInput.formatCallback = (date) =>
  date ? new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric" }).format(date) : "";
```

## Constraints

Set `min`, `max`, and `disabledDaysOfWeek` to bound selectable dates and exclude specific days, such as weekends.

Example (A date picker bounded to a range, with weekends disabled.): `get_forge_blocks(blockId: "components/date-picker/constraints/constraints")`

## Shortcuts, today, and clear

Set `showToday` and `showClear` to add dedicated shortcuts to the calendar dropdown, alongside the default quick-entry shortcuts.

Example (Shortcuts for today and a clear button, alongside the default quick-entry shortcuts.): `get_forge_blocks(blockId: "components/date-picker/shortcuts/shortcuts")`

The date picker ships one default quick-entry shortcut — typing `t` jumps to today. Set `shortcuts="off"` to remove it, or set the `shortcuts` property to your own map of key names to callbacks that return a `Date` given the current date:

```js
dateInput.shortcuts = {
  t: (currentDate) => new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
  y: (currentDate) => new Date(currentDate.getFullYear(), 0, 1),
  e: (currentDate) => new Date(currentDate.getFullYear(), 11, 31),
};
```

## Disabled

Set `disabled` to prevent typing or opening the calendar dropdown.

Example (A disabled date picker.): `get_forge_blocks(blockId: "components/date-picker/disabled/disabled")`

## Accessibility

### Screen reader behavior

Verify that keyboard navigation within the calendar popup is announced by a screen reader as the user moves between days.

The date picker automatically applies `aria-live`, `aria-atomic`, `aria-haspopup`, `aria-expanded`, `aria-owns`, and `aria-disabled` to its `<input>` for you. You're still responsible for adding an `aria-label` to the input if it doesn't have an associated `<label>` element.

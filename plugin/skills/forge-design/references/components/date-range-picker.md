# Date Range Picker

A date input component with an integrated calendar popup for selecting date ranges with separate "from" and "to" date values.

## Overview

The date range picker allows users to select a start and end date to define a continuous date range. It combines text input fields with a calendar, giving users the flexibility to either manually type familiar dates or visually select date ranges from a calendar view.

The component automatically handles date formatting and validation for manual entries while ensuring the end date cannot be earlier than the start date.

## Usage

`forge-date-range-picker` wraps a [text field](./text-field.md) with two inputs — "from" and "to" — and adds a calendar popup for picking both ends of a range, through `from`, `to`, `min`, `max`, `disabledDates`, `disabledDaysOfWeek`, `masked`, `showToday`, and `showClear`. Use it whenever a user is entering a span of dates, like time off or a project's start and end; for a single date, use a [date picker](./date-picker.md) instead.

## Rules

**Do**

- Let a user type both dates directly as well as pick them from the calendar.
- Show which end of the range — from or to — a given input represents.
- Constrain the range with min and max when dates outside it are genuinely invalid, not just unlikely.
- Validate that the from date doesn't fall after the to date, and surface a clear, actionable error if it does.

**Don't**

- Don't use a date range picker for a single date — use a date picker instead.
- Don't rely on the calendar popup alone — typed input needs to work for users who know the exact dates already.
- Don't hide which input is from and which is to.

## Basic usage

Type into either input or use the trailing calendar button to open the popup and pick both ends of the range.

Example (A date range picker with typed inputs and a calendar popup.): `get_forge_blocks(blockId: "components/date-range-picker/demo/demo")`

## Constraints

Set `min` and `max` to bound both ends of the range to a valid window.

Example (A date range picker bounded to a min/max range.): `get_forge_blocks(blockId: "components/date-range-picker/constraints/constraints")`

## Masking

Set `masked` to apply an input mask, shown as a placeholder in each field, so typed dates are corrected to a consistent format as the user types.

Example (A masked date range picker showing its format as a placeholder.): `get_forge_blocks(blockId: "components/date-range-picker/masking/masking")`

## Today and clear shortcuts

Set `showToday` and `showClear` to add shortcuts to the calendar popup — disable the Today shortcut for a range that only accepts future dates.

Example (Disabling the Today shortcut for a future-only range.): `get_forge_blocks(blockId: "components/date-range-picker/shortcuts/shortcuts")`

## Disabled

Set `disabled` to prevent typing or opening the calendar popup.

Example (A disabled date range picker.): `get_forge_blocks(blockId: "components/date-range-picker/disabled/disabled")`

## Accessibility

### Screen reader behavior

Verify that keyboard navigation within the calendar popup is announced by a screen reader as the user moves between days.

The date range picker automatically applies `aria-live`, `aria-atomic`, `aria-haspopup`, `aria-expanded`, `aria-owns`, and `aria-disabled` to both the start and end `<input>` elements for you. You're still responsible for adding an `aria-label` to each input if it doesn't have an associated `<label>` element.

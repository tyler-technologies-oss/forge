# Calendar

A flexible calendar component for date selection with support for single dates, ranges, multiple selections, and extensive customization options.

## Overview

The calendar component displays dates in a monthly grid format. It allows users to visually navigate and select dates by browsing through months and years, providing an intuitive interface for date-related tasks and temporal data visualization.

## Usage

`forge-calendar` selects one or more dates through `mode` (`single`, `multiple`, or `range`), plus `min`/`max`/`disabledDates`/`disabledDaysOfWeek` constraints, `events`, and `view`. Use it when the task is calendar-driven and the surrounding days give useful context, like picking a day off. Reach for a [date picker](./date-picker.md) instead when a user is typing in a familiar date and screen space is limited, or a [date range picker](./date-range-picker.md) instead for a bounded start/end range in that same compact form.

## Rules

**Do**

- Use a calendar when the task is primarily calendar-driven, like a time-off request.
- Use a calendar when a user needs to select multiple dates that aren't necessarily chronological.
- Show events or disabled dates directly on the grid so context is visible while choosing.

**Don't**

- Don't use a calendar for familiar dates like birthdays or card expirations — use a date picker instead.
- Don't use a calendar when the date isn't central to the task at hand — use a date picker instead.
- Don't use a calendar where screen space is limited — use a date picker instead.

## Selection mode

Set `mode` to `single` (the default), `multiple` for several non-chronological dates, or `range` for a bounded start and end date.

Example (The default mode — one date at a time.): `get_forge_blocks(blockId: "components/calendar/demo/demo")`

## Constraints

Set `min`, `max`, and `disabledDaysOfWeek` to bound selectable dates and exclude specific days, such as weekends.

Example (A calendar bounded to a range, with weekends disabled.): `get_forge_blocks(blockId: "components/calendar/constraints/constraints")`

## Views

Set `view` to open the calendar directly into its year view instead of the default day grid.

Example (Opening directly into the year view.): `get_forge_blocks(blockId: "components/calendar/views/views")`

## Header controls

Set `showToday` and `showClear` to add today and clear shortcuts to the calendar's header.

Example (Today and clear shortcuts in the calendar's header.): `get_forge_blocks(blockId: "components/calendar/header-controls/header-controls")`

## Readonly

Set `readonly` to show the current selection without allowing the user to change it.

Example (A readonly calendar shows the selection without allowing changes.): `get_forge_blocks(blockId: "components/calendar/readonly/readonly")`

## Accessibility

### Keyboard interaction

Days must be navigable by keyboard.

### Screen reader behavior

Each day should be announced individually, including whether it's currently selected.

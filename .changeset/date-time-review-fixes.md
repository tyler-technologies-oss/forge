---
'@tylertech/forge': patch
---

fix(date-time): correctness and accessibility fixes for `forge-date-time-field` / `forge-date-time-picker`

- Parse timezone-less ISO strings (date-only `min`/`max`/`value` like `2026-06-29`) as local wall-clock time instead of UTC midnight, fixing an off-by-one day west of UTC.
- `formatDuration` no longer drops the minutes component on multi-day ranges and decomposes by calendar day so DST transitions don't skew the day count or lose an hour.
- Validity on a `date-mode="range"` + `time-mode="single"` field now gates the time requirement on the single time input (`#hasTime`), so a complete typed selection no longer reports a spurious "Time is required."
- The picker change event exposes the range end date (`dateTo`); the field derives end-date presence from it rather than from the end-time field.
- The picker no longer announces "Date and time cleared." to the live region when a date is selected before a time.
- `date-mode="range"` + `time-mode="single"` normalizes an asymmetric incoming range to a single shared time so the value stays consistent across edits; a reversed date range now reports a date-oriented validation message.
- The embedded `forge-time-picker` is only clamped by the `min`/`max` datetimes; `min-time`/`max-time` govern slot generation only and no longer constrain free-entry times to business hours by default.
- Disabled time slots remain perceivable and keyboard-navigable per the ARIA listbox pattern (aria-disabled rather than the native `disabled` attribute).
- The calendar toggle exposes `aria-expanded`; the anchored picker card exposes `role="dialog"` with an accessible name; the field's `role="group"` host is named from its label.
- The field forwards value-shaping and interactive config (date/time mode, `allow-seconds`, `disabled`/`readonly`) to a linked picker so a range value is no longer coerced to `null` on a mode-mismatched picker, a disabled field disables/closes the picker, and unlinking a picker dismisses its overlay.
- `forge-calendar`: the previous/next month buttons now expose an accessible name, and empty leading/trailing date-grid cells are valid (hidden) grid cells, resolving `aria-command-name` and `aria-required-children` axe violations.
- On phones, the picker's bottom sheet now opens as `inline-modal` instead of a native `modal` dialog: `showModal()` made everything outside the dialog inert, which silently disabled the embedded time-picker's dropdown (its popover renders at body level), so tapping a time just dismissed the dropdown. `inline-modal` keeps the scrim and `aria-modal` while leaving the dropdown interactive.
- `forge-date-time-field` sizes to its content (`width: max-content`) rather than fixed per-mode widths, so it is no longer wider than it needs to be; the time segment is tightened and widened only when seconds are shown.

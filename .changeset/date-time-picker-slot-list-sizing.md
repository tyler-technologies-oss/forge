---
'@tylertech/forge': patch
---

fix(date-time-picker): slot list sizing, date actions row, and layout cleanup

- In a side-by-side slots layout, the slot list is capped at the calendar's height as the calendar grows or shrinks, scrolling within it. An explicit `--forge-date-time-picker-slot-list-max-height` still takes precedence.
- Side by side, the slot list defaults to the width of its widest slot instead of a fixed 320px; stacked layouts match the calendar's width.
- Slot buttons use `forge-button`'s default padding instead of picker-specific overrides.
- The picker no longer draws dividers between the calendar, time controls, presets, and footer.
- `clear-button` and `today-button` now render in a `date-actions` row below the calendar and time controls instead of inside the calendar, so enabling them no longer resizes the calendar. Clear resets the date and time and emits a `clear` change. This also fixes these properties, which previously never showed the buttons.
- New custom states: `horizontal`, `vertical`, `time-single`, `time-range`, and `time-slots`. Internal `data-*` attributes are replaced with classes.

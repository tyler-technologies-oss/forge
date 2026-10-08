---
'@tylertech/forge': minor
---

feat(date-time-picker, date-time-field): add `forge-date-time-picker` and `forge-date-time-field`

- `forge-date-time-picker` combines a `forge-calendar` with time selection: `date-mode` (`single` | `range`) and `time-mode` (`single` | `range` | `slots`) combine to pick a date+time, a same-day time range, a full date+time range, or a bookable time slot. `value-mode` shapes the value as a `Temporal.PlainDateTime` (default), an ISO string, or a `Date`.
- Date ranges offer quick-range presets and show the range duration. Selections commit immediately.
- The picker is form-associated with validation, announces selection changes through a live region, and supports `min`, `max`, `min-time`, `max-time`, `step`, `use-24-hour-time`, `allow-seconds`, `clear-button`, `today-button`, `summary`, header/footer slots, and CSS parts and custom properties.
- `forge-date-time-field` wraps a consumer-provided `forge-text-field` with one slotted `<input>` per endpoint (range modes take two), applies a combined date and time mask to each with a format-letter guide (`MM/DD/YYYY hh:mm aa`), and injects validation and duration text.
- Link a picker to the field by IDREF with the `picker` attribute. The field hosts it in a `forge-popover`, and on small screens (599px and narrower) the picker opens as a full-height `forge-bottom-sheet`.
- Adds `temporal-polyfill` as a dependency, loaded on demand when `value-mode` is `temporal`.
- Exports the combined `DateTimeInputMask`, the shared `prepareDateChar`/`prepareTimeChar` mask helpers, and `setShowMaskFormat` on `DateInputMask` and `TimeInputMask`.

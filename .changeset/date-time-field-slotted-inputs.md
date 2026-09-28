---
'@tylertech/forge': patch
---

feat(date-time-field): slot a consumer `forge-text-field` and host the picker in a popover

- **Breaking (unreleased API):** `forge-date-time-field` now wraps a consumer-provided `forge-text-field` whose slotted `<input>` elements become the masked endpoints, like `forge-date-range-picker`. `label`, `placeholder`, `label-position`, `label-alignment`, `variant`, `density`, `shape`, `theme`, the `label`/`support-text`/`support-text-end` slots, and all CSS parts are removed; set them on the text field and input instead.
- One input per endpoint with a combined `MM/DD/YYYY hh:mm AM` mask (new `DateTimeInputMask`); range modes take a second input for the end (date + time, end time only, or end date only).
- The field manages a calendar toggle, the range separator, injected validation text, and the range duration (`show-duration`), reusing consumer-provided elements when present, and forwards `disabled`/`required`/`invalid`/`min`/`max`.
- `forge-date-time-picker` renders its anchored overlay in a `forge-popover` (surface, elevation, animation) and adds `isTimeSlotAvailable(date)`; typed times in slots mode are validated against the picker's available slots.
- Internal `data-*` attributes are removed; only `forge-field`'s `data-forge-multi-input-separator` contract remains.

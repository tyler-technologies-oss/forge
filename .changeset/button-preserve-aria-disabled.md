---
'@tylertech/forge': patch
---

fix(button): preserve consumer-provided `aria-disabled` and label the picker's embedded calendar

- `forge-button` (and other `BaseButton` subclasses) no longer removes a consumer-set `aria-disabled` on first render when not disabled, and restores it when re-enabled after `disabled` is toggled. This keeps `forge-date-time-picker`'s unavailable time slots announced as disabled.
- `forge-date-time-picker` forwards the calendar's month-navigation, Today, and Clear text slots with the calendar's default text as fallback, so the embedded calendar's buttons keep their accessible names when no text is slotted.

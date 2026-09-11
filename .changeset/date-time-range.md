---
'@tylertech/forge': minor
---

Introduce the orthogonal `date-mode` (single|range) axis on `forge-date-time-field` and `forge-date-time-picker` enabling full date+time ranges: range-select calendar, quick-range presets, duration summary, deferred Apply/Cancel commit with `auto-commit` opt-out, and end-after-start validation.

**Migration note:** today's `time-mode="range"` is now `date-mode="single" time-mode="range"` (a same-day time range); set `date-mode="range"` for a multi-day date range.

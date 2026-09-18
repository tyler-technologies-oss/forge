---
'@tylertech/forge': minor
---

feat(date-time-field): decouple `forge-date-time-field` and `forge-date-time-picker` into independently-usable, composable components linked by value only (like `<input list>` / `<datalist>`).

- `forge-date-time-picker` gains an anchored overlay mode: `anchorElement` / `anchor` (IDREF), `open`, `persistent`, and `placement`. When anchored it renders its card inside a `forge-overlay`; otherwise it renders inline as before. It now emits `forge-date-time-picker-open` and `forge-date-time-picker-close`.
- `forge-date-time-field` no longer embeds a picker or popover. Link a standalone picker via the `picker` IDREF attribute or the `pickerElement` property; the field renders a calendar toggle button only when linked, syncs value bidirectionally (picker → field via `forge-date-time-picker-change`, field → picker via `picker.value`), and warns once per mismatched shared property (`time-mode`, `use-24-hour-time`, `allow-seconds`).
- The field's `step`, `min-time`, and `max-time` are removed — these are picker-only concerns now. Migration: set them on the linked `forge-date-time-picker` instead.

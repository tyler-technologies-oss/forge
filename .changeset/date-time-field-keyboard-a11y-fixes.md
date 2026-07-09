---
'@tylertech/forge': patch
---

fix(date-time-field): keyboard parity, live guide feedback, and a time-mask race

- The calendar toggle is no longer a separate tab stop (`tabindex="-1"`, matching `forge-date-picker`); plain `ArrowDown` from a masked input opens the linked picker instead of requiring Alt+ArrowDown, and is now a no-op on a standalone (unlinked) field instead of eating the keystroke.
- `aria-haspopup`/`aria-expanded` are exposed on the masked inputs themselves (not just the now-unreachable toggle), so keyboard/SR users get programmatic popup state from wherever they're typing.
- Completing a date segment auto-advances focus into its paired time segment; `ArrowLeft`/`ArrowRight`/`Backspace` step between a date segment and its paired time segment at the boundary (ignoring Ctrl/Cmd/Alt/Shift so native word-jump and selection-extend shortcuts still work).
- Empty/partially-typed/complete masked segments now render in three distinct tones (previously two), and the tone updates live while typing instead of only on blur/Enter; a value cleared programmatically (or via form reset) no longer leaves a stale tone painted against the blanked guide.
- Editing an already-complete value (e.g. backspacing one digit) no longer emits a transient `change` with a `null` value or clears the linked picker's selection mid-correction; that still only commits on blur/Enter/quick-keys, matching prior behavior.
- `forge-date-time-field`'s `DateRange` story now demonstrates `date-mode="range"` combined with `time-mode="range"` (a full date+time range) instead of a date-only range.
- Fixed a race in the shared time-input mask (`core/mask`, also used by `forge-time-picker`): overwriting a single eager-padded hour digit with a second digit (e.g. typing "10" for a 10 o'clock hour) checked the wrong cursor position and could drop or scramble the second digit under fast typing.

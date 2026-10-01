---
'@tylertech/forge': minor
---

feat(date-time-picker): add new `forge-date-time-picker` component — a Lit-based composite that combines `forge-calendar` with three time-selection modes (`single`, `range`, `slots` / booking-style), and ships in two variants (`static` inline card and `inline` input + popover). Form-associated via `ElementInternals`; exposes `header`, `footer-start` / `footer-center` / `footer-end`, `time-label` and calendar pass-through slots; supports an optional primary-colored `summary` side panel; configurable through CSS custom properties and Forge design tokens. Targets WCAG 2.1 AA with `role="group"`, listbox semantics for slot mode, a live-region announcement of selection, and full keyboard navigation (arrows, Home/End, Enter/Space, digit typeahead).

# forge-date-time-picker — standalone playground

Self-contained Vite + Lit + TypeScript demo of the proposed `forge-date-time-picker`
component. Drop this folder into [stackblitz.com](https://stackblitz.com/) (or
`npm install && npm run dev` locally) to play with it.

The component implementation in `src/forge-date-time-picker/` is a port of the real
source from
[`packages/forge/src/lib/date-time-picker/`](https://github.com/dannydel/forge/tree/feat/date-time-picker/packages/forge/src/lib/date-time-picker)
with three small adaptations so it runs outside the Tyler Forge monorepo:

- `BaseLitElement` is aliased to `LitElement` (the monorepo's base only adds a stylesheet-adoption shim).
- `setDefaultAria` is inlined as a minimal helper.
- A handful of internal forge type imports (`ICalendarComponent`, `IPopoverComponent`, `ICalendarDateSelectEventData`) are replaced with local loose types.

Everything `@tylertech/forge` exposes publicly — `forge-calendar`, `forge-time-picker`, `forge-text-field`, `forge-icon`, `forge-icon-button`, `forge-popover`, `forge-button` — is pulled from npm as a normal dependency.

## Run locally

```bash
npm install
npm run dev
```

## Use in StackBlitz

Upload this folder, or use the GitHub-import URL:

```
https://stackblitz.com/github/dannydel/forge/tree/feat/date-time-picker/stackblitz/date-time-picker-playground
```

## What to try

- Flip **Variant** between `static` (inline card) and `inline` (input + popover).
- Switch **Time mode** between `slots` (booking style), `range` (start/end), and `single`.
- Toggle the **Summary panel**, **Show footer**, and **Show header** options.
- Resize the window narrow to see the slots-mode layout collapse below the calendar.

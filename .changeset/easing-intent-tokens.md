---
'@tylertech/forge-tokens': minor
'@tylertech/forge': minor
'@tylertech/forge-mcp': patch
---

Add easing tokens named for what they're for, and retune the defaults so interface motion starts fast and settles gently.

- New `easing-move` (`cubic-bezier(0.77, 0, 0.175, 1)`) for things that move, resize or rotate while on screen.
- New `easing-drawer` (`cubic-bezier(0.32, 0.72, 0, 1)`) for drawers and sheets sliding in from an edge.
- New `easing-gentle` (`cubic-bezier(0.25, 0.1, 0.25, 1)`) for color, hover and other soft changes.
- `easing-standard` is now `cubic-bezier(0.23, 1, 0.32, 1)` (was `cubic-bezier(0.2, 0, 0, 1)`), the default for anything entering or leaving.
- `easing-decelerate` now matches `easing-standard`. Its old curve (`cubic-bezier(0, 0, 0, 1)`) jumped most of the way in the first few frames and then stalled.
- `easing-decelerate`, `easing-accelerate`, `easing-emphasized`, `easing-emphasized-accelerate` and `easing-emphasized-decelerate` are deprecated and will be removed in the next major version. Use `easing-standard` in place of the first four, and `easing-drawer` in place of `easing-emphasized-decelerate`. They still work until then.
- Every easing token now has a description, which shows on the docs site.

Components now use the token that fits each motion: `standard` for enter and exit (popover, dialog, tooltip, backdrop, toast, badge, radio and the checkbox mark); `move` for on-screen movement (open icon, switch handle, expansion panel, view switcher, mini drawer, meter, dialog dragging, avatar size, table sort icon, color picker handle and the CSS-only field label); `drawer` for drawers, sheet dialogs, the bottom sheet and split view panels; and `gentle` for color and hover changes (buttons, icon buttons, FAB, button toggle, chips, field surface, checkbox background, step icons, table rows, progress theme changes and the secret reveal).

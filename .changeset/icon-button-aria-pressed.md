---
'@tylertech/forge': patch
---

fix(icon-button): only expose `aria-pressed` in toggle mode

`forge-icon-button` set `aria-pressed="false"` on every icon button, including plain action buttons that are not toggles. `aria-pressed` is what makes assistive technology announce a toggle button, so screen readers described ordinary icon buttons as "toggle button, not pressed". It is now only set when `toggle` is true, and is removed when `toggle` is turned off.

Outside toggle mode, an `aria-pressed` attribute the consumer sets is now left alone. Previously it was overwritten with `"false"` on first render.

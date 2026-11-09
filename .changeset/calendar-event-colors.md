---
'@tylertech/forge': patch
---

fix(calendar): event colors use the `categorical-*` theme tokens instead of fixed Material 500 colors, so they adapt to dark mode and pass 3:1 against the surface. `primary` uses `categorical-indigo` and `secondary` uses `categorical-amber`

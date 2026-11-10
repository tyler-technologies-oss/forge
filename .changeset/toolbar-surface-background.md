---
'@tylertech/forge': minor
---

Toolbars inside cards, dialogs, and popovers now have a transparent background so they match the surface they sit on. Previously, toolbars in a card with the default translucent background came out darker or lighter than the card body whenever the card was not on the page surface. Toolbars elsewhere keep the `surface-elevated` background. The toolbar's backdrop blur is now the `--forge-toolbar-backdrop-filter` token and defaults to `none`; pair it with a translucent background for sticky toolbars over scrolling content.

---
'@tylertech/forge': patch
---

Use animation tokens for motion that had hand-written timing, and give panels consistent timing.

- The tab indicator slides with `easing-move`, read from the token so apps can change it. Tab text color changes use `easing-gentle` over 150ms.
- The calendar month and year menus, the calendar menu button's arrow and the range date highlight use duration and easing tokens.
- The circular progress value change uses `duration-long2` (500ms) and `easing-standard`.
- The autocomplete's legacy dropdown icon rotates with `easing-move`.
- Panels that resize in place (banner, view switcher and mini drawer, including its hover expansion) now take 250ms like the expansion panel. Split view panels now open in 500ms and close in 400ms like drawers and sheets.

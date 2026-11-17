---
'@tylertech/forge': patch
---

Replace slow-starting (ease-in) curves and shorten animations that ran longer than 300ms.

- Toast and backdrop exits, the checkbox check mark, and the CSS-only field label now use `easing-decelerate` instead of an accelerating curve.
- The table sort icon and column resize indicator use `easing-standard` instead of `easing-accelerate`, and the resize indicator takes 150ms instead of 250ms.
- The skeleton shimmer moves at a constant speed (`linear`) instead of `ease-in`.
- The open icon (for example the select and autocomplete chevron) and expansion panel open and close in 250ms instead of 400ms, so they stay in step with each other.
- Step icons change color in 200ms instead of 400ms.
- The color picker slider handle moves in 200ms with `easing-standard` instead of a hand-written 400ms curve.

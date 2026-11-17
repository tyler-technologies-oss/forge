---
'@tylertech/forge': minor
---

Stop animating things that happen on every key press.

- The focus indicator now appears at its final width instead of playing a 600ms grow-and-shrink each time something gets keyboard focus. `--forge-focus-indicator-duration` now defaults to `0s`; set it, for example to `600ms`, to bring the animation back.
- Selecting a tab with the keyboard (Enter, Space, or arrow keys with `auto-activate`) moves the indicator and scrolls the tab into view at once. Clicking a tab still slides the indicator and scrolls smoothly.
- Tab bar scrolling now actually skips smooth scrolling when the user prefers reduced motion. Before, the scroll container's `scroll-behavior: smooth` still applied.

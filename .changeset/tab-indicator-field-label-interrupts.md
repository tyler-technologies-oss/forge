---
'@tylertech/forge': patch
---

Fix two animations that misbehaved when interrupted.

- The tab bar indicator no longer jumps when the active tab changes while it's still sliding. It now continues from where it is on screen.
- Fields no longer keep their floating label animation state when the label floats back before the animation finishes, or when the label can't animate (it isn't inset, or the density is extra small). That leftover state could keep the wrong input styles applied.

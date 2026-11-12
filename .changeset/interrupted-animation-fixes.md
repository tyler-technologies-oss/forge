---
'@tylertech/forge': patch
---

Fix components that ended in the wrong state when reopened or closed during an animation.

- Popover, dialog and toast now stay open when reopened while animating closed. Before, they finished closing anyway, and the dialog was left with `open` set while hidden.
- Popover and toast `open` now report `false` as soon as they start closing, the same as dialog.
- Dialog no longer fires `forge-dialog-open` or `forge-dialog-close` for a close that was undone by reopening, and popover no longer fires `forge-popover-toggle` for one.
- Calendar month and year menus stay open, without leftover content, when reopened while closing.
- Split view panels end in the state that was asked for last when toggled during an animation.
- Expansion panels hide closed content (`hidden="until-found"`) when the user prefers reduced motion. Before, it stayed in the tab order and the accessibility tree.
- Banner fires `forge-banner-dismissed` when its transition is turned off, and no longer fires it early when content inside the banner finishes a transition.
- View switcher no longer adds a new `transitionend` listener on every height change, and no longer keeps a fixed height when the height doesn't transition.

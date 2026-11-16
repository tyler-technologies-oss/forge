# Responsive Toolbar

The responsive toolbar switches between two sets of end actions, such as inline buttons and an overflow menu, depending on whether its title leaves enough room.

## Overview

The responsive toolbar is a toolbar that adapts its actions to the space available. When there is room, it shows the full set of actions; when the title would collide with them, it swaps to a compact version. It's typically used at the top of a card, panel, or page section whose width changes, such as a resizable panel or a narrow viewport.

## Usage

`forge-responsive-toolbar` extends the [toolbar](./toolbar.md) with two end slots. Put the full set of actions, like a row of buttons, in `end-large`, and a compact alternative, like an icon button that opens a [menu](./menu.md), in `end-small`. The toolbar shows `end-large` while the title doesn't overlap the actions and `end-small` once it does. The `before-start`, `start`, and `after-end` slots map to the toolbar's slots of the same names, and the `no-border` and `inverted` properties control the divider. Listen for `forge-responsive-toolbar-update` to react to the change, and use `resize-delay` to tune how often resizes are checked. Use it when the toolbar's width changes; for a fixed-width toolbar, use a plain toolbar.

## Rules

**Do**

- Put the same actions in both `end-large` and `end-small` so nothing becomes unavailable at small sizes.
- Use an icon button with an overflow menu for `end-small`.
- Keep the title short and set `white-space: nowrap` through a utility class so overlap is measured against a single line.
- Give every icon button an `aria-label`.

**Don't**

- Don't put different actions in the two end slots.
- Don't use it when the toolbar's width never changes; use a toolbar.
- Don't hide critical actions only in the overflow menu if there's room to show them.

## Basic usage

A card toolbar with a back button, title, and actions that collapse into an overflow menu when space runs out.

Example (A responsive toolbar with a back button and title that swaps inline buttons for an overflow menu as its container shrinks.): `get_forge_blocks(blockId: "components/responsive-toolbar/demo/demo")`

## Accessibility

### Equivalent actions

Only one of `end-large` and `end-small` is visible at a time, and the other is hidden. Make both slots expose the same actions so keyboard and screen reader users can reach everything at any size.

### Labeling

Give every icon button in the toolbar an `aria-label`, such as "Back" or "More actions", since it has no visible text. If you use a menu in `end-small`, label its trigger button as well.

### Keyboard interaction

The responsive toolbar is a layout container with no keyboard behavior of its own. Slotted controls follow the natural tab order: `before-start`, `start`, the visible end slot, then `after-end`. See [menu](./menu.md) for the keys supported by an overflow menu.

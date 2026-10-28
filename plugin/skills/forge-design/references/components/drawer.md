# Drawer

Drawers support persistent navigation or supplementary content pinned to the left or right edge of the screen.

## Overview

Drawers are panels that provide supplementary content alongside the main application interface. They can appear on the left or right side of the screen and serve various purposes including navigation, filtering, and displaying detailed information. Drawers help organize content hierarchically while maintaining focus on the primary interface.

The drawer component supports multiple interaction patterns—from persistent navigation panels on desktop to modal overlays on mobile—making them versatile for both primary navigation and contextual content display. They maintain consistent positioning and elevation relationships with the main content while providing smooth transitions and appropriate accessibility features.

## Usage

The drawer component provides no semantics by default. Supply your own `<aside>` for navigation, or the appropriate ARIA roles for other content.

`forge-drawer` pins persistent navigation or supplementary content to an edge through `open` and `direction`, and slots into a `forge-scaffold`'s side slots. Use a plain drawer when it should stay visible and dismissible by choice, `forge-mini-drawer` when it should collapse to a narrow icon rail, and `forge-modal-drawer` when it should overlay the page with a backdrop instead of sharing space with it. For apps with fewer than five primary destinations, use [tabs](./tabs.md) instead of a navigation drawer.

## Rules

**Do**

- Keep the drawer's menu button visible in the app bar at every screen size so it can always be reopened.
- Use a plain, dismissible drawer on desktop and a modal drawer at tablet and mobile widths for the same navigation.
- Use a mini drawer on desktop when the main content needs the extra width a full drawer would take.

**Don't**

- Don't duplicate primary navigation in both a drawer and the app bar — pick one place for it.
- Don't build a modal side panel from forge-modal-drawer for a one-off sidesheet — prefer forge-dialog with a left-sheet or right-sheet preset instead.
- Don't use a navigation drawer for fewer than five primary destinations — tabs are simpler.

## Basic usage

A plain drawer sits in a scaffold's side slot alongside the main content, toggled open and closed by a menu button in the app bar.

Example (A dismissible drawer with navigation links, inside a scaffold.): `get_forge_blocks(blockId: "components/drawer/demo/demo")`

## Mini drawer

`forge-mini-drawer` collapses to a narrow icon rail and optionally expands to full width on pointer `hover` — use it on desktop when the main content needs the extra width a full drawer would take. Hover-to-expand is a pointer-only affordance and isn't available on touch devices.

Example (A mini drawer collapsed to an icon rail, with tooltips labeling each item.): `get_forge_blocks(blockId: "components/drawer/mini-drawer/demo/demo")`

## Modal drawer

**Deprecated**

`forge-modal-drawer` is being phased out in favor of `forge-dialog` with a sheet preset (`left-sheet` or `right-sheet`) — prefer that for new work.

`forge-modal-drawer` slides in over the page with a backdrop instead of sharing space with the content — typically used at tablet and mobile widths in place of a dismissible drawer.

Example (A modal drawer overlaying the page with a backdrop.): `get_forge_blocks(blockId: "components/drawer/modal-drawer/demo/demo")`

## Accessibility

### Screen reader behavior

`forge-drawer` does **not** provide any semantics by default, in any of its variants (permanent, dismissible, or mini). Provide your own `<aside>` element when the drawer holds navigation, or the appropriate ARIA role for whatever else it contains — the component won't infer this for you.

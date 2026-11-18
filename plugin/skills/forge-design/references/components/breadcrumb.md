# Breadcrumb

Breadcrumbs show the user's location within a hierarchy and provide links back to parent pages.

## Overview

Breadcrumbs show where the user is within a hierarchy of pages and give them a quick way back to any parent level. They work as secondary navigation: they orient users who arrived deep in an app, such as from a search result or a shared link, and save them from retracing their steps.

Breadcrumbs usually sit near the top of the page content, directly above the page title, and pair well with an app bar or page header.

## Usage

`forge-breadcrumb` lays out a trail of `forge-breadcrumb-item` children, each with an `href` to the page it represents. Mark the last item with `current` to show the page the user is on, set `home` on the first item to render a home icon in place of its text, and set `scroll-buttons` on the breadcrumb to keep a long trail on a single line. Wrap middle items in `forge-breadcrumb-overflow-menu` to collapse them into a popover. Use breadcrumbs for hierarchical navigation; to switch between peer views of the same content, use [tabs](./tabs.md) instead.

## Rules

**Do**

- Order items from the top of the hierarchy to the current page, with the current page last.
- Use short labels that match the titles of the pages they link to.
- Collapse middle items into an overflow menu when there are more than five items or too many for one line.
- Place the overflow menu after the first item and keep one or two items after it.
- Give the breadcrumb an accessible name with aria-label.

**Don't**

- Don't use breadcrumbs as the only navigation in an app.
- Don't include the current page unless the page has no visible title or its title is unclear.
- Don't use breadcrumbs to show steps in a process — use a stepper instead.
- Don't nest child items more than one level deep.

## Basic usage

Each `forge-breadcrumb-item` links to a page with `href`. The item marked `current` renders as non-interactive text.

Example (A breadcrumb with a home item, two linked parents, and the current page.): `get_forge_blocks(blockId: "components/breadcrumb/demo/demo")`

## Overflow menu

Slot items into `forge-breadcrumb-overflow-menu` to collapse them behind an overflow button that opens a popover.

Example (Middle items collapsed into an overflow menu between the home item and the last two items.): `get_forge_blocks(blockId: "components/breadcrumb/overflow-menu/overflow-menu")`

## Child items

Slot `forge-breadcrumb-item` elements into an item's `children` slot to show sibling pages in a popover menu. When child items are present, the item's button toggles the menu instead of navigating, so its own `href` is ignored. Child items are supported one level deep.

Example (A breadcrumb item that opens a menu of related pages.): `get_forge_blocks(blockId: "components/breadcrumb/child-items/child-items")`

## With icons

Slot an icon into an item's `start` slot to place it before the item's text. This works for items in the trail, in the overflow menu, and in an item's child items.

Example (Breadcrumb items with a leading folder icon.): `get_forge_blocks(blockId: "components/breadcrumb/with-icons/with-icons")`

## Without links

An item without an `href` renders as non-interactive text. Use this for levels of the hierarchy that don't have a page of their own.

Example (Breadcrumb items that have no links.): `get_forge_blocks(blockId: "components/breadcrumb/without-links/without-links")`

## Scroll buttons

Set `scroll-buttons` to keep the trail on a single line instead of wrapping. When the items overflow, previous and next buttons appear and the trail starts scrolled to the end so the current page stays visible.

Example (A long trail in a narrow container with scroll buttons.): `get_forge_blocks(blockId: "components/breadcrumb/scroll-buttons/scroll-buttons")`

## Accessibility

### Screen reader behavior

`forge-breadcrumb` automatically applies `role="navigation"`, and the trail inside it is exposed as a list: each `forge-breadcrumb-item` and `forge-breadcrumb-overflow-menu` has `role="listitem"`. The item marked `current` gets `aria-current="page"` and renders as plain text rather than a link, so screen readers announce it as the current page.

### Labeling

Give the breadcrumb an accessible name with `aria-label`, such as "Breadcrumb", so it can be told apart from other navigation landmarks on the page.

```html
<forge-breadcrumb aria-label="Breadcrumb">
  <forge-breadcrumb-item href="/" home></forge-breadcrumb-item>
  <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
</forge-breadcrumb>
```

The home icon is labeled "Home" by default through a tooltip. Slot text into a `home` item to provide a different label. The overflow button and the scroll buttons are labeled by their tooltips ("Previous breadcrumbs" and "Next breadcrumbs" for the scroll buttons); slot text into the overflow menu's `tooltip` slot to change its label, for example to match your app's language.

### Keyboard interaction

Linked items are links, and the overflow, child item, and scroll controls are buttons, so each is a normal tab stop.

| Key         | Action                                                                                |
| ----------- | ------------------------------------------------------------------------------------- |
| Tab         | Moves focus to the next link or button in the breadcrumb.                             |
| Shift + Tab | Moves focus to the previous link or button in the breadcrumb.                         |
| Enter       | Follows the focused link, or opens the focused overflow or child item menu.           |
| Space       | Activates the focused button, including the overflow, child item, and scroll buttons. |

The popover menu closes when a link is selected or when focus moves out of it. The current item and any item without an `href` are not focusable.

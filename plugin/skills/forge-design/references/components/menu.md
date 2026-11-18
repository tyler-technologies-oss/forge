# Menu

Menus display a list of contextual actions or options in a popup, triggered from a button, icon, or list item.

## Overview

Menus are used to provide a list of options/actions to a user, and are typically anchored dynamically to a button or other similar trigger element and appear upon selection of that trigger element.

Menus can be used in a variety of ways, such as a simple list of options, a list of actions, or a hierarchical/cascading list of options. They appear in front of all other permanent UI elements. If they are in a position to be cut off by the browser or screen’s edge, they can appear to the left, right, or above the element that generates it. Menus do not hold a selection state.

## Usage

`forge-menu` wraps a trigger element and opens a dropdown of `options` — icon-and-label entries, optionally grouped, set as a JS property rather than an attribute — through `mode` (`click` or `cascade`), `placement`, and `dense`. Reserve it for a short list of contextual actions or unrelated options; for a field where a user picks one value from a fixed set, use a [select](./select.md) instead — the menu's own `selectedIndex`/`selectedValue` are deprecated for exactly that reason.

## Rules

**Do**

- Use icons consistently across a menu's options — either every option has one, or none does.
- Group related options with a divider or a labeled section instead of one flat, mixed list.
- Keep cascading submenus to one level deep so users don't lose track of where they are.

**Don't**

- Don't use a menu to represent a form field's selection state — use a select instead.
- Don't mix clearly unrelated actions into the same menu without a visual separator between them.
- Don't rely on selectedIndex or selectedValue for persisted selection — both are deprecated in favor of forge-select-dropdown.
- Don't use when options need to be immediately visible for comparison or quick access.

## Basic usage

Wrap a trigger element — typically a button — in `forge-menu` and set its `options` property to populate the dropdown.

Example (A menu opened from a button trigger.): `get_forge_blocks(blockId: "components/menu/demo/demo")`

Add an icon to an option with `icon` (or `leadingIcon`/`trailingIcon` to be explicit about placement), plus a matching `leadingIconType`/`trailingIconType` set to `"component"` to render it as a real `forge-icon` element:

```js
const options = [
  { label: "Edit", value: "edit", leadingIcon: "edit", leadingIconType: "component" },
  { label: "Delete", value: "delete", leadingIcon: "delete", leadingIconType: "component" },
];
```

## Grouped options

Pass grouped entries in `options` to divide a longer list into labeled sections instead of one flat list.

Example (A menu with its options divided into labeled sections.): `get_forge_blocks(blockId: "components/menu/grouped/grouped")`

## Cascading

Set `mode="cascade"` and nest a sub-options array on an option to open a submenu instead of selecting it immediately.

Example (A cascading menu opens a submenu instead of selecting immediately.): `get_forge_blocks(blockId: "components/menu/cascading/cascading")`

## Accessibility

### Trigger and item selection

- The trigger element that opens and closes the menu should be reachable and activatable by keyboard, with a visible focus cue.
- Pressing Space or Enter while the trigger is focused should open the menu the same way a click would.
- Once open, each menu item should be selectable using the up and down arrow keys.

### Keyboard shortcuts

| Menu open           | Action                                         |
| ------------------- | ---------------------------------------------- |
| Space / Escape      | Closes the menu.                               |
| Enter / Right arrow | Opens or closes the focused item's child menu. |
| Left arrow          | Closes the menu (cascade mode only).           |

| Menu closed | Action                                            |
| ----------- | ------------------------------------------------- |
| Space       | Opens the menu.                                   |
| Enter       | Opens the menu and its focused item's child menu. |
| Down arrow  | Opens the menu and focuses the first item.        |

### Interactive elements in a menu option

Placing an interactive element inside a menu option needs the same `forge-ignore` handling described in <a href={`${import.meta.env.BASE_URL}developing/accessibility/#nested-interactive-elements`}>nested interactive elements</a>.

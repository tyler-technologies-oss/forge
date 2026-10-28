# List

Lists present a vertical, scannable group of related items, from plain text rows to full navigation menus.

## Usage

`forge-list` groups `forge-list-item` children through `dense`, `indented`, `twoLine`/`threeLine`, `wrap`, `multicolumn`, and `navlist`, while each item carries its own `selected`, `value`, and `start`/`end` slots. The `start` slot holds a leading icon or avatar; the `end` slot holds trailing content like icons, badges, or actions. Use a list for related, primarily textual items; for content with three or more sortable dimensions, use a [table](./table.md) instead, and for content built around imagery or non-homogeneous data, use a [card](./card.md) instead.

## Rules

**Do**

- Sort list items in a logical order that makes the content easy to scan.
- Use icons in the start slot consistently — either every item has one, or none does.
- Use navlist styling when a list is functioning as navigation, such as inside a drawer.
- Use a `forge-divider` between sections of a list.
- Set `indented` on a nested list so its items sit inset from the parent list's items.

**Don't**

- Don't use a list for content that isn't primarily text — a card handles imagery better.
- Don't use a list when users need to sort or compare across three or more dimensions — use a table instead.
- Don't mix single-line and multi-line items in the same list without a good reason.

## Basic usage

Each `forge-list-item` carries its own `value` for identifying which item was interacted with.

Example (A basic list of plain text items.): `get_forge_blocks(blockId: "components/list/demo/demo")`

## Interactive items

Slot a real `<button>` or `<a>` inside a list item and it automatically picks up hover and focus states.

Example (List items wrapping interactive buttons.): `get_forge_blocks(blockId: "components/list/interactive/interactive")`

## As navigation

Set `navlist` on the list and pair each item with a leading icon and an anchor — the pattern used inside a [drawer](./drawer.md). Mark the active item with its own `selected` attribute, or set `selectedValue` on the list to match an item's `value` — either way, also add `aria-current="page"` to that item, since that's the attribute screen readers actually rely on to announce it as the current page.

Example (A navigation-styled list inside a drawer.): `get_forge_blocks(blockId: "components/list/navigation-menu/navigation-menu")`

## Expandable items

Nest an [expansion panel](./expansion-panel.md) inside a list item to show or hide additional content or a sub-list. Put that content in an element with `slot="additional-content"` — that's required for it to be visually and structurally separated from the item's main content, and announced correctly by screen readers.

```html
<forge-list-item>
  Item with more detail
  <forge-expansion-panel slot="additional-content">
    <p>Additional detail shown when expanded.</p>
  </forge-expansion-panel>
</forge-list-item>
```

## Indented

Set `indented` to indent all of a list's items. Use it for a nested list, such as a sub-list inside an expandable item, so the hierarchy reads at a glance.

```html
<forge-list indented>
  <forge-list-item>Child item</forge-list-item>
  <forge-list-item>Another child item</forge-list-item>
</forge-list>
```

## Multicolumn

Set `multicolumn` to lay out items in a responsive grid instead of a single column, for a longer list that doesn't need to be scanned top-to-bottom.

Example (A longer list laid out in a responsive multicolumn grid.): `get_forge_blocks(blockId: "components/list/multicolumn/multicolumn")`

## Accessibility

### Keyboard interaction

- Every active list item should be reachable by keyboard navigation, with a distinct visual style showing which one is currently focused.
- Pressing Space or Enter on a focused list item should activate it the same way a mouse click would.
- If a list item contains a checkbox or radio, make sure it can still be focused and toggled by keyboard.

### Roles

Give each list item a `role` attribute that describes what it's being used for, so screen readers can announce it correctly.

### Navigation lists

When a `navlist` is used for navigation, add `aria-current="page"` to the currently active item in addition to its visual `selected` state — that's the attribute screen readers actually rely on to know it's the current page.

### Expandable items

When nesting an expansion panel inside a list item, put its content in an element with `slot="additional-content"`. That's required for the content to be visually and structurally separated from the main list item content, and to be announced correctly by screen readers.

### Interactive elements in a list item

Placing more than one interactive element inside an interactive list item (like a checkbox alongside the item's main content) needs the same `forge-ignore` handling described in <a href={`${import.meta.env.BASE_URL}developing/accessibility/#nested-interactive-elements`}>nested interactive elements</a> — by default, only the list item itself receives pointer events.

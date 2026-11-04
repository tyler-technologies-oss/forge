# Listbox

Listboxes display a persistent list of options from which users select one or more.

## Overview

A listbox shows all of its options at once and lets users pick one or more of them. Unlike a select, whose options appear in a popup, a listbox stays open in the page, so users can scan, compare, and change a selection without extra clicks. It suits settings, filters, and pick lists where the choices are few enough to display together.

Listboxes are form controls, so they are often placed inside a form or card, and can be paired with another listbox to move options between lists.

## Usage

`forge-listbox` contains `forge-option` and `forge-option-group` children. Use `value` to read or set the selection, `multiple` to allow more than one option, `allowDeselect` to let users clear a single selection, and `dense`, `disabled`, and `readonly` to change presentation and interactivity. It is form-associated, so `name` and `required` work with native forms, and it dispatches `change` and `input` events when the selection changes. Use a listbox when the options should always be visible; for a compact control with a popup, use a [select](./select.md) instead.

## Rules

**Do**

- Use a listbox when users benefit from seeing every option at once.
- Keep option labels short and easy to scan.
- Set `multiple` when users can pick more than one option.
- Group related options with `forge-option-group` and a `label` slot.
- Set a `name` so the selection is submitted with the surrounding form.

**Don't**

- Don't use a listbox for long lists — use a select or autocomplete instead.
- Don't use a listbox for a binary choice — use a checkbox or switch.
- Don't rely on icons alone to distinguish options.

## Basic usage

Each `forge-option` has a `value`, and the listbox's `value` reflects the selected option.

Example (A listbox with three options.): `get_forge_blocks(blockId: "components/listbox/demo/demo")`

## Multiple

Set `multiple` to let users select more than one option. `value` becomes an array.

Example (A listbox that allows multiple selections.): `get_forge_blocks(blockId: "components/listbox/multiple/multiple")`

## Dense

Set `dense` to reduce the height of each option and fit more of them in the same space.

Example (A listbox with compact options.): `get_forge_blocks(blockId: "components/listbox/dense/dense")`

## With option groups

Wrap related options in `forge-option-group`, and label each group with an element in its `label` slot.

Example (A listbox whose options are organized into labeled groups.): `get_forge_blocks(blockId: "components/listbox/with-option-groups/with-option-groups")`

## With icons

Place a `forge-icon` in an option's `start` slot to reinforce its meaning alongside the label.

Example (A listbox with a leading icon on each option.): `get_forge_blocks(blockId: "components/listbox/with-icons/with-icons")`

## Reorderable

Set `reorderable` so users can drag options to change their order. Update the DOM in a `forge-listbox-drop` handler to apply the new order.

Example (A listbox whose options can be reordered.): `get_forge_blocks(blockId: "components/listbox/reorderable/reorderable")`

## Drag and drop

Link two listboxes by setting each one's `drag-link` and `drop-link` to the other's `id`, so users can move options between them. Handle `forge-listbox-drag-out` and `forge-listbox-drop` to move the option in the DOM.

Example (Two linked listboxes that exchange options by dragging.): `get_forge_blocks(blockId: "components/listbox/drag-and-drop/drag-and-drop")`

## Disabled

Set `disabled` on a `forge-option` to prevent that option from being selected, or on the listbox to disable all of its options.

Example (A listbox with one disabled option.): `get_forge_blocks(blockId: "components/listbox/disabled/disabled")`

## Accessibility

### Listbox and option roles

`forge-listbox` has the `listbox` role with a vertical orientation, and each `forge-option` has the `option` role. The listbox sets `aria-multiselectable` when `multiple` is set, `aria-disabled` when `disabled` is set, and `aria-readonly` when `readonly` is set.

### Keyboard interaction

A listbox has a single tab stop. Tab moves focus into the list, and the arrow keys move between options. Selection follows the keys below.

| Key                           | Action                                                                                   |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| Arrow up / Arrow down         | Moves focus to the previous or next option.                                              |
| Home / End                    | Moves focus to the first or last option.                                                 |
| Enter / Space                 | Selects the focused option.                                                              |
| Shift + Arrow up / down       | Moves focus and adds the option to the selection (`multiple` only).                      |
| Shift + Space                 | Selects the range from the last selected option to the focused option (`multiple` only). |
| Ctrl/Cmd + Shift + Home / End | Selects from the focused option to the first or last option (`multiple` only).           |
| Ctrl/Cmd + A                  | Selects every enabled option (`multiple` only).                                          |
| Printable characters          | Moves focus to the next option whose label starts with the typed text.                   |

### Labeling

Give the listbox an accessible name with `aria-label`, or point `aria-labelledby` at a visible heading or label. Without one, screen readers announce only "listbox". Give `forge-option-group` a visible label through its `label` slot so groups are announced by name.

Disabled options are skipped by selection but remain perceivable. Don't use color or an icon alone to convey an option's meaning; include it in the label.

### Drag and drop

Dragging requires a pointer. Provide another way to reorder or move options for keyboard users, such as buttons that dispatch the listbox's `--shift-up` and `--shift-down` commands.

# Checkbox

Checkboxes allow for selecting multiple options from a set.

## Overview

Checkboxes are selection controls that allow users to select multiple options from a set. They appear as small squares that display a checkmark when selected. Checkboxes are independent of each other, meaning selecting one does not affect the others in the same group.

## Usage

`forge-checkbox` selects one or more independent options through `checked` and `indeterminate`, participates natively in form submission and validation (`required`, `readonly`, `name`), and supports `dense` and `label-position`. Use a checkbox when a user can pick any number of options from a list; use a [radio button](./radio.md) instead when exactly one option in a set must be chosen, or a [switch](./switch.md) instead to toggle a single setting on or off.

## Rules

**Do**

- Use checkboxes when a user can select zero, one, or many options from a list.
- Pair every checkbox with a clear, clickable label — don't rely on the box alone.
- Use the indeterminate state to reflect a parent checkbox whose children are partially selected.

**Don't**

- Don't use a checkbox for a single on/off setting — use a switch instead.
- Don't use a checkbox when only one option in a set can be selected — use a radio button instead.
- Don't treat indeterminate as user-settable — it's a display-only state the app computes from the children's selection.

## Indeterminate

Set `checked` and `indeterminate` to render distinct marks — indeterminate reflects a parent checkbox whose children are only partially selected.

Example (Checked and indeterminate render distinct marks.): `get_forge_blocks(blockId: "components/checkbox/indeterminate/indeterminate")`

## Label position

Set `label-position` to control whether the label sits before or after the checkbox.

Example (label-position controls whether the label sits before or after the checkbox.): `get_forge_blocks(blockId: "components/checkbox/label-position/label-position")`

## Dense

Set `dense` to reduce the checkbox's size for compact layouts.

Example (Dense reduces the checkbox's size for compact layouts.): `get_forge_blocks(blockId: "components/checkbox/dense/dense")`

## Disabled and readonly

`disabled` excludes the checkbox from the form; `readonly` keeps it in the form but locks its value.

Example (Disabled excludes the checkbox from the form; readonly keeps it in the form but locks its value.): `get_forge_blocks(blockId: "components/checkbox/disabled-and-readonly/disabled-and-readonly")`

## Accessibility

### Keyboard interaction

Every checkbox must be reachable by Tab, and pressing Space while focused toggles it the same as a mouse click.

### Visual states

Checked, unchecked, focused, and disabled each need a distinct, visible cue — not just a color change.

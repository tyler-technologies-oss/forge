# Radio

The Forge Radio component is used to create a form input where only one out of a set of values should be selected.

## Overview

Radio buttons are selection controls that allow users to select exactly one option from a set of mutually exclusive choices. They appear as small circles that display a filled dot when selected. When a user selects a radio button, any previously selected option in the same group is automatically deselected, ensuring only one choice remains active at a time.

## Usage

`forge-radio` lets a user select a single option from a visible set; group related radios so only one can be checked at a time, either informally by sharing a `name` or formally inside a `forge-radio-group`. It's one of three selection controls — reach for a [checkbox](./checkbox.md) when more than one option can be selected, or a [switch](./switch.md) to turn a single item on or off. When screen space is tight or the set is long, a [select](./select.md) compacts the same choice into a closed control.

## Rules

**Do**

- Use radios when the user needs to compare all available options at a glance.
- Order options logically — alphabetical, numeric, or chronological.
- Start each option with a capital letter and use sentence case.
- Group related radios in a forge-radio-group with a legend describing the choice.
- Use clear, descriptive labels that communicate exactly what will happen when the option is selected.
- Provide a default selection when one option is most common or recommended.

**Don't**

- Don't use radios for a large set of options — use a select instead.
- Don't use a radio group when more than one option can be selected — use checkboxes instead.
- Don't use a single radio for a single yes/no choice — use a checkbox instead.

## Grouped options

Wrap related radios in a `forge-radio-group` (with a `forge-label legend` describing the choice) so they're announced as a set and can be disabled together.

Example (Radios grouped inside a forge-radio-group with a shared legend.): `get_forge_blocks(blockId: "components/radio/radio-group/demo/demo")`

## Grouping without forge-radio-group

`forge-radio-group` isn't required — radios sharing a `name` already form an implicit group:

```html
<forge-radio name="default">Option 1</forge-radio>
<forge-radio name="default">Option 2</forge-radio>
```

For a custom layout that still needs to be interpreted as a group, set `role="radiogroup"` on a plain ancestor element instead:

```html
<div role="radiogroup" aria-label="Choose an option">
  <forge-radio name="default">Option 1</forge-radio>
  <forge-radio name="default">Option 2</forge-radio>
</div>
```

## Label position

Set `label-position` to `start` to place the label before the radio instead of after it.

Example (Label position set to start.): `get_forge_blocks(blockId: "components/radio/label-position/label-position")`

## Disabled and read-only

`disabled` radios can't be focused; `readonly` radios can be focused but not changed.

Example (Disabled radios (left) can't be focused; read-only radios (right) can be focused but not changed.): `get_forge_blocks(blockId: "components/radio/disabled-and-readonly/disabled-and-readonly")`

## Dense

Set `dense` to reduce the radio's size and spacing.

Example (Dense reduces the radio's size and spacing.): `get_forge_blocks(blockId: "components/radio/dense/dense")`

## Accessibility

### Keyboard reachability

Ensure every radio is reachable by the tab key and can be selected with the keyboard, not just a pointer.

### Group labeling

Radios need to be interpreted as a group by assistive technology, and the group itself needs an accessible name — whichever grouping method you use:

- Grouping by a shared `name` attribute alone doesn't provide a group label on its own — pair it with one of the two options below.
- A plain ancestor element with `role="radiogroup"` needs an `aria-label` describing the group's purpose.
- `<forge-radio-group>` needs a `<forge-label legend>` (or equivalent) to provide that label.

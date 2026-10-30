# Select

Select components are comboboxes that present a list of options to users for single or multi-selection.

## Overview

A select component allows users to choose one or more options from a list of predefined choices. It displays the selected value in a compact input field and reveals a dropdown menu when selected or focused. The select component is ideal for conserving screen space while providing users with multiple options in an organized, accessible format.

## Usage

`forge-select` presents a list of `forge-option` (optionally grouped with `forge-option-group`) inside a field frame, and supports `label`, `placeholder`, `multiple`, and `showSelectAll`. Use it to recommend a default from a closed set of options; reach for a [autocomplete](./autocomplete.md) instead once a list runs past 10 or so options, or a [radio group](./radio.md) instead when every option must stay visible for comparison.

## Rules

**Do**

- Use concise, consistent labels that describe the meaning of the field.
- Use sentence case for every option label.
- Order options logically — alphabetical, numeric, or chronological.
- Recommend a sensible default option when one exists.

**Don't**

- Don't use a select for more than about 10 options — use an autocomplete instead.
- Don't use a select when only one option can be true and both must stay visible — use radio buttons instead.
- Don't use a colon after the label.
- Don't set option labels in all caps.

## Grouped options

Wrap related `forge-option` elements in a `forge-option-group` to label them as a set.

Example (Related options grouped under a labeled forge-option-group.): `get_forge_blocks(blockId: "components/select/grouped-options/grouped-options")`

## Multiple selection

Set `multiple` to let a user choose more than one option; selected options render as a comma-separated list in the field.

Example (Multiple lets a user choose more than one option.): `get_forge_blocks(blockId: "components/select/multiple/multiple")`

## Select all

Pair `multiple` with `showSelectAll` to add a "select all" option above the list — set `selectAllLabel` to customize its text.

Example (showSelectAll adds a select-all option above a multiple select's list.): `get_forge_blocks(blockId: "components/select/select-all/select-all")`

Clicking "select all" fires `forge-select-all` before the standard `change` event, with `detail.value` (every option's value, or an empty array when deselecting) and `detail.isAllSelected`. Calling `preventDefault()` on `forge-select-all` also suppresses the `change` event that would otherwise follow it.

```js
selectEl.addEventListener("forge-select-all", (event) => {
  if (!userMaySelectAll) {
    event.preventDefault();
  }
});
```

## Label position

Set the field's `label-position` to `inset` (default), `block-start`, or `inline-start` to place the label above, before, or floating inside the field.

Example (label-position set to block-start.): `get_forge_blocks(blockId: "components/select/label-above/label-above")`

Example (label-position set to inline-start.): `get_forge_blocks(blockId: "components/select/label-inline/label-inline")`

## Select dropdown

Attach a `forge-select-dropdown` to a button trigger instead of a field, for a select-style menu that isn't tied to a form field's layout.

Example (A forge-select-dropdown attached to a button trigger instead of a field.): `get_forge_blocks(blockId: "components/select/select-dropdown/select-dropdown")`

## Accessibility

### Keyboard interaction

| Key                                    | Action                                                                                             |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Space / Arrow up / Arrow down (closed) | Opens the select. The arrow keys also highlight the first option.                                  |
| Escape / Space (open)                  | Closes the select.                                                                                 |
| Tab / Enter                            | Selects the focused option and closes the select. If "Select all" is focused, toggles all options. |
| Arrow down / Arrow up                  | Highlights the next or previous option.                                                            |
| Home / End                             | Highlights the first or last option that isn't disabled.                                           |

In multiple-select mode, Enter toggles the focused option's selected state instead of closing the select.

### Accessible label

Set the `label` property to give the select a visible label. `forge-select` also uses it as the `aria-label` on the host element (which has `role="combobox"`).

If you need an accessible name that differs from the visible label, or you aren't showing a label at all, set `aria-label` or `aria-labelledby` on `forge-select` directly. An `aria-label` you provide is preserved and won't be overwritten by the `label` property.

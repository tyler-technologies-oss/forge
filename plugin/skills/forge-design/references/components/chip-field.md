# Chip Field

A specialized input field that lets users create and manage a collection of chips representing freeform text values or selections.

## Usage

**Deprecated**

forge-chip-field is deprecated and will be removed in a future release.
forge-text-field and forge-select are the intended replacement path once they
gain equivalent functionality — avoid building new usage on chip field.

`forge-chip-field` wraps a slotted `<input>` and shares the same field frame as a [text field](./text-field.md) (`variant`, `theme`, `shape`, `density`, `label-position`, `invalid`, `required`, `disabled`) plus its own `add-on-blur`. The field itself doesn't create chips — it fires `forge-chip-field-member-added` and `forge-chip-field-member-removed`, and the app appends or removes a [chip](./chip.md) with `slot="member"` in response. Use it for freeform, removable entries like tags or recipients; for a single value, use a plain text field, and for entries chosen from a known list, pair it with [autocomplete](./autocomplete.md) instead of accepting arbitrary text.

## Rules

**Do**

- Confirm each entered value with a clear affordance, like pressing Enter or blurring the field.
- Give every chip its own remove control so values can be deleted individually.
- Pair with autocomplete when users are choosing from a known set of values, so they aren't typing free text blind.

**Don't**

- Don't use a chip field for a single, non-repeating value — use a text field instead.
- Don't use a chip field to enter a long phrase or sentence — use a text field or textarea instead.
- Don't display static, non-interactive values as chips — use badges instead.

## Adding chips

Type a value and press Enter to fire `forge-chip-field-member-added` with the entered text; append a `forge-chip` with `slot="member"` in response, and remove it on `forge-chip-field-member-removed`.

Example (A chip field with support text guiding how to add a tag.): `get_forge_blocks(blockId: "components/chip-field/demo/demo")`

## With autocomplete

Nest a chip field inside a `forge-autocomplete` to confirm each typed value against a filtered list of suggestions instead of accepting arbitrary free text.

Example (A chip field nested inside an autocomplete, with a dropdown trigger and clear button.): `get_forge_blocks(blockId: "components/chip-field/with-autocomplete/with-autocomplete")`

## Confirm on blur

Set `add-on-blur` to confirm a chip when focus leaves the field, not just on Enter.

Example (add-on-blur confirms a chip when focus leaves the field, not just on Enter.): `get_forge_blocks(blockId: "components/chip-field/confirm-on-blur/confirm-on-blur")`

## Disabled

Set `disabled` to exclude the chip field, and its existing members, from interaction.

Example (A disabled chip field with existing members.): `get_forge_blocks(blockId: "components/chip-field/disabled/disabled")`

## Accessibility

### Labeling

Give the field's `<input>` an `id` and bind a `<label>` to it with a matching `for` attribute. Give each member chip a descriptive `aria-label` or `aria-labelledby` so a screen reader can announce what value it represents.

### Keyboard interaction

Member chips must be reachable with the Left and Right arrow keys, with a distinct visual cue showing which chip is currently focused. Backspace and Delete should remove whichever chip currently has that keyboard focus.

### Disabled state

When the field is disabled, the field itself and every member chip need to appear — and behave — disabled. A disabled field with interactive-looking chips is a common gap to check for.

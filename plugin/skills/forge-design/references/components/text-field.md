# Text Field

An input field used to capture user text input, with an optional label, helper text, and validation state.

## Overview

Text fields allow users to enter and edit text within forms, dialogs, and other interfaces. They provide a structured way to collect user input with clear labeling, validation, and formatting support to ensure data quality and usability.

## Usage

`forge-text-field` wraps a child `<input>` or `<textarea>` and an optional `<label>`, handling layout and state through `variant`, `theme`, `shape`, `density`, `label-position`, `invalid`, `required`, `optional`, and `disabled`. For a fixed set of choices, reach for a [select](./select.md) or [autocomplete](./autocomplete.md) instead; for freeform, removable entries like tags or recipients, use a [chip field](./chip-field.md).

## Rules

**Do**

- Always show a visible label — don't rely on placeholder text alone.
- Put extra guidance in helper text below the field instead of placeholder text.
- Replace helper text with error text during validation to avoid content shifting.
- Write error text as an actionable fix, and validate once the user leaves the field, not on every keystroke.
- Match field length to expected input or use consistent lengths that accommodate typical responses.

**Don't**

- Don't truncate long label text or allow labels to wrap to multiple lines.
- Don't use placeholder text as a substitute for a label — it disappears the moment the user types. The one exception is a search or filter field.
- Don't show error text and helper text in the same space — the error replaces the helper text, it doesn't stack with it.
- Don't disable a field just to display a fixed value — use a label-value pair instead.
- Don't validate before users enter information — wait until they leave the field.

## Variant

Set `variant` to `outlined` (the default), `plain`, `tonal`, `filled`, or `raised` to match the field to its surrounding context.

Example (All five field variants.): `get_forge_blocks(blockId: "components/text-field/variant/variant")`

## Label position

Set `label-position` to control where the label sits relative to the input: `inset` (the default) floats it inside the field, `block-start` places it above, `inline-start` and `inline-end` place it beside the field, and `none` hides it. Only use `none` for a search or filter field, and give the `<input>` an `aria-label` so it still has an accessible name.

Example (Label positioned above the field.): `get_forge_blocks(blockId: "components/text-field/label-above/label-above")`

Example (Label positioned inline, beside the field.): `get_forge_blocks(blockId: "components/text-field/label-inline/label-inline")`

## Helper text and validation

Slot support text in the `helper-text` slot, set `required` for a required field, and set `invalid` to swap in error text describing the fix.

**Set required on both elements**

`required` on `forge-text-field` only shows the required-field indicator — it's presentational. Native form validation and accessibility come from `required` on the nested `<input>`. Set both, or validation silently breaks.

```html
<forge-text-field required>
  <input required />
</forge-text-field>
```

Example (Helper text, a required field, and an invalid field with error text.): `get_forge_blocks(blockId: "components/text-field/helper-text-and-validation/helper-text-and-validation")`

## Multiline

Slot a `<textarea>` instead of an `<input>` for longer, multi-line responses. Prefer it over letting a single-line input grow, and size it to fit within mobile screen heights.

Example (A textarea slotted in place of an input.): `get_forge_blocks(blockId: "components/text-field/textarea/textarea")`

## Clear button

Set `show-clear` to add a button that clears the field's value, appearing once the field has a value.

Example (A clear button appears once the field has a value.): `get_forge_blocks(blockId: "components/text-field/clear-button/clear-button")`

## Leading and trailing content

Slot an icon or short text in the `start` slot to render it before the input, or in the `end` slot to render it after, like a unit suffix.

## Search and filter fields

A search or filter field is the one place a field may go without a visible label. Set `label-position="none"`, put a search icon in the `start` slot, set `show-clear`, and use a short placeholder like "Search" or "Filter by name" in place of the label. Give the `<input>` an `aria-label`, since the placeholder isn't an accessible name.

```html
<forge-text-field label-position="none" show-clear>
  <forge-icon slot="start" name="search"></forge-icon>
  <input type="search" placeholder="Search" aria-label="Search" />
</forge-text-field>
```

Every other form field keeps a visible label and doesn't use a placeholder.

## Disabled and readonly

Set `disabled` to exclude the field from the form.

Example (A disabled field.): `get_forge_blocks(blockId: "components/text-field/disabled-and-readonly/disabled-and-readonly")`

## Accessibility

### Labeling

If you're not using a `<label>` element, provide an `aria-label` or `aria-labelledby` attribute on the `<input>` directly.

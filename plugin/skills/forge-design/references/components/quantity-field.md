# Quantity Field

The quantity field pairs a numeric input with increment and decrement buttons so users can adjust a quantity with a click or by typing.

## Overview

The quantity field wraps a native number input with a decrement button on one side and an increment button on the other. It is built for small, bounded counts, like the number of items to order or attendees to register, where stepping up and down is faster than typing. It's typically used in forms and carts alongside other form fields.

## Usage

`forge-quantity-field` wraps a native `<input type="number">` in its default slot, with a `label` slot for the visible label and a `support-text` slot for hints and error messages. The input's `min`, `max`, and `step` attributes control the range and the amount each button click changes the value. Set `invalid` and `required` on the field to reflect validation state. Use `decrement-label` and `increment-label` to customize the buttons' accessible names, or replace the buttons and their icons through the `decrement-button`, `decrement-icon`, `increment-button`, and `increment-icon` slots. Use it for small numeric values; for free-form or large numbers, use a [text field](./text-field.md) with a number input instead.

## Rules

**Do**

- Slot a native `<input type="number">` into the default slot.
- Provide a visible label in the `label` slot, associated with the input through `for` and `id`.
- Set `min`, `max`, and `step` on the input to keep values within a valid range.
- Use `support-text` to explain the expected value or the validation error.
- Localize `decrement-label` and `increment-label` when the button names need to be more specific.

**Don't**

- Don't slot an input of any other type; the buttons rely on number stepping.
- Don't use it for large ranges where users would need many clicks to reach a value.
- Don't rely on the label alone to flag an error; set `invalid` and explain it in the support text.

## Basic usage

A quantity field with a label, a number input stepping by 2, and support text.

Example (A quantity field with a label, a number input, and support text between decrement and increment buttons.): `get_forge_blocks(blockId: "components/quantity-field/demo/demo")`

## Accessibility

### Labeling

Place a `<label>` in the `label` slot and associate it with the slotted input using `for` and `id`. If the field has no visible label, give the input an `aria-label`.

The decrement and increment buttons are icon-only, so each has an accessible name. They default to "Decrement" and "Increment". Set `decrement-label` and `increment-label` to make them more specific or to localize them, for example "Decrease guests" and "Increase guests".

### Keyboard interaction

The slotted `<input type="number">` keeps its native keyboard behavior, and each button is a separate tab stop.

| Key                   | Action                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| Tab                   | Moves focus between the decrement button, the input, and the increment button.                         |
| Arrow up / Arrow down | Increments or decrements the value by `step` while the input has focus (native number input behavior). |
| Enter / Space         | Activates the focused button, which steps the value by the input's `step`.                             |

The buttons call the input's `stepDown()` and `stepUp()` methods, so `min`, `max`, and `step` are respected. They then dispatch `input` and `change` events from the input, so listeners behave the same as for typed changes.

### Validation

Set `invalid` to show the error state and `required` to mark the field as required. Also set `required` on the input itself so assistive technology and form validation know about it, and use the `support-text` slot to explain the error.

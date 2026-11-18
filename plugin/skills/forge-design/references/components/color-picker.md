# Color Picker

An interactive color selection component with support for multiple color formats (hex, RGB, HSV) and optional opacity control.

## Overview

The color picker component allows users to select colors through a visual interface rather than requiring technical color knowledge. It provides an interactive canvas for color selection along with controls for adjusting hue, saturation, lightness, and opacity. This component transforms color selection from a technical task into an intuitive visual experience, making it accessible to users regardless of their familiarity with color codes or values.

## Usage

`forge-color-picker` lets a user select a color visually instead of typing a technical value, tracked through `value` (hex), `rgba`, and `hsva`. Use it inline in a form, or trigger it from a swatch button into a `forge-popover` or `forge-dialog` when space is tight.

## Rules

**Do**

- Make color selection a visual task — lead with the picker, not a raw text input.
- Offer a value format (hex, RGBA, or HSVA) that matches where the color is headed, such as RGBA when a user is copying a value from another product.
- Set allowOpacity only when transparency is a meaningful option for the value being set.

**Don't**

- Don't expose every color format at once — pick the one your data actually needs.
- Don't let arbitrary color selection bypass an existing brand or theme palette when one exists.
- Don't debounce the change event for a color that drives a live, on-screen preview — the delay reads as lag.

## Value formats

Read or set the current color as `value` (a hex string), `rgba`, or `hsva` — all three stay in sync with whichever one is set.

Example (A color picker with an initial hex value.): `get_forge_blocks(blockId: "components/color-picker/demo/demo")`

## Opacity

Set `allowOpacity` to add an alpha slider to the picker, exposing `opacity` alongside `value`, `rgba`, and `hsva`.

Example (allow-opacity adds an alpha slider to the picker.): `get_forge_blocks(blockId: "components/color-picker/opacity/opacity")`

## In a popover or dialog

Trigger the picker from a swatch button into a `forge-popover` or `forge-dialog` instead of showing it inline, when space is tight.

Example (A swatch button opens the color picker in a popover instead of showing it inline.): `get_forge_blocks(blockId: "components/color-picker/popover/popover")`

## Debounced updates

Set `debounceChangeEvent` to collapse rapid drags into a single change event instead of firing on every pixel of movement.

Example (debounce-change-event collapses rapid drags into a single change event.): `get_forge_blocks(blockId: "components/color-picker/debounced-updates/debounced-updates")`

## Accessibility

### Keyboard interaction

With the color canvas focused, the arrow keys move the selection thumb:

| Key         | Action                          |
| ----------- | ------------------------------- |
| Arrow up    | Moves the thumb position up.    |
| Arrow down  | Moves the thumb position down.  |
| Arrow left  | Moves the thumb position left.  |
| Arrow right | Moves the thumb position right. |

Tab should reach both the hex input and the "change color format" button, with a visible focus cue on each. After switching to RGBA or HSVA, verify those value inputs are keyboard-accessible too. Space or Enter on the "change color format" button cycles through the available color formats.

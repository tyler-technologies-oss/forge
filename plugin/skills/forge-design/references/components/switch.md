# Switch

Switches toggle the state of a single setting on or off.

## Overview

Switches are selection controls that allow users to toggle a single setting between two states: on/off, show/hide, etc. They appear as a sliding toggle with a marker that moves between positions to indicate the current state.

Switches provide immediate feedback and typically take effect instantly when toggled, making them ideal for settings that users want to control in real-time without requiring form submission.

## Usage

`forge-switch` toggles a single, independent setting on or off through `checked`, participates natively in form submission and validation (`required`, `readonly`, `name`, `value`), and supports `dense`, `icon`, and `label-position`. It's the third of three selection controls: reach for a [checkbox](./checkbox.md) instead when a user can select zero, one, or many options from a list, or a [radio button](./radio.md) instead when exactly one option in a visible set must be chosen.

## Rules

**Do**

- Use clear, non-neutral labels that describe what the control will do when the switch is on.
- Match label text to switch state so turning the switch on activates the labeled feature, and turning it off deactivates it.
- Use a switch for a setting that takes effect immediately, with no separate submit step.
- Write a label that describes what happens when the switch is on — say it aloud with "on/off" appended and it should make sense.
- Keep each switch independent of every other control on the screen.

**Don't**

- Don't use a switch for an action that needs review or confirmation, like Save or Submit — use a button instead.
- Don't use a switch for a setting with a neutral or indeterminate state — use a checkbox instead.
- Don't use a switch for two opposing options, like list view vs. map view — use a button toggle instead.
- Don't nest switches — use checkboxes instead so a parent control can show an indeterminate state.

## Label position

Set `label-position` to control whether the label sits before or after the switch.

Example (label-position controls whether the label sits before or after the switch.): `get_forge_blocks(blockId: "components/switch/label-position/label-position")`

## Dense

Set `dense` to reduce the switch's size.

Example (Dense reduces the switch's size.): `get_forge_blocks(blockId: "components/switch/dense/dense")`

## Icons

Pass custom icons through the `icon-on` and `icon-off` slots.

Example (Custom icons passed through the icon-on and icon-off slots.): `get_forge_blocks(blockId: "components/switch/icons/icons")`

## Disabled and readonly

`disabled` excludes the switch from the form; `readonly` keeps it in the form but locks its value.

Example (Disabled excludes the switch from the form; readonly keeps it in the form but locks its value.): `get_forge_blocks(blockId: "components/switch/disabled-and-readonly/disabled-and-readonly")`

## Accessibility

### Keyboard interaction

Ensure the switch is reachable by the tab key and can be toggled with the keyboard, not just a pointer.

### Screen reader behavior

The switch automatically applies `role="switch"` and `aria-checked` to the input, so assistive technology announces its state without any extra wiring.

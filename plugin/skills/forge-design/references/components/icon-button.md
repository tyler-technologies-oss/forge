# Icon Button

Icon buttons are buttons that contain only an icon, and are used to represent actions or commands.

## Overview

Icon buttons communicate actions using visual icons instead of text labels. They pair with tooltips which show the action name for clarity and should be placed close to the content they act on. Icon buttons are ideal for saving space while maintaining functionality.

## Usage

`forge-icon-button` handles action emphasis through `variant`, `theme`, `shape`, and `density`, plus toggle, anchor, and badge support. Since there's no visible label, always set an accessible name with `aria-label` and pair the button with a [tooltip](./tooltip.md) so its action is clear on hover or focus. Reach for a text [button](./button.md) instead when the action isn't widely recognizable from an icon alone.

## Rules

**Do**

- Use icon buttons for globally familiar, easily recognized actions (undo, edit, save, close).
- Always set an accessible label with aria-label, since the button has no visible text.
- Pair an icon button with a tooltip so its action is clear without relying on the icon alone.

**Don't**

- Don't use when the icon meaning might be ambiguous to users.
- Don't use when actions require a detailed explanation that can't be conveyed through a simple icon and tooltip.
- Don't use an icon button for a domain-specific or unfamiliar action — use a text button instead.
- Don't mix icon buttons and text buttons within the same group or table row.

## Variants

Pick the variant that matches the action's emphasis, same as a text button: `icon` (the default, lowest emphasis) for most toolbar and row-level actions, `outlined` or `tonal` for secondary emphasis, `filled` for a stronger fill, and `raised` for the one primary action in a view.

Example (The five icon button variants, ordered from lowest to highest emphasis.): `get_forge_blocks(blockId: "components/icon-button/variants/variants")`

## Theme

Icon buttons default to a neutral theme. Set `theme` to a semantic or brand color to reinforce the action's meaning.

Example (Every theme available on an icon button.): `get_forge_blocks(blockId: "components/icon-button/themed/themed")`

## Toggle

Set `toggle` for an icon button that represents a persistent on/off state — such as marking a favorite — and provide an `on` slot icon to swap in when `pressed` is true. Any icon can technically fill either slot, but the convention is an outlined-style icon for the default "off" state and a filled-style version of the same icon for the "on" slot, so the visual weight itself reinforces the state change.

Example (A toggle icon button in each variant, swapping icons between its default and on slot.): `get_forge_blocks(blockId: "components/icon-button/toggle/toggle")`

## As a link

Wrap an `<a>` inside a `forge-icon-button` to get a navigation link styled as an icon button.

Example (An icon button that navigates. Note the anchor child.): `get_forge_blocks(blockId: "components/icon-button/anchor/anchor")`

## With a badge

Pass a [badge](./badge.md) into the `badge` slot to overlay a count or dot indicator, most often for unread or new content.

Example (A numeric badge overlaid on an icon button.): `get_forge_blocks(blockId: "components/icon-button/with-badge/with-badge")`

## Loading

Swap in a `forge-circular-progress` in place of the icon to indicate a pending action.

Example (A circular progress indicator replaces the icon while the action is pending.): `get_forge_blocks(blockId: "components/icon-button/with-circular-progress/with-circular-progress")`

## Label aware

Wrap an icon button in a `forge-label` to give it a persistent, visible caption alongside its accessible label — useful when an icon alone may not be immediately familiar to every user.

Example (A forge-label caption sits beneath the icon button.): `get_forge_blocks(blockId: "components/icon-button/with-label/with-label")`

## Accessibility

### Labeling and keyboard activation

- Make sure every icon button can be reached by keyboard navigation, with a visible focus cue.
- Give it an `aria-label` or `aria-labelledby` describing its purpose — an icon alone isn't enough for assistive technology.
- Pressing Space or Enter while an icon button is focused should activate it the same way a mouse click would.
- If color is used to convey state (like a toggled-on state), pair it with an additional cue for users with color perception deficiencies.

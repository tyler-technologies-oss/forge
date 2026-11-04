# Chip

A compact, interactive element that represents an entity, action, or attribute with support for selection, removal, and various styling options.

## Overview

Chips allow users to enter information, make selections, filter content, or trigger actions. They appear dynamically as groups of multiple interactive elements and provide a compact way to display options, tags, or actionable items. Unlike buttons, which serve as consistent calls to action, chips are contextual and can be added, removed, or modified based on user interaction.

## Usage

`forge-chip` represents an entity, filterable attribute, or action through its `type` — `choice`, `filter`, `action`, `input`, or `field` — plus `theme`, `selected`, and `dense`. Chips are interactive and appear dynamically as a group inside a `forge-chip-set`; reach for a [button](./button.md) instead for a persistent, primary call to action, or a [badge](./badge.md) instead for non-interactive status.

## Rules

**Do**

- Group related chips inside a single forge-chip-set.
- Offer at least two options in a choice or filter chip set.
- Pair a leading icon or avatar in the start slot to help users scan a set.
- Use chips for choices, filters, or actions that appear dynamically and contextually.

**Don't**

- Don't use a chip for static, non-interactive information — use a badge instead.
- Don't use a chip as a substitute for a persistent primary action — use a button instead.
- Don't render a single, isolated choice or filter chip.

## Types

Set `type` to match the chip's role: `choice` for a single selection from a small set, `filter` for the same pattern applied to filtering content, `action` (the default) for a contextual action, `input` for a removable, user-entered value, and `field` for chips living inside a `forge-chip-field`.

Example (A basic chip set using the default action type.): `get_forge_blocks(blockId: "components/chips/demo/demo")`

## With an icon or avatar

Pair a chip's label with a leading icon or avatar via the `start` slot to help users scan a set at a glance.

Example (A leading avatar identifies who or what each chip represents.): `get_forge_blocks(blockId: "components/chips/avatar/avatar")`

## As a link

Set `href` (plus optional `target`, `download`, `rel`) to render the chip as a navigating anchor instead of firing a selection or delete event.

Example (Setting href renders the chip as a navigating anchor.): `get_forge_blocks(blockId: "components/chips/anchor/anchor")`

## Choice and filter

Set `type="choice"` for a single selection from a small set, or `type="filter"` for the same pattern applied to filtering content — both share the same `selected` state.

Example (Choice chips (single selection) and filter chips (narrowing content) share the same selected state.): `get_forge_blocks(blockId: "components/chips/choice-and-filter/choice-and-filter")`

## Removable

Set `type="input"` for a chip that renders a built-in remove control.

Example (Input chips render a built-in remove control.): `get_forge_blocks(blockId: "components/chips/removable/removable")`

## Dense

Set `dense` to reduce a chip's height and padding for compact layouts.

Example (Dense reduces height and padding for compact layouts.): `get_forge_blocks(blockId: "components/chips/dense/dense")`

## Accessibility

### Keyboard interaction

Chips must be reachable by Tab, with a visible cue for active, inactive, and focused states. Pressing Space or Enter while a chip is focused should toggle it the same way a click would. If a chip has a delete icon, make sure it can be focused and activated independently of the chip body — a screen reader or keyboard user needs to reach the delete action on its own, not just the chip as a whole.

### Screen reader behavior

Set a `role` on the chip so assistive technology can announce what it represents (a filter, a selection, an input value) rather than reading it as generic content.

### Color and contrast

Meet WCAG contrast requirements between a chip's foreground text and background. If a chip's color conveys meaning on its own, pair it with an icon or label — don't rely on color alone for users with color vision deficiencies.

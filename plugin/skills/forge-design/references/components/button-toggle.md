# Button Toggle

Button toggles allow users to select from a group of choices with single or multiple selection.

## Overview

Button toggle is a selection component that groups related options into a unified control, allowing users to choose one option from a set of alternatives. It functions similarly to radio buttons but with a more prominent visual treatment that emphasizes the available choices and current selection state.

Button toggles are commonly used for switching between different views of the same information or selecting from a small set of related options where the choices need to be immediately visible and easily comparable.

## Usage

`forge-button-toggle-group` groups `forge-button-toggle` children into one bordered control, enforcing a single selection by default or several when `multiple` is set, through `outlined`, `vertical`, `stretch`, `dense`, and `theme` — plus native form participation via `name` and `required`. Use it for a small, always-visible set of options; reach for a [radio group](./radio.md) when each option needs a fully written-out label, or a [select](./select.md) instead once there are more than a handful of options.

## Rules

**Do**

- Limit a button toggle group to a small, glanceable set of options.
- Pair every icon-only button toggle with an aria-label.
- Use multiple only when more than one option can be true at once, like text formatting.

**Don't**

- Don't use a button toggle group for more than a handful of options — use a select instead.
- Don't rely on icons alone without an accessible label on each button toggle.
- Don't mix single- and multi-select semantics within the same group.

## Selection

A button toggle group enforces a single selection by default — choosing one option deselects any other. Set `multiple` when more than one option can be true at once, such as a text-formatting toolbar.

Example (Only one button toggle in the group is active at a time.): `get_forge_blocks(blockId: "components/button-toggle/demo/demo")`

## Outline

`outlined` is on by default, drawing a border around the group; set it to `false` for a borderless button toggle group.

Example (Outlined (default) compared to no-outline.): `get_forge_blocks(blockId: "components/button-toggle/outline/outline")`

## With icons

Slot a `forge-icon` inside a button toggle to pair its label with a leading icon.

Example (A leading icon reinforces each option's label.): `get_forge_blocks(blockId: "components/button-toggle/with-icons/with-icons")`

## Dense and vertical

Pair `dense` with `vertical` for a compact, stacked button toggle group.

Example (A dense, vertical button toggle group.): `get_forge_blocks(blockId: "components/button-toggle/dense-and-vertical/dense-and-vertical")`

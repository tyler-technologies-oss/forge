# Split Button

Splits an action into two parts — typically a primary action and a secondary action that opens a menu or performs an alternative action.

## Overview

Split buttons communicate multiple related actions that users can take while providing a clear primary action alongside alternative options. They consist of a main button for the suggested action and a dropdown arrow that reveals secondary related actions, allowing users to access variations of the primary action without cluttering the interface.

Split buttons are particularly effective when space is limited and multiple related actions need to be accessible through a single interface element.

## Usage

`forge-split-button` groups two or more slotted `forge-button` children into a single visual unit, propagating `variant`, `theme`, `disabled`, `dense`, and `pill` to every button so they render consistently. Pair a primary action with a `forge-menu` trigger for a classic split button, or slot several buttons directly for a segmented group of equally-weighted actions. For actions that aren't related to one another, use individual [buttons](./button.md) or [icon buttons](./icon-button.md) instead.

## Rules

**Do**

- Keep every button in a split button related to the same task.
- Limit related actions to three, so the group stays easy to scan.
- Use the same sentence-case, actionable labels as standalone buttons.
- Reserve filled for the one primary action per view, same as individual buttons.

**Don't**

- Don't group unrelated actions into one split button — use individual buttons instead.
- Don't use more than one filled split button per page or dialog.
- Don't use success or warning themes — use primary.

## With a menu

Slot a primary `forge-button` alongside a `forge-menu` whose trigger button carries `popover-icon` to open a dropdown of related, secondary actions.

Example (A primary action paired with a menu of related actions.): `get_forge_blocks(blockId: "components/split-button/demo/demo")`

## Multiple actions

Slot several `forge-button` children directly, without a menu, for a segmented group of equally-weighted actions.

Example (Three related buttons rendered as one segmented group.): `get_forge_blocks(blockId: "components/split-button/multiple-actions/multiple-actions")`

## Dense and pill

Set `dense` and `pill` to shape the group into a compact, rounded control.

Example (A dense, pill-shaped split button.): `get_forge_blocks(blockId: "components/split-button/dense-and-pill/dense-and-pill")`

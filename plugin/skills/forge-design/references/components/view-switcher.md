# View Switcher

A view switcher shows one of several views at a time, animating between them along a shared axis as the active index changes.

## Overview

The view switcher component allows users to toggle between different views of related content using smooth transitions. It employs a shared axis pattern to display transitions between UI elements that have spatial or navigational relationships. This pattern uses shared transformations to reinforce the connection between elements, making content changes feel cohesive and intentional rather than jarring.

The component is commonly used with tabs, navigation controls, or other switching mechanisms to control which view is actively displayed while maintaining the relationship between different content states.

## Usage

`forge-view-switcher` shows one `forge-view` child at a time, set via `index` and transitioning with `animationType` (`none`, `slide`, or `fade`), plus `next()`/`previous()`/`goToStart()`/`goToEnd()` for programmatic control. Drive its `index` from whatever is switching views — most often a [tab bar](./tabs.md)'s change event, or a [stepper](./stepper.md)'s selected step. The slide/fade transitions reinforce that the views are spatially related, the same way switching tabs in a card should feel connected rather than like a hard cut.

Inactive views stay mounted in the DOM — switching `index` doesn't unmount them. Account for that if an inactive view has running scripts or timers, or holds an element `id` that must stay unique across the page.

## Rules

**Do**

- Drive index from the control that owns the switching decision — a tab bar or stepper — rather than duplicating that state.
- Use a slide or fade transition when the views are spatially or navigationally related, so the motion reinforces that relationship.
- Keep every view's content sized similarly so the transition doesn't jump awkwardly in height.

**Don't**

- Don't use a view switcher for views that have no real relationship to each other — a hard cut may read more honestly.
- Don't drive index from more than one source at a time — pick a single owner for the active index.

## Basic usage

A tab bar's change event sets `index` on the view switcher below it, showing the matching `forge-view`.

Example (A tab bar drives which view is active in the switcher below it.): `get_forge_blocks(blockId: "components/view-switcher/basic-usage/basic-usage")`

## Animation

Set `animationType` to `fade` for a cross-fade between views instead of the default hard cut.

Example (A fade transition between views instead of a hard cut.): `get_forge_blocks(blockId: "components/view-switcher/animation/animation")`

## Accessibility

### Keyboard interaction

Verify that you can tab into a `forge-view`'s content, and that every element inside it is reachable and operable using only the keyboard.

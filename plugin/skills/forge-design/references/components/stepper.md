# Stepper

Steppers break a multi-step process into a numbered sequence, showing progress toward completion.

## Overview

Guided steppers provide a clear path to completion by breaking complex processes into manageable steps. Offering users a clear idea of how many steps it takes to reach the final target can significantly reduce abandonment, while presenting information in meaningful sections facilitates completion and reduces cognitive load.

## Usage

`forge-stepper` sequences `forge-step` children through `linear`, `selectedIndex`, `layoutMode`, and `vertical`, while each step tracks its own `completed`, `error`, `editable`, and `expanded` state. Use it for an unfamiliar or complex process a user completes occasionally, especially when tracking progress matters; skip it for a familiar, repetitive task, where a plain form is simpler.

## Rules

**Do**

- Use a stepper for a process that's unfamiliar, complex, or only completed occasionally.
- Mark optional steps clearly to set proper expectations.
- Enable navigation to previous steps when the process allows editing.
- Make steppers self-sufficient with all necessary information accessible within the process.
- Mark completed steps so progress stays visible, and surface an error state on a step with missing or invalid data.
- Use vertical mode on mobile and horizontal mode on desktop for the same flow.

**Don't**

- Don't use a stepper for a familiar or repetitive task — a plain form is simpler.
- Don't let a linear stepper allow skipping ahead to a step whose prerequisites aren't complete.
- Don't use more steps than the process actually needs — combine steps that are always completed together.
- Avoid requiring information from another part of the app that forces users to leave and restart.
- Don’t create separate "Submit" steps. Use "Review" as a final step or integrate submission into the last content step.

## Basic usage

Each `forge-step` carries its own `index`, and an optional `slot="optional"` caption or `slot="expansion-content"` for extra detail.

Example (A horizontal stepper with an optional label and expandable content.): `get_forge_blocks(blockId: "components/stepper/demo/demo")`

## Linear vs. non-linear

`linear` (the default) requires the user to complete a step before moving to the next one. Set `linear` to `false` for non-linear navigation instead, where the user can jump directly to any step at any time — better suited to a set of steps that don't have to happen in order.

## Vertical

Set `vertical` on the stepper (and each step) to stack steps top-to-bottom — better suited to mobile layouts.

Example (A vertical stepper, better suited to mobile layouts.): `get_forge_blocks(blockId: "components/stepper/vertical/vertical")`

## Accessibility

### Keyboard interaction

`forge-stepper` uses a single tab stop. Tab moves focus to the selected step, and the arrow keys move between steps.

| Key                      | Action                                                        |
| ------------------------ | ------------------------------------------------------------- |
| Arrow left / Arrow right | Moves focus to the previous or next step (horizontal layout). |
| Arrow up / Arrow down    | Moves focus to the previous or next step (vertical layout).   |
| Home / End               | Moves focus to the first or last step.                        |
| Enter / Space            | Selects the focused step.                                     |

### ARIA

`forge-stepper` has `role="tablist"` and each `forge-step` has `role="tab"`. `aria-selected` reflects the currently selected step, not whether a step is completed, and is managed automatically. Disabled steps get `aria-disabled`. Completed, error, and editable states are visual only, so describe them in the step's label or supporting text if users need to know about them.

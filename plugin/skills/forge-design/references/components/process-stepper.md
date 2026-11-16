# Process Stepper

Process steppers display progress through a multi-step process and let users move to a step.

## Overview

A process stepper shows where someone is in a multi-step process, such as a permit application, a checkout, or a record's review workflow. Each step has a state marker, a label, and optionally supporting text and details, so users can see what is done, what is happening now, and what remains. Steps can also act as navigation, taking users back to a step they have already completed.

Process steppers are typically paired with a form or a record page, and are placed beside the content, or above it, in a vertical or horizontal layout.

## Usage

`forge-process-stepper` contains `forge-process-step` children. Set `orientation` to `vertical` (the default) or `horizontal`, `numbered` to show step numbers in not-started markers, and `readonly` to display progress without making steps interactive. On each step, set `state` to `not-started`, `current`, `in-progress`, `completed`, or `critical`, `href` to render the step as a link, and `disabled` to block interaction. The stepper dispatches `change` when a step is selected; read the step from its `selectedStep` property. Use a process stepper for progress through a process; to switch between peer content, use [tabs](./tabs.md) instead.

## Slot locations

The `marker` slot replaces the generated state marker with your own content.

## Rules

**Do**

- Keep step labels short and descriptive.
- Mark exactly one step as `current`.
- Use `support-text` for brief labels like Optional, and `detail` for richer content.
- Use `critical` on a step that has an error, and explain it in the step's detail.
- Give the stepper an accessible name with a visible title when it stands alone.

**Don't**

- Don't use a process stepper to switch between peer sections of content — use tabs.
- Don't use it for a single step or an unordered set of tasks.
- Don't rely on the marker's color alone to convey state.
- Don't add so many steps that the stepper no longer fits its space.

## Basic usage

Set each step's `state` to show progress. Steps are buttons by default, and the stepper dispatches `change` when one is selected.

Example (A vertical process stepper with completed, current, and not-started steps.): `get_forge_blocks(blockId: "components/process-stepper/demo/demo")`

## Horizontal

Set `orientation="horizontal"` to lay steps out across the page, for processes with few steps and short labels.

Example (A horizontal process stepper.): `get_forge_blocks(blockId: "components/process-stepper/horizontal/horizontal")`

## States

A step's `state` sets its marker: `not-started`, `current`, `in-progress`, `completed`, or `critical`. Use `support-text` for additional context.

Example (Steps in each of the five states.): `get_forge_blocks(blockId: "components/process-stepper/states/states")`

## Disabled

Set `disabled` on a step that users can't go to yet. It keeps the marker for its state, is dimmed, and ignores interaction.

Example (A horizontal process stepper with disabled upcoming steps.): `get_forge_blocks(blockId: "components/process-stepper/disabled/disabled")`

## With title

Label the stepper with a visible title using `aria-labelledby`.

Example (A horizontal process stepper labelled by a heading.): `get_forge_blocks(blockId: "components/process-stepper/with-title/with-title")`

## With details

Slot content into a step's `detail` slot to show dates, subtasks, or actions beneath its label.

Example (Steps with label-values, checkboxes, and a button in their detail slots.): `get_forge_blocks(blockId: "components/process-stepper/with-details/with-details")`

## Readonly

Set `readonly` to show progress only. Steps render no button or link and can't be activated.

Example (A read-only horizontal process stepper.): `get_forge_blocks(blockId: "components/process-stepper/readonly/readonly")`

## Numbered

Set `numbered` to show each not-started step's number in its marker. Steps with an icon marker, like completed steps, still show the icon.

Example (A horizontal process stepper with numbered markers.): `get_forge_blocks(blockId: "components/process-stepper/numbered/numbered")`

## Accessibility

### List and step roles

`forge-process-stepper` has the `list` role and each `forge-process-step` has the `listitem` role, so screen readers announce the number of steps. Each step also exposes its position and the total, which you can override with `aria-posinset` and `aria-setsize` when the steps shown are only part of a longer process.

### Screen reader behavior

Each interactive step renders a native `button`, or an `a` when `href` is set. The `current` step is marked with `aria-current="step"`. Because the marker is visual, each step appends visually hidden state text such as "(Completed)" or "(Not started)" to its label, and `support-text` is associated through `aria-describedby`.

A disabled link step uses `role="link"` with `aria-disabled="true"`. In a `readonly` stepper, steps render no button or link, only the label and state text.

### Keyboard interaction

Steps are standard buttons or links, so each is a tab stop in order.

| Key           | Action                                                                  |
| ------------- | ----------------------------------------------------------------------- |
| Tab           | Moves focus to the next step (or interactive content in details).       |
| Shift + Tab   | Moves focus to the previous step.                                       |
| Enter / Space | Activates a step button, selecting the step. Enter follows a link step. |

Disabled and read-only steps are not focusable.

### Labeling

Give the stepper an accessible name with `aria-label`, or point `aria-labelledby` at a visible title. Keep step labels unique and meaningful on their own. Slotted detail content, like checkboxes and buttons, needs its own accessible names.

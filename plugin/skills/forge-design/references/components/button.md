# Button

Buttons allow users to take actions and make choices with a single tap.

## Overview

Buttons communicate actions that users can take. They are typically placed throughout your UI in places such as dialogs, forms, cards, tables, toolbars, etc.

## Usage

`forge-button` handles every level of action emphasis through variant, size, and theme, plus icons, anchor navigation, loading, and disabled states. Pick the variant that matches an action's importance, reserve `filled` for the one primary action per view, and let theme, icon, and state carry the rest.

## Rules

**Do**

- Use sentence case ("Start new").
- Use short, actionable verbs ("Submit", "Save", "Delete").
- Use the primary theme color.
- One filled button per group, placed at the end (right).
- Space adjacent buttons with --forge-spacing-medium (--forge-spacing-xsmall in dense layouts).

**Don't**

- Don't use more than one filled button per page or dialog.
- Don't put two filled buttons next to each other.
- Don't use success or warning colors — use primary.
- Don't pair overlapping actions ("Start over" + "Cancel").

## Variants

Pick one variant per action, based on its level. **Filled** is the primary action — never more than one per page or dialog. **Tonal** is for secondary actions, and **text** is for tertiary actions like dismiss or skip. **Outlined** and **raised** are available but aren't part of this hierarchy; see [Grouping](#grouping) for how to combine levels.

Example (The four button variants, ordered from lowest to highest emphasis.): `get_forge_blocks(blockId: "components/button/variants/variants")`

## Theme

Buttons default to the primary theme. Use `theme="error"` for destructive confirmations. Success and warning themes exist but should be reserved for status-conveying actions inside toolbars or lists — never for the primary submit on a form.

Example (Primary is the default. Reserve error for destructive actions; the remaining themes exist but should be used sparingly.): `get_forge_blocks(blockId: "components/button/themed/themed")`

## Grouping

Buttons in a group follow an action hierarchy. Give each action a level, then use the matching variant:

- **Primary** uses `filled`. This is the single main action. Use at most one per page or dialog.
- **Secondary** uses `tonal`. This is an alternative to the primary action.
- **Tertiary** uses `text`. This is a low-emphasis action.

Order buttons by level from right to left: primary at the end (right), secondary to its left, and tertiary leftmost. Space buttons with `--forge-spacing-medium`. For a destructive action, keep its level and add `theme="error"`. Groups have at most 3 buttons; move any extra actions into a `forge-menu`.

### Action levels

| Level     | Variant  | Position        |
| --------- | -------- | --------------- |
| Primary   | `filled` | Rightmost (end) |
| Secondary | `tonal`  | Left of primary |
| Tertiary  | `text`   | Leftmost        |

### Combinations

| Actions                        | Layout (left to right)              | Example                    |
| ------------------------------ | ----------------------------------- | -------------------------- |
| Primary + secondary (default)  | `tonal`, `filled`                   | Cancel, Save               |
| Primary + tertiary             | `text`, `filled`                    | Skip, Continue             |
| Primary + secondary + tertiary | `text`, `tonal`, `filled`           | Cancel, Save draft, Submit |
| Secondary + tertiary           | `text`, `tonal`                     | Dismiss, View details      |
| Destructive primary            | `tonal`, `filled` + `theme="error"` | Cancel, Delete             |

## As a link

Wrap an `<a>` in a `forge-button` to get a navigation link styled as a button. Use this sparingly — buttons imply action, links imply navigation. If the action is "go somewhere", prefer a plain link.

Example (A button that navigates. Note the anchor child.): `get_forge_blocks(blockId: "components/button/anchor/anchor")`

## With an icon

Wrap an `<forge-icon>` in a `forge-button` to add an icon to the button. Icons can be placed at the start or end of the button label to reinforce the action.

Example (Icons go in the start slot for actions, end slot for directional cues.): `get_forge_blocks(blockId: "components/button/with-icon/with-icon")`

## Loading

Forge doesn't ship a built-in loading state on `forge-button`. To indicate a pending action, swap in a `forge-circular-progress` alongside the label.

Example (A spinner in the end slot conveys a pending action.): `get_forge_blocks(blockId: "components/button/with-circular-progress/with-circular-progress")`

## Disabled

Set `disabled` to remove a button from the tab order and prevent interaction — every variant supports it.

Example (Every variant supports disabled.): `get_forge_blocks(blockId: "components/button/disabled/disabled")`

## Accessibility

### Keyboard interaction

Every button must be reachable by keyboard, with a visible focus indicator, and pressing Space or Enter while focused must activate it the same as a mouse click.

### Accessible name

Give every button a visible label describing the action it performs. When there's no visible text — an icon-only button — provide one via `aria-label` instead.

### Contrast

Button text and its background must meet WCAG contrast requirements.

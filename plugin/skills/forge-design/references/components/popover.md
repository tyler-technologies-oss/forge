# Popover

A popover floats content above the page, positioned relative to the trigger element that anchors it.

## Usage

`forge-popover` floats its content above the page, anchored to a trigger element by `anchor` (the trigger's id), through `placement`, `triggerType`, `preset`, and `arrow`. Use it for content that needs more than a couple of words — a form, a set of options, or a preview — triggered by clicking, hovering, or focusing another element. For a one- or two-word label, use a [tooltip](./tooltip.md) instead; forge-popover is also the foundation other components build on, like [menu](./menu.md), [select](./select.md), and [date picker](./date-picker.md).

## Rules

**Do**

- Use a popover when the content is more than a couple of words — a definition, a form, or extra context for a component.
- Set anchor to the id of the exact element that triggers the popover.
- Give a non-modal popover a way to close explicitly if dismissing it accidentally could lose the user's work.

**Don't**

- Don't use a popover for a one- or two-word label — use a tooltip instead.
- Don't nest a popover inside another popover's content.
- Don't rely on a popover alone for content essential to completing a task on a touch device without a comparable trigger type.

## Basic usage

Set `anchor` to the id of the trigger element; the popover positions itself relative to it automatically.

Example (A popover anchored to a button, structured with a scaffold.): `get_forge_blocks(blockId: "components/popover/demo/demo")`

## Popover vs. dialog

Popovers are transient and non-modal — anchored to a trigger, they don't block interaction with the rest of the page. Dialogs are typically modal and reserved for content that demands the user's immediate attention, like a confirmation or a form that must be completed before moving on. The line can blur in practice; when it's genuinely ambiguous which one fits, weigh the UX and accessibility implications of blocking (or not blocking) the rest of the page rather than defaulting to one or the other.

## Non-modal

`forge-popover` has no semantic meaning by default — it's up to you to add ARIA attributes appropriate to its content. Set `role="dialog"` and `aria-modal="false"` for a popover that doesn't trap focus or block interaction with the rest of the page — useful for a lightweight, persistent form.

Example (A non-modal popover that doesn't block interaction with the rest of the page.): `get_forge_blocks(blockId: "components/popover/non-modal/non-modal")`

## Distinct

Give related popovers the same `distinct` value to guarantee only one of them is ever open at a time.

Example (Two popovers sharing a distinct value, so opening one closes the other.): `get_forge_blocks(blockId: "components/popover/distinct/distinct")`

## Accessibility

### No default semantics

A popover has no semantic meaning by default. Add the appropriate ARIA attributes to the popover itself, or to the content inside it, based on what that content actually needs.

### Popover vs. dialog

Popovers are transient and non-modal — they don't block interaction with the rest of the page. Dialogs are typically modal and demand the user's immediate attention. When a design calls for something in between, weigh the UX and accessibility implications of each rather than defaulting to one.

To make a popover behave like a non-modal dialog, add `role="dialog"` and `aria-modal="false"` — this tells screen readers it's a dialog that doesn't block the rest of the page, which is useful for gracefully handling in-progress form entry without risking accidental data loss on dismiss.

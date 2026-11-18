# Stack

A layout utility that manages spacing and alignment of its immediate children along a single vertical or horizontal axis.

## Usage

`forge-stack` lays out its immediate children along one axis through `inline` (horizontal instead of the default vertical), `wrap`, `stretch`, `gap`, `alignment`, and `justify`. It's a thin, single-purpose abstraction over `flex` — reach for CSS Flexbox or Grid directly once a layout needs more than one axis or more complex behavior than the stack's own properties cover.

It's easy to overuse the stack component and end up with a lot of nested stacks, which hurts both performance and maintainability. Use it judiciously — for straightforward single-axis spacing — and reach for CSS Flexbox or Grid for anything more complex.

## Rules

**Do**

- Use a stack for simple, single-axis spacing between a handful of children.
- Set gap to a Forge spacing token instead of margins on individual children.
- Reach for CSS Flexbox or Grid once a layout needs more than one axis.

**Don't**

- Don't nest more than a couple of stacks to build a complex layout — that's a sign to switch to Flexbox or Grid directly.
- Don't use a stack as a general-purpose container — it's a spacing utility, not a layout component with its own semantics.

## Basic usage

Children stack vertically by default, spaced by `gap`.

Example (A vertical stack with even spacing between children.): `get_forge_blocks(blockId: "components/stack/demo/demo")`

## Vertical form

A vertical stack keeps form fields evenly spaced without hand-tuned margins between them.

Example (A simple vertical form layout with even spacing between fields.): `get_forge_blocks(blockId: "components/stack/simple-vertical-form/simple-vertical-form")`

## Nesting for multi-column layouts

Nest an `inline` stack inside a vertical one for a form with multiple columns or mixed spacing — keep nesting shallow, since this is exactly the pattern that gets unwieldy if it grows much further.

Example (A more complex form layout using nested stacks for multiple columns.): `get_forge_blocks(blockId: "components/stack/complex-form/complex-form")`

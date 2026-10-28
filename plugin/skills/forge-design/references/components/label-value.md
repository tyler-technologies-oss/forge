# Label Value

Label values display a label and value pair in a compact format with the proper typography and spacing styles applied.

## Usage

`forge-label-value` displays a readonly `label` and `value` pair, with an optional leading `icon` slot, plus `empty`, `ellipsis`, and `inline`. Use it for data the user can view but not edit, most often inside a [card](./card.md) or a submitted form; reach for a [text field](./text-field.md) with `disabled` instead only when the value is still part of an editable form. For long, text-heavy content, use a list instead — label value is meant for succinct data.

## Rules

**Do**

- Use label value for readonly data with a short label and a short value.
- Use it in place of a disabled text field when the value will never be edited on that screen.
- Communicate elsewhere on the page whether and how the value can be edited.

**Don't**

- Don't use label value for long titles or paragraphs of text — use a list instead.
- Don't fill a screen with disabled text fields when label value pairs would read more clearly.
- Don't imply interactivity — label value has no hover or focus state.

## With an icon

Pair the value with a leading icon via the `icon` slot to reinforce its meaning.

Example (An icon in the icon slot sits beside the label.): `get_forge_blocks(blockId: "components/label-value/icon/icon")`

## Inline

Set `inline` to place the label and value on the same line instead of stacking them.

Example (Inline places the label and value side by side.): `get_forge_blocks(blockId: "components/label-value/inline/inline")`

## Empty

Set `empty` to give a missing value distinct styling instead of leaving it blank.

Example (Empty gives a missing value distinct styling instead of leaving it blank.): `get_forge_blocks(blockId: "components/label-value/empty/empty")`

## Ellipsis

Set `ellipsis` to truncate a value that's too long for its container.

Example (Ellipsis truncates a value that's too long for its container.): `get_forge_blocks(blockId: "components/label-value/ellipsis/ellipsis")`

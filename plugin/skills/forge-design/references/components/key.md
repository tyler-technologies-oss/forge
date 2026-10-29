# Key

Keys label the meaning of colors or values in a chart or data visualization, such as which color in a grouped meter represents which series.

## Usage

`forge-key` lays out one or more `forge-key-item` entries, each pairing a colored icon with a label (and an optional `value` slot), to explain what a color or series means in a chart or visualization. It's the standard companion to a [grouped meter](./meter.md): label each meter in the group with a key item sharing its color, so the grouping is legible without relying on color alone.

## Rules

**Do**

- Match each key item's icon color exactly to the color of the data it labels.
- Pair every grouped meter with a key — color alone isn't enough to distinguish its parts.
- Use the value slot when a specific number, not just a label, helps interpret the visualization.

**Don't**

- Don't use a key for a single, unsegmented value with nothing else to distinguish.
- Don't let a key's color drift from the visualization's actual colors after a theme or data change.

## Basic usage

Each `forge-key-item` pairs an icon color with a label describing what it represents.

Example (A key labeling the parts of a grouped visualization.): `get_forge_blocks(blockId: "components/key/demo/demo")`

## Accessibility

### Distinguishable colors

Make sure each key item's icon color is easily distinguishable from the others, and matches the color used in the associated visualization — don't rely on subtle shade differences alone.

### Text alternative

Use the `value` slot to give assistive technology a text alternative for data the visualization otherwise only conveys visually.

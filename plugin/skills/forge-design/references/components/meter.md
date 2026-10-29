# Meter

Meters display a scalar value within a known range, using color to signal whether it's optimal, suboptimal, or least optimal.

## Usage

`forge-meter` shows a scalar value within a `min`/`max` range through `value`, `tickmarks`, and an optional `low`/`high`/`optimum` split that colors the track green, yellow, or red depending on where `value` falls. Reach for a meter when the value is a relatively static data point, like a storage quota or a satisfaction score — for a task's busy or in-progress state, use [linear progress](./linear-progress.md) instead; despite the visual similarity, the two represent fundamentally different things.

## Rules

**Do**

- Always give a meter an accessible label, either via a label element association or aria-label/aria-labelledby.
- Set optimum so the meter's color reflects whether the current value is actually good, not just its raw position in the range.
- Pair a grouped meter with a key labeling each meter's color and value.

**Don't**

- Don't use a meter to represent a task's busy or loading state — use linear progress instead.
- Don't segment a meter (low/high) and group it at the same time — grouped meters can't be segmented.
- Don't rely on color alone to convey a segmented meter's optimal/suboptimal/least-optimal state.

## Segmented

Set `low` and `high` to divide the track into three regions — below `low`, between `low` and `high`, and above `high` — colored green, yellow, or red depending on which region `optimum` falls in relative to `value`. `low` must be greater than or equal to `min` and less than `high`; `high` must be less than or equal to `max` and greater than `low`.

Example (A segmented meter, colored by how close its value is to the optimum region.): `get_forge_blocks(blockId: "components/meter/segmented/segmented")`

## Tickmarks

Set `tickmarks` to show evenly spaced marks along the track; control how many with the `--forge-meter-tickmarks` token.

Example (A meter with tickmarks along its track.): `get_forge_blocks(blockId: "components/meter/tickmarks/tickmarks")`

## Grouped

Wrap same-range meters in `forge-meter-group` to lay them out together on a single shared track — useful for parts of a whole. Grouped meters can't be segmented, and every meter in the group must share the same `min`/`max`. Pair a grouped meter with a [key](./key.md) labeling each meter's color and, optionally, its value.

Example (Several related meters grouped on one shared track.): `get_forge_blocks(blockId: "components/meter/grouped/grouped")`

## Accessibility

### Labeling

Always give a meter an accessible label — associate it with a `<label>` element, or set `aria-label`/`aria-labelledby` directly. Text placed in the meter's label slot isn't accessible on its own; it still needs to be linked to the meter one of those ways. For a grouped meter, also provide a [key](./key.md) naming each meter's color and, optionally, its value.

### Automatic ARIA

The meter automatically applies ARIA attributes reflecting its `value`, `min`, and `max`. If the value isn't naturally a percentage — a discrete count, or a textual quantifier like "low"/"medium"/"high" — set `aria-valuetext` to a string describing how it should be read instead.

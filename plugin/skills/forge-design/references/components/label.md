# Label

Labels attach an accessible caption and Forge typography to a specific set of label-aware Forge components, in place of a plain HTML label element.

## Usage

`forge-label` provides an accessible caption and Forge typography for a specific set of label-aware components — [button](./button.md), [checkbox](./checkbox.md), [icon button](./icon-button.md), [radio](./radio.md), [select](./select.md), [switch](./switch.md), and button toggle groups — through `for` (explicit ID association), `legend`, and `non-interactive`. It isn't a general-purpose replacement for a plain `<label>` — it only works when paired with one of these specific elements, so reach for a native `<label>` (or `aria-label`) when labeling anything else, including [text fields](./text-field.md), which manage their own label internally.

## Rules

**Do**

- Only use forge-label with the specific components it supports — check the list above before reaching for it.
- Nest the associated element inside the label when you don't need it to render anywhere else, instead of wiring up for/id.
- Use legend when labeling a group of radios, so it reads as the group's caption rather than one option's label.

**Don't**

- Don't use forge-label on an element it doesn't support — use a native label or aria-label instead.
- Don't duplicate a label both nested and via the for attribute on the same element.

## ID associated

Set `for` to the `id` of the labeled element to associate them explicitly, without nesting one inside the other.

Example (A label explicitly associated with an element via the for attribute.): `get_forge_blocks(blockId: "components/label/id-associated/id-associated")`

## Nested

Nest the labelable element directly inside `forge-label` for implicit association — no `for`/`id` pair needed.

Example (A label implicitly associated with a nested element.): `get_forge_blocks(blockId: "components/label/nested/nested")`

## Legend

Set `legend` to use the label as a group caption instead of labeling one specific element — the standard pattern for a group of radios.

Example (A label used as a legend for a radio group.): `get_forge_blocks(blockId: "components/label/legend/legend")`

## Aligned list

Pair a label with its associated element in a list, so a set of fields lines up consistently.

Example (Labels aligned with their associated elements in a list.): `get_forge_blocks(blockId: "components/label/aligned-list/aligned-list")`

## With icon button

Label an icon button to give it a persistent, visible caption alongside its accessible name.

Example (A label captioning an icon button.): `get_forge_blocks(blockId: "components/label/with-icon-button/with-icon-button")`

# Skeleton

A skeleton screen is a low-fidelity placeholder that gradually loads into real content, giving users a visual cue that content is on its way.

## Usage

`forge-skeleton` shapes itself to match the content it's standing in for through `text`, `avatar`, `listItem`, `chip`, `button`, and `formField`, plus `stretch`. Use it whenever the size and shape of the incoming content is already known; when it isn't, use a linear or circular progress indicator, or a busy indicator for a full-page load, instead.

## Rules

**Do**

- Use skeleton loading when the size and shape of the incoming content is already known and the wait is longer than a second.
- Match each skeleton shape to the specific piece of content it stands in for.
- For a list, two or three skeleton items are enough — they don't need to match the final loaded count.

**Don't**

- Don't use a skeleton when the content's eventual size or shape is unknown — use a progress indicator instead.
- Don't leave a skeleton on screen once its real content is ready — swap it out immediately.
- Don't mix skeleton loading and a spinner for the same piece of content.

## Basic usage

The default skeleton renders as a generic block; set a shape attribute to match specific content instead.

Example (A generic skeleton block.): `get_forge_blocks(blockId: "components/skeleton/demo/demo")`

## Profile layout

Combine `avatar` and `text` skeletons to stand in for a profile-style layout while its real content loads.

Example (An avatar paired with text skeletons for a profile card.): `get_forge_blocks(blockId: "components/skeleton/profile/profile")`

## List

Set `listItem` to match the height and spacing of a real list row.

Example (A few list-item skeletons standing in for rows that haven't loaded yet.): `get_forge_blocks(blockId: "components/skeleton/list/list")`

## Matching other components

Set `chip`, `button`, or `formField` to match the shape of those specific components while their real content loads.

Example (Form-field skeletons standing in for fields that haven't loaded yet.): `get_forge_blocks(blockId: "components/skeleton/form-field/form-field")`

Example (Chip skeletons standing in for chips that haven't loaded yet.): `get_forge_blocks(blockId: "components/skeleton/chips/chips")`

## Accessibility

### Hide from assistive technology

A skeleton is a purely visual loading placeholder — add `aria-hidden="true"` so screen readers skip over it instead of announcing meaningless placeholder content.

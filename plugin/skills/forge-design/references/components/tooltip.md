# Tooltip

Tooltips display a short text label for an element when the user hovers, focuses, or long-presses it.

## Usage

`forge-tooltip` anchors a short text label to another element via `anchor` (an id reference), and reveals it through `triggerType` — `hover` (the default), `focus`, or `longpress` — plus `placement` and `flip` for positioning. Reserve it for a word or short phrase clarifying an element's purpose — it's essential for an [icon button](./icon-button.md) with no visible label. For anything longer than a few words, use an inline message or dialog instead of overloading a tooltip.

## Rules

**Do**

- Always pair an icon-only control, like an icon button, with a tooltip describing its action.
- Keep tooltip text to a few words — a label or short phrase, not a sentence.
- Pair hover with focus or longpress in triggerType so the tooltip is reachable without a mouse.

**Don't**

- Don't restate text that's already visible next to the anchor.
- Don't put rich content, images, or interactive controls inside a tooltip.
- Don't rely on a tooltip alone to convey information essential to completing a task on mobile.

## Basic usage

Set `anchor` to the id of the element the tooltip describes.

Or place the tooltip as a child of the element it describes, such as inside a `forge-icon-button`. It anchors to its parent without needing an `anchor` id. Make it the first child: a tooltip with a previous sibling anchors to that sibling instead (see Anchor gotchas below).

```html
<forge-icon-button aria-label="Delete">
  <forge-tooltip>Delete</forge-tooltip>
  <forge-icon name="delete"></forge-icon>
</forge-icon-button>
```

Example (A tooltip anchored to a button by id.): `get_forge_blocks(blockId: "components/tooltip/demo/demo")`

## Placement

Set `placement` to move the tooltip above its anchor instead of the default right.

Example (A tooltip placed above its anchor instead of the default right.): `get_forge_blocks(blockId: "components/tooltip/placement/placement")`

## Trigger type

Set `triggerType` to `focus` to open the tooltip on focus instead of hover — pair the two so the tooltip is reachable without a mouse.

Example (A tooltip that opens on focus instead of hover.): `get_forge_blocks(blockId: "components/tooltip/trigger-type/trigger-type")`

## Type

Set `type` to `presentation` (the default), `label`, or `description` to control the tooltip's accessibility association with its anchor.

Example (A presentation tooltip (default) carries no accessibility association with its anchor.): `get_forge_blocks(blockId: "components/tooltip/type/type")`

## Anchor gotchas

**Slotted anchors need a matching slot**

If the anchor element is placed in a slot (e.g. an icon button slotted into an app bar), the tooltip needs the same `slot` attribute — otherwise it may not render at all.

```html
<forge-app-bar>
  <forge-icon-button slot="end" id="my-button">
    <forge-icon name="forge_logo"></forge-icon>
  </forge-icon-button>

  <forge-tooltip slot="end" type="label" anchor="my-button">This is a tooltip</forge-tooltip>
</forge-app-bar>
```

Without an explicit anchor, the tooltip resolves its target in this order: the element matching `anchor`'s id, then `anchorElement` if set, then its previous DOM sibling, then its parent element. That's unpredictable in a dynamic context — a list of items, or anything rendered asynchronously — so set `anchor` or `anchorElement` explicitly whenever the tooltip isn't a fixed, static sibling of what it describes.

Despite rendering in the browser's top layer, the tooltip element itself still lives inline in the DOM, which means it can inherit CSS custom properties from its ancestors and pick up unintended style bleed. If that happens, set `anchor` or `anchorElement` to move the tooltip to a different point in the DOM, detached from the ancestor setting the variable.

## Accessibility

### Contrast

Verify there's sufficient contrast between the tooltip's foreground text and background to meet WCAG requirements.

### No interactive content

A tooltip shouldn't contain interactive content — a user can't reliably move a pointer or focus into a tooltip that disappears on blur or hover-out.

### Labeling

Set `type` to `label` or `description` to have the tooltip wire up `aria-labelledby` or `aria-describedby` on its anchor element automatically. The default, `presentation`, is purely visual and carries no accessible relationship to the anchor.

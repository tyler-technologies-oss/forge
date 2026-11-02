---
name: docs-anatomy-diagram
description: This skill should be used when the user asks to "add an anatomy diagram", "add anatomy markers", "label each slot/part of X", "use AnatomyDemo/AnatomyMarker", or otherwise discusses a numbered, annotated breakdown of a component's or layout's parts on a page in the `docs/` site.
---

# Docs Anatomy Diagram

An anatomy diagram is a live, non-interactive demo of real Forge markup with numbered `AnatomyMarker` callouts pinned over each part. Reference pages: `docs/src/content/designing/layout.mdx` ("Structure of a Tyler Cloud App" and "Containers") and `docs/src/content/components/structured-card/usage.mdx` ("Slot locations").

## Components (`docs/src/components/docs/`)

- **`AnatomyDemo.astro`** wraps `ComponentHeader` and takes the same props (`fit`, `zoom`, `origin`, `height`, `inset`) except `interactive`. On page load it makes everything inert except the markers.
- **`AnatomyMarker.astro`** is an absolutely positioned numbered button that opens a popover on hover and focus.

| Prop          | Purpose                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| `label`       | The number shown, matching the table row                                                                        |
| `title`       | The part's name (popover heading and the button's accessible name)                                              |
| `description` | One sentence on what goes there, plus any size or token                                                         |
| `placement`   | `top-start` (default), `top`, `top-end`, `start`, `center`, `end`, `bottom-start`, `bottom`, `bottom-end`       |
| `outside`     | Centers the marker on the region's edge or corner, like a badge. Use for small targets so it doesn't cover them |

## Pattern

```mdx
import AnatomyDemo from "../../../components/docs/AnatomyDemo.astro";
import AnatomyMarker from "../../../components/docs/AnatomyMarker.astro";

## Slot locations

<AnatomyDemo>
  <forge-structured-card class="w-full max-w-lg my-large" style="--forge-card-overflow: visible">
    <span slot="title" class="relative inline-block">
      Project details
      <AnatomyMarker label={1} title="Title" description="The card's title, styled as heading3." placement="top-end" outside />
    </span>
    <div slot="body" class="relative">
      <div class="striped-box h-28"></div>
      <AnatomyMarker label={2} title="Body" description="The card's main content." />
    </div>
  </forge-structured-card>
</AnatomyDemo>
```

## Rules

- **Wrap the part, don't nest in the component.** Put the marker inside the slotted element (or a wrapper element that takes the slot) and make that wrapper `relative`. For an inline control (button, badge, icon button) use `relative inline-flex` so the wrapper hugs it.
- **Region vs. control.** For a large region (body, toolbar, navigation), place the marker inside it (`center`, `start`, or the default corner). For a small control, use `outside` on the corner farthest from neighboring markers.
- **Keep the button and popover adjacent.** The popover anchors to its previous sibling, so never put anything between them; place the marker as the last child of its wrapper.
- **Number in reading order**: top to bottom, start to end.
- **No key table.** Don't follow the demo with a numbered table of the markers. A component's slots already appear on its API tab, and the markers carry the per-part detail.
- **It's docs-only.** The forge-design skill build (`docs/scripts/build-forge-skill.mjs`) drops the whole `<AnatomyDemo>`, and a heading left with no content goes too. Guidance an AI agent needs, like which components build each part and their sizes, belongs in prose or bullets outside the demo (see "Containers" in `layout.mdx`), not only in markers.
- **Leave room for outside markers.** They overflow the demo, so give it vertical margin (`my-large`) and don't clip it.
- **Unclip cards.** The docs page wraps content in `forge-card.p-0`, which sets `--forge-card-overflow: hidden`; it inherits into any card in the demo (including the one inside `forge-structured-card`) and cuts off outside markers. Reset it inline with `style="--forge-card-overflow: visible"` on the demo's card. Use an inline style, not a Tailwind arbitrary class, because the dev server doesn't reliably generate new arbitrary classes from MDX.
- **Use filler, not real content, for regions.** `striped-box` (from `docs/src/styles/global.css`) shows an area without distracting copy.
- **Large layouts** (app layout, scaffold): use `fit="cover"` with `zoom` below 1 and a fixed `height`, as in `layout.mdx`.
- Follow `component-docs-header`'s rules: real Forge markup, components and icons registered in `docs/src/scripts/forge-components.ts`, Tailwind utilities only, no scripts.
- The diagram is not interactive, so don't rely on hover states or open overlays to show a part.
- On a page under `components/`, `designing/`, or `developing/`, regenerate the forge-design skill and add a plugin changeset afterwards (see `docs/CLAUDE.md`).
- Don't start the dev server to verify; ask the user to check that markers don't overlap or cover the part they label.

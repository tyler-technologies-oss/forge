# Layout

The anatomy, dimensions, and page patterns of a Forge application, for designers building screens by hand.

Almost every Forge application is built on [`forge-app-layout`](../components/app-layout.md), a shell that provides the app bar, navigation, and content regions and handles responsive behavior. Developers don't build that structure themselves. They drop content into its slots.

So the most useful thing a designer can do is **design inside the shell**. Start every screen from the regions below, keep their dimensions fixed, and spend your design effort on what goes in the body. This page breaks down that shell and the page patterns that repeat across Forge's [blocks](https://tylerforge.design/blocks/).

## Structure of a Tyler Cloud App

**Surfaces create the hierarchy**

The body background is `--forge-theme-surface-dim`, a step darker than the cards, toolbars, and drawers placed on it (`--forge-theme-surface`). That contrast,
not shadows or borders, is what separates content from the page. Keep the body dim and put content on cards.

### Headings

The app title in the app bar is the page's `h1`. Content headings start at `h2`:

- **Page title** in the body header: `forge-typography--heading4`, one step larger than container titles.
- **Card, dialog, and drawer titles**: `forge-typography--heading3`, in the container's header toolbar. Never larger, since `forge-typography--heading4` and up are reserved for page titles.
- **Section headings** inside a card or form: `forge-typography--heading2`.
- **Body text**: `forge-typography--body2` is the page default. `forge-typography--body1` is for dense or secondary content.
- **Group labels** (above a checkbox list or filter facet): `forge-typography--label1` or `forge-typography--label2`, often in `--forge-theme-text-medium`.

Forge's heading scale runs from small to large, so `forge-typography--heading4` is larger than `forge-typography--heading3`, which is larger than `forge-typography--heading2`. Visual size and semantic level are independent: a page title is an `h2` styled with `forge-typography--heading4`. Sizes and weights for each style are on the [typography tokens](https://tylerforge.design/tokens/typography/) page.

### Responsive behavior

The shell has one breakpoint, **960px** by default. Teams can adjust it to fit their app with the app layout's `breakpoint` property, so confirm the value with your developers before designing around it.

- **960px and wider:** navigation is a persistent drawer beside the body.
- **Below 960px:** navigation collapses behind a menu button in the app bar and opens as a modal drawer over the content.

Within the body, content reflows at these widths: **640px**, **768px**, **1024px**, and **1280px**. Design at least two frames: one around 1440px and one around 390px. The shell handles everything in between, as long as body content reflows the way the patterns below describe.

## Navigation styles

Choose one per app. Every block uses an icon with each nav item.

| Style                | When to use                                                                                                                                                   | Width                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **Standard**         | The default. Six to ten destinations with short labels.                                                                                                       | 320px                           |
| **Mini**             | Content needs the width, like data-heavy screens or editors. Users recognize the icons.                                                                       | 56px, expands to 256px on hover |
| **Context switcher** | The whole app is scoped to an organization, facility, or account the user can switch between. The switcher sits at the top of the drawer, above the nav list. | 320px                           |

Group secondary destinations like Settings and Help at the bottom of the list, separated by a divider.

Example (Standard navigation with a page title toolbar and footer.): `get_forge_blocks(blockId: "application-layout/basic/basic")`

## Page patterns

Most screens are one of the patterns below. Find the closest one and design within its structure.

### Dashboard or overview

A responsive grid of cards in the body.

- Cards use a **`--forge-spacing-medium` gap** in every direction.
- Use an auto-fill grid targeting about **320px per card**, or set column counts by breakpoint: 1 column on mobile, 2 at 640px, 3 at 1024px, 4 at 1280px.
- Give cards a consistent height within a row.

### Data table

A table inside a card that fills the body width.

- The card header holds the table title and icon actions (filter, export, more). The primary page action, like "New order", goes in the **body header**, not the card.
- Remove the card's padding so the table runs edge to edge.
- Pagination sits in the card footer.
- Filters open in a **256px side panel** on the right, with a header toolbar ("Filters"), a padded body of facets separated by dividers, and a footer with "Clear all" and "Apply".

See the [table with filters](https://tylerforge.design/blocks/application-layout/table-with-filters/table-with-filters/) block for a paginated table with a filter side panel.

### Form

A card containing a header toolbar, a padded body, and a footer toolbar with actions.

- **Width:** short forms max out around **672px**. Long, sectioned forms max out around **768px**. Never stretch a form to fill a wide screen.
- **Columns:** stack fields in one column, or use a 2-column (short) or 6-column (long) grid where related fields share a row: first and last name, or city, state, and ZIP.
- **Footer actions** are end-aligned: secondary action first, primary action last.
- See [Spacing](./spacing.md#forms) for field and section spacing.

Example (A long form divided into sections on a 6-column grid.): `get_forge_blocks(blockId: "forms/complex-form-with-grouped-sections/complex-form-with-grouped-sections")`

### Master-detail

A primary list or table in the body, with details for the selected item in a right side panel. The body and the panel **scroll independently**, so design both as separate scroll areas.

See the [dual scrolling containers](https://tylerforge.design/blocks/application-layout/dual-scroll/dual-scroll/) block for a body and side panel that scroll independently.

### Tabbed page

When a page has several views of the same object, put a tab bar directly below the page title, inside the body header. Remove the title toolbar's bottom divider so the title and tabs read as one header.

See the [basic application layout with tabs](https://tylerforge.design/blocks/application-layout/basic-layout-with-tabs/basic-layout-with-tabs/) block for a tab bar below a borderless page title.

## Containers

Forge's cards, dialogs, and drawers share one internal structure, built from the same two components: a [scaffold](../components/scaffold.md) (`forge-scaffold`) nested inside the container lays out a header, body, and footer, and a [toolbar](../components/toolbar.md) (`forge-toolbar`) fills the header and footer. Learn it once and every container follows it.

- **Header:** a `forge-toolbar` in the scaffold's `header` slot, with the title (`forge-typography--heading3`) in `start` and icon actions in `end`. 56px tall with a bottom divider.
- **Body:** the scaffold's `body` slot, with `--forge-spacing-medium` padding.
- **Footer:** a `forge-toolbar` with `inverted` in the scaffold's `footer` slot, with actions in `end` and the primary action last. 56px tall with a top divider.
- Nest the scaffold directly inside the container: `forge-card`, `forge-dialog`, or a drawer. On a card, set `no-padding` so the toolbars reach its edges.
- For a card, [structured card](../components/structured-card.md) (`forge-structured-card`) provides this structure pre-built, with slots for the title, header actions, body, and footer actions instead of a scaffold and toolbars.
- The header and footer stay put while the body scrolls.
- Corner radius is **4px** (`--forge-shape-medium`) for cards, dialogs, and toolbars.
- Cards are flat with a 1px (`--forge-border-thin`) border in `--forge-theme-outline`. Use the raised (shadow) variant only to lift a card above other content.
- A container doesn't need all three parts. A simple card can be body only.

### Actions

- Actions live in **toolbars**, at the top of the page (body header) or the bottom of a container (footer).
- **One primary action per container.** It goes last (rightmost) and uses the `filled` button.
- The secondary action (Cancel) sits to its left as a `tonal` button, spaced `--forge-spacing-medium` apart. See [Button grouping](../components/button.md#grouping) for the full hierarchy.
- Icon-only actions in a header use 36px icon buttons (`density="medium"`), spaced `--forge-spacing-xsmall` apart, with a tooltip.

## Do and don't

**Do**

- Start every screen from the app layout frame and keep its regions at their fixed sizes.
- Put page content on surface cards over the dim body background.
- Put the page title and primary page action in the body header toolbar.
- Constrain forms and reading content to a max width.
- Design the side panel and body as independently scrolling areas.

**Don't**

- Don't redesign the app bar or navigation per screen. They're shared across the app.
- Don't put primary content in the side panel. It's for supplementary content and filters.
- Don't nest a card inside a card of the same surface color. Use a tonal surface for the inner card.
- Don't place buttons floating in the body. Put actions in a header or footer toolbar.
- Don't put a page-level heading inside a card.

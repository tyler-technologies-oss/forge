# App Layout

The app layout provides a complete application shell with an app bar, responsive navigation drawer, and a body area for page content.

## Usage

`forge-app-layout` scaffolds an entire application: an [app bar](./app-bar.md) with logo, title, and actions; a navigation [drawer](./drawer.md) that sits beside the body on large screens and becomes a modal drawer on small ones; and a body area with optional header, footer, and side panels. Start every Forge app with it, put page content in the `body` slot, and let the layout handle responsiveness.

The app layout isn't included in the root `@tylertech/forge` import, so register it with its own side-effect import:

```javascript
import '@tylertech/forge/app-layout';
```

To fill the window, `<body>` needs `height: 100dvh; width: 100dvw; margin: 0; background-color: var(--forge-theme-surface-dim)`. Load `forge-core.css` from `@tylertech/forge/dist/forge-core.css` to get these, or set them yourself.

### Slots

- `app-bar-logo`, `app-bar-start`, `app-bar-center`, `app-bar-end`: content placed in the built-in app bar.
- `navigation`: the navigation drawer contents, typically a `forge-list` with `navlist`.
- `body`: the main page content. Use a `<main slot="body">` element.
- `body-header`, `body-footer`, `body-left`, `body-right`: regions scoped to the body area.
- `header`, `footer`, `left`, `right`: regions that frame the entire layout.

### Navigation drawer

On small screens the navigation becomes a modal drawer. Add `data-forge-app-layout-close` to any clickable item in the `navigation` slot to close the modal drawer when it's activated.

Set `use-mini-drawer` to collapse the drawer to an icon-only mini drawer, and add `mini-hover` to expand it while hovered.

## Rules

**Do**

- Use the app layout as the outermost structure for a full application page.
- Put navigation in the `navigation` slot so it adapts to screen size.
- Use a `forge-list` with the `navlist` attribute in the `navigation` slot.
- Put page content in a `<main slot="body">` element.
- Treat the app title as the page's h1 and start content headings at h2.

**Don't**

- Don't nest an app layout inside another app layout or a scaffold.
- Don't build a separate app bar and drawer by hand when the layout already provides them.
- Don't place primary page content in the side slots — those are for supplementary panels.

## Basic layout

An app bar with a logo, title, and actions, a navigation list, and a body with a header toolbar and footer.

Example (A standard application shell.): `get_forge_blocks(blockId: "application-layout/basic/basic")`

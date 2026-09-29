# Toolbar Rules

**In this file:**
- [Purpose](#purpose)
- [API Reference](#api-reference)
- [Use Cases](#use-cases) (Page, Table, Dialog, Card, Drawer, App Footer)
- [Critical Rules](#critical-rules)
- [Notes](#notes)

## Purpose

`<forge-toolbar>` is a horizontal container for titles and actions. It's used throughout applications as headers and footers for various containers.

---

## API Reference

- `get_component_docs(component: "forge-toolbar", format: "summary")` — slots, attributes, properties, events.
- `get_forge_blocks(component: "forge-toolbar")` — HTML usage patterns.

---

## Use Cases

### Page Toolbar (Header)

Used at the top of a page for the page title and page-level actions.

- Title goes in `slot="start"` as an `<h1>` element
- Page actions go in `slot="end"`
- Pairs with `<forge-scaffold slot="header">`

**Get examples:** `get_forge_blocks(query: "page title toolbar")`

### Page Toolbar with Back Navigation

Same as page toolbar but includes a back button before the title.

- Back button in `slot="start"` before the title
- Use `forge-icon-button` with `arrow_back` icon

**Get examples:** `get_forge_blocks(query: "page title back arrow")`

### Table Header

Used as the header for data tables, typically inside a card.

- Table title in `slot="start"`
- Filter, export, and action icon buttons in `slot="end"`

**Get examples:** `get_forge_blocks(query: "table header toolbar")`

### Table Footer

Used below tables for pagination or summary actions.

- Use `inverted` attribute for footer styling
- Typically contains `<forge-paginator>`

### Dialog Header

Used at the top of dialogs for the dialog title and close button.

- Dialog title in `slot="start"`
- Close icon button in `slot="end"`
- Pairs with `<forge-scaffold slot="header">` inside the dialog

**Get examples:** `get_forge_blocks(query: "dialog")`

### Dialog Footer

Used at the bottom of dialogs for action buttons.

- **MUST use `inverted` attribute** for proper footer styling
- Secondary actions (Cancel) on the left or as text buttons
- Primary actions (Save, Submit) on the right with `slot="end"`
- Pairs with `<forge-scaffold slot="footer">` inside the dialog

### Card Header

Used inside `<forge-card>` or `<forge-structured-card>` for card titles and actions.

- Card title in `slot="start"` (use `text-heading3` or smaller)
- Card actions in `slot="end"`
- Pairs with `<forge-scaffold slot="header">` inside the card

### Card Footer

Used at the bottom of cards for card-level actions.

- **MUST use `inverted` attribute** for proper footer styling
- Action buttons in `slot="end"`
- Pairs with `<forge-scaffold slot="footer">` inside the card

### Drawer/Sidesheet Header

Used at the top of drawers and sidesheets.

- Title in `slot="start"`
- Close button in `slot="end"`

### App Footer

Used at the bottom of the application layout.

- Typically contains copyright or footer links
- Use `inverted` attribute
- Pairs with `<forge-scaffold slot="footer">`

---

## Critical Rules

1. **Use `inverted` attribute for ALL footers** - This provides the correct footer styling (lighter background, different visual weight)

2. **Pair with scaffold slots** - Toolbars work best when slotted into `<forge-scaffold>`:
   - `<forge-toolbar slot="header">` for headers
   - `<forge-toolbar slot="footer" inverted>` for footers

3. **Correct heading levels** - Use appropriate heading elements:
   - Page titles: `<h1>`
   - Card/dialog titles: `<h2>` or `<h3>`
   - Always apply typography classes (e.g., `text-heading4`, `text-heading3`)

4. **Icon buttons need `aria-label`** - All `<forge-icon-button>` elements in toolbars must have an `aria-label` for accessibility

---

## Notes

Call `get_forge_blocks(category: "toolbars")` to see all toolbar block patterns.
Call `get_forge_blocks(component: "forge-toolbar")` to see all blocks using toolbars.

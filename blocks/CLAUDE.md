# Forge Blocks

This directory contains reusable HTML blocks showcasing Tyler Forge components. Blocks are standalone HTML files that demonstrate common UI patterns.

## Folder Structure

```
blocks/
├── src/
│   ├── blocks/           # All block categories
│   │   ├── forms/
│   │   ├── tables/
│   │   ├── pages/
│   │   ├── patterns/
│   │   └── full-app-layouts/
│   ├── includes/         # Shared templates (not blocks)
│   │   └── base.html
│   ├── partials/         # Reusable HTML snippets
│   │   └── *.hbs
│   └── scripts/          # Build scripts
├── styles.css            # Shared styles
├── forge-register.ts     # Component registration
└── vite.config.ts
```

## Block File Structure

Block files use a simplified format with a metadata comment followed by HTML content. The base template in `src/includes/base.html` automatically wraps each block with the HTML document structure, typography fonts, stylesheets, and scripts.

Every block file MUST include metadata comments at the top:

```html
<!--
  @block Block Name
  @description Brief description of what this block demonstrates
  @tags comma, separated, searchable, tags
-->
<div class="p-medium">
  <!-- Block content here -->
</div>
```

The `@block` value becomes the page `<title>`.

Optionally, wrap content in a `<body>` element to apply classes to the rendered body:

```html
<!--
  @block Block Name
  @description Brief description
  @tags tags
-->
<body class="bg-surface p-8">
  <!-- Block content here -->
</body>
```

### Base Layout Template

The base layout (`src/includes/base.html`) includes:

- Tyler font CSS from CDN (Roboto)
- Forge core styles
- Tailwind CSS
- Forge component registration script

You should NOT include `<!doctype>`, `<html>`, `<head>`, or stylesheet/script tags in block files - these are provided by the layout.

### Partials

Partials are reusable HTML snippets stored in `src/partials/` as `.hbs` files. Use them to avoid duplicating common UI patterns across blocks.

**Creating a partial:**

Create a file in `src/partials/` with a `.hbs` extension containing static HTML:

```html
<!-- src/partials/data-table.hbs -->
<forge-table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Item 1</td>
      <td>Active</td>
    </tr>
    <tr>
      <td>Item 2</td>
      <td>Pending</td>
    </tr>
  </tbody>
</forge-table>
```

**Using a partial in a block:**

Reference partials with `{{> partial-name}}` syntax (filename without extension):

```html
<!--
  @block Dashboard
  @description Dashboard with data table
  @tags dashboard, table
-->
<h1 class="text-heading4">Dashboard</h1>
{{> data-table}}
```

## Block Categories

All blocks live in `src/blocks/` organized by category as a folder name

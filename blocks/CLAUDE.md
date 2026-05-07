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

All blocks live in `src/blocks/` organized by category:

- `src/blocks/forms/` - Form patterns (login, registration, settings, etc.)
- `src/blocks/tables/` - Data table patterns
- `src/blocks/pages/` - Full page examples
- `src/blocks/patterns/` - Reusable UI patterns
- `src/blocks/full-app-layouts/` - Complete application shell layouts

## Forge Component Rules

### Components That DO NOT Need Nested Native Elements

These components render their own internal elements:

```html
<!-- ✅ CORRECT -->
<forge-button variant="filled" type="submit">Submit</forge-button>
<forge-checkbox>Remember me</forge-checkbox>
<forge-radio>Option A</forge-radio>
<forge-switch>Enable feature</forge-switch>

<!-- ❌ WRONG - Do NOT nest native elements -->
<forge-button><button>Submit</button></forge-button>
<forge-checkbox><input type="checkbox" /><label>Remember me</label></forge-checkbox>
```

### Components That REQUIRE Nested Native Elements

These components wrap native elements for enhanced functionality:

```html
<!-- ✅ CORRECT - forge-text-field requires <input> or <textarea> -->
<forge-text-field label-position="block-start">
  <label for="email">Email</label>
  <input type="email" id="email" />
</forge-text-field>

<!-- ✅ CORRECT - forge-select requires <forge-option> elements -->
<forge-select label-position="block-start" label="Label here">
  <forge-option value="1">Option 1</forge-option>
  <forge-option value="2">Option 2</forge-option>
</forge-select>
```

### Required Component Defaults

Always use these default attributes on the following components:

**Text input components** - Always use `label-position="block-start"`:

```html
<!-- ✅ CORRECT -->
<forge-text-field label-position="block-start">...</forge-text-field>
<forge-autocomplete label-position="block-start">...</forge-autocomplete>
<forge-select label-position="block-start">...</forge-select>

<!-- ❌ WRONG - Missing label-position -->
<forge-text-field>...</forge-text-field>
```

**Icon buttons** - Always use `density="medium"`:

```html
<!-- ✅ CORRECT -->
<forge-icon-button density="medium">
  <forge-icon name="settings"></forge-icon>
</forge-icon-button>

<!-- ❌ WRONG - Missing density -->
<forge-icon-button>
  <forge-icon name="settings"></forge-icon>
</forge-icon-button>
```

### Navigation Lists

When using `forge-list` as a sidenav or navigation menu, add the `navlist` attribute and use anchor (`<a>`) elements inside `forge-list-item`:

```html
<!-- ✅ CORRECT - Navigation list with navlist attribute -->
<forge-list navlist>
  <forge-list-item selected>
    <forge-icon slot="start" name="dashboard"></forge-icon>
    <a href="/dashboard">Dashboard</a>
  </forge-list-item>
  <forge-list-item>
    <forge-icon slot="start" name="settings"></forge-icon>
    <a href="/settings">Settings</a>
  </forge-list-item>
</forge-list>

<!-- ❌ WRONG - Missing navlist attribute for navigation -->
<forge-list>
  <forge-list-item>
    <a href="/dashboard">Dashboard</a>
  </forge-list-item>
</forge-list>
```

The `navlist` attribute enables proper keyboard navigation and accessibility semantics for navigation menus.

### Self-Closing Tags

DO NOT use self-closing tags for Forge components in HTML:

```html
<!-- ✅ CORRECT -->
<forge-icon name="check"></forge-icon>
<forge-divider></forge-divider>

<!-- ❌ WRONG -->
<forge-icon name="check" />
<forge-divider />
```

### Icon Registration (REQUIRED)

**IMPORTANT:** When adding `<forge-icon>` elements to a block, you MUST also update `forge-register.ts` to import and register the icons used.

Icons are imported from `@tylertech/tyler-icons` (NOT `@tylertech/tyler-icons/standard`).

**Icon naming convention:**

- HTML: `name="settings"` → Import: `tylIconSettings`
- HTML: `name="account_circle"` → Import: `tylIconAccountCircle`
- Pattern: `tylIcon` + PascalCase version of the icon name

**Example - Adding icons to a block:**

1. Use icons in your block HTML:

```html
<forge-icon name="settings"></forge-icon> <forge-icon name="account_circle"></forge-icon>
```

2. Update `forge-register.ts` to import and register the icons:

```typescript
import { tylIconSettings, tylIconAccountCircle } from '@tylertech/tyler-icons';

// Register icons
IconRegistry.define([tylIconSettings, tylIconAccountCircle]);
```

**After creating or modifying any block that uses icons:**

1. Identify all `<forge-icon name="...">` elements in the block
2. Add the corresponding imports to `forge-register.ts`
3. Add the icons to the `IconRegistry.define()` array

## Design Rules

### Always Use Tokens

NEVER use arbitrary values for spacing or typography. Always use Tailwind utility classes backed by Forge design tokens:

```html
<!-- ✅ CORRECT - Token-based spacing -->
<div class="p-medium gap-medium">
  <!-- ❌ WRONG - Arbitrary values -->
  <div style="padding: 16px; gap: 16px;">
    <div class="p-[16px] gap-[16px]"></div>
  </div>
</div>
```

### Default Spacing

`16px` (`p-4` / `p-medium` / `m-4` / `m-medium` / `gap-medium`) is the standard default spacing between items, both vertically and horizontally.

```html
<!-- Standard spacing between form fields, cards, list items, etc. -->
<div class="flex flex-col gap-medium">
  <div class="flex gap-medium"></div>
</div>
```

### Responsive Grids

Always prefer dynamic responsiveness over fixed breakpoints. Use the `grid-min-320` utility class for auto-fitting grid layouts:

```html
<!-- ✅ PREFERRED - Dynamic grid that auto-fits based on content -->
<div class="grid grid-min-320 gap-medium">
  <forge-card>...</forge-card>
  <forge-card>...</forge-card>
  <forge-card>...</forge-card>
</div>

<!-- ⚠️ AVOID - Fixed breakpoint grids when dynamic works -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-medium"></div>
```

The `grid-min-320` class uses CSS `auto-fit` and `minmax()` to automatically adjust the number of columns based on available space.

## Styling Rules

### Use Tailwind CSS Classes

Blocks use Tailwind CSS for layout and spacing. Use utility classes instead of custom CSS:

```html
<!-- ✅ CORRECT -->
<div class="flex flex-col gap-medium p-6">
  <h1 class="text-heading4 mb-2">
    <!-- ❌ WRONG - No custom CSS -->
    <div style="display: flex; gap: 16px;"></div>
  </h1>
</div>
```

### Forge Typography Classes

Use Forge typography classes for text styling:

- `text-heading1` through `text-heading6`
- `text-body1`, `text-body2`
- `text-label1`, `text-label2`

### Forge Spacing Tokens

Prefer semantic spacing classes from `@tylertech/forge-tailwind` over numeric Tailwind values:

```html
<!-- ✅ PREFERRED - Semantic spacing from forge-tailwind -->
<div class="p-medium gap-large mb-small">
  <!-- ⚠️ ACCEPTABLE - But prefer semantic names when available -->
  <div class="p-4 gap-6 mb-2"></div>
</div>
```

Available semantic spacing classes:

- `xxsmall`, `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge`
- Use with any spacing utility: `p-medium`, `m-large`, `gap-small`, `space-x-medium`, etc.

### Forge Color Classes

- `bg-surface` - Surface background
- `text-medium` - Medium emphasis text

## Accessibility

- Always include proper `label` elements for form fields
- Use semantic HTML elements (`<form>`, `<nav>`, `<main>`, etc.)
- Include `autocomplete` attributes on form inputs
- Ensure proper heading hierarchy

## MCP Tools

When writing blocks, use the Forge MCP tools to verify correct component usage:

1. `get_component_docs(format="usage-examples")` - Check correct component structure
2. `validate_component_api` - Verify attributes and properties are valid
3. `find_icons` - Search for appropriate icons

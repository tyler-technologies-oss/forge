# Forge Blocks

This directory contains reusable HTML blocks showcasing Tyler Forge components. Blocks are standalone HTML files that demonstrate common UI patterns.

## Block File Structure

Every block file MUST include metadata comments at the top:

```html
<!--
  @block Block Name
  @description Brief description of what this block demonstrates
  @tags comma, separated, searchable, tags
-->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Block Name</title>
    <link rel="stylesheet" href="/styles.css" />
    <script type="module" src="/forge-register.ts"></script>
  </head>
  <body class="bg-surface p-8">
    <!-- Block content here -->
  </body>
</html>
```

## Categories

- `forms/` - Form patterns (login, registration, settings, etc.)
- `layouts/` - Layout patterns and page structures
- `full-app-layouts/` - Complete application shell layouts
- `pages/` - Full page examples
- `patterns/` - Reusable UI patterns
- `tables/` - Data table patterns

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
<forge-select label-position="block-start">
  <label>Choose option</label>
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

## Design Rules

### Always Use Tokens

NEVER use arbitrary values for spacing or typography. Always use Tailwind utility classes backed by Forge design tokens:

```html
<!-- ✅ CORRECT - Token-based spacing -->
<div class="p-medium gap-medium">

<!-- ❌ WRONG - Arbitrary values -->
<div style="padding: 16px; gap: 16px;">
<div class="p-[16px] gap-[16px]">
```

### Default Spacing

`16px` (`p-4` / `p-medium` / `m-4` / `m-medium` / `gap-medium`) is the standard default spacing between items, both vertically and horizontally.

```html
<!-- Standard spacing between form fields, cards, list items, etc. -->
<div class="flex flex-col gap-medium">
<div class="flex gap-medium">
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
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-medium">
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
<div style="display: flex; gap: 16px;">
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
<div class="p-4 gap-6 mb-2">
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

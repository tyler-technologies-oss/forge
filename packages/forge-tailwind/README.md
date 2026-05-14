# @tylertech/forge-tailwind

A Tailwind CSS v4 theme that maps to Tyler Forge design tokens, enabling seamless use of Forge's design system with Tailwind utility classes.

## Installation

```bash
npm install @tylertech/forge-tailwind
```

**Peer dependencies:**
- `@tylertech/forge` ^3.0.0
- `tailwindcss` >=4.0.0

## Usage

Import the theme in your main CSS file:

```css
@import "@tylertech/forge-tailwind";
```

This provides:

- **Spacing** - `p-4`, `gap-large`, `m-xlarge`, etc.
- **Border radius** - `rounded-sm`, `rounded-lg`, `rounded-full`, etc.
- **Elevation/shadows** - `shadow-sm`, `shadow-lg`, `shadow-4`, etc.
- **Z-index** - `z-surface`, `z-dialog`, `z-tooltip`, etc.
- **Border width** - `border-thin`, `border-medium`, `border-thick`, etc.
- **Animation** - `duration-short-1`, `ease-standard`, etc.
- **Colors** - `bg-surface`, `bg-primary`, `text-high`, `border-outline`, etc.
- **Typography** - `text-heading4`, `text-body1`, `text-label2`, etc.

## Examples

```html
<!-- Flex layout with gap -->
<div class="flex items-center gap-2">
  <forge-icon name="info"></forge-icon>
  <span class="text-body2">Information</span>
</div>
```

```html
<!-- Grid layout -->
<div class="grid grid-cols-3 gap-4">
  <forge-card>...</forge-card>
  <forge-card>...</forge-card>
  <forge-card>...</forge-card>
</div>
```

```html
<!-- Spacing and margin -->
<div class="p-4 mb-6">
  <h2 class="text-heading5 mb-2">Section Title</h2>
  <p class="text-body2 text-medium">Section content</p>
</div>
```

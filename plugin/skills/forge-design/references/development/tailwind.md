# Tailwind CSS

An optional Tailwind CSS v4 theme that maps Tailwind utilities to Forge design tokens.

Forge provides an optional Tailwind CSS v4 theme package that maps Tailwind utilities to Forge design tokens. This allows you to use familiar Tailwind syntax while maintaining consistency with Forge's design system.

This package is entirely optional. Forge components work without Tailwind, and
you can use Forge's design tokens directly via CSS custom properties if you
prefer.

## Installation

```bash
npm install @tylertech/forge-tailwind
```

## Setup

Import Forge CSS, Tailwind, and the Forge theme in your main CSS file using CSS layers for proper cascade control. The Forge stylesheets go at the top, before the Tailwind layer imports:

```css
/* Forge CSS provides the design tokens the Tailwind theme references */
@import "@tylertech/forge/dist/forge-core.css";
@import "@tylertech/forge/dist/forge.css";

/* Step 1: Define your Tailwind layers */
@layer theme, base, components, utilities;

/* Step 2: Import the theme (variables) and utilities, skipping preflight */
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);

/* Step 3: Import the Forge Tailwind theme */
@import "@tylertech/forge-tailwind";
```

**Important:** Forge CSS must be loaded in your application for the design
tokens to be available. The Tailwind theme references Forge's CSS custom
properties.

Tailwind's preflight (`tailwindcss/preflight.css`) is skipped on purpose: its global resets fight Forge component styles.

### Dark mode

Forge's theme toggle sets `data-forge-theme="dark"` on `<html>`. To make Tailwind's `dark:` variant follow it instead of the OS-level `prefers-color-scheme`, add a custom variant to your entry CSS after the imports:

```css
@custom-variant dark (&:where(html[data-forge-theme='dark'] *));
```

## Angular Setup

If you're using Angular, follow these additional steps to configure Tailwind CSS in your project.

### 1. Install Tailwind and PostCSS

Install Tailwind CSS and the PostCSS plugin:

```bash
npm install tailwindcss @tailwindcss/postcss postcss --force
```

### 2. Configure PostCSS

Create a `.postcssrc.json` file in the root of your Angular project:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

### 3. Import Tailwind and Forge Theme

Add the imports to your global stylesheet (typically `src/styles.css` or `src/styles.scss`):

```css
@import "@tylertech/forge/dist/forge-core.css";
@import "@tylertech/forge/dist/forge.css";

/* Step 1: Define your Tailwind layers */
@layer theme, base, components, utilities;

/* Step 2: Import the theme (variables) and utilities, skipping preflight */
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);

/* Step 3: Import the Forge Tailwind theme */
@import "@tylertech/forge-tailwind";
```

### 4. Start Your Application

Run your development server:

```bash
ng serve
```

### 5. Start Using Tailwind

You can now use Tailwind utilities alongside Forge components in your templates:

```html
<div class="flex gap-4 p-6">
  <forge-card>
    <h2 class="text-heading4">Card Title</h2>
    <p class="text-body2">Content styled with Tailwind and Forge</p>
  </forge-card>
</div>
```

For more information on using Forge with Angular, see the [Angular Framework
Guide](./frameworks/angular.md).

## Recommended Usage

We highly recommend using Tailwind primarily for layout purposes. Tailwind excels at:

- **Layout** — `flex`, `grid`, `block`, `inline-flex`
- **Spacing** — `p-*`, `m-*`, `gap-*`
- **Sizing** — `w-*`, `h-*`, `max-w-*`, `min-h-*`
- **Positioning** — `absolute`, `relative`, `fixed`, `top-*`, `left-*`
- **Responsive design** — `sm:`, `md:`, `lg:` breakpoint prefixes

For colors, typography, and component styling, prefer using Forge components and CSS custom properties directly. This ensures visual consistency with the design system and makes theming seamless.

```html
<!-- Recommended: Tailwind for layout, Forge for styling -->
<div class="flex gap-4 p-6">
  <forge-card>
    <p class="text-body2">Content styled by Forge</p>
  </forge-card>
</div>
```

The color and typography utilities in this package are available for edge cases, but layout utilities should be your primary use of Tailwind with Forge.

## What's Included

### Theme Variables

The package extends Tailwind's theme with Forge design tokens:

| Category      | Tailwind Utilities    | Example                                         |
| ------------- | --------------------- | ----------------------------------------------- |
| Spacing       | `p-*`, `m-*`, `gap-*` | `p-4`, `p-medium`, `gap-large`                  |
| Border Radius | `rounded-*`           | `rounded-sm`, `rounded-lg`, &#xA;`rounded-full` |
| Box Shadow    | `shadow-*`            | `shadow-sm`, `shadow-lg`, `shadow-8`            |
| Z-Index       | `z-*`                 | `z-surface`, `z-dialog`, `z-tooltip`            |
| Border Width  | `border-*`            | `border-thin`, `border-medium`                  |
| Duration      | `duration-*`          | `duration-short-1`, `duration-medium-2`         |
| Easing        | `ease-*`              | `ease-standard`, `ease-emphasized`              |

### Utility Classes

The package also ships pre-built classes for common Forge layout patterns:

| Class          | Description                                                                                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `grid-min-320` | Responsive auto-fill grid for card layouts. Columns use &#xA;`minmax(min(320px, 100%), 1fr)`, so each targets \~320px and&#xA;shrinks to fit narrow containers, with a `gap-medium` gap. |

```html
<div class="grid-min-320">
  <forge-card>...</forge-card>
  <forge-card>...</forge-card>
  <forge-card>...</forge-card>
</div>
```

## Background Colors

Use `bg-*` utilities for Forge surface and semantic background colors.

### Surface

| Class                          | Description                |
| ------------------------------ | -------------------------- |
| `bg-surface`                   | Default surface background |
| `bg-surface-dim`               | Dimmed surface             |
| `bg-surface-bright`            | Bright surface             |
| `bg-surface-inverse`           | Inverse surface            |
| `bg-surface-container-minimum` | Minimum container          |
| `bg-surface-container-low`     | Low container              |
| `bg-surface-container`         | Default container          |
| `bg-surface-container-medium`  | Medium container           |
| `bg-surface-container-high`    | High container             |

### Brand

| Class      | Description |
| ---------- | ----------- |
| `bg-brand` | Brand color |

### Primary

| Class                          | Description               |
| ------------------------------ | ------------------------- |
| `bg-primary`                   | Primary color             |
| `bg-primary-container-minimum` | Minimum primary container |
| `bg-primary-container-low`     | Low primary container     |
| `bg-primary-container`         | Default primary container |
| `bg-primary-container-high`    | High primary container    |

### Secondary

| Class                            | Description                 |
| -------------------------------- | --------------------------- |
| `bg-secondary`                   | Secondary color             |
| `bg-secondary-container-minimum` | Minimum secondary container |
| `bg-secondary-container-low`     | Low secondary container     |
| `bg-secondary-container`         | Default secondary container |
| `bg-secondary-container-high`    | High secondary container    |

### Tertiary

| Class                           | Description                |
| ------------------------------- | -------------------------- |
| `bg-tertiary`                   | Tertiary color             |
| `bg-tertiary-container-minimum` | Minimum tertiary container |
| `bg-tertiary-container-low`     | Low tertiary container     |
| `bg-tertiary-container`         | Default tertiary container |
| `bg-tertiary-container-high`    | High tertiary container    |

### Success

| Class                          | Description               |
| ------------------------------ | ------------------------- |
| `bg-success`                   | Success color             |
| `bg-success-container-minimum` | Minimum success container |
| `bg-success-container-low`     | Low success container     |
| `bg-success-container`         | Default success container |
| `bg-success-container-high`    | High success container    |

### Error

| Class                        | Description             |
| ---------------------------- | ----------------------- |
| `bg-error`                   | Error color             |
| `bg-error-container-minimum` | Minimum error container |
| `bg-error-container-low`     | Low error container     |
| `bg-error-container`         | Default error container |
| `bg-error-container-high`    | High error container    |

### Warning

| Class                          | Description               |
| ------------------------------ | ------------------------- |
| `bg-warning`                   | Warning color             |
| `bg-warning-container-minimum` | Minimum warning container |
| `bg-warning-container-low`     | Low warning container     |
| `bg-warning-container`         | Default warning container |
| `bg-warning-container-high`    | High warning container    |

### Info

| Class                       | Description            |
| --------------------------- | ---------------------- |
| `bg-info`                   | Info color             |
| `bg-info-container-minimum` | Minimum info container |
| `bg-info-container-low`     | Low info container     |
| `bg-info-container`         | Default info container |
| `bg-info-container-high`    | High info container    |

## Text Colors

Use `text-*` utilities for text emphasis levels and semantic colors.

### Emphasis Levels

| Color | Class                 | Description             |
| ----- | --------------------- | ----------------------- |
| Aa    | `text-high`           | High emphasis text      |
| Aa    | `text-high-inverse`   | High emphasis inverse   |
| Aa    | `text-medium`         | Medium emphasis text    |
| Aa    | `text-medium-inverse` | Medium emphasis inverse |
| Aa    | `text-low`            | Low emphasis text       |
| Aa    | `text-low-inverse`    | Low emphasis inverse    |
| Aa    | `text-lowest`         | Lowest emphasis text    |
| Aa    | `text-lowest-inverse` | Lowest emphasis inverse |

### Semantic

| Color | Class            | Description     |
| ----- | ---------------- | --------------- |
| Aa    | `text-brand`     | Brand color     |
| Aa    | `text-primary`   | Primary color   |
| Aa    | `text-secondary` | Secondary color |
| Aa    | `text-tertiary`  | Tertiary color  |
| Aa    | `text-success`   | Success color   |
| Aa    | `text-error`     | Error color     |
| Aa    | `text-warning`   | Warning color   |
| Aa    | `text-info`      | Info color      |

```html
<p class="text-high">High emphasis text</p>
<p class="text-medium">Medium emphasis text</p>
<p class="text-primary">Primary colored text</p>
```

## Border Colors

Use `border-*` utilities for outline and semantic border colors.

<div class="flex gap-4 flex-wrap my-6">
  <div class="flex flex-col items-center gap-2">
    <div class="w-20 h-20 rounded-lg bg-surface border-2 border-outline" />

    <code class="text-label1 text-medium">border-outline</code>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="w-20 h-20 rounded-lg bg-surface border-2 border-outline-high" />

    <code class="text-label1 text-medium">border-outline-high</code>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="w-20 h-20 rounded-lg bg-surface border-2 border-primary" />

    <code class="text-label1 text-medium">border-primary</code>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="w-20 h-20 rounded-lg bg-surface border-2 border-error" />

    <code class="text-label1 text-medium">border-error</code>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="w-20 h-20 rounded-lg bg-surface border-2 border-success" />

    <code class="text-label1 text-medium">border-success</code>
  </div>
</div>

```html
<div class="border border-outline">...</div>
<div class="border border-primary">...</div>
```

## Typography

Apply complete Forge typography styles with single utility classes.

### Display

| Class         | Description                 |
| ------------- | --------------------------- |
| text-display1 | Display 1 (smallest)        |
| text-display2 | Display 2                   |
| text-display3 | Display 3                   |
| text-display4 | Display 4                   |
| text-display5 | Display 5                   |
| text-display6 | Display 6                   |
| text-display7 | Display 7                   |
| text-display8 | Display 8 (largest display) |

### Heading

| Class         | Description                 |
| ------------- | --------------------------- |
| text-heading1 | Heading 1 (smallest)        |
| text-heading2 | Heading 2                   |
| text-heading3 | Heading 3                   |
| text-heading4 | Heading 4                   |
| text-heading5 | Heading 5                   |
| text-heading6 | Heading 6                   |
| text-heading7 | Heading 7                   |
| text-heading8 | Heading 8 (largest heading) |

### Subheading

| Class            | Description                       |
| ---------------- | --------------------------------- |
| text-subheading1 | Subheading 1 (smallest)           |
| text-subheading2 | Subheading 2                      |
| text-subheading3 | Subheading 3                      |
| text-subheading4 | Subheading 4                      |
| text-subheading5 | Subheading 5                      |
| text-subheading6 | Subheading 6                      |
| text-subheading7 | Subheading 7                      |
| text-subheading8 | Subheading 8 (largest subheading) |

### Body

| Class      | Description           |
| ---------- | --------------------- |
| text-body1 | Body 1 (smallest)     |
| text-body2 | Body 2                |
| text-body3 | Body 3                |
| text-body4 | Body 4 (largest body) |

### Label

| Class       | Description             |
| ----------- | ----------------------- |
| text-label1 | Label 1 (smallest)      |
| text-label2 | Label 2                 |
| text-label3 | Label 3 (largest label) |

### Other

| Class         | Description   |
| ------------- | ------------- |
| text-button   | Button text   |
| text-overline | Overline text |
| text-link     | Link text     |

```html
<h1 class="text-heading4">Page Title</h1>
<p class="text-body2">Body content</p>
<span class="text-label1">Small label</span>
```

## Elevation (Box Shadow)

Use Tailwind aliases or Forge's numeric elevation scale (0-24).

<div class="flex gap-6 flex-wrap my-6 p-6">
  <div class="flex flex-col items-center gap-3">
    <div class="w-24 h-24 rounded-lg bg-surface shadow-sm" />

    <code class="text-label1 text-medium">shadow-sm</code>
  </div>

  <div class="flex flex-col items-center gap-3">
    <div class="w-24 h-24 rounded-lg bg-surface shadow-md" />

    <code class="text-label1 text-medium">shadow-md</code>
  </div>

  <div class="flex flex-col items-center gap-3">
    <div class="w-24 h-24 rounded-lg bg-surface shadow-lg" />

    <code class="text-label1 text-medium">shadow-lg</code>
  </div>

  <div class="flex flex-col items-center gap-3">
    <div class="w-24 h-24 rounded-lg bg-surface shadow-xl" />

    <code class="text-label1 text-medium">shadow-xl</code>
  </div>

  <div class="flex flex-col items-center gap-3">
    <div class="w-24 h-24 rounded-lg bg-surface shadow-2xl" />

    <code class="text-label1 text-medium">shadow-2xl</code>
  </div>
</div>

```html
<!-- Tailwind aliases -->
<div class="shadow-sm">...</div>
<div class="shadow-lg">...</div>

<!-- Forge elevation numbers -->
<div class="shadow-4">...</div>
<div class="shadow-16">...</div>
```

## Border Radius

Use `rounded-*` utilities mapped to Forge shape tokens.

<div class="flex gap-5 flex-wrap my-6">
  <div class="flex flex-col items-center gap-2">
    <div class="w-20 h-20 bg-primary rounded-xs" />

    <code class="text-label1 text-medium">rounded-xs</code>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="w-20 h-20 bg-primary rounded-sm" />

    <code class="text-label1 text-medium">rounded-sm</code>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="w-20 h-20 bg-primary rounded-md" />

    <code class="text-label1 text-medium">rounded-md</code>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="w-20 h-20 bg-primary rounded-lg" />

    <code class="text-label1 text-medium">rounded-lg</code>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="w-20 h-20 bg-primary rounded-xl" />

    <code class="text-label1 text-medium">rounded-xl</code>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="w-20 h-20 bg-primary rounded-full" />

    <code class="text-label1 text-medium">rounded-full</code>
  </div>
</div>

## Spacing

Both numeric (Tailwind-familiar) and semantic (Forge-familiar) scales are available.

<div class="flex flex-col gap-3 my-6">
  <div class="flex items-center gap-4">
    <div class="w-1 h-6 bg-primary rounded-xs" />

    <code class="text-label1 text-medium min-w-16">p-1</code>
    <span class="text-label1 text-low">4px — xxsmall</span>
  </div>

  <div class="flex items-center gap-4">
    <div class="w-2 h-6 bg-primary rounded-xs" />

    <code class="text-label1 text-medium min-w-16">p-2</code>
    <span class="text-label1 text-low">8px — xsmall</span>
  </div>

  <div class="flex items-center gap-4">
    <div class="w-3 h-6 bg-primary rounded-xs" />

    <code class="text-label1 text-medium min-w-16">p-3</code>
    <span class="text-label1 text-low">12px — small</span>
  </div>

  <div class="flex items-center gap-4">
    <div class="w-4 h-6 bg-primary rounded-xs" />

    <code class="text-label1 text-medium min-w-16">p-4</code>
    <span class="text-label1 text-low">16px — medium</span>
  </div>

  <div class="flex items-center gap-4">
    <div class="w-6 h-6 bg-primary rounded-xs" />

    <code class="text-label1 text-medium min-w-16">p-6</code>
    <span class="text-label1 text-low">24px — large</span>
  </div>

  <div class="flex items-center gap-4">
    <div class="w-8 h-6 bg-primary rounded-xs" />

    <code class="text-label1 text-medium min-w-16">p-8</code>
    <span class="text-label1 text-low">32px — xlarge</span>
  </div>

  <div class="flex items-center gap-4">
    <div class="w-12 h-6 bg-primary rounded-xs" />

    <code class="text-label1 text-medium min-w-16">p-12</code>
    <span class="text-label1 text-low">48px — xxlarge</span>
  </div>
</div>

```html
<!-- Numeric scale -->
<div class="p-4 m-8">...</div>

<!-- Semantic scale -->
<div class="p-medium m-xlarge">...</div>
```

## When to Use

Consider using `@tylertech/forge-tailwind` when:

- Your team is already familiar with Tailwind CSS
- You want utility-first styling with Forge's design tokens
- You're building custom layouts alongside Forge components

Consider using Forge's CSS custom properties directly when:

- You prefer minimal dependencies
- You're only using Forge components without custom styling
- You want maximum control over your CSS architecture

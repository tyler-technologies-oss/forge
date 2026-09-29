# Forge Installation & Setup

**In this file:**
- [1. Install Packages](#1-install-packages)
- [2. Choose Styling Approach](#2-choose-styling-approach) (Tailwind or Regular CSS)
- [3. Import Forge Styles](#3-import-forge-styles-required)
- [4. Body Styles](#4-body-styles-required-for-full-page-apps)
- [5. Register Components](#5-register-components) (Core + Subpath-only)
- [6. Register Icons](#6-register-icons)
- [7. Typography Setup](#7-typography-setup)
- [Complete Setup Example](#complete-setup-example)
- [Framework-Specific Notes](#framework-specific-notes)
- [Checklist](#checklist)

## ⚠️ CRITICAL: Read This When Starting From Scratch ⚠️

This reference covers the complete setup required for a new Forge application. **All steps are mandatory** for proper rendering.

---

## 1. Install Packages

```bash
# Core Forge package (required)
npm install @tylertech/forge

# Icons (required for any icons)
npm install @tylertech/tyler-icons
```

---

## 2. Choose Styling Approach

Before proceeding, decide how you want to handle styling:

| Approach | Package | When to Use |
|----------|---------|-------------|
| **Tailwind CSS** | `@tylertech/forge-tailwind` | New projects, rapid prototyping, utility-first styling |
| **Regular CSS** | None (use Forge CSS variables) | Existing non-Tailwind projects, traditional CSS approach |

### Option A: Tailwind CSS with Forge (Recommended for New Projects)

Install the Forge Tailwind package:

```bash
npm install -D tailwindcss @tylertech/forge-tailwind
npx tailwindcss init
```

Configure `tailwind.config.js`:

```javascript
import forgePreset from '@tylertech/forge-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  presets: [forgePreset],
};
```

Add Tailwind directives to your main CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Tailwind class examples:**
```html
<h1 class="text-heading5">Page Title</h1>
<div class="p-medium gap-4 flex">Content</div>
<div class="bg-surface rounded-medium">Card</div>
```

### Option B: Regular CSS with Forge Design Tokens

No additional packages needed. Use Forge CSS custom properties directly:

**CSS variable examples:**
```html
<h1 class="forge-typography--heading5">Page Title</h1>
<div style="padding: var(--forge-spacing-medium); gap: var(--forge-spacing-4);">Content</div>
```

### Class Comparison

| Purpose | Tailwind (forge-tailwind) | Regular CSS |
|---------|---------------------------|-------------|
| Typography | `text-heading3` | `forge-typography--heading3` |
| Padding | `p-medium` | `padding: var(--forge-spacing-medium)` |
| Gap | `gap-4` | `gap: var(--forge-spacing-4)` |
| Background | `bg-surface` | `background: var(--forge-theme-surface)` |
| Border radius | `rounded-medium` | `border-radius: var(--forge-shape-medium)` |

---

## 3. Import Forge Styles (REQUIRED)

**The Forge CSS must be imported for components to render correctly.**

```typescript
// In your main entry file (main.ts, index.ts, etc.)
import '@tylertech/forge/dist/forge.css';
```

Or in CSS/SCSS:
```css
@import '@tylertech/forge/dist/forge.css';
```

**What this provides:**
- Component styles
- Design tokens (CSS custom properties)
- Typography classes
- Utility classes

---

## 4. Body Styles (REQUIRED for Full-Page Apps)

**The `<body>` element MUST have these styles for full-page layouts:**

```css
body {
  background-color: var(--forge-theme-surface-dim, #fafafa);
  height: 100dvh;
  width: 100dvw;
  margin: 0;
}
```

**Why:** Without these styles, `forge-scaffold` and `forge-app-layout` will not fill the browser window.

---

## 5. Register Components

### Core Forge Components (@tylertech/forge)

Core components use **definition function imports**:

```typescript
import {
  defineButtonComponent,
  defineTextFieldComponent,
  defineSelectComponent,
  defineIconComponent,
  defineDialogComponent,
  defineScaffoldComponent,
  defineToolbarComponent,
  // ... import what you need
} from '@tylertech/forge';

// Call each definition function to register the component
defineButtonComponent();
defineTextFieldComponent();
defineSelectComponent();
defineIconComponent();
defineDialogComponent();
defineScaffoldComponent();
defineToolbarComponent();
```

**Or register all components at once (larger bundle size):**

```typescript
import { defineComponents } from '@tylertech/forge';
defineComponents();
```

### Subpath-Only Components (@tylertech/forge/{component})

Some components are only available from their own subpath and use **side-effect imports**:

```typescript
// Each import registers the component automatically
import '@tylertech/forge/app-layout';
import '@tylertech/forge/structured-card';
import '@tylertech/forge/user-profile';
import '@tylertech/forge/busy-indicator';
import '@tylertech/forge/confirmation-dialog';
```

**⚠️ CRITICAL:** These components are not registered by `defineComponents()` and their definition functions are deprecated. Always use side-effect imports.

---

## 6. Register Icons

**Icons MUST be registered before use.**

```typescript
// ✅ CORRECT - import from @tylertech/tyler-icons (NO SUBPATHS)
import { tylIconHome, tylIconSettings, tylIconClose, tylIconMenu } from '@tylertech/tyler-icons';
import { IconRegistry } from '@tylertech/forge';

// Register icons
IconRegistry.define([tylIconHome, tylIconSettings, tylIconClose, tylIconMenu]);
```

**⚠️ NEVER import from subpaths like `/standard` - they DO NOT EXIST:**
```typescript
// ❌ WRONG - these paths DO NOT EXIST
import { tylIconHome } from '@tylertech/tyler-icons/standard';  // DOES NOT EXIST
```

---

## 7. Typography Setup

Typography classes are included in `forge.css`. Use them directly:

```html
<h1 class="text-heading5">Page Title</h1>
<h2 class="text-heading4">Section Title</h2>
<h3 class="text-heading3">Card Title</h3>
<p class="text-body1">Body text</p>
<span class="text-label1">Label text</span>
```

**Scale reference:** `text-heading1` (smallest) → `text-heading5` (largest)

---

## Complete Setup Example

```typescript
// main.ts - Complete setup for a new Forge app

// 1. Import Forge styles
import '@tylertech/forge/dist/forge.css';

// 2. Import and register core components
import {
  defineButtonComponent,
  defineIconComponent,
  defineTextFieldComponent,
  defineSelectComponent,
  defineDialogComponent,
  defineScaffoldComponent,
  defineToolbarComponent,
  defineListComponent,
  defineListItemComponent,
  defineDrawerComponent,
  IconRegistry
} from '@tylertech/forge';

defineButtonComponent();
defineIconComponent();
defineTextFieldComponent();
defineSelectComponent();
defineDialogComponent();
defineScaffoldComponent();
defineToolbarComponent();
defineListComponent();
defineListItemComponent();
defineDrawerComponent();

// 3. Import subpath-only components (side-effect imports)
import '@tylertech/forge/app-layout';
import '@tylertech/forge/structured-card';

// 4. Register icons
import {
  tylIconMenu,
  tylIconHome,
  tylIconSettings,
  tylIconClose,
  tylIconSearch
} from '@tylertech/tyler-icons';

IconRegistry.define([tylIconMenu, tylIconHome, tylIconSettings, tylIconClose, tylIconSearch]);
```

```css
/* styles.css - Required body styles */
body {
  background-color: var(--forge-theme-surface-dim, #fafafa);
  height: 100dvh;
  width: 100dvw;
  margin: 0;
}
```

---

## Framework-Specific Notes

### Angular
- Use `@tylertech/forge-angular` for Angular-wrapped components
- Import modules like `ForgeButtonModule`, `ForgeTextFieldModule`

### React
- Use `@tylertech/forge-react` for React-wrapped components
- Components are capitalized: `<ForgeButton>`, `<ForgeTextField>`

---

## Checklist

Before your app will render correctly, verify:

- [ ] Styling approach chosen (Tailwind with `@tylertech/forge-tailwind` OR regular CSS)
- [ ] `@tylertech/forge/dist/forge.css` is imported
- [ ] Body styles are set (height, width, margin, background-color)
- [ ] Core components are registered via definition functions
- [ ] Subpath-only components (e.g. `forge-app-layout`, `forge-structured-card`) are imported via side-effect imports
- [ ] Icons are registered via `IconRegistry.define()`
- [ ] If using Tailwind: `tailwind.config.js` includes the forge preset

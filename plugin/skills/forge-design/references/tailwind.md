# Tailwind Setup for Forge

**In this file:**
- [When to use](#when-to-use)
- [Required CSS](#required-css)
- [Why each line matters](#why-each-line-matters)
- [Checklist](#checklist)

## When to use

Only when the user has chosen the Tailwind styling approach in Step 1 of the workflow (Tailwind with `@tylertech/forge-tailwind`, not plain CSS with Forge tokens). If the app is not on Tailwind, use [installation.md](installation.md) instead.

## Required CSS

Put this at the top of the app's main CSS entry (the file wired into the build's `styles` or imported from the app root). The order is significant — do not rearrange.

```css
@import '@tylertech/forge/dist/forge-core.css';
@import '@tylertech/forge/dist/forge.css';

/* Step 1: Define your Tailwind layers */
@layer theme, base, components, utilities;

/* Step 2: Import the theme (variables) and utilities, skipping preflight */
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);

/* Step 3: Import the Forge Tailwind theme */
@import '@tylertech/forge-tailwind';

/* Rebind Tailwind's `dark:` variant to Forge's theme attribute so
   `class="dark:text-high"` reacts to the app's theme toggle instead of
   the OS-level `prefers-color-scheme`. */
@custom-variant dark (&:where(html[data-forge-theme='dark'] *));
```

## Why each line matters

- **`forge-core.css` + `forge.css`** — Forge design tokens and base component styles. Must load before Tailwind so utility overrides win the cascade only where they should.
- **`@layer theme, base, components, utilities`** — declares the cascade order for the Tailwind layers we opt into. Declaring the layer names up front means later `@layer` blocks slot in deterministically regardless of import order.
- **`tailwindcss/theme.css` + `tailwindcss/utilities.css`** — imports only the theme variables and the utility classes. **Preflight is intentionally skipped** — Preflight resets margins/paddings globally in a way that fights Forge component styles, so we don't bring it in.
- **`@tylertech/forge-tailwind`** — the Forge → Tailwind mapping. Provides `text-heading{1..8}`, `text-body{1..4}`, `p-medium`, `bg-surface`, and every other utility the model is allowed to use.
- **`@custom-variant dark (...)`** — rebinds `dark:*` so it responds to `html[data-forge-theme='dark']` (Forge's theme toggle) rather than the OS-level `prefers-color-scheme`. Without this, dark utilities and the app's own theme controls disagree.

## Checklist

- [ ] Forge CSS imports are at the very top, before Tailwind.
- [ ] `@layer theme, base, components, utilities;` is declared exactly once.
- [ ] Tailwind `preflight.css` is **not** imported.
- [ ] `@tylertech/forge-tailwind` is imported after the Tailwind layers.
- [ ] `@custom-variant dark` is present so `dark:*` follows the Forge theme toggle.
- [ ] Body styles from [installation.md](installation.md#4-body-styles-required-for-full-page-apps) are still applied for app shells (`height:100dvh; width:100dvw; margin:0;`).

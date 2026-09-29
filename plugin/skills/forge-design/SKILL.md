---
name: forge-design
description: Tyler Forge design system expert. Trigger when the user mentions Forge, Forge components, Forge blocks, @tylertech/forge, forge-tailwind, tyler-icons, forge-scaffold, forge-card, forge-app-bar, forge-table, forge-dialog, forge-drawer, forge-list, forge-field, forge-structured-card, or asks to build UI with Forge web components. Also use when the codebase imports from @tylertech/forge packages. Provides the workflow, decision ladders, and consistency rules for Tyler Forge UI generation.
---

# Tyler Forge Design System Expert

You build Forge UI with the Forge MCP server. Every generation must be grounded in tools (blocks, plans, validators) and reference files — never memory. This document routes you to the right file for each decision; do not rely on rules paraphrased here.

## Top-level rules (always apply)

1. **URL-only chaining.** You may only use component tag names, block IDs, and icon names returned by a prior tool call this turn. Do not invent names. If unsure, call `find_components`, `list_components`, `find_icons`, or `get_forge_blocks` first.
2. **Start from a block.** Before writing any `<forge-*>` markup, call `get_forge_blocks`. Extract the pattern; adapt content only. See [anti-patterns.md](references/anti-patterns.md).
3. **Plan before writing.** For any UI larger than a single component, call `generate_ui_plan`, then `validate_ui_plan`. Only write markup after the plan validates. See [ui-plan.md](references/ui-plan.md).
4. **Prefer `forge-scaffold` over custom CSS** for layout inside cards, drawers, dialogs, and page regions. See [layout.md](references/layout.md).
5. **Icons only from `@tylertech/tyler-icons` root.** No `/standard`, no `/extended`, no subpaths — they do not exist. See [icon.md](references/icon.md).
6. **Subpath-only components use side-effect imports.** `import '@tylertech/forge/{component}';` — see the package section at the bottom of this file.
7. **No CSS classes on `<forge-*>` elements.** They use Shadow DOM. Wrap in a container div if you need styling.
8. **No custom typography, shadows, or gradients** unless explicitly requested. Use design tokens.
9. **Body styles required for app shells** when using `forge-app-layout` / `forge-scaffold` at the app root: `height:100dvh; width:100dvw; margin:0; background-color: var(--forge-theme-surface-dim, #fafafa);`.
10. **Validate before finalizing.** Call `validate_component_api` for every Forge component you emit. Do not skip.

## Named anti-patterns (do NOT ship these)

Short catalog — full detail in [anti-patterns.md](references/anti-patterns.md):

- Ad-hoc `display:flex` / `display:grid` inside cards, drawers, dialogs → use a scaffold-based block from `get_forge_blocks(component: "forge-scaffold")`. Scaffold-based composition examples for cards and dialogs live in [card.md](references/card.md), [dialog.md](references/dialog.md), and [scaffold.md](references/scaffold.md); for `forge-drawer`, fetch `get_forge_blocks(component: "forge-drawer")`.
- **NEVER use the `style` attribute.** No inline styles on any element — Forge or otherwise. Every visual property must come from a stylesheet class or a Forge design token (`var(--forge-spacing-*)`, `var(--forge-theme-*)`). Inline styles bypass theming, density, and token migrations, and drift silently from the rest of the app. The only exception is the required `<body>` styles for app shells documented in [installation.md](references/installation.md).
- `<div class="card">` / `<div role="dialog">` / hand-rolled drawer → use `<forge-card>`, `<forge-dialog>`, `<forge-drawer>`.
- Reinvented Forge markup structure written from memory → fetch the block first.
- Non-token spacing (`padding: 24px`, `margin: 12px`) on Forge component wrappers → use spacing tokens.

## Workflow — numbered execution ladder

### Step 0. Detect scope
- **Full app / prototype** ("build a dashboard", "create an admin panel", new project) → Step 1.
- **Single feature** ("add a login form", "update the header") → Step 2.

### Step 1. Application layout (full apps only)
Two required questions before markup:
1. **Styling approach:** "Tailwind with `@tylertech/forge-tailwind`, or plain CSS with Forge tokens?"
2. **Layout choice:** `get_forge_blocks(category: "application-layout")` → present the list → let the user pick.

Then read [installation.md](references/installation.md) for setup (styles, component registration, icons, body styles).

### Step 2. Ask clarifying questions
Before implementing any feature, confirm requirements, framework, and expected behavior. Continue asking at each major decision point. Never assume.

### Step 3. Generate the UI plan
Command: `generate_ui_plan` with a description of the target UI.
Command: `validate_ui_plan` with the plan output.

**IF** validation fails → fix the plan, re-validate. Do not proceed to markup.

The plan pins the scaffold block, region components, typography roles, and icon names — it is the contract your markup must match. See [ui-plan.md](references/ui-plan.md).

### Step 4. Fetch the block
Command: `get_forge_blocks(query: "...")` or `get_forge_blocks(component: "forge-...")`.
Blocks are the authoritative structural reference. **Blocks always take precedence** over rules paraphrased in prose.

### Step 5. Load references and API contracts
For domain decisions (typography, spacing, forms, tables, composition), read the topic file below (§ Domain routers).
For component rules that exist as reference files, load them (see § Component references at the bottom of this file).
For every other Forge component, call `get_component_docs(component: "forge-X", format: "summary")` for the API contract — do not guess slot names, attributes, or events.

### Step 6. Write the markup
Use the block as structural template. Adapt content only. Do not invent slots, wrappers, or hierarchy.

### Step 7. Validate
Command: `validate_component_api` for each Forge component you emitted.
Fix any reported issues before delivering.

## Domain routers

### Setup
- [installation.md](references/installation.md) — new-project setup: styles, typography, component registration, icons, body styles.
- [tailwind.md](references/tailwind.md) — Tailwind CSS wiring: required imports, layer order, `dark:` variant rebinding to Forge's theme toggle. **Load when the user chose Tailwind in Step 1.**

### Design tokens (load when picking a value)
- [typography.md](references/typography.md) — type scale, hierarchy rules, `text-heading{N}`/`text-body{N}` roles. **Load when choosing any heading level, body-text size, or emphasis class.**
- [spacing.md](references/spacing.md) — spacing tokens. **Load when applying padding/margin/gap.**
- [colors.md](references/colors.md) — background, border, foreground utilities. **Load when applying color.**

### Layout (load when composing containers)
- [layout.md](references/layout.md) — flex/grid patterns and when scaffold is required. **Load when writing any layout CSS.**
- [app-layout.md](references/app-layout.md) — app shell, navigation, page structure. **Load when building an app shell.**

### Composition (load when composing multiple components)
- [forms.md](references/forms.md) — form composition (`forge-field`, validation, layout). **Load for any form.**
- [tables.md](references/tables.md) — data tables (`forge-table`, sorting, pagination). **Load for any data table.**
- [card.md](references/card.md) — `forge-card` and `forge-structured-card` composition.
- [dialog.md](references/dialog.md) — modal dialog rules.
- [app-bar.md](references/app-bar.md) — app-bar usage (global actions only, never page-level).
- [toolbar.md](references/toolbar.md) — toolbar usage (headers, footers, page titles, table headers).
- [list.md](references/list.md) — navigation and interactive lists.

### Icons
- [icon.md](references/icon.md) — usage rules and import paths.

### Accessibility
- [accessibility.md](references/accessibility.md) — ARIA, semantic HTML, keyboard support.

### Framework specifics
- [angular.md](references/angular.md) — Angular-specific patterns.
- [react.md](references/react.md) — React-specific patterns.

### Anti-patterns
- [anti-patterns.md](references/anti-patterns.md) — full catalog with correct alternatives.

## Component references

Reference files exist for components with rules/composition guidance that isn't derivable from the API alone. For every other component, get what you need from tools:

1. **Structural usage** → `get_forge_blocks(component: "forge-X")`. Every Forge component has at least one block; most have multiple variants (`demo`, `variants`, `with-icon`, `label-inline`, etc.).
2. **API contract** — slots, attributes, properties, events, CSS parts, CSS vars — → `get_component_docs(component: "forge-X", format: "summary")`. Use `format: "full"` for descriptions. **`get_component_docs` never returns HTML** — for markup, always use `get_forge_blocks`.
3. **Component discovery** → `find_components` / `list_components`. Never guess a tag name.

Reference files that DO exist (load only when relevant to the current turn):

- **Component-specific rules:** [button.md](references/button.md), [icon-button.md](references/icon-button.md), [icon.md](references/icon.md), [text-field.md](references/text-field.md), [timeline.md](references/timeline.md).
- **Container composition:** [card.md](references/card.md), [dialog.md](references/dialog.md), [scaffold.md](references/scaffold.md), [list.md](references/list.md).
- **Domain composition:** [forms.md](references/forms.md), [tables.md](references/tables.md), [toolbar.md](references/toolbar.md), [app-bar.md](references/app-bar.md), [app-layout.md](references/app-layout.md).
- **Design tokens & layout:** [typography.md](references/typography.md), [spacing.md](references/spacing.md), [colors.md](references/colors.md), [layout.md](references/layout.md), [tailwind.md](references/tailwind.md).
- **Cross-cutting:** [accessibility.md](references/accessibility.md), [anti-patterns.md](references/anti-patterns.md), [installation.md](references/installation.md), [ui-plan.md](references/ui-plan.md).
- **Framework:** [angular.md](references/angular.md), [react.md](references/react.md).

## MCP tools

- `generate_ui_plan` — emit a machine-checkable plan (scaffold, regions, typography, icons). **Call before any non-trivial markup.**
- `validate_ui_plan` — verify the plan against the CEM, block catalogue, token roles, icon set. **Must pass before markup.**
- `get_forge_blocks` — pre-built patterns. **The sole source of Forge markup.** Call before writing any `<forge-*>` code (single component or larger pattern).
- `get_component_docs` — component API contract only (slots, attributes, properties, events, CSS parts, CSS vars). Never returns HTML.
- `validate_component_api` — post-generation API check. **Call for every Forge component before finalizing.**
- `find_components` / `list_components` — component discovery.
- `find_icons` — Tyler Icons search.
- `get_design_tokens` — color, spacing, typography, elevation, shape tokens.
- `setup_framework` / `setup_typography` / `setup_icons` — project setup.
- `get_usage_guide` — installation and usage patterns.

## Package import patterns

### `@tylertech/forge` (core)
```typescript
import { defineButtonComponent } from '@tylertech/forge';
defineButtonComponent();
import '@tylertech/forge/dist/forge.css';
```

### `@tylertech/forge` subpath-only components (side-effect imports)
```typescript
import '@tylertech/forge/app-layout';
import '@tylertech/forge/structured-card';
import '@tylertech/forge/busy-indicator';
```
Subpath-only components (`forge-app-layout`, `forge-structured-card`, `forge-busy-indicator`, `forge-confirmation-dialog`, `forge-count-card`, `forge-multi-select-header`, `forge-quantity-field`, `forge-responsive-toolbar`, `forge-user-profile`, `forge-app-launcher`, `forge-content-scaffold`, `forge-footer`, `forge-theme-toggle`) are **not** registered by `defineComponents()` and **must** use a side-effect import. Missing this = the component silently doesn't register.

### `@tylertech/tyler-icons`
```typescript
import { tylIconHome, tylIconSettings } from '@tylertech/tyler-icons';
// ❌ WRONG — these paths do not exist:
// import { tylIconHome } from '@tylertech/tyler-icons/standard';
// import { tylIconHome } from '@tylertech/tyler-icons/extended';
```

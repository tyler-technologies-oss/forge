---
name: figma-code-connect
description: Creates Figma Code Connect mapping files for Forge web components
---

# Figma Code Connect Setup for Forge

Creates `.figma.ts` files in `src/figma/primitives/` that map Figma designs to web component code.

## Workflow

### 1. Get Design Context

Parse URL: `https://figma.com/design/:fileKey/:fileName?node-id=1234-5678`

- Extract `fileKey`: `hFu1PYD4Rdihc2E4givJ3j`
- Extract `nodeId`: convert `1234-5678` → `1234:5678`

```typescript
mcp__figma__get_design_context(
  (nodeId = '1234:5678'),
  (fileKey = 'hFu1PYD4Rdihc2E4givJ3j'),
  (clientLanguages = 'typescript,html'),
  (clientFrameworks = 'web components'),
  (excludeScreenshot = true) // optional
);
```

**Extract property names from response:**

- Look at TypeScript props interface in response
- **Use EXACT property names** (e.g., `first`, `firstLast`, `label`)
- Note types: `boolean`, `string`, enum values

### 2. Check Stories File

Read `src/stories/components/[component]/[Component].stories.ts` for actual usage syntax.

Map Figma properties to attributes:

- Boolean: `first` → `first`
- CamelCase: `firstLast` → `first-last`
- String: `label` → `label="${props.label}"`

### 3. Create Mapping File

**File:** `src/figma/primitives/forge-[component].figma.ts`

```typescript
import figma, { html } from '@figma/code-connect/html';

// Simple component
figma.connect('<FIGMA_COMPONENT_COMPONENT>', {
  props: {
    disabled: figma.enum('disabled', {
      // Use exact Figma property name
      true: 'disabled',
      false: undefined
    }),
    label: figma.string('label')
  },
  example: (props: any) => html`<forge-component ${props.disabled} label="${props.label}"></forge-component>`
});

// Component with variants
figma.connect('<FIGMA_COMPONENT_COMPONENT>', {
  variant: { type: 'alternative' }, // Use exact enum value from Figma
  props: {
    /* ... */
  },
  example: (props: any) => html`<forge-component alternative></forge-component>`
});
```

### 4. Update Config

Add to `figma.config.json` in `documentUrlSubstitutions`:

```json
"<FIGMA_COMPONENT_COMPONENT>": "https://www.figma.com/design/hFu1PYD4Rdihc2E4givJ3j/Forge-3.x-Components?node-id=1234-5678"
```

Alias format: `<FIGMA_[COMPONENT]_[VARIANT]>` in SCREAMING_SNAKE_CASE

## Critical Patterns

### Boolean Properties

```typescript
// Figma property: "disabled" or "Disabled" (use exact name from response)
disabled: figma.enum('disabled', {
  true: 'disabled',
  false: undefined
});
```

### Boolean-Controlled Text

```typescript
// When boolean controls visibility of text field
secondarySlot: figma.boolean('Secondary slot', {
  true: figma.string('secondary'), // Property name, not display label
  false: undefined
});
// Usage: <span slot="secondary">${props.secondarySlot}</span>
```

### Dynamic Children

```typescript
// Capture child components, don't hardcode
button: figma.children('forge-button');
// Usage: ${props.button}
```

### Instance Swap Properties

```typescript
// Properties often have spaces: "header content", "body-left content"
headerContent: figma.instance('header content');
```

## Common Errors

### Wrong property name

**Error:** `The property "Label" does not exist`
**Fix:** Use exact name from Figma response (e.g., `label` not "Label")

### Conditional in template

**Error:** `Expected a call expression, got ConditionalExpression`
**Fix:** Return HTML in prop mapping, not template

```typescript
// WRONG
example: props => html`${props.slot ? html`<span>${props.slot}</span>` : ''}`;

// CORRECT
slotContent: figma.boolean('Slot', { true: html`<span>Text</span>`, false: undefined });
example: props => html`${props.slotContent}`;
```

### Hardcoded children

**Fix:** Use `figma.children()` to capture dynamic components

```typescript
// WRONG: <forge-button variant="outlined">Select</forge-button>
// CORRECT: button: figma.children('forge-button'), usage: ${props.button}
```

## Validation

```bash
# Test
npx figma connect publish --dry-run

# Publish
npx figma connect publish
```

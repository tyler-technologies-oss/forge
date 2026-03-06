---
name: figma-code-connect
description: Creates Figma Code Connect mapping files for Forge web components
---

# Figma Code Connect Setup for Forge

## Overview

This skill creates Code Connect mapping files that link Figma design components to Forge web component implementations. It generates `.figma.ts` files with code examples and maintains the configuration for publishing to Figma.

## Prerequisites

- Figma MCP server must be connected and accessible
- User must provide a Figma URL with node ID: `https://figma.com/design/:fileKey/:fileName?node-id=1234-5678`
- **IMPORTANT:** Convert URL node ID format from `1234-5678` (hyphen) to `1234:5678` (colon) for API calls
- Access to the Forge codebase at `src/lib/[component]/`

## Required Workflow

**Follow these steps in order. Do not skip steps.**

### Step 1: Get Design Context from Figma

Call `mcp__figma__get_design_context` to fetch the component design:

**Parse the Figma URL:**

- URL format: `https://figma.com/design/:fileKey/:fileName?node-id=1234-5678`
- Extract `fileKey`: segment after `/design/` (e.g., `hFu1PYD4Rdihc2E4givJ3j`)
- Extract `nodeId`: from query param, convert `1234-5678` → `1234:5678`

**Required parameters:**

```
mcp__figma__get_design_context(
  nodeId="1234:5678",
  fileKey="hFu1PYD4Rdihc2E4givJ3j",
  clientLanguages="typescript,html",
  clientFrameworks="web components"
)
```

**Handle the response:**

- Returns React+Tailwind reference code, screenshot, and design properties
- **CRITICAL:** This is a REFERENCE only - must adapt to Forge's web components syntax
- Extract component properties: boolean flags, enum values, text content, slots
- Use the screenshot to understand visual structure

### Step 2: Find Component in Codebase

Search for the Forge component using pattern `forge-[component-name]`:

**Search strategy:**

1. Run: `grep -r "component-name" src/lib/`
2. Read key files:
   - `src/lib/[component]/[component].ts` - Component interface, properties, attributes
   - `src/lib/[component]/[component]-constants.ts` - Attribute names and constants
   - `src/stories/components/[component]/[Component].stories.ts` - **Usage examples (CRITICAL reference)**
3. Identify:
   - Boolean attributes (e.g., `selected`, `disabled`, `open`, `outlined`)
   - Enum properties (e.g., `variant`, `theme`, `placement`)
   - Required attributes (e.g., `value`)
   - Slot names (e.g., `start`, `end`, `header`, `icon`)

**Example search:**

```bash
grep -r "expansion-panel" src/lib/
# Find: src/lib/expansion-panel/expansion-panel.ts
# Read: Component has 'open' boolean attribute, 'header' slot
```

### Step 3: Examine Existing Patterns

**Before creating, ALWAYS check existing patterns:**

Read 2-3 similar components from `src/figma/primitives/`:

- Simple component: `forge-card.figma.ts`
- With slots: `forge-banner.figma.ts`
- Multiple variants: `forge-button.figma.ts`
- Nested children: `forge-list.figma.ts`

**Check the Stories file for accurate examples:**
The `.stories.ts` file shows the ACTUAL usage patterns. Use this to verify:

- Attribute syntax (boolean vs string)
- Slot usage
- Nesting patterns
- Required vs optional props

### Step 4: Create Code Connect File

Create `src/figma/primitives/forge-[component].figma.ts` following these patterns:

**File structure:**

```typescript
import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  // Boolean attributes: map to attribute or undefined (NOT empty string)
  booleanAttr: figma.enum('Property Name', {
    true: 'attribute-name',
    false: undefined
  }),

  // Enum attributes: map specific values
  variant: figma.enum('Variant', {
    Primary: 'primary',
    Secondary: 'secondary'
  }),

  // Text content
  text: figma.string('Text'),

  // Conditional slots/icons
  iconSlot: figma.boolean('Icon slot', {
    true: html`<forge-icon slot="icon" name="icon_name"></forge-icon>`,
    false: undefined
  }),

  // Nested children
  children: figma.children('selector')
};

// Component name - descriptive comment
figma.connect('<FIGMA_COMPONENT_ALIAS>', {
  props: {
    ...sharedProps
  },
  example: (props: any) => html`<forge-component ${props.booleanAttr} variant="${props.variant}"> ${props.iconSlot} ${props.text} </forge-component>`
});
```

**Critical patterns:**

- **Lowercase prop names**: Use `text` not `Text`
- **Boolean attributes**: Return attribute name or `undefined` (NOT `true`/`false` strings)
- **Use placeholders**: For required attributes like `value`, use `value="placeholder"`
- **Add comments**: Describe each `figma.connect()` block
- **Group related**: Keep related components in same file (e.g., button + split-button)
- **Reference stories**: Match the actual usage patterns from Storybook

### Step 5: Update Configuration

Add alias to `figma.config.json` in `documentUrlSubstitutions`:

**Alias naming convention:**

- Format: `<FIGMA_[COMPONENT]_[VARIANT]>` in SCREAMING_SNAKE_CASE
- Replace spaces/dashes with underscores
- Examples:
  - `<FIGMA_BUTTON_TOGGLE_BUTTON_TOGGLE>`
  - `<FIGMA_EXPANSION_PANEL_EXPANSION_PANEL>`

**Add to config:**

```json
{
  "documentUrlSubstitutions": {
    ...existing entries,
    "<FIGMA_COMPONENT_ALIAS>": "https://www.figma.com/design/hFu1PYD4Rdihc2E4givJ3j/Forge-3.x-Components?node-id=1234-5678"
  }
}
```

### Step 6: Present Results and Validation

Show the user:

1. **Files created**: `src/figma/primitives/forge-[component].figma.ts`
2. **Config updated**: New alias added
3. **Property mappings**: Explain how Figma properties map to attributes
4. **Example output**: Show the generated HTML
5. **Validation command**:

   ```bash
   # Validate
   npx figma connect publish --dry-run

   # Publish
   npx figma connect publish
   ```

## Property Mapping Patterns

### Instance Swap Properties

**CRITICAL:** When Figma components have instance swap properties for nested components, they're typically named with "content" suffix and spaces:

```typescript
// Property names in Figma: "header content", "body-left content", etc.
headerContent: figma.instance('header content'),
bodyLeftContent: figma.instance('body-left content')
```

**Key rules:**

- Use `figma.instance('property name')` to capture swapped component instances
- Property names often have **spaces** (not camelCase or hyphens)
- Check the exact property name in Figma - it may be "left content" not "left" or "leftContent"
- `figma.instance()` captures the actual component (forge-drawer, forge-app-bar, etc.)

**Example - Scaffold with nested components:**

```typescript
figma.connect('<FIGMA_SCAFFOLD_SCAFFOLD>', {
  props: {
    headerContent: figma.instance('header content'),
    bodyLeftContent: figma.instance('body-left content')
  },
  example: (props: any) =>
    html`<forge-scaffold>
      <div slot="header">${props.headerContent}</div>
      <div slot="body-left">${props.bodyLeftContent}</div>
    </forge-scaffold>`
});
```

### Boolean Attributes

Map Figma boolean properties to attributes:

```typescript
open: figma.enum('Open', {
  true: 'open', // Renders as: <element open>
  false: undefined // Renders as: <element>
});
```

### State and Disabled Properties

**IMPORTANT:** Figma components handle disabled/state properties in two different ways:

**Pattern 1: State enum (most common)**
Some components have a "State" property with string values:

```typescript
disabled: figma.enum('State', {
  Disabled: 'disabled', // Maps "Disabled" value to disabled attribute
  Enabled: undefined, // Maps "Enabled" to no attribute
  Hover: undefined // Hover doesn't affect the disabled attribute
});
// Usage: <forge-chip disabled> or <forge-chip>
```

**Pattern 2: Boolean Disabled property**
Some components have a direct "Disabled" boolean property:

```typescript
disabled: figma.enum('Disabled', {
  true: 'disabled',
  false: undefined
});
// Usage: <forge-chip disabled> or <forge-chip>
```

**How to identify which pattern to use:**

1. Run `get_design_context()` and examine the Figma component structure
2. Look at the generated code's conditional logic (e.g., `isDisabledAndNotSelected`)
3. Check what properties are mentioned in validation errors
4. Use `figma.enum()` for both patterns - map string values or booleans to the attribute name

### Enum Properties

Map specific variant values:

```typescript
variant: figma.enum('Type', {
  Raised: 'raised',
  Outlined: 'outlined',
  Filled: 'filled'
});
// Renders as: variant="raised"
```

### Conditional Slots

Use boolean props for optional slots:

```typescript
startSlot: figma.boolean('Start slot', {
  true: html`<forge-icon slot="start" name="icon_name"></forge-icon>`,
  false: undefined
});
```

### Nested Children

Use selectors to capture nested components:

```typescript
listItems: figma.children('forge-list-item');
// Captures all forge-list-item children
```

## Examples

### Example 1: Simple Component (forge-card)

**User provides:** `https://figma.com/design/hFu1PYD4Rdihc2E4givJ3j/Forge?node-id=2633-1003`

**Actions:**

1. Parse: `fileKey="hFu1PYD4Rdihc2E4givJ3j"`, `nodeId="2633:1003"`
2. Call `get_design_context()`
3. Find: `src/lib/card/card.ts` has `raised` boolean property
4. Check stories: `<forge-card raised></forge-card>`
5. Create file:

```typescript
figma.connect('<FIGMA_CARD_CARD>', {
  props: {
    raised: figma.enum('Style', {
      Raised: true
    })
  },
  example: (props: any) => html`<forge-card raised="${props.raised}"></forge-card>`
});
```

6. Update config with `<FIGMA_CARD_CARD>` alias
7. Output: Simple, matches stories exactly

### Example 2: Component with Slots (forge-expansion-panel)

**User provides:** `https://figma.com/design/hFu1PYD4Rdihc2E4givJ3j/Forge?node-id=3557-1316`

**Actions:**

1. Parse URL, call `get_design_context()`
2. Find: `src/lib/expansion-panel/` with `open` attribute, `header` slot
3. **Check stories** for actual usage:

```html
<forge-card>
  <forge-expansion-panel>
    <div slot="header" role="button" style="display: flex; justify-content: space-between;">
      <div>Header text</div>
      <forge-open-icon></forge-open-icon>
    </div>
    <p>Content</p>
  </forge-expansion-panel>
</forge-card>
```

4. Create file matching stories pattern exactly
5. User provides feedback: "wrap in forge-card"
6. Update file to match user's specification
7. Output: Matches actual project usage

### Example 3: Component with Multiple Variants (forge-button-toggle)

**User provides two URLs:**

- Button toggle: `node-id=2034-720`
- Button toggle group: `node-id=2040-1099`

**Actions:**

1. Get design context for both
2. Find both components in codebase
3. Check stories for usage patterns
4. **Combine in single file** (related components together)
5. Create mappings for both:
   - Individual button-toggle with slots and state
   - Button-toggle-group with children pattern
6. Add both aliases to config
7. User notes missing value attribute
8. Add `value="placeholder"` to example
9. Output: Both components properly connected

## Best Practices

### Always Reference Stories

The `.stories.ts` file is the source of truth for component usage. Check it before creating Code Connect files.

### Keep It Simple

Only map properties that exist in BOTH Figma design AND code component. Don't add extra properties.

### Use Descriptive Placeholders

For required attributes without Figma properties, use descriptive placeholders:

- `value="placeholder"` not `value="value"`
- `anchor="my-button"` not `anchor="anchor"`

### Group Related Components

Keep related components in one file:

- `forge-button.figma.ts`: button + split-button + button variants
- `forge-button-toggle.figma.ts`: button-toggle + button-toggle-group

### Consistent Naming

- **Props**: lowercase (`text`, `open`, `variant`)
- **Aliases**: SCREAMING_SNAKE_CASE (`<FIGMA_BUTTON_BUTTON>`)
- **Files**: lowercase-hyphenated (`forge-button.figma.ts`)

### Add Comments

Every `figma.connect()` call should have a comment describing the variant or usage.

## Common Issues and Solutions

### Issue: TypeScript import errors

**Cause:** `@figma/code-connect/html` may show type resolution errors
**Solution:** This is expected and doesn't affect functionality. Ignore the diagnostic.

### Issue: Generated code doesn't match project style

**Cause:** Didn't reference the stories file for actual usage patterns
**Solution:** Always check `src/stories/components/[component]/[Component].stories.ts` first

### Issue: Boolean attributes rendering incorrectly

**Cause:** Using `true`/`false` strings instead of attribute/undefined pattern
**Solution:**

```typescript
// WRONG
open: figma.boolean('Open', {
  true: 'true',
  false: 'false'
});

// CORRECT
open: figma.enum('Open', {
  true: 'open',
  false: undefined
});
```

### Issue: Disabled state not mapping correctly

**Cause:** Figma components use different property patterns for disabled state
**Solution:** Check if the component uses:

- **State enum**: `figma.enum('State', { Disabled: 'disabled', Enabled: undefined, Hover: undefined })`
- **Boolean**: `figma.enum('Disabled', { true: 'disabled', false: undefined })`

Run validation to see which properties exist, then map accordingly. See "State and Disabled Properties" section.

### Issue: Nested component instances not showing

**Cause:** Using wrong property name or wrong capture method
**Solution:**

1. Instance swap properties in Figma often have **spaces** in the name (e.g., "header content" not "header" or "headerContent")
2. Use `figma.instance('exact property name')` not `figma.children('layer-name')`
3. Run `get_design_context` and check validation errors to see actual property names
4. Example:

```typescript
// WRONG - using layer name or wrong property name
headerContent: figma.children('header-container');
headerContent: figma.instance('header');

// CORRECT - using instance swap property name with space
headerContent: figma.instance('header content');
```

### Issue: Cannot nest figma functions in html templates

**Cause:** Trying to nest `figma.children()` or `figma.instance()` inside `html` template literals in boolean mappings
**Solution:** Assign figma functions at the prop level, not inside templates

```typescript
// WRONG - nesting inside html template within boolean
leftSlot: figma.boolean('left', {
  true: html`<div slot="left">${figma.children('left')}</div>`,
  false: undefined
});

// CORRECT - using figma.instance at prop level
leftContent: figma.instance('left content');
// Then use in template:
example: props => html`<div slot="left">${props.leftContent}</div>`;
```

### Issue: Component has properties not in Figma design

**Cause:** Code has more options than design shows
**Solution:** Only map what exists in Figma. Figma doesn't always match code completely.

### Issue: Need to combine multiple components

**Cause:** Related components (like button-toggle + button-toggle-group)
**Solution:** Put both in the same `.figma.ts` file. Check existing examples like `forge-list.figma.ts`.

## Project-Specific Context

**Forge Web Components:**

- Location: `src/figma/primitives/`
- Config: `figma.config.json`
- Figma file: `Forge 3.x Components` (hFu1PYD4Rdihc2E4givJ3j)
- Framework: Web Components (NOT React)
- Parser: HTML
- Prefix: `forge-`
- Pattern: Custom elements with shadow DOM

**File organization:**

- `src/lib/[component]/` - Source code
- `src/stories/components/[component]/` - Storybook examples (CRITICAL)
- `src/figma/primitives/` - Code Connect files
- `figma.config.json` - Aliases and configuration

## Understanding Code Connect for Forge

Forge uses the **file-based Code Connect** approach:

1. **Write `.figma.ts` files** - Define how Figma properties map to component code
2. **Publish to Figma** - Run `npx figma connect publish` to send mappings
3. **Designers see code** - In Figma, designers can view the code examples
4. **Devs get context** - Code examples show proper usage patterns

This is different from runtime mapping - we're creating source documentation that gets published to Figma.

## Additional Resources

- [Figma Code Connect Documentation](https://www.figma.com/developers/code-connect)
- [HTML Code Connect Guide](https://developers.figma.com/docs/code-connect/html/)
- Project README: `src/figma/README.md`

### Example 4: Layout Component with Instance Swaps (forge-scaffold)

**User provides:** `https://figma.com/design/hFu1PYD4Rdihc2E4givJ3j/Forge?node-id=3958-206`

**Actions:**

1. Parse URL, call `get_design_context()`
2. Find: `src/lib/scaffold/scaffold.ts` - layout component with multiple slots
3. Check stories for slot usage patterns
4. **CRITICAL:** Check validation errors to find actual property names
5. Discover properties are named with spaces: "header content", "body-left content", etc.
6. Create file using `figma.instance()` for each slot:

```typescript
figma.connect('<FIGMA_SCAFFOLD_SCAFFOLD>', {
  props: {
    headerContent: figma.instance('header content'),
    bodyLeftContent: figma.instance('body-left content'),
    bodyContent: figma.instance('body content')
  },
  example: (props: any) =>
    html`<forge-scaffold>
      <div slot="header">${props.headerContent}</div>
      <div slot="body-left">${props.bodyLeftContent}</div>
      <div slot="body">${props.bodyContent}</div>
    </forge-scaffold>`
});
```

7. When designers swap in forge-drawer or forge-app-bar instances, Code Connect displays those actual components
8. Output: Nested components are properly captured and displayed

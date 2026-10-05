# INTEGRATION: Tyler Forge + React

**Framework:** React | **Library:** Tyler Forge Web Components | **Type:** Framework Integration Guide

**COMPATIBILITY:** React 19+ supports Custom Elements natively. Earlier versions require the Tyler Forge React adapter.

**QUICK START:** For React 19+, import components directly. For React 18 and below, use `@tylertech/forge-react` adapter.

## BACKGROUND: React + Web Components Integration

**Data Passing Issue:** React doesn't pass complex data (arrays, objects, functions) through the JavaScript API to HTML elements - only string attributes.

**Event Handling Issue:** React's synthetic event system doesn't work with custom element events and standard HTML event bubbling.

## SOLUTION: Tyler Forge React Adapter

To make using Forge with React more seamless, we have created an adapter library that helps with the issues mentioned above.

This adapter library provides a thin wrapper component around all Forge components that allows you to pass data and listen
to events in a more React-friendly way.

## SETUP: Installation

**Install Tyler Forge React adapter:**

```bash
npm install @tylertech/forge-react
```

## USAGE: IMPORTANT!

**Component Naming Convention:**
- Core component: `<forge-button>`
- React wrapper: `<ForgeButton>`
- Pattern: `Forge` + ComponentName (PascalCase)
- Example: `<forge-card>` -> `<ForgeCard>`

ALWAYS make sure that when adding a Forge component to your React app, you are using the React wrapper version of the component.

If a `slot` attribute is present on any elements within a parent `<forge-*>` element, make sure that slot is available on that `<forge-*>` parent element otherwise the content will not render.

## SETUP: Tyler Font Integration

**Add to your `index.html` `<head>` section:**

```html
<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
```

**PURPOSE:** Configures Tyler brand font family and loads required weights/styles.

## USAGE: Component Import Pattern

**Import both React wrapper and component definition:**

```jsx
import { ForgeButton, ForgeCard } from '@tylertech/forge-react';
import { defineButtonComponent, defineCardComponent } from '@tylertech/forge';

// ALWAYS define the components you plan to use
defineButtonComponent();
defineCardComponent();

// Forge component names in React that uses the "wrappers" use the PascalCase naming convention. Ex. <forge-button> -> <ForgeButton>
function App() {
  return (
    <div>
      <ForgeCard>
        <ForgeButton>Click me</ForgeButton>
      </ForgeCard>
    </div>
  );
}
```

## STYLING: CSS Import

**Import Tyler Forge default styles:**

```jsx
import '@tylertech/forge/dist/forge.css';
```

**PURPOSE:** Provides component styling and theme system integration.

---

**INTEGRATION:** Framework and development resources:
- **Other frameworks:** Use `setup_framework` for Angular, Vue, or Svelte integration
- **Usage examples:** Use `get_forge_blocks` with `component={component-name}` for basic HTML structural examples
- **Icons setup:** Use `setup_icons` for Tyler Forge icon system integration with React
- **Installation:** Use `get_usage_guide` with `type=installation` for basic Tyler Forge setup instructions
- **Components:** Use `list_components` or `find_components` to explore available Tyler Forge components
- **Design tokens:** Use `get_design_tokens` for styling and theming integration

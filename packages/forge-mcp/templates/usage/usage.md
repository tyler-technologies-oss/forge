# Tyler Forge Usage Guide

This guide covers the basics of using Tyler Forge web components in your applications.

## Basic Usage

After [installing Tyler Forge](forge://installation), you can use components directly in your HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Tyler Forge Example</title>
  </head>
  <body>
    <!-- Use the <forge-scaffold> component to create a basic layout -->
    <forge-scaffold>
      <!-- Use <forge-app-bar> for the top header -->
      <forge-app-bar slot="header" title-text="My App">
        <forge-app-bar-menu-button slot="start"></forge-app-bar-menu-button>
        <forge-user-profile></forge-user-profile>
      </forge-app-bar>
      
      <!-- The scaffold requires all elements, even the body content to be slotted with a slot attribute. -->
      <main slot="body">
        <forge-card>
          <h2 class="forge-typography--heading4">Card Title</h2>
          <p>Card content goes here.</p>

          <forge-button variant="raised">Primary Button</forge-button>

          <!-- Some forge components use a "decorator" pattern to enhance native child elements -->
          <forge-text-field label="Enter your name">
            <label for="my-input">Name</label>
            <input id="my-input" type="text">
          </forge-text-field>
        </forge-card>
      </main>
  </body>
</html>
```

## Component Properties and Attributes

Tyler Forge components can be configured using HTML attributes and JavaScript properties:

### HTML Attributes

Attributes are used to set initial values and states:

```html
<!-- Configure components using attributes -->
<forge-button variant="raised" disabled>Disabled Button</forge-button>

<!-- Some attributes are required for the <forge-text-field> and some are required for its children -->
<forge-text-field required>
  <label for="my-input">Email</label>
  <input id="my-input" type="email" />
</forge-text-field>
```

### JavaScript Properties

JavaScript properties can be used to get or set values dynamically:

```javascript
// Access component properties via JavaScript
const button = document.querySelector("forge-button");
button.disabled = true;
button.variant = "outlined";

const textField = document.querySelector("forge-text-field");

const label = textField.querySelector("label");
label.textContent = "Your Email Address";

const input = textField.querySelector("input");
input.value = "example@email.com";
```

## Event Handling

Tyler Forge components dispatch standard DOM events:

```javascript
// Listen for button clicks
document.querySelector("forge-button").addEventListener("click", (event) => {
  console.log("Button clicked!", event);
});

// Listen for input changes
document.querySelector("forge-text-field > input").addEventListener("input", (event) => {
  console.log("Input value:", event.target.value);
});

// Listen for custom component events
document.querySelector("forge-autocomplete").addEventListener("forge-autocomplete-change", (event) => {
  console.log("Autocomplete Selection changed:", event.detail);
});
```

- Event names are typically in lowercase and use hyphens. Refer to individual component documentation for specific event names.
- Almost all component-specific events are typically dispatched as a `CustomEvent` with relevant details in the `detail` property.
- Framework-specific event binding syntax may vary. Refer to your framework's documentation for details on how to bind to JavaScript events.

> **Note**: 

## Styling Components

### CSS Classes (CSS-Only Variants)
Some Forge components provide CSS-only variants through CSS classes. These are designed for styling native HTML elements when you need only the visual appearance without component functionality:

```html
<!-- Use CSS classes on native elements for appearance-only styling -->
<button class="forge-button forge-button--raised">Native Button with Forge Styling</button>
<div class="forge-card">
  <h3>Native div with Forge card styling</h3>
  <p>Content styled to match Forge components</p>
</div>
```

**Important**: CSS classes are intended for native HTML elements only. Do not apply these classes to Forge components themselves.

### CSS Custom Properties
Tyler Forge components can be customized using CSS custom properties:

```css
/* Customize component colors */
forge-button {
  --forge-button-primary-background: #007bff;
  --forge-button-primary-color: white;
}

/* Customize spacing and sizing */
forge-text-field {
  --forge-text-field-height: 48px;
  --forge-text-field-border-radius: 8px;
}
```

### CSS Parts
Some components expose CSS shadow parts for more granular styling control:

```css
/* Style specific parts of components */
forge-text-field::part(input) {
  font-family: monospace;
}

forge-button::part(root) {
  border-radius: 20px;
}
```

## Form Integration

Tyler Forge form components work seamlessly with native HTML forms:

```html
<form id="myForm">
  <forge-text-field required>
    <label for="username">Username</label>
    <input type="text" id="username" name="username" />
    <span slot="support-text">Username is required</span>
  </forge-text-field>
  <forge-text-field required>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" />
    <span slot="support-text">Password is required</span>
  </forge-text-field>
  <forge-checkbox name="remember">Remember me</forge-checkbox>
  <forge-button type="submit" variant="raised">Sign In</forge-button>
</form>

<script>
document.getElementById("myForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  console.log(Object.fromEntries(formData));
});
</script>
```

## Accessibility

Tyler Forge components are built with accessibility in mind:

- All interactive components are keyboard navigable
- Screen reader support is built-in
- ARIA attributes are handled automatically
- High contrast mode is supported

```html
<!-- Accessibility features work automatically -->
<forge-button aria-label="Close dialog">×</forge-button>
<forge-text-field>
  <label for="search">Search</label>
  <input type="text" id="search" />
  <span slot="support-text">Enter keywords to search</span>
</forge-text-field>
<div id="search-help">Enter keywords to search</div>
```

## TypeScript Support

Tyler Forge includes TypeScript definitions for better development experience:

```typescript
import type { IButtonComponent, ITextFieldComponent } from "@tylertech/forge";

const button = document.querySelector("forge-button") as IButtonComponent;
const textField = document.querySelector("forge-text-field") as ITextFieldComponent;

// TypeScript will provide autocompletion and type checking
button.disabled = true;
textField.value = "typed value";
```

## Performance Tips

- **Tree Shaking**: Import only the components you need
- **Lazy Loading**: Load components dynamically when needed
- **Bundle Optimization**: Use build tools to optimize component loading

```javascript
// Import only specific components for better bundle size
import "@tylertech/forge/button";
import "@tylertech/forge/text-field";
// Instead of importing everything: import "@tylertech/forge";

// Dynamic imports for code splitting
async function loadDatePicker() {
  await import("@tylertech/forge/date-picker");
  // Date picker is now available
}
```

## Next Steps

- Browse individual component documentation using `forge://component/{component-name}`
- Get HTML usage examples for a component using `get_forge_blocks` with `component={component-name}`
- Check the [Installation Guide](forge://installation) for setup details
- Explore the complete components list at `forge://components`
- Visit the official Tyler Forge documentation for advanced topics
# INTEGRATION: Tyler Forge + Lit

**Framework:** Lit | **Library:** Tyler Forge Web Components | **Type:** Framework Integration Guide

**COMPATIBILITY:** Lit has excellent native support for Custom Elements. Tyler Forge components work seamlessly with Lit applications.

**QUICK START:** Import and use Tyler Forge components directly in your Lit components using standard Custom Element patterns.

## BACKGROUND: Lit + Web Components Integration

**Native Support:** Lit is built on web standards and has first-class support for Custom Elements, making Tyler Forge integration straightforward.

**Property Binding:** Lit's property binding syntax (`.property=`) works perfectly with Tyler Forge component properties.

**Boolean Attributes:** Lit handles boolean attributes correctly, allowing you to set properties like `disabled` or `checked` easily. If you need to bind a boolean attribute conditionally, use the following pattern:
```html
<forge-button ?disabled=${isDisabled}>Click Me</forge-button>
```

**Event Handling:** Lit's event listener syntax (`@event`) integrates seamlessly with Tyler Forge custom events.

## SETUP: Installation

**Install Tyler Forge:**

```bash
npm install @tylertech/forge
```

**Component Usage Pattern:**
- Import component definitions from Tyler Forge
- Use components directly in Lit templates
- No wrapper components needed

## USAGE: Component Import Pattern

**Import component definitions and use in Lit templates:**

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { defineButtonComponent, defineCardComponent } from '@tylertech/forge';

// ALWAYS define the components you plan to use from @tylertech/forge using definition functions
defineButtonComponent();
defineCardComponent();

// ALWAYS register subpath-only components (e.g. busy-indicator) using side-effect imports
import '@tylertech/forge/busy-indicator';

@customElement('my-app')
export class MyApp extends LitElement {
  @property({ type: String }) message = 'Hello, World!';

  render() {
    return html`
      <forge-card>
        <forge-button @click="${this._handleClick}">
          ${this.message}
        </forge-button>
      </forge-card>

      <forge-busy-indicator></forge-busy-indicator>
    `;
  }

  private _handleClick(event: CustomEvent) {
    console.log('Button clicked:', event.detail);
  }
}
```

## USAGE: Property and Event Binding

**Property Binding with Lit syntax:**

```typescript
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { defineTextFieldComponent, defineSwitchComponent } from '@tylertech/forge';

defineTextFieldComponent();
defineSwitchComponent();

@customElement('user-form')
export class UserForm extends LitElement {
  @property({ type: String }) label = 'Username';
  @state() private _disabled = false;
  @state() private _value = '';

  render() {
    return html`
      <forge-text-field>
        <label>Enter your ${this.label}</label>
        <input
          type="text"
          .value=${this._value}
          ?disabled=${this._disabled}
          @input=${(e: Event) => this._value = (e.target as HTMLInputElement).value}>
      </forge-text-field>

      <forge-switch
        .checked=${this._disabled}
        @forge-switch-change=${this._handleToggle}>
        Disable field
      </forge-switch>
    `;
  }

  private _handleInput(event: CustomEvent) {
    this._value = event.detail.value;
  }

  private _handleToggle(event: CustomEvent) {
    this._disabled = event.detail.checked;
  }
}
```

**Component-specific styling with Lit:**

```typescript
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('styled-component')
export class StyledComponent extends LitElement {
  static styles = css`
    forge-button {
      --forge-button-background: var(--forge-theme-primary);
      --forge-button-color: var(--forge-theme-on-primary);
    }

    forge-card {
      margin: 16px;
      max-width: 400px;
    }
  `;

  render() {
    return html`
      <forge-card>
        <forge-button variant="raised">Styled Button</forge-button>
      </forge-card>
    `;
  }
}
```

## ADVANCED: TypeScript Integration

**Type-safe event handling:**

```typescript
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { IButtonComponent, IButtonToggleEventData } from '@tylertech/forge';

@customElement('typed-component')
export class TypedComponent extends LitElement {
  render() {
    return html`
      <forge-button-toggle-group @forge-button-toggle-group-change=${this._handleToggle}>
        <forge-button-toggle value="option1">Option 1</forge-button-toggle>
        <forge-button-toggle value="option2">Option 2</forge-button-toggle>
      </forge-button-toggle-group>
    `;
  }

  private _handleToggle(event: CustomEvent<IButtonToggleEventData>) {
    const isPressed = event.detail.isPressed;
    console.log('Button toggled:', isPressed);
  }
}
```

## BEST PRACTICES

**1. Component Definition:**
- Define Tyler Forge components in your main application entry point
- Only define components you actually use to optimize bundle size

**2. Property Binding:**
- Use Lit's property binding syntax (`.property=`) for complex data
- Use attribute binding for simple string values

**3. Boolean Attributes:**
- Use Lit's boolean attribute syntax (`?attribute=`) for properties like `disabled` or `checked`
- This ensures correct handling of boolean values

**4. Event Handling:**
- Use Lit's `@event` syntax for Tyler Forge custom events
- Type your event handlers for better development experience

**5. Styling:**
- Import Forge CSS at the application level
- Use CSS custom properties for component customization
- Leverage Lit's scoped styling when needed

---

**INTEGRATION:** Framework and development resources:
- **Other frameworks:** Use `setup_framework` for Angular, React, Vue, or Svelte integration
- **Icons setup:** Use `setup_icons` for Tyler Forge icon system integration with Lit
- **Installation:** Use `get_usage_guide` with `type=installation` for basic Tyler Forge setup instructions
- **Components:** Use `list_components` or `find_components` to explore available Tyler Forge components
- **Design tokens:** Use `get_design_tokens` for styling and theming integration
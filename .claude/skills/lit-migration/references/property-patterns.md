# Property Patterns: Exhaustive Guide

This document provides comprehensive examples of property patterns when migrating from legacy components to Lit.

## Table of Contents

1. [Property Type Reference](#property-type-reference)
2. [Reflection Patterns](#reflection-patterns)
3. [Attribute Mapping](#attribute-mapping)
4. [Custom Converters](#custom-converters)
5. [Custom Setters](#custom-setters)
6. [Internal State](#internal-state)
7. [Property Change Handling](#property-change-handling)
8. [Default Values](#default-values)
9. [Optional vs Required](#optional-vs-required)
10. [Complex Types](#complex-types)

## Property Type Reference

### String Properties (Default Type)

**Rule**: DO NOT specify `type: String` - it's Lit's default.

```typescript
// ✅ Correct - Omit type for strings
@property({ reflect: true })
public name = 'default';

// ❌ Wrong - Don't specify type: String
@property({ type: String, reflect: true })
public name = 'default';

// ✅ Non-reflected string
@property({ attribute: false })
public description = '';

// ✅ Optional string
@property({ reflect: true })
public title?: string;

// ✅ With custom attribute name
@property({ attribute: 'display-name', reflect: true })
public displayName = '';
```

### Boolean Properties

**Rule**: MUST specify `type: Boolean` for proper attribute coercion.

```typescript
// ✅ Correct - Specify type: Boolean
@property({ type: Boolean, reflect: true })
public open = false;

@property({ type: Boolean, reflect: true })
public disabled = false;

@property({ type: Boolean, reflect: true })
public readonly = false;

// ✅ Optional boolean
@property({ type: Boolean, reflect: true })
public checked?: boolean;
```

**Attribute Behavior**:

```html
<!-- Presence of attribute = true -->
<my-component open></my-component>
<!-- component.open === true -->

<!-- Absence of attribute = false -->
<my-component></my-component>
<!-- component.open === false -->

<!-- Any non-null value = true -->
<my-component open="false"></my-component>
<!-- component.open === true (string "false" is truthy!) -->
```

### Number Properties

**Rule**: MUST specify `type: Number` for coercion.

```typescript
// ✅ Correct - Specify type: Number
@property({ type: Number, reflect: true })
public progress = 0;

@property({ type: Number, reflect: true })
public min = 0;

@property({ type: Number, reflect: true })
public max = 100;

@property({ type: Number, reflect: true })
public tabIndex = 0;

// ✅ Optional number
@property({ type: Number, reflect: true })
public value?: number;

// ✅ With validation in willUpdate
@property({ type: Number, reflect: true })
public step = 1;

public willUpdate(changedProperties: PropertyValues<this>): void {
  if (changedProperties.has('step')) {
    // Validate step is positive
    if (this.step <= 0) {
      this.step = 1;
    }
  }
}
```

### Object Properties

**Rule**: MUST specify `type: Object`, NEVER reflect.

```typescript
// ✅ Correct - type: Object, no reflection
@property({ type: Object })
public data: UserData | null = null;

@property({ type: Object })
public config: ComponentConfig = { enabled: true };

// ✅ Functions are objects
@property({ attribute: false })
public onClick?: (event: MouseEvent) => void;

@property({ attribute: false })
public urlBuilder?: (name: string, type: string) => string;

// ✅ Element references
@property({ type: Object })
public triggerElement: HTMLElement | null = null;
```

**Note**: Objects cannot be reflected to attributes (no serialization). Always use `attribute: false` or omit `reflect`.

### Array Properties

**Rule**: MUST specify `type: Array`, NEVER reflect.

```typescript
// ✅ Correct - type: Array, no reflection
@property({ type: Array })
public items: string[] = [];

@property({ type: Array })
public options: SelectOption[] = [];

@property({ type: Array })
public selectedIds: number[] = [];
```

## Reflection Patterns

### When to Reflect

Reflect properties to attributes when:

- The property represents visual state (open, disabled, active, etc.)
- External CSS needs to select based on the attribute
- The attribute existed in the legacy component
- Consumers might set via HTML attributes

```typescript
// ✅ Reflect visual/state properties
@property({ type: Boolean, reflect: true })
public open = false; // CSS: [open] { ... }

@property({ type: Boolean, reflect: true })
public disabled = false; // CSS: [disabled] { ... }

@property({ reflect: true })
public theme: Theme = 'primary'; // CSS: [theme="primary"] { ... }

@property({ reflect: true })
public size: Size = 'medium'; // CSS: [size="medium"] { ... }
```

### When NOT to Reflect

Don't reflect when:

- Property is an object, array, or function
- Property is only for internal state
- Property changes frequently (performance)
- Property has no external CSS dependency
- Property contains sensitive data

```typescript
// ✅ Don't reflect objects
@property({ attribute: false })
public data: ComplexData | null = null;

// ✅ Don't reflect functions
@property({ attribute: false })
public validator?: (value: string) => boolean;

// ✅ Don't reflect frequently-changing values
@property({ attribute: false })
public scrollY = 0;

// ✅ Don't reflect internal implementation
@property({ attribute: false })
public internalCache: Map<string, any> = new Map();
```

## Attribute Mapping

### Kebab-Case Attributes

**Rule**: When property name is camelCase and attribute name should be kebab-case, set the `attribute` field.

```typescript
// ✅ Property: panelSelector, Attribute: panel-selector
@property({ attribute: 'panel-selector', reflect: true })
public panelSelector?: string;

// ✅ Property: animationType, Attribute: animation-type
@property({ attribute: 'animation-type', reflect: true })
public animationType: AnimationType = 'default';

// ✅ Property: externalType, Attribute: external-type
@property({ attribute: 'external-type', reflect: true })
public externalType: ExternalType = 'all';

// ✅ Property: titleText, Attribute: title-text
@property({ attribute: 'title-text', reflect: true })
public titleText = '';
```

### Same Name (No Mapping Needed)

When property and attribute have the same name, omit `attribute` field:

```typescript
// ✅ Property: open, Attribute: open (same)
@property({ type: Boolean, reflect: true })
public open = false;

// ✅ Property: theme, Attribute: theme (same)
@property({ reflect: true })
public theme: Theme = 'primary';

// ✅ Property: name, Attribute: name (same)
@property({ reflect: true })
public name?: string;
```

### Attribute from Constants

Use constant for attribute name when defined:

```typescript
// In constants file
export const COMPONENT_CONSTANTS = {
  observedAttributes: {
    ANIMATION_TYPE: 'animation-type',
    EXTERNAL_TYPE: 'external-type'
  }
};

// In component
@property({
  attribute: COMPONENT_CONSTANTS.observedAttributes.ANIMATION_TYPE,
  reflect: true
})
public animationType: AnimationType = 'default';
```

## Custom Converters

### Remove Empty String Attributes

Use when empty strings should remove the attribute:

```typescript
import { removeEmptyAttribute } from '../core/utils/lit-utils.js';

// Empty string removes attribute
@property({
  attribute: 'title-text',
  reflect: true,
  converter: { toAttribute: removeEmptyAttribute }
})
public titleText = '';
```

**Behavior**:

```typescript
component.titleText = 'Hello'; // <component title-text="Hello">
component.titleText = ''; // <component> (no attribute)
```

### Remove Default Value Attributes

Use when default values should not create attributes:

```typescript
import { removeDefaultAttribute } from '../core/utils/lit-utils.js';

@property({
  attribute: 'theme-mode',
  reflect: true,
  converter: {
    toAttribute: (value: ThemeMode) => removeDefaultAttribute(value, 'inherit')
  }
})
public themeMode: ThemeMode = 'inherit';
```

**Behavior**:

```typescript
component.themeMode = 'inherit'; // <component> (no attribute)
component.themeMode = 'scoped'; // <component theme-mode="scoped">
```

### Custom Bi-Directional Converter

For complex types that need serialization:

```typescript
@property({
  reflect: true,
  converter: {
    fromAttribute: (value: string | null): Range | null => {
      if (!value) return null;
      const [min, max] = value.split(',').map(Number);
      return { min, max };
    },
    toAttribute: (value: Range | null): string | null => {
      if (!value) return null;
      return `${value.min},${value.max}`;
    }
  }
})
public range: Range | null = null;
```

**Usage**:

```html
<component range="0,100"></component>
<!-- component.range = { min: 0, max: 100 } -->
```

## Custom Setters

### Property Validation

Use custom setters when you need to validate or transform incoming values:

```typescript
/**
 * The name of the icon (whitespace removed).
 * @attribute
 */
@property({ reflect: true })
public set name(value: string | undefined) {
  if (isDefined(value)) {
    this.#name = value?.replace(/\s+/, ''); // Remove whitespace
  } else {
    this.#name = undefined;
  }
}
public get name(): string | undefined {
  return this.#name;
}
#name?: string;
```

### Property Sanitization

```typescript
/**
 * The external type (sanitized to valid values).
 * @attribute external-type
 */
@property({ attribute: 'external-type', reflect: true })
public set externalType(value: IconExternalType) {
  this.#externalType = sanitizeExternalType(value); // Ensure valid
}
public get externalType(): IconExternalType {
  return this.#externalType;
}
#externalType: IconExternalType = 'all';
```

### Property Coercion

```typescript
/**
 * The step value (coerced to positive number).
 * @attribute
 */
@property({ type: Number, reflect: true })
public set step(value: number) {
  // Ensure positive, default to 1
  this.#step = value > 0 ? value : 1;
}
public get step(): number {
  return this.#step;
}
#step = 1;
```

### Property with Side Effects

<<<<<<< feat/divider-lit
When setter needs to trigger other updates immediately:

=======
**Prefer `willUpdate()` for external side effects** (managing event listeners, resolving target elements, updating state on other objects). Custom setters are appropriate only when you need to validate or transform the stored value itself.

**willUpdate() approach** (preferred for listener management):

```typescript
@property({ type: Boolean, reflect: true })
public disabled = false;

public willUpdate(changedProperties: PropertyValues<this>): void {
  if (changedProperties.has('disabled')) {
    if (this.disabled) {
      this.#disconnect();
    } else {
      this.#connect();
    }
  }
}
```

**Important**: `willUpdate()` is async — tests must `await element.updateComplete` before asserting listener effects after a property change.

**Custom setter approach** (only when you need synchronous value transformation):

> > > > > > > main

```typescript
/**
 * The trigger element id.
 * @attribute
 */
@property({ reflect: true })
public set trigger(value: string) {
  this.#trigger = value;
<<<<<<< feat/divider-lit
  // Immediately resolve trigger element
=======
  // Immediately resolve trigger element (synchronous lookup needed)
>>>>>>> main
  this.triggerElement = value ? document.getElementById(value) : null;
}
public get trigger(): string {
  return this.#trigger;
}
#trigger = '';

@property({ type: Object })
public triggerElement: HTMLElement | null = null;
```

## Internal State

### Reactive Internal State

Use `@state()` for internal reactive state that should trigger re-renders:

```typescript
// ✅ Animation state
@state() private _isAnimating = false;

// ✅ Loading state
@state() private _isLoading = false;

// ✅ Derived computed values
@state() private _computedValue = '';

public willUpdate(changedProperties: PropertyValues<this>): void {
  if (changedProperties.has('prop1') || changedProperties.has('prop2')) {
    this._computedValue = this.prop1 + this.prop2;
  }
}

public render(): TemplateResult {
  return html`
    <div class=${classMap({ 'animating': this._isAnimating })}>
      ${this._computedValue}
    </div>
  `;
}
```

### Non-Reactive Private Fields

Use `#field` for private data that doesn't need to trigger re-renders:

```typescript
// ✅ Event listeners
#clickListener: EventListener = () => this.#handleClick();

// ✅ Timers
#resizeTimer?: number;

// ✅ Observers
#visibilityObserver?: IntersectionObserver;

// ✅ Cached queries (if not using @query)
#cachedElement?: HTMLElement;

// ✅ ElementInternals
#internals: ElementInternals;
```

## Property Change Handling

### Using willUpdate()

**Primary method** for reacting to property changes:

```typescript
public willUpdate(changedProperties: PropertyValues<this>): void {
  // Single property change
  if (changedProperties.has('open')) {
    this.#handleOpen();
  }

  // Multiple related properties
  if (changedProperties.has('min') || changedProperties.has('max')) {
    this.#validateRange();
  }

  // Conditional based on current value
  if (changedProperties.has('value')) {
    if (this.value < this.min) {
      this.value = this.min;
    }
  }

  // Conditional based on old value
  if (changedProperties.has('theme')) {
    const oldTheme = changedProperties.get('theme');
    this.#updateThemeStyles(oldTheme, this.theme);
  }

  // Custom states
  if (changedProperties.has('disabled')) {
    toggleState(this.#internals, 'disabled', this.disabled);
  }
}
```

### Using updated()

**Secondary method** for DOM-dependent logic:

```typescript
public updated(changedProperties: PropertyValues<this>): void {
  // Focus management (needs DOM)
  if (changedProperties.has('open') && this.open) {
    this._contentElement?.focus();
  }

  // Measurements (needs rendered DOM)
  if (changedProperties.has('items')) {
    this.#measureContentHeight();
  }

  // Scroll position (needs rendered DOM)
  if (changedProperties.has('scrollToIndex')) {
    this.#scrollToIndex(this.scrollToIndex);
  }
}

@query('.content') private _contentElement?: HTMLElement;

#measureContentHeight(): void {
  const height = this._contentElement?.offsetHeight ?? 0;
  // Use measurement
}
```

### Avoiding Infinite Loops

**Problem**: Setting properties in `willUpdate()` or `updated()` can cause infinite loops.

```typescript
// ❌ Wrong - Infinite loop!
public willUpdate(changedProperties: PropertyValues<this>): void {
  this.derivedValue = this.value * 2; // Triggers another update!
}

// ✅ Correct - Use internal state
@state() private _derivedValue = 0;

public willUpdate(changedProperties: PropertyValues<this>): void {
  if (changedProperties.has('value')) {
    this._derivedValue = this.value * 2; // OK - internal state
  }
}

// ✅ Or guard against redundant updates
@property({ type: Number }) public derivedValue = 0;

public willUpdate(changedProperties: PropertyValues<this>): void {
  if (changedProperties.has('value')) {
    const newDerived = this.value * 2;
    if (this.derivedValue !== newDerived) { // Guard!
      this.derivedValue = newDerived;
    }
  }
}
```

## Default Values

### Primitive Defaults

```typescript
// String
@property({ reflect: true })
public variant: Variant = 'default';

// Boolean
@property({ type: Boolean, reflect: true })
public disabled = false;

// Number
@property({ type: Number, reflect: true })
public tabIndex = 0;
```

### Object/Array Defaults

```typescript
// Object - default null
@property({ type: Object })
public config: Config | null = null;

// Object - default value
@property({ type: Object })
public options: Options = { enabled: true, timeout: 5000 };

// Array - default empty
@property({ type: Array })
public items: Item[] = [];

// Array - default with values
@property({ type: Array })
public selectedIndices: number[] = [0];
```

### No Default (Undefined)

```typescript
// Optional string
@property({ reflect: true })
public title?: string;

// Optional number
@property({ type: Number, reflect: true })
public max?: number;

// Optional object
@property({ type: Object })
public customValidator?: (value: string) => boolean;
```

## Optional vs Required

### Optional Properties

Use `?` when property may be unset:

```typescript
@property({ reflect: true })
public title?: string;

@property({ reflect: true })
public description?: string;

@property({ type: Number })
public maxLength?: number;
```

### Required Properties with Defaults

Omit `?` when property always has a value:

```typescript
@property({ type: Boolean, reflect: true })
public disabled = false; // Always boolean, never undefined

@property({ reflect: true })
public variant: Variant = 'default'; // Always has variant, never undefined

@property({ type: Number, reflect: true })
public value = 0; // Always number, never undefined
```

## Complex Types

### Union Types

```typescript
type Size = 'small' | 'medium' | 'large';
type Theme = 'light' | 'dark' | 'auto';

@property({ reflect: true })
public size: Size = 'medium';

@property({ reflect: true })
public theme: Theme = 'auto';
```

### Enum Types

```typescript
export enum ButtonVariant {
  Text = 'text',
  Outlined = 'outlined',
  Filled = 'filled'
}

@property({ reflect: true })
public variant: ButtonVariant = ButtonVariant.Filled;
```

### Interface Types

```typescript
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@property({ type: Array })
public options: SelectOption[] = [];
```

### Nullable Types

```typescript
@property({ type: Object })
public data: UserData | null = null;

@property({ type: Object })
public triggerElement: HTMLElement | null = null;

@property({ reflect: true })
public selectedId: string | null = null;
```

## Common Patterns Summary

| Pattern                  | Decorator Example                                          |
| ------------------------ | ---------------------------------------------------------- |
| Simple string            | `@property({ reflect: true })`                             |
| String, custom attribute | `@property({ attribute: 'my-attr', reflect: true })`       |
| Boolean                  | `@property({ type: Boolean, reflect: true })`              |
| Number                   | `@property({ type: Number, reflect: true })`               |
| Object                   | `@property({ type: Object })`                              |
| Array                    | `@property({ type: Array })`                               |
| Function                 | `@property({ attribute: false })`                          |
| Internal state           | `@state() private _value`                                  |
| Private field            | `#field` (no decorator)                                    |
| With converter           | `@property({ converter: { toAttribute: fn } })`            |
| With custom setter       | Custom getter/setter + `#field`                            |
| Optional                 | `@property({ reflect: true }) public prop?: Type`          |
| Required with default    | `@property({ reflect: true }) public prop: Type = default` |

# Architecture Comparison: Legacy vs. Lit

This document provides a deep comparison between the legacy component/core/adapter/template pattern and the modern Lit-based architecture.

## Overview

### Legacy Architecture (Component/Core/Adapter/Template)

**Philosophy**: Separation of concerns through dedicated classes for each responsibility.

**File Structure**:
```
component-name/
├── component-name.ts              # Host element, decorator, property delegates
├── component-name-core.ts         # Business logic, state management
├── component-name-adapter.ts      # DOM queries, manipulation, events
├── component-name.html            # HTML template string
├── component-name.scss            # Styles
├── component-name-constants.ts    # Constants, types, enums
└── index.ts                       # Exports
```

**Data Flow**:
```
User Interaction
    ↓
Host Element (component.ts)
    ↓
Core (business logic)
    ↓
Adapter (DOM manipulation)
    ↓
Template/DOM Updates
```

### Lit Architecture

**Philosophy**: Reactive, declarative component with lifecycle-driven updates.

**File Structure**:
```
component-name/
├── component-name.ts              # Everything: class, logic, template
├── component-name.scss            # Styles (unchanged)
├── component-name-constants.ts    # Constants (unchanged)
└── index.ts                       # Exports with deprecations
```

**Data Flow**:
```
User Interaction / Property Change
    ↓
Lit Reactive System
    ↓
willUpdate() - Property change handling
    ↓
render() - Template generation
    ↓
updated() - Post-render DOM access
    ↓
DOM Updates (automatic)
```

## Detailed Comparison

### Component Definition

#### Legacy

```typescript
import { attachShadowTemplate, coreProperty, customElement } from '@tylertech/forge-core';
import { BaseComponent } from '../core/base/base-component.js';
import { ComponentCore } from './component-core.js';
import { ComponentAdapter } from './component-adapter.js';
import template from './component.html';
import styles from './component.scss';
import { COMPONENT_CONSTANTS } from './component-constants.js';

@customElement({
  name: COMPONENT_CONSTANTS.elementName,
  dependencies: [DependencyComponent]
})
export class ComponentNameComponent extends BaseComponent {
  public static get observedAttributes(): string[] {
    return Object.values(COMPONENT_CONSTANTS.observedAttributes);
  }

  private _core: ComponentCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new ComponentCore(new ComponentAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case COMPONENT_CONSTANTS.attributes.PROPERTY_NAME:
        this.propertyName = coerceBoolean(newValue);
        break;
    }
  }

  @coreProperty()
  declare public propertyName: string;
}
```

**Characteristics**:
- Decorator takes object with `name` and `dependencies`
- Manual `observedAttributes` array
- Manual `attributeChangedCallback` with switch statement
- Manual coercion of attribute values
- Delegates properties to core via `@coreProperty()`
- Instantiates core and adapter in constructor
- Calls `core.initialize()` and `core.destroy()`

#### Lit

```typescript
import { CUSTOM_ELEMENT_NAME_PROPERTY, CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY } from '@tylertech/forge-core';
import { customElement, property } from 'lit/decorators.js';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { COMPONENT_CONSTANTS } from './component-constants.js';
import styles from './component.scss';

@customElement(COMPONENT_CONSTANTS.elementName)
export class ComponentNameComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = COMPONENT_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [DependencyComponent];

  /**
   * The property description.
   * @attribute property-name
   */
  @property({ type: Boolean, reflect: true })
  public propertyName = false;

  public connectedCallback(): void {
    super.connectedCallback();
    // Setup that needs DOM
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    // Cleanup
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('propertyName')) {
      this.#handlePropertyChange();
    }
  }

  public render(): TemplateResult {
    return html`<div class="root"><slot></slot></div>`;
  }

  #handlePropertyChange(): void {
    // Logic that was in core/adapter
  }
}
```

**Characteristics**:
- Decorator takes simple string (element name)
- No `observedAttributes` - Lit handles automatically
- No `attributeChangedCallback` - Lit handles coercion automatically
- Properties use `@property()` decorator with configuration
- No core/adapter - all logic in component
- Reactive updates via `willUpdate()`
- Declarative template via `render()`

### Property Management

#### Legacy (Component + Core)

**In component.ts**:
```typescript
@coreProperty()
declare public open: boolean;

@coreProperty()
declare public value: string;
```

**In component-core.ts**:
```typescript
export class ComponentCore {
  private _open = false;
  private _value = '';

  public get open(): boolean {
    return this._open;
  }

  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      this._open = value;
      this._adapter.setOpen(value);  // Update DOM
      this._adapter.toggleHostAttribute('open', value);  // Sync attribute
    }
  }

  public get value(): string {
    return this._value;
  }

  public set value(newValue: string) {
    if (this._value !== newValue) {
      this._value = newValue;
      this._adapter.setValue(newValue);  // Update DOM
      this._adapter.setHostAttribute('value', newValue);  // Sync attribute
    }
  }
}
```

**Data Flow**:
1. Component property setter called (via `@coreProperty()` delegate)
2. Core getter/setter handles logic
3. Core calls adapter methods to update DOM
4. Adapter manipulates shadow DOM elements
5. Adapter syncs host attribute

**Complexity**: High - 3 files, multiple indirections

#### Lit

```typescript
/**
 * Whether the component is open.
 * @default false
 * @attribute
 */
@property({ type: Boolean, reflect: true })
public open = false;

/**
 * The current value.
 * @attribute
 */
@property({ reflect: true })
public value = '';

public willUpdate(changedProperties: PropertyValues<this>): void {
  if (changedProperties.has('open')) {
    this.#handleOpenChange();
  }
  if (changedProperties.has('value')) {
    this.#handleValueChange();
  }
}

#handleOpenChange(): void {
  // Logic that was in core setter and adapter
  toggleState(this.#internals, 'open', this.open);
}

#handleValueChange(): void {
  // Logic that was in core setter and adapter
  this.#internals.setFormValue(this.value);
}
```

**Data Flow**:
1. Property setter called (Lit-generated)
2. Lit schedules update
3. `willUpdate()` called with changed properties
4. Logic methods handle changes
5. `render()` generates new template with updated values
6. Lit updates DOM automatically
7. Attribute synced automatically (if `reflect: true`)

**Complexity**: Low - Single file, clear lifecycle

### Template & Rendering

#### Legacy

**component.html**:
```html
<template>
  <div class="forge-component" part="root">
    <div class="header" part="header">
      <slot name="header"></slot>
    </div>
    <div class="content" part="content">
      <slot></slot>
    </div>
  </div>
</template>
```

**Attached in constructor**:
```typescript
constructor() {
  super();
  attachShadowTemplate(this, template, styles);
}
```

**Dynamic updates via adapter**:
```typescript
// In adapter
public setOpen(value: boolean): void {
  this._rootElement.classList.toggle('open', value);
}

public setValue(value: string): void {
  this._inputElement.value = value;
}

public addContent(html: string): void {
  this._contentElement.insertAdjacentHTML('beforeend', html);
}
```

**Characteristics**:
- Static HTML template
- Imperative DOM updates via adapter
- Requires caching elements in adapter
- Manual class toggling
- Manual content insertion/removal

#### Lit

```typescript
public render(): TemplateResult {
  return html`
    <div class=${classMap({
      'forge-component': true,
      'open': this.open
    })} part="root">
      <div class="header" part="header">
        <slot name="header"></slot>
      </div>
      <div class="content" part="content">
        <slot></slot>
        ${this.value ? html`<span>${this.value}</span>` : nothing}
      </div>
    </div>
  `;
}
```

**Characteristics**:
- Dynamic template regenerated on each update
- Declarative - what to render, not how
- Automatic DOM updates (Lit's efficient diffing)
- Conditional rendering with `${expression}`
- No manual class toggling needed
- No element caching needed

### DOM Access & Manipulation

#### Legacy (Adapter)

```typescript
export class ComponentAdapter extends BaseAdapter<IComponent> {
  private _rootElement: HTMLElement;
  private _headerElement: HTMLElement;
  private _contentElement: HTMLElement;
  private _items: HTMLElement[];

  constructor(component: IComponent) {
    super(component);
    // Cache all elements in constructor
    this._rootElement = getShadowElement(component, '.forge-component');
    this._headerElement = getShadowElement(component, '.header');
    this._contentElement = getShadowElement(component, '.content');
  }

  public initialize(): void {
    this._items = Array.from(this._component.shadowRoot!.querySelectorAll('.item'));
  }

  public addClass(className: string): void {
    this._rootElement.classList.add(className);
  }

  public setHeaderText(text: string): void {
    this._headerElement.textContent = text;
  }

  public updateItems(): void {
    this._items = Array.from(this._component.shadowRoot!.querySelectorAll('.item'));
    this._items.forEach((item, index) => {
      item.textContent = `Item ${index}`;
    });
  }
}
```

**Characteristics**:
- Element caching in constructor and initialize()
- Manual queries using `getShadowElement()`
- Manual DOM manipulation methods
- Risk of stale references when DOM changes

#### Lit

```typescript
@query('.forge-component') private _rootElement!: HTMLElement;
@query('.header') private _headerElement!: HTMLElement;
@query('.content') private _contentElement!: HTMLElement;
@queryAll('.item') private _items!: NodeListOf<HTMLElement>;

public render(): TemplateResult {
  return html`
    <div class="forge-component">
      <div class="header">${this.headerText}</div>
      <div class="content">
        ${this.items.map((item, index) => html`
          <div class="item">Item ${index}</div>
        `)}
      </div>
    </div>
  `;
}

public updated(changedProperties: PropertyValues<this>): void {
  // Access queried elements here if needed for imperative work
  if (changedProperties.has('someProperty')) {
    this._rootElement.focus();
  }
}
```

**Characteristics**:
- Queries are automatic, no manual caching needed
- Queries only available after render (in `updated()`)
- Most DOM updates are declarative (in `render()`)
- Imperative access only when needed (focus, measurements, etc.)
- No stale references - queries update automatically

### Event Handling

#### Legacy (Core + Adapter)

**In core**:
```typescript
export class ComponentCore {
  private _clickListener: EventListener = (evt: Event) => this._onClick(evt);
  private _keydownListener: EventListener = (evt: KeyboardEvent) => this._onKeyDown(evt);

  public initialize(): void {
    this._adapter.addHostListener('click', this._clickListener);
    this._adapter.addHostListener('keydown', this._keydownListener);
  }

  public destroy(): void {
    this._adapter.removeHostListener('click', this._clickListener);
    this._adapter.removeHostListener('keydown', this._keydownListener);
  }

  private _onClick(evt: Event): void {
    // Handle click
    this._adapter.emitHostEvent('component-click', { detail: this._value });
  }

  private _onKeyDown(evt: KeyboardEvent): void {
    // Handle keydown
  }
}
```

**In adapter**:
```typescript
export class ComponentAdapter extends BaseAdapter {
  public addHostListener(event: string, callback: EventListener): void {
    this._component.addEventListener(event, callback);
  }

  public removeHostListener(event: string, callback: EventListener): void {
    this._component.removeEventListener(event, callback);
  }

  public emitHostEvent(type: string, detail: any): void {
    const evt = new CustomEvent(type, { detail, bubbles: true, composed: true });
    this._component.dispatchEvent(evt);
  }
}
```

#### Lit

```typescript
#clickListener: EventListener = (evt: Event) => this.#onClick(evt);

public connectedCallback(): void {
  super.connectedCallback();
  this.addEventListener('click', this.#clickListener);
  this.addEventListener('keydown', this.#onKeyDown);
}

public disconnectedCallback(): void {
  super.disconnectedCallback();
  this.removeEventListener('click', this.#clickListener);
  this.removeEventListener('keydown', this.#onKeyDown);
}

#onClick(evt: Event): void {
  // Handle click
  this.dispatchEvent(new CustomEvent('component-click', {
    detail: this.value,
    bubbles: true,
    composed: true
  }));
}

#onKeyDown = (evt: KeyboardEvent): void => {
  // Handle keydown
};

// Or in template
public render(): TemplateResult {
  return html`
    <button @click="${this.#onClick}">Click me</button>
  `;
}
```

**Characteristics**:
- Direct event handling, no adapter indirection
- Template event binding with `@event`
- Clear setup/teardown in callbacks
- Direct dispatch, no adapter wrapper needed

### State Management

#### Legacy (Core)

```typescript
export class ComponentCore {
  private _isOpen = false;
  private _isAnimating = false;
  private _currentValue = '';
  private _items: Item[] = [];

  public set isOpen(value: boolean) {
    if (this._isOpen !== value) {
      this._isOpen = value;
      this._adapter.setOpen(value);
      this._adapter.toggleHostAttribute('open', value);
      this._updateState();
    }
  }

  private _updateState(): void {
    if (this._isOpen && !this._isAnimating) {
      this._startAnimation();
    }
  }

  private _startAnimation(): void {
    this._isAnimating = true;
    this._adapter.addClass('animating');
    // ... animation logic
  }
}
```

**Characteristics**:
- Private state in core
- Manual change detection (`if (this._value !== newValue)`)
- Manual cascade of state updates
- State changes trigger adapter calls

#### Lit

```typescript
/**
 * Whether the component is open.
 * @attribute
 */
@property({ type: Boolean, reflect: true })
public isOpen = false;

@state() private _isAnimating = false;
@state() private _currentValue = '';
@state() private _items: Item[] = [];

public willUpdate(changedProperties: PropertyValues<this>): void {
  // Lit already detected changes, just react
  if (changedProperties.has('isOpen')) {
    if (this.isOpen && !this._isAnimating) {
      this.#startAnimation();
    }
  }
}

#startAnimation(): void {
  this._isAnimating = true; // Triggers re-render automatically
  // ... animation logic
}

public render(): TemplateResult {
  return html`
    <div class=${classMap({ 'animating': this._isAnimating })}>
      ${this._items.map(item => this.#renderItem(item))}
    </div>
  `;
}
```

**Characteristics**:
- Public state with `@property()`, internal with `@state()`
- Automatic change detection (Lit's responsibility)
- Reactive updates - setting `@state()` triggers re-render
- Declarative rendering based on current state

### Lifecycle

#### Legacy

```
constructor()
    ↓
connectedCallback() → core.initialize() → adapter.initialize()
    ↓
attributeChangedCallback() → property setter → core setter → adapter methods
    ↓
[Property changes] → core setter → adapter methods → DOM updates
    ↓
disconnectedCallback() → core.destroy()
```

#### Lit

```
constructor()
    ↓
connectedCallback()
    ↓
willUpdate(changedProperties) - React to property changes
    ↓
render() - Generate template
    ↓
firstUpdated() - First render complete (one-time)
    ↓
updated(changedProperties) - After every render
    ↓
[Property changes] → Lit schedules update → willUpdate() → render() → updated()
    ↓
disconnectedCallback()
```

## When to Use Each Approach

### Legacy Pattern Is Better When:

- **Never** - This pattern is deprecated and being phased out

### Lit Pattern Is Better When:

- **Always** - For all new components and migrations
- Specifically excellent for:
  - Reactive, data-driven UIs
  - Components with frequent property changes
  - Components with complex conditional rendering
  - Components that need efficient re-rendering
  - Modern web component development

## Migration Benefits

1. **Code Reduction**: Typically 30-50% fewer lines of code
2. **Simplicity**: Single file instead of 4+ files
3. **Performance**: Lit's efficient diffing and rendering
4. **Maintainability**: Clear, linear code flow
5. **Modern Features**: Better TypeScript support, better tooling
6. **Declarative**: Easier to reason about what renders
7. **Ecosystem**: Access to Lit's directive ecosystem

## Migration Challenges

1. **Learning Curve**: New lifecycle, new patterns
2. **Testing**: May need test updates (usually minimal)
3. **Timing**: Lit updates are async (use `await element.updateComplete`)
4. **Imperative → Declarative**: Mental shift from "how" to "what"

## Conclusion

The Lit architecture is simpler, more maintainable, and more performant than the legacy pattern. While migration requires effort, the long-term benefits far outweigh the costs.

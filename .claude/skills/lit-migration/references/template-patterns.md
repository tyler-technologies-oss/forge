# Template Patterns

This document covers all template transformation patterns when migrating from legacy HTML templates to Lit's `html` tagged templates.

## Basic Conversion

### Static HTML

**Legacy** (`component.html`):
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

**Lit**:
```typescript
public render(): TemplateResult {
  return html`
    <div class="forge-component" part="root">
      <div class="header" part="header">
        <slot name="header"></slot>
      </div>
      <div class="content" part="content">
        <slot></slot>
      </div>
    </div>
  `;
}
```

## Conditional Rendering

### Simple Conditional

```typescript
import { html, nothing } from 'lit';

// Show/hide single element
${this.showTitle ? html`<h1>${this.title}</h1>` : nothing}

// Conditional content
${this.titleText ? html`<div class="title">${this.titleText}</div>` : nothing}
```

### Conditional with Helper Method

```typescript
public render(): TemplateResult {
  return html`
    <div class="root">
      ${this.titleText ? this.#renderTitle() : nothing}
    </div>
  `;
}

#renderTitle(): TemplateResult {
  return html`<h1 class="title" part="title">${this.titleText}</h1>`;
}
```

### Multiple Conditions

```typescript
public render(): TemplateResult {
  return html`
    <div class="root">
      ${this.#renderContent()}
    </div>
  `;
}

#renderContent(): TemplateResult | typeof nothing {
  if (this.loading) {
    return html`<div class="spinner">Loading...</div>`;
  }
  if (this.error) {
    return html`<div class="error">${this.error}</div>`;
  }
  if (this.data) {
    return html`<div class="data">${this.data}</div>`;
  }
  return nothing;
}
```

## Dynamic Classes

### Using classMap

```typescript
import { classMap } from 'lit-html/directives/class-map.js';

public render(): TemplateResult {
  return html`
    <div class=${classMap({
      'forge-component': true,
      'open': this.open,
      'disabled': this.disabled,
      'active': this.active,
      'animating': this._isAnimating
    })} part="root">
      <slot></slot>
    </div>
  `;
}
```

### Static + Dynamic Classes

```typescript
// Combine static and dynamic classes
<div class="static-class ${classMap({ 'dynamic': this.condition })}">
```

## Dynamic Styles

### Using styleMap

```typescript
import { styleMap } from 'lit-html/directives/style-map.js';

public render(): TemplateResult {
  return html`
    <div style=${styleMap({
      width: `${this.width}px`,
      height: `${this.height}px`,
      opacity: this.visible ? '1' : '0'
    })}>
      Content
    </div>
  `;
}
```

## List Rendering

### Array Map

```typescript
public render(): TemplateResult {
  return html`
    <ul>
      ${this.items.map(item => html`
        <li>${item.name}</li>
      `)}
    </ul>
  `;
}
```

### Array Map with Index

```typescript
${this.items.map((item, index) => html`
  <div class="item" data-index="${index}">
    ${index + 1}. ${item.name}
  </div>
`)}
```

### Array with Key (repeat directive)

For efficient updates when items change:

```typescript
import { repeat } from 'lit-html/directives/repeat.js';

${repeat(
  this.items,
  (item) => item.id,  // Key function
  (item, index) => html`<div>${item.name}</div>`
)}
```

## Event Handlers

### Simple Event Handler

```typescript
public render(): TemplateResult {
  return html`
    <button @click="${this.#handleClick}">Click me</button>
  `;
}

#handleClick(evt: MouseEvent): void {
  // Handle click
}
```

### Event with Options

```typescript
// Capture phase
<button @click="${{ handleEvent: this.#handleClick, capture: true }}">

// Passive listener
<div @scroll="${{ handleEvent: this.#handleScroll, passive: true }}">

// Once
<button @click="${{ handleEvent: this.#handleClick, once: true }}">
```

### Multiple Events

```typescript
<input
  @input="${this.#handleInput}"
  @change="${this.#handleChange}"
  @focus="${this.#handleFocus}"
  @blur="${this.#handleBlur}"
>
```

## Attribute Binding

### String Attributes

```typescript
<img src="${this.imageSrc}" alt="${this.imageAlt}">
<a href="${this.href}" target="${this.target}">Link</a>
<div id="${this.elementId}" role="${this.role}">
```

### Boolean Attributes

Use `?` prefix for boolean attributes:

```typescript
<button ?disabled="${this.disabled}">Button</button>
<input ?readonly="${this.readonly}" ?required="${this.required}">
<video ?controls="${this.showControls}" ?autoplay="${this.autoplay}">
```

### Property Binding

Use `.` prefix to set properties instead of attributes:

```typescript
<input .value="${this.currentValue}">
<my-component .data="${this.complexObject}">
```

## Slot Management

### Basic Slots

```typescript
public render(): TemplateResult {
  return html`
    <div class="root">
      <slot name="header"></slot>
      <slot></slot>  <!-- Default slot -->
      <slot name="footer"></slot>
    </div>
  `;
}
```

### Hide When Slot Empty

```typescript
import { hideWhenEmpty, createHideRef } from '../core/utils/lit-utils.js';

#centerSlotHideRef = createHideRef();

public render(): TemplateResult {
  return html`
    <div class="center" ${hideWhenEmpty(this.#centerSlotHideRef)}>
      <slot name="center"></slot>
    </div>
  `;
}

// In willUpdate, check if hidden
public willUpdate(changedProperties: PropertyValues<this>): void {
  if (this.#centerSlotHideRef.hidden) {
    // Slot is empty
  }
}
```

### Query Slotted Elements

```typescript
@queryAssignedElements() private _slottedElements!: HTMLElement[];
@queryAssignedElements({ slot: 'header' }) private _headerElements!: HTMLElement[];

public updated(): void {
  // Access slotted elements
  console.log(this._slottedElements.length);
}
```

## Directives

### ifDefined

Only set attribute if value is defined:

```typescript
import { ifDefined } from 'lit-html/directives/if-defined.js';

<div class="${ifDefined(this.className)}">
<img src="${ifDefined(this.src)}">
```

### cache

Cache rendered templates for efficient switching:

```typescript
import { cache } from 'lit-html/directives/cache.js';

${cache(this.view === 'list' ? this.#renderList() : this.#renderGrid())}
```

### live

Ensure property binding updates even if value hasn't changed (for inputs):

```typescript
import { live } from 'lit-html/directives/live.js';

<input .value="${live(this.value)}">
```

### unsafeHTML

Render HTML strings (use with caution, XSS risk!):

```typescript
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

${unsafeHTML(this.htmlContent)}
```

### unsafeSVG

Render SVG strings:

```typescript
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js';

<svg>${unsafeSVG(this.svgContent)}</svg>
```

## Template Refs (Queries)

### Query Single Element

```typescript
@query('.root') private _rootElement!: HTMLElement;
@query('button') private _button!: HTMLButtonElement;

public updated(): void {
  this._rootElement.focus();
}
```

### Query All Elements

```typescript
@queryAll('.item') private _items!: NodeListOf<HTMLElement>;

public updated(): void {
  this._items.forEach(item => {
    // Process each item
  });
}
```

### Query with Caching

```typescript
@query('.content', true) private _cachedContent!: HTMLElement;
// Second parameter `true` caches the query result
```

## Shadow DOM vs Light DOM

### Shadow DOM (Default)

```typescript
public static styles = unsafeCSS(styles);

public render(): TemplateResult {
  return html`
    <div class="root">
      <slot></slot>
    </div>
  `;
}
// Renders into shadow root automatically
```

### Light DOM (Override)

```typescript
public override createRenderRoot(): HTMLElement | DocumentFragment {
  return this; // Render into light DOM
}

// No render() method needed for light DOM, or optionally:
public render(): TemplateResult {
  return html`<slot></slot>`;
}
```

## Parts for Theming

### Export Parts

```typescript
<div part="root">
  <span part="label">${this.label}</span>
  <forge-focus-indicator part="focus-indicator"></forge-focus-indicator>
</div>
```

### Forward Parts

```typescript
<forge-button exportparts="surface:button-surface"></forge-button>
```

## Complex Examples

### Accordion with Dynamic Content

```typescript
public render(): TemplateResult {
  return html`
    <div class="accordion">
      ${this.sections.map(section => html`
        <div class=${classMap({
          'section': true,
          'open': section.open
        })}>
          <button
            @click="${() => this.#toggleSection(section.id)}"
            ?aria-expanded="${section.open}"
          >
            ${section.title}
          </button>
          ${section.open ? html`
            <div class="content">
              ${unsafeHTML(section.content)}
            </div>
          ` : nothing}
        </div>
      `)}
    </div>
  `;
}
```

### Data Table

```typescript
public render(): TemplateResult {
  return html`
    <table>
      <thead>
        <tr>
          ${this.columns.map(col => html`<th>${col.label}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${this.rows.map(row => html`
          <tr @click="${() => this.#selectRow(row.id)}">
            ${this.columns.map(col => html`
              <td>${row[col.key]}</td>
            `)}
          </tr>
        `)}
      </tbody>
    </table>
  `;
}
```

### Form with Validation

```typescript
public render(): TemplateResult {
  return html`
    <form @submit="${this.#handleSubmit}">
      ${this.fields.map(field => html`
        <div class="field">
          <label for="${field.id}">${field.label}</label>
          <input
            id="${field.id}"
            .value="${live(field.value)}"
            @input="${(e: InputEvent) => this.#updateField(field.id, e)}"
            ?required="${field.required}"
            ?disabled="${this.disabled}"
          >
          ${field.error ? html`
            <span class="error">${field.error}</span>
          ` : nothing}
        </div>
      `)}
      <button type="submit" ?disabled="${!this.valid}">Submit</button>
    </form>
  `;
}
```

## Best Practices

1. **Extract complex sections**: Use private `#render*()` methods for clarity
2. **Use directives**: Leverage Lit's directive ecosystem for common patterns
3. **Cache expensive renders**: Use `cache` directive for views that switch
4. **Use `nothing`**: Instead of empty strings or null for conditional content
5. **Property binding for objects**: Use `.property="${value}"` for objects
6. **Boolean attributes**: Use `?attribute="${bool}"` for boolean attributes
7. **Event delegation**: For lists, consider event delegation on parent
8. **Avoid inline arrow functions**: Define handler methods to avoid recreating functions

## Common Mistakes

### ❌ Wrong: Template Strings Instead of html``

```typescript
// Wrong
public render() {
  return `<div>${this.value}</div>`; // Plain string, not Lit template
}

// Correct
public render(): TemplateResult {
  return html`<div>${this.value}</div>`;
}
```

### ❌ Wrong: Missing Quotes on Attributes

```typescript
// Wrong
<div class=${this.className}>  // Missing quotes

// Correct
<div class="${this.className}">
```

### ❌ Wrong: Using setAttribute in render()

```typescript
// Wrong
public render(): TemplateResult {
  const div = document.createElement('div');
  div.setAttribute('class', 'foo'); // Don't manipulate DOM in render
  return html`${div}`;
}

// Correct
public render(): TemplateResult {
  return html`<div class="foo"></div>`;
}
```

### ❌ Wrong: Accessing @query in willUpdate()

```typescript
// Wrong
@query('.root') private _root!: HTMLElement;

public willUpdate(): void {
  this._root.classList.add('active'); // Undefined! Not rendered yet
}

// Correct
public updated(): void {
  this._root.classList.add('active'); // Available after render
}
```

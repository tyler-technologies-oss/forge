---
name: lit-migration
description: This skill should be used when the user asks to "migrate component to lit", "convert to lit", "lit migration", "migrate to litElement", "convert component to Lit", or discusses migrating Tyler Forge components from the legacy component/core/adapter/template architecture to Lit-based components.
---

# Lit Component Migration

Migrate Tyler Forge components from the legacy component/core/adapter/template architecture to modern Lit-based components.

## When to Use

- Migrating components from the legacy 4-file pattern (component/core/adapter/template)
- Converting components extending `BaseComponent` to `BaseLitElement`
- Modernizing components to use Lit's reactive property system
- Simplifying component architecture while maintaining backward compatibility

## Migration Workflow

### Phase 1: Analysis & Setup

**Goal**: Understand the component and identify migration complexity.

1. **Read all legacy files** to understand:
   - Component structure and inheritance chain
   - Properties, their types, reflection behavior, and attribute mappings
   - Event listeners and custom events
   - DOM manipulation patterns in adapter
   - Business logic in core
   - Template structure
   - Form association or ARIA requirements
   - Complexity level (simple/moderate/complex)

2. **Identify migration patterns** by reviewing similar migrated components:
   - Simple light DOM: `packages/forge/src/lib/accordion/accordion.ts` (branch: `feat/accordion-lit`)
   - Complex with shadow DOM: `feat/expansion-panel-lit` branch
   - With custom setters: `packages/forge/src/lib/icon/icon.ts` (branch: `feat/icon-lit`)

3. **Create migration branch**:
   ```bash
   git checkout -b feat/[component-name]-lit
   ```

### Phase 2: File Structure Migration

**Goal**: Set up new file structure and delete legacy files.

1. **Ensure clean git state** - commit or stash any changes first

2. **Delete legacy files**:
   - `component-adapter.ts`
   - `component-core.ts`
   - `component.html` (if exists)

3. **Keep these files** (modified in later phases):
   - `component.ts` - Will be completely rewritten
   - `component-constants.ts` - Minor updates only
   - `component.scss` - Usually unchanged
   - `index.ts` - Add deprecations

### Phase 3: Component Class Migration

**Goal**: Transform component class to extend BaseLitElement.

#### 1. Update Imports

**Remove**:
```typescript
import { attachShadowTemplate, coerceBoolean, coreProperty, customElement } from '@tylertech/forge-core';
import { BaseComponent } from '../core/base/base-component.js';
import { ComponentCore } from './component-core.js';
import { ComponentAdapter } from './component-adapter.js';
import template from './component.html';
import styles from './component.scss';
```

**Add**:
```typescript
import { CUSTOM_ELEMENT_NAME_PROPERTY, CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY } from '@tylertech/forge-core';
import { customElement, property, state, query } from 'lit/decorators.js';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import styles from './component.scss';
```

Add as needed:
```typescript
// For dynamic classes
import { classMap } from 'lit-html/directives/class-map.js';

// For ElementInternals
import { toggleState, setDefaultAria } from '../core/index.js';

// For converters
import { removeEmptyAttribute, removeDefaultAttribute } from '../core/utils/lit-utils.js';
```

#### 2. Update Class Declaration

**Before**:
```typescript
@customElement({
  name: COMPONENT_CONSTANTS.elementName,
  dependencies: [DependencyComponent]
})
export class ComponentNameComponent extends BaseComponent implements IComponentNameComponent {
  public static get observedAttributes(): string[] {
    return [COMPONENT_CONSTANTS.attributes.PROPERTY_NAME];
  }

  private _core: ComponentCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new ComponentCore(new ComponentAdapter(this));
  }
}
```

**After**:
```typescript
/** @deprecated - This will be removed in the future. Please switch to using ComponentNameComponent. */
export interface IComponentNameComponent extends BaseLitElement {
  propertyName: string;
}

/**
 * @tag forge-component-name
 *
 * @summary Short description of the component.
 *
 * @cssproperty --forge-component-name-color - The color.
 *
 * @csspart root - The root container element.
 *
 * @state property-name - The property-name state is active.
 */
@customElement(COMPONENT_CONSTANTS.elementName)
export class ComponentNameComponent extends BaseLitElement implements IComponentNameComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = COMPONENT_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [DependencyComponent];

  #internals: ElementInternals;

  /**
   * Gets/sets the property.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public propertyName = false;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('propertyName')) {
      toggleState(this.#internals, 'property-name', this.propertyName);
    }
  }

  public render(): TemplateResult {
    return html`<div class="forge-component-name" part="root"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-component-name': IComponentNameComponent;
  }
}
```

**Key changes**:
- `@customElement` takes a simple string, not an object
- No `observedAttributes` — Lit handles this automatically
- No core/adapter instantiation
- Add static `styles` property
- Add deprecated static properties for backward compatibility
- Extends `BaseLitElement` instead of `BaseComponent`
- Interface is `@deprecated` and extends `BaseLitElement` (not `IBaseComponent`)
- Class JSDoc has NO `@property` or `@attribute` tags — those live on the properties themselves
- `declare global` goes at the **bottom** of the file, after the class
- `#internals` is always present — needed for custom states
- `@state` JSDoc tags in the class comment document custom CSS states

#### 3. Convert Properties

**Legacy pattern** (`component.ts` + `component-core.ts`):
```typescript
// In component.ts
@coreProperty()
declare public propertyName: string;

// In component-core.ts
private _propertyName = 'default';

public get propertyName(): string {
  return this._propertyName;
}

public set propertyName(value: string) {
  if (this._propertyName !== value) {
    this._propertyName = value;
    this._adapter.setPropertyName(value);
    this._adapter.toggleHostAttribute(CONSTANTS.attributes.PROPERTY_NAME, !!value);
  }
}
```

**Lit pattern - Simple reflected property**:
```typescript
/**
 * Gets/sets the property description.
 * @default 'default'
 * @attribute property-name
 */
@property({ reflect: true })
public propertyName = 'default';
```

**Note**: Don't add `type: String` - it's the default in Lit. Only specify `type` for `Boolean`, `Number`, `Object`, or `Array`.

**Lit pattern - Custom attribute name**:
```typescript
/**
 * Gets/sets the panel selector.
 * @attribute panel-selector
 */
@property({ attribute: 'panel-selector', reflect: true })
public panelSelector?: string;
```

**Lit pattern - Boolean property**:
```typescript
/**
 * Whether the panel is open.
 * @default false
 * @attribute
 */
@property({ type: Boolean, reflect: true })
public open = false;
```

**Lit pattern - Non-reflected property** (objects, functions):
```typescript
/**
 * A callback that generates URLs for external icons.
 */
@property({ attribute: false })
public externalUrlBuilder?: IconUrlBuilder;
```

**Lit pattern - With custom converter**:
```typescript
/**
 * The title text to display.
 * @attribute title-text
 */
@property({
  attribute: 'title-text',
  reflect: true,
  converter: { toAttribute: removeEmptyAttribute }
})
public titleText = '';
```

**Lit pattern - With custom setter** (for validation/transformation):
```typescript
/**
 * The name of the icon to render.
 * @attribute
 */
@property({ reflect: true })
public set name(value: string | undefined) {
  if (isDefined(value)) {
    this.#name = value?.replace(/\s+/, ''); // Sanitize
  } else {
    this.#name = undefined;
  }
}
public get name(): string | undefined {
  return this.#name;
}
#name?: string;
```

**Lit pattern - Internal reactive state**:
```typescript
@state() private _isAnimating = false;
```

**CRITICAL CONVENTIONS**:
- JSDoc comments MUST precede the property, not in the component's JSDoc
- The class-level JSDoc comment must NOT contain `@property` or `@attribute` tags — only `@tag`, `@summary`, `@cssproperty`, `@csspart`, `@cssclass`, `@state`, `@slot`, `@fires`, `@dependency`, etc.
- Private fields use `#field` notation (JavaScript private)
- Exception: Decorated fields use `@state() private _field` (TypeScript + underscore)
- Only reflect when the original component reflected
- Set `attribute` field when attribute name differs from property (typically kebab-case)
- Omit `type` for strings (default)

#### 4. Handle Private Fields

**Before** (legacy):
```typescript
private _clickListener: EventListener = this._onClick.bind(this);
```

**After** (Lit):
```typescript
// True private methods and event listeners
#clickListener: EventListener = this.#onClick.bind(this);

// Internal reactive state that triggers re-renders
@state() private _isAnimating = false;
```

**Rule**: Use `#field` for private implementation details. Use `@state() private _field` for reactive internal state that should trigger re-renders.

#### 5. Add Render Method or Override createRenderRoot

**For shadow DOM components**:
```typescript
public render(): TemplateResult {
  return html`
    <div class="forge-component" part="root">
      <slot></slot>
    </div>
  `;
}
```

**For light DOM components** (no shadow root):
```typescript
public override createRenderRoot(): HTMLElement | DocumentFragment {
  return this; // Render directly into the component's light DOM
}

// No render() method needed for light DOM unless you want to render content
```

### Phase 4: Template Migration

**Goal**: Convert HTML template to Lit render method.

#### Basic Conversion

**Before** (`component.html`):
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

**After** (in `render()` method):
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

#### Conditional Rendering

**Before** (adapter manipulates DOM):
```typescript
// In adapter
if (this._determinate) {
  this._rootElement.insertAdjacentHTML('beforeend', determinateTemplate);
} else {
  this._rootElement.insertAdjacentHTML('beforeend', indeterminateTemplate);
}
```

**After** (Lit):
```typescript
public render(): TemplateResult {
  return html`
    <div class="root" part="root">
      ${this.determinate ? this.#renderDeterminate() : this.#renderIndeterminate()}
    </div>
  `;
}

#renderDeterminate(): TemplateResult {
  return html`<div class="determinate">...</div>`;
}

#renderIndeterminate(): TemplateResult {
  return html`<div class="indeterminate">...</div>`;
}
```

Or use `nothing` for optional content:
```typescript
${this.titleText ? html`<h1>${this.titleText}</h1>` : nothing}
```

#### Dynamic Classes

**Before** (adapter):
```typescript
this._rootElement.classList.toggle('active', isActive);
this._rootElement.classList.toggle('disabled', isDisabled);
```

**After** (Lit with classMap):
```typescript
import { classMap } from 'lit-html/directives/class-map.js';

public render(): TemplateResult {
  return html`
    <div class=${classMap({
      'forge-component': true,
      'active': this.active,
      'disabled': this.disabled
    })} part="root">
      <slot></slot>
    </div>
  `;
}
```

#### Event Handlers

**In template**:
```typescript
public render(): TemplateResult {
  return html`
    <button @click="${this.#handleClick}">Click me</button>
  `;
}
```

**With options** (capture, passive, etc.):
```typescript
@click="${{ handleEvent: this.#handleClick, capture: true }}"
```

#### DOM Queries

**Before** (adapter):
```typescript
// In adapter
private readonly _rootElement: HTMLElement;
constructor(component: IComponent) {
  this._rootElement = getShadowElement(component, '.root');
}
```

**After** (Lit):
```typescript
@query('.root') private _rootElement!: HTMLElement;
@queryAll('.item') private _items!: HTMLElement[];
@queryAssignedElements() private _slottedElements!: HTMLElement[];
```

Access these in `updated()` lifecycle, not `willUpdate()`.

### Phase 5: Logic Migration

**Goal**: Integrate core/adapter logic into the component.

#### 1. Move Property Change Logic to willUpdate()

**Before** (core setter):
```typescript
// In component-core.ts
public set open(value: boolean) {
  if (this._open !== value) {
    this._open = value;
    this._adapter.setOpen(value);
    this._adapter.toggleHostAttribute('open', value);
  }
}
```

**After** (Lit):
```typescript
public willUpdate(changedProperties: PropertyValues<this>): void {
  if (changedProperties.has('open')) {
    this.#handleOpen();
  }
}

#handleOpen(): void {
  // Logic that was in adapter.setOpen()
  toggleState(this.#internals, 'open', this.open);
  // More logic...
}
```

**Getting the old property value** (e.g., to disconnect with old `capture` value):
```typescript
public willUpdate(changedProperties: PropertyValues<this>): void {
  if (changedProperties.has('capture')) {
    const oldCapture = changedProperties.get('capture') as boolean;
    this.#disconnectTargetElement(oldCapture); // pass old value explicitly
    this.#connectTargetElement();             // uses new this.capture
  }
}

#disconnectTargetElement(capture = this.capture): void {
  this.#targetElement?.removeEventListener('keydown', this.#keyDownListener, { capture });
}
```

**When to use willUpdate() vs updated()**:
- `willUpdate()` - Property change reactions, state updates, calculations, listener management
- `updated()` - DOM queries, measurements, focus management

**IMPORTANT - willUpdate() is async**: `willUpdate()` runs in Lit's async update cycle, so property changes don't take effect synchronously. In tests, use `await element.updateComplete` before asserting effects of property changes:
```typescript
element.disabled = false;
await element.updateComplete; // required before checking listener behavior
dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
expect(spy).toHaveBeenCalledOnce();
```

**When to use custom setters instead of willUpdate()**:
Use custom getter/setter (with `#field` backing) when you need to **validate or transform** the stored value itself (e.g., sanitizing a string, clamping a number). `willUpdate()` receives the already-stored value, so it cannot change what gets persisted. See the [property-patterns.md](./references/property-patterns.md) reference for examples.

#### 1a. Non-Visual Utility Components (No Template, No Shadow DOM)

For components that are purely behavioral (hidden from view, attach listeners to other elements), use this pattern:

```typescript
@customElement(COMPONENT_CONSTANTS.elementName)
export class ComponentNameComponent extends BaseLitElement implements IComponentNameComponent {
  // Standard @property() declarations — NO custom setters needed for listener management
  @property({ reflect: true })
  public target = '';

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  // Inline initialization — no constructor needed
  #targetElement: HTMLElement | null = null;
  #keyDownListener = (evt: KeyboardEvent) => this.#handleKeyDown(evt);

  public override createRenderRoot(): HTMLElement | DocumentFragment {
    return this; // Light DOM — no shadow root
  }
  // NO render() method

  public override connectedCallback(): void {
    super.connectedCallback();
    this.style.display = 'none'; // Hide from layout
    this.#tryInitialize();       // Synchronous setup on first connection
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#disconnect();
    this.#targetElement = null;
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    // Re-initialize when target-resolving properties change
    if (changedProperties.has('target') || changedProperties.has('global')) {
      this.#tryInitialize();
    }
    // Toggle listener when disabled changes
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.#disconnect();
      } else {
        this.#connect();
      }
    }
  }

  // Guard with isConnected so this method is safe to call from both
  // connectedCallback (synchronous) AND willUpdate (async)
  #tryInitialize(): void {
    if (!this.isConnected) {
      return;
    }
    this.#disconnect();
    this.#resolveTargetElement();
    if (!this.disabled) {
      this.#connect();
    }
  }
}
```

**Key points**:
- `connectedCallback` handles the initial synchronous setup
- `willUpdate()` handles subsequent property changes (async)
- The `isConnected` guard makes helper methods safe to call from both contexts
- No `constructor()` needed — inline field initialization suffices when there is no `#internals`
- `style.display = 'none'` replaces the legacy `adapter.setHostStyles()`

#### 2. Move Event Listeners

**Before** (core + adapter):
```typescript
// In core initialize()
this._adapter.addHostListener('click', this._clickListener);

// In core destroy()
this._adapter.removeHostListener('click', this._clickListener);
```

**After** (Lit):
```typescript
#clickListener: EventListener = (evt: Event) => this.#handleClick(evt);

public connectedCallback(): void {
  super.connectedCallback();
  this.addEventListener('click', this.#clickListener);
}

public disconnectedCallback(): void {
  super.disconnectedCallback();
  this.removeEventListener('click', this.#clickListener);
}

#handleClick(evt: Event): void {
  // Handle click
}
```

#### 3. Handle ElementInternals

Use `#internals` when the component needs any of:
- **Custom CSS states** — host-level styles driven by a property, or states with external value for consumers
- **Form association** — see `references/form-association.md`
- **Default ARIA** — setting implicit ARIA roles or properties

```typescript
#internals: ElementInternals;

constructor() {
  super();
  this.#internals = this.attachInternals();
}

public override willUpdate(changedProperties: PropertyValues<this>): void {
  if (changedProperties.has('open')) {
    toggleState(this.#internals, 'open', this.open);
  }
  if (changedProperties.has('disabled')) {
    toggleState(this.#internals, 'disabled', this.disabled);
  }
}
```

**When to use custom states vs. template classes**:

Use `toggleState()` and `:state(...)` in SCSS when:
- Styles need to be applied to the **host element** based on a property (`vertical`, `open`, `disabled`, etc.)
- The state has value for **external consumers** who may want to target it in their own CSS

Use classes on internal template elements when:
- The styles are purely internal and do not affect the host element
- There is no value in exposing the state externally

```scss
// Host-level state → use :state(...)
:host(:state(vertical)) {
  @include vertical-host;

  .forge-component {
    @include vertical-base;
  }
}

// Internal-only styling → use a class
.forge-component--active {
  @include active-styles;
}
```

Document each custom state with a `@state` tag in the class JSDoc:
```typescript
/**
 * @state open - Applied when the component is open.
 * @state disabled - Applied when the component is disabled.
 */
```

For components that also need default ARIA roles or properties:
```typescript
public override connectedCallback(): void {
  super.connectedCallback();
  setDefaultAria(this, this.#internals, {
    role: 'progressbar',
    ariaValueMin: '0',
    ariaValueMax: '1'
  });
}
```

#### 4. Extract Complex Logic to Controllers

When to create a controller:
- Complex event handling logic (>50 lines)
- Focus management
- Scroll/resize observation
- Selection state management
- Trigger element synchronization

**Example structure**:
```typescript
// In component
#triggerController = new ComponentTriggerController(this, {
  clickHandler: this.#handleClick.bind(this),
  keydownHandler: this.#handleKeyDown.bind(this)
});

// In separate controller file (component-trigger-controller.ts)
import { ReactiveController, ReactiveControllerHost } from 'lit';

export class ComponentTriggerController implements ReactiveController {
  #host: ComponentComponent;
  #options: ComponentTriggerControllerOptions;

  constructor(host: ComponentComponent, options: ComponentTriggerControllerOptions) {
    this.#host = host;
    this.#options = options;
    this.#host.addController(this); // Register with host
  }

  public hostConnected(): void {
    // Setup when host connects to DOM
  }

  public hostDisconnected(): void {
    // Cleanup when host disconnects from DOM
  }

  public hostUpdate(): void {
    // Called during host's update cycle
    // React to property changes here
  }
}
```

See `references/controller-patterns.md` for detailed examples.

### Phase 6: Testing & Verification

**Goal**: Ensure migrated component works identically to legacy version.

#### 1. Run Tests

```bash
# Run component tests
pnpm test packages/forge/src/lib/[component-name]

# Run all tests
pnpm test
```

Tests should pass without modification. If they fail:
- Verify property names match exactly
- Check event names and detail structure
- Ensure deprecated interfaces are still exported
- Verify attribute reflection behavior
<<<<<<< feat/divider-lit
=======
- Add `await element.updateComplete` between property changes and assertions that depend on listener state or `willUpdate()` side effects

```typescript
// Tests that change properties post-connection and then immediately
// dispatch events require awaiting the Lit update cycle:
element.disabled = false;
await element.updateComplete;
dispatchKeyboardEvent({ key: 'a' });
expect(spy).toHaveBeenCalledOnce();

element.key = 'Ctrl+a';
await element.updateComplete;
dispatchKeyboardEvent({ key: 'a', ctrlKey: true });
expect(spy).toHaveBeenCalledOnce();
```
>>>>>>> main

#### 2. Run Build

```bash
pnpm build
```

Fix any TypeScript errors that arise.

#### 3. Run Linter

```bash
pnpm lint
```

Fix any linting errors.

#### 4. Visual Testing

```bash
pnpm run dev:forge-docs
```

Navigate to the component's story in Storybook and verify:
- Component renders correctly
- All properties work (test in controls panel)
- Events fire properly
- Visual appearance unchanged
- Interactions work correctly
- No console errors

#### 5. Accessibility Testing

Verify:
- ARIA attributes set correctly
- Keyboard navigation works
- Screen reader announcements correct
- Focus management works
- Custom states applied correctly

#### 6. Property & Attribute Verification

Test in browser console:
```javascript
const el = document.querySelector('forge-component');

// Test property setters
el.propertyName = 'new-value';
console.log(el.getAttribute('property-name')); // Should be 'new-value' if reflected

// Test attribute setters
el.setAttribute('property-name', 'attr-value');
console.log(el.propertyName); // Should be 'attr-value'

// Test boolean attributes
el.setAttribute('open', '');
console.log(el.open); // Should be true

el.removeAttribute('open');
console.log(el.open); // Should be false
```

### Phase 7: Cleanup & Documentation

**Goal**: Finalize migration and document changes.

#### 1. Update index.ts

Add deprecation to the define function:

```typescript
/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/component-name'`). */
export function defineComponentNameComponent(): void {
  defineCustomElement(ComponentNameComponent);
}
```

The interface `@deprecated` annotation lives directly on the interface in the **component file** (`component.ts`), not in `index.ts`. The interface must also extend `BaseLitElement` (not `IBaseComponent`) so consumers have access to `updateComplete` and other Lit lifecycle members via the type:

```typescript
// In component.ts — NOT in index.ts
/** @deprecated - This will be removed in the future. Please switch to using ComponentNameComponent. */
export interface IComponentNameComponent extends BaseLitElement {
  propertyName: string;
}
```

#### 2. Update Constants (Optional)

If constants expose internal implementation, consider deprecating:

```typescript
/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const COMPONENT_NAME_CONSTANTS = { ... };
```

#### 3. Clean Up TODOs

Remove or address any TODO comments added during migration:
- `// TODO: remove attribute reflection` - Decide if reflection is still needed
- `// TODO: clarify types` - Finalize type definitions
- Any other temporary notes

#### 4. Update Tests (If Necessary)

If tests accessed internal implementation details:
- Update to test through public API
- Remove direct access to private fields
- Update to test behavior, not implementation

#### 5. Create Changeset

```bash
pnpm changeset
```

Select the package and change type:
- **Major** - If there are breaking changes to public API
- **Minor** - If adding new features (rare in migration)
- **Patch** - If only internal changes, no API changes

Example changeset content:
```markdown
---
'@tylertech/forge': major
---

**component-name**: Migrated to Lit architecture.

BREAKING CHANGE: Internal architecture changed from component/core/adapter pattern to Lit-based component. The public API remains unchanged for consumers, but internal implementation details are no longer accessible.

- Removed `ComponentNameCore` and `ComponentNameAdapter` classes
- Component now extends `BaseLitElement` instead of `BaseComponent`
- All functionality preserved with improved performance and maintainability
```

#### 6. Commit Changes

Use conventional commit format:

```bash
git add .
git commit -m "feat(component-name)!: migrate to Lit

BREAKING CHANGE: Internal architecture changed to Lit.
Component API remains the same for consumers."
```

#### 7. Create Pull Request

```bash
# Push branch
git push -u origin feat/component-name-lit

# Create PR using gh CLI
gh pr create --title "feat(component-name)!: migrate to Lit" --body "$(cat <<'EOF'
## Summary
Migrates component-name from legacy component/core/adapter/template architecture to Lit-based component.

## Changes
- Consolidated 4 files into single component file
- Replaced core/adapter pattern with Lit reactive properties
- Maintained all existing functionality and public API
- Added backward compatibility for legacy decorators

## Testing
- [ ] All existing tests pass
- [ ] Build succeeds
- [ ] Linter passes
- [ ] Visual testing in Storybook verified
- [ ] Accessibility verified

## Breaking Changes
Internal architecture changed - consumers should see no differences, but internal implementation details are no longer accessible.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

## Quick Reference

### Import Mappings

| Legacy | Lit | Notes |
|--------|-----|-------|
| `@tylertech/forge-core` decorators | `lit/decorators.js` | Use Lit's decorators |
| `BaseComponent` | `BaseLitElement` | New base class |
| `attachShadowTemplate()` | `render()` method or `createRenderRoot()` | Lit handles templates |
| `@coreProperty()` | `@property()` | Lit's reactive properties |
| `@customElement({...})` | `@customElement(string)` | Simpler decorator |
| `coerceBoolean()` | `type: Boolean` in decorator | Lit handles coercion |
| `getShadowElement()` | `@query()` | Lit query decorators |

### Property Decorator Patterns

| Pattern | Decorator | Notes |
|---------|-----------|-------|
| Simple string, reflected | `@property({ reflect: true })` | Omit `type` for strings |
| Custom attribute name | `@property({ attribute: 'kebab-case', reflect: true })` | Set explicit attribute name |
| Boolean | `@property({ type: Boolean, reflect: true })` | Specify type for booleans |
| Number | `@property({ type: Number, reflect: true })` | Specify type for numbers |
| Object/Array | `@property({ type: Object })` | Never reflected |
| Non-reflected | `@property({ attribute: false })` | No attribute sync |
| With converter | `@property({ converter: { toAttribute: fn } })` | Custom conversion |
| Internal state | `@state() private _value` | Not reflected, triggers renders |
| With validation | Custom setter with `#field` backing | Sanitize in setter |

### Lifecycle Method Mappings

| Legacy | Lit | Use Case |
|--------|-----|----------|
| `constructor()` | `constructor()` | Essential initialization only |
| `connectedCallback()` | `connectedCallback()` | Setup needing DOM |
| `disconnectedCallback()` | `disconnectedCallback()` | Cleanup |
| `attributeChangedCallback()` | `willUpdate()` | Property change handling |
| Core initialize() | `connectedCallback()` + `willUpdate()` | Split setup logic |
| Core destroy() | `disconnectedCallback()` | Cleanup |
| Adapter DOM updates | `render()` + `updated()` | Declarative + imperative |
| - | `firstUpdated()` | First render complete |
| - | `createRenderRoot()` | Light DOM override |

### Lit Directives & Utilities

| Directive/Utility | Import | Use Case |
|-------------------|--------|----------|
| `classMap` | `lit-html/directives/class-map.js` | Dynamic classes |
| `styleMap` | `lit-html/directives/style-map.js` | Dynamic styles |
| `nothing` | `lit` | Render nothing |
| `@query()` | `lit/decorators.js` | Query shadow DOM |
| `@queryAll()` | `lit/decorators.js` | Query all matches |
| `@queryAssignedElements()` | `lit/decorators.js` | Query slotted elements |
| `removeEmptyAttribute` | `../core/utils/lit-utils.js` | Converter for empty strings |
| `removeDefaultAttribute` | `../core/utils/lit-utils.js` | Converter for default values |
| `toggleState` | `../core/utils/utils.js` | ElementInternals custom states |
| `setDefaultAria` | `../core/utils/a11y-utils.js` | ARIA properties |

## Common Issues & Solutions

### Issue: Property changes not triggering re-render

**Symptom**: Component doesn't update when property is set.

**Solution**: Ensure property has `@property()` decorator, or use `@state()` for internal state. Lit only re-renders when decorated properties change.

```typescript
// Wrong - no decorator
public myProperty = 'value';

// Correct - with decorator
@property({ reflect: true })
public myProperty = 'value';

// Or for internal state
@state() private _myState = 'value';
```

### Issue: Attribute not syncing to property

**Symptom**: Setting attribute doesn't update property, or vice versa.

**Solution**:
1. Set `reflect: true` in property decorator
2. Verify `attribute` field matches expected attribute name
3. For booleans, ensure `type: Boolean` is set

```typescript
// Wrong - not reflected
@property()
public open = false;

// Correct - reflected boolean
@property({ type: Boolean, reflect: true })
public open = false;
```

### Issue: Cannot access shadow DOM elements in willUpdate()

**Symptom**: `@query()` decorated properties are `undefined` in `willUpdate()`.

**Solution**: Use `updated()` lifecycle instead of `willUpdate()` for DOM queries. Lit renders after `willUpdate()` completes.

```typescript
// Wrong
public willUpdate(changedProperties: PropertyValues): void {
  this._rootElement.classList.add('active'); // undefined!
}

// Correct
public updated(changedProperties: PropertyValues): void {
  this._rootElement.classList.add('active'); // available
}
```

### Issue: Tests failing after migration

**Symptom**: Previously passing tests now fail.

**Common causes**:
1. **Property names changed** - Verify exact match with legacy
2. **Event names changed** - Check custom event names
3. **Interfaces not exported** - Ensure deprecated interfaces still exported
4. **Timing issues** - Lit updates are async, use `await el.updateComplete`

**Solution**:
```typescript
// In tests, wait for Lit to finish rendering
await element.updateComplete;

// Or for multiple updates
await element.updateComplete;
await new Promise(resolve => setTimeout(resolve, 0));
await element.updateComplete;
```

### Issue: Styles not applying

**Symptom**: Component has no styles or wrong styles.

**Solution**:
1. Check `static styles = unsafeCSS(styles)` is set
2. Verify shadow DOM vs light DOM - light DOM components don't use `styles` property
3. Ensure styles import is correct

```typescript
// Correct shadow DOM
public static styles = unsafeCSS(styles);
// render() returns template

// Correct light DOM
public override createRenderRoot() {
  return this; // No static styles needed
}
```

### Issue: Infinite re-render loop

**Symptom**: Component keeps re-rendering, browser freezes.

**Cause**: Property being set in `willUpdate()` or `updated()` that causes another update.

**Solution**: Use guards to prevent redundant updates:

```typescript
// Wrong - causes infinite loop
public willUpdate(changedProperties: PropertyValues): void {
  this.derivedProperty = this.property1 + this.property2;
}

// Correct - only update if changed
public willUpdate(changedProperties: PropertyValues): void {
  if (changedProperties.has('property1') || changedProperties.has('property2')) {
    const newValue = this.property1 + this.property2;
    if (this.derivedProperty !== newValue) {
      this.derivedProperty = newValue;
    }
  }
}
```

### Issue: Property initialized as undefined instead of default value

**Symptom**: Property that should have default value is `undefined`.

**Solution**: Ensure default value is set in property declaration:

```typescript
// Wrong - undefined by default
@property({ reflect: true })
public myProperty?: string;

// Correct - has default
@property({ reflect: true })
public myProperty = 'default-value';
```

## Additional Resources

See the `references/` directory for detailed documentation:

- **[architecture-comparison.md](./references/architecture-comparison.md)** - Deep dive into architectural differences
- **[property-patterns.md](./references/property-patterns.md)** - Exhaustive property examples and patterns
- **[template-patterns.md](./references/template-patterns.md)** - All template transformation patterns
- **[controller-patterns.md](./references/controller-patterns.md)** - Complex logic extraction guide
- **[form-association.md](./references/form-association.md)** - Form-related patterns and ElementInternals
- **[migration-checklist.md](./references/migration-checklist.md)** - Step-by-step verification lists

## Example Migrations

Study these completed migrations for patterns:

### Simple Shadow DOM Component
- **Branch**: `feat/divider-lit`
- **File**: `packages/forge/src/lib/divider/divider.ts`
- **Patterns**: Boolean reflected property, custom state, shadow DOM, ElementInternals, `:state(...)` SCSS

### Simple Light DOM Component
- **Branch**: `feat/accordion-lit`
- **File**: `packages/forge/src/lib/accordion/accordion.ts`
- **Patterns**: Basic properties, event handling, light DOM, no render method

### Complex Shadow DOM Component
- **Branch**: `feat/expansion-panel-lit`
- **Patterns**: ElementInternals, custom states, controllers, animations, shadow DOM

### Component with Custom Setters
- **Branch**: `feat/icon-lit`
- **File**: `packages/forge/src/lib/icon/icon.ts`
- **Patterns**: Property validation, custom setters, lazy loading, external content

<<<<<<< feat/divider-lit
=======
### Non-Visual Utility Component (No Template, No Shadow DOM)
- **Branch**: `feat/keyboard-shortcut-lit`
- **File**: `packages/forge/src/lib/keyboard-shortcut/keyboard-shortcut.ts`
- **Patterns**: `createRenderRoot()` returning `this`, no `render()`, `display: none` in `connectedCallback`, `willUpdate()` for listener management, `isConnected` guard, old value via `changedProperties.get()`, `#disconnect(capture = this.capture)` optional parameter for old-value disconnect

>>>>>>> main
## Conventions Summary

**CRITICAL - Follow these conventions:**

1. **JSDoc placement**: Property JSDoc MUST precede the property. Class JSDoc must NOT contain `@property` or `@attribute` tags — only `@tag`, `@summary`, `@cssproperty`, `@csspart`, `@cssclass`, `@state`, `@slot`, `@fires`, `@dependency`, etc.
2. **Interface**: The legacy `IComponentNameComponent` interface must be marked `@deprecated` and must extend `BaseLitElement` (not `IBaseComponent`). Keep it exported for backward compatibility.
3. **`declare global`**: Always placed at the **bottom** of the file, after the class declaration.
4. **Private fields**: Use `#field` notation (JavaScript private)
5. **Exception**: Decorated state uses `@state() private _field` (TypeScript + underscore)
6. **Reflection**: Only reflect when original component reflected to attributes
7. **Attribute names**: Set `attribute` field when names differ (typically kebab-case)
8. **Property validation**: Use custom setters for validation/transformation
9. **Change handling**: Prefer `willUpdate()` over `updated()` for property reactions
10. **String type**: Omit `type: String` - it's the default in Lit
11. **Custom states**: Use `toggleState()` and `:state(...)` in SCSS when styles target the host element or the state has external styling value. Use internal classes for purely internal styling.
12. **Goal**: Simplify code, reduce boilerplate, leverage Lit features
13. **Controllers**: Extract verbose code into controllers/directives for clarity
14. **Behavior**: No changes to consumer-facing behavior or appearance

# Migration Checklist

Use this checklist to ensure complete and correct migration from legacy architecture to Lit.

## Pre-Migration

- [ ] Commit or stash all uncommitted changes
- [ ] Create feature branch: `git checkout -b feat/[component-name]-lit`
- [ ] Read all legacy files (component, core, adapter, template)
- [ ] Document all properties, their types, and reflection behavior
- [ ] Document all events emitted
- [ ] Document all public methods
- [ ] Identify similar migrated components for reference
- [ ] Note any complex logic that might need controllers

## File Structure

- [ ] Delete `component-adapter.ts`
- [ ] Delete `component-core.ts`
- [ ] Delete `component.html` (if exists)
- [ ] Keep `component.ts` (will be rewritten)
- [ ] Keep `component-constants.ts`
- [ ] Keep `component.scss`
- [ ] Keep `index.ts`

## Imports

### Remove Legacy Imports

- [ ] Remove `attachShadowTemplate` from imports
- [ ] Remove `coreProperty` from imports
- [ ] Remove `customElement` object-style import
- [ ] Remove `coerceBoolean`, `coerceNumber` (Lit handles this)
- [ ] Remove `BaseComponent` import
- [ ] Remove core class import
- [ ] Remove adapter class import
- [ ] Remove template import (if HTML file)

### Add Lit Imports

- [ ] Add `customElement, property, state` from `'lit/decorators.js'`
- [ ] Add `html, PropertyValues, TemplateResult, unsafeCSS` from `'lit'`
- [ ] Add `nothing` from `'lit'` (if conditional rendering)
- [ ] Add `BaseLitElement` from `'../core/base/base-lit-element.js'`
- [ ] Keep styles import from `.scss`
- [ ] Add `CUSTOM_ELEMENT_NAME_PROPERTY`, `CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY` from `'@tylertech/forge-core'`
- [ ] Remove `IBaseComponent` import — the interface now extends `BaseLitElement` directly

### Add Directives (As Needed)

- [ ] `classMap` from `'lit-html/directives/class-map.js'`
- [ ] `styleMap` from `'lit-html/directives/style-map.js'`
- [ ] `ifDefined` from `'lit-html/directives/if-defined.js'`
- [ ] `live` from `'lit-html/directives/live.js'`
- [ ] `repeat` from `'lit-html/directives/repeat.js'`

### Add Utilities (As Needed)

- [ ] `toggleState` from `'../core/utils/utils.js'` (if using custom states)
- [ ] `setDefaultAria` from `'../core/utils/a11y-utils.js'` (if setting ARIA)
- [ ] `removeEmptyAttribute`, `removeDefaultAttribute` from `'../core/utils/lit-utils.js'` (if using converters)

## Component Class

### Class Declaration

- [ ] Change extends from `BaseComponent` to `BaseLitElement`
- [ ] Change `@customElement({name, dependencies})` to `@customElement(TAG_NAME)`
- [ ] Remove `public static get observedAttributes(): string[]` method
- [ ] Add `public static styles = unsafeCSS(styles)`
- [ ] Add `public static [CUSTOM_ELEMENT_NAME_PROPERTY] = TAG_NAME` with deprecation comment
- [ ] Add `public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [deps]` with deprecation comment

### Constructor

- [ ] Remove `attachShadowTemplate(this, template, styles)`
- [ ] Remove `this._core = new ComponentCore(new ComponentAdapter(this))`
- [ ] Keep only essential initialization (ElementInternals if needed)
- [ ] If form-associated: Add `public static readonly formAssociated = true`
- [ ] If using ElementInternals: Add `this.#internals = this.attachInternals()`

### Properties

For each property:
- [ ] Remove `@coreProperty()` decorator
- [ ] Add `@property()` decorator with configuration
- [ ] Verify type (`Boolean`, `Number`, `Object`, `Array` - NOT `String`)
- [ ] Set `reflect: true` if property reflected in legacy
- [ ] Set `attribute: 'kebab-case'` if attribute name differs
- [ ] Add converter if needed (`removeEmptyAttribute`, `removeDefaultAttribute`)
- [ ] Set default value
- [ ] Move JSDoc comment to PRECEDE the property — do NOT add `@property`/`@attribute` tags to the class JSDoc
- [ ] If validation needed, use custom getter/setter with `#field`

### Internal State

- [ ] Convert reactive internal state to `@state() private _field`
- [ ] Convert non-reactive private fields to `#field`
- [ ] Event listeners: `#listener: EventListener = ...`
- [ ] Timers: `#timer?: number`
- [ ] Observers: `#observer?: Observer`
- [ ] ElementInternals: `#internals: ElementInternals`

### Render Method

If using shadow DOM:
- [ ] Add `public render(): TemplateResult` method
- [ ] Convert template HTML to `html` tagged template
- [ ] Replace conditional logic with `${condition ? html`...` : nothing}`
- [ ] Replace class toggling with `classMap`
- [ ] Replace dynamic styles with `styleMap`
- [ ] Convert list rendering with `.map()`
- [ ] Add event handlers with `@event="${this.#handler}"`
- [ ] Verify slots are preserved
- [ ] Verify parts are preserved

If using light DOM:
- [ ] Add `public override createRenderRoot(): HTMLElement | DocumentFragment { return this; }`
- [ ] No render method needed (or minimal render with `<slot></slot>`)

### Lifecycle Methods

- [ ] Keep `connectedCallback()` if needed for setup
- [ ] Remove `this._core.initialize()` call
- [ ] Keep `disconnectedCallback()` if needed for cleanup
- [ ] Remove `this._core.destroy()` call
- [ ] Remove entire `attributeChangedCallback()` method
- [ ] Add `willUpdate(changedProperties: PropertyValues<this>)` for property change handling
- [ ] Add `updated(changedProperties: PropertyValues<this>)` if DOM access needed after render
- [ ] Add `firstUpdated()` if one-time setup after first render needed

### Logic Migration

For each property setter in core:
- [ ] Move validation logic to `willUpdate()` or custom setter
- [ ] Move adapter calls to `willUpdate()` methods or render logic
- [ ] Move attribute syncing (Lit handles automatically)

For event listeners:
- [ ] Define as `#listener: EventListener = (evt) => ...`
- [ ] Add in `connectedCallback()`
- [ ] Remove in `disconnectedCallback()`

For ElementInternals (when needed for custom states, form association, or ARIA):
- [ ] Declare `#internals: ElementInternals`
- [ ] Call `this.#internals = this.attachInternals()` in constructor
- [ ] Use `toggleState()` in `willUpdate()` for custom CSS states
- [ ] Update SCSS to use `:state(...)` selectors instead of `[attribute]` for host-level styles
- [ ] Add `@state` JSDoc tags to the class comment for each custom state
- [ ] Use `setDefaultAria()` for ARIA properties
- [ ] If form-associated: set form value in `willUpdate()` when value changes

For complex logic:
- [ ] Consider extracting to controller
- [ ] Create controller class file
- [ ] Instantiate controller in component
- [ ] Pass callbacks to controller

### DOM Queries

- [ ] Replace cached element properties with `@query()` decorators
- [ ] Replace `getShadowElement()` calls with `@query()`
- [ ] Replace `querySelectorAll()` with `@queryAll()`
- [ ] Add `@queryAssignedElements()` for slotted content
- [ ] Access queried elements only in `updated()` or later

## Deprecations

### In component.ts

- [ ] Add `@deprecated` JSDoc directly on the interface
- [ ] Change interface to extend `BaseLitElement` (not `IBaseComponent`)
- [ ] Keep interface exported for backward compatibility
- [ ] Place `declare global` block at the **bottom** of the file, after the class

### In index.ts

- [ ] Add `@deprecated` JSDoc to define function

### In constants.ts (Optional)

- [ ] Consider adding `@deprecated` if constants expose internal implementation

## Testing

### Run Tests

- [ ] Run component tests: `pnpm test packages/forge/src/lib/[component-name]`
- [ ] All tests pass
- [ ] If tests fail: investigate, fix, ensure behavior matches legacy

### Build

- [ ] Run build: `pnpm build`
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] No type errors in generated `.d.ts` files

### Linting

- [ ] Run linter: `pnpm lint`
- [ ] No linting errors
- [ ] Fix any formatting issues

### Visual Testing

- [ ] Start Storybook: `pnpm run dev:forge-docs`
- [ ] Navigate to component stories
- [ ] Component renders correctly
- [ ] All variants/states render
- [ ] Properties work in controls panel
- [ ] Events fire correctly
- [ ] No console errors
- [ ] No visual regressions

### Manual Testing

- [ ] Test all public properties (get/set)
- [ ] Test all attribute setters
- [ ] Test boolean attribute presence/absence
- [ ] Test all public methods
- [ ] Test all events
- [ ] Test keyboard interaction (if applicable)
- [ ] Test focus management (if applicable)
- [ ] Test form integration (if form-associated)
- [ ] Test with assistive technology (if complex ARIA)

## Verification

### Property & Attribute Sync

For each reflected property:
```javascript
const el = document.querySelector('forge-component');

// Property → Attribute
el.propertyName = 'value';
console.assert(el.getAttribute('property-name') === 'value', 'Property should reflect to attribute');

// Attribute → Property
el.setAttribute('property-name', 'new-value');
console.assert(el.propertyName === 'new-value', 'Attribute should sync to property');
```

For boolean properties:
```javascript
// Presence = true
el.setAttribute('disabled', '');
console.assert(el.disabled === true, 'Boolean attribute present should be true');

// Absence = false
el.removeAttribute('disabled');
console.assert(el.disabled === false, 'Boolean attribute absent should be false');
```

### Events

```javascript
let eventFired = false;
el.addEventListener('component-event', (evt) => {
  eventFired = true;
  console.assert(evt.detail.value === 'expected', 'Event detail should match');
});

// Trigger the event
el.doSomething();
console.assert(eventFired, 'Event should have fired');
```

### Form Association

If form-associated:
```javascript
const form = document.querySelector('form');
const el = document.querySelector('forge-input');

el.value = 'test';
console.assert(el.internals.form === form, 'Should be associated with form');

const formData = new FormData(form);
console.assert(formData.get(el.name) === 'test', 'Value should be in form data');

form.reset();
console.assert(el.value === '', 'Should reset with form');
```

## Cleanup

- [ ] Remove any TODO comments (or convert to issues)
- [ ] Remove any debug logging
- [ ] Remove any commented-out code
- [ ] Ensure all properties have JSDoc comments
- [ ] Ensure all public methods have JSDoc comments
- [ ] Review code for clarity and simplicity

## Documentation

### Changeset

- [ ] Run `pnpm changeset`
- [ ] Select package: `@tylertech/forge`
- [ ] Select change type: `major` (breaking internal changes)
- [ ] Write changeset description with BREAKING CHANGE note

Example:
```markdown
---
'@tylertech/forge': major
---

**component-name**: Migrated to Lit architecture.

BREAKING CHANGE: Internal architecture changed from component/core/adapter pattern to Lit. The public API remains unchanged for consumers, but internal implementation details are no longer accessible.
```

### Commit

- [ ] Stage all changes: `git add .`
- [ ] Commit with conventional format:
  ```
  git commit -m "feat(component-name)!: migrate to Lit

  BREAKING CHANGE: Internal architecture changed to Lit.
  Component API remains the same for consumers."
  ```

### Pull Request

- [ ] Push branch: `git push -u origin feat/component-name-lit`
- [ ] Create PR with clear description
- [ ] Include summary of changes
- [ ] Include testing checklist
- [ ] Note any breaking changes
- [ ] Request review

## Post-Migration

- [ ] PR approved
- [ ] Merge to main
- [ ] Verify CI passes
- [ ] Monitor for issues
- [ ] Update any related documentation

## Troubleshooting

If you encounter issues, check:
- [ ] All imports are correct
- [ ] Property decorators have correct configuration
- [ ] `willUpdate()` and `updated()` are used correctly
- [ ] Custom states use `toggleState()` utility
- [ ] ARIA uses `setDefaultAria()` utility
- [ ] Tests use `await element.updateComplete`
- [ ] No infinite render loops (guard property sets)
- [ ] Query decorators accessed only after render
- [ ] Light DOM components override `createRenderRoot()`
- [ ] Shadow DOM components have `static styles`

## Success Criteria

- [x] All tests pass
- [x] Build succeeds
- [x] Linter passes
- [x] Visual testing confirms no regressions
- [x] All properties work correctly
- [x] All events fire correctly
- [x] Accessibility verified
- [x] Code is simpler and more maintainable
- [x] Backward compatibility maintained
- [x] Documentation updated

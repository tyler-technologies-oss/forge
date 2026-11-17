---
name: component-authoring
description: This skill should be used when the user asks to "create a component", "add a new component", "add a property to a component", "style a component state", "add a custom state", or otherwise discusses authoring or modifying the properties, attributes, styles, or states of a Lit-based component in `packages/forge`. It defines the conventions for property/attribute reflection, host styling, and component state.
---

# Component Authoring

Conventions for properties, styling, and state in Lit-based Forge components (`packages/forge`). For migrating legacy components see `lit-migration`; for the file structure and base class see `packages/forge/CLAUDE.md`.

## Properties and attributes

### Do not reflect

New properties MUST NOT use `reflect: true`.

```ts
@property({ type: Boolean, attribute: 'render-in-top-layer' })
public renderInTopLayer = false;

@property({ type: Boolean })
public disabled = false;
```

Do not reflect a property just so CSS can select on it. Use an internal class or a custom state instead (see below).

### Keep properties settable via attribute

A property should still be settable through an attribute unless its type is a complex object or a reference (arrays, objects, functions, elements, etc.). Those use `attribute: false`.

```ts
@property({ type: Boolean, attribute: 'allow-focus' })
public allowFocus = false;

@property({ attribute: false })
public targetElement: HTMLElement | undefined;

@property({ attribute: false })
public data: MyType[] = [];
```

Use kebab-case attribute names for multi-word properties.

## Styling

### Do not target host attributes

CSS rules MUST NOT select on host attributes (`:host([inward])`, `:host([variant='raised'])`, `:host([render-in-top-layer])`). Attributes are consumer input, not the component's rendered state, and depending on them forces reflection.

### Use internal classes for component states

Compute state in the component and apply it as a class on an element inside the shadow root. Style that class.

```ts
public render(): TemplateResult {
  const classes = { 'forge-example': true, raised: this.raised, dense: this.dense };
  return html`<div class=${classMap(classes)} part="root"><slot></slot></div>`;
}
```

```scss
.forge-example {
  &.raised {
    box-shadow: var(--_example-elevation);
  }

  &.dense {
    padding: var(--_example-dense-padding);
  }
}
```

When a rule needs to be conditional on state but the element it styles is the host itself (so no internal element is available), use a custom state on the host rather than a host attribute.

### Add custom states for consumer-facing state

Expose state through CSS custom states (`ElementInternals.states`, via `toggleState`) when a consumer may reasonably want to target it from their own code: `disabled`, `readonly`, `invalid`, `required`, `checked`, `active`, `open`, `busy`, etc.

```ts
#internals = this.attachInternals();

public willUpdate(changed: PropertyValues<this>): void {
  if (changed.has('disabled')) {
    toggleState(this.#internals, 'disabled', this.disabled);
  }
}
```

```scss
:host(:state(disabled)) {
  pointer-events: none;
}
```

Consumers then write `forge-example:state(disabled) { ... }`.

## Icons

Register every icon a component renders in a `static` initialization block with `IconRegistry.define`, and list `IconComponent` in the component's dependencies. Do not register icons in the constructor, `connectedCallback`, or at module scope.

```ts
import { tylIconKeyboardArrowDown } from '@tylertech/tyler-icons';
import { IconComponent, IconRegistry } from '../icon/index.js';

export class ExampleComponent extends BaseLitElement {
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [IconComponent];

  static {
    IconRegistry.define([tylIconKeyboardArrowDown]);
  }
}
```

## Events

Components MUST emit native event types and event objects (`Event`, `InputEvent`, `FocusEvent`, `KeyboardEvent`, `PointerEvent`, `ToggleEvent`, etc.) using the standard names (`change`, `input`, `toggle`, `focus`, ...) whenever one exists for the behavior.

```ts
this.dispatchEvent(new Event('change', { bubbles: true }));
```

Custom events (`CustomEvent`) should only be used sparingly, when no native event exists for the behavior. Prefix them with `forge-` and pass data through `detail`.

```ts
this.dispatchEvent(new CustomEvent('forge-example-drop', { bubbles: true, composed: true, detail }));
```

## Which mechanism to use

| Need                                                   | Use                                                   |
| ------------------------------------------------------ | ----------------------------------------------------- |
| Style an element inside the shadow root based on state | Internal class on that element                        |
| Consumer should be able to style/query the state       | Custom state (`toggleState`)                          |
| Style the host itself based on state                   | Custom state, `:host(:state(x))`                      |
| Anything else                                          | Non-reflected property (attribute-settable if simple) |

A single state may need both: an internal class for the component's own styles and a custom state for consumers.

## Checklist

- [ ] No `reflect: true`
- [ ] Every non-complex property has an `attribute` (explicit kebab-case when multi-word); complex ones use `attribute: false`
- [ ] No `:host([attr])` selectors in SCSS
- [ ] Internal state styled through classes on shadow-DOM elements
- [ ] Consumer-relevant states exposed with `toggleState` and documented
- [ ] Native events used wherever one exists; `CustomEvent` only when none does
- [ ] Icons registered in a `static` block
- [ ] Tests assert state through public APIs (`:state(x)`, properties, `part`s), not private fields

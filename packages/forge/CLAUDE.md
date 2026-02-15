# Forge Component Library

Web components library. Lit for modern components.

## Component Architecture

### Lit Components (PREFERRED for new)

Extend `BaseLitElement`, use Lit decorators from `lit/decorators.js`:

```typescript
import { html, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { BaseLitElement } from '../core/base/base-lit-element';
import styles from './example.scss';

export const EXAMPLE_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-example';

declare global {
  interface HTMLElementTagNameMap {
    'forge-example': IExampleComponent;
  }
}

@customElement(EXAMPLE_TAG_NAME)
export class ExampleComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = EXAMPLE_TAG_NAME;

  @property({ type: Boolean, reflect: true })
  public raised = false;

  @property({ attribute: false })
  public data: MyType[];

  public render(): TemplateResult {
    return html`<div part="root"><slot></slot></div>`;
  }
}
```

**File structure:**

- `example.ts` - Component class
- `example.scss` - Styles
- `example-constants.ts` - Tag name, types
- `index.ts` - Exports + `defineExampleComponent()`

### Legacy Components (existing only)

Core/Adapter pattern - DO NOT use for new components.

**File structure:**

- `example.ts` - Host element, extends base, uses `attachShadowTemplate()`
- `example-core.ts` - Business logic, state, getters/setters
- `example-adapter.ts` - DOM queries and manipulation
- `example.html` - Template string
- `example.scss` - Styles
- `example-constants.ts` - `elementName`, `observedAttributes`, `attributes`, types

**Key decorators:**

- `@customElement({ name, dependencies })` from `@tylertech/forge-core`
- `@coreProperty()` - delegates property to core class

```typescript
@customElement({
  name: EXAMPLE_CONSTANTS.elementName,
  dependencies: [OtherComponent]
})
export class ExampleComponent extends BaseComponent {
  protected readonly _core: ExampleCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new ExampleCore(new ExampleAdapter(this));
  }

  @coreProperty()
  declare public variant: ExampleVariant;
}
```

## Testing

- `pnpm run test`

## Key Directories

- `src/lib/` - All components
- `src/lib/core/` - Base classes, mixins, utils
- `src/lib/core/base/` - `BaseComponent`, `BaseLitElement`
- `src/stories/` - Storybook stories

## Commands

```bash
pnpm build              # Build library
pnpm dev                # Dev server
pnpm storybook          # Storybook
pnpm test:vitest:run    # Run Vitest (preferred)
pnpm test:wtr:run       # Run WTR tests
```

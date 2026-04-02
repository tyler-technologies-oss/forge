# Controller Patterns

This document explains when and how to extract complex logic into Lit Reactive Controllers.

## What is a Reactive Controller?

A Reactive Controller is a class that:
- Implements the `ReactiveController` interface
- Integrates with Lit's reactive update lifecycle
- Encapsulates complex, reusable logic
- Can manage its own state and side effects

## When to Create a Controller

Create a controller when:
- Logic exceeds ~50-100 lines in the component
- Logic is conceptually self-contained
- Logic could be reused across multiple components
- Logic manages complex state or side effects

### Common Use Cases

1. **Trigger element management** - Complex trigger/button synchronization
2. **Focus management** - Keyboard navigation, focus trapping
3. **Observers** - Intersection, Resize, Mutation observers
4. **Selection state** - Multi-select, keyboard selection
5. **Scroll management** - Virtual scrolling, infinite scroll
6. **Drag and drop** - Complex drag/drop interactions

## Controller Structure

### Basic Template

```typescript
import { ReactiveController, ReactiveControllerHost } from 'lit';

export interface ComponentControllerOptions {
  // Configuration options
  onEvent?: () => void;
}

export class ComponentController implements ReactiveController {
  #host: ComponentType;
  #options: ComponentControllerOptions;

  constructor(host: ComponentType, options: ComponentControllerOptions = {}) {
    this.#host = host;
    this.#options = options;
    this.#host.addController(this); // Register with host
  }

  // Called when host connects to DOM
  public hostConnected(): void {
    this.#attach();
  }

  // Called when host disconnects from DOM
  public hostDisconnected(): void {
    this.#detach();
  }

  // Called during host's update cycle
  public hostUpdate(): void {
    // React to host property changes
  }

  // Called after host's render
  public hostUpdated(): void {
    // Access host's DOM after render
  }

  // Private implementation methods
  #attach(): void {
    // Setup logic
  }

  #detach(): void {
    // Cleanup logic
  }
}
```

## Real-World Example: Trigger Controller

From `expansion-panel-trigger-controller.ts`:

```typescript
import { ReactiveController } from 'lit';
import { ExpansionPanelComponent } from './expansion-panel.js';
import { IOpenIconComponent } from '../open-icon/index.js';

export interface ExpansionPanelTriggerControllerOptions {
  clickHandler: (evt: MouseEvent) => void;
  keydownHandler: (evt: KeyboardEvent) => void;
  keyupHandler: (evt: KeyboardEvent) => void;
}

export class ExpansionPanelTriggerController implements ReactiveController {
  #host: ExpansionPanelComponent;
  #options: ExpansionPanelTriggerControllerOptions;
  #currentTrigger: HTMLElement | null = null;
  #currentOpenIcon: IOpenIconComponent | null = null;

  constructor(host: ExpansionPanelComponent, options: ExpansionPanelTriggerControllerOptions) {
    this.#host = host;
    this.#options = options;
    this.#host.addController(this);
  }

  public hostConnected(): void {
    this.#tryAttachTrigger();
  }

  public hostDisconnected(): void {
    this.#detach();
  }

  public hostUpdate(): void {
    // React to property changes
    this.#tryHostTriggerChanged();
    this.#tryHostOpenChanged();
  }

  public get trigger(): HTMLElement | null {
    return this.#currentTrigger;
  }

  public get openIcon(): IOpenIconComponent | null {
    return this.#currentOpenIcon;
  }

  #tryHostTriggerChanged(): void {
    const trigger = this.#resolveTriggerElement();
    if (trigger !== this.#currentTrigger) {
      this.#detachTrigger();
      this.#currentTrigger = trigger;
      this.#attachTrigger();
    }
  }

  #tryHostOpenChanged(): void {
    if (this.#currentTrigger) {
      this.#syncTriggerState();
    }
  }

  #resolveTriggerElement(): HTMLElement | null {
    if (this.#host.triggerElement) {
      return this.#host.triggerElement;
    }
    if (this.#host.trigger) {
      return document.getElementById(this.#host.trigger);
    }
    return this.#host.querySelector('[slot="header"]');
  }

  #attachTrigger(): void {
    if (!this.#currentTrigger) return;

    this.#currentTrigger.addEventListener('click', this.#options.clickHandler);
    this.#currentTrigger.addEventListener('keydown', this.#options.keydownHandler);
    this.#currentTrigger.addEventListener('keyup', this.#options.keyupHandler);

    this.#syncTriggerState();
    this.#attachOpenIcon();
  }

  #detachTrigger(): void {
    if (!this.#currentTrigger) return;

    this.#currentTrigger.removeEventListener('click', this.#options.clickHandler);
    this.#currentTrigger.removeEventListener('keydown', this.#options.keydownHandler);
    this.#currentTrigger.removeEventListener('keyup', this.#options.keyupHandler);

    this.#detachOpenIcon();
    this.#currentTrigger = null;
  }

  #syncTriggerState(): void {
    if (!this.#currentTrigger) return;

    this.#currentTrigger.setAttribute('aria-expanded', `${this.#host.open}`);
    this.#currentTrigger.setAttribute('aria-controls', this.#host.id || '');
  }

  #attachOpenIcon(): void {
    const openIcon = this.#currentTrigger?.querySelector('forge-open-icon') as IOpenIconComponent;
    if (openIcon) {
      this.#currentOpenIcon = openIcon;
      openIcon.open = this.#host.open;
    }
  }

  #detachOpenIcon(): void {
    this.#currentOpenIcon = null;
  }

  #tryAttachTrigger(): void {
    const trigger = this.#resolveTriggerElement();
    if (trigger && trigger !== this.#currentTrigger) {
      this.#currentTrigger = trigger;
      this.#attachTrigger();
    }
  }

  #detach(): void {
    this.#detachTrigger();
  }
}
```

**Usage in component**:

```typescript
export class ExpansionPanelComponent extends BaseLitElement {
  @property({ reflect: true }) public trigger = '';
  @property({ type: Object }) public triggerElement: HTMLElement | null = null;
  @property({ type: Boolean, reflect: true }) public open = false;

  #triggerController = new ExpansionPanelTriggerController(this, {
    clickHandler: this.#handleClick.bind(this),
    keydownHandler: this.#handleKeyDown.bind(this),
    keyupHandler: this.#handleKeyUp.bind(this)
  });

  #handleClick(evt: MouseEvent): void {
    this.open = !this.open;
  }

  #handleKeyDown(evt: KeyboardEvent): void {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
    }
  }

  #handleKeyUp(evt: KeyboardEvent): void {
    if (evt.key === 'Enter' || evt.key === ' ') {
      this.open = !this.open;
    }
  }
}
```

## Controller Lifecycle

### Timing

```
Component constructor
    ↓
Controller constructor
    ↓
Component connectedCallback()
    ↓
Controller hostConnected()
    ↓
Component willUpdate()
    ↓
Controller hostUpdate()
    ↓
Component render()
    ↓
Component updated()
    ↓
Controller hostUpdated()
    ↓
Component disconnectedCallback()
    ↓
Controller hostDisconnected()
```

## Controller Communication

### Controller → Component

```typescript
export class MyController implements ReactiveController {
  #host: MyComponent;

  constructor(host: MyComponent) {
    this.#host = host;
    this.#host.addController(this);
  }

  public hostUpdate(): void {
    // Read host properties
    if (this.#host.someProperty) {
      this.#doSomething();
    }
  }

  #notifyHost(): void {
    // Dispatch event from host
    this.#host.dispatchEvent(new CustomEvent('controller-event', {
      detail: { data: 'value' }
    }));

    // Or call host method directly (if defined)
    if ('handleControllerNotification' in this.#host) {
      (this.#host as any).handleControllerNotification();
    }
  }
}
```

### Component → Controller

```typescript
export class MyComponent extends BaseLitElement {
  #myController = new MyController(this, {
    onEvent: this.#handleEvent.bind(this)
  });

  public someMethod(): void {
    // Access controller public API
    const value = this.#myController.getValue();

    // Or use getter
    if (this.#myController.isActive) {
      // ...
    }
  }

  #handleEvent(): void {
    // Callback from controller
  }
}
```

## Common Controller Patterns

### Observer Controller

```typescript
export class IntersectionController implements ReactiveController {
  #host: ReactiveControllerHost & HTMLElement;
  #observer?: IntersectionObserver;
  #onIntersect: (entry: IntersectionObserverEntry) => void;

  constructor(
    host: ReactiveControllerHost & HTMLElement,
    onIntersect: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit = {}
  ) {
    this.#host = host;
    this.#onIntersect = onIntersect;
    this.#host.addController(this);

    this.#observer = new IntersectionObserver(entries => {
      entries.forEach(entry => this.#onIntersect(entry));
    }, options);
  }

  public hostConnected(): void {
    this.#observer?.observe(this.#host);
  }

  public hostDisconnected(): void {
    this.#observer?.disconnect();
  }
}
```

**Usage**:

```typescript
export class LazyComponent extends BaseLitElement {
  @state() private _isVisible = false;

  #intersectionController = new IntersectionController(
    this,
    (entry) => {
      this._isVisible = entry.isIntersecting;
    },
    { rootMargin: '100px' }
  );

  public render(): TemplateResult {
    return html`
      ${this._isVisible ? html`<img src="${this.src}">` : nothing}
    `;
  }
}
```

### Focus Management Controller

```typescript
export class FocusController implements ReactiveController {
  #host: ReactiveControllerHost & HTMLElement;
  #focusTrap?: FocusTrap;

  constructor(host: ReactiveControllerHost & HTMLElement) {
    this.#host = host;
    this.#host.addController(this);
  }

  public hostConnected(): void {
    this.#host.addEventListener('keydown', this.#handleKeyDown);
  }

  public hostDisconnected(): void {
    this.#host.removeEventListener('keydown', this.#handleKeyDown);
    this.#deactivateTrap();
  }

  public activate(): void {
    this.#focusTrap = createFocusTrap(this.#host, {
      onDeactivate: () => this.#focusTrap = undefined
    });
    this.#focusTrap.activate();
  }

  public deactivate(): void {
    this.#deactivateTrap();
  }

  #deactivateTrap(): void {
    this.#focusTrap?.deactivate();
    this.#focusTrap = undefined;
  }

  #handleKeyDown = (evt: KeyboardEvent): void => {
    if (evt.key === 'Escape') {
      this.deactivate();
    }
  };
}
```

### Selection Controller

```typescript
export class SelectionController implements ReactiveController {
  #host: ReactiveControllerHost;
  #selectedIds = new Set<string>();

  constructor(host: ReactiveControllerHost) {
    this.#host = host;
    this.#host.addController(this);
  }

  public select(id: string): void {
    this.#selectedIds.add(id);
    this.#host.requestUpdate(); // Trigger host re-render
  }

  public deselect(id: string): void {
    this.#selectedIds.delete(id);
    this.#host.requestUpdate();
  }

  public toggle(id: string): void {
    if (this.isSelected(id)) {
      this.deselect(id);
    } else {
      this.select(id);
    }
  }

  public isSelected(id: string): boolean {
    return this.#selectedIds.has(id);
  }

  public clear(): void {
    this.#selectedIds.clear();
    this.#host.requestUpdate();
  }

  public get selectedIds(): string[] {
    return Array.from(this.#selectedIds);
  }

  public get count(): number {
    return this.#selectedIds.size;
  }
}
```

## Testing Controllers

### Unit Testing

```typescript
import { expect } from 'vitest';
import { MyController } from './my-controller.js';

describe('MyController', () => {
  it('should initialize correctly', () => {
    const mockHost = {
      addController: vi.fn(),
      requestUpdate: vi.fn()
    };

    const controller = new MyController(mockHost as any);

    expect(mockHost.addController).toHaveBeenCalledWith(controller);
  });

  it('should handle hostConnected', () => {
    const mockHost = {
      addController: vi.fn(),
      addEventListener: vi.fn()
    };

    const controller = new MyController(mockHost as any);
    controller.hostConnected();

    expect(mockHost.addEventListener).toHaveBeenCalled();
  });
});
```

### Integration Testing

```typescript
import { expect } from 'vitest';
import { fixture, html } from 'vitest-browser-lit';

it('should use controller correctly', async () => {
  const screen = render(html`<my-component></my-component>`);
  const el = screen.container.querySelector('my-component');

  // Test controller behavior through component
  el.someProperty = 'value';
  await el.updateComplete;

  // Verify controller effects
  expect(el.someOtherProperty).toBe('expected');
});
```

## Best Practices

1. **Single Responsibility**: Each controller should handle one concern
2. **Clear API**: Expose only necessary methods and properties
3. **Proper Cleanup**: Always clean up in `hostDisconnected()`
4. **Request Updates**: Call `host.requestUpdate()` when controller state changes affect rendering
5. **Type Safety**: Use proper TypeScript types for host and options
6. **Documentation**: Document controller purpose, usage, and API
7. **Testability**: Design controllers to be unit testable
8. **Reusability**: Make controllers generic where appropriate

## When NOT to Use Controllers

Don't use controllers when:
- Logic is simple (<50 lines)
- Logic is specific to one component and won't be reused
- Logic is mostly template-based (use helper methods instead)
- Logic doesn't have complex lifecycle needs

Instead, use:
- Private methods on the component
- Helper methods for template rendering
- Inline logic in `willUpdate()` or `updated()`

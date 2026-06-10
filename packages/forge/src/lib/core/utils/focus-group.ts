import { noChange, ReactiveController, ReactiveControllerHost } from 'lit';
import { AsyncDirective } from 'lit/async-directive.js';
import { directive, ElementPart } from 'lit/directive.js';
import { ExperimentalFocusOptions } from '../../constants.js';
import { composedPathFrom } from './event-utils.js';

export type FocusGroupOrientation = 'horizontal' | 'vertical' | 'both';
export type FocusGroupFocusChangeCallback = (evt: FocusEvent, element: HTMLElement) => void;
export type FocusGroupGetEntryElementCallback = () => HTMLElement | null;

export interface IFocusGroupConfig {
  /**
   * CSS selector to query focusable elements within the host.
   */
  selector: string;

  /**
   * Orientation for keyboard navigation.
   * - 'horizontal': ArrowLeft/ArrowRight navigation
   * - 'vertical': ArrowUp/ArrowDown navigation
   * - 'both': All arrow keys navigation
   * @default 'horizontal'
   */
  orientation?: FocusGroupOrientation;

  /**
   * Whether focus should wrap from last to first element (and vice versa).
   * @default false
   */
  wrap?: boolean;

  /**
   * Callback invoked when the currently focused element changes within the group. Receives the
   * newly focused element and its index within the group.
   */
  onFocusChange?: FocusGroupFocusChangeCallback;

  /**
   * Callback to get the first focusable child element within the focus group. If not provided,
   * defaults to the first element matching the selector.
   */
  getEntryElement?: FocusGroupGetEntryElementCallback;
}

/**
 * Core focus group management logic shared by both FocusGroupController and focusGroup directive.
 * Manages roving tabindex pattern for a group of focusable elements.
 */
export class BaseFocusGroup {
  public orientation: FocusGroupOrientation = 'horizontal';
  public wrap = false;

  public set selector(value: string) {
    this.#selector = value;
    this.#updateTabIndices();
  }
  public get selector(): string {
    return this.#selector;
  }

  public set currentElement(element: HTMLElement | null) {
    if (!element || !element.matches(this.#selector)) {
      return;
    }

    const elements = this.#elements;
    if (elements.includes(element)) {
      this.#lastFocusedElement = element;

      if (this.#hasFocus(elements)) {
        element.focus();
      }
    }

    this.#updateTabIndices(elements);
  }
  public get currentElement(): HTMLElement | null {
    return this.#lastFocusedElement;
  }

  #rootElement?: HTMLElement;
  #selector = '';
  #onFocusChange: FocusGroupFocusChangeCallback | undefined;
  #getEntryElement: FocusGroupGetEntryElementCallback = () => this.#elements[0] ?? null;
  #lastFocusedElement: HTMLElement | null = null;
  #focusInListener = (evt: FocusEvent): void => this.#handleFocusIn(evt);
  #focusOutListener = (evt: FocusEvent): void => this.#handleFocusOut(evt);
  #isInitialized = false;

  get #elements(): HTMLElement[] {
    return this.#getElements();
  }

  get #entryElement(): HTMLElement | null {
    if (this.#lastFocusedElement && this.#lastFocusedElement.matches(this.#selector)) {
      return this.#lastFocusedElement;
    }
    return this.#getEntryElement();
  }

  constructor(rootElement?: HTMLElement, config?: IFocusGroupConfig) {
    if (rootElement && config) {
      this._initialize(rootElement, config);
    }
  }

  protected _initialize(rootElement: HTMLElement, config: IFocusGroupConfig): void {
    this.#rootElement = rootElement;
    this.#selector = config.selector;
    this.orientation = config.orientation ?? 'horizontal';
    this.wrap = config.wrap ?? false;
    this.#onFocusChange = config.onFocusChange;
    this.#getEntryElement = config.getEntryElement ?? (() => this.#elements[0] ?? null);
    this.#isInitialized = true;
  }

  public connect(): void {
    if (!this.#rootElement || !this.#isInitialized) {
      return;
    }

    this.#updateTabIndices();

    this.#rootElement.addEventListener('focusin', this.#focusInListener);
    this.#rootElement.addEventListener('focusout', this.#focusOutListener);
  }

  public disconnect(): void {
    if (!this.#rootElement || !this.#isInitialized) {
      return;
    }

    this.#rootElement.removeEventListener('focusin', this.#focusInListener);
    this.#rootElement.removeEventListener('focusout', this.#focusOutListener);
  }

  public fromEvent(event: KeyboardEvent, options?: ExperimentalFocusOptions): boolean {
    const didHandle = this.fromKey(event.key, options);
    if (didHandle) {
      event.preventDefault();
    }

    return didHandle;
  }

  public fromKey(key: string, options?: ExperimentalFocusOptions): boolean {
    if (!this.#shouldHandleKey(key)) {
      return false;
    }

    switch (key) {
      case 'ArrowRight':
      case 'ArrowDown':
        this.focusNext(options);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        this.focusPrevious(options);
        break;
      case 'Home':
        this.focusFirst(options);
        break;
      case 'End':
        this.focusLast(options);
        break;
    }
    return true;
  }

  public focusNext(options?: ExperimentalFocusOptions): void {
    this.#shiftFocus(1, options);
  }

  public focusPrevious(options?: ExperimentalFocusOptions): void {
    this.#shiftFocus(-1, options);
  }

  public focusFirst(options?: ExperimentalFocusOptions): void {
    const elements = this.#elements;
    if (elements.length > 0) {
      this.#focusAtIndex(0, options, elements);
    }
  }

  public focusLast(options?: ExperimentalFocusOptions): void {
    const elements = this.#elements;
    if (elements.length > 0) {
      this.#focusAtIndex(elements.length - 1, options, elements);
    }
  }

  public focusAt(index: number, options?: ExperimentalFocusOptions): void {
    this.#focusAtIndex(index, options);
  }

  public focus(element: HTMLElement, options?: ExperimentalFocusOptions): void {
    const elements = this.#elements;
    const index = elements.indexOf(element);
    if (index !== -1) {
      this.#focusAtIndex(index, options, elements);
    }
  }

  /**
   * Checks if any element in the focus group currently has focus.
   * @returns True if any element in the focus group has focus, false otherwise.
   */
  public hasFocus(): boolean {
    return this.#hasFocus();
  }

  /**
   * Focuses the entry element in the focus group (last focused, or first element).
   * @param options
   */
  public focusRoot(options?: ExperimentalFocusOptions): void {
    this.#entryElement?.focus(options);
  }

  /**
   * Re-queries the DOM for focusable elements and updates tabindex values accordingly.
   */
  public update(): void {
    this.#updateTabIndices();
  }

  #handleFocusIn(evt: FocusEvent): void {
    if (!this.#rootElement || !this.#isInitialized) {
      return;
    }

    const target = evt.target as HTMLElement;
    const elements = this.#elements;

    if (elements.includes(target)) {
      if (this.#lastFocusedElement && this.#lastFocusedElement !== target) {
        this.#lastFocusedElement.tabIndex = -1;
      }
      target.tabIndex = 0;
      this.#lastFocusedElement = target;

      this.#onFocusChange?.(evt, target);
    }
  }

  #handleFocusOut(evt: FocusEvent): void {
    if (!this.#rootElement || !this.#isInitialized) {
      return;
    }

    // Ensure that the blur event passed through the last focused element
    const blurredElement = composedPathFrom(this.#rootElement, evt).find(el => el === this.#lastFocusedElement);

    // Detect whether focus was lost due to the focused element becoming disabled
    if (blurredElement?.matches(':is(:disabled, :state(disabled))')) {
      blurredElement.tabIndex = -1;
      this.#lastFocusedElement = null;

      // Re-query elements and set tabindex on the entry element
      const elements = this.#elements;
      const entryElement = this.#entryElement;
      if (entryElement && elements.includes(entryElement)) {
        entryElement.tabIndex = 0;
        entryElement.focus();
      }
    }
  }

  #getElements(): HTMLElement[] {
    if (!this.#rootElement || !this.#isInitialized) {
      return [];
    }

    // Query elements in shadow DOM
    const shadowElements = Array.from(this.#rootElement.querySelectorAll<HTMLElement>(this.#selector));

    // Query slotted elements
    const slots = this.#rootElement.querySelectorAll('slot');
    const slottedElements: HTMLElement[] = [];

    slots.forEach(slot => {
      const assigned = slot.assignedElements({ flatten: true });
      assigned.forEach(element => {
        // Check if the element itself matches
        if (element instanceof HTMLElement && element.matches(this.#selector)) {
          slottedElements.push(element);
        }
        // Also check descendants of slotted elements
        const descendants = element.querySelectorAll<HTMLElement>(this.#selector);
        slottedElements.push(...Array.from(descendants));
      });
    });

    // Combine and deduplicate
    const allElements = [...shadowElements, ...slottedElements];
    return Array.from(new Set(allElements));
  }

  #focusAtIndex(index: number, options?: ExperimentalFocusOptions, elements?: HTMLElement[]): void {
    elements = elements || this.#elements;
    if (index < 0 || index >= elements.length) {
      console.error(`Index ${index} is out of bounds for focusable elements.`);
      return;
    }
    const element = elements[index];
    element.focus(options);
  }

  #shouldHandleKey(key: string): boolean {
    switch (key) {
      case 'ArrowRight':
      case 'ArrowLeft':
        return this.orientation === 'horizontal' || this.orientation === 'both';
      case 'ArrowDown':
      case 'ArrowUp':
        return this.orientation === 'vertical' || this.orientation === 'both';
      case 'Home':
      case 'End':
        return true;
      default:
        return false;
    }
  }

  #shiftFocus(amount: -1 | 1, options?: ExperimentalFocusOptions): void {
    const elements = this.#elements;
    if (elements.length === 0) {
      return;
    }

    if (!this.#lastFocusedElement) {
      return this.#focusAtIndex(0, options, elements);
    }

    const currentIndex = elements.indexOf(this.#lastFocusedElement);
    let newIndex = currentIndex + amount;

    if (amount === -1 && newIndex < 0) {
      newIndex = this.wrap ? elements.length - 1 : 0;
    } else if (amount === 1 && newIndex >= elements.length) {
      newIndex = this.wrap ? 0 : elements.length - 1;
    }

    if (newIndex === currentIndex) {
      return;
    }

    this.#focusAtIndex(newIndex, options, elements);
  }

  #hasFocus(elements?: HTMLElement[]): boolean {
    return (elements || this.#elements).some(element => element.matches(':focus'));
  }

  #updateTabIndices(elements?: HTMLElement[]): void {
    elements = elements || this.#elements;
    const entryElement = this.#entryElement;

    elements.forEach(element => {
      element.tabIndex = element === entryElement ? 0 : -1;
    });
  }
}

/**
 * Reference object for accessing focus group functionality when using the focusGroup directive.
 * Provides the same API as FocusGroupController but works with directive-attached elements.
 */
export class FocusGroupRef extends BaseFocusGroup {
  #config: IFocusGroupConfig;

  constructor(config: IFocusGroupConfig) {
    super();
    this.#config = config;
  }

  /**
   * Internal method for directive to initialize the focus group with an element.
   * @internal
   */
  public initializeWithElement(rootElement: HTMLElement): void {
    this._initialize(rootElement, this.#config);
  }
}

/**
 * Creates a reference object for use with the focusGroup directive. The ref provides access to
 * focus group methods and can be used to programmatically control focus navigation.
 *
 * @param config Configuration for the focus group
 * @returns A FocusGroupRef instance
 *
 * @example
 * const focusGroupRef = createFocusGroupRef({
 *   selector: 'button:not([disabled])',
 *   orientation: 'horizontal',
 *   wrap: true
 * });
 *
 * // In template:
 * html`<div ${focusGroup(focusGroupRef)}>
 *   <button>Item 1</button>
 *   <button>Item 2</button>
 * </div>`
 *
 * // Access methods:
 * focusGroupRef.focusNext();
 */
export const createFocusGroupRef = (config: IFocusGroupConfig): FocusGroupRef => new FocusGroupRef(config);

class FocusGroupDirective extends AsyncDirective {
  #isInitialized = false;
  #ref?: FocusGroupRef;

  public update(part: ElementPart, [ref]: Parameters<this['render']>): void {
    this.#ref = ref;
    if (!this.#isInitialized) {
      const element = part.element as HTMLElement;
      ref.initializeWithElement(element);
      ref.connect();
      this.#isInitialized = true;
    }
  }

  public disconnected(): void {
    this.#ref?.disconnect();
  }

  public render(_ref: FocusGroupRef): typeof noChange {
    return noChange;
  }
}

/**
 * A Lit directive for managing roving tabindex within a group of focusable elements. Unlike
 * FocusGroupController which attaches to the host component, this directive can be applied to any
 * element in a template.
 *
 * @param ref A FocusGroupRef created with createFocusGroupRef()
 * @returns A directive result that manages focus group behavior
 *
 * @example
 * class MyComponent extends BaseLitElement {
 *   #focusGroup = createFocusGroupRef({
 *     selector: '[role="tab"]',
 *     orientation: 'horizontal',
 *     wrap: true
 *   });
 *
 *   public render() {
 *     return html`
 *       <div ${focusGroup(this.#focusGroup)}>
 *         <button role="tab">Tab 1</button>
 *         <button role="tab">Tab 2</button>
 *       </div>
 *     `;
 *   }
 *
 *   public focusNext() {
 *     this.#focusGroup.focusNext();
 *   }
 * }
 */
export const focusGroup = directive(FocusGroupDirective);

/**
 * A Lit controller for managing roving tabindex within a group of focusable elements.
 *
 * @example
 * class ExampleComponent extends LitElement {
 *   #focusGroup = new FocusGroupController(this, {
 *     selector: '[role="option"]',
 *     orientation: 'vertical',
 *     wrap: true
 *   });
 *
 *   public focusNext(): void {
 *     this.#focusGroup.focusNext();
 *   }
 * }
 */
export class FocusGroupController extends BaseFocusGroup implements ReactiveController {
  public host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost & HTMLElement, config: IFocusGroupConfig) {
    super(host, config);
    this.host = host;
    host.addController(this);
  }

  public hostConnected(): void {
    this.connect();
  }

  public hostDisconnected(): void {
    this.disconnect();
  }
}

import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { composedPathFrom } from '../../core/utils/event-utils.js';
import { createFocusGroupRef, focusGroup } from '../../core/utils/focus-group.js';
import { KeyActionController } from '../../core/utils/key-action.js';
import { toggleState } from '../../core/utils/utils.js';
import { IListboxActivateEventData, IListboxChangeEventData, LISTBOX_CONSTANTS, ListboxOptionData } from './listbox-constants.js';

import styles from './listbox.scss';

/**
 * @tag forge-listbox
 *
 * @summary Listboxes allow users to select one or more options from a list.
 *
 * @description
 * The listbox component follows the W3C ARIA APG listbox pattern, providing keyboard navigation
 * and screen reader support. It uses declarative `<forge-option>` and `<forge-option-group>` elements
 * for options and groups.
 *
 * @dependency forge-option
 * @dependency forge-option-group
 *
 * @event {CustomEvent<IListboxChangeEventData>} forge-listbox-change - Dispatches when the selection changes.
 * @event {CustomEvent<IListboxActivateEventData>} forge-listbox-activate - Dispatches when an option is activated.
 *
 * @cssproperty --forge-listbox-padding - The padding of the listbox container.
 * @cssproperty --forge-listbox-gap - The gap between list items.
 *
 * @csspart container - The container element.
 *
 * @slot - The listbox options and option groups.
 */
@customElement(LISTBOX_CONSTANTS.elementName)
export class ListboxComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = LISTBOX_CONSTANTS.elementName;

  #internals: ElementInternals;
  #optionObserver?: MutationObserver;

  /**
   * The selected value(s). Single value for single-select, array for multi-select.
   * @default null
   * @attribute
   */
  @property({ attribute: false })
  public value: any | any[] | null = null;

  /**
   * Whether multiple options can be selected.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public multiple = false;

  /**
   * Whether the listbox is disabled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The orientation of the listbox.
   * @default 'vertical'
   * @attribute
   */
  @property({ type: String })
  public orientation: 'vertical' | 'horizontal' = 'vertical';

  @state() private _options: ListboxOptionData[] = [];

  // Focus group with aria-activedescendant
  #focusGroupRef = createFocusGroupRef({
    selector: LISTBOX_CONSTANTS.selectors.OPTION_NOT_DISABLED,
    orientation: 'vertical',
    wrap: true,
    useActiveDescendant: true,
    onFocusChange: (_, element) => {
      element.scrollIntoView({ block: 'nearest' });
    }
  });

  constructor() {
    super();
    this.#internals = this.attachInternals();

    // Keyboard action controller
    new KeyActionController(this, {
      actions: [
        {
          key: ['ArrowUp', 'ArrowDown'],
          handler: evt => this.#focusGroupRef.fromEvent(evt),
          allowRepeat: true,
          allowDefault: true
        },
        { key: ['Home', 'End'], handler: evt => this.#focusGroupRef.fromEvent(evt) },
        { key: ' ', handler: this.#handleSpaceKey.bind(this) },
        { key: 'Enter', handler: this.#handleEnterKey.bind(this) },
        {
          key: [
            { key: 'a', modifier: 'ctrl' },
            { key: 'a', modifier: 'meta' }
          ],
          handler: this.#handleSelectAllKey.bind(this)
        }
      ],
      searchHandler: this.#handleTypeAhead.bind(this)
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, {
      role: 'listbox',
      ariaMultiSelectable: this.multiple ? 'true' : null,
      ariaOrientation: this.orientation === 'horizontal' ? 'horizontal' : null,
      ariaDisabled: this.disabled ? 'true' : null
    });
    this.#initializeOptions();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#optionObserver?.disconnect();
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled')) {
      toggleState(this.#internals, 'disabled', this.disabled);
    }

    if (changedProperties.has('orientation')) {
      setDefaultAria(this, this.#internals, { ariaOrientation: this.orientation === 'horizontal' ? 'horizontal' : null });
      this.#focusGroupRef.orientation = this.orientation;
    }

    if (changedProperties.has('multiple')) {
      setDefaultAria(this, this.#internals, { ariaMultiSelectable: this.multiple ? 'true' : null });
    }

    if (changedProperties.has('value')) {
      this.#updateOptionARIA();
    }
  }

  public render(): TemplateResult {
    const classes = {
      'forge-listbox': true,
      'forge-listbox--horizontal': this.orientation === 'horizontal',
      'forge-listbox--disabled': this.disabled
    };

    return html`
      <div class=${classMap(classes)} part="container" ${focusGroup(this.#focusGroupRef)} @click=${this.#handleClick}>
        <slot @slotchange=${this.#handleSlotChange}></slot>
      </div>
    `;
  }

  // *****
  // Option Management
  // *****

  #initializeOptions(): void {
    this.#optionObserver = new MutationObserver(() => {
      this.#syncOptions();
    });
    this.#optionObserver.observe(this, { childList: true, subtree: true });
    this.#syncOptions();
  }

  #syncOptions(): void {
    // Handle option groups first
    const groups = Array.from(this.querySelectorAll('forge-option-group'));
    groups.forEach(group => {
      if (!group.hasAttribute('role')) {
        group.setAttribute('role', 'group');
      }
      const label = (group as any).label || group.getAttribute('label');
      if (label) {
        group.setAttribute('aria-label', label);
      }
    });

    // Query slotted forge-option elements
    const optionElements = Array.from(this.querySelectorAll('forge-option, [role="option"]')) as HTMLElement[];

    this._options = optionElements.map((el, index) => {
      // Ensure each option has an ID for aria-activedescendant
      if (!el.id) {
        const listboxId = this.id || 'forge-listbox';
        el.id = `${listboxId}-option-${index}`;
      }

      return {
        element: el,
        value: this.#getOptionValue(el),
        label: this.#getOptionLabel(el),
        disabled: this.#getOptionDisabled(el),
        index
      };
    });

    this.#updateOptionARIA();
    this.#focusGroupRef.update();
  }

  #updateOptionARIA(): void {
    this._options.forEach(option => {
      // Set role
      if (!option.element.hasAttribute('role')) {
        option.element.setAttribute('role', 'option');
      }

      // Set selection state
      const isSelected = this.#isOptionSelected(option.value);
      if (this.multiple) {
        option.element.setAttribute('aria-checked', String(isSelected));
      } else {
        option.element.setAttribute('aria-selected', String(isSelected));
      }

      // Set disabled state
      if (option.disabled) {
        option.element.setAttribute('aria-disabled', 'true');
      } else {
        option.element.removeAttribute('aria-disabled');
      }

      // No tabindex needed - focus stays on listbox
    });
  }

  #getOptionValue(element: HTMLElement): any {
    // Priority: 1) value property, 2) value attribute, 3) innerText
    if ((element as any).value !== undefined) {
      return (element as any).value;
    }
    if (element.hasAttribute('value')) {
      return element.getAttribute('value');
    }
    return element.textContent?.trim() || '';
  }

  #getOptionLabel(element: HTMLElement): string {
    // Priority: 1) label property, 2) label attribute, 3) innerText
    if ((element as any).label) {
      return (element as any).label;
    }
    if (element.hasAttribute('label')) {
      return element.getAttribute('label') || '';
    }
    return element.textContent?.trim() || '';
  }

  #getOptionDisabled(element: HTMLElement): boolean {
    // Check both property and attribute
    return !!(element as any).disabled || element.hasAttribute('disabled');
  }

  #isOptionSelected(value: any): boolean {
    if (this.multiple) {
      return Array.isArray(this.value) && this.value.includes(value);
    }
    return this.value === value;
  }

  #getActiveOption(): ListboxOptionData | undefined {
    const activeId = this.getAttribute('aria-activedescendant');
    if (!activeId) {
      return undefined;
    }
    return this._options.find(opt => opt.element.id === activeId);
  }

  #getOptionFromEvent(evt: Event): ListboxOptionData | undefined {
    const path = composedPathFrom(this, evt);
    const optionElement = path.find(el => el.matches && el.matches('forge-option, [role="option"]')) as HTMLElement | undefined;
    if (!optionElement) {
      return undefined;
    }
    return this._options.find(opt => opt.element === optionElement);
  }

  // *****
  // Selection Logic
  // *****

  #selectOption(value: any): void {
    if (this.disabled) {
      return;
    }

    const previousValue = this.value;
    const changeEvent = new CustomEvent<IListboxChangeEventData>(LISTBOX_CONSTANTS.events.CHANGE, {
      detail: { value, previousValue },
      bubbles: true,
      cancelable: true,
      composed: true
    });

    if (!this.dispatchEvent(changeEvent)) {
      return; // Prevented
    }

    if (this.multiple) {
      const currentValues = Array.isArray(this.value) ? [...this.value] : [];
      const index = currentValues.indexOf(value);
      if (index >= 0) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(value);
      }
      this.value = currentValues;
    } else {
      this.value = value;
    }

    this.#emitActivateEvent(value);
  }

  #emitActivateEvent(value: any): void {
    this.dispatchEvent(
      new CustomEvent<IListboxActivateEventData>(LISTBOX_CONSTANTS.events.ACTIVATE, {
        detail: { value },
        bubbles: true,
        composed: true
      })
    );
  }

  // *****
  // Event Handlers
  // *****

  #handleSlotChange(): void {
    this.#syncOptions();
  }

  #handleClick(evt: PointerEvent): void {
    const option = this.#getOptionFromEvent(evt);
    if (!option || option.disabled) {
      return;
    }

    // Update active descendant to clicked option
    this.#focusGroupRef.focus(option.element);

    // Select the option
    this.#selectOption(option.value);
  }

  #handleSpaceKey(evt: KeyboardEvent): void {
    const activeOption = this.#getActiveOption();
    if (activeOption) {
      evt.preventDefault();
      this.#selectOption(activeOption.value);
    }
  }

  #handleEnterKey(evt: KeyboardEvent): void {
    const activeOption = this.#getActiveOption();
    if (activeOption) {
      evt.preventDefault();
      this.#selectOption(activeOption.value);
    }
  }

  #handleSelectAllKey(evt: KeyboardEvent): void {
    if (!this.multiple) {
      return;
    }

    evt.preventDefault();

    const allValues = this._options.filter(opt => !opt.disabled).map(opt => opt.value);

    // Check if all are selected
    const allSelected = allValues.every(val => Array.isArray(this.value) && this.value.includes(val));

    if (allSelected) {
      // Deselect all
      this.value = [];
    } else {
      // Select all
      this.value = allValues;
    }

    const changeEvent = new CustomEvent<IListboxChangeEventData>(LISTBOX_CONSTANTS.events.CHANGE, {
      detail: { value: this.value, previousValue: this.value },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeEvent);
  }

  #handleTypeAhead(searchString: string): void {
    const match = this._options.find(opt => !opt.disabled && opt.label.toLowerCase().startsWith(searchString.toLowerCase()));
    if (match) {
      this.#focusGroupRef.focus(match.element);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-listbox': ListboxComponent;
  }

  interface HTMLElementEventMap {
    'forge-listbox-change': CustomEvent<IListboxChangeEventData>;
    'forge-listbox-activate': CustomEvent<IListboxActivateEventData>;
  }
}

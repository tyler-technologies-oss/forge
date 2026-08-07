import { createContext, provide } from '@lit/context';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { SELECT_LIKE_DISABLED, SELECT_LIKE_MULTIPLE, toggleFocusIndicator } from '../constants.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import { composedPathFrom } from '../core/utils/event-utils.js';
import { FocusGroupController } from '../core/utils/focus-group.js';
import { KeyActionController } from '../core/utils/key-action.js';
import { toggleState } from '../core/utils/utils.js';
import { OptionComponent } from '../option/option/option.js';

import styles from './listbox.scss';

export const LISTBOX_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-listbox';
export const LISTBOX_DRAGGABLE = createContext('forge-listbox-draggable');

/**
 * @tag forge-listbox
 *
 * @summary Listboxes allow users to select one or more options from a list.
 *
 * @dependency forge-option
 * @dependency forge-option-group
 *
 * @event {Event} change - Dispatches when the selection changes.
 *
 * @csspart root - The root element.
 *
 * @slot - The listbox options and option groups.
 */
@customElement(LISTBOX_TAG_NAME)
export class ListboxComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = LISTBOX_TAG_NAME;

  #internals: ElementInternals;
  #optionObserver?: MutationObserver;

  /**
   * The selected value(s).
   * @default ''
   * @attribute
   */
  @property()
  public value: string | string[] = '';

  /**
   * Whether multiple options can be selected.
   * @default false
   * @attribute
   */
  @provide({ context: SELECT_LIKE_MULTIPLE })
  @property({ type: Boolean })
  public multiple = false;

  /**
   * Whether the listbox is disabled.
   * @default false
   * @attribute
   */
  @provide({ context: SELECT_LIKE_DISABLED })
  @property({ type: Boolean })
  public disabled = false;

  /**
   * Whether the listbox allows deselecting a selection to be cleared when `multiple` is false.
   * @default false
   * @attribute allow-deselect
   */
  @property({ type: Boolean, attribute: 'allow-deselect' })
  public allowDeselect = false;

  /**
   * The orientation of the listbox.
   * @default 'vertical'
   * @attribute
   */
  @property()
  public orientation: 'vertical' | 'horizontal' = 'vertical';

  get #options(): OptionComponent[] {
    return Array.from(this.querySelectorAll<OptionComponent>('forge-option'));
  }

  // Focus group with aria-activedescendant
  #focusGroup = new FocusGroupController<OptionComponent>(this, {
    selector: 'forge-option',
    orientation: 'vertical',
    wrap: true,
    useActiveDescendant: true,
    onFocusChange: args => {
      args.newElement[toggleFocusIndicator](args.focusVisible);
      args.oldElement?.[toggleFocusIndicator](false);
      args.newElement.scrollIntoView({ block: 'nearest' });
    }
  });

  constructor() {
    super();
    this.#internals = this.attachInternals();
    new KeyActionController(this, {
      actions: [
        {
          key: ['ArrowUp', 'ArrowDown'],
          handler: evt => this.#focusGroup.fromEvent(evt, { focusVisible: true }),
          allowRepeat: true,
          allowDefault: true
        },
        { key: ['Home', 'End'], handler: evt => this.#focusGroup.fromEvent(evt, { focusVisible: true }) },
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
    this.addEventListener('blur', this.#handleBlur.bind(this));
    this.addEventListener('focus', this.#handleFocus.bind(this));
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, {
      role: 'listbox',
      ariaMultiSelectable: this.multiple ? 'true' : null,
      ariaOrientation: this.orientation === 'horizontal' ? 'horizontal' : null,
      ariaDisabled: this.disabled ? 'true' : null
    });
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#optionObserver?.disconnect();
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled')) {
      setDefaultAria(this, this.#internals, { ariaDisabled: this.disabled ? 'true' : null });
      toggleState(this.#internals, 'disabled', this.disabled);
    }

    if (changedProperties.has('orientation')) {
      setDefaultAria(this, this.#internals, { ariaOrientation: this.orientation === 'horizontal' ? 'horizontal' : null });
      this.#focusGroup.orientation = this.orientation;
    }

    if (changedProperties.has('multiple')) {
      setDefaultAria(this, this.#internals, { ariaMultiSelectable: this.multiple ? 'true' : null });
      toggleState(this.#internals, 'multiple', this.multiple);
    }

    if (changedProperties.has('value')) {
      this.#syncValue();
    }
  }

  public render(): TemplateResult {
    const classes = {
      'forge-listbox': true,
      horizontal: this.orientation === 'horizontal'
    };

    return html`
      <div class=${classMap(classes)} part="root" @click=${this.#handleClick}>
        <slot></slot>
      </div>
    `;
  }

  // *****
  // Option Management
  // *****

  #getOptionFromEvent(evt: Event): OptionComponent | undefined {
    const path = composedPathFrom(this, evt);
    return path.find(el => el.matches && el.matches('forge-option')) as OptionComponent | undefined;
  }

  // *****
  // Selection Logic
  // *****

  #selectOption(value: any): void {
    if (this.disabled) {
      return;
    }

    const changeEvent = new Event('change', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeEvent);

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
      if (this.allowDeselect && this.value === value) {
        this.value = '';
      } else {
        this.value = value;
      }
    }
  }

  #syncValue(): void {
    const value = Array.isArray(this.value) ? this.value : [this.value];
    this.#options.forEach(opt => {
      opt.selected = value.includes(opt.value);
    });
  }

  // *****
  // Event Handlers
  // *****

  #handleBlur(): void {
    const activeOption = this.#focusGroup.currentElement;
    if (activeOption) {
      (activeOption as OptionComponent)[toggleFocusIndicator](false);
    }
  }

  #handleFocus(): void {
    const activeOption = this.#focusGroup.currentElement;
    if (activeOption) {
      (activeOption as OptionComponent)[toggleFocusIndicator](true);
    }
  }

  #handleClick(evt: PointerEvent): void {
    const option = this.#getOptionFromEvent(evt);
    if (!option || option.disabled) {
      return;
    }

    // Update active descendant to clicked option
    this.#focusGroup.focus(option, { focusVisible: false });

    // Select the option
    this.#selectOption(option.value);
  }

  #handleSpaceKey(evt: KeyboardEvent): void {
    const activeOption = this.#focusGroup.currentElement;
    if (activeOption) {
      evt.preventDefault();
      this.#selectOption(activeOption.value);
    }
  }

  #handleEnterKey(evt: KeyboardEvent): void {
    const activeOption = this.#focusGroup.currentElement;
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

    const allValues = this.#options.filter(opt => !opt.disabled).map(opt => opt.value);

    // Check if all are selected
    const allSelected = allValues.every(val => Array.isArray(this.value) && this.value.includes(val));

    if (allSelected) {
      // Deselect all
      this.value = '';
    } else {
      // Select all
      this.value = allValues;
    }

    const changeEvent = new Event('change', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeEvent);
  }

  #handleTypeAhead(searchString: string): void {
    const enabledOptions = this.#options.filter(opt => !opt.disabled);
    const optionsWithLabels = enabledOptions.map(opt => ({ el: opt, label: opt.label || '' }));
    const match = optionsWithLabels.find(opt => opt.label.toLowerCase().startsWith(searchString.toLowerCase()));
    if (match) {
      this.#focusGroup.focus(match.el, { focusVisible: true });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-listbox': ListboxComponent;
  }
}

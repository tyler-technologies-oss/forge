import { createContext, provide } from '@lit/context';
import { CUSTOM_ELEMENT_NAME_PROPERTY, randomChars } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { SELECT_LIKE_DISABLED, SELECT_LIKE_MULTIPLE, toggleFocusIndicator } from '../constants.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { DragController } from '../core/controllers/drag-controller.js';
import { DropArgs, DropController } from '../core/controllers/drop-controller.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import { composedPathFrom } from '../core/utils/event-utils.js';
import { FocusGroupController } from '../core/utils/focus-group.js';
import { KeyActionController } from '../core/utils/key-action.js';
import { toggleState } from '../core/utils/utils.js';
import { OptionComponent } from '../option/option/option.js';

import styles from './listbox.scss';

export const LISTBOX_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-listbox';

export const LISTBOX_DRAGGABLE = createContext('forge-listbox-draggable');
export const LISTBOX_REORDERABLE = createContext('forge-listbox-reorderable');

export interface IListboxDropData {
  value: string;
  index: number;
  source: string;
}

interface IListboxDataTransfer {
  value: string;
  source: string;
}

/**
 * @tag forge-listbox
 *
 * @summary Listboxes allow users to select one or more options from a list.
 *
 * @dependency forge-option
 * @dependency forge-option-group
 *
 * @event {Event} change - Dispatches when the selection changes.
 * @event {CustomEvent<IListboxDropData>} forge-listbox-drop - Dispatches when an option is dropped
 * into the listbox.
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
   * Whether options can be reordered within the listbox via drag and drop.
   * @default false
   * @attribute
   */
  @provide({ context: LISTBOX_REORDERABLE })
  @property({ type: Boolean })
  public reorderable = false;

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
  #dragController = new DragController(this, {
    onSetTransferData: ({ dataTransfer, dragItem }) => {
      if (!(dragItem instanceof HTMLElement) || dragItem.tagName !== 'FORGE-OPTION') {
        return;
      }
      const option = dragItem as OptionComponent;
      const data = JSON.stringify({
        value: option.value,
        source: this.id
      } satisfies IListboxDataTransfer);
      dataTransfer.setData('text/plain', data);
    }
  });
  #dropController = new DropController(this, {
    childSelector: 'forge-option',
    orientation: 'vertical',
    onDragEnter: () => this.#insertPlaceholder(),
    onDragOver: () => this.#updatePlaceholderPosition(),
    onDragLeave: () => this.#removePlaceholder(),
    onDrop: args => this.#handleDrop(args),
    onCreatePlaceholder: () => this.#createPlaceholder()
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
    this.id ||= `${LISTBOX_TAG_NAME}-${randomChars(8)}`;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
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

    if (changedProperties.has('reorderable')) {
      this.#dragController.setEnabled(this.reorderable);
      this.#dropController.setEnabled(this.reorderable);
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

  #selectOption(value: string): void {
    if (this.disabled) {
      return;
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
      if (this.allowDeselect && this.value === value) {
        this.value = '';
      } else {
        this.value = value;
      }
    }

    const changeEvent = new Event('change', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeEvent);
  }

  /**
   * Synchronizes the selected state of options with the current value.
   * Uses Set optimized performance instead of Array.includes.
   */
  #syncValue(): void {
    const valueSet = new Set(Array.isArray(this.value) ? this.value : [this.value]);
    this.#options.forEach(opt => {
      opt.selected = valueSet.has(opt.value);
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

    this.#focusGroup.focus(option, { focusVisible: false });
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

    // Check if all are selected using Set for optimized performance
    const valueSet = new Set(Array.isArray(this.value) ? this.value : []);
    const allSelected = allValues.every(val => valueSet.has(val));

    if (allSelected) {
      // Deselect all
      this.value = [];
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

  #handleDrop(args: DropArgs): void {
    this.#removePlaceholder();

    let data: IListboxDataTransfer;
    try {
      data = JSON.parse(args.dataTransfer.getData('text/plain'));
    } catch {
      console.warn('[forge-listbox] Invalid drop data: expected JSON format');
      return;
    }

    const dropData: IListboxDropData = {
      value: data.value,
      index: args.insertionIndex,
      source: data.source
    };
    this.dispatchEvent(new CustomEvent<IListboxDropData>('forge-listbox-drop', { detail: dropData, bubbles: true, composed: true }));
  }

  #createPlaceholder(): HTMLElement {
    const placeholder = document.createElement('div');
    placeholder.className = 'forge-listbox-placeholder';
    placeholder.setAttribute('role', 'presentation');
    placeholder.setAttribute('aria-hidden', 'true');
    placeholder.style.height = '48px';
    placeholder.style.border = 'var(--forge-border-thin) dashed var(--forge-theme-primary)';
    placeholder.style.borderRadius = 'var(--forge-option-border-radius)';
    placeholder.style.pointerEvents = 'none';
    placeholder.style.boxSizing = 'border-box';
    placeholder.style.backgroundColor = 'var(--forge-theme-primary-container-minimum)';

    return placeholder;
  }

  /**
   * Inserts the placeholder element into the DOM manually.
   * This approach bypasses Lit's rendering cycle to avoid re-renders during drag operations,
   * which improves performance and prevents flickering.
   */
  #insertPlaceholder(): void {
    if (!this.#dropController.dragOver) {
      return;
    }

    const placeholder = this.#dropController.placeholder;
    const insertionIndex = this.#dropController.insertionIndex;

    if (!placeholder || insertionIndex === null) {
      return;
    }

    const options = this.#options;
    if (insertionIndex === 0) {
      this.insertBefore(placeholder, options[0] || null);
    } else if (insertionIndex < options.length) {
      this.insertBefore(placeholder, options[insertionIndex]);
    } else {
      this.appendChild(placeholder);
    }
  }

  #updatePlaceholderPosition(): void {
    this.#removePlaceholder();
    this.#insertPlaceholder();
  }

  #removePlaceholder(): void {
    const placeholders = Array.from(this.querySelectorAll('.forge-listbox-placeholder'));
    placeholders.forEach(placeholder => placeholder.remove());
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-listbox': ListboxComponent;
  }
  interface HTMLElementEventMap {
    'forge-listbox-drop': CustomEvent<IListboxDropData>;
  }
}

import { createContext, provide } from '@lit/context';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { SELECT_LIKE_DISABLED, SELECT_LIKE_MULTIPLE, toggleFocusIndicator } from '../constants.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { DragController } from '../core/controllers/drag-controller.js';
import { DropController, DropEventArgs } from '../core/controllers/drop-controller.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import { composedPathFrom } from '../core/utils/event-utils.js';
import { FocusGroupController } from '../core/utils/focus-group.js';
import { KeyActionController } from '../core/utils/key-action.js';
import { toggleState } from '../core/utils/utils.js';
import type { OptionGroupComponent } from '../option/option-group/index.js';
import type { OptionComponent } from '../option/option/index.js';

import styles from './listbox.scss';

export const LISTBOX_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-listbox';

export const LISTBOX_ALLOW_DRAG_OUT = createContext('forge-listbox-allow-drag-out');
export const LISTBOX_DRAGGABLE = createContext('forge-listbox-draggable');
export const LISTBOX_REORDERABLE = createContext('forge-listbox-reorderable');

export interface IListboxDropData {
  option: OptionComponent;
  group?: OptionGroupComponent;
  index: number;
  source: ListboxComponent;
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
 * @event {CustomEvent<OtionComponent>} forge-listbox-drag-out - Dispatches when an option is dragged out of
 * the listbox. Contains the value of the dragged option.
 * @event {CustomEvent<IListboxDropData>} forge-listbox-drop - Dispatches when an option is dropped
 * into the listbox. Contains the value of the dropped option, the index where it was dropped, and
 * the source listbox id.
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
   * Whether options in this listbox can be dragged to other listboxes.
   * @default false
   * @attribute allow-drag-out
   */
  @provide({ context: LISTBOX_ALLOW_DRAG_OUT })
  @property({ type: Boolean, attribute: 'allow-drag-out' })
  public allowDragOut = false;

  /**
   * A space-separated list of the ids of listboxes that are allowed to drop into this listbox.
   * @default ''
   * @attribute allow-drop-from
   */
  @property({ attribute: 'allow-drop-from' })
  public allowDropFrom = '';

  /**
   * An array of listbox elements that are allowed to drop options into this listbox.
   * @default []
   */
  @property({ attribute: false })
  public set allowDropFromElements(elements: ListboxComponent[]) {
    this.#allowDropFromElements = [...elements];
  }
  public get allowDropFromElements(): ListboxComponent[] {
    if (this.#allowDropFromElements?.length) {
      return [...this.#allowDropFromElements];
    }
    if (!this.allowDropFrom) {
      return [];
    }
    const ids = this.allowDropFrom
      .split(/\s+/)
      .filter(Boolean)
      .map(id => `#${id}`)
      .join(',');
    const selector = `:is(${ids})`;
    return Array.from(this.ownerDocument.querySelectorAll<ListboxComponent>(selector)) ?? undefined;
  }
  #allowDropFromElements: typeof this.allowDropFromElements = [];

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
    getSourceElement: () => this
  });

  #dropController = new DropController(this, {
    childSelector: 'forge-option',
    orientation: 'vertical',
    getIndex: event => this.#getInsertionIndex(event),
    onDragStart: args => this.#handleDragStart(args),
    onDragEnter: () => this.#insertPlaceholder(),
    onDragOver: () => this.#updatePlaceholderPosition(),
    onDragLeave: () => this.#handleDragLeave(),
    onDrop: args => this.#handleDrop(args)
  });

  // Drag & drop variables
  #placeholder: HTMLElement;
  #dropGroup: OptionGroupComponent | null = null;

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
    this.#placeholder = this.#createPlaceholder();
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

    if (changedProperties.has('reorderable') || changedProperties.has('allowDragOut') || changedProperties.has('allowDropFromElements')) {
      this.#dragController.setEnabled(this.reorderable || this.allowDragOut);
      this.#dropController.setEnabled(this.reorderable || !!this.#allowDropFromElements.length);
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
      activeOption[toggleFocusIndicator](false);
    }
  }

  #handleFocus(): void {
    const activeOption = this.#focusGroup.currentElement;
    if (activeOption) {
      activeOption[toggleFocusIndicator](true);
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
    const optionsWithTextContent = enabledOptions.map(opt => ({ el: opt, text: opt.textContent?.trim() || '' }));
    const match = optionsWithTextContent.find(opt => opt.text.toLowerCase().startsWith(searchString.toLowerCase()));
    if (match) {
      this.#focusGroup.focus(match.el, { focusVisible: true });
    }
  }

  // *****
  // Drag & Drop Logic
  // *****

  #handleDragStart(args: DropEventArgs): boolean {
    // Ensure the item being dragged is a forge-option and the source is a forge-listbox
    const { item, source } = args;
    if (!item || item.tagName.toLowerCase() !== 'forge-option' || !source || source.tagName.toLowerCase() !== LISTBOX_TAG_NAME) {
      return false;
    }
    // Allow drop if the source is this listbox and reordering is enabled, or if the source allows
    // drag out is in the allowed drop sources
    if (
      (this.reorderable && source === this) ||
      ((source as ListboxComponent).allowDragOut && this.allowDropFromElements.includes(source as ListboxComponent))
    ) {
      return true;
    }
    return false;
  }

  #handleDragLeave(): void {
    this.#removePlaceholder();
    this.#dropGroup = null;
  }

  #handleDrop(args: DropEventArgs): void {
    this.#removePlaceholder();

    const { item, source } = args;
    if (!item || !source) {
      return;
    }

    // Emit the drop event from this listbox
    const dropData: IListboxDropData = {
      option: item as OptionComponent,
      group: this.#dropGroup ?? undefined,
      index: args.index,
      source: source as ListboxComponent
    };
    this.dispatchEvent(new CustomEvent<IListboxDropData>('forge-listbox-drop', { detail: dropData, bubbles: true, composed: true }));

    // Emit the drag-out event from the source listbox
    source.dispatchEvent(new CustomEvent('forge-listbox-drag-out', { detail: item, bubbles: true, composed: true }));
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
    const placeholder = this.#placeholder;
    const insertionIndex = this.#dropController.insertionIndex;

    if (!placeholder || insertionIndex === null || insertionIndex < 0) {
      return;
    }

    const parent = this.#dropGroup || this;
    if (insertionIndex === 0) {
      parent.insertBefore(placeholder, parent.children[0] || null);
    } else if (insertionIndex < parent.children.length) {
      parent.insertBefore(placeholder, parent.children[insertionIndex]);
    } else {
      parent.appendChild(placeholder);
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

  #getInsertionIndex(event: DragEvent): number {
    const parent = this.#getGroupFromCursorPosition(event) || this;
    const children = Array.from(parent.querySelectorAll<OptionComponent>('forge-option'));

    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      const midpoint = (rect.top + rect.bottom) / 2;

      if (event.clientY < midpoint) {
        return i;
      }
    }

    return children.length;
  }

  #getGroupFromCursorPosition(event: DragEvent): OptionGroupComponent | null {
    const groups = Array.from(this.querySelectorAll<OptionGroupComponent>('forge-option-group'));
    const targetGroup =
      groups.find(group => {
        const rect = group.getBoundingClientRect();
        return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      }) ?? null;
    this.#dropGroup = targetGroup;
    return targetGroup;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-listbox': ListboxComponent;
  }
  interface HTMLElementEventMap {
    'forge-listbox-drag-out': CustomEvent<OptionComponent>;
    'forge-listbox-drop': CustomEvent<IListboxDropData>;
  }
}

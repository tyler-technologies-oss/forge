import { createContext, provide } from '@lit/context';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SELECT_LIKE_DISABLED, SELECT_LIKE_MULTIPLE, SELECT_LIKE_READONLY, toggleFocusIndicator } from '../constants.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { DragController } from '../core/controllers/drag-controller.js';
import { DropController, DropEventArgs } from '../core/controllers/drop-controller.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import { composedPathFrom } from '../core/utils/event-utils.js';
import { FocusGroupController } from '../core/utils/focus-group.js';
import { FormRestoreReason, FormRestoreState } from '../core/utils/form-utils.js';
import { KeyActionController } from '../core/utils/key-action.js';
import { toggleState } from '../core/utils/utils.js';
import type { OptionGroupComponent } from '../option/option-group/index.js';
import type { OptionComponent, OptionUpdateReason } from '../option/option/index.js';

import styles from './listbox.scss';

export const LISTBOX_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-listbox';

const OPTION_SELECTOR = 'forge-option';

export const LISTBOX_DENSE = createContext<boolean>('forge-listbox-dense');
export const LISTBOX_DRAG_OUT = createContext<boolean>('forge-listbox-drag-out');
export const LISTBOX_REORDERABLE = createContext<boolean>('forge-listbox-reorderable');

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
 * @description
 * Listboxes are form-associated and support native form submission via `name`, constraint
 * validation via `required`, and read-only presentation via `readonly`.
 *
 * @dependency forge-option
 * @dependency forge-option-group
 *
 * @event {Event} input - Dispatches when the selection changes.
 * @event {Event} change - Dispatches when the selection changes.
 * @event {CustomEvent<OptionComponent>} forge-listbox-drag-out - Dispatches when an option is dragged out of
 * the listbox. Contains the value of the dragged option.
 * @event {CustomEvent<IListboxDropData>} forge-listbox-drop - Dispatches when an option is dropped
 * into the listbox. Contains the value of the dropped option, the index where it was dropped, and
 * the source listbox id.
 *
 * @cssproperty --forge-listbox-divider-margin - The margin around a slotted divider.
 * @cssproperty --forge-listbox-group-margin - The spacing between slotted option groups.
 *
 * @csspart root - The root element.
 *
 * @state disabled - Applied when the listbox is disabled.
 * @state multiple - Applied when the listbox allows multiple selection.
 * @state readonly - Applied when the listbox is readonly.
 *
 * @slot - The listbox options and option groups.
 */
@customElement(LISTBOX_TAG_NAME)
export class ListboxComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);
  public static formAssociated = true;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = LISTBOX_TAG_NAME;

  #internals: ElementInternals;
  #validationHelper: HTMLSelectElement;
  #defaultValue: string | string[] = '';
  #isReconciling = false;
  #optionsObserver: MutationObserver;

  /**
   * The selected value(s).
   * @default ''
   * @attribute
   */
  @property()
  public value: string | string[] = '';

  /**
   * The name of the listbox, submitted with form data.
   * @default ''
   * @attribute
   */
  @property({ reflect: true })
  public name = '';

  /**
   * Whether a selection is required for the listbox to be considered valid.
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public required = false;

  /**
   * Whether the listbox is readonly. When readonly, the listbox can still be focused and its
   * value is still submitted with a form, but the user cannot change the selection.
   * @default false
   * @attribute
   */
  @provide({ context: SELECT_LIKE_READONLY })
  @property({ type: Boolean })
  public readonly = false;

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
   * @attribute drag-out
   */
  @provide({ context: LISTBOX_DRAG_OUT })
  @property({ type: Boolean, attribute: 'drag-out' })
  public dragOut = false;

  /**
   * A space-separated list of the ids of listboxes that are allowed to drop into this listbox.
   * @default ''
   * @attribute drop-from
   */
  @property({ attribute: 'drop-from' })
  public dropFrom = '';

  /**
   * An array of listbox elements that are allowed to drop options into this listbox.
   * @default []
   */
  @property({ attribute: false })
  public set dropFromElements(elements: ListboxComponent[]) {
    this.#dropFromElements = [...elements];
  }
  public get dropFromElements(): ListboxComponent[] {
    if (this.#dropFromElements?.length) {
      return [...this.#dropFromElements];
    }
    if (!this.dropFrom) {
      return [];
    }
    const ids = this.dropFrom
      .split(/\s+/)
      .filter(Boolean)
      .map(id => `#${id}`)
      .join(',');
    const selector = `:is(${ids})`;
    return Array.from(this.ownerDocument.querySelectorAll<ListboxComponent>(selector)) ?? undefined;
  }
  #dropFromElements: typeof this.dropFromElements = [];

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
   * Whether the listbox's options use a dense layout.
   * @default false
   * @attribute
   */
  @provide({ context: LISTBOX_DENSE })
  @property({ type: Boolean })
  public dense = false;

  get #options(): OptionComponent[] {
    return Array.from(this.querySelectorAll<OptionComponent>(OPTION_SELECTOR));
  }

  #focusGroup = new FocusGroupController<OptionComponent>(this, {
    selector: OPTION_SELECTOR,
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
    childSelector: OPTION_SELECTOR,
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
  #dropGroup?: OptionGroupComponent;

  // The most recently selected option, used as the anchor for shift+space range selection
  #selectionAnchor?: OptionComponent;

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.#validationHelper = document.createElement('select');
    this.#validationHelper.appendChild(document.createElement('option'));
    this.#optionsObserver = new MutationObserver(records => this.#handleOptionsMutation(records));
    new KeyActionController(this, {
      actions: [
        {
          key: [
            { key: 'ArrowDown', modifier: 'shift' },
            { key: 'ArrowUp', modifier: 'shift' }
          ],
          handler: this.#handleShiftArrowKey.bind(this),
          allowRepeat: true
        },
        {
          key: ['ArrowUp', 'ArrowDown'],
          handler: evt => this.#focusGroup.fromEvent(evt, { focusVisible: true }),
          allowRepeat: true,
          allowDefault: true
        },
        {
          key: [
            { key: 'Home', modifier: ['ctrl', 'shift'] },
            { key: 'Home', modifier: ['meta', 'shift'] },
            { key: 'End', modifier: ['ctrl', 'shift'] },
            { key: 'End', modifier: ['meta', 'shift'] }
          ],
          handler: this.#handleShiftHomeEndKey.bind(this)
        },
        { key: ['Home', 'End'], handler: evt => this.#focusGroup.fromEvent(evt, { focusVisible: true }) },
        { key: { key: ' ', modifier: 'shift' }, handler: this.#handleShiftSpaceKey.bind(this) },
        { key: [' ', 'Enter'], handler: this.#handleSelectKey.bind(this) },
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
    this.addEventListener('forge-option-update', this.#handleOptionUpdate.bind(this));
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    queueMicrotask(() => this.#captureDefaultValue());
    setDefaultAria(this, this.#internals, {
      role: 'listbox',
      ariaMultiSelectable: this.multiple ? 'true' : null,
      ariaOrientation: 'horizontal',
      ariaDisabled: this.disabled ? 'true' : null,
      ariaReadOnly: this.readonly ? 'true' : null
    });
    this.#optionsObserver.observe(this, { childList: true, subtree: true });
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#optionsObserver.disconnect();
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled')) {
      setDefaultAria(this, this.#internals, { ariaDisabled: this.disabled ? 'true' : null });
      toggleState(this.#internals, 'disabled', this.disabled);
    }

    if (changedProperties.has('readonly')) {
      setDefaultAria(this, this.#internals, { ariaReadOnly: this.readonly ? 'true' : null });
    }

    if (changedProperties.has('multiple')) {
      setDefaultAria(this, this.#internals, { ariaMultiSelectable: this.multiple ? 'true' : null });
      toggleState(this.#internals, 'multiple', this.multiple);
    }

    if (changedProperties.has('value')) {
      this.#syncValue();
    }

    if (changedProperties.has('value') || changedProperties.has('required') || changedProperties.has('name')) {
      this.#updateFormValue();
    }

    if (changedProperties.has('reorderable') || changedProperties.has('dragOut') || changedProperties.has('dropFromElements')) {
      this.#dragController.setEnabled(this.reorderable || this.dragOut);
      this.#dropController.setEnabled(this.reorderable || !!this.dropFromElements.length);
    }

    if (changedProperties.has('dense')) {
      this.#setPlaceholderHeight();
    }
  }

  public render(): TemplateResult {
    return html`
      <div class="forge-listbox" part="root" @click=${this.#handleClick}>
        <slot></slot>
      </div>
    `;
  }

  // *****
  // Option Management
  // *****

  #getOptionFromEvent(evt: Event): OptionComponent | undefined {
    const path = composedPathFrom(this, evt);
    return path.find(el => el.matches && el.matches(OPTION_SELECTOR)) as OptionComponent | undefined;
  }

  #getGroupFromDragEvent(evt: DragEvent): OptionGroupComponent | undefined {
    const groups = Array.from(this.querySelectorAll<OptionGroupComponent>('forge-option-group'));
    const targetGroup = groups.find(group => {
      const rect = group.getBoundingClientRect();
      return evt.clientX >= rect.left && evt.clientX <= rect.right && evt.clientY >= rect.top && evt.clientY <= rect.bottom;
    });
    return targetGroup;
  }

  // *****
  // Selection Logic
  // *****

  async #selectOption(option: OptionComponent): Promise<void> {
    if (this.disabled || this.readonly) {
      return;
    }

    this.#emitInputEvent();
    if (!this.#emitChangeEvent()) {
      return;
    }

    const value = option.value;

    if (this.multiple) {
      const currentValues = Array.isArray(this.value) ? [...this.value] : [];
      const index = currentValues.indexOf(value);
      if (index >= 0) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(value);
        this.#selectionAnchor = option;
      }
      this.value = currentValues;
    } else {
      if (this.allowDeselect && this.value === value) {
        this.value = '';
      } else {
        this.value = value;
        this.#selectionAnchor = option;
      }
    }
  }

  /**
   * Selects all selectable options between (and including) `fromOption` and `toOption`, in
   * addition to any options that are already selected.
   */
  async #selectRange(fromOption: OptionComponent, toOption: OptionComponent): Promise<void> {
    const options = this.#options;
    const fromIndex = options.indexOf(fromOption);
    const toIndex = options.indexOf(toOption);
    if (fromIndex === -1 || toIndex === -1) {
      return;
    }

    const [start, end] = fromIndex <= toIndex ? [fromIndex, toIndex] : [toIndex, fromIndex];
    const rangeOptions = options.slice(start, end + 1).filter(opt => this.#optionIsSelectable(opt));
    if (!rangeOptions.length) {
      return;
    }

    this.#emitInputEvent();
    if (!this.#emitChangeEvent()) {
      return;
    }

    const valueSet = new Set(Array.isArray(this.value) ? this.value : []);
    rangeOptions.forEach(opt => valueSet.add(opt.value));
    this.value = options.filter(opt => valueSet.has(opt.value)).map(opt => opt.value);
  }

  #emitChangeEvent(): boolean {
    const changeEvent = new Event('change', {
      bubbles: true,
      cancelable: true,
      composed: true
    });
    this.dispatchEvent(changeEvent);

    if (changeEvent.defaultPrevented) {
      changeEvent.preventDefault();
      return false;
    }
    return true;
  }

  #emitInputEvent(): void {
    const inputEvent = new Event('input', {
      bubbles: true,
      cancelable: false,
      composed: true
    });
    this.dispatchEvent(inputEvent);
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

  /**
   * Captures a snapshot of the listbox's default value, used to restore the value on
   * `formResetCallback()`. Prefers the `value` attribute if present, otherwise derives the
   * default from any options that are declaratively marked `selected`.
   */
  #captureDefaultValue(): void {
    if (this.hasAttribute('value')) {
      this.#defaultValue = this.multiple ? (Array.isArray(this.value) ? [...this.value] : [this.value].filter(Boolean)) : this.value;
      return;
    }

    const selectedOptions = this.#options.filter(opt => opt.selected);
    this.#defaultValue = this.multiple ? selectedOptions.map(opt => opt.value) : (selectedOptions.at(-1)?.value ?? '');
  }

  #handleOptionUpdate(evt: CustomEvent<{ reason: OptionUpdateReason }>): void {
    if (this.#isReconciling) {
      return;
    }
    if (!this.multiple && evt.detail.reason === 'selected' && evt.target instanceof HTMLElement && evt.target.matches(OPTION_SELECTOR)) {
      this.#reconcileValueFromOptions(evt.target as OptionComponent);
      return;
    }
    this.#reconcileValueFromOptions();
  }

  #handleOptionsMutation(records: MutationRecord[]): void {
    if (this.#isReconciling) {
      return;
    }
    const hasOptionRemoval = records.some(record => Array.from(record.removedNodes).some(node => this.#containsOption(node)));
    if (hasOptionRemoval) {
      this.#reconcileValueFromOptions();
    }
  }

  #containsOption(node: Node): boolean {
    if (!(node instanceof Element)) {
      return false;
    }
    return node.matches(OPTION_SELECTOR) || !!node.querySelector(OPTION_SELECTOR);
  }

  /**
   * Recomputes `value` from the live selected state of all options. This keeps `value` in sync
   * whether selection was changed via the listbox's own API, directly on an option, or by
   * adding/removing option elements.
   * @param justSelected In single-select mode, an option that was just marked `selected` directly
   * takes precedence over any other options that may still be marked `selected` from before,
   * matching native `<select>`/`<option selected>` last-wins semantics.
   */
  #reconcileValueFromOptions(justSelected?: OptionComponent): void {
    const selectedOptions = this.#options.filter(opt => opt.selected);
    this.#isReconciling = true;
    try {
      this.value = this.multiple ? selectedOptions.map(opt => opt.value) : (justSelected?.value ?? selectedOptions.at(-1)?.value ?? '');
    } finally {
      this.#isReconciling = false;
    }
  }

  /**
   * Updates the form value and validity whenever `value`, `required`, or `name` change.
   */
  #updateFormValue(): void {
    const values = Array.isArray(this.value) ? this.value : this.value ? [this.value] : [];

    const formValue = values.length ? new FormData() : null;
    if (formValue) {
      values.forEach(v => formValue.append(this.name, v));
    }

    const state = new FormData();
    state.append('multiple', String(this.multiple));
    values.forEach(v => state.append('value', v));

    this.#internals.setFormValue(formValue, state);
    this.#setValidity();
  }

  get #hasValue(): boolean {
    return Array.isArray(this.value) ? this.value.length > 0 : !!this.value;
  }

  #setValidity(): void {
    this.#internals.setValidity({ valueMissing: this.required && !this.#hasValue }, this.#getValidationMessage());
  }

  #getValidationMessage(): string {
    if (this.#internals.validity.customError) {
      return this.#internals.validationMessage;
    }

    this.#validationHelper.required = this.required;
    this.#validationHelper.selectedIndex = this.#hasValue ? 0 : -1;

    return this.#validationHelper.validationMessage;
  }

  // *****
  // Form Association
  // *****

  public get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  public get labels(): NodeList {
    return this.#internals.labels;
  }

  public get validity(): ValidityState {
    return this.#internals.validity;
  }

  public get validationMessage(): string {
    return this.#internals.validationMessage;
  }

  public get willValidate(): boolean {
    return this.#internals.willValidate;
  }

  public checkValidity(): boolean {
    return this.#internals.checkValidity();
  }

  public reportValidity(): boolean {
    return this.#internals.reportValidity();
  }

  public setCustomValidity(error: string): void {
    this.#internals.setValidity({ customError: !!error }, error);
  }

  public formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  public formResetCallback(): void {
    this.value = this.#defaultValue;
  }

  public formStateRestoreCallback(state: FormRestoreState | null, _reason: FormRestoreReason): void {
    if (state instanceof FormData) {
      const multiple = state.get('multiple') === 'true';
      const values = state.getAll('value') as string[];
      this.multiple = multiple;
      this.value = multiple ? values : (values[0] ?? '');
    }
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

  #handleClick(evt: PointerEvent): void {
    const option = this.#getOptionFromEvent(evt);
    if (!option || !this.#optionIsSelectable(option)) {
      return;
    }

    this.#focusGroup.focus(option, { focusVisible: false });
    this.#selectOption(option);
  }

  #handleSelectKey(evt: KeyboardEvent): void {
    const activeOption = this.#focusGroup.currentElement;
    if (activeOption && this.#optionIsSelectable(activeOption)) {
      evt.preventDefault();
      this.#selectOption(activeOption);
    }
  }

  #handleShiftArrowKey(evt: KeyboardEvent): boolean | void {
    if (!this.multiple || this.disabled || this.readonly) {
      return true;
    }

    if (evt.key === 'ArrowDown') {
      this.#focusGroup.focusNext({ focusVisible: true });
    } else {
      this.#focusGroup.focusPrevious({ focusVisible: true });
    }

    const activeOption = this.#focusGroup.currentElement;
    if (activeOption && this.#optionIsSelectable(activeOption)) {
      this.#selectOption(activeOption);
    }
  }

  #handleShiftSpaceKey(_evt: KeyboardEvent): boolean | void {
    if (!this.multiple || this.disabled || this.readonly) {
      return true;
    }

    const activeOption = this.#focusGroup.currentElement;
    if (!activeOption || !this.#optionIsSelectable(activeOption)) {
      return;
    }

    this.#selectRange(this.#selectionAnchor ?? activeOption, activeOption);
  }

  #handleShiftHomeEndKey(evt: KeyboardEvent): boolean | void {
    if (!this.multiple || this.disabled || this.readonly) {
      return true;
    }

    const activeOption = this.#focusGroup.currentElement;
    const options = this.#options;
    const targetOption = evt.key === 'Home' ? options[0] : options.at(-1);
    if (!activeOption || !targetOption) {
      return;
    }

    this.#selectRange(activeOption, targetOption);
    this.#focusGroup.focus(targetOption, { focusVisible: true });
  }

  #handleSelectAllKey(evt: KeyboardEvent): void {
    if (!this.multiple || this.disabled || this.readonly) {
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

    this.#emitChangeEvent();
  }

  #handleTypeAhead(searchString: string): void {
    const enabledOptions = this.#options.filter(opt => !opt.disabled);
    const optionsWithTextContent = enabledOptions.map(opt => ({ el: opt, text: opt.textContent?.trim() || '' }));
    const match = optionsWithTextContent.find(opt => opt.text.toLowerCase().startsWith(searchString.toLowerCase()));
    if (match) {
      this.#focusGroup.focus(match.el, { focusVisible: true });
    }
  }

  #optionIsSelectable(option: OptionComponent): boolean {
    return !option.disabled && !this.disabled && !this.readonly;
  }

  // *****
  // Drag & Drop Logic
  // *****

  #handleDragStart(args: DropEventArgs): boolean {
    // Ensure the item being dragged is a forge-option and the source is a forge-listbox
    const { item, source } = args;
    if (!item || item.tagName.toLowerCase() !== OPTION_SELECTOR || !source || source.tagName.toLowerCase() !== LISTBOX_TAG_NAME) {
      return false;
    }
    // Allow drop if the source is this listbox and reordering is enabled, or if the source allows
    // drag out is in the allowed drop sources
    if ((this.reorderable && source === this) || ((source as ListboxComponent).dragOut && this.dropFromElements.includes(source as ListboxComponent))) {
      return true;
    }
    return false;
  }

  #handleDragLeave(): void {
    this.#removePlaceholder();
    this.#dropGroup = undefined;
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
    placeholder.style.border = 'var(--forge-border-thin) dashed var(--forge-theme-primary)';
    placeholder.style.borderRadius = 'var(--forge-option-border-radius)';
    placeholder.style.pointerEvents = 'none';
    placeholder.style.boxSizing = 'border-box';
    placeholder.style.backgroundColor = 'var(--forge-theme-primary-container-minimum)';
    this.#setPlaceholderHeight(placeholder);

    return placeholder;
  }

  #setPlaceholderHeight(placeholder?: HTMLElement): void {
    const target = placeholder || this.#placeholder;
    target.style.height = this.dense ? '32px' : '48px';
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
    const parent = this.#getGroupFromDragEvent(event) || this;
    const children = Array.from(parent.querySelectorAll('*'));

    this.#dropGroup = parent === this ? undefined : (parent as OptionGroupComponent);

    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      const midpoint = (rect.top + rect.bottom) / 2;

      if (event.clientY < midpoint) {
        return i;
      }
    }

    return children.length;
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

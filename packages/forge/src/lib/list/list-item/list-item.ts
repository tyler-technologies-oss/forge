import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, isDeepEqual, tryDefine } from '@tylertech/forge-core';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { composedPathFrom } from '../../core/utils/event-utils.js';
import { removeDefaultAttribute } from '../../core/utils/lit-utils.js';
import { FocusIndicatorComponent } from '../../focus-indicator/focus-indicator.js';
import { StateLayerComponent } from '../../state-layer/state-layer.js';
import { LIST_CONSTANTS } from '../list/list-constants.js';
import { IListItemSelectEventData, LIST_ITEM_CONSTANTS, ListItemFocusPropagation } from './list-item-constants.js';

import styles from './list-item.scss';

export interface IListItemProperties<T = unknown> {
  selected: boolean;
  active: boolean;
  value: T;
  dense: boolean;
  indented: boolean;
  twoLine: boolean;
  threeLine: boolean;
  wrap: boolean;
  noninteractive: boolean;
  focusPropagation: ListItemFocusPropagation;
}

/** @deprecated - This will be removed in the future. Please switch to using ListItemComponent. */
export interface IListItemComponent<T = unknown> extends IListItemProperties<T>, BaseLitElement {}

/**
 * @tag forge-list-item
 *
 * @summary List items are individual rows of content inside of a list.
 *
 * @dependency forge-focus-indicator
 * @dependency forge-state-layer
 *
 * @event {CustomEvent<IListItemSelectEventData>} forge-list-item-select - Fires when the list item is selected.
 *
 * @slot - The primary text.
 * @slot secondary-text - The secondary text.
 * @slot tertiary-text - The tertiary text.
 * @slot start - The start content.
 * @slot end - The end element.
 * @slot additional-content - Additional content that appears below the main list item interactive area.
 *
 * @csspart root - The root container element.
 * @csspart text-container - The container for the text content.
 * @csspart focus-indicator - The forwarded focus indicator's internal indicator element.
 * @csspart state-layer - The forwarded state layer's internal surface element.
 *
 * @cssproperty --forge-list-item-background - The background color.
 * @cssproperty --forge-list-item-shape - The shape of the list item.
 * @cssproperty --forge-list-item-padding - The padding inside of the container element.
 * @cssproperty --forge-list-item-wrap-padding - The padding inside of the container element when `wrap` is enabled.
 * @cssproperty --forge-list-item-margin - The margin around the host element.
 * @cssproperty --forge-list-item-height - The height of the container.
 * @cssproperty --forge-list-item-indent - The margin inline state when in the indented state.
 * @cssproperty --forge-list-item-cursor - The cursor when interactive.
 * @cssproperty --forge-list-item-gap - The gap between the slotted content.
 * @cssproperty --forge-list-item-text-color - The text color of the text.
 * @cssproperty --forge-list-item-text-font-size - The font size of the text.
 * @cssproperty --forge-list-item-text-font-weight - The font weight of the text.
 * @cssproperty --forge-list-item-text-line-height - The line height of the text.
 * @cssproperty --forge-list-item-selected-color - The foreground color when in the selected state.
 * @cssproperty --forge-list-item-selected-background - The background color when in the selected state.
 * @cssproperty --forge-list-item-selected-opacity - The opacity of the background color when in the selected state.
 * @cssproperty --forge-list-item-start-selected-color - The color of the start content when in the selected state.
 * @cssproperty --forge-list-item-end-selected-color - The color of the end content when in the selected state.
 * @cssproperty --forge-list-item-selected-text-color - The color of the text when in the selected state.
 * @cssproperty --forge-list-item-disabled-opacity - The opacity of the element when in the disabled state.
 * @cssproperty --forge-list-item-disabled-cursor - The cursor when in the disabled state.
 * @cssproperty --forge-list-item-one-line-height - The line height when in the one/single line state.
 * @cssproperty --forge-list-item-two-line-height - The line height when in the two line state.
 * @cssproperty --forge-list-item-three-line-height - The line height when in the three line state.
 * @cssproperty --forge-list-item-dense-one-line-height - The line height when in the dense one/single line state.
 * @cssproperty --forge-list-item-dense-two-line-height - The line height when in the dense two line state.
 * @cssproperty --forge-list-item-dense-three-line-height - The line height when in the dense three line state.
 * @cssproperty --forge-list-item-dense-font-size - The font size when in the dense state.
 * @cssproperty --forge-list-item-dense-indent - The margin inline state when in the dense indented state.
 * @cssproperty --forge-list-item-dense-gap - The gap between the slotted content when in the dense state.
 *
 * @cssclass forge-list-item - The list item element (required).
 * @cssclass forge-list-item--disabled - The disabled state.
 * @cssclass forge-list-item--dense - The dense state.
 * @cssclass forge-list-item--interactive - Manually forces the list item to appear interactive with hover/focus states. This will happen automatically if there is a child `<button>` or `<a>` element.
 * @cssclass forge-list-item--two-line - Uses the two-line style.
 * @cssclass forge-list-item--three-line - Uses the three-line style.
 * @cssclass forge-list-item--indented - Indents the list item.
 * @cssclass forge-list-item--wrap - Wraps the text content.
 * @cssclass forge-list-item--selected - The selected state.
 * @cssclass forge-list-item__text - Styles the text content. Apply this to the primary, secondary, and tertiary text content.
 * @cssclass forge-list-item__start - Styles the start content (typically an icon).
 * @cssclass forge-list-item__end - Styles the end content (typically an icon).
 */
export class ListItemComponent extends BaseLitElement implements IListItemComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = LIST_ITEM_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [StateLayerComponent, FocusIndicatorComponent];

  #internals: ElementInternals;
  #focusPropagation: ListItemFocusPropagation = LIST_ITEM_CONSTANTS.defaults.FOCUS_PROPAGATION;
  #interactiveElement: HTMLElement | undefined;
  #disabledAttrObserver: MutationObserver | undefined;
  #anchorAttrObserver: MutationObserver | undefined;
  #clickListener = (evt: Event): void => this.#handleClick(evt as MouseEvent | KeyboardEvent);
  #keydownListener = (evt: Event): void => this.#handleKeydown(evt as KeyboardEvent);
  #keyupListener = (evt: Event): void => this.#handleKeyup(evt as KeyboardEvent);
  #mousedownListener = { handleEvent: (evt: MouseEvent): void => this.#handleMousedown(evt), capture: true };

  /**
   * Applies the selected state to the list item.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  /**
   * Applies the active state to the list item by emulating its focused state.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public active = false;

  /**
   * The unique value of the list item.
   * @attribute
   */
  @property()
  public value: unknown;

  /**
   * Applies the dense state to the list item.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public dense = false;

  /**
   * Applies the indented state by adding margin to the start of the list item.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public indented = false;

  /**
   * Sets the list item height to support at least two lines of text.
   * @default false
   * @attribute two-line
   */
  @property({ type: Boolean, attribute: 'two-line', reflect: true })
  public twoLine = false;

  /**
   * Sets the list item height to support at least three lines of text.
   * @default false
   * @attribute three-line
   */
  @property({ type: Boolean, attribute: 'three-line', reflect: true })
  public threeLine = false;

  /**
   * Sets the list item to wrap its text content.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public wrap = false;

  /**
   * Controls whether the list item will automatically attach itself to interactive slotted elements or not.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public noninteractive = false;

  /**
   * Controls whether the interactive element will receive focus if a non-interactive element is clicked within the list item.
   * @default 'allow'
   * @attribute focus-propagation
   */
  @property({
    attribute: 'focus-propagation',
    reflect: true,
    converter: { toAttribute: (value: ListItemFocusPropagation) => removeDefaultAttribute(value, LIST_ITEM_CONSTANTS.defaults.FOCUS_PROPAGATION) }
  })
  public set focusPropagation(value: ListItemFocusPropagation) {
    this.#focusPropagation = ['allow', 'off'].includes(value) ? value : LIST_ITEM_CONSTANTS.defaults.FOCUS_PROPAGATION;
  }
  public get focusPropagation(): ListItemFocusPropagation {
    return this.#focusPropagation;
  }

  @state() private _interactive = false;
  @state() private _disabled = false;
  @state() private _anchorHref: string | undefined;

  @query(LIST_ITEM_CONSTANTS.selectors.ROOT, true) private _root?: HTMLElement;
  @query('slot:not([name])', true) private _defaultSlot?: HTMLSlotElement;
  @query('slot[name=start]', true) private _startSlot?: HTMLSlotElement;
  @query('slot[name=end]', true) private _endSlot?: HTMLSlotElement;
  @query('forge-focus-indicator') private _focusIndicator?: FocusIndicatorComponent;
  @query('forge-state-layer') private _stateLayer?: StateLayerComponent;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, { role: 'listitem' }, { setAttribute: !this.hasAttribute('role') });
    this.#inheritParentListProps();

    if (this.hasUpdated) {
      this.#initializeInteractiveElement();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#cleanupObservers();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('value')) {
      const isSelected = this.#trySelect();
      if (isSelected !== null && isSelected !== this.selected) {
        this.selected = isSelected;
      }
    }

    if (changedProperties.has('noninteractive') && this.hasUpdated) {
      this.#initializeInteractiveElement();
    }
  }

  public override firstUpdated(): void {
    this.#initializeInteractiveElement();
  }

  public override updated(): void {
    if (this._focusIndicator && this._focusIndicator.targetElement !== this.#interactiveElement) {
      this._focusIndicator.targetElement = this.#interactiveElement;
    }
    if (this._stateLayer && this._root && this._stateLayer.targetElement !== this._root) {
      this._stateLayer.targetElement = this._root;
    }
  }

  public render(): TemplateResult {
    const classes = {
      [LIST_ITEM_CONSTANTS.classes.ROOT]: true,
      [LIST_ITEM_CONSTANTS.classes.INTERACTIVE]: this._interactive,
      [LIST_ITEM_CONSTANTS.classes.DISABLED]: this._disabled
    };
    return html`
      <div class=${classMap(classes)} part="root" @slotchange=${this.#handleSlotChange} @mousedown=${this.#mousedownListener}>
        <slot name="start">
          <slot name="leading"></slot>
        </slot>
        <div class="text-container" part="text-container">
          <slot></slot>
          <slot name="secondary-text"></slot>
          <slot name="tertiary-text"></slot>
        </div>
        <slot name="end">
          <slot name="trailing"></slot>
        </slot>
        ${this._interactive
          ? html`
              <forge-focus-indicator part="focus-indicator" .inward=${true} .active=${this.active}></forge-focus-indicator>
              <forge-state-layer exportparts="surface:state-layer"></forge-state-layer>
            `
          : nothing}
        ${this._anchorHref !== undefined
          ? html`<a
              id=${LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR}
              class=${LIST_ITEM_CONSTANTS.classes.INTERNAL_ANCHOR}
              href=${this._anchorHref}
              tabindex="-1"
              aria-hidden="true"></a>`
          : nothing}
      </div>
      <slot name="additional-content"></slot>
    `;
  }

  get #isActivatable(): boolean {
    return this._interactive && !this.noninteractive;
  }

  #setInteractive(value: boolean): void {
    this._interactive = value;

    if (value && !this.noninteractive) {
      this.addEventListener('click', this.#clickListener, { capture: true });
      this.addEventListener('keydown', this.#keydownListener, { capture: true });
    } else {
      this.removeEventListener('click', this.#clickListener, { capture: true });
      this.removeEventListener('keydown', this.#keydownListener, { capture: true });
      this.removeEventListener('keyup', this.#keyupListener, { capture: true });
    }
  }

  #getParentList(): HTMLElement | null {
    return this.closest(LIST_CONSTANTS.elementName);
  }

  #inheritParentListProps(): void {
    const list = this.#getParentList();
    if (!list) {
      return;
    }
    if (list.hasAttribute(LIST_CONSTANTS.attributes.NONINTERACTIVE)) {
      this.noninteractive = true;
    }
    if (list.hasAttribute(LIST_CONSTANTS.attributes.DENSE)) {
      this.dense = true;
    }
    if (list.hasAttribute(LIST_CONSTANTS.attributes.INDENTED)) {
      this.indented = true;
    }
    if (list.hasAttribute(LIST_CONSTANTS.attributes.TWO_LINE)) {
      this.twoLine = true;
    }
    if (list.hasAttribute(LIST_CONSTANTS.attributes.THREE_LINE)) {
      this.threeLine = true;
    }
  }

  /**
   * Compares the value of this list item to the selected value of the parent list.
   * @returns Whether the list item should be selected, or `null` if the parent list has no selected value.
   */
  #trySelect(): boolean | null {
    const list = this.#getParentList() as { selectedValue?: unknown } | null;
    if (list?.selectedValue === undefined) {
      return null;
    }
    const listValues = Array.isArray(list.selectedValue) ? list.selectedValue : [list.selectedValue];
    return listValues.some(v => isDeepEqual(v, this.value));
  }

  #handleSlotChange(evt: Event): void {
    // We only care about slot changes in the default slot, start/leading slot, and end/trailing slot to search for interactive elements
    const interactiveSlotNames = ['', 'start', 'end', 'leading', 'trailing'];
    const isInteractiveSlot = interactiveSlotNames.includes((evt.target as HTMLSlotElement).name);
    if (!isInteractiveSlot || this.noninteractive) {
      return;
    }
    this.#initializeInteractiveElement();
  }

  #initializeInteractiveElement(): void {
    this.#cleanupObservers();
    this.#interactiveElement = undefined;
    this._anchorHref = undefined;
    this._disabled = false;

    if (this.noninteractive || !this._defaultSlot || !this._startSlot || !this._endSlot) {
      this.#setInteractive(false);
      return;
    }

    // We always want to check for form control-like elements first as those take precedence over slotted anchor and button
    // elements as the interactive element.
    const assignedStartEndElements = [...this._startSlot.assignedElements({ flatten: true }), ...this._endSlot.assignedElements({ flatten: true })];
    const slottedFormControl = assignedStartEndElements.find(e => e.matches(LIST_ITEM_CONSTANTS.selectors.FORM_CONTROL_LIKE)) as HTMLElement | undefined;
    if (slottedFormControl) {
      this.#interactiveElement = slottedFormControl;
      this.#watchDisabled(slottedFormControl);
      return;
    }

    // If no form control-like elements are found, we check for slotted anchor or button elements within the default slot next.
    // If an anchor element is found, we render an internal anchor element to prevent the list item from being focusable.
    // If a button element is found, we sync the disabled state and attach a mutation observer to watch for changes.
    const assignedElements = this._defaultSlot.assignedElements({ flatten: true });
    const slottedAnchor = assignedElements.find(e => e.tagName === 'A') as HTMLAnchorElement | undefined;
    const slottedButtonLike = assignedElements.find(e => e.matches(LIST_ITEM_CONSTANTS.selectors.BUTTON_LIKE)) as HTMLElement | undefined;

    // Slotted anchors take precedence over slotted button-like elements
    this.#interactiveElement = slottedAnchor ?? slottedButtonLike;
    this.#setInteractive(!!this.#interactiveElement);

    if (slottedAnchor) {
      this.#attachInteractiveAnchor(slottedAnchor);
    } else if (slottedButtonLike) {
      this.#watchDisabled(slottedButtonLike);
    }
  }

  #attachInteractiveAnchor(element: HTMLAnchorElement): void {
    // The internal (facade) anchor element covers the entire list item to show the href in the status bar but is not
    // focusable or presented to assistive technology. All clicks on the internal anchor are forwarded to the slotted anchor.
    this._anchorHref = element.href;

    // Listen for changes to the href attribute to synchronize our internal anchor's href
    this.#anchorAttrObserver = new MutationObserver(() => (this._anchorHref = element.href));
    this.#anchorAttrObserver.observe(element, { attributes: true, attributeFilter: ['href'] });
  }

  #watchDisabled(element: HTMLElement): void {
    this.#syncDisabled(element);

    // Listen for changes to the disabled attribute and aria-disabled attribute to synchronize our disabled state
    this.#disabledAttrObserver = new MutationObserver(() => this.#syncDisabled(element));
    this.#disabledAttrObserver.observe(element, { attributes: true, attributeFilter: ['disabled', 'aria-disabled'] });
  }

  #syncDisabled(element: HTMLElement): void {
    const isDisabled = element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true';
    this._disabled = isDisabled;
    this.#setInteractive(!isDisabled);
  }

  #cleanupObservers(): void {
    this.#disabledAttrObserver?.disconnect();
    this.#disabledAttrObserver = undefined;

    this.#anchorAttrObserver?.disconnect();
    this.#anchorAttrObserver = undefined;
  }

  #clickInteractiveElement(): void {
    if (this.focusPropagation === 'allow') {
      this.#interactiveElement?.focus();
    }
    if (this._focusIndicator) {
      this._focusIndicator.active = false; // Workaround until we can call `focus({ focusVisible: false })` to prevent focus ring from showing
    }
    this.#interactiveElement?.click();
  }

  #dispatchSelectEvent(): void {
    const detail: IListItemSelectEventData = { value: this.value };
    this.dispatchEvent(new CustomEvent<IListItemSelectEventData>(LIST_ITEM_CONSTANTS.events.SELECT, { bubbles: true, detail }));
  }

  #handleMousedown(evt: MouseEvent): void {
    if (!this.#isActivatable) {
      return;
    }
    const composedElements = composedPathFrom(this, evt);
    const fromInteractiveElement = composedElements.some(el => el === this.#interactiveElement);
    if (this.focusPropagation === 'off' || !fromInteractiveElement) {
      evt.preventDefault();
    }
  }

  #handleKeydown(evt: KeyboardEvent): void {
    if (!this.#isActivatable) {
      return;
    }

    const composedElements = composedPathFrom(this, evt);
    const ignoredElements = composedElements.some(el => el.matches(LIST_ITEM_CONSTANTS.selectors.IGNORE));
    if (ignoredElements) {
      return;
    }

    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.stopPropagation();

      const isAnchor = this.#interactiveElement?.tagName === 'A';
      if (!isAnchor) {
        evt.preventDefault();
      }

      this.addEventListener('keyup', this.#keyupListener, { capture: true });
    }
  }

  #handleKeyup(evt: KeyboardEvent): void {
    if (!this.#isActivatable) {
      this.removeEventListener('keyup', this.#keyupListener, { capture: true });
      return;
    }

    const composedElements = composedPathFrom(this, evt);
    const isFromStartEndSlot = composedElements.some(el => el.matches(LIST_ITEM_CONSTANTS.selectors.SLOTTED_START_END));

    if (isFromStartEndSlot) {
      if (evt.key === 'Enter' || evt.key === ' ') {
        this._stateLayer?.playAnimation();
      }
      if (evt.key === 'Enter') {
        this.#interactiveElement?.click();
      }
      return;
    }

    if (evt.key === ' ' || evt.key === 'Enter') {
      const isAnchor = this.#interactiveElement?.tagName === 'A';
      if (isAnchor) {
        if (evt.key === ' ') {
          this.#interactiveElement?.click();
        }
      } else {
        this._stateLayer?.playAnimation();
        this.#handleClick(evt);
      }
    }

    this.removeEventListener('keyup', this.#keyupListener, { capture: true });
  }

  #handleClick(evt: MouseEvent | KeyboardEvent): void {
    if (!this.#isActivatable) {
      return;
    }

    const composedElements = composedPathFrom(this, evt);

    // Ignore clicks from elements that should not trigger selection
    const fromIgnoredElement = composedElements.some(el => el.matches(LIST_ITEM_CONSTANTS.selectors.IGNORE));
    if (fromIgnoredElement) {
      return;
    }

    // Ignore clicks from <label> elements that have a for attribute that matches our interactive elements' id
    const labelElementWithFor = (el: HTMLElement): el is HTMLLabelElement => el.matches('label[for]');
    const fromLabelFor = composedElements.filter(labelElementWithFor).some(el => el.htmlFor === this.#interactiveElement?.id);
    if (fromLabelFor) {
      evt.stopPropagation();
      return;
    }

    // Check if our internal anchor was clicked and forward the click to the slotted interactive element
    const isInternalAnchor = (el: HTMLElement): el is HTMLAnchorElement => el.tagName === 'A' && el.id === LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR;
    const fromInternalAnchor = composedElements.some(isInternalAnchor);
    if (fromInternalAnchor) {
      const isCtrlClick = evt.ctrlKey || evt.metaKey;
      const hasTarget = this.#interactiveElement?.hasAttribute('target');

      evt.preventDefault();
      evt.stopImmediatePropagation();

      // Workaround to temporarily set the target attribute to '_blank' if the user is holding the ctrl key and remove it after the click
      const forceTempAnchorTarget = isCtrlClick && !hasTarget;
      /* c8 ignore next 3 */
      if (forceTempAnchorTarget) {
        this.#interactiveElement?.setAttribute('target', '_blank');
      }

      this.#clickInteractiveElement();

      /* c8 ignore next 3 */
      if (forceTempAnchorTarget) {
        this.#interactiveElement?.removeAttribute('target');
      }
      return;
    }

    // If the click did not originate from the interactive element, forward the click to it
    const fromInteractiveElement = composedElements.some(el => el === this.#interactiveElement);
    if (!fromInteractiveElement) {
      evt.stopImmediatePropagation();
      this.#clickInteractiveElement();
      return;
    }

    this.#dispatchSelectEvent();
  }
}

tryDefine(LIST_ITEM_CONSTANTS.elementName, ListItemComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-list-item': IListItemComponent;
  }

  interface HTMLElementEventMap {
    'forge-list-item-select': CustomEvent<IListItemSelectEventData>;
  }
}

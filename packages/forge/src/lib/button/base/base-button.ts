import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconArrowDropDown } from '@tylertech/tyler-icons';
import { html, nothing, PropertyValues, TemplateResult } from 'lit';
import { property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { DEFERRED_LABEL_TARGET, ExperimentalFocusOptions, forgeLabelRef, internals, updateTarget } from '../../constants.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { supportsInvokerCommands, supportsPopover, CommandEvent as FallbackCommandEvent } from '../../core/utils/feature-detection.js';
import { BUTTON_FORM_ATTRIBUTES, cloneAttributes } from '../../core/utils/reflect-utils.js';
import { toggleState } from '../../core/utils/utils.js';
import { FOCUS_INDICATOR_TAG_NAME, IFocusIndicatorComponent } from '../../focus-indicator/index.js';
import { IconRegistry } from '../../icon/icon-registry.js';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../../state-layer/index.js';
import { BASE_BUTTON_CONSTANTS, ButtonType, CommandType } from './base-button-constants.js';

/** @deprecated - This will be removed in the future. Please switch to using BaseButton. */
export interface IBaseButton {
  type: ButtonType;
  disabled: boolean;
  popoverIcon: boolean;
  name: string;
  value: string;
  dense: boolean;
  form: HTMLFormElement | null;
  popoverTargetElement: HTMLElement | null;
  popoverTargetAction: 'click' | 'hover';
  focus(options?: ExperimentalFocusOptions): void;
  labelChangedCallback(value: string | null): void;
  labelClickedCallback?(): void;
}

/**
 * Base class for button components providing common functionality for form-associated
 * button elements with accessibility features, keyboard interaction, and popover support.
 *
 * @fires {PointerEvent} click - Fires when the button is clicked.
 *
 * @state disabled - Applied when the button is disabled.
 */
export abstract class BaseButton extends BaseLitElement {
  static {
    IconRegistry.define(tylIconArrowDropDown);
  }

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY]: string;

  public static readonly formAssociated = true;

  // Label awareness (for compatibility)
  public [forgeLabelRef]?: { [updateTarget](target: HTMLElement): boolean };

  // Public properties - Button behavior
  /**
   * Gets/sets the type of button.
   * @default "button"
   * @attribute
   */
  @property({ reflect: true })
  public type: ButtonType = 'button';

  /**
   * Gets/sets whether the button is disabled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public get disabled(): boolean {
    return this.#disabled;
  }
  public set disabled(value: boolean) {
    const oldValue = this.#disabled;
    // Force disabled to false if slotted anchor exists
    if (this._anchorElements.length) {
      value = false;
    }
    this.#disabled = value;
    if (oldValue !== value) {
      this.requestUpdate('disabled', oldValue);
    }
  }
  #disabled = false;

  /**
   * Gets/sets whether the button is dense.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public dense = false;

  // Public properties - Popover
  /**
   * Gets/sets whether to show a popover icon.
   * @default false
   * @attribute popover-icon
   */
  @property({ type: Boolean, reflect: true, attribute: 'popover-icon' })
  public popoverIcon = false;

  /** @ignore */
  public popoverTargetElement: HTMLElement | null = null;

  /** @ignore */
  public popoverTargetAction: 'click' | 'hover' = 'click';

  // Public properties - Form association
  /**
   * Gets/sets the button name for form association.
   * @default ''
   * @attribute
   */
  @property({ reflect: true })
  public name = '';

  /**
   * Gets/sets the button value for form submission.
   * @default ''
   * @attribute
   */
  @property({ reflect: true })
  public value = '';

  // Public properties - Invoker commands
  /**
   * Indicates to the targeted element which action to take.
   * @default ''
   * @attribute
   */
  @property()
  public command: CommandType = '';

  /**
   * Targets another element to be invoked.
   * @default ''
   * @attribute command-for
   */
  @property()
  public commandFor = '';

  /**
   * Targets another element to be invoked.
   * @default undefined
   */
  @property({ attribute: false })
  public set commandForElement(value: HTMLElement | undefined) {
    this.#commandForElement = value;
  }
  public get commandForElement(): HTMLElement | undefined {
    return this.#commandForElement ?? this.ownerDocument.getElementById(this.commandFor) ?? undefined;
  }
  #commandForElement: typeof this.commandForElement;

  // Internal state
  protected _internals: ElementInternals;

  @state()
  protected _stateLayerDisabled = false;

  // Event listeners
  #clickListener = this._onClick.bind(this);
  #keydownListener = this.#onKeydown.bind(this);
  #slotChangeListener = (): void => this.#detectSlottedAnchor();

  // Shadow DOM queries
  @query('#root', true) protected _rootElement!: HTMLElement;
  @query('slot:not([name])', true) protected _defaultSlotElement!: HTMLSlotElement;
  @query('slot[name=end]', true) protected _endSlotElement!: HTMLSlotElement;
  @query(FOCUS_INDICATOR_TAG_NAME) protected _focusIndicatorElement?: IFocusIndicatorComponent;
  @query(STATE_LAYER_CONSTANTS.elementName) protected _stateLayerElement?: IStateLayerComponent;

  // Slotted content queries
  @queryAssignedElements({ slot: 'start', flatten: true }) protected _startSlotElements!: Element[];
  @queryAssignedElements({ slot: 'end', flatten: true }) protected _endSlotElements!: Element[];
  @queryAssignedElements({ slot: '', selector: 'a', flatten: true }) protected _anchorElements!: HTMLAnchorElement[];

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  // Lifecycle methods
  public override connectedCallback(): void {
    super.connectedCallback();

    // Label awareness setup
    if (this.hasAttribute(DEFERRED_LABEL_TARGET) && this[forgeLabelRef]) {
      this[forgeLabelRef][updateTarget](this);
    }
    this.removeAttribute(DEFERRED_LABEL_TARGET);
    delete this[forgeLabelRef];
  }

  public override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    // Initialize after DOM is ready
    this.#detectSlottedAnchor();
    this.#updateDefaultAria();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled')) {
      this.#handleDisabledChange();
    }
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);

    if (changedProperties.has('disabled')) {
      toggleState(this._internals, 'disabled', this.disabled);
    }
  }

  // Render methods
  protected _renderDefaultSlot(): TemplateResult {
    return html` <slot @slotchange=${this.#slotChangeListener}></slot>`;
  }

  protected _renderEndSlotWithOptionalPopoverIcon(): TemplateResult {
    return html` <slot name="end">
      ${this.popoverIcon ? html`<forge-icon class=${BASE_BUTTON_CONSTANTS.classes.POPOVER_ICON} name=${tylIconArrowDropDown.name}></forge-icon>` : nothing}
    </slot>`;
  }

  protected _renderInteractionLayer(): TemplateResult {
    return html`
      ${this.disabled
        ? nothing
        : html`
            <forge-focus-indicator target=":host" part="focus-indicator"></forge-focus-indicator>
            <forge-state-layer target=":host" exportpart="surface:state-layer" .disabled=${this._stateLayerDisabled}></forge-state-layer>
          `}
    `;
  }

  // Public API - Form association
  public get form(): HTMLFormElement | null {
    return this._internals.form;
  }

  // Public API - User interaction
  public override click(): void {
    if (this.disabled) {
      return;
    }
    HTMLElement.prototype.click.call(this);
    this.#animateStateLayer();
  }

  public override focus(options?: ExperimentalFocusOptions): void {
    super.focus(options);

    if (options?.focusVisible !== false && this._focusIndicatorElement) {
      this._focusIndicatorElement.active = true;
    }
  }

  // Public API - Label awareness callbacks
  public labelClickedCallback(): void {
    this.click();
  }

  public labelChangedCallback(value: string | null): void {
    setDefaultAria(this, this._internals, { ariaLabel: value }, { setAttribute: !this.hasAttribute('aria-label') });
  }

  // Public API - Symbol accessors for compatibility
  public get [internals](): ElementInternals {
    return this._internals;
  }

  // Event handlers
  protected async _onClick(evt: PointerEvent): Promise<void> {
    const isFormType = this.type === 'submit' || this.type === 'reset';

    if (!isFormType && this.#hasPopoverTarget()) {
      const isOpen = this.#managePopover();
      if (isOpen) {
        return;
      }
    }

    await new Promise<void>(resolve => setTimeout(resolve));

    if (evt.defaultPrevented || this.disabled) {
      return;
    }

    if (isFormType) {
      return this.#clickFormButton(this.type);
    }

    this.#invokeCommand();
  }

  async #onKeydown(evt: KeyboardEvent): Promise<void> {
    if (evt.key === ' ') {
      evt.preventDefault();
      this.click();
      return;
    }

    await new Promise<void>(resolve => setTimeout(resolve));

    if (evt.defaultPrevented || this.disabled) {
      return;
    }

    if (evt.key === 'Enter') {
      this.click();
    }
  }

  // Private methods - Accessibility and anchor detection
  #detectSlottedAnchor(): void {
    if (this._anchorElements.length) {
      this.disabled = false;
      this.removeEventListener('click', this.#clickListener);
      this.removeEventListener('keydown', this.#keydownListener);
    } else {
      this.addEventListener('click', this.#clickListener);
      this.addEventListener('keydown', this.#keydownListener);
    }
    this.#updateDefaultAria();
  }

  #updateDefaultAria(): void {
    const slottedAnchor = this._anchorElements.at(0);

    setDefaultAria(this, this._internals, { role: slottedAnchor ? null : 'button' }, { setAttribute: !this.hasAttribute('role') || !!slottedAnchor });

    this._rootElement?.classList.toggle(BASE_BUTTON_CONSTANTS.classes.WITH_ANCHOR, !!slottedAnchor);

    if (slottedAnchor) {
      this.removeAttribute('tabindex');
    } else if (!this.disabled && !this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    if (this._focusIndicatorElement) {
      this._focusIndicatorElement.targetElement = slottedAnchor || this;
    }
    if (this._stateLayerElement) {
      this._stateLayerElement.targetElement = slottedAnchor || this;
    }
  }

  #handleDisabledChange(): void {
    if (this._anchorElements.length) {
      this.removeAttribute('tabindex');
      setDefaultAria(this, this._internals, { ariaDisabled: null }, { setAttribute: true });
    } else {
      if (this.disabled) {
        this.removeAttribute('tabindex');
      } else if (!this.hasAttribute('tabindex')) {
        this.setAttribute('tabindex', '0');
      }
      setDefaultAria(this, this._internals, { ariaDisabled: this.disabled ? 'true' : null }, { setAttribute: true });
    }
  }

  #animateStateLayer(): void {
    if (this._stateLayerElement?.disabled || !this._stateLayerElement?.isConnected) {
      return;
    }
    this._stateLayerElement?.playAnimation();
  }

  // Private methods - Form association
  #clickFormButton(type: string): void {
    if (!this._internals.form) {
      return;
    }

    if (type === 'submit') {
      this._internals.setFormValue(this.value);

      const tempBtn = document.createElement('button');
      tempBtn.type = type;
      cloneAttributes(this, tempBtn, BUTTON_FORM_ATTRIBUTES);

      this._internals.form.addEventListener(
        'submit',
        evt => {
          Object.defineProperty(evt, 'submitter', {
            configurable: true,
            enumerable: true,
            get: () => this
          });
        },
        { capture: true, once: true }
      );

      this.insertAdjacentElement('afterend', tempBtn);
      tempBtn.click();
      tempBtn.remove();
    } else if (type === 'reset') {
      this._internals.form?.reset();
    }
  }

  // Private methods - Popover management
  #hasPopoverTarget(): boolean {
    return this.hasAttribute('popovertarget') || !!this.popoverTargetElement;
  }

  #managePopover(): boolean {
    if (this._internals.form || !this.#hasPopoverTarget() || !supportsPopover()) {
      return false;
    }

    const popoverElement = this.#locatePopoverTargetElement();
    if (!popoverElement) {
      return false;
    }

    const action = this.getAttribute('popovertargetaction') ?? this.popoverTargetAction ?? 'toggle';
    const isPopoverOpen = popoverElement.matches(':popover-open');

    switch (action) {
      case 'show':
        if (!isPopoverOpen) {
          popoverElement.showPopover();
        }
        return true;
      case 'hide':
        if (isPopoverOpen) {
          popoverElement.hidePopover();
        }
        return false;
      case 'toggle':
      default: {
        const result = popoverElement.togglePopover();

        if (result && popoverElement.popover !== 'manual') {
          const listener: EventListener = evt => {
            evt.stopPropagation();

            if (popoverElement.matches(':popover-open')) {
              popoverElement.hidePopover();
            }
          };
          this.addEventListener('click', listener, { capture: true, once: true });
          popoverElement.addEventListener(
            'beforetoggle',
            async () => {
              await new Promise<void>(resolve => setTimeout(resolve));
              this.removeEventListener('click', listener, { capture: true });
            },
            { once: true }
          );
        }

        return result;
      }
    }
  }

  #locatePopoverTargetElement(): HTMLElement | null {
    let popoverElement = this.popoverTargetElement ?? null;

    if (!popoverElement) {
      const rootNode = this.ownerDocument.getRootNode() as Document | ShadowRoot;
      if (!rootNode) {
        return null;
      }

      const targetId = this.getAttribute('popovertarget');
      popoverElement = rootNode.querySelector(`#${targetId}`);
    }

    return popoverElement as HTMLElement | null;
  }

  // Private methods - Invoker commands
  #invokeCommand(): void {
    if (!this.command) {
      return;
    }

    const targetElement = this.commandForElement;
    if (!targetElement) {
      return;
    }

    if (supportsInvokerCommands()) {
      // @ts-expect-error CommandEvent is not widely supported yet, but this code is only reachable behind a feature detection check.
      targetElement.dispatchEvent(new CommandEvent('command', { source: this, command: this.command, cancelable: true }));
    } else {
      targetElement.dispatchEvent(new FallbackCommandEvent('command', { source: this, command: this.command, cancelable: true }));
    }
  }
}

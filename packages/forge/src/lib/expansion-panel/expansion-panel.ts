import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, randomChars } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { classMap } from 'lit-html/directives/class-map.js';
import { customElement, property, queryAssignedElements, state } from 'lit/decorators.js';
import { IBaseComponent } from '../core/base/base-component.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { IOpenIconComponent, OPEN_ICON_CONSTANTS } from '../open-icon/index.js';
import { emulateUserToggle, EXPANSION_PANEL_CONSTANTS, ExpansionPanelAnimationType, ExpansionPanelOrientation } from './expansion-panel-constants.js';
import { ExpansionPanelTriggerController } from './expansion-panel-trigger-controller.js';

import styles from './expansion-panel.scss';
import { toggleState } from '../core/index.js';

/** @deprecated - This will be removed in the future. Please switch to using AccordionComponent. */
export interface IExpansionPanelComponent extends IBaseComponent {
  open: boolean;
  orientation: ExpansionPanelOrientation;
  animationType: ExpansionPanelAnimationType;
  trigger: string;
  triggerElement: HTMLElement | null;
  openIcon: string;
  openIconElement: IOpenIconComponent | null;
  toggle(): void;
  [emulateUserToggle](open: boolean): void;
}

/**
 * @tag forge-expansion-panel
 *
 * @summary Expansion panels provide progressive disclosure of content.
 *
 * @fires {CustomEvent<boolean>} forge-expansion-panel-toggle - Event fired when the panel is toggled open or closed.
 * @fires {CustomEvent<boolean>} forge-expansion-panel-animation-complete - Event fired when the panel has finished animating when toggling.
 *
 * @state open - Applied when the panel is open.
 * @state horizontal - Applied when the orientation is horizontal.
 *
 * @cssproperty --forge-expansion-panel-animation-duration - The duration of the open/close animation.
 * @cssproperty --forge-expansion-panel-animation-easing - The easing function of the open/close animation.
 *
 * @csspart root - The root element of the panel.
 * @csspart header - The header of the panel.
 * @csspart content - The content of the panel.
 *
 * @cssclass forge-expansion-panel - The expandable element content container (required).
 * @cssclass forge-expansion-panel__content - The expandable content within the panel container.
 * @cssclass forge-expansion-panel--open - The open state of the panel.
 *
 * @slot - The content of the panel.
 * @slot header - The header of the panel. This is deprecated, prefer using the trigger property instead, or manually associating a button with the panel.
 */
@customElement(EXPANSION_PANEL_CONSTANTS.elementName)
export class ExpansionPanelComponent extends BaseLitElement implements IExpansionPanelComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = EXPANSION_PANEL_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [];

  #internals: ElementInternals;

  // TODO: remove attribute reflection

  /**
   * Whether the panel is open or closed.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true }) public open = false;

  /**
   * The orientation of the panel.
   * @default 'vertical'
   * @attribute
   */
  @property({ type: String, reflect: true }) public orientation: ExpansionPanelOrientation = 'vertical';

  /**
   * The type of animation to use when opening/closing the panel.
   * @default 'default'
   * @attribute {animation-type}
   */
  @property({ type: String, reflect: true, attribute: EXPANSION_PANEL_CONSTANTS.observedAttributes.ANIMATION_TYPE })
  public animationType: ExpansionPanelAnimationType = 'default';

  /**
   * The id of the button that the expansion panel should be toggled by.
   * @attribute
   */
  @property({ type: String, reflect: true }) public trigger = '';

  /**
   * The button that the expansion panel should be toggled by.
   */
  @property({ type: Object }) public triggerElement: HTMLElement | null = null;

  /**
   * The id of the `<forge-open-icon>` that the expansion panel should toggle.
   * @attribute {open-icon}
   */
  @property({ type: String, reflect: true, attribute: EXPANSION_PANEL_CONSTANTS.observedAttributes.OPEN_ICON })
  public openIcon = '';

  /**
   * The `<forge-open-icon>` that the expansion panel should toggle.
   */
  @property({ type: Object })
  public openIconElement: IOpenIconComponent | null = null;

  @state() private _isAnimating = false;

  @queryAssignedElements() private _slottedContentElements!: HTMLElement[];

  get #slottedOpenIconElement(): IOpenIconComponent | null {
    return this.querySelector(OPEN_ICON_CONSTANTS.elementName);
  }

  /**
   * TODO: The unmigrated code synced with *all* possible trigger elements
   * whereas this syncs with just one utilizing a series of fallbacks.
   * Determine which behavior is preferable.
   * */
  get #openIconElement(): IOpenIconComponent | null {
    if (this.openIconElement) {
      return this.openIconElement;
    } else if (this.openIcon) {
      const openIconEl = this.#getOpenIconElementById(this.openIcon);
      this.openIconElement = openIconEl;
      return this.openIconElement;
    }

    const triggerOpenIcon = this.#triggerController.openIcon;
    if (triggerOpenIcon) {
      return triggerOpenIcon;
    }

    return this.#slottedOpenIconElement ?? null;
  }

  get #slottedContentId(): string {
    return this._slottedContentElements[0]?.id ?? '';
  }

  set #slottedContentId(value: string) {
    if (this._slottedContentElements[0]) {
      this._slottedContentElements[0].id = value;
    }
  }

  #triggerController = new ExpansionPanelTriggerController(this, {
    clickHandler: this.#handleClick.bind(this),
    keydownHandler: this.#handleKeyDown.bind(this),
    keyupHandler: this.#handleKeyUp.bind(this)
  });

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('open')) {
      toggleState(this.#internals, 'open', this.open);
    }
    if (changedProperties.has('open') || changedProperties.has('openIconElement')) {
      this.#tryToggleOpenIcon();
    }
    if (changedProperties.has('openIcon')) {
      this.openIconElement = this.#getOpenIconElementById(this.openIcon);
    }
    if (changedProperties.has('orientation')) {
      toggleState(this.#internals, 'horizontal', this.orientation === 'horizontal');
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.#setContentId();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.openIconElement = null;
  }

  public render(): TemplateResult {
    return html`
      <div class="forge-expansion-panel" part="root">
        <div
          class="header"
          part="header"
          @click="${this.#handleClick.bind(this)}"
          @keydown="${this.#handleKeyDown.bind(this)}"
          @keyup="${this.#handleKeyUp.bind(this)}">
          <slot name="header"></slot>
        </div>
        <div
          class=${classMap({ content: true, hidden: !this.open && !this._isAnimating, 'no-animation': this.animationType === 'none' })}
          part="content"
          @transitionstart="${this.#handleTransitionStart.bind(this)}"
          @transitionend="${this.#handleTransitionEnd.bind(this)}">
          <div class=${classMap({ inner: true, animating: this._isAnimating })} @slotchange="${this.#handleContentSlotChange.bind(this)}">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  //
  // Public Methods
  //

  public toggle(): void {
    this.open = !this.open;
  }

  public [emulateUserToggle](open: boolean): void {
    if (this.open === open) {
      return;
    }
    this.open = open;
    this.#dispatchToggleEvent();
  }

  //
  // User Interaction Handlers
  //

  #handleClick(evt: PointerEvent): void {
    this.#tryToggle(evt);
  }

  #handleKeyDown(evt: KeyboardEvent): void {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
    }
  }

  #handleKeyUp(evt: KeyboardEvent): void {
    if (evt.key === 'Enter' || evt.key === ' ') {
      this.#tryToggle(evt);
    }
  }

  #tryToggle(evt: Event): void {
    if (this.#canIgnoreEvent(evt)) {
      return;
    }
    evt.stopPropagation();
    this.toggle();
    this.#dispatchToggleEvent();
  }

  #canIgnoreEvent(evt: Event): boolean {
    return evt.composedPath().some(el => {
      if (!(el instanceof HTMLElement)) {
        return false;
      }
      return el.matches(EXPANSION_PANEL_CONSTANTS.selectors.IGNORE);
    });
  }

  //
  // Animation Handlers
  //

  #handleTransitionStart(evt: TransitionEvent): void {
    if (evt.propertyName.startsWith('grid-template')) {
      this._isAnimating = true;
      this.toggleAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPENING, true);
    }
  }

  #handleTransitionEnd(evt: TransitionEvent): void {
    if (evt.propertyName.startsWith('grid-template')) {
      this._isAnimating = false;
      this.toggleAttribute(EXPANSION_PANEL_CONSTANTS.attributes.OPENING, false);
      this.#dispatchAnimationCompleteEvent();
    }
  }

  //
  // Slot Change Handlers
  //

  #handleContentSlotChange(): void {
    this.#setContentId();
  }

  #setContentId(): void {
    if (!this.#slottedContentId) {
      this.#slottedContentId = `forge-expansion-panel-content-${randomChars()}`;
    }
    this.#triggerController.setControls(this.#slottedContentId);
  }

  //
  // Open Icon
  //

  #getOpenIconElementById(id: string): IOpenIconComponent | null {
    if (!id || !this.isConnected) {
      return null;
    }

    const rootNode = this.getRootNode() as Document | ShadowRoot;
    const el = rootNode.getElementById(id);
    if (el?.tagName.toLocaleLowerCase() === OPEN_ICON_CONSTANTS.elementName) {
      return el as IOpenIconComponent;
    }
    return null;
  }

  #tryToggleOpenIcon(): void {
    const openIconEl = this.#openIconElement;
    if (openIconEl) {
      openIconEl.open = this.open;
    }
  }

  //
  // Event Dispatchers
  //

  #dispatchToggleEvent(): void {
    const evt = new CustomEvent(EXPANSION_PANEL_CONSTANTS.events.TOGGLE, {
      detail: this.open,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(evt);
  }

  #dispatchAnimationCompleteEvent(): void {
    const evt = new CustomEvent(EXPANSION_PANEL_CONSTANTS.events.ANIMATION_COMPLETE, {
      detail: this.open,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(evt);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-expansion-panel': IExpansionPanelComponent;
  }

  interface HTMLElementEventMap {
    'forge-expansion-panel-toggle': CustomEvent<boolean>;
    'forge-expansion-panel-animation-complete': CustomEvent<boolean>;
  }
}

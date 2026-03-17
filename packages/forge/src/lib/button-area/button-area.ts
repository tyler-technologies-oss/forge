import { CUSTOM_ELEMENT_NAME_PROPERTY, getEventPath } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { createRef, Ref, ref } from 'lit/directives/ref.js';
import { IBaseComponent } from '../core/base/base-component.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { locateElementById, toggleState } from '../core/utils/utils.js';
import { IFocusIndicatorComponent } from '../focus-indicator/index.js';
import { StateLayerComponent } from '../state-layer/index.js';

import styles from './button-area.scss';

/** @deprecated - This will be removed in the future. Please switch to using ButtonAreaComponent. */
export interface IButtonAreaComponent extends IBaseComponent {
  disabled: boolean;
  target: string | null | undefined;
  targetElement: HTMLElement | null | undefined;
}

export const BUTTON_AREA_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-button-area';

type DisableableElement = HTMLElement & { disabled?: boolean };
type TargetElement = DisableableElement | HTMLAnchorElement;

/**
 * @tag forge-button-area
 *
 * @summary Button areas are used to create clickable areas that group related information and actions about a single subject. The button area component wraps any arbitrary content with a `<button>` element to enable accessible, clickable interfaces including nested controls and other complex content.
 *
 * @state disabled - Applied when the button area is disabled.
 * @state pressed - Applied when the associated button element has `aria-pressed="true"`.
 * @state current - Applied when the associated button or anchor element has `aria-current` set to a valid value ("true", "page", "step", "location", "date", or "time").
 *
 * @event {PointerEvent} click - The button area emits a native HTML click event whenever it or its associated button or anchor element is clicked. Add the listener to the `<forge-button-area>` element to receive all events. Note: Set `data-forge-ignore` on any nested buttons or other interactive elements to prevent them from activating the button area.
 *
 * @csspart root - The root container element.
 * @csspart button - The visually hidden slot for the `<button>` or `<a>` element.
 * @csspart focus-indicator - The focus indicator element.
 * @csspart state-layer - The state layer surface element.
 *
 * @cssproperty --forge-button-area-shape - The border radius of the button area.
 * @cssproperty --forge-button-area-selected-color - The background color of the button area when in the pressed or current states.
 * @cssproperty --forge-button-area-cursor - The cursor.
 * @cssproperty --forge-button-area-disabled-cursor - The cursor when in the disabled state.
 *
 * @slot - Places content within the default (unnamed) slot (main body of the component).
 * @slot button - Places content within a visually hidden slot. A `<button>` or `<a>` element can be placed here to provide accessible semantics and functionality without being visible on the page.
 */
@customElement(BUTTON_AREA_TAG_NAME)
export class ButtonAreaComponent extends BaseLitElement implements IButtonAreaComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BUTTON_AREA_TAG_NAME;

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  /**
   * Controls whether the component and associated button element are disabled. This has no effect when the button area is used with an anchor element.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The ID of a button or anchor element to use for semantics and functionality.
   * @default undefined
   * @attribute
   */
  @property({ type: String })
  public target: string | null | undefined = undefined;

  /**
   * A button or anchor element instance to use for semantics and functionality.
   * @default undefined
   */
  @property({ attribute: false })
  public targetElement: TargetElement | null | undefined = undefined;

  @queryAssignedElements({ slot: 'button', selector: 'button, a' })
  private _slottedButtonElements: (HTMLButtonElement | HTMLAnchorElement)[];

  #buttonObserver?: MutationObserver;
  #root: Ref<HTMLDivElement> = createRef();
  #stateLayer: Ref<StateLayerComponent> = createRef();
  #focusIndicator: Ref<IFocusIndicatorComponent> = createRef();

  get #slottedButtonElement(): HTMLButtonElement | HTMLAnchorElement | undefined {
    return this._slottedButtonElements[0];
  }

  get #associatedElement(): TargetElement | null | undefined {
    if (this.targetElement && (this.#isDisableableElement(this.targetElement) || this.#isAnchorElement(this.targetElement))) {
      return this.targetElement;
    }
    return this.#slottedButtonElement;
  }

  #isAnchorElement(element: TargetElement | null | undefined): element is HTMLAnchorElement {
    return element instanceof HTMLAnchorElement;
  }

  #isDisableableElement(element: TargetElement | null | undefined): element is DisableableElement {
    return element != null && 'disabled' in element && typeof element.disabled === 'boolean';
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // Locate target element by ID if target is set
    if (this.target && !this.targetElement) {
      this.targetElement = locateElementById(this, this.target) ?? undefined;
    }
  }

  public override firstUpdated(): void {
    this.#startObserver();
    this.#syncWithAssociatedElement();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled')) {
      this.#handleDisabledChange();
    }

    if (changedProperties.has('target') && this.hasUpdated) {
      this.#handleTargetChange();
    }

    if (changedProperties.has('targetElement')) {
      this.#handleTargetElementChange();
    }
  }

  public override render(): TemplateResult {
    return html`
      <div
        class="forge-button-area"
        part="root"
        ${ref(this.#root)}
        @click=${this.#handleClick}
        @keydown=${this.#handleKeydown}
        @pointerdown=${this.#handlePointerdown}>
        <div id="button" class="button" part="button" .hidden=${!!this.targetElement} @slotchange=${this.#handleSlotChange}>
          <slot name="button"></slot>
        </div>
        <slot @click=${this.#handleIgnoreStateLayer} @pointerdown=${this.#handleIgnoreStateLayer} @pointerup=${this.#handleIgnoreStateLayer}></slot>
        <forge-state-layer exportparts="surface:state-layer" ${ref(this.#stateLayer)}></forge-state-layer>
        <forge-focus-indicator target="button" part="focus-indicator" inward ${ref(this.#focusIndicator)}></forge-focus-indicator>
      </div>
    `;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#stopObserver();
  }

  #handleClick = (event: Event): void => {
    // Prevent the click if disabled
    if (this.disabled) {
      event.stopPropagation();
    }

    // Prevent the click if a selection was made
    const selection = window.getSelection();
    if (selection?.type === 'Range' && selection?.toString().trim() !== '') {
      event.stopPropagation();
      return;
    }

    // Prevent the click if it originates from an ignored element
    if (this.#shouldIgnoreEvent(event)) {
      event.stopPropagation();
      return;
    }

    // If the click occured outside an external associated element, trigger a click on it
    if (this.targetElement && !event.composedPath().includes(this.targetElement)) {
      this.targetElement.click();
    }
  };

  #handleKeydown = (event: KeyboardEvent): void => {
    // Only handle the enter key and, for non-anchor elements, the space key
    if (event.key !== 'Enter' && (this.#isAnchorElement(this.#associatedElement) || event.key !== ' ')) {
      return;
    }

    // Prevent the keydown if it originates from an ignored element
    if (this.#shouldIgnoreEvent(event)) {
      event.stopPropagation();
    } else {
      this.#animateStateLayer();
    }
  };

  #handlePointerdown = (event: Event): void => {
    if (this.disabled) {
      return;
    }

    // Prevent the pointerdown if it originates from an ignored element
    if (this.#shouldIgnoreEvent(event)) {
      this.#requestDisabledButtonFrame();
    }
  };

  #handleIgnoreStateLayer = (event: Event): void => {
    if (this.disabled) {
      return;
    }

    // Prevent the state layer animation if the event originates from an ignored element
    if (this.#shouldIgnoreEvent(event)) {
      event.stopPropagation();
    }
  };

  #handleSlotChange = (): void => {
    if (this.targetElement) {
      return;
    }

    this.#retargetObserver();
    this.#syncWithAssociatedElement();
  };

  #handleTargetChange(): void {
    if (this.target) {
      this.targetElement = locateElementById(this, this.target) ?? undefined;
    }
  }

  #handleTargetElementChange(): void {
    this.#retargetObserver();
    this.#syncWithAssociatedElement();
  }

  #retargetObserver(): void {
    this.#stopObserver();
    this.#startObserver();
  }

  #syncWithAssociatedElement(): void {
    const element = this.#associatedElement;
    if (!element) {
      return;
    }

    // If an external element is associated, the focus indicator should be removed
    if (this.targetElement) {
      this.#focusIndicator.value?.remove();
    } else if (!this.disabled && this.#focusIndicator.value && !this.#focusIndicator.value.isConnected) {
      this.#root.value?.append(this.#focusIndicator.value);
    }

    if (this.#isDisableableElement(element)) {
      if (element.disabled) {
        // Element disabled → disable component
        this.disabled = true; // Triggers willUpdate → handleDisabledChange automatically
      } else if (this.disabled) {
        // Component disabled & element not disabled → disable element
        this.#handleDisabledChange();
      }
      // If both not disabled, no action needed (already in sync)
    } else if (this.disabled) {
      // For non-disableable elements, only update internals state if component is disabled
      this.#handleDisabledChange();
    }

    this.#handleCurrentChange(element);
    this.#handlePressedChange(element);
  }

  #handleDisabledChange(): void {
    const element = this.#associatedElement;

    // Warn if trying to disable while associated with anchor
    if (this.disabled && this.#isAnchorElement(element)) {
      console.warn('Button area disabled property is set to true while associated with an anchor element. Anchor elements cannot be disabled.');
    }

    if (element?.isConnected && this.#isDisableableElement(element)) {
      element.toggleAttribute('disabled', this.disabled);
    }

    toggleState(this.#internals, 'disabled', this.disabled && !this.#isAnchorElement(element));

    // If enabled or an anchor is associated, ensure the focus indicator and state layer are attached
    if (!this.disabled || this.#isAnchorElement(element)) {
      if (this.#stateLayer.value && !this.#stateLayer.value.isConnected) {
        this.#root.value?.append(this.#stateLayer.value);
      }
      // Only append the focus indicator if an external element is not associated
      if (!this.targetElement && this.#focusIndicator.value && !this.#focusIndicator.value.isConnected) {
        this.#root.value?.append(this.#focusIndicator.value);
      }
      return;
    }

    // Remove the focus indicator and state layer if disabled and an anchor is not associated
    if (this.disabled) {
      this.#focusIndicator.value?.remove();
      this.#stateLayer.value?.remove();
    }
  }

  #handlePressedChange(element?: TargetElement | null): void {
    if (!element?.isConnected) {
      return;
    }

    const ariaPressed = element.getAttribute('aria-pressed');
    const isPressed = ariaPressed === 'true';
    toggleState(this.#internals, 'pressed', isPressed);
  }

  #handleCurrentChange(element?: TargetElement | null): void {
    if (!element?.isConnected) {
      return;
    }

    const ariaCurrent = element.getAttribute('aria-current');
    const validValues = ['true', 'page', 'step', 'location', 'date', 'time'];
    const isCurrent = ariaCurrent !== null && validValues.includes(ariaCurrent);
    toggleState(this.#internals, 'current', isCurrent);
  }

  #startObserver(): void {
    const element = this.#associatedElement;

    if (element?.isConnected) {
      this.#buttonObserver = new MutationObserver((mutations: MutationRecord[]) => {
        if (!element?.isConnected) {
          this.#handleObservedElementRemoved();
          return;
        }

        mutations.forEach(mutation => {
          switch (mutation.attributeName) {
            case 'aria-current':
              this.#handleCurrentChange(element);
              break;
            case 'aria-pressed':
              this.#handlePressedChange(element);
              break;
            case 'disabled':
              if (this.#isDisableableElement(element)) {
                this.disabled = element.disabled ?? false;
              }
              break;
          }
        });
      });

      this.#buttonObserver.observe(element, {
        attributeFilter: ['aria-current', 'aria-pressed', 'disabled']
      });
    }
  }

  #stopObserver(): void {
    this.#buttonObserver?.disconnect();
    this.#buttonObserver = undefined;
  }

  #handleObservedElementRemoved(): void {
    this.#stopObserver();

    // If target element was removed, clear it and fall back to slotted button
    if (this.targetElement) {
      this.targetElement = undefined;
    }

    this.#syncWithAssociatedElement();
  }

  #animateStateLayer(): void {
    this.#stateLayer.value?.playAnimation();
  }

  #requestDisabledButtonFrame(): void {
    const button = this.#slottedButtonElement;
    if (button && this.#isDisableableElement(button)) {
      button.disabled = true;
      requestAnimationFrame(() => {
        if (button && this.#isDisableableElement(button)) {
          button.disabled = false;
        }
      });
    }
  }

  #shouldIgnoreEvent(event: Event): boolean {
    const eventPath = getEventPath(event);
    return eventPath.some(el => el.nodeType === 1 && (el.hasAttribute('forge-ignore') || el.hasAttribute('data-forge-ignore')));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button-area': ButtonAreaComponent;
  }
}

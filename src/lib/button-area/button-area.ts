import { CUSTOM_ELEMENT_NAME_PROPERTY, getEventPath } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { createRef, Ref, ref } from 'lit/directives/ref.js';
import { IBaseComponent } from '../core/base/base-component';
import { BaseLitElement } from '../core/base/base-lit-element';
import { locateElementById, toggleState } from '../core/utils/utils';
import { IFocusIndicatorComponent } from '../focus-indicator';
import { StateLayerComponent } from '../state-layer';

import styles from './button-area.scss';

export interface IButtonAreaComponent extends IBaseComponent {
  disabled: boolean;
  target: string | null | undefined;
  targetElement: HTMLElement | null | undefined;
}

export const BUTTON_AREA_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-button-area';

type DisableableElement = HTMLElement & { disabled?: boolean };

/**
 * @tag forge-button-area
 *
 * @summary Button areas are used to create clickable areas that group related information and actions about a single subject. The button area component wraps any arbitrary content with a `<button>` element to enable accessible, clickable interfaces including nested controls and other complex content.
 *
 * @state disabled - Applied when the button area is disabled.
 *
 * @event {PointerEvent} click - The button area emits a native HTML click event whenever it or the slotted button is clicked. Add the listener to the `<forge-button-area>` element to receive all events. Note: Set `data-forge-ignore` on any nested buttons or other interactive elements to prevent them from activating the button area.
 *
 * @csspart root - The root container element.
 * @csspart button - The visually hidden slot for the `<button>` element.
 * @csspart focus-indicator - The focus-indicator indicator element.
 * @csspart state-layer - The state-layer surface element.
 *
 * @cssproperty --forge-button-area-shape - The border radius of the button area.
 * @cssproperty --forge-button-area-cursor - The cursor.
 * @cssproperty --forge-button-area-disabled-cursor - The cursor when in the disabled state.
 *
 * @slot - Places content within the default (unnamed) slot (main body of the component).
 * @slot button - Places content within a visually hidden slot. Only a `<button>` element can be placed in this slot.
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
   * Controls whether the component and associated button element are disabled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The ID of a button element to use for semantics and functionality.
   * @default undefined
   * @attribute
   */
  @property({ type: String })
  public target: string | null | undefined = undefined;

  /**
   * A button element instance to use for semantics and functionality.
   * @default undefined
   */
  @property({ attribute: false })
  public targetElement: HTMLElement | null | undefined = undefined;

  @queryAssignedElements({ slot: 'button', selector: 'button' })
  private _buttonElements: HTMLButtonElement[];

  #buttonObserver?: MutationObserver;
  #root: Ref<HTMLDivElement> = createRef();
  #stateLayer: Ref<StateLayerComponent> = createRef();
  #focusIndicator: Ref<IFocusIndicatorComponent> = createRef();

  get #buttonElement(): HTMLButtonElement | undefined {
    return this._buttonElements[0];
  }

  get #observedElement(): DisableableElement | null | undefined {
    // Return the target element if it is set and can be disabled, otherwise return the slotted button element
    return this.targetElement && 'disabled' in this.targetElement && typeof this.targetElement.disabled === 'boolean'
      ? (this.targetElement as DisableableElement)
      : this.#buttonElement;
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // Locate target element by ID if target is set
    if (this.target && !this.targetElement) {
      this.targetElement = locateElementById(this, this.target) ?? undefined;
    }
  }

  public override firstUpdated(): void {
    // Initial slotted button detection
    this.#startObserver();

    // Match the component and button states if either is disabled
    if (this.#observedElement?.disabled) {
      this.disabled = true;
    } else if (this.disabled) {
      this.#handleDisabledChange();
    }
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled')) {
      this.#handleDisabledChange();
      toggleState(this.#internals, 'disabled', this.disabled);
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
        <div id="button" class="button" part="button" @slotchange=${this.#handleSlotChange}>
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
    }

    // Prevent the click if it originates from an ignored element
    if (this.#shouldIgnoreEvent(event)) {
      event.stopPropagation();
    }
  };

  #handleKeydown = (event: KeyboardEvent): void => {
    if (event.key !== ' ' && event.key !== 'Enter') {
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

    this.#stopObserver();
    this.#startObserver();

    // Match the component and button states if either is disabled
    if (this.#buttonElement?.disabled) {
      this.disabled = true;
    } else if (this.disabled) {
      this.#buttonElement?.toggleAttribute('disabled', true);
    }
  };

  #handleTargetChange(): void {
    if (this.target) {
      this.targetElement = locateElementById(this, this.target) ?? undefined;
    }
  }

  #handleTargetElementChange(): void {
    this.#stopObserver();
    this.#startObserver();

    // Manage focus-indicator visibility
    if (this.targetElement) {
      // Remove focus-indicator when target element is set
      this.#focusIndicator.value?.remove();
    } else if (!this.disabled && this.#focusIndicator.value && this.#root.value) {
      // Restore focus-indicator when target element is cleared (if not disabled)
      this.#root.value.append(this.#focusIndicator.value);
    }

    // Sync initial disabled state from the new observed element
    const observed = this.#observedElement;
    if (observed) {
      this.disabled = observed.disabled ?? false;
    }
  }

  #handleDisabledChange(): void {
    const element = this.#observedElement;

    // Only sync if element exists and is connected
    if (element?.isConnected) {
      element.toggleAttribute('disabled', this.disabled);
    }

    // Toggle focus-indicator and state-layer visibility
    if (this.disabled) {
      this.#focusIndicator.value?.remove();
      this.#stateLayer.value?.remove();
    } else if (this.#stateLayer.value && this.#root.value) {
      this.#root.value.append(this.#stateLayer.value);

      // Only append focus-indicator if not using target element
      if (!this.targetElement && this.#focusIndicator.value) {
        this.#root.value.append(this.#focusIndicator.value);
      }
    }
  }

  #startObserver(): void {
    const element = this.#observedElement;

    if (element?.isConnected) {
      this.#buttonObserver = new MutationObserver(() => {
        const observed = this.#observedElement;

        if (!observed?.isConnected) {
          this.#handleObservedElementRemoved();
          return;
        }

        this.disabled = observed.disabled ?? false;
      });

      this.#buttonObserver.observe(element, {
        attributeFilter: ['disabled']
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
  }

  #animateStateLayer(): void {
    this.#stateLayer.value?.playAnimation();
  }

  #requestDisabledButtonFrame(): void {
    if (this.#buttonElement) {
      this.#buttonElement.disabled = true;
      requestAnimationFrame(() => {
        if (this.#buttonElement) {
          this.#buttonElement.disabled = false;
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

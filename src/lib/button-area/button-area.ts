import { CUSTOM_ELEMENT_NAME_PROPERTY, getEventPath } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { createRef, Ref, ref } from 'lit/directives/ref.js';
import { BaseLitElement } from '../core/base/base-lit-element';
import { IBaseComponent } from '../core/base/base-component';
import { IFocusIndicatorComponent } from '../focus-indicator';
import { StateLayerComponent } from '../state-layer';
import { BUTTON_AREA_CONSTANTS } from './button-area-constants';

import styles from './button-area.scss';

export interface IButtonAreaComponent extends IBaseComponent {
  disabled: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button-area': IButtonAreaComponent;
  }
}

export const BUTTON_AREA_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-button-area';

/**
 * @tag forge-button-area
 *
 * @summary Button areas are used to create clickable areas that group related information and actions about a single subject. The button area component wraps any arbitrary content with a `<button>` element to enable accessible, clickable interfaces including nested controls and other complex content.
 *
 * @property {boolean} [disabled=false] - Sets whether the button area and slotted button are disabled. Setting this on one will also set it on the other.
 *
 * @attribute {boolean} [disabled=false] - Sets whether the button area and slotted button are disabled. Setting this on one will also set it on the other.
 *
 * @event {PointerEvent} click - The button area emits a native HTML click event whenever it or the slotted button is clicked. Add the listener to the `<forge-button-area>` element to receive all events. Note: Set `data-forge-ignore` on any nested buttons or other interactive elements to prevent them from activating the button area.
 *
 * @csspart root - The root container element.
 * @csspart button - The visually hidden slot for the `<button>` element.
 * @csspart focus-indicator - The focus-indicator indicator element.
 * @csspart state-layer - The state-layer surface element.
 *
 * @cssproperty --forge-button-area-cursor - The cursor.
 * @cssproperty --forge-button-area-disabled-cursor - The cursor when in the disabled state.
 *
 * @slot - Places content within the default (unnamed) slot (main body of the component).
 * @slot button - Places content within a visually hidden slot. Always place a `<button>` element in this slot.
 */
@customElement(BUTTON_AREA_TAG_NAME)
export class ButtonAreaComponent extends BaseLitElement implements IButtonAreaComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BUTTON_AREA_TAG_NAME;

  /**
   * Controls whether the component and associated button element are disabled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  @queryAssignedElements({ slot: 'button', selector: 'button' })
  private _buttonElements: HTMLButtonElement[];

  #buttonObserver?: MutationObserver;
  #root: Ref<HTMLDivElement> = createRef();
  #stateLayer: Ref<StateLayerComponent> = createRef();
  #focusIndicator: Ref<IFocusIndicatorComponent> = createRef();

  get #buttonElement(): HTMLButtonElement | undefined {
    return this._buttonElements[0];
  }

  public override connectedCallback(): void {
    super.connectedCallback();
  }

  public override firstUpdated(): void {
    // Initial slotted button detection
    this.#startButtonObserver();

    // Match the component and button states if either is disabled
    if (this.#buttonElement?.disabled) {
      this.disabled = true;
    } else if (this.disabled) {
      this.#handleDisabledChange();
    }
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled')) {
      this.#handleDisabledChange();
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
        <div class="button" part="button" @slotchange=${this.#handleSlotChange}>
          <slot name="button"></slot>
        </div>
        <slot @click=${this.#handleIgnoreStateLayer} @pointerdown=${this.#handleIgnoreStateLayer} @pointerup=${this.#handleIgnoreStateLayer}></slot>
        <forge-state-layer target="root" exportparts="surface:state-layer" ${ref(this.#stateLayer)}></forge-state-layer>
        <forge-focus-indicator target="button" part="focus-indicator" inward ${ref(this.#focusIndicator)}></forge-focus-indicator>
      </div>
    `;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#stopButtonObserver();
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
    // Clear old button-connected listeners
    this.#stopButtonObserver();

    this.#startButtonObserver();

    // Match the component and button states if either is disabled
    if (this.#buttonElement?.disabled) {
      this.disabled = true;
    } else if (this.disabled) {
      this.#buttonElement?.toggleAttribute(BUTTON_AREA_CONSTANTS.attributes.DISABLED, true);
    }
  };

  #handleDisabledChange(): void {
    // Sync with button element
    this.#buttonElement?.toggleAttribute(BUTTON_AREA_CONSTANTS.attributes.DISABLED, this.disabled);

    // Toggle focus-indicator and state-layer visibility
    if (this.disabled) {
      this.#focusIndicator.value?.remove();
      this.#stateLayer.value?.remove();
    } else if (this.#focusIndicator.value && this.#stateLayer.value && this.#root.value) {
      this.#root.value.append(this.#focusIndicator.value, this.#stateLayer.value);
    }
  }

  #startButtonObserver(): void {
    if (this.#buttonElement) {
      this.#buttonObserver = new MutationObserver(() => {
        this.disabled = this.#buttonElement?.disabled ?? false;
      });
      this.#buttonObserver.observe(this.#buttonElement, {
        attributeFilter: [BUTTON_AREA_CONSTANTS.attributes.DISABLED]
      });
    }
  }

  #stopButtonObserver(): void {
    this.#buttonObserver?.disconnect();
    this.#buttonObserver = undefined;
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
    return eventPath.some(
      el => el.nodeType === 1 && (el.hasAttribute(BUTTON_AREA_CONSTANTS.attributes.IGNORE) || el.hasAttribute(BUTTON_AREA_CONSTANTS.attributes.IGNORE_ALT))
    );
  }
}

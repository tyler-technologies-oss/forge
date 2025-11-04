import { customElement, attachShadowTemplate, coreProperty, coerceBoolean } from '@tylertech/forge-core';
import { ButtonAreaAdapter } from './button-area-adapter';
import { ButtonAreaCore } from './button-area-core';
import { BUTTON_AREA_CONSTANTS } from './button-area-constants';
import { FocusIndicatorComponent } from '../focus-indicator';
import { StateLayerComponent } from '../state-layer';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './button-area.html';
import styles from './button-area.scss';

export interface IButtonAreaComponent extends IBaseComponent {
  disabled: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button-area': IButtonAreaComponent;
  }
}

/**
 * @tag forge-button-area
 *
 * @summary Button areas are used to create a clickable area that group related information and actions about a single subject. The button area component wraps any arbitrary content with a `<button>` element to enable accessible, clickable interfaces including nested controls and other complex content.
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
@customElement({
  name: BUTTON_AREA_CONSTANTS.elementName,
  dependencies: [FocusIndicatorComponent, StateLayerComponent]
})
export class ButtonAreaComponent extends BaseComponent implements IButtonAreaComponent {
  public static get observedAttributes(): string[] {
    return [BUTTON_AREA_CONSTANTS.attributes.DISABLED];
  }

  private _core: ButtonAreaCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new ButtonAreaCore(new ButtonAreaAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BUTTON_AREA_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
    }
  }

  /** Controls whether the component and associated button element are disabled. */
  @coreProperty()
  declare public disabled: boolean;
}

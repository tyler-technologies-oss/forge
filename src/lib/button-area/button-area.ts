import { CustomElement, attachShadowTemplate, ICustomElement, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';
import { ButtonAreaAdapter } from './button-area-adapter';
import { ButtonAreaFoundation } from './button-area-foundation';
import { BUTTON_AREA_CONSTANTS } from './button-area-constants';
import { FocusIndicatorComponent } from '../focus-indicator';
import { StateLayerComponent } from '../state-layer';

import template from './button-area.html';
import styles from './button-area.scss';

export interface IButtonAreaComponent extends ICustomElement {
  disabled: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button-area': IButtonAreaComponent;
  }
}

/**
 * The custom element class behind the `<forge-button-area>` element.
 *
 * @tag forge-button-area
 *
 * @summary Button areas are used to create a clickable area that group related information and actions about a single subject.
 *
 * @description
 * The button area component wraps any arbitrary content with a <button> element to enable accessible clickable interfaces including nested controls and other complex content.
 *
 * @property {boolean} disabled - Sets whether the button area and slotted button are disabled. Setting this on one will also set it on the other.
 *
 * @attribute {boolean} disabled - Sets whether the button area and slotted button are disabled. Setting this on one will also set it on the other.
 *
 * @event {Event} click - The button area emits a native HTML click event whenever it or the slotted button is clicked. Add the listener to the <forge-button-area> element to receive all events. Note: Set data-forge-ignore on any nested buttons or other interactive elements to prevent them from activating the button area.
 *
 * @csspart root - The root container element.
 * @csspart button - The visually hidden slot for the <button> element.
 * @csspart focus-indicator - The focus-indicator indicator element.
 * @csspart state-layer - The state-layer surface element.
 *
 * @slot - Places content within the default (unnamed) slot (main body of the component).
 * @slot button - Places content within a visually hidden slot. Always place a <button> element in this slot.
 */
@CustomElement({
  name: BUTTON_AREA_CONSTANTS.elementName,
  dependencies: [
    FocusIndicatorComponent,
    StateLayerComponent
  ]
})
export class ButtonAreaComponent extends HTMLElement implements IButtonAreaComponent {
  public static get observedAttributes(): string[] {
    return [
      BUTTON_AREA_CONSTANTS.attributes.DISABLED
    ];
  }

  private _foundation: ButtonAreaFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ButtonAreaFoundation(new ButtonAreaAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BUTTON_AREA_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
    }
  }

  /** Controls whether the component and associated button element are disabled. */
  @FoundationProperty()
  public declare disabled: boolean;
}

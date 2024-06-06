import { customElement, attachShadowTemplate, coreProperty, coerceBoolean } from '@tylertech/forge-core';
import { StateLayerAdapter } from './state-layer-adapter';
import { StateLayerCore } from './state-layer-core';
import { StateLayerCoords, STATE_LAYER_CONSTANTS } from './state-layer-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './state-layer.html';
import styles from './state-layer.scss';

export interface IStateLayerComponent extends IBaseComponent {
  targetElement: HTMLElement | null;
  target: string | null;
  disabled: boolean;
  playAnimation(coords?: StateLayerCoords): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-state-layer': IStateLayerComponent;
  }
}

/**
 * @tag forge-state-layer
 * 
 * @summary State layers show the interaction status of an element.
 * 
 * @description A state layer is a semi-transparent overlay on an element that indicates its interaction
 * state. State layers provide a systematic approach to visualizing states by using opacity.
 * A layer can be applied to an entire element or in a circular shape. Only one state layer
 * can be applied at a given time.
 * 
 * @property {HTMLElement} targetElement - The element to attach the state layer to.
 * @property {string} target - The id of the element to attach the state layer to.
 * @property {boolean} [disabled=false] - Controls whether the state layer is disabled.
 * 
 * @attribute {string} target - The id of the element to attach the state layer to.
 * @attribute {boolean} [disabled=false] - Controls whether the state layer is disabled.
 * 
 * @cssproperty --forge-state-layer-color - The color of the state layer. Defaults to the on-surface theme.
 * @cssproperty --forge-state-layer-hover-color - The color of the state layer when hovered.
 * @cssproperty --forge-state-layer-hover-opacity - The opacity of the state layer when hovered.
 * @cssproperty --forge-state-layer-pressed-color - The color of the state layer when pressed.
 * @cssproperty --forge-state-layer-pressed-opacity - The opacity of the state layer when pressed.
 * @cssproperty --forge-state-layer-hover-duration - The duration of the hover animation.
 * @cssproperty --forge-state-layer-animation-duration - The duration of the animation.
 * @cssproperty --forge-state-layer-pressed-duration - The duration of the pressed animation.
 * 
 * @csspart surface - The surface element.
 */
@customElement({
  name: STATE_LAYER_CONSTANTS.elementName
})
export class StateLayerComponent extends BaseComponent implements IStateLayerComponent {
  public static get observedAttributes(): string[] {
    return [
      STATE_LAYER_CONSTANTS.attributes.TARGET,
      STATE_LAYER_CONSTANTS.attributes.DISABLED
    ];
  }

  private _core: StateLayerCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new StateLayerCore(new StateLayerAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case STATE_LAYER_CONSTANTS.attributes.TARGET:
        this.target = newValue;
        break;
      case STATE_LAYER_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
    }
  }

  @coreProperty()
  public declare targetElement: HTMLElement | null;

  @coreProperty()
  public declare target: string | null;

  @coreProperty()
  public declare disabled: boolean;

  /**
   * Triggers the animation to run.
   * 
   * Note: If coordinates are not provided, the transition will originate from the center of the target element.
   * 
   * @param {StateLayerCoords} [coords] - The coordinates to play the animation from.
   */
  public playAnimation(coords?: StateLayerCoords): void {
    this._core.playAnimation(coords);
  }
}

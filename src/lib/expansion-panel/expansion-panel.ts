import { attachShadowTemplate, coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { ExpansionPanelAdapter } from './expansion-panel-adapter';
import { ExpansionPanelAnimationType, ExpansionPanelOrientation, EXPANSION_PANEL_CONSTANTS } from './expansion-panel-constants';
import { ExpansionPanelCore } from './expansion-panel-core';

import template from './expansion-panel.html';
import styles from './expansion-panel.scss';

export interface IExpansionPanelComponent extends IBaseComponent {
  open: boolean;
  orientation: ExpansionPanelOrientation;
  animationType: ExpansionPanelAnimationType;
  toggle(): void;
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

/**
 * @tag forge-expansion-panel
 *
 * @summary Expansion panels provide progressive disclosure of content.
 *
 * @property {boolean} [open=false] - Whether the panel is open or closed.
 * @property {ExpansionPanelOrientation} [orientation="vertical"] - The orientation of the panel.
 * @property {ExpansionPanelAnimationType} [animationType="default"] - The type of animation to use when opening/closing the panel.
 *
 * @attribute {boolean} [open=false] - Whether the panel is open or closed.
 * @attribute {ExpansionPanelOrientation} [orientation="vertical"] - The orientation of the panel.
 * @attribute {ExpansionPanelAnimationType} [animation-type="default"] - The type of animation to use when opening/closing the panel.
 *
 * @fires {CustomEvent<boolean>} forge-expansion-panel-toggle - Event fired when the panel is toggled open or closed.
 * @fires {CustomEvent<boolean>} forge-expansion-panel-animation-complete - Event fired when the panel has finished animating when toggling.
 *
 * @cssproperty --forge-expansion-panel-animation-duration - The duration of the open/close animation.
 * @cssproperty --forge-expansion-panel-animation-easing - The easing function of the open/close animation.
 *
 * @csspart root - The root element of the panel.
 * @csspart header - The header of the panel.
 * @csspart content - The content of the panel.
 *
 * @slot - The content of the panel.
 * @slot header - The header of the panel.
 */
@customElement({
  name: EXPANSION_PANEL_CONSTANTS.elementName
})
export class ExpansionPanelComponent extends BaseComponent implements IExpansionPanelComponent {
  public static get observedAttributes(): string[] {
    return Object.values(EXPANSION_PANEL_CONSTANTS.observedAttributes);
  }

  private _core: ExpansionPanelCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new ExpansionPanelCore(new ExpansionPanelAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case EXPANSION_PANEL_CONSTANTS.observedAttributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case EXPANSION_PANEL_CONSTANTS.observedAttributes.ORIENTATION:
        this.orientation = newValue as ExpansionPanelOrientation;
        break;
      case EXPANSION_PANEL_CONSTANTS.observedAttributes.ANIMATION_TYPE:
        this.animationType = newValue as ExpansionPanelAnimationType;
        break;
    }
  }

  @coreProperty()
  public declare open: boolean;

  @coreProperty()
  public declare orientation: ExpansionPanelOrientation;

  @coreProperty()
  public declare animationType: ExpansionPanelAnimationType;

  /**
   * Toggles the open state of the panel.
   */
  public toggle(): void {
    this.open = !this.open;
  }
}

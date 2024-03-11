import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { ExpansionPanelAdapter } from './expansion-panel-adapter';
import { ExpansionPanelAnimationType, ExpansionPanelOrientation, EXPANSION_PANEL_CONSTANTS } from './expansion-panel-constants';
import { ExpansionPanelFoundation } from './expansion-panel-foundation';

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
 * @property {boolean} open - Whether the panel is open or closed.
 * @property {ExpansionPanelOrientation} orientation - The orientation of the panel.
 * @property {ExpansionPanelAnimationType} animationType - The type of animation to use when opening/closing the panel.
 * 
 * @attribute {boolean} open - Whether the panel is open or closed.
 * @attribute {ExpansionPanelOrientation} orientation - The orientation of the panel.
 * @attribute {ExpansionPanelAnimationType} animation-type - The type of animation to use when opening/closing the panel.
 * 
 * @fires forge-expansion-panel-toggle - Event fired when the panel is toggled open or closed.
 * @fires forge-expansion-panel-animation-complete - Event fired when the panel has finished animating when toggling.
 * 
 * @cssproperty --forge-expansion-animation-duration - The duration of the open/close animation.
 * @cssproperty --forge-expansion-animation-easing - The easing function of the open/close animation.
 * 
 * @csspart root - The root element of the panel.
 * @csspart header - The header of the panel.
 * @csspart content - The content of the panel.
 * 
 * @slot - The content of the panel.
 * @slot header - The header of the panel.
 */
@CustomElement({
  name: EXPANSION_PANEL_CONSTANTS.elementName
})
export class ExpansionPanelComponent extends BaseComponent implements IExpansionPanelComponent {
  public static get observedAttributes(): string[] {
    return Object.values(EXPANSION_PANEL_CONSTANTS.observedAttributes);
  }

  private _foundation: ExpansionPanelFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ExpansionPanelFoundation(new ExpansionPanelAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
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

  @FoundationProperty()
  public declare open: boolean;

  @FoundationProperty()
  public declare orientation: ExpansionPanelOrientation;

  @FoundationProperty()
  public declare animationType: ExpansionPanelAnimationType;

  public toggle(): void {
    this.open = !this.open;
  }
}

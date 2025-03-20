import { attachShadowTemplate, coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { ExpansionPanelAdapter } from './expansion-panel-adapter';
import { ExpansionPanelAnimationType, ExpansionPanelOrientation, EXPANSION_PANEL_CONSTANTS, emulateUserToggle } from './expansion-panel-constants';
import { ExpansionPanelCore } from './expansion-panel-core';

import template from './expansion-panel.html';
import styles from './expansion-panel.scss';

export interface IExpansionPanelComponent extends IBaseComponent {
  open: boolean;
  orientation: ExpansionPanelOrientation;
  animationType: ExpansionPanelAnimationType;
  trigger: string;
  triggerElement: HTMLElement | null;
  toggle(): void;
  [emulateUserToggle](open: boolean): void;
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
 * @property {string} trigger - The id of the element that the expansion panel should be toggled by.
 * @property {HTMLElement | null} triggerElement - The element that the expansion panel should be toggled by.
 *
 * @attribute {boolean} [open=false] - Whether the panel is open or closed.
 * @attribute {ExpansionPanelOrientation} [orientation="vertical"] - The orientation of the panel.
 * @attribute {ExpansionPanelAnimationType} [animation-type="default"] - The type of animation to use when opening/closing the panel.
 * @attribute {string} [trigger] - The id of the button that the expansion panel is associated with.
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
 * @cssclass forge-expansion-panel - The expandable element content container (required).
 * @cssclass forge-expansion-panel__content - The expandable content within the panel container.
 * @cssclass forge-expansion-panel--open - The open state of the panel.
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

  public disconnectedCallback(): void {
    this._core.destroy();
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
      case EXPANSION_PANEL_CONSTANTS.observedAttributes.TRIGGER:
        this.trigger = newValue;
    }
  }

  @coreProperty()
  declare public open: boolean;

  @coreProperty()
  declare public orientation: ExpansionPanelOrientation;

  @coreProperty()
  declare public animationType: ExpansionPanelAnimationType;

  @coreProperty()
  declare public trigger: string;

  @coreProperty()
  declare public triggerElement: HTMLElement | null;

  /**
   * Toggles the open state of the panel.
   */
  public toggle(): void {
    this.open = !this.open;
  }

  /**
   * @internal
   *
   * Emulates a user toggle of the panel, by also dispatching the toggle event.
   */
  public [emulateUserToggle](open: boolean): void {
    if (this.open === open) {
      return;
    }
    this.open = open;
    this._core.dispatchToggleEvent();
  }
}

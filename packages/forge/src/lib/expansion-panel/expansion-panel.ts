import { attachShadowTemplate, coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component.js';
import { ExpansionPanelAdapter } from './expansion-panel-adapter.js';
import { ExpansionPanelAnimationType, ExpansionPanelOrientation, EXPANSION_PANEL_CONSTANTS, emulateUserToggle } from './expansion-panel-constants.js';
import { ExpansionPanelCore } from './expansion-panel-core.js';

import template from './expansion-panel.html';
import styles from './expansion-panel.scss';
import { IOpenIconComponent } from '../open-icon/index.js';

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
 * @property {string} trigger - The id of the button that the expansion panel should be toggled by.
 * @property {HTMLElement | null} triggerElement - The button that the expansion panel should be toggled by.
 * @property {string} openIcon - The id of the `<forge-open-icon>` that the expansion panel should toggle.
 * @property {IOpenIconComponent | null} openIconElement - The `<forge-open-icon>` that the expansion panel should toggle.
 *
 * @attribute {boolean} [open=false] - Whether the panel is open or closed.
 * @attribute {ExpansionPanelOrientation} [orientation="vertical"] - The orientation of the panel.
 * @attribute {ExpansionPanelAnimationType} [animation-type="default"] - The type of animation to use when opening/closing the panel.
 * @attribute {string} [trigger] - The id of the button that the expansion panel should be toggled by.
 * @attribute {string} [open-icon] - The id of the `<forge-open-icon>` that the expansion panel should toggle.
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
 * @slot header - The header of the panel. This is deprecated, prefer using the trigger property instead, or manually associating a button with the panel.
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
        break;
      case EXPANSION_PANEL_CONSTANTS.observedAttributes.OPEN_ICON:
        this.openIcon = newValue;
        break;
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

  @coreProperty()
  declare public openIcon: string;

  @coreProperty()
  declare public openIconElement: IOpenIconComponent | null;

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

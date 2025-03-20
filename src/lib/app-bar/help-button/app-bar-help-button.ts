import { customElement, attachLightTemplate, coreProperty } from '@tylertech/forge-core';
import { tylIconHelp } from '@tylertech/tyler-icons/standard';
import { IMenuOption, MenuComponent } from '../../menu';
import { AppBarHelpButtonAdapter } from './app-bar-help-button-adapter';
import { AppBarHelpButtonCore } from './app-bar-help-button-core';
import { APP_BAR_HELP_BUTTON_CONSTANTS } from './app-bar-help-button-constants';
import { IconButtonComponent } from '../../icon-button';
import { TooltipComponent } from '../../tooltip';
import { IconRegistry } from '../../icon';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';

import template from './app-bar-help-button.html';

export interface IAppBarHelpButtonComponent extends IBaseComponent {
  options: IMenuOption[];
  icon: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-bar-help-button': IAppBarHelpButtonComponent;
  }
}

/**
 * @tag forge-app-bar-help-button
 *
 * @description A utility component with predefined icon and descriptions for use in an app bar `end` slot.
 *
 * @property {IMenuOption[]} [options=[]] - The menu options to display when the button is clicked
 * @property {string} [icon=help] - The name of an alternative icon to display.
 *
 * @attribute {string} [icon=help] - The name of an alternative icon to display.
 * @attribute {string} [aria-label] - The aria-label to apply to the button.
 * @attribute {string} [aria-labelledby] - The id of an element to use as the aria-labelledby attribute.
 *
 * @event {CustomEvent<IMenuSelectEventData>} forge-menu-select - Bubbles up the menu select from the internal menu component.
 */
@customElement({
  name: APP_BAR_HELP_BUTTON_CONSTANTS.elementName,
  dependencies: [MenuComponent, IconButtonComponent, TooltipComponent]
})
export class AppBarHelpButtonComponent extends BaseComponent implements IAppBarHelpButtonComponent {
  public static get observedAttributes(): string[] {
    return [APP_BAR_HELP_BUTTON_CONSTANTS.attributes.ICON];
  }

  private _core: AppBarHelpButtonCore;

  constructor() {
    super();
    IconRegistry.define(tylIconHelp);
    this._core = new AppBarHelpButtonCore(new AppBarHelpButtonAdapter(this));
  }

  public initializedCallback(): void {
    attachLightTemplate(this, template);
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case APP_BAR_HELP_BUTTON_CONSTANTS.attributes.ICON:
        this.icon = newValue;
        break;
    }
  }

  @coreProperty()
  declare public options: IMenuOption[];

  @coreProperty()
  declare public icon: string;
}

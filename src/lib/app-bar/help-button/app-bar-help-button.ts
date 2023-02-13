import { CustomElement, attachLightTemplate, FoundationProperty } from '@tylertech/forge-core';
import { tylIconHelp } from '@tylertech/tyler-icons/standard';
import { IMenuOption, MenuComponent } from '../../menu';
import { AppBarHelpButtonAdapter } from './app-bar-help-button-adapter';
import { AppBarHelpButtonFoundation } from './app-bar-help-button-foundation';
import { APP_BAR_HELP_BUTTON_CONSTANTS } from './app-bar-help-button-constants';
import { IconButtonComponent } from '../../icon-button';
import { TooltipComponent } from '../../tooltip';
import { IconComponent, IconRegistry } from '../../icon';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';

import template from './app-bar-help-button.html';

export interface IAppBarHelpButtonComponent extends IBaseComponent {
  options: IMenuOption[];
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-bar-help-button': IAppBarHelpButtonComponent;
  }
}

/**
 * The web component class behind the `<forge-app-bar-help-button>` custom element.
 * 
 * @tag forge-app-bar-help-button
 */
@CustomElement({
  name: APP_BAR_HELP_BUTTON_CONSTANTS.elementName,
  dependencies: [
    MenuComponent,
    IconButtonComponent,
    TooltipComponent,
    IconComponent
  ]
})
export class AppBarHelpButtonComponent extends BaseComponent implements IAppBarHelpButtonComponent {
  private _foundation: AppBarHelpButtonFoundation;

  constructor() {
    super();
    IconRegistry.define(tylIconHelp);
    this._foundation = new AppBarHelpButtonFoundation(new AppBarHelpButtonAdapter(this));
  }

  public initializedCallback(): void {
    attachLightTemplate(this, template);
  }
  
  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  @FoundationProperty()
  public declare options: IMenuOption[];
}

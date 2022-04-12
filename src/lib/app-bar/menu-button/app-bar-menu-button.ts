import { CustomElement, attachLightTemplate } from '@tylertech/forge-core';

import { APP_BAR_MENU_BUTTON_CONSTANTS } from './app-bar-menu-button-constants';
import { IconButtonComponent } from '../../icon-button';
import { TooltipComponent } from '../../tooltip';
import { IconComponent, IconRegistry } from '../../icon';
import { tylIconMenu } from '@tylertech/tyler-icons/standard';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';

import template from './app-bar-menu-button.html';

export interface IAppBarMenuButtonComponent extends IBaseComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-bar-menu-button': IAppBarMenuButtonComponent;
  }
}

@CustomElement({
  name: APP_BAR_MENU_BUTTON_CONSTANTS.elementName,
  dependencies: [
    IconButtonComponent,
    TooltipComponent,
    IconComponent
  ]
})
export class AppBarMenuButtonComponent extends BaseComponent implements IAppBarMenuButtonComponent {

  constructor() {
    super();
    IconRegistry.define(tylIconMenu);
  }

  public initializedCallback(): void {
    attachLightTemplate(this, template);
  }
}

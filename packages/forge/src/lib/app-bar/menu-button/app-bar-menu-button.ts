import { customElement, attachLightTemplate, toggleAttribute, getLightElement } from '@tylertech/forge-core';
import { APP_BAR_MENU_BUTTON_CONSTANTS } from './app-bar-menu-button-constants.js';
import { IconButtonComponent, ICON_BUTTON_CONSTANTS, IIconButtonComponent } from '../../icon-button/index.js';
import { TooltipComponent } from '../../tooltip/index.js';
import { IconRegistry, ICON_CONSTANTS, IIconComponent } from '../../icon/index.js';
import { tylIconMenu } from '@tylertech/tyler-icons';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component.js';
import { forwardAttributes } from '../../core/utils/reflect-utils.js';

import template from './app-bar-menu-button.html';

export interface IAppBarMenuButtonComponent extends IBaseComponent {
  icon: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-bar-menu-button': IAppBarMenuButtonComponent;
  }
}

/**
 * @tag forge-app-bar-menu-button
 *
 * @summary A menu toggle button component with a predefined hamburger menu icon, typically used in an app bar's start slot to open navigation menus.
 *
 * @property {string} [icon=menu] - The name of an alternative icon to display.
 *
 * @attribute {string} [icon=menu] - The name of an alternative icon to display.
 * @attribute {string} [aria-label] - The aria-label to apply to the button.
 * @attribute {string} [aria-labelledby] - The id of an element to use as the aria-labelledby attribute.
 */
@customElement({
  name: APP_BAR_MENU_BUTTON_CONSTANTS.elementName,
  dependencies: [IconButtonComponent, TooltipComponent]
})
export class AppBarMenuButtonComponent extends BaseComponent implements IAppBarMenuButtonComponent {
  public static get observedAttributes(): string[] {
    return Object.values(APP_BAR_MENU_BUTTON_CONSTANTS.observedAttributes);
  }

  private _iconButtonElement: IIconButtonComponent;
  private _iconElement: IIconComponent;
  private _forwardObserver?: MutationObserver;
  private _iconName: string = tylIconMenu.name;

  constructor() {
    super();
    IconRegistry.define(tylIconMenu);
  }

  public initializedCallback(): void {
    attachLightTemplate(this, template);
  }

  public connectedCallback(): void {
    this._iconButtonElement = getLightElement(this, ICON_BUTTON_CONSTANTS.elementName) as IIconButtonComponent;
    this._iconElement = this._iconButtonElement.querySelector(ICON_CONSTANTS.elementName) as IIconComponent;

    if (this._iconElement.name !== this._iconName) {
      this._iconElement.name = this._iconName;
    }

    const originalAriaLabelledby = this._iconButtonElement.getAttribute('aria-labelledby');

    this._forwardObserver = forwardAttributes(this, APP_BAR_MENU_BUTTON_CONSTANTS.forwardedAttributes, (name, value) => {
      if (name === 'aria-labelledby' && !value) {
        value = originalAriaLabelledby;
      }
      toggleAttribute(this._iconButtonElement, !!value, name, value ?? undefined);
    });
  }

  public disconnectedCallback(): void {
    this._forwardObserver?.disconnect();
    this._forwardObserver = undefined;
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case APP_BAR_MENU_BUTTON_CONSTANTS.attributes.ICON:
        this.icon = newValue;
        break;
    }
  }

  public get icon(): string {
    return this._iconName;
  }
  public set icon(value: string) {
    if (this._iconName !== value) {
      this._iconName = value ?? tylIconMenu.name;
      if (this._iconElement) {
        this._iconElement.name = this._iconName;
      }
      this.setAttribute(APP_BAR_MENU_BUTTON_CONSTANTS.attributes.ICON, this._iconName);
    }
  }
}

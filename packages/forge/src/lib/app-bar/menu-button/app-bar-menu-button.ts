import { customElement, attachLightTemplate, toggleAttribute, getLightElement, coerceBoolean } from '@tylertech/forge-core';
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
  expanded: boolean;
  controls: string | null;
  hasPopup: string | null;
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
 * @property {boolean} [expanded=false] - Whether the menu controlled by this button is expanded. Reflected as `aria-expanded` on the internal button.
 * @property {string} [controls] - The id of the element (e.g., drawer or menu) controlled by this button. Reflected as `aria-controls` on the internal button.
 * @property {string} [hasPopup=menu] - Indicates the button opens a menu or dialog. Valid values include "menu", "dialog", "true". Reflected as `aria-haspopup` on the internal button.
 *
 * @attribute {string} [icon=menu] - The name of an alternative icon to display.
 * @attribute {boolean} [expanded=false] - Whether the menu controlled by this button is expanded. Reflected as `aria-expanded` on the internal button.
 * @attribute {string} [controls] - The id of the element (e.g., drawer or menu) controlled by this button. Reflected as `aria-controls` on the internal button.
 * @attribute {string} [has-popup=menu] - Indicates the button opens a menu or dialog. Valid values include "menu", "dialog", "true". Reflected as `aria-haspopup` on the internal button.
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
  private _expanded = false;
  private _controls: string | null = null;
  private _hasPopup: string | null = 'menu';

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

    this._iconButtonElement.setAttribute('aria-expanded', String(this._expanded));
    toggleAttribute(this._iconButtonElement, !!this._controls, 'aria-controls', this._controls ?? undefined);
    toggleAttribute(this._iconButtonElement, !!this._hasPopup, 'aria-haspopup', this._hasPopup ?? undefined);

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
      case APP_BAR_MENU_BUTTON_CONSTANTS.attributes.EXPANDED:
        this.expanded = coerceBoolean(newValue);
        break;
      case APP_BAR_MENU_BUTTON_CONSTANTS.attributes.CONTROLS:
        this.controls = newValue;
        break;
      case APP_BAR_MENU_BUTTON_CONSTANTS.attributes.HAS_POPUP:
        this.hasPopup = newValue;
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

  public get expanded(): boolean {
    return this._expanded;
  }
  public set expanded(value: boolean) {
    const newValue = !!value;
    if (this._expanded !== newValue) {
      this._expanded = newValue;
      if (this._iconButtonElement) {
        this._iconButtonElement.setAttribute('aria-expanded', String(newValue));
      }
      toggleAttribute(this, newValue, APP_BAR_MENU_BUTTON_CONSTANTS.attributes.EXPANDED);
    }
  }

  public get controls(): string | null {
    return this._controls;
  }
  public set controls(value: string | null) {
    if (this._controls !== value) {
      this._controls = value;
      if (this._iconButtonElement) {
        toggleAttribute(this._iconButtonElement, !!value, 'aria-controls', value ?? undefined);
      }
      toggleAttribute(this, !!value, APP_BAR_MENU_BUTTON_CONSTANTS.attributes.CONTROLS, value ?? undefined);
    }
  }

  public get hasPopup(): string | null {
    return this._hasPopup;
  }
  public set hasPopup(value: string | null) {
    if (this._hasPopup !== value) {
      this._hasPopup = value;
      if (this._iconButtonElement) {
        toggleAttribute(this._iconButtonElement, !!value, 'aria-haspopup', value ?? undefined);
      }
      toggleAttribute(this, !!value, APP_BAR_MENU_BUTTON_CONSTANTS.attributes.HAS_POPUP, value ?? undefined);
    }
  }
}

import { attachLightTemplate, coerceBoolean, coerceNumber, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { tylIconNotifications } from '@tylertech/tyler-icons/standard';
import { BadgeComponent } from '../../badge';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IconComponent, IconRegistry } from '../../icon';
import { IconButtonComponent } from '../../icon-button';
import { TooltipComponent } from '../../tooltip';
import { AppBarNotificationButtonAdapter } from './app-bar-notification-button-adapter';
import { APP_BAR_NOTIFICATION_BUTTON_CONSTANTS } from './app-bar-notification-button-constants';
import { AppBarNotificationButtonFoundation } from './app-bar-notification-button-foundation';

import template from './app-bar-notification-button.html';

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-bar-notification-button': IAppBarNotificationButtonComponent;
  }
}

export interface IAppBarNotificationButtonComponent extends IBaseComponent {
  count: string | number | null | undefined;
  dot: boolean;
  showBadge: boolean;
  theme: string;
  icon: string;
}
/**
 * @tag forge-app-bar-notification-button
 * 
 * @property {number | string} [count = 0] - The number to display in the badge.
 * @property {boolean} [dot = false] - Whether to display the dot variant of the badge or not.
 * @property {boolean} [showBadge = false] - Whether to display the badge or not.
 * @property {string} [theme = ""] - The theme to apply to the badge.
 * @property {string} [icon = notifications] - The name of an alternative icon to display.
 * 
 * @attribute {string} [count = 0] - The number to display in the badge.
 * @attribute {boolean} [dot = false] - Whether to display the dot variant of the badge or not.
 * @attribute {boolean} [show-badge = false] - Whether to display the badge or not.
 * @attribute {string} [theme = ""] - The theme to apply to the badge.
 * @attribute {string} [icon = notifications] - The name of an alternative icon to display.
 * @attribute {string} [aria-label] - The aria-label to apply to the button.
 * @attribute {string} [aria-labelledby] - The id of an element to use as the aria-labelledby attribute.
 */
@CustomElement({
  name: APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.elementName,
  dependencies: [
    IconButtonComponent,
    TooltipComponent,
    BadgeComponent,
    IconComponent
  ]
})
export class AppBarNotificationButtonComponent extends BaseComponent implements IAppBarNotificationButtonComponent {
  public static get observedAttributes(): string[] {
    return [
      APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.COUNT,
      APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.DOT,
      APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.THEME,
      APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.SHOW_BADGE,
      APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.ICON
    ];
  }

  private _foundation: AppBarNotificationButtonFoundation;

  constructor() {
    super();
    IconRegistry.define(tylIconNotifications);
    this._foundation = new AppBarNotificationButtonFoundation(new AppBarNotificationButtonAdapter(this));
  }

  public initializedCallback(): void {
    attachLightTemplate(this, template);
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.COUNT:
        this.count = newValue;
        break;
      case APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.DOT:
        this.dot = coerceBoolean(newValue);
        break;
      case APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.THEME:
        this.theme = newValue;
        break;
      case APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.ICON:
        this.icon = newValue;
        break;
      case APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.SHOW_BADGE:
        this.showBadge = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public declare count: string | number | null | undefined;

  @FoundationProperty()
  public declare dot: boolean;

  @FoundationProperty()
  public declare theme: string;

  @FoundationProperty()
  public declare icon: string;

  @FoundationProperty()
  public declare showBadge: boolean;
}

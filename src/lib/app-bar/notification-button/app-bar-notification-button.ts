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
  count: number;
  dot: boolean;
  showBadge: boolean;
  theme: string;
}
/**
 * The web component class behind the `<forge-app-bar-notification-button>` custom element.
 * 
 * @tag forge-app-bar-notification-button
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
      APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.SHOW_BADGE
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

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.COUNT:
        this.count = coerceNumber(newValue);
        break;
      case APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.DOT:
        this.dot = coerceBoolean(newValue);
        break;
      case APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.THEME:
        this.theme = newValue;
        break;
      case APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.SHOW_BADGE:
        this.showBadge = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public count: number;

  @FoundationProperty()
  public dot: boolean;

  @FoundationProperty()
  public theme: string;

  @FoundationProperty()
  public showBadge: boolean;
}

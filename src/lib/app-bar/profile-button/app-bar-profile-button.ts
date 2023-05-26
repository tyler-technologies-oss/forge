import { CustomElement, attachLightTemplate, coerceNumber, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { AppBarProfileButtonAdapter } from './app-bar-profile-button-adapter';
import { AppBarProfileButtonFoundation } from './app-bar-profile-button-foundation';
import { APP_BAR_PROFILE_BUTTON_CONSTANTS, AppBarProfileButtonProfileCardBuilder } from './app-bar-profile-button-constants';
import { ProfileCardComponent } from '../../profile-card';
import { IconButtonComponent } from '../../icon-button';
import { AvatarComponent } from '../../avatar';
import { PopupComponent } from '../../popup';
import { TooltipComponent } from '../../tooltip';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IconComponent } from '../../icon';

import template from './app-bar-profile-button.html';

export interface IAppBarProfileButtonComponent extends IBaseComponent {
  avatarImageUrl: string;
  avatarLetterCount: number;
  avatarText: string;
  avatarIcon: string;
  fullName: string;
  email: string;
  signOutButton: boolean;
  profileButton: boolean;
  signOutButtonText: string;
  profileButtonText: string;
  open: boolean;
  profileCardBuilder: (fn: AppBarProfileButtonProfileCardBuilder) => void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-bar-profile-button': IAppBarProfileButtonComponent;
  }
}

/**
 * The web component class behind the `<forge-app-bar-profile-button>` custom element.
 * 
 * @tag forge-app-bar-profile-button
 */
@CustomElement({
  name: APP_BAR_PROFILE_BUTTON_CONSTANTS.elementName,
  dependencies: [
    PopupComponent,
    ProfileCardComponent,
    IconButtonComponent,
    IconComponent,
    AvatarComponent,
    TooltipComponent
  ]
})
export class AppBarProfileButtonComponent extends BaseComponent implements IAppBarProfileButtonComponent {
  public static get observedAttributes(): string[] {
    return [
      APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.FULL_NAME,
      APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.EMAIL,
      APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_IMAGE_URL,
      APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_LETTER_COUNT,
      APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_TEXT,
      APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_ICON,
      APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON,
      APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.PROFILE_BUTTON,
      APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON_TEXT,
      APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.PROFILE_BUTTON_TEXT,
      APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.OPEN
    ];
  }

  private _foundation: AppBarProfileButtonFoundation;

  constructor() {
    super();
    this._foundation = new AppBarProfileButtonFoundation(new AppBarProfileButtonAdapter(this));
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

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.FULL_NAME:
        this.fullName = newValue;
        break;
      case APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.EMAIL:
        this.email = newValue;
        break;
      case APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_IMAGE_URL:
        this.avatarImageUrl = newValue;
        break;
      case APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_LETTER_COUNT:
        this.avatarLetterCount = coerceNumber(newValue);
        break;
      case APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_TEXT:
        this.avatarText = newValue;
        break;
      case APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_ICON:
        this.avatarIcon = newValue;
        break;
      case APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON:
        this.signOutButton = coerceBoolean(newValue);
        break;
      case APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.PROFILE_BUTTON:
        this.profileButton = coerceBoolean(newValue);
        break;
      case APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON_TEXT:
        this.signOutButtonText = newValue;
        break;
      case APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.PROFILE_BUTTON_TEXT:
        this.profileButtonText = newValue;
        break;
      case APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public declare fullName: string;

  @FoundationProperty()
  public declare email: string;

  @FoundationProperty()
  public declare avatarImageUrl: string;

  @FoundationProperty()
  public declare avatarLetterCount: number;

  @FoundationProperty()
  public declare avatarText: string;

  @FoundationProperty()
  public declare avatarIcon: string;

  @FoundationProperty()
  public declare signOutButton: boolean;

  @FoundationProperty()
  public declare profileButton: boolean;

  @FoundationProperty()
  public declare signOutButtonText: string;

  @FoundationProperty()
  public declare profileButtonText: string;

  @FoundationProperty()
  public declare open: boolean;

  /** Sets the profile card builder callback that will be used to add extra content to the profile card. */
  @FoundationProperty()
  public declare profileCardBuilder: AppBarProfileButtonProfileCardBuilder;
}

import { customElement, attachLightTemplate, coerceNumber, coerceBoolean, coreProperty } from '@tylertech/forge-core';
import { AppBarProfileButtonAdapter } from './app-bar-profile-button-adapter';
import { AppBarProfileButtonCore } from './app-bar-profile-button-core';
import { APP_BAR_PROFILE_BUTTON_CONSTANTS, AppBarProfileButtonProfileCardBuilder } from './app-bar-profile-button-constants';
import { ProfileCardComponent } from '../../profile-card';
import { IconButtonComponent } from '../../icon-button';
import { AvatarComponent } from '../../avatar';
import { TooltipComponent } from '../../tooltip';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IPopoverComponent, PopoverComponent } from '../../popover/popover';

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
  popupElement: IPopoverComponent | undefined;
  profileCardBuilder: (fn: AppBarProfileButtonProfileCardBuilder) => void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-bar-profile-button': IAppBarProfileButtonComponent;
  }
}

/**
 * @tag forge-app-bar-profile-button
 *
 * @property {string} avatarImageUrl - The url of the avatar image to display.
 * @property {number} [avatarLetterCount=2] - The number of letters to display in the avatar.
 * @property {string} avatarText - The text to display in the avatar.
 * @property {string} avatarIcon - The name of an alternative icon to display in the avatar.
 * @property {string} fullName - The full name.
 * @property {string} email - The email address.
 * @property {boolean} [signOutButton=true] - Whether to display the sign out button or not. Defaults to `true`.
 * @property {boolean} [profileButton=false] - Whether to display the profile button or not.
 * @property {string} [signOutButtonText="Sign out"] - The text to display in the sign out button.
 * @property {string} [profileButtonText="Profile"] - The text to display in the profile button.
 * @property {boolean} [open=false] - Whether the profile card is open or not.
 * @property {IPopoverComponent | undefined} popupElement - The popup element when open.
 * @property {AppBarProfileButtonProfileCardBuilder} profileCardBuilder - Sets the profile card builder callback that will be used to add extra content to the profile card.
 *
 * @attribute {string} [avatar-image-url] - The url of the avatar image to display.
 * @attribute {number} [avatar-letter-count=2] - The number of letters to display in the avatar.
 * @attribute {string} [avatar-text] - The text to display in the avatar.
 * @attribute {string} [avatar-icon] - The name of an alternative icon to display in the avatar.
 * @attribute {string} [full-name] - The full name.
 * @attribute {string} [email] - The email address.
 * @attribute {boolean} [sign-out-button=true] - Whether to display the sign out button or not. Defaults to `true`.
 * @attribute {boolean} [profile-button=false] - Whether to display the profile button or not.
 * @attribute {string} [sign-out-button-text="Sign Out"] - The text to display in the sign out button.
 * @attribute {string} [profile-button-text="Profile"] - The text to display in the profile button.
 * @attribute {boolean} [open=false] - Whether the profile card is open or not.
 * @attribute {string} [aria-label] - The aria-label to apply to the button.
 * @attribute {string} [aria-labelledby] - The id of an element to use as the aria-labelledby attribute.
 *
 * @event {CustomEvent<void>} forge-profile-card-sign-out - Fires when the sign out button is clicked.
 * @event {CustomEvent<void>} forge-profile-card-profile - Fires when the profile button is clicked.
 */
@customElement({
  name: APP_BAR_PROFILE_BUTTON_CONSTANTS.elementName,
  dependencies: [PopoverComponent, ProfileCardComponent, IconButtonComponent, AvatarComponent, TooltipComponent]
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

  private _core: AppBarProfileButtonCore;

  constructor() {
    super();
    this._core = new AppBarProfileButtonCore(new AppBarProfileButtonAdapter(this));
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

  @coreProperty()
  public declare fullName: string;

  @coreProperty()
  public declare email: string;

  @coreProperty()
  public declare avatarImageUrl: string;

  @coreProperty()
  public declare avatarLetterCount: number;

  @coreProperty()
  public declare avatarText: string;

  @coreProperty()
  public declare avatarIcon: string;

  @coreProperty()
  public declare signOutButton: boolean;

  @coreProperty()
  public declare profileButton: boolean;

  @coreProperty()
  public declare signOutButtonText: string;

  @coreProperty()
  public declare profileButtonText: string;

  @coreProperty()
  public declare open: boolean;

  public get popupElement(): IPopoverComponent | undefined {
    return this._core.popupElement;
  }

  /** Sets the profile card builder callback that will be used to add extra content to the profile card. */
  @coreProperty()
  public declare profileCardBuilder: AppBarProfileButtonProfileCardBuilder;
}

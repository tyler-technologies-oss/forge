import { CustomElement, attachLightTemplate, coerceNumber, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { AppBarProfileButtonAdapter } from './app-bar-profile-button-adapter';
import { AppBarProfileButtonFoundation } from './app-bar-profile-button-foundation';
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
 * @property {number} avatarLetterCount - The number of letters to display in the avatar.
 * @property {string} avatarText - The text to display in the avatar.
 * @property {string} avatarIcon - The name of an alternative icon to display in the avatar.
 * @property {string} fullName - The full name.
 * @property {string} email - The email address.
 * @property {boolean} signOutButton - Whether to display the sign out button or not. Defaults to `true`.
 * @property {boolean} profileButton - Whether to display the profile button or not.
 * @property {string} signOutButtonText - The text to display in the sign out button.
 * @property {string} profileButtonText - The text to display in the profile button.
 * @property {boolean} open - Whether the profile card is open or not.
 * @property {IPopoverComponent | undefined} popupElement - The popup element when open.
 * @property {AppBarProfileButtonProfileCardBuilder} profileCardBuilder - Sets the profile card builder callback that will be used to add extra content to the profile card.
 * 
 * @attribute {string} [avatar-image-url] - The url of the avatar image to display.
 * @attribute {number} [avatar-letter-count] - The number of letters to display in the avatar.
 * @attribute {string} [avatar-text] - The text to display in the avatar.
 * @attribute {string} [avatar-icon] - The name of an alternative icon to display in the avatar.
 * @attribute {string} [full-name] - The full name.
 * @attribute {string} [email] - The email address.
 * @attribute {boolean} [sign-out-button] - Whether to display the sign out button or not. Defaults to `true`.
 * @attribute {boolean} [profile-button] - Whether to display the profile button or not.
 * @attribute {string} [sign-out-button-text] - The text to display in the sign out button.
 * @attribute {string} [profile-button-text] - The text to display in the profile button.
 * @attribute {boolean} [open] - Whether the profile card is open or not.
 * @attribute {string} [aria-label] - The aria-label to apply to the button.
 * @attribute {string} [aria-labelledby] - The id of an element to use as the aria-labelledby attribute.
 */
@CustomElement({
  name: APP_BAR_PROFILE_BUTTON_CONSTANTS.elementName,
  dependencies: [
    PopoverComponent,
    ProfileCardComponent,
    IconButtonComponent,
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
    this._foundation.destroy();
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

  public get popupElement(): IPopoverComponent | undefined {
    return this._foundation.popupElement;
  }

  /** Sets the profile card builder callback that will be used to add extra content to the profile card. */
  @FoundationProperty()
  public declare profileCardBuilder: AppBarProfileButtonProfileCardBuilder;
}

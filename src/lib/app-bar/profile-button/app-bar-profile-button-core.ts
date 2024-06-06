import { ICustomElementCore, isFunction } from '@tylertech/forge-core';
import { AVATAR_CONSTANTS } from '../../avatar';
import { PROFILE_CARD_CONSTANTS } from '../../profile-card';
import { IAppBarProfileButtonAdapter } from './app-bar-profile-button-adapter';
import { IAppBarProfileCardConfig, AppBarProfileButtonProfileCardBuilder, APP_BAR_PROFILE_BUTTON_CONSTANTS } from './app-bar-profile-button-constants';
import { IPopoverComponent } from '../../popover/popover';

export interface IAppBarProfileButtonCore extends ICustomElementCore {
  fullName: string;
  email: string;
  avatarImageUrl: string;
  avatarLetterCount: number;
  avatarText: string;
  avatarIcon: string;
  signOutButton: boolean;
  profileButton: boolean;
  signOutButtonText: string;
  profileButtonText: string;
  open: boolean;
  popupElement: IPopoverComponent | undefined;
  profileCardBuilder: AppBarProfileButtonProfileCardBuilder;
}

export class AppBarProfileButtonCore implements IAppBarProfileButtonCore {
  private _fullName: string;
  private _email: string;
  private _avatarImageUrl: string;
  private _avatarLetterCount = AVATAR_CONSTANTS.numbers.DEFAULT_LETTER_COUNT;
  private _avatarText: string;
  private _avatarIcon: string;
  private _showSignOutButton = PROFILE_CARD_CONSTANTS.defaults.SHOW_SIGN_OUT_BUTTON;
  private _showProfileButton = PROFILE_CARD_CONSTANTS.defaults.SHOW_PROFILE_BUTTON;
  private _signOutButtonText = PROFILE_CARD_CONSTANTS.defaults.SIGN_OUT_BUTTON_TEXT;
  private _profileButtonText = PROFILE_CARD_CONSTANTS.defaults.PROFILE_BUTTON_TEXT;
  private _profileCardBuilder: AppBarProfileButtonProfileCardBuilder;
  private _open = false;
  private _isInitialized = false;

  private _clickListener: EventListener = this._onClick.bind(this);
  private _dismissListener: () => void = this._onDismiss.bind(this);
  private _cancelDismissListener: (() => void) | undefined;
  private _keydownListener: EventListener = this._onKeydown.bind(this);
  private _profileButtonListener: () => void = this._onProfileButtonClick.bind(this);
  private _signOutButtonListener: () => void = this._onSignOutButtonClick.bind(this);

  constructor(private _adapter: IAppBarProfileButtonAdapter) {}

  public initialize(): void {
    this._adapter.initialize();
    this._adapter.setClickListener(this._clickListener);
    this._adapter.setAvatarImageUrl(this._avatarImageUrl);
    this._adapter.setAvatarLetterCount(this._avatarLetterCount);
    this._adapter.setAvatarText(this._avatarText);
    this._adapter.setAvatarIcon(this._avatarIcon);
    this._isInitialized = true;
  }

  public destroy(): void {
    this._adapter.removeDocumentListener('keydown', this._keydownListener);
    this._adapter.removeClickListener(this._clickListener);
    this._adapter.destroy();
    this._isInitialized = false;
  }

  private _onClick(_evt: MouseEvent): void {
    if (!this._open) {
      this._openDropdown();
    } else {
      this._closeDropdown();
    }
  }

  private _onKeydown(evt: KeyboardEvent): void {
    if (evt.key === 'Escape') {
      this._closeDropdown();
      this._adapter.focusButtonElement();
    }
  }

  private _onDismiss(): void {
    this._closeDropdown();
  }

  private _onProfileButtonClick(): void {
    this._adapter.dispatchHostEvent(new CustomEvent(PROFILE_CARD_CONSTANTS.events.PROFILE, { bubbles: true, composed: true }));
    this._closeDropdown();
  }

  private _onSignOutButtonClick(): void {
    this._adapter.dispatchHostEvent(new CustomEvent(PROFILE_CARD_CONSTANTS.events.SIGN_OUT, { bubbles: true, composed: true }));
    this._closeDropdown();
  }

  private _openDropdown(): void {
    /* c8 ignore next 3 */
    if (this._open) {
      return;
    }

    const profileCardConfig: IAppBarProfileCardConfig = {
      fullName: this._fullName,
      email: this._email,
      signOut: this._showSignOutButton,
      profile: this._showProfileButton,
      signOutButtonText: this._signOutButtonText,
      profileButtonText: this._profileButtonText,
      avatarText: this._avatarText,
      avatarIcon: this._avatarIcon,
      avatarImageUrl: this._avatarImageUrl,
      avatarLetterCount: this._avatarLetterCount
    };
    const profileCardContent = this._profileCardBuilder ? this._profileCardBuilder() : undefined;
    this._cancelDismissListener = this._adapter.openPopup(profileCardConfig, this._dismissListener, this._profileButtonListener, this._signOutButtonListener, profileCardContent);
    this._adapter.addDocumentListener('keydown', this._keydownListener);
    this._open = true;
    this._adapter.toggleHostAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.OPEN, this._open);
  }

  private _closeDropdown(): void {
    /* c8 ignore next 3 */
    if (!this._open) {
      return;
    }
    if (this._cancelDismissListener && isFunction(this._cancelDismissListener)) {
      this._cancelDismissListener();
      this._cancelDismissListener = undefined;
    }
    this._open = false;
    this._adapter.closePopup();
    this._adapter.toggleHostAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.OPEN, this._open);
  }

  public get fullName(): string {
    return this._fullName;
  }
  public set fullName(value: string) {
    if (this._fullName !== value) {
      this._fullName = value;
      this.avatarText = this._fullName;
      this._adapter.setHostAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.FULL_NAME, this._fullName);
    }
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    if (this._email !== value) {
      this._email = value;
      this._adapter.setHostAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.EMAIL, this._email);
    }
  }

  public get avatarImageUrl(): string {
    return this._avatarImageUrl;
  }
  public set avatarImageUrl(value: string) {
    if (this._avatarImageUrl !== value) {
      this._avatarImageUrl = value;
      if (this._isInitialized) {
        this._adapter.setAvatarImageUrl(this._avatarImageUrl);
        this._adapter.setHostAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_IMAGE_URL, this._avatarImageUrl);
      }
    }
  }

  public get avatarLetterCount(): number {
    return this._avatarLetterCount;
  }
  public set avatarLetterCount(value: number) {
    if (this._avatarLetterCount !== value) {
      this._avatarLetterCount = value;
      if (this._isInitialized) {
        this._adapter.setAvatarLetterCount(this._avatarLetterCount);
        this._adapter.setHostAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_LETTER_COUNT, String(this._avatarLetterCount));
      }
    }
  }

  public get avatarText(): string {
    return this._avatarText;
  }
  public set avatarText(value: string) {
    if (this._avatarText !== value) {
      this._avatarText = value;
      if (this._isInitialized) {
        this._adapter.setAvatarText(this._avatarText);
        this._adapter.toggleHostAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_TEXT, !!this._avatarText, this._avatarText);
      }
    }
  }

  public get avatarIcon(): string {
    return this._avatarIcon;
  }
  public set avatarIcon(value: string) {
    if (this._avatarIcon !== value) {
      this._avatarIcon = value;
      if (this._isInitialized) {
        this._adapter.setAvatarIcon(this._avatarIcon);
        this._adapter.toggleHostAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_ICON, !!this._avatarIcon, this._avatarIcon);
      }
    }
  }

  public get signOutButton(): boolean {
    return this._showSignOutButton;
  }
  public set signOutButton(value: boolean) {
    value = Boolean(value);
    if (this._showSignOutButton !== value) {
      this._showSignOutButton = value;
      this._adapter.toggleHostAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON, this._showSignOutButton);
    }
  }

  public get profileButton(): boolean {
    return this._showProfileButton;
  }
  public set profileButton(value: boolean) {
    value = Boolean(value);
    if (this._showProfileButton !== value) {
      this._showProfileButton = value;
      this._adapter.toggleHostAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.PROFILE_BUTTON, this._showProfileButton);
    }
  }

  public get signOutButtonText(): string {
    return this._signOutButtonText;
  }
  public set signOutButtonText(value: string) {
    if (this._signOutButtonText !== value) {
      this._signOutButtonText = value;
      this._adapter.setSignOutButtonText(value);
    }
  }

  public get profileButtonText(): string {
    return this._profileButtonText;
  }
  public set profileButtonText(value: string) {
    if (this._profileButtonText !== value) {
      this._profileButtonText = value;
      this._adapter.setProfileButtonText(value);
    }
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      if (value) {
        this._openDropdown();
      } else {
        this._closeDropdown();
      }
    }
  }

  public get popupElement(): IPopoverComponent | undefined {
    return this._adapter.popupElement;
  }

  public get profileCardBuilder(): AppBarProfileButtonProfileCardBuilder {
    return this._profileCardBuilder;
  }
  public set profileCardBuilder(fn: AppBarProfileButtonProfileCardBuilder) {
    this._profileCardBuilder = fn;
  }
}

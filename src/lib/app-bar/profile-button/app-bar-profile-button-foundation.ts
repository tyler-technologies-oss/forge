import { ICustomElementFoundation, isFunction, Platform, getActiveElement } from '@tylertech/forge-core';
import { AVATAR_CONSTANTS } from '../../avatar';
import { PROFILE_CARD_CONSTANTS } from '../../profile-card';
import { IAppBarProfileButtonAdapter } from './app-bar-profile-button-adapter';
import { IAppBarProfileCardConfig, AppBarProfileButtonProfileCardBuilder, APP_BAR_PROFILE_BUTTON_CONSTANTS } from './app-bar-profile-button-constants';

export interface IAppBarProfileButtonFoundation extends ICustomElementFoundation {
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
  profileCardBuilder: AppBarProfileButtonProfileCardBuilder;
}

export class AppBarProfileButtonFoundation implements IAppBarProfileButtonFoundation {
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
  private _clickListener: (evt: MouseEvent) => void;
  private _dismissListener: () => void;
  private _cancelDismissListener: () => void;
  private _keydownListener: (evt: KeyboardEvent) => void;
  private _profileButtonListener: () => void;
  private _signOutButtonListener: () => void;

  constructor(private _adapter: IAppBarProfileButtonAdapter) {
    this._clickListener = evt => this._onClick(evt);
    this._dismissListener = () => this._onDimiss();
    this._keydownListener = evt => this._onKeydown(evt);
    this._profileButtonListener = () => this._onProfileButtonClick();
    this._signOutButtonListener = () => this._onSignOutButtonClick();
  }

  public initialize(): void {
    this._adapter.initialize();
    this._adapter.setClickListener(this._clickListener);
    this._adapter.setAvatarImageUrl(this._avatarImageUrl);
    this._adapter.setAvatarLetterCount(this._avatarLetterCount);
    this._adapter.setAvatarText(this._avatarText);
    this._adapter.setAvatarIcon(this._avatarIcon);
    this._isInitialized = true;
  }

  public disconnect(): void {
    if (this._open) {
      this._closeDropdown();
    }
    this._adapter.removeWindowListener('keydown', this._keydownListener);
    this._adapter.removeClickListener(this._clickListener);
    this._isInitialized = false;
  }

  private _onClick(evt: MouseEvent): void {
    if (!this._open) {
      this._openDropdown();
    } else {
      this._closeDropdown();
    }
  }

  private _onKeydown(evt: KeyboardEvent): void {
    if (evt.key === 'Escape' || evt.keyCode === 27) {
      this._closeDropdown();
      this._adapter.requestFocus();
    }
  }

  private _onDimiss(): void {
    if (Platform.WEBKIT) {
      window.requestAnimationFrame(() => this._closeDropdown());
    } else {
      this._closeDropdown();
    }
  }

  private _onProfileButtonClick(): void {
    this._adapter.emitHostEvent(PROFILE_CARD_CONSTANTS.events.PROFILE);
    this._closeDropdown();
    this._adapter.requestFocus();
  }

  private _onSignOutButtonClick(): void {
    this._adapter.emitHostEvent(PROFILE_CARD_CONSTANTS.events.SIGN_OUT);
    this._closeDropdown();
    this._adapter.requestFocus();
  }

  private _openDropdown(): void {
    if (this._open) {
      return;
    }

    if (isFunction(this._cancelDismissListener)) {
      this._cancelDismissListener();
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
    this._adapter.addWindowListener('keydown', this._keydownListener);
    this._open = true;

    // If we aren't showing the sign out or profile buttons then leave focus on our button
    if (!profileCardConfig.signOut && !profileCardConfig.profile) {
      this._adapter.requestFocus();
    }
  }

  private _closeDropdown(): void {
    if (!this._open) {
      return;
    }
    if (isFunction(this._cancelDismissListener)) {
      this._cancelDismissListener();
    }
    this._open = false;
    this._adapter.removeWindowListener('keydown', this._keydownListener);
    this._adapter.closePopup();
  }

  public get fullName(): string {
    return this._fullName;
  }
  public set fullName(value: string) {
    if (this._fullName !== value) {
      this._fullName = value;
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
        this._adapter.setHostAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_LETTER_COUNT, this._avatarLetterCount as any);
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
    if (this._showSignOutButton !== value) {
      this._showSignOutButton = value;
      this._adapter.setHostAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON, this._showSignOutButton as any);
    }
  }

  public get profileButton(): boolean {
    return this._showProfileButton;
  }
  public set profileButton(value: boolean) {
    if (this._showProfileButton !== value) {
      this._showProfileButton = value;
      this._adapter.setHostAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.PROFILE_BUTTON, this._showProfileButton as any);
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
    if (this._open !== value) {
      if (value) {
        this._openDropdown();
      } else {
        this._closeDropdown();
      }
    }
  }

  public get profileCardBuilder(): AppBarProfileButtonProfileCardBuilder {
    return this._profileCardBuilder;
  }
  public set profileCardBuilder(fn: AppBarProfileButtonProfileCardBuilder) {
    this._profileCardBuilder = fn;
  }
}

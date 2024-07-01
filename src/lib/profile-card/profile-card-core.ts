import { IProfileCardAdapter } from './profile-card-adapter';
import { PROFILE_CARD_CONSTANTS } from './profile-card-constants';

export interface IProfileCardCore {
  fullName: string;
  email: string;
  signOut: boolean;
  profile: boolean;
  signOutText: string;
  profileText: string;
  avatarText: string;
  avatarIcon: string;
  avatarImageUrl: string;
  avatarLetterCount: number;
  focus(options?: FocusOptions): void;
}

export class ProfileCardCore implements IProfileCardCore {
  private _fullName: string;
  private _email: string;
  private _avatarText: string;
  private _avatarIcon: string;
  private _avatarImageUrl: string;
  private _avatarLetterCount: number;
  private _showSignOutButton = PROFILE_CARD_CONSTANTS.defaults.SHOW_SIGN_OUT_BUTTON;
  private _showProfileButton = PROFILE_CARD_CONSTANTS.defaults.SHOW_PROFILE_BUTTON;
  private _signOutButtonText = PROFILE_CARD_CONSTANTS.defaults.SIGN_OUT_BUTTON_TEXT;
  private _profileButtonText = PROFILE_CARD_CONSTANTS.defaults.PROFILE_BUTTON_TEXT;

  private _profileListener: (evt: Event) => void;
  private _signOutListener: (evt: Event) => void;

  constructor(private _adapter: IProfileCardAdapter) {
    this._profileListener = evt => this._onProfileButtonClick(evt);
    this._signOutListener = evt => this._onSignOutButtonClick(evt);
  }

  public initialize(): void {
    this._adapter.setProfileButtonListener(this._profileListener);
    this._adapter.setSignOutButtonListener(this._signOutListener);
  }

  public focus(options?: FocusOptions): void {
    if (this._showSignOutButton) {
      this._adapter.requestSignOutButtonFocus({ ...options, focusVisible: true });
    } else if (this._showProfileButton) {
      this._adapter.requestProfileButtonFocus({ ...options, focusVisible: true });
    }
  }

  private _setActionVisibility(): void {
    const showActionToolbar = this._showSignOutButton || this._showProfileButton;
    this._adapter.setActionToolbarVisibility(showActionToolbar);
    this._adapter.setSignOutButtonVisibility(this._showSignOutButton);
    this._adapter.setProfileButtonVisibility(this._showProfileButton);
  }

  private _onProfileButtonClick(evt: Event): void {
    evt.stopPropagation();
    this._adapter.emitHostEvent(PROFILE_CARD_CONSTANTS.events.PROFILE);
  }

  private _onSignOutButtonClick(evt: Event): void {
    evt.stopPropagation();
    this._adapter.emitHostEvent(PROFILE_CARD_CONSTANTS.events.SIGN_OUT);
  }

  public get fullName(): string {
    return this._fullName;
  }
  public set fullName(value: string) {
    if (this._fullName !== value) {
      this._fullName = value ?? '';
      this._adapter.setFullName(this._fullName);
      if (!this._avatarText) {
        this._adapter.setAvatarText(this._fullName);
      }
      this._adapter.toggleHostAttribute(PROFILE_CARD_CONSTANTS.attributes.FULL_NAME, !!this._fullName, this._fullName);
    }
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    if (this._email !== value) {
      this._email = value ?? '';
      this._adapter.setEmail(this._email);
      this._adapter.toggleHostAttribute(PROFILE_CARD_CONSTANTS.attributes.EMAIL, !!this._email, this._email);
    }
  }

  public get avatarText(): string {
    return this._avatarText;
  }
  public set avatarText(value: string) {
    if (this._avatarText !== value) {
      this._avatarText = value ?? '';
      this._adapter.setAvatarText(this._avatarText);
      this._adapter.toggleHostAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_TEXT, !!this._avatarText, this._avatarText);
    }
  }

  public get avatarIcon(): string {
    return this._avatarIcon;
  }
  public set avatarIcon(value: string) {
    if (this._avatarIcon !== value) {
      this._avatarIcon = value ?? '';
      this._adapter.setAvatarIcon(this._avatarIcon);
      this._adapter.toggleHostAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_ICON, !!this._avatarIcon, this._avatarIcon);
    }
  }

  public get avatarImageUrl(): string {
    return this._avatarImageUrl;
  }
  public set avatarImageUrl(value: string) {
    if (this._avatarImageUrl !== value) {
      this._avatarImageUrl = value;
      this._adapter.setAvatarImageUrl(this._avatarImageUrl);
      this._adapter.toggleHostAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_IMAGE_URL, !!this._avatarImageUrl, this._avatarImageUrl);
    }
  }

  public get avatarLetterCount(): number {
    return this._avatarLetterCount;
  }
  public set avatarLetterCount(value: number) {
    if (this._avatarLetterCount !== value) {
      this._avatarLetterCount = value;
      this._adapter.setAvatarLetterCount(this._avatarLetterCount);
      this._adapter.toggleHostAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_LETTER_COUNT, !!this._avatarLetterCount, `${this._avatarLetterCount}`);
    }
  }

  public get signOut(): boolean {
    return this._showSignOutButton;
  }
  public set signOut(value: boolean) {
    value = Boolean(value);
    if (this._showSignOutButton !== value) {
      this._showSignOutButton = value;
      this._setActionVisibility();
      this._adapter.toggleHostAttribute(PROFILE_CARD_CONSTANTS.attributes.SIGN_OUT, this._showSignOutButton);
    }
  }

  public get profile(): boolean {
    return this._showProfileButton;
  }
  public set profile(value: boolean) {
    value = Boolean(value);
    if (this._showProfileButton !== value) {
      this._showProfileButton = value;
      this._setActionVisibility();
      this._adapter.toggleHostAttribute(PROFILE_CARD_CONSTANTS.attributes.PROFILE, this._showProfileButton);
    }
  }

  public get signOutText(): string {
    return this._signOutButtonText;
  }
  public set signOutText(value: string) {
    if (this._signOutButtonText !== value) {
      this._signOutButtonText = value || PROFILE_CARD_CONSTANTS.defaults.SIGN_OUT_BUTTON_TEXT;
      this._adapter.setSignOutButtonText(this._signOutButtonText);

      const hasSignOutTextAttr = this._signOutButtonText !== PROFILE_CARD_CONSTANTS.defaults.SIGN_OUT_BUTTON_TEXT;
      this._adapter.toggleHostAttribute(PROFILE_CARD_CONSTANTS.attributes.SIGN_OUT_TEXT, hasSignOutTextAttr, this._signOutButtonText);
    }
  }

  public get profileText(): string {
    return this._profileButtonText;
  }
  public set profileText(value: string) {
    if (this._profileButtonText !== value) {
      this._profileButtonText = value || PROFILE_CARD_CONSTANTS.defaults.PROFILE_BUTTON_TEXT;
      this._adapter.setProfileButtonText(this._profileButtonText);

      const hasProfileAttr = value !== PROFILE_CARD_CONSTANTS.defaults.PROFILE_BUTTON_TEXT;
      this._adapter.toggleHostAttribute(PROFILE_CARD_CONSTANTS.attributes.PROFILE_TEXT, hasProfileAttr, this._profileButtonText);
    }
  }
}

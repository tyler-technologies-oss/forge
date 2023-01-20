import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IProfileCardAdapter } from './profile-card-adapter';
import { PROFILE_CARD_CONSTANTS } from './profile-card-constants';

export interface IProfileCardFoundation extends ICustomElementFoundation {
  fullName: string;
  email: string;
  signOut: boolean;
  profile: boolean;
  avatarText: string;
  avatarImageUrl: string;
  avatarLetterCount: number;
}

export class ProfileCardFoundation implements IProfileCardFoundation {
  private _fullName: string;
  private _email: string;
  private _avatarText: string;
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

    if (this._showSignOutButton || this._showProfileButton) {
      this._requestInitialFocus();
    }

    this._setActionVisibility();
    this._adapter.setSignOutButtonText(this._signOutButtonText);
    this._adapter.setProfileButtonText(this._profileButtonText);
  }

  private _requestInitialFocus(): void {
    if (this._showSignOutButton) {
      this._adapter.requestSignOutButtonFocus();
    } else if (this._showProfileButton) {
      this._adapter.requestProfileButtonFocus();
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
      this._fullName = value;
      this._adapter.setFullName(this._fullName);
    }
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    if (this._email !== value) {
      this._email = value;
      this._adapter.setEmail(this._email);
    }
  }

  public get avatarText(): string {
    return this._avatarText;
  }
  public set avatarText(value: string) {
    if (this._avatarText !== value) {
      this._avatarText = value;
      this._adapter.setAvatarText(this._avatarText);
    }
  }

  public get avatarImageUrl(): string {
    return this._avatarImageUrl;
  }
  public set avatarImageUrl(value: string) {
    if (this._avatarImageUrl !== value) {
      this._avatarImageUrl = value;
      this._adapter.setAvatarImageUrl(this._avatarImageUrl);
    }
  }

  public get avatarLetterCount(): number {
    return this._avatarLetterCount;
  }
  public set avatarLetterCount(value: number) {
    if (this._avatarLetterCount !== value) {
      this._avatarLetterCount = value;
      this._adapter.setAvatarLetterCount(this._avatarLetterCount);
    }
  }

  public get signOut(): boolean {
    return this._showSignOutButton;
  }
  public set signOut(value: boolean) {
    if (this._showSignOutButton !== value) {
      this._showSignOutButton = value;
      this._setActionVisibility();
    }
  }

  public get profile(): boolean {
    return this._showProfileButton;
  }
  public set profile(value: boolean) {
    if (this._showProfileButton !== value) {
      this._showProfileButton = value;
      this._setActionVisibility();
    }
  }

  public get signOutText(): string {
    return this._signOutButtonText;
  }
  public set signOutText(value: string) {
    if (this._signOutButtonText !== value) {
      this._signOutButtonText = value || PROFILE_CARD_CONSTANTS.defaults.SIGN_OUT_BUTTON_TEXT;
      this._adapter.setSignOutButtonText(this._signOutButtonText);
    }
  }

  public get profileText(): string {
    return this._profileButtonText;
  }
  public set profileText(value: string) {
    if (this._profileButtonText !== value) {
      this._profileButtonText = value || PROFILE_CARD_CONSTANTS.defaults.PROFILE_BUTTON_TEXT;
      this._adapter.setProfileButtonText(this._profileButtonText);
    }
  }
}

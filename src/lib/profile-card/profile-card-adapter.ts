import { emitEvent, getShadowElement } from '@tylertech/forge-core';
import { IAvatarComponent } from '../avatar';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IToolbarComponent } from '../toolbar';
import { IProfileCardComponent } from './profile-card';
import { PROFILE_CARD_CONSTANTS } from './profile-card-constants';

export interface IProfileCardAdapter extends IBaseAdapter {
  setFullName(value: string): void;
  setEmail(value: string): void;
  setAvatarText(value: string): void;
  setAvatarImageUrl(value: string): void;
  setAvatarLetterCount(count: number): void;
  setActionToolbarVisibility(isVisible: boolean): void;
  setProfileButtonVisibility(isVisible: boolean): void;
  setSignOutButtonVisibility(isVisible: boolean): void;
  setSignOutButtonText(value: string): void;
  setProfileButtonText(value: string): void;
  setProfileButtonListener(listener: (evt: Event) => void): void;
  setSignOutButtonListener(listener: (evt: Event) => void): void;
  removeProfileButtonListener(listener: (evt: Event) => void): void;
  removeSignOutButtonListener(listener: (evt: Event) => void): void;
  requestProfileButtonFocus(): void;
  requestSignOutButtonFocus(): void;
}

export class ProfileCardAdapter extends BaseAdapter<IProfileCardComponent> implements IProfileCardAdapter {
  private _fullNameElement: HTMLElement;
  private _emailElement: HTMLElement;
  private _avatarElement: IAvatarComponent;
  private _actionToolbar: IToolbarComponent;
  private _profileButton: HTMLButtonElement;
  private _signOutButton: HTMLButtonElement;

  constructor(component: IProfileCardComponent) {
    super(component);
    this._fullNameElement = getShadowElement(component, PROFILE_CARD_CONSTANTS.selectors.FULL_NAME);
    this._emailElement = getShadowElement(component, PROFILE_CARD_CONSTANTS.selectors.EMAIL);
    this._avatarElement = getShadowElement(component, PROFILE_CARD_CONSTANTS.selectors.AVATAR) as IAvatarComponent;
    this._actionToolbar = getShadowElement(component, PROFILE_CARD_CONSTANTS.selectors.ACTION_TOOLBAR) as IToolbarComponent;
    this._profileButton = getShadowElement(component, PROFILE_CARD_CONSTANTS.selectors.PROFILE_BUTTON) as HTMLButtonElement;
    this._signOutButton = getShadowElement(component, PROFILE_CARD_CONSTANTS.selectors.SIGN_OUT_BUTTON) as HTMLButtonElement;
  }

  public setFullName(value: string): void {
    this._component.setAttribute(PROFILE_CARD_CONSTANTS.attributes.FULL_NAME, value);
    this._fullNameElement.textContent = value;
  }

  public setEmail(value: string): void {
    this._component.setAttribute(PROFILE_CARD_CONSTANTS.attributes.EMAIL, value);
    this._emailElement.textContent = value;
  }

  public setAvatarText(value: string): void {
    this._component.setAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_TEXT, value);
    this._avatarElement.text = value;
  }

  public setAvatarImageUrl(value: string): void {
    this._component.setAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_IMAGE_URL, value);
    this._avatarElement.imageUrl = value;
  }

  public setAvatarLetterCount(count: number): void {
    this._component.setAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_LETTER_COUNT, String(count));
    this._avatarElement.letterCount = count;
  }

  public setActionToolbarVisibility(isVisible: boolean): void {
    if (isVisible) {
      this._actionToolbar.style.removeProperty('display');
    } else {
      this._actionToolbar.style.display = 'none';
    }
  }

  public setProfileButtonVisibility(isVisible: boolean): void {
    if (isVisible) {
      this._profileButton.style.removeProperty('display');
    } else {
      this._profileButton.style.display = 'none';
    }
  }

  public setSignOutButtonVisibility(isVisible: boolean): void {
    if (isVisible) {
      this._signOutButton.style.removeProperty('display');
    } else {
      this._signOutButton.style.display = 'none';
    }
  }

  public setSignOutButtonText(value: string): void {
    this._signOutButton.textContent = value;
  }
  
  public setProfileButtonText(value: string): void {
    this._profileButton.textContent = value;
  }

  public setProfileButtonListener(listener: (evt: Event) => void): void {
    this._profileButton.addEventListener('click', listener);
  }

  public setSignOutButtonListener(listener: (evt: Event) => void): void {
    this._signOutButton.addEventListener('click', listener);
  }

  public removeProfileButtonListener(listener: (evt: Event) => void): void {
    this._profileButton.removeEventListener('click', listener);
  }

  public removeSignOutButtonListener(listener: (evt: Event) => void): void {
    this._signOutButton.removeEventListener('click', listener);
  }

  public requestProfileButtonFocus(): void {
    window.requestAnimationFrame(() => this._profileButton.focus());
  }

  public requestSignOutButtonFocus(): void {
    window.requestAnimationFrame(() => this._signOutButton.focus());
  }
}

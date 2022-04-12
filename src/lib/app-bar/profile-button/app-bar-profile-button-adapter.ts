import { getLightElement, notChildEventListener, getActiveElement } from '@tylertech/forge-core';
import { AVATAR_CONSTANTS, IAvatarComponent } from '../../avatar';
import { BaseAdapter, IBaseAdapter } from '../../core/adapters/base-adapter';
import { IPopupComponent, PopupAnimationType, PopupPlacement, POPUP_CONSTANTS } from '../../popup';
import { IProfileCardComponent, PROFILE_CARD_CONSTANTS } from '../../profile-card';
import { IAppBarProfileButtonComponent } from './app-bar-profile-button';
import { IAppBarProfileCardConfig, APP_BAR_PROFILE_BUTTON_CONSTANTS } from './app-bar-profile-button-constants';

export interface IAppBarProfileButtonAdapter extends IBaseAdapter {
  initialize(): void;
  setClickListener(listener: (evt: MouseEvent) => void): void;
  removeClickListener(listener: (evt: MouseEvent) => void): void;
  openPopup(profileCardConfig: IAppBarProfileCardConfig, dismissListener: () => void, profileListener: () => void, signOutListener: () => void, profileCardContent?: HTMLElement): () => void;
  closePopup(): void;
  requestFocus(): void;
  setAvatarText(value: string): void;
  setAvatarLetterCount(value: number): void;
  setAvatarImageUrl(value: string): void;
}

export class AppBarProfileButtonAdapter extends BaseAdapter<IAppBarProfileButtonComponent> implements IAppBarProfileButtonAdapter {
  private _avatarElement: IAvatarComponent;
  private _popupElement: IPopupComponent;
  private _buttonElement: HTMLButtonElement;

  constructor(component: IAppBarProfileButtonComponent) {
    super(component);
  }

  public initialize(): void {
    this._avatarElement = getLightElement(this._component, AVATAR_CONSTANTS.elementName) as IAvatarComponent;
    this._buttonElement = getLightElement(this._component, APP_BAR_PROFILE_BUTTON_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
  }

  public setClickListener(listener: (evt: MouseEvent) => void): void {
    this._component.addEventListener('click', listener);
  }

  public removeClickListener(listener: (evt: MouseEvent) => void): void {
    this._component.removeEventListener('click', listener);
  }

  public openPopup(profileCardConfig: IAppBarProfileCardConfig, dismissListener: () => void, profileListener: () => void, signOutListener: () => void, profileCardContent?: HTMLElement): () => void {
    const profileCardElement = document.createElement(PROFILE_CARD_CONSTANTS.elementName) as IProfileCardComponent;
    profileCardElement.fullName = profileCardConfig.fullName;
    profileCardElement.email = profileCardConfig.email;
    profileCardElement.signOut = profileCardConfig.signOut;
    profileCardElement.profile = profileCardConfig.profile;
    profileCardElement.avatarText = profileCardConfig.avatarText;
    profileCardElement.avatarImageUrl = profileCardConfig.avatarImageUrl;
    profileCardElement.avatarLetterCount = profileCardConfig.avatarLetterCount;
    profileCardElement.addEventListener(PROFILE_CARD_CONSTANTS.events.PROFILE, () => profileListener());
    profileCardElement.addEventListener(PROFILE_CARD_CONSTANTS.events.SIGN_OUT, () => signOutListener());
    if (profileCardContent) {
      profileCardElement.appendChild(profileCardContent);
    }

    this._popupElement = document.createElement(POPUP_CONSTANTS.elementName) as IPopupComponent;
    this._popupElement.targetElement = this._component;
    this._popupElement.placement = 'bottom-end';
    this._popupElement.animationType = PopupAnimationType.Menu;
    this._popupElement.appendChild(profileCardElement);
    this._popupElement.open = true;

    return notChildEventListener(this._popupElement, activeElement => {
      if (!this._popupElement) {
        return;
      }
      if (!this._component.contains(getActiveElement())) {
        dismissListener();
      }
    }, true);
  }

  public closePopup(): void {
    if (this._popupElement) {
      this._popupElement.open = false;
    }
  }

  public requestFocus(): void {
    this._buttonElement.focus();
  }

  public setAvatarText(value: string): void {
    this._avatarElement.text = value;
  }

  public setAvatarLetterCount(value: number): void {
    this._avatarElement.letterCount = value;
  }

  public setAvatarImageUrl(value: string): void {
    this._avatarElement.imageUrl = value;
  }
}

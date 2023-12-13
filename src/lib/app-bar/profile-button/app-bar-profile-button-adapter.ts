import { getLightElement, notChildEventListener, getActiveElement, removeAllChildren, toggleAttribute } from '@tylertech/forge-core';
import { IconComponentDelegate } from '../../icon';
import { AVATAR_CONSTANTS, IAvatarComponent } from '../../avatar';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IPopupComponent, PopupAnimationType, POPUP_CONSTANTS } from '../../popup';
import { IProfileCardComponent, PROFILE_CARD_CONSTANTS } from '../../profile-card';
import { IAppBarProfileButtonComponent } from './app-bar-profile-button';
import { APP_BAR_PROFILE_BUTTON_CONSTANTS, IAppBarProfileCardConfig } from './app-bar-profile-button-constants';
import { ICON_BUTTON_CONSTANTS, IIconButtonComponent } from '../../icon-button';
import { forwardAttributes } from '../../core/utils/reflect-utils';

export interface IAppBarProfileButtonAdapter extends IBaseAdapter {
  popupElement: IPopupComponent | undefined;
  initialize(): void;
  destroy(): void;
  setClickListener(listener: (evt: MouseEvent) => void): void;
  removeClickListener(listener: (evt: MouseEvent) => void): void;
  openPopup(profileCardConfig: IAppBarProfileCardConfig, dismissListener: () => void, profileListener: () => void, signOutListener: () => void, profileCardContent?: HTMLElement): () => void;
  closePopup(): void;
  requestFocus(): void;
  setAvatarText(value: string): void;
  setAvatarIcon(value: string): void;
  setAvatarLetterCount(value: number): void;
  setAvatarImageUrl(value: string): void;
  setSignOutButtonText(value: string): void;
  setProfileButtonText(value: string): void;
}

export class AppBarProfileButtonAdapter extends BaseAdapter<IAppBarProfileButtonComponent> implements IAppBarProfileButtonAdapter {
  private _avatarElement: IAvatarComponent;
  private _iconButtonElement: IIconButtonComponent;
  private _popupElement?: IPopupComponent;
  private _profileCardElement?: IProfileCardComponent;
  private _forwardObserver?: MutationObserver;

  constructor(component: IAppBarProfileButtonComponent) {
    super(component);
  }

  public get popupElement(): IPopupComponent | undefined {
    return this._popupElement;
  }

  public initialize(): void {
    this._avatarElement = getLightElement(this._component, AVATAR_CONSTANTS.elementName) as IAvatarComponent;
    this._iconButtonElement = getLightElement(this._component, ICON_BUTTON_CONSTANTS.elementName) as IIconButtonComponent;

    const originalAriaLabel = this._iconButtonElement.getAttribute('aria-label');

    this._forwardObserver = forwardAttributes(this._component, APP_BAR_PROFILE_BUTTON_CONSTANTS.forwardedAttributes, (name, value) => {
      if (name === 'aria-label' && !value) {
        value = originalAriaLabel;
      }
      toggleAttribute(this._iconButtonElement, !!value, name, value ?? undefined);
    });
  }

  public destroy(): void {
    this._forwardObserver?.disconnect();
    this._forwardObserver = undefined;

    if (this._popupElement) {
      this._popupElement.remove();
      this._popupElement = undefined;
      this._profileCardElement = undefined;
    }
  }

  public setClickListener(listener: (evt: MouseEvent) => void): void {
    this._component.addEventListener('click', listener);
  }

  public removeClickListener(listener: (evt: MouseEvent) => void): void {
    this._component.removeEventListener('click', listener);
  }

  public openPopup(profileCardConfig: IAppBarProfileCardConfig, dismissListener: () => void, profileListener: () => void, signOutListener: () => void, profileCardContent?: HTMLElement): () => void {
    this._profileCardElement = document.createElement(PROFILE_CARD_CONSTANTS.elementName);
    this._profileCardElement.fullName = profileCardConfig.fullName;
    this._profileCardElement.email = profileCardConfig.email;
    this._profileCardElement.signOut = profileCardConfig.signOut;
    this._profileCardElement.profile = profileCardConfig.profile;
    this._profileCardElement.signOutText = profileCardConfig.signOutButtonText;
    this._profileCardElement.profileText = profileCardConfig.profileButtonText;
    this._profileCardElement.avatarText = profileCardConfig.avatarText;
    this._profileCardElement.avatarIcon = profileCardConfig.avatarIcon;
    this._profileCardElement.avatarImageUrl = profileCardConfig.avatarImageUrl;
    this._profileCardElement.avatarLetterCount = profileCardConfig.avatarLetterCount;
    this._profileCardElement.addEventListener(PROFILE_CARD_CONSTANTS.events.PROFILE, () => profileListener());
    this._profileCardElement.addEventListener(PROFILE_CARD_CONSTANTS.events.SIGN_OUT, () => signOutListener());

    if (profileCardContent) {
      this._profileCardElement.appendChild(profileCardContent);
    }

    this._popupElement = document.createElement(POPUP_CONSTANTS.elementName);
    this._popupElement.targetElement = this._component;
    this._popupElement.placement = 'bottom-end';
    this._popupElement.animationType = PopupAnimationType.Menu;
    this._popupElement.appendChild(this._profileCardElement);
    this._popupElement.open = true;
    this._profileCardElement.focus();

    return notChildEventListener(this._popupElement, activeElement => {
      if (!this._popupElement) {
        return;
      }
      if (!this._component.contains(getActiveElement(this._component.ownerDocument))) {
        dismissListener();
      }
    }, true);
  }

  public closePopup(): void {
    if (this._popupElement) {
      this._popupElement.open = false;
      this._popupElement = undefined;
      this._profileCardElement = undefined;
    }
  }

  public requestFocus(): void {
    this._iconButtonElement.focus();
  }

  public setAvatarText(value: string): void {
    this._avatarElement.text = value;
    removeAllChildren(this._avatarElement);
  }

  public setAvatarIcon(value: string): void {
    if (value) {
      const iconDelegate = new IconComponentDelegate({ props: { name: value }});
      this._avatarElement.replaceChildren(iconDelegate.element);
    } else {
      removeAllChildren(this._avatarElement);
    }
  }

  public setAvatarLetterCount(value: number): void {
    this._avatarElement.letterCount = value;
  }

  public setAvatarImageUrl(value: string): void {
    this._avatarElement.imageUrl = value;
  }

  public setSignOutButtonText(value: string): void {
    if (this._profileCardElement) {
      this._profileCardElement.signOutText = value;
      this._popupElement?.position();
    }
  }

  public setProfileButtonText(value: string): void {
    if (this._profileCardElement) {
      this._profileCardElement.profileText = value;
      this._popupElement?.position();
    }
  }
}

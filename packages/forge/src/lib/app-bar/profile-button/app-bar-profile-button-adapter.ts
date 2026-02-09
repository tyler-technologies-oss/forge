import { getLightElement, notChildEventListener, removeAllChildren, toggleAttribute } from '@tylertech/forge-core';
import { IconComponentDelegate } from '../../icon/index.js';
import { AVATAR_CONSTANTS, IAvatarComponent } from '../../avatar/index.js';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter.js';
import { IProfileCardComponent, PROFILE_CARD_CONSTANTS } from '../../profile-card/index.js';
import { IAppBarProfileButtonComponent } from './app-bar-profile-button.js';
import { APP_BAR_PROFILE_BUTTON_CONSTANTS, IAppBarProfileCardConfig } from './app-bar-profile-button-constants.js';
import { ICON_BUTTON_CONSTANTS, IIconButtonComponent } from '../../icon-button/index.js';
import { forwardAttributes } from '../../core/utils/reflect-utils.js';
import { type IPopoverComponent } from '../../popover/index.js';
import { type ITooltipComponent } from '../../tooltip/index.js';

export interface IAppBarProfileButtonAdapter extends IBaseAdapter {
  popupElement: IPopoverComponent | undefined;
  initialize(): void;
  destroy(): void;
  setClickListener(listener: (evt: MouseEvent) => void): void;
  removeClickListener(listener: (evt: MouseEvent) => void): void;
  openPopup(
    profileCardConfig: IAppBarProfileCardConfig,
    dismissListener: () => void,
    profileListener: () => void,
    signOutListener: () => void,
    profileCardContent?: HTMLElement
  ): () => void;
  closePopup(): void;
  focusButtonElement(): void;
  setAvatarText(value: string): void;
  setAvatarIcon(value: string): void;
  setAvatarLetterCount(value: number): void;
  setAvatarImageUrl(value: string): void;
  setSignOutButtonText(value: string): void;
  setProfileButtonText(value: string): void;
}

export class AppBarProfileButtonAdapter extends BaseAdapter<IAppBarProfileButtonComponent> implements IAppBarProfileButtonAdapter {
  private _avatarElement: IAvatarComponent;
  private _tooltipElement: ITooltipComponent;
  private _iconButtonElement: IIconButtonComponent;
  private _popupElement?: IPopoverComponent;
  private _profileCardElement?: IProfileCardComponent;
  private _forwardObserver?: MutationObserver;

  constructor(component: IAppBarProfileButtonComponent) {
    super(component);
  }

  public get popupElement(): IPopoverComponent | undefined {
    return this._popupElement;
  }

  public initialize(): void {
    this._avatarElement = getLightElement(this._component, AVATAR_CONSTANTS.elementName) as IAvatarComponent;
    this._tooltipElement = getLightElement(this._component, 'forge-tooltip') as ITooltipComponent;
    this._iconButtonElement = getLightElement(this._component, ICON_BUTTON_CONSTANTS.elementName) as IIconButtonComponent;

    const originalAriaLabelledBy = this._iconButtonElement.getAttribute('aria-labelledby'); // Set by tooltip

    this._forwardObserver = forwardAttributes(this._component, APP_BAR_PROFILE_BUTTON_CONSTANTS.forwardedAttributes, (name, value) => {
      if (name === 'aria-labelledby' && !value) {
        value = originalAriaLabelledBy;
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

  public openPopup(
    profileCardConfig: IAppBarProfileCardConfig,
    dismissListener: () => void,
    profileListener: () => void,
    signOutListener: () => void,
    profileCardContent?: HTMLElement
  ): () => void {
    if (this._popupElement?.isConnected) {
      this._popupElement.remove();
    }

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

    this._popupElement = document.createElement('forge-popover');
    this._popupElement.anchorElement = this._iconButtonElement;
    this._popupElement.placement = 'bottom-end';
    this._popupElement.arrow = true;
    this._popupElement.persistent = true;
    this._popupElement.appendChild(this._profileCardElement);
    this._component.ownerDocument.body.appendChild(this._popupElement);
    this._popupElement.open = true;
    this._profileCardElement.tabIndex = -1;
    this._profileCardElement.focus();

    return notChildEventListener(
      this._popupElement,
      () => {
        if (!this._popupElement) {
          dismissListener();
          return;
        }
        if (!this._popupElement.matches(':focus-within') && !this._component.matches(':focus-within')) {
          dismissListener();
        }
      },
      true
    );
  }

  public async closePopup(): Promise<void> {
    if (this._popupElement) {
      await this._popupElement.hideAsync();
      this._popupElement?.remove();
      this._popupElement = undefined;
      this._profileCardElement = undefined;
    }
  }

  public focusButtonElement(): void {
    this._iconButtonElement.focus();
  }

  public setAvatarText(value: string): void {
    this._avatarElement.text = value;
    this._tooltipElement.textContent = `View ${value}'s profile`;
    removeAllChildren(this._avatarElement);
  }

  public setAvatarIcon(value: string): void {
    if (value) {
      const iconDelegate = new IconComponentDelegate({ props: { name: value } });
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

import { customElement, attachShadowTemplate, coerceBoolean, coerceNumber, coreProperty } from '@tylertech/forge-core';
import { ProfileCardAdapter } from './profile-card-adapter';
import { ProfileCardCore } from './profile-card-core';
import { PROFILE_CARD_CONSTANTS } from './profile-card-constants';
import { ButtonComponent } from '../button';
import { AvatarComponent } from '../avatar';
import { IconComponent } from '../icon/icon';
import { ToolbarComponent } from '../toolbar';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './profile-card.html';
import styles from './profile-card.scss';

export interface IProfileCardComponent extends IBaseComponent {
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
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-profile-card': IProfileCardComponent;
  }

  interface HTMLElementEventMap {
    'forge-profile-card-sign-out': CustomEvent<void>;
    'forge-profile-card-profile': CustomEvent<void>;
  }
}

/**
 * @tag forge-profile-card
 */
@customElement({
  name: PROFILE_CARD_CONSTANTS.elementName,
  dependencies: [ToolbarComponent, ButtonComponent, IconComponent, AvatarComponent]
})
export class ProfileCardComponent extends BaseComponent implements IProfileCardComponent {
  public static get observedAttributes(): string[] {
    return [
      PROFILE_CARD_CONSTANTS.attributes.FULL_NAME,
      PROFILE_CARD_CONSTANTS.attributes.EMAIL,
      PROFILE_CARD_CONSTANTS.attributes.SIGN_OUT,
      PROFILE_CARD_CONSTANTS.attributes.PROFILE,
      PROFILE_CARD_CONSTANTS.attributes.SIGN_OUT_TEXT,
      PROFILE_CARD_CONSTANTS.attributes.PROFILE_TEXT,
      PROFILE_CARD_CONSTANTS.attributes.AVATAR_TEXT,
      PROFILE_CARD_CONSTANTS.attributes.AVATAR_ICON,
      PROFILE_CARD_CONSTANTS.attributes.AVATAR_IMAGE_URL,
      PROFILE_CARD_CONSTANTS.attributes.AVATAR_LETTER_COUNT
    ];
  }

  private _core: ProfileCardCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new ProfileCardCore(new ProfileCardAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case PROFILE_CARD_CONSTANTS.attributes.FULL_NAME:
        this.fullName = newValue;
        break;
      case PROFILE_CARD_CONSTANTS.attributes.EMAIL:
        this.email = newValue;
        break;
      case PROFILE_CARD_CONSTANTS.attributes.SIGN_OUT:
        this.signOut = coerceBoolean(newValue);
        break;
      case PROFILE_CARD_CONSTANTS.attributes.PROFILE:
        this.profile = coerceBoolean(newValue);
        break;
      case PROFILE_CARD_CONSTANTS.attributes.SIGN_OUT_TEXT:
        this.signOutText = newValue;
        break;
      case PROFILE_CARD_CONSTANTS.attributes.PROFILE_TEXT:
        this.profileText = newValue;
        break;
      case PROFILE_CARD_CONSTANTS.attributes.AVATAR_TEXT:
        this.avatarText = newValue;
        break;
      case PROFILE_CARD_CONSTANTS.attributes.AVATAR_ICON:
        this.avatarIcon = newValue;
        break;
      case PROFILE_CARD_CONSTANTS.attributes.AVATAR_IMAGE_URL:
        this.avatarImageUrl = newValue;
        break;
      case PROFILE_CARD_CONSTANTS.attributes.AVATAR_LETTER_COUNT:
        this.avatarLetterCount = coerceNumber(newValue);
        break;
    }
  }

  @coreProperty()
  public declare fullName: string;

  @coreProperty()
  public declare email: string;

  @coreProperty()
  public declare signOut: boolean;

  @coreProperty()
  public declare profile: boolean;

  @coreProperty()
  public declare signOutText: string;

  @coreProperty()
  public declare profileText: string;

  @coreProperty()
  public declare avatarText: string;

  @coreProperty()
  public declare avatarIcon: string;

  @coreProperty()
  public declare avatarImageUrl: string;

  @coreProperty()
  public declare avatarLetterCount: number;

  public override focus(options?: FocusOptions): void {
    this._core.focus(options);
  }
}

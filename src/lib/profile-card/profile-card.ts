import { CustomElement, attachShadowTemplate, coerceBoolean, coerceNumber, FoundationProperty } from '@tylertech/forge-core';
import { ProfileCardAdapter } from './profile-card-adapter';
import { ProfileCardFoundation } from './profile-card-foundation';
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
@CustomElement({
  name: PROFILE_CARD_CONSTANTS.elementName,
  dependencies: [
    ToolbarComponent,
    ButtonComponent,
    IconComponent,
    AvatarComponent
  ]
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

  private _foundation: ProfileCardFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ProfileCardFoundation(new ProfileCardAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
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

  @FoundationProperty()
  public declare fullName: string;

  @FoundationProperty()
  public declare email: string;

  @FoundationProperty()
  public declare signOut: boolean;

  @FoundationProperty()
  public declare profile: boolean;

  @FoundationProperty()
  public declare signOutText: string;

  @FoundationProperty()
  public declare profileText: string;

  @FoundationProperty()
  public declare avatarText: string;

  @FoundationProperty()
  public declare avatarIcon: string;

  @FoundationProperty()
  public declare avatarImageUrl: string;

  @FoundationProperty()
  public declare avatarLetterCount: number;

  public override focus(options?: FocusOptions): void {
    this._foundation.focus(options);
  }
}

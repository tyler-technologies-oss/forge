import { CustomElement, attachShadowTemplate, coerceBoolean, coerceNumber, FoundationProperty } from '@tylertech/forge-core';
import { ProfileCardAdapter } from './profile-card-adapter';
import { ProfileCardFoundation } from './profile-card-foundation';
import { PROFILE_CARD_CONSTANTS } from './profile-card-constants';
import { ButtonComponent } from '../button';
import { AvatarComponent } from '../avatar';
import { ToolbarComponent } from '../toolbar';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './profile-card.html';
import styles from './profile-card.scss';

export interface IProfileCardComponent extends IBaseComponent {
  fullName: string;
  email: string;
  signOut: boolean;
  profile: boolean;
  avatarText: string;
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
 * The web component class behind the `<forge-profile-card>` custom element.
 * 
 * @tag forge-profile-card
 */
@CustomElement({
  name: PROFILE_CARD_CONSTANTS.elementName,
  dependencies: [
    ToolbarComponent,
    ButtonComponent,
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
      PROFILE_CARD_CONSTANTS.attributes.AVATAR_TEXT,
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
        this.signOut = coerceBoolean(PROFILE_CARD_CONSTANTS.attributes.SIGN_OUT);
        break;
      case PROFILE_CARD_CONSTANTS.attributes.PROFILE:
        this.profile = coerceBoolean(PROFILE_CARD_CONSTANTS.attributes.PROFILE);
        break;
      case PROFILE_CARD_CONSTANTS.attributes.AVATAR_TEXT:
        this.avatarText = newValue;
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
  public fullName: string;

  @FoundationProperty()
  public email: string;

  @FoundationProperty()
  public signOut: boolean;

  @FoundationProperty()
  public profile: boolean;

  @FoundationProperty()
  public avatarText: string;

  @FoundationProperty()
  public avatarImageUrl: string;

  @FoundationProperty()
  public avatarLetterCount: number;
}

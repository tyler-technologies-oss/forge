import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, coerceBoolean, tryDefine } from '@tylertech/forge-core';
import { TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { AvatarComponent } from '../avatar/index.js';
import { ButtonComponent } from '../button/index.js';
import { ExperimentalFocusOptions } from '../constants.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { removeDefaultAttribute, removeEmptyAttribute } from '../core/utils/lit-utils.js';
import { IconComponent } from '../icon/icon.js';
import { ToolbarComponent } from '../toolbar/index.js';
import { PROFILE_CARD_CONSTANTS } from './profile-card-constants.js';

import styles from './profile-card.scss';

/** @deprecated - This will be removed in the future. Please switch to using ProfileCardComponent. */
export interface IProfileCardComponent extends BaseLitElement {
  fullName: string;
  email: string;
  signOut: boolean;
  profile: boolean;
  signOutText: string;
  profileText: string;
  avatarText: string;
  avatarIcon: string;
  avatarImageUrl: string;
  avatarLetterCount?: number;
}

const coerceBooleanAttribute = (value: string | null): boolean => coerceBoolean(value as string);

/**
 * @tag forge-profile-card
 *
 * @summary Profile cards display user information and actions in a structured card format. This component is deprecated prefer using the `<forge-user-profile>` component from the extended library instead.
 *
 * @dependency forge-avatar
 * @dependency forge-toolbar
 * @dependency forge-button
 * @dependency forge-icon
 *
 * @event {CustomEvent<void>} forge-profile-card-sign-out - Dispatched when the sign out button is clicked.
 * @event {CustomEvent<void>} forge-profile-card-profile - Dispatched when the profile button is clicked.
 *
 * @cssproperty --forge-profile-card-min-width - The minimum width of the card.
 * @cssproperty --forge-profile-card-shape - The border radius of the card.
 * @cssproperty --forge-profile-card-avatar-size - The size of the avatar.
 *
 * @csspart root - The root container element.
 * @csspart avatar - The avatar element.
 * @csspart name - The full name element.
 * @csspart email - The email element.
 * @csspart profile-button - The profile button element.
 * @csspart sign-out-button - The sign out button element.
 *
 * @slot - Content displayed between the user information and the action buttons.
 */
export class ProfileCardComponent extends BaseLitElement implements IProfileCardComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = PROFILE_CARD_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [AvatarComponent, ToolbarComponent, ButtonComponent, IconComponent];

  #signOutText = PROFILE_CARD_CONSTANTS.defaults.SIGN_OUT_BUTTON_TEXT;
  #profileText = PROFILE_CARD_CONSTANTS.defaults.PROFILE_BUTTON_TEXT;

  /**
   * The full name of the user.
   * @default ''
   * @attribute full-name
   */
  @property({ attribute: PROFILE_CARD_CONSTANTS.attributes.FULL_NAME, reflect: true, converter: { toAttribute: removeEmptyAttribute } })
  public fullName = '';

  /**
   * The email address of the user.
   * @default ''
   * @attribute
   */
  @property({ reflect: true, converter: { toAttribute: removeEmptyAttribute } })
  public email = '';

  /**
   * Whether the sign out button is displayed.
   * @default true
   * @attribute sign-out
   */
  @property({
    attribute: PROFILE_CARD_CONSTANTS.attributes.SIGN_OUT,
    reflect: true,
    converter: { fromAttribute: coerceBooleanAttribute, toAttribute: (value: boolean) => (value ? '' : null) }
  })
  public signOut = PROFILE_CARD_CONSTANTS.defaults.SHOW_SIGN_OUT_BUTTON;

  /**
   * Whether the profile button is displayed.
   * @default false
   * @attribute
   */
  @property({ reflect: true, converter: { fromAttribute: coerceBooleanAttribute, toAttribute: (value: boolean) => (value ? '' : null) } })
  public profile = PROFILE_CARD_CONSTANTS.defaults.SHOW_PROFILE_BUTTON;

  /**
   * The text of the sign out button.
   * @default 'Sign out'
   * @attribute sign-out-text
   */
  @property({
    attribute: PROFILE_CARD_CONSTANTS.attributes.SIGN_OUT_TEXT,
    reflect: true,
    converter: { toAttribute: (value: string) => removeDefaultAttribute(value, PROFILE_CARD_CONSTANTS.defaults.SIGN_OUT_BUTTON_TEXT) }
  })
  public set signOutText(value: string) {
    this.#signOutText = value || PROFILE_CARD_CONSTANTS.defaults.SIGN_OUT_BUTTON_TEXT;
  }
  public get signOutText(): string {
    return this.#signOutText;
  }

  /**
   * The text of the profile button.
   * @default 'Profile'
   * @attribute profile-text
   */
  @property({
    attribute: PROFILE_CARD_CONSTANTS.attributes.PROFILE_TEXT,
    reflect: true,
    converter: { toAttribute: (value: string) => removeDefaultAttribute(value, PROFILE_CARD_CONSTANTS.defaults.PROFILE_BUTTON_TEXT) }
  })
  public set profileText(value: string) {
    this.#profileText = value || PROFILE_CARD_CONSTANTS.defaults.PROFILE_BUTTON_TEXT;
  }
  public get profileText(): string {
    return this.#profileText;
  }

  /**
   * The text displayed in the avatar. Defaults to the full name.
   * @default ''
   * @attribute avatar-text
   */
  @property({ attribute: PROFILE_CARD_CONSTANTS.attributes.AVATAR_TEXT, reflect: true, converter: { toAttribute: removeEmptyAttribute } })
  public avatarText = '';

  /**
   * The name of the icon displayed in the avatar.
   * @default ''
   * @attribute avatar-icon
   */
  @property({ attribute: PROFILE_CARD_CONSTANTS.attributes.AVATAR_ICON, reflect: true, converter: { toAttribute: removeEmptyAttribute } })
  public avatarIcon = '';

  /**
   * The URL of the image displayed in the avatar.
   * @default ''
   * @attribute avatar-image-url
   */
  @property({ attribute: PROFILE_CARD_CONSTANTS.attributes.AVATAR_IMAGE_URL, reflect: true, converter: { toAttribute: removeEmptyAttribute } })
  public avatarImageUrl = '';

  /**
   * The number of letters displayed in the avatar.
   * @attribute avatar-letter-count
   */
  @property({ type: Number, attribute: PROFILE_CARD_CONSTANTS.attributes.AVATAR_LETTER_COUNT, reflect: true })
  public avatarLetterCount?: number;

  @query(PROFILE_CARD_CONSTANTS.selectors.PROFILE_BUTTON) private _profileButton?: ButtonComponent;
  @query(PROFILE_CARD_CONSTANTS.selectors.SIGN_OUT_BUTTON) private _signOutButton?: ButtonComponent;

  public override focus(options?: FocusOptions): void {
    window.requestAnimationFrame(() => {
      const target = this.profile ? this._profileButton : this.signOut ? this._signOutButton : undefined;
      target?.focus({ ...options, focusVisible: true } as ExperimentalFocusOptions);
    });
  }

  public render(): TemplateResult {
    return html`
      <div class="forge-profile-card" part="root">
        <div class="info-container">
          <div class="avatar">
            <forge-avatar
              part="avatar"
              .text=${this.avatarText || this.fullName}
              .imageUrl=${this.avatarImageUrl}
              .letterCount=${this.avatarLetterCount ?? PROFILE_CARD_CONSTANTS.defaults.AVATAR_LETTER_COUNT}>
              ${this.avatarIcon ? html`<forge-icon name=${this.avatarIcon}></forge-icon>` : nothing}
            </forge-avatar>
          </div>
          <div class="info-text">
            <div class="full-name" part="name">${this.fullName}</div>
            <div class="email" part="email">${this.email}</div>
          </div>
        </div>
        <slot></slot>
        ${this.#renderActionToolbar()}
      </div>
    `;
  }

  #renderActionToolbar(): TemplateResult {
    return html`
      <forge-toolbar inverted id="action-toolbar" style=${styleMap({ display: this.signOut || this.profile ? null : 'none' })}>
        <forge-button
          variant="outlined"
          slot="end"
          part="profile-button"
          id="profile-button"
          style=${styleMap({ display: this.profile ? null : 'none' })}
          @click=${this.#handleProfileClick}>
          ${this.profileText}
        </forge-button>
        <forge-button
          slot="end"
          part="sign-out-button"
          id="sign-out-button"
          style=${styleMap({ display: this.signOut ? null : 'none' })}
          @click=${this.#handleSignOutClick}>
          ${this.signOutText}
        </forge-button>
      </forge-toolbar>
    `;
  }

  #handleProfileClick(evt: Event): void {
    evt.stopPropagation();
    this.dispatchEvent(new CustomEvent(PROFILE_CARD_CONSTANTS.events.PROFILE, { bubbles: true }));
  }

  #handleSignOutClick(evt: Event): void {
    evt.stopPropagation();
    this.dispatchEvent(new CustomEvent(PROFILE_CARD_CONSTANTS.events.SIGN_OUT, { bubbles: true }));
  }
}

tryDefine(PROFILE_CARD_CONSTANTS.elementName, ProfileCardComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-profile-card': IProfileCardComponent;
  }

  interface HTMLElementEventMap {
    'forge-profile-card-sign-out': CustomEvent<void>;
    'forge-profile-card-profile': CustomEvent<void>;
  }
}

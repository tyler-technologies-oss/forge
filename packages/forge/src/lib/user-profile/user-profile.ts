import { PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedNodes, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { when } from 'lit/directives/when.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconAccountOutline, tylIconLogout } from '@tylertech/tyler-icons';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { toggleState } from '../core/utils/utils.js';
import { AvatarComponent } from '../avatar/index.js';
import { ButtonComponent } from '../button/index.js';
import { DividerComponent } from '../divider/index.js';
import { IconButtonComponent } from '../icon-button/index.js';
import { IconComponent, IconRegistry } from '../icon/index.js';
import { ListComponent } from '../list/list/index.js';
import { IPopoverToggleEventData, PopoverComponent } from '../popover/index.js';
import { ToolbarComponent } from '../toolbar/index.js';
import { ThemeToggleComponent, ThemeToggleTheme } from '../theme-toggle/index.js';

import '../avatar/avatar.js';
import '../button/button.js';
import '../divider/divider.js';
import '../icon-button/icon-button.js';
import '../icon/icon.js';
import '../list/list/list.js';
import '../popover/popover.js';
import '../toolbar/toolbar.js';
import '../theme-toggle/theme-toggle.js';

import styles from './user-profile.scss';

export interface IUserProfileComponent extends BaseLitElement {
  fullName: string;
  email: string;
  imageUrl: string;
  buttonLabel: string;
  themeToggle: boolean;
  open: boolean;
  setTheme(value: ThemeToggleTheme): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-user-profile': IUserProfileComponent;
  }

  interface HTMLElementEventMap {
    'forge-user-profile-sign-in': Event;
    'forge-user-profile-sign-out': Event;
  }
}

export const USER_PROFILE_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-user-profile';

/**
 * @tag forge-user-profile
 *
 * @summary Displays user authentication state within an application, showing a sign-in button when signed out, or an avatar button that opens a popover with the user's info, links, and sign-out action when signed in.
 *
 * @meta extended
 *
 * @dependency forge-avatar
 * @dependency forge-button
 * @dependency forge-divider
 * @dependency forge-icon-button
 * @dependency forge-icon
 * @dependency forge-list
 * @dependency forge-popover
 * @dependency forge-toolbar
 * @dependency forge-theme-toggle
 *
 * @slot link - Slot for additional profile navigation links
 * @slot sign-in-button-text - Slot for the sign in button text
 * @slot sign-out-button-text - Slot for the sign out button text
 *
 * @state open - Applied when the profile popover is open.
 *
 * @event {Event} forge-user-profile-sign-in - Fired when the sign in button is clicked.
 * @event {Event} forge-user-profile-sign-out - Fired when the sign out button is clicked.
 */
@customElement(USER_PROFILE_TAG_NAME)
export class UserProfileComponent extends BaseLitElement implements IUserProfileComponent {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = USER_PROFILE_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [
    AvatarComponent,
    ButtonComponent,
    DividerComponent,
    IconButtonComponent,
    IconComponent,
    ListComponent,
    PopoverComponent,
    ToolbarComponent,
    ThemeToggleComponent
  ];

  static {
    IconRegistry.define([tylIconLogout, tylIconAccountOutline]);
  }

  public static styles = unsafeCSS(styles);

  /** The full name of the user. */
  @property({ attribute: 'full-name' })
  public fullName = '';

  /** The email address of the user. */
  @property()
  public email = '';

  /** The image URL for the user avatar. */
  @property({ attribute: 'image-url' })
  public imageUrl = '';

  /** ARIA label for the user profile avatar button. */
  @property({ attribute: 'button-label' })
  public buttonLabel = 'Open user profile';

  /** Indicates whether the theme toggle is visible. */
  @property({ type: Boolean, attribute: 'theme-toggle' })
  public themeToggle = false;

  /** Controls whether the user profile popover is open. */
  @property({ type: Boolean })
  public open = false;

  @state()
  private _signedIn = false;

  @queryAssignedNodes({ slot: 'link', flatten: true })
  private readonly _slottedLinkNodes!: Node[];

  readonly #internals: ElementInternals;
  readonly #linkSlot = html`<slot name="link" id="link-slot"></slot>`;
  readonly #signInButtonSlot = html`<slot name="sign-in-button-text" id="sign-in-button-slot">Sign in</slot>`;
  readonly #signOutButtonSlot = html`<slot name="sign-out-button-text" id="sign-out-button-slot">Sign Out</slot>`;
  readonly #themeToggleRef = createRef<ThemeToggleComponent>();

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this._signedIn = this.fullName.trim().length > 0;
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('open')) {
      toggleState(this.#internals, 'open', this.open);
    }

    if (changedProperties.has('fullName')) {
      this._signedIn = this.fullName.trim().length > 0;
    }
  }

  get #links(): TemplateResult {
    const showLinks = this._slottedLinkNodes.length > 0;
    return when(
      showLinks,
      () => html`<forge-list>${this.#linkSlot}</forge-list>`,
      () => this.#linkSlot
    );
  }

  get #themeToggleTemplate(): TemplateResult | typeof nothing {
    return when(
      this.themeToggle,
      () => html`
        <forge-divider></forge-divider>
        <div class="theme-toggle-container">
          <forge-theme-toggle ${ref(this.#themeToggleRef)}></forge-theme-toggle>
        </div>
      `,
      () => nothing
    );
  }

  get #triggerButton(): TemplateResult {
    return this._signedIn
      ? html`
          <forge-icon-button theme="app-bar" aria-label=${this.buttonLabel} id="popover-trigger">
            <forge-avatar .text=${this.fullName} .imageUrl=${this.imageUrl} id="button-avatar"></forge-avatar>
          </forge-icon-button>
        `
      : html`
          <forge-button variant="outlined" class="sign-in-button" pill @click=${this.#handleSignIn}>
            <forge-icon name="account_outline" slot="start"></forge-icon>
            ${this.#signInButtonSlot}
          </forge-button>
        `;
  }

  get #signOutButton(): TemplateResult {
    return html`
      <forge-toolbar inverted>
        <div slot="end">
          <forge-button class="sign-out-button" id="sign-out-button" @click=${this.#handleSignOut}>
            ${this.#signOutButtonSlot}
            <forge-icon name="logout" external slot="end"></forge-icon>
          </forge-button>
        </div>
      </forge-toolbar>
    `;
  }

  public render(): TemplateResult {
    return html`
      ${this.#triggerButton}
      ${when(
        this._signedIn,
        () => html`
          <forge-popover
            id="user-profile-popover"
            anchor="popover-trigger"
            placement="bottom-end"
            arrow
            position-strategy="fixed"
            .open=${this.open}
            @forge-popover-toggle=${this.#handlePopoverToggle}
            @slotchange=${this.#handleSlotChange}>
            <div class="user-info-container">
              <forge-avatar .text=${this.fullName} class="popover-avatar" .imageUrl=${this.imageUrl} id="popover-avatar"></forge-avatar>
              <div class="user-info">
                <div class="full-name">${this.fullName}</div>
                <div class="email">${this.email}</div>
              </div>
            </div>
            ${when(this._slottedLinkNodes.length > 0, () => html`<forge-divider></forge-divider>`)} ${this.#links} ${this.#themeToggleTemplate}
            ${this.#signOutButton}
          </forge-popover>
        `
      )}
    `;
  }

  /** Sets the theme for the theme toggle. */
  public setTheme(value: ThemeToggleTheme): void {
    if (this.#themeToggleRef.value) {
      this.#themeToggleRef.value.setTheme(value);
    }
  }

  #handlePopoverToggle(evt: CustomEvent<IPopoverToggleEventData>): void {
    this.open = evt.detail.newState === 'open';
  }

  #handleSignIn(): void {
    const event = new Event('forge-user-profile-sign-in', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  #handleSignOut(): void {
    const event = new Event('forge-user-profile-sign-out', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  #handleSlotChange(evt: Event): void {
    const slotName = (evt.target as HTMLSlotElement).name;
    if (['link', 'sign-in-button-text', 'sign-out-button-text'].includes(slotName)) {
      this.requestUpdate();
    }
  }
}

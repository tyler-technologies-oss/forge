import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { userEvent } from 'vitest/browser';
import type { IProfileCardComponent } from './profile-card.js';
import type { IToolbarComponent } from '../toolbar/toolbar.js';
import type { IButtonComponent } from '../button/button.js';
import type { IAvatarComponent } from '../avatar/avatar.js';
import { TestHarness } from '../core/testing/test-harness.js';
import { getShadowElement } from '@tylertech/forge-core';
import { PROFILE_CARD_CONSTANTS } from './profile-card-constants.js';
import type { IIconComponent } from '../icon/index.js';
import { frame } from '../core/utils/utils.js';

import './profile-card.js';

class ProfileCardHarness extends TestHarness<IProfileCardComponent> {
  private _actionToolbarElement: IToolbarComponent;
  private _signOutButton: IButtonComponent;
  private _profileButton: IButtonComponent;
  private _avatarElement: IAvatarComponent;
  private _fullNameElement: HTMLElement;
  private _emailElement: HTMLElement;

  constructor(el: IProfileCardComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this._actionToolbarElement = getShadowElement(this.element, PROFILE_CARD_CONSTANTS.selectors.ACTION_TOOLBAR) as IToolbarComponent;
    this._signOutButton = getShadowElement(this.element, PROFILE_CARD_CONSTANTS.selectors.SIGN_OUT_BUTTON) as IButtonComponent;
    this._profileButton = getShadowElement(this.element, PROFILE_CARD_CONSTANTS.selectors.PROFILE_BUTTON) as IButtonComponent;
    this._avatarElement = getShadowElement(this.element, PROFILE_CARD_CONSTANTS.selectors.AVATAR) as IAvatarComponent;
    this._fullNameElement = getShadowElement(this.element, PROFILE_CARD_CONSTANTS.selectors.FULL_NAME) as HTMLElement;
    this._emailElement = getShadowElement(this.element, PROFILE_CARD_CONSTANTS.selectors.EMAIL) as HTMLElement;
  }

  public get fullName(): string {
    return this._fullNameElement.innerText;
  }
  public set fullName(value: string) {
    this.element.fullName = value;
  }

  public get email(): string {
    return this._emailElement.innerText;
  }
  public set email(value: string) {
    this.element.email = value;
  }

  public get avatarElement(): IAvatarComponent {
    return this._avatarElement;
  }

  public get signOutButton(): IButtonComponent {
    return this._signOutButton;
  }

  public get profileButton(): IButtonComponent {
    return this._profileButton;
  }

  public get isToolbarVisible(): boolean {
    return getComputedStyle(this._actionToolbarElement).display !== 'none';
  }

  public get isSignOutButtonVisible(): boolean {
    return getComputedStyle(this._signOutButton).display !== 'none';
  }

  public get isProfileButtonVisible(): boolean {
    return getComputedStyle(this._profileButton).display !== 'none';
  }

  public async clickSignOutButton(): Promise<void> {
    await userEvent.click(this._signOutButton);
  }

  public async clickProfileButton(): Promise<void> {
    await userEvent.click(this._profileButton);
  }
}

describe('Profile Card', () => {
  const DEFAULT_FULL_NAME = 'Test Name';
  const DEFAULT_EMAIL = 'test.name@test.com';

  interface ProfileCardFixtureConfig {
    fullName?: string;
    email?: string;
    signOut?: boolean;
    profile?: boolean;
    signOutText?: string;
    profileText?: string;
    avatarText?: string;
    avatarIcon?: string;
    avatarImageUrl?: string;
    avatarLetterCount?: number;
  }

  async function setupTest({
    fullName = DEFAULT_FULL_NAME,
    email = DEFAULT_EMAIL,
    signOut = true,
    profile,
    signOutText,
    profileText,
    avatarText,
    avatarIcon,
    avatarImageUrl,
    avatarLetterCount
  }: ProfileCardFixtureConfig = {}): Promise<ProfileCardHarness> {
    const screen = render(html`
      <forge-profile-card
        full-Name=${fullName || nothing}
        email=${email || nothing}
        avatar-text=${avatarText || nothing}
        sign-out=${signOut ? nothing : 'false'}
        sign-out-text=${signOutText || nothing}
        profile-text=${profileText || nothing}
        avatar-icon=${avatarIcon || nothing}
        avatar-image-url=${avatarImageUrl || nothing}
        avatar-letter-count=${avatarLetterCount || nothing}
        ?profile=${profile}>
      </forge-profile-card>
    `);
    const el = screen.container.querySelector('forge-profile-card') as IProfileCardComponent;
    return new ProfileCardHarness(el);
  }

  it('should be accessible', async () => {
    const harness = await setupTest();
    await expect(harness.element).toBeAccessible();
  });

  it('should display full name', async () => {
    const harness = await setupTest();

    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.FULL_NAME)).toBe(DEFAULT_FULL_NAME);
    expect(harness.fullName).toBe(DEFAULT_FULL_NAME);
  });

  it('should update full name', async () => {
    const harness = await setupTest();

    const newFullName = 'New Name';
    harness.fullName = newFullName;

    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.FULL_NAME)).toBe(newFullName);
    expect(harness.fullName).toBe(newFullName);
  });

  it('should display email', async () => {
    const harness = await setupTest();

    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.EMAIL)).toBe(DEFAULT_EMAIL);
    expect(harness.email).toBe(DEFAULT_EMAIL);
  });

  it('should update email', async () => {
    const harness = await setupTest();

    const newEmail = 'new email';
    harness.email = newEmail;

    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.EMAIL)).toBe(newEmail);
    expect(harness.email).toBe(newEmail);
  });

  it('should display avatar', async () => {
    const harness = await setupTest();
    expect(harness.avatarElement).toBeTruthy();
  });

  it('should set avatar text from full name', async () => {
    const harness = await setupTest();
    expect(harness.avatarElement.text).toBe(DEFAULT_FULL_NAME);
  });

  it('should set avatar text separately from full name', async () => {
    const harness = await setupTest({ avatarText: 'Test Avatar' });
    expect(harness.avatarElement.text).toBe('Test Avatar');
  });

  it('should display action toolbar', async () => {
    const harness = await setupTest();
    expect(harness.isToolbarVisible).toBe(true);
  });

  it('should display sign out button', async () => {
    const harness = await setupTest();
    expect(harness.isSignOutButtonVisible).toBe(true);
  });

  it('should hide sign out button', async () => {
    const harness = await setupTest({ signOut: false });
    expect(harness.isSignOutButtonVisible).toBe(false);
  });

  it('should emit sign out event', async () => {
    const harness = await setupTest();
    const signOutSpy = vi.fn();
    harness.element.addEventListener(PROFILE_CARD_CONSTANTS.events.SIGN_OUT, signOutSpy);

    await harness.clickSignOutButton();

    expect(signOutSpy).toHaveBeenCalledOnce();
  });

  it('should not display profile button', async () => {
    const harness = await setupTest();
    expect(harness.isProfileButtonVisible).toBe(false);
  });

  it('should display profile button', async () => {
    const harness = await setupTest({ profile: true });
    expect(harness.isProfileButtonVisible).toBe(true);
  });

  it('should emit profile event', async () => {
    const harness = await setupTest({ profile: true });
    const profileSpy = vi.fn();
    harness.element.addEventListener(PROFILE_CARD_CONSTANTS.events.PROFILE, profileSpy);

    await harness.clickProfileButton();

    expect(profileSpy).toHaveBeenCalledOnce();
  });

  it('should not set focus to anything by default', async () => {
    const harness = await setupTest();
    await frame();
    expect(document.activeElement).not.toBe(harness.element);
  });

  it('should set focus to sign out button', async () => {
    const harness = await setupTest();

    harness.element.focus();
    await frame();

    expect(document.activeElement).toBe(harness.element);
    expect(harness.element.shadowRoot?.activeElement).toBe(harness.signOutButton);
  });

  it('should set focus to profile button when sign out button is hidden', async () => {
    const harness = await setupTest({ signOut: false, profile: true });

    harness.element.focus();
    await frame();

    expect(document.activeElement).toBe(harness.element);
    expect(harness.element.shadowRoot?.activeElement).toBe(harness.profileButton);
  });

  it('should not set focus to anything when sign out and profile buttons are hidden', async () => {
    const harness = await setupTest({ signOut: false, profile: false });

    harness.element.focus();
    await frame();

    expect(document.activeElement).not.toBe(harness.element);
  });

  it('should set sign out text', async () => {
    const signOutText = 'Sign Out Test';
    const harness = await setupTest({ signOutText });

    expect(harness.element.signOutText).toBe(signOutText);
    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.SIGN_OUT_TEXT)).toBe(signOutText);
    expect(harness.signOutButton.innerText).toBe(signOutText);
  });

  it('should set profile text', async () => {
    const profileText = 'Profile Test';
    const harness = await setupTest({ profile: true, profileText });

    expect(harness.element.profileText).toBe(profileText);
    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.PROFILE_TEXT)).toBe(profileText);
    expect(harness.profileButton.innerText).toBe(profileText);
  });

  it('should set avatar icon', async () => {
    const avatarIcon = 'account';
    const harness = await setupTest({ avatarIcon });

    const iconElement = harness.avatarElement.querySelector('forge-icon') as IIconComponent;

    expect(harness.element.avatarIcon).toBe(avatarIcon);
    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_ICON)).toBe(avatarIcon);
    expect(iconElement).toBeTruthy();
    expect(iconElement.name).toBe(avatarIcon);
  });

  it('should remove icon element when avatar icon is removed', async () => {
    const avatarIcon = 'account';
    const harness = await setupTest({ avatarIcon });

    const iconElement = harness.avatarElement.querySelector('forge-icon') as IIconComponent;

    expect(iconElement).toBeTruthy();

    harness.element.avatarIcon = '';

    expect(harness.element.avatarIcon).toBe('');
    expect(harness.element.hasAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_ICON)).toBe(false);
    expect(harness.avatarElement.querySelector('forge-icon')).toBeFalsy();
  });

  it('should set avatar image url', async () => {
    const avatarImageUrl = 'javascript: void(0);';
    const harness = await setupTest({ avatarImageUrl });

    expect(harness.element.avatarImageUrl).toBe(avatarImageUrl);
    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_IMAGE_URL)).toBe(avatarImageUrl);
    expect(harness.avatarElement.imageUrl).toBe(avatarImageUrl);
  });

  it('should set avatar letter count', async () => {
    const avatarLetterCount = 2;
    const harness = await setupTest({ avatarLetterCount });

    expect(harness.element.avatarLetterCount).toBe(avatarLetterCount);
    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_LETTER_COUNT)).toBe(`${avatarLetterCount}`);
    expect(harness.avatarElement.letterCount).toBe(avatarLetterCount);
  });
});

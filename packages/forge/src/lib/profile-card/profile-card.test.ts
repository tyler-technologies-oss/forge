import { expect } from '@esm-bundle/chai';
import { sendMouse } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { nothing } from 'lit-html';
import type { IProfileCardComponent } from './profile-card';
import type { IToolbarComponent } from '../toolbar/toolbar';
import type { IButtonComponent } from '../button/button';
import type { IAvatarComponent } from '../avatar/avatar';
import { TestHarness } from '../core/testing/test-harness';
import { getShadowElement } from '@tylertech/forge-core';
import { PROFILE_CARD_CONSTANTS } from './profile-card-constants';
import { IIconComponent } from '../icon';

import './profile-card';

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
    await this._clickElement(this._signOutButton);
  }

  public async clickProfileButton(): Promise<void> {
    await this._clickElement(this._profileButton);
  }

  private _clickElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height } = el.getBoundingClientRect();
    return sendMouse({
      type: 'click',
      position: [Math.floor(x + window.scrollX + width / 2), Math.floor(y + window.scrollY + height / 2)]
    });
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
    const el = await fixture<IProfileCardComponent>(html`
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
    return new ProfileCardHarness(el);
  }

  it('should be accessible', async () => {
    const harness = await setupTest();

    await expect(harness.element).to.be.accessible();
  });

  it('should display full name', async () => {
    const harness = await setupTest();

    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.FULL_NAME)).to.equal(DEFAULT_FULL_NAME);
    expect(harness.fullName).to.equal(DEFAULT_FULL_NAME);
  });

  it('should update full name', async () => {
    const harness = await setupTest();

    const newFullName = 'New Name';
    harness.fullName = newFullName;

    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.FULL_NAME)).to.equal(newFullName);
    expect(harness.fullName).to.equal(newFullName);
  });

  it('should display email', async () => {
    const harness = await setupTest();

    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.EMAIL)).to.equal(DEFAULT_EMAIL);
    expect(harness.email).to.equal(DEFAULT_EMAIL);
  });

  it('should update email', async () => {
    const harness = await setupTest();

    const newEmail = 'new email';
    harness.email = newEmail;

    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.EMAIL)).to.equal(newEmail);
    expect(harness.email).to.equal(newEmail);
  });

  it('should display avatar', async () => {
    const harness = await setupTest();

    expect(harness.avatarElement).to.exist;
  });

  it('should set avatar text from full name', async () => {
    const harness = await setupTest();

    expect(harness.avatarElement.text).to.equal(DEFAULT_FULL_NAME);
  });

  it('should set avatar text separately from full name', async () => {
    const harness = await setupTest({ avatarText: 'Test Avatar' });

    expect(harness.avatarElement.text).to.equal('Test Avatar');
  });

  it('should display action toolbar', async () => {
    const harness = await setupTest();

    expect(harness.isToolbarVisible).to.be.true;
  });

  it('should display sign out button', async () => {
    const harness = await setupTest();

    expect(harness.isSignOutButtonVisible).to.be.true;
  });

  it('should hide sign out button', async () => {
    const harness = await setupTest({ signOut: false });

    expect(harness.isSignOutButtonVisible).not.to.be.true;
  });

  it('should emit sign out event', async () => {
    const harness = await setupTest();
    const signOutSpy = spy();
    harness.element.addEventListener(PROFILE_CARD_CONSTANTS.events.SIGN_OUT, signOutSpy);

    await harness.clickSignOutButton();

    expect(signOutSpy).to.have.been.calledOnce;
  });

  it('should not display profile button', async () => {
    const harness = await setupTest();

    expect(harness.isProfileButtonVisible).not.to.be.true;
  });

  it('should display profile button', async () => {
    const harness = await setupTest({ profile: true });

    expect(harness.isProfileButtonVisible).to.be.true;
  });

  it('should emit profile event', async () => {
    const harness = await setupTest({ profile: true });
    const profileSpy = spy();
    harness.element.addEventListener(PROFILE_CARD_CONSTANTS.events.PROFILE, profileSpy);

    await harness.clickProfileButton();

    expect(profileSpy).to.have.been.calledOnce;
  });

  it('should not set focus to anything by default', async () => {
    const harness = await setupTest();

    await elementUpdated(harness.element);

    expect(document.activeElement).not.to.equal(harness.element);
  });

  it('should set focus to sign out button', async () => {
    const harness = await setupTest();

    harness.element.focus();
    await elementUpdated(harness.element);

    expect(document.activeElement).to.equal(harness.element);
    expect(harness.element.shadowRoot?.activeElement).to.equal(harness.signOutButton);
  });

  it('should set focus to profile button when sign out button is hidden', async () => {
    const harness = await setupTest({ signOut: false, profile: true });

    harness.element.focus();
    await elementUpdated(harness.element);

    expect(document.activeElement).to.equal(harness.element);
    expect(harness.element.shadowRoot?.activeElement).to.equal(harness.profileButton);
  });

  it('should not set focus to anything when sign out and profile buttons are hidden', async () => {
    const harness = await setupTest({ signOut: false, profile: false });

    harness.element.focus();
    await elementUpdated(harness.element);

    expect(document.activeElement).not.to.equal(harness.element);
  });

  it('should set sign out text', async () => {
    const signOutText = 'Sign Out Test';
    const harness = await setupTest({ signOutText });

    expect(harness.element.signOutText).to.equal(signOutText);
    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.SIGN_OUT_TEXT)).to.equal(signOutText);
    expect(harness.signOutButton.innerText).to.equal(signOutText);
  });

  it('should set profile text', async () => {
    const profileText = 'Profile Test';
    const harness = await setupTest({ profile: true, profileText });

    expect(harness.element.profileText).to.equal(profileText);
    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.PROFILE_TEXT)).to.equal(profileText);
    expect(harness.profileButton.innerText).to.equal(profileText);
  });

  it('should set avatar icon', async () => {
    const avatarIcon = 'account';
    const harness = await setupTest({ avatarIcon });

    const iconElement = harness.avatarElement.querySelector('forge-icon') as IIconComponent;

    expect(harness.element.avatarIcon).to.equal(avatarIcon);
    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_ICON)).to.equal(avatarIcon);
    expect(iconElement).to.exist;
    expect(iconElement.name).to.equal(avatarIcon);
  });

  it('should remove icon element when avatar icon is removed', async () => {
    const avatarIcon = 'account';
    const harness = await setupTest({ avatarIcon });

    const iconElement = harness.avatarElement.querySelector('forge-icon') as IIconComponent;

    expect(iconElement).to.exist;

    harness.element.avatarIcon = '';

    expect(harness.element.avatarIcon).to.equal('');
    expect(harness.element.hasAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_ICON)).to.false;
    expect(harness.avatarElement.querySelector('forge-icon')).not.to.exist;
  });

  it('should set avatar image url', async () => {
    const avatarImageUrl = 'javascript: void(0);';
    const harness = await setupTest({ avatarImageUrl });

    expect(harness.element.avatarImageUrl).to.equal(avatarImageUrl);
    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_IMAGE_URL)).to.equal(avatarImageUrl);
    expect(harness.avatarElement.imageUrl).to.equal(avatarImageUrl);
  });

  it('should set avatar letter count', async () => {
    const avatarLetterCount = 2;
    const harness = await setupTest({ avatarLetterCount });

    expect(harness.element.avatarLetterCount).to.equal(avatarLetterCount);
    expect(harness.element.getAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_LETTER_COUNT)).to.equal(`${avatarLetterCount}`);
    expect(harness.avatarElement.letterCount).to.equal(avatarLetterCount);
  });
});

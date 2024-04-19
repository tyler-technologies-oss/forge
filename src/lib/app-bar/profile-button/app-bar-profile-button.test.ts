import { expect } from '@esm-bundle/chai';
import { timer } from '@tylertech/forge-testing';
import { sendMouse } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import type { IAppBarProfileButtonComponent } from './app-bar-profile-button';
import { APP_BAR_PROFILE_BUTTON_CONSTANTS } from './app-bar-profile-button-constants';
import { IIconButtonComponent } from '../../icon-button';
import { IProfileCardComponent, PROFILE_CARD_CONSTANTS } from '../../profile-card';

const POPOVER_ANIMATION_DURATION = 200;

import './app-bar-profile-button';
import { IPopoverComponent } from '../../popover';

// Required by floating-ui library to prevent errors
globalThis['process'] = { env: { NODE_ENV: 'test' }} as any;

describe('App Bar Profile Button', () => {
  const fullName = 'Tyler Forge';
  const email = 'tyler.forge@tylertech.com';
  const avatarImageUrl = 'javascript: void(0)';
  const avatarLetterCount = 1;
  const avatarText = 'TF';
  const avatarIcon = 'person';

  it('should be accessible', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

    await expect(el).to.be.accessible();
  });

  it('should forward aria-label', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button aria-label="foo"></forge-app-bar-profile-button>`);
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).to.equal('foo');
  });

  it('should remove internal aria-label if aria-label is removed', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button aria-label="foo"></forge-app-bar-profile-button>`);
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).to.equal('foo');

    el.removeAttribute('aria-label');
    await elementUpdated(el);

    expect(iconButtonEl.getAttribute('aria-label')).to.be.null;
  });

  it('should reset internal aria-labelledby to tooltip id if external aria-labelledby is removed', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button aria-labelledby="foo"></forge-app-bar-profile-button>`);
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;
    const tooltipEl = el.querySelector('forge-tooltip') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-labelledby')).to.equal('foo');

    el.removeAttribute('aria-labelledby');
    await elementUpdated(el);

    expect(iconButtonEl.getAttribute('aria-labelledby')).to.equal(tooltipEl.id);
  });

  it('should set full name', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button full-name="${fullName}"></forge-app-bar-profile-button>`);

    expect(el.fullName).to.equal(fullName);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.FULL_NAME)).to.equal(fullName);
  });

  it('should set full name dynamically', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

    el.fullName = fullName;

    expect(el.fullName).to.equal(fullName);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.FULL_NAME)).to.equal(fullName);
  });

  it('should set email', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button email="${email}"></forge-app-bar-profile-button>`);

    expect(el.email).to.equal(email);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.EMAIL)).to.equal(email);
  });

  it('should set email dynamically', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

    el.email = email;

    expect(el.email).to.equal(email);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.EMAIL)).to.equal(email);
  });

  it('should set avatar image url', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button avatar-image-url="${avatarImageUrl}"></forge-app-bar-profile-button>`);

    expect(el.avatarImageUrl).to.equal(avatarImageUrl);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_IMAGE_URL)).to.equal(avatarImageUrl);
  });

  it('should set avatar image url dynamically', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

    el.avatarImageUrl = avatarImageUrl;

    expect(el.avatarImageUrl).to.equal(avatarImageUrl);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_IMAGE_URL)).to.equal(avatarImageUrl);
  });

  it('should set avatar letter count', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button avatar-letter-count="${avatarLetterCount}"></forge-app-bar-profile-button>`);

    expect(el.avatarLetterCount).to.equal(avatarLetterCount);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_LETTER_COUNT)).to.equal(String(avatarLetterCount));
  });

  it('should set avatar letter count dynamically', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

    el.avatarLetterCount = avatarLetterCount;

    expect(el.avatarLetterCount).to.equal(avatarLetterCount);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_LETTER_COUNT)).to.equal(String(avatarLetterCount));
  });

  it('should set avatar text', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button avatar-text="${avatarText}"></forge-app-bar-profile-button>`);

    expect(el.avatarText).to.equal(avatarText);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_TEXT)).to.equal(avatarText);
  });

  it('should set avatar text dynamically', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

    el.avatarText = avatarText;

    expect(el.avatarText).to.equal(avatarText);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_TEXT)).to.equal(avatarText);
  });

  it('should set avatar icon', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button avatar-icon="${avatarIcon}"></forge-app-bar-profile-button>`);

    expect(el.avatarIcon).to.equal(avatarIcon);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_ICON)).to.equal(avatarIcon);
  });

  it('should set avatar icon dynamically', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

    el.avatarIcon = avatarIcon;

    expect(el.avatarIcon).to.equal(avatarIcon);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_ICON)).to.equal(avatarIcon);
  });

  it('should set sign out button', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button sign-out-button></forge-app-bar-profile-button>`);

    expect(el.signOutButton).to.be.true;
    expect(el.hasAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON)).to.be.true;
  });

  it('should set sign out button dynamically', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

    el.signOutButton = false;

    expect(el.signOutButton).to.be.false;
    expect(el.hasAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON)).to.be.false;

    el.signOutButton = true;

    expect(el.signOutButton).to.be.true;
    expect(el.hasAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON)).to.be.true;
  });

  it('should set profile button', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button profile-button></forge-app-bar-profile-button>`);

    expect(el.profileButton).to.be.true;
    expect(el.hasAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.PROFILE_BUTTON)).to.be.true;
  });

  it('should set profile button dynamically', async () => {
    const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

    el.profileButton = true;

    expect(el.profileButton).to.be.true;
    expect(el.hasAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.PROFILE_BUTTON)).to.be.true;
  });

  describe('Profile Card Popup', () => {
    it('should show profile card popup when clicked', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      
      const popup = await openPopup(el);

      expect(el.open).to.be.true;
      expect(popup).to.be.ok;
      expect(el.popupElement).to.be.ok;
    });

    it('should close profile card when escape key is pressed', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      
      const popup = await openPopup(el);
      
      expect(popup).to.be.ok;
      expect(popup.isConnected).to.be.true;

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await timer(POPOVER_ANIMATION_DURATION);
      await elementUpdated(el);

      expect(el.open).to.be.false;
      expect(popup.isConnected).to.be.false;
      expect(el.popupElement).not.to.be.ok;
    });

    it('should close profile card when clicked outside', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      
      const popup = await openPopup(el);

      expect(popup).to.be.ok;
      expect(popup.isConnected).to.be.true;

      await clickOutsidePopupElement(popup);
      await timer(POPOVER_ANIMATION_DURATION);
      await elementUpdated(el);
      await elementUpdated(el);

      expect(el.open).to.be.false;
      expect(popup.isConnected).to.be.false;
      expect(el.popupElement).not.to.be.ok;
    });

    it('should close dropdown when button is clicked', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      
      const popup = await openPopup(el);

      expect(popup).to.be.ok;
      expect(popup.isConnected).to.be.true;

      const iconButton = el.querySelector('forge-icon-button') as IIconButtonComponent;
      await clickElement(iconButton);
      await timer(POPOVER_ANIMATION_DURATION);
      await elementUpdated(el);

      expect(el.open).to.be.false;
      expect(popup.isConnected).to.be.false;
      expect(el.popupElement).not.to.be.ok;
    });

    it('should open via property', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

      el.open = true;
      await timer(POPOVER_ANIMATION_DURATION);
      await elementUpdated(el);

      expect(el.open).to.be.true;
      expect(el.popupElement).to.be.ok;
    });

    it('should close via property', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

      el.open = true;
      await timer(POPOVER_ANIMATION_DURATION);
      await elementUpdated(el);

      expect(el.open).to.be.true;
      expect(el.popupElement).to.be.ok;

      el.open = false;
      await timer(POPOVER_ANIMATION_DURATION);
      await elementUpdated(el);

      expect(el.open).to.be.false;
      expect(el.popupElement).not.to.be.ok;
    });

    it('should dispatch event when sign out button is clicked', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const signOutSpy = spy();
      el.addEventListener(PROFILE_CARD_CONSTANTS.events.SIGN_OUT, signOutSpy);

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as HTMLElement;

      const signOutButton = profileCard.shadowRoot?.querySelector('forge-button#sign-out-button') as HTMLElement;
      signOutButton.click();

      await timer(POPOVER_ANIMATION_DURATION);
      await elementUpdated(el);

      expect(signOutSpy).to.have.been.calledOnce;
    });

    it('should dispatch event when profile button is clicked', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const profileSpy = spy();
      el.addEventListener(PROFILE_CARD_CONSTANTS.events.PROFILE, profileSpy);

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as HTMLElement;

      const profileButton = profileCard.shadowRoot?.querySelector('forge-button#profile-button') as HTMLElement;
      profileButton.click();

      await timer(POPOVER_ANIMATION_DURATION);
      await elementUpdated(el);

      expect(profileSpy).to.have.been.calledOnce;
    });

    it('should proxy properties to profile card', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

      el.fullName = fullName;
      el.email = email;
      el.avatarImageUrl = avatarImageUrl;
      el.avatarLetterCount = avatarLetterCount;
      el.avatarText = avatarText;
      el.avatarIcon = avatarIcon;
      el.signOutButton = true;
      el.profileButton = true;
      el.signOutButtonText = 'Sign Out';
      el.profileButtonText = 'Profile';

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;

      expect(profileCard.fullName).to.equal(fullName);
      expect(profileCard.email).to.equal(email);
      expect(profileCard.avatarImageUrl).to.equal(avatarImageUrl);
      expect(profileCard.avatarLetterCount).to.equal(avatarLetterCount);
      expect(profileCard.avatarText).to.equal(avatarText);
      expect(profileCard.avatarIcon).to.equal(avatarIcon);
      expect(profileCard.signOut).to.be.true;
      expect(profileCard.profile).to.be.true;
      expect(profileCard.signOutText).to.equal('Sign Out');
      expect(profileCard.profileText).to.equal('Profile');
    });

    it('should set profile card builder', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

      const profileCardContent = document.createElement('div');
      profileCardContent.id = 'profile-card-content';
      profileCardContent.innerText = 'Custom profile card content';

      const profileCardBuilder = () => profileCardContent;
      el.profileCardBuilder = profileCardBuilder;

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as HTMLElement;

      expect(el.profileCardBuilder).to.equal(profileCardBuilder);
      expect(profileCard.querySelector('div#profile-card-content')).to.be.ok;
    });

    it('should show default sign out text', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const signOutButton = profileCard.shadowRoot?.querySelector('forge-button#sign-out-button') as HTMLButtonElement;

      expect(profileCard.signOutText).to.equal('Sign out');
      expect(signOutButton.innerText).to.equal('Sign out');
    });

    it('should show default profile text', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button profile-button></forge-app-bar-profile-button>`);

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const profileButton = profileCard.shadowRoot?.querySelector('forge-button#profile-button') as HTMLButtonElement;

      expect(profileCard.profileText).to.equal('Profile');
      expect(profileButton.innerText).to.equal('Profile');
    });

    it('should set sign out text', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button sign-out-button-text="Custom Sign Out"></forge-app-bar-profile-button>`);

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const signOutButton = profileCard.shadowRoot?.querySelector('forge-button#sign-out-button') as HTMLButtonElement;

      expect(profileCard.signOutText).to.equal('Custom Sign Out');
      expect(signOutButton.innerText).to.equal('Custom Sign Out');
    });

    it('should set profile text', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button profile-button profile-button-text="Custom Profile"></forge-app-bar-profile-button>`);

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const profileButton = profileCard.shadowRoot?.querySelector('forge-button#profile-button') as HTMLButtonElement;

      expect(profileCard.profileText).to.equal('Custom Profile');
      expect(profileButton.innerText).to.equal('Custom Profile');
    });

    it('should set sign out text dynamically', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const signOutButton = profileCard.shadowRoot?.querySelector('forge-button#sign-out-button') as HTMLButtonElement;

      expect(profileCard.signOutText).to.equal('Sign out');
      expect(signOutButton.innerText).to.equal('Sign out');

      el.signOutButtonText = 'Custom Sign Out';

      expect(profileCard.signOutText).to.equal('Custom Sign Out');
      expect(signOutButton.innerText).to.equal('Custom Sign Out');
    });

    it('should set profile text dynamically', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button profile-button></forge-app-bar-profile-button>`);

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const profileButton = profileCard.shadowRoot?.querySelector('forge-button#profile-button') as HTMLButtonElement;

      expect(profileCard.profileText).to.equal('Profile');
      expect(profileButton.innerText).to.equal('Profile');

      el.profileButtonText = 'Custom Profile';

      expect(profileCard.profileText).to.equal('Custom Profile');
      expect(profileButton.innerText).to.equal('Custom Profile');
    });

    it('should set focus to sign out button when opened', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);

      const popup = await openPopup(el);
      
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const signOutButton = profileCard.shadowRoot?.querySelector('forge-button#sign-out-button') as HTMLButtonElement;

      expect(profileCard.shadowRoot?.activeElement).to.equal(signOutButton);
    });

    it('should set focus to profile button when opened if not showing sign out button', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button sign-out-button="false" profile-button></forge-app-bar-profile-button>`);

      const popup = await openPopup(el);
      
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const profileButton = profileCard.shadowRoot?.querySelector('forge-button#profile-button') as HTMLButtonElement;

      expect(profileCard.shadowRoot?.activeElement).to.equal(profileButton);
    });

    it('should keep focus on trigger button if not showing sign out or profile buttons', async () => {
      const el = await fixture<IAppBarProfileButtonComponent>(html`<forge-app-bar-profile-button sign-out-button="false" profile-button="false"></forge-app-bar-profile-button>`);

      await openPopup(el);
      const iconButton = el.querySelector('forge-icon-button') as IIconButtonComponent;

      expect(document.activeElement).to.equal(iconButton);
    });

    async function openPopup(el: IAppBarProfileButtonComponent): Promise<IPopoverComponent> {
      const iconButton = el.querySelector('forge-icon-button') as IIconButtonComponent;
      iconButton.focus();
      await clickElement(iconButton);
      await timer(POPOVER_ANIMATION_DURATION);
      await elementUpdated(el);
      return el['_foundation']['_adapter']['_popupElement'];
    }
  });

  function clickElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height } = el.getBoundingClientRect();
    return sendMouse({ type: 'click', position: [
      Math.floor(x + window.scrollX + width / 2),
      Math.floor(y + window.scrollY + height / 2),
    ]});
  }

  function clickOutsidePopupElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height } = el.getBoundingClientRect();
    return sendMouse({ type: 'click', position: [
      Math.floor(x + window.scrollX + width + 10),
      Math.floor(y + window.scrollY + height + 10),
    ]});
  }
});

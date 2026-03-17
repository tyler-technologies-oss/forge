import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { task, frame } from '../../core/utils/utils.js';
import type { IAppBarProfileButtonComponent } from './app-bar-profile-button.js';
import { APP_BAR_PROFILE_BUTTON_CONSTANTS } from './app-bar-profile-button-constants.js';
import type { IIconButtonComponent } from '../../icon-button/index.js';
import type { IProfileCardComponent } from '../../profile-card/index.js';
import { PROFILE_CARD_CONSTANTS } from '../../profile-card/index.js';
import type { IPopoverComponent } from '../../popover/index.js';

import './app-bar-profile-button.js';

// Popover animation duration (200ms) + buffer for animation completion
const POPOVER_ANIMATION_DURATION = 200;

describe('App Bar Profile Button', () => {
  const fullName = 'Tyler Forge';
  const email = 'tyler.forge@tylertech.com';
  const avatarImageUrl = 'javascript: void(0)';
  const avatarLetterCount = 1;
  const avatarText = 'TF';
  const avatarIcon = 'person';

  it('should be accessible', async () => {
    const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    await expect(el).toBeAccessible();
  });

  it('should forward aria-label', async () => {
    const screen = render(html`<forge-app-bar-profile-button aria-label="foo"></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).toBe('foo');
  });

  it('should remove internal aria-label if aria-label is removed', async () => {
    const screen = render(html`<forge-app-bar-profile-button aria-label="foo"></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).toBe('foo');

    el.removeAttribute('aria-label');
    await frame();

    expect(iconButtonEl.getAttribute('aria-label')).toBeNull();
  });

  it('should reset internal aria-labelledby to tooltip id if external aria-labelledby is removed', async () => {
    const screen = render(html`<forge-app-bar-profile-button aria-labelledby="foo"></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;
    const tooltipEl = el.querySelector('forge-tooltip') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-labelledby')).toBe('foo');

    el.removeAttribute('aria-labelledby');
    await frame();

    expect(iconButtonEl.getAttribute('aria-labelledby')).toBe(tooltipEl.id);
  });

  it('should set full name', async () => {
    const screen = render(html`<forge-app-bar-profile-button full-name="${fullName}"></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    expect(el.fullName).toBe(fullName);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.FULL_NAME)).toBe(fullName);
  });

  it('should set full name dynamically', async () => {
    const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    el.fullName = fullName;

    expect(el.fullName).toBe(fullName);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.FULL_NAME)).toBe(fullName);
  });

  it('should set email', async () => {
    const screen = render(html`<forge-app-bar-profile-button email="${email}"></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    expect(el.email).toBe(email);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.EMAIL)).toBe(email);
  });

  it('should set email dynamically', async () => {
    const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    el.email = email;

    expect(el.email).toBe(email);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.EMAIL)).toBe(email);
  });

  it('should set avatar image url', async () => {
    const screen = render(html`<forge-app-bar-profile-button avatar-image-url="${avatarImageUrl}"></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    expect(el.avatarImageUrl).toBe(avatarImageUrl);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_IMAGE_URL)).toBe(avatarImageUrl);
  });

  it('should set avatar image url dynamically', async () => {
    const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    el.avatarImageUrl = avatarImageUrl;

    expect(el.avatarImageUrl).toBe(avatarImageUrl);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_IMAGE_URL)).toBe(avatarImageUrl);
  });

  it('should set avatar letter count', async () => {
    const screen = render(html`<forge-app-bar-profile-button avatar-letter-count="${avatarLetterCount}"></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    expect(el.avatarLetterCount).toBe(avatarLetterCount);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_LETTER_COUNT)).toBe(String(avatarLetterCount));
  });

  it('should set avatar letter count dynamically', async () => {
    const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    el.avatarLetterCount = avatarLetterCount;

    expect(el.avatarLetterCount).toBe(avatarLetterCount);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_LETTER_COUNT)).toBe(String(avatarLetterCount));
  });

  it('should set avatar text', async () => {
    const screen = render(html`<forge-app-bar-profile-button avatar-text="${avatarText}"></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    expect(el.avatarText).toBe(avatarText);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_TEXT)).toBe(avatarText);
  });

  it('should set avatar text dynamically', async () => {
    const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    el.avatarText = avatarText;

    expect(el.avatarText).toBe(avatarText);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_TEXT)).toBe(avatarText);
  });

  it('should set avatar icon', async () => {
    const screen = render(html`<forge-app-bar-profile-button avatar-icon="${avatarIcon}"></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    expect(el.avatarIcon).toBe(avatarIcon);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_ICON)).toBe(avatarIcon);
  });

  it('should set avatar icon dynamically', async () => {
    const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    el.avatarIcon = avatarIcon;

    expect(el.avatarIcon).toBe(avatarIcon);
    expect(el.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_ICON)).toBe(avatarIcon);
  });

  it('should set sign out button', async () => {
    const screen = render(html`<forge-app-bar-profile-button sign-out-button></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    expect(el.signOutButton).toBe(true);
    expect(el.hasAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON)).toBe(true);
  });

  it('should set sign out button dynamically', async () => {
    const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    el.signOutButton = false;

    expect(el.signOutButton).toBe(false);
    expect(el.hasAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON)).toBe(false);

    el.signOutButton = true;

    expect(el.signOutButton).toBe(true);
    expect(el.hasAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON)).toBe(true);
  });

  it('should set profile button', async () => {
    const screen = render(html`<forge-app-bar-profile-button profile-button></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    expect(el.profileButton).toBe(true);
    expect(el.hasAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.PROFILE_BUTTON)).toBe(true);
  });

  it('should set profile button dynamically', async () => {
    const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
    const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

    el.profileButton = true;

    expect(el.profileButton).toBe(true);
    expect(el.hasAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.PROFILE_BUTTON)).toBe(true);
  });

  describe('Profile Card Popup', () => {
    it('should show profile card popup when clicked', async () => {
      const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      const popup = await openPopup(el);

      expect(el.open).toBe(true);
      expect(popup).toBeTruthy();
      expect(el.popupElement).toBeTruthy();
    });

    it('should close profile card when escape key is pressed', async () => {
      const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      const popup = await openPopup(el);

      expect(popup).toBeTruthy();
      expect(popup.isConnected).toBe(true);

      await userEvent.keyboard('{Escape}');
      await task(POPOVER_ANIMATION_DURATION);

      expect(el.open).toBe(false);
      expect(popup.isConnected).toBe(false);
      expect(el.popupElement).toBeFalsy();
    });

    it('should close profile card when clicked outside', async () => {
      const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      const popup = await openPopup(el);

      expect(popup).toBeTruthy();
      expect(popup.isConnected).toBe(true);

      await userEvent.click(document.body);
      await task(POPOVER_ANIMATION_DURATION);

      expect(el.open).toBe(false);
      expect(popup.isConnected).toBe(false);
      expect(el.popupElement).toBeFalsy();
    });

    it('should close dropdown when button is clicked', async () => {
      const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      const popup = await openPopup(el);

      expect(popup).toBeTruthy();
      expect(popup.isConnected).toBe(true);

      const iconButton = el.querySelector('forge-icon-button') as IIconButtonComponent;
      await userEvent.click(iconButton);
      await task(POPOVER_ANIMATION_DURATION);

      expect(el.open).toBe(false);
      expect(popup.isConnected).toBe(false);
      expect(el.popupElement).toBeFalsy();
    });

    it('should open via property', async () => {
      const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      el.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      expect(el.open).toBe(true);
      expect(el.popupElement).toBeTruthy();
    });

    it('should close via property', async () => {
      const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      el.open = true;
      await task(POPOVER_ANIMATION_DURATION);

      expect(el.open).toBe(true);
      expect(el.popupElement).toBeTruthy();

      el.open = false;
      await task(POPOVER_ANIMATION_DURATION);

      expect(el.open).toBe(false);
      expect(el.popupElement).toBeFalsy();
    });

    it('should dispatch event when sign out button is clicked', async () => {
      const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;
      const signOutSpy = vi.fn();
      el.addEventListener(PROFILE_CARD_CONSTANTS.events.SIGN_OUT, signOutSpy);

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as HTMLElement;

      const signOutButton = profileCard.shadowRoot?.querySelector('forge-button#sign-out-button') as HTMLElement;
      signOutButton.click();

      await task(POPOVER_ANIMATION_DURATION);

      expect(signOutSpy).toHaveBeenCalledOnce();
    });

    it('should dispatch event when profile button is clicked', async () => {
      const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;
      const profileSpy = vi.fn();
      el.addEventListener(PROFILE_CARD_CONSTANTS.events.PROFILE, profileSpy);

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as HTMLElement;

      const profileButton = profileCard.shadowRoot?.querySelector('forge-button#profile-button') as HTMLElement;
      profileButton.click();

      await task(POPOVER_ANIMATION_DURATION);

      expect(profileSpy).toHaveBeenCalledOnce();
    });

    it('should proxy properties to profile card', async () => {
      const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

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

      expect(profileCard.fullName).toBe(fullName);
      expect(profileCard.email).toBe(email);
      expect(profileCard.avatarImageUrl).toBe(avatarImageUrl);
      expect(profileCard.avatarLetterCount).toBe(avatarLetterCount);
      expect(profileCard.avatarText).toBe(avatarText);
      expect(profileCard.avatarIcon).toBe(avatarIcon);
      expect(profileCard.signOut).toBe(true);
      expect(profileCard.profile).toBe(true);
      expect(profileCard.signOutText).toBe('Sign Out');
      expect(profileCard.profileText).toBe('Profile');
    });

    it('should set profile card builder', async () => {
      const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      const profileCardContent = document.createElement('div');
      profileCardContent.id = 'profile-card-content';
      profileCardContent.innerText = 'Custom profile card content';

      const profileCardBuilder = (): HTMLElement => profileCardContent;
      el.profileCardBuilder = profileCardBuilder;

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as HTMLElement;

      expect(el.profileCardBuilder).toBe(profileCardBuilder);
      expect(profileCard.querySelector('div#profile-card-content')).toBeTruthy();
    });

    it('should show default sign out text', async () => {
      const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const signOutButton = profileCard.shadowRoot?.querySelector('forge-button#sign-out-button') as HTMLButtonElement;

      expect(profileCard.signOutText).toBe('Sign out');
      expect(signOutButton.innerText).toBe('Sign out');
    });

    it('should show default profile text', async () => {
      const screen = render(html`<forge-app-bar-profile-button profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const profileButton = profileCard.shadowRoot?.querySelector('forge-button#profile-button') as HTMLButtonElement;

      expect(profileCard.profileText).toBe('Profile');
      expect(profileButton.innerText).toBe('Profile');
    });

    it('should set sign out text', async () => {
      const screen = render(html`<forge-app-bar-profile-button sign-out-button-text="Custom Sign Out"></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const signOutButton = profileCard.shadowRoot?.querySelector('forge-button#sign-out-button') as HTMLButtonElement;

      expect(profileCard.signOutText).toBe('Custom Sign Out');
      expect(signOutButton.innerText).toBe('Custom Sign Out');
    });

    it('should set profile text', async () => {
      const screen = render(html`<forge-app-bar-profile-button profile-button profile-button-text="Custom Profile"></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const profileButton = profileCard.shadowRoot?.querySelector('forge-button#profile-button') as HTMLButtonElement;

      expect(profileCard.profileText).toBe('Custom Profile');
      expect(profileButton.innerText).toBe('Custom Profile');
    });

    it('should set sign out text dynamically', async () => {
      const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const signOutButton = profileCard.shadowRoot?.querySelector('forge-button#sign-out-button') as HTMLButtonElement;

      expect(profileCard.signOutText).toBe('Sign out');
      expect(signOutButton.innerText).toBe('Sign out');

      el.signOutButtonText = 'Custom Sign Out';

      expect(profileCard.signOutText).toBe('Custom Sign Out');
      expect(signOutButton.innerText).toBe('Custom Sign Out');
    });

    it('should set profile text dynamically', async () => {
      const screen = render(html`<forge-app-bar-profile-button profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      const popup = await openPopup(el);
      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const profileButton = profileCard.shadowRoot?.querySelector('forge-button#profile-button') as HTMLButtonElement;

      expect(profileCard.profileText).toBe('Profile');
      expect(profileButton.innerText).toBe('Profile');

      el.profileButtonText = 'Custom Profile';

      expect(profileCard.profileText).toBe('Custom Profile');
      expect(profileButton.innerText).toBe('Custom Profile');
    });

    it('should set focus to sign out button when opened', async () => {
      const screen = render(html`<forge-app-bar-profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      const popup = await openPopup(el);

      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const signOutButton = profileCard.shadowRoot?.querySelector('forge-button#sign-out-button') as HTMLButtonElement;

      expect(profileCard.shadowRoot?.activeElement).toBe(signOutButton);
    });

    it('should set focus to profile button when opened if not showing sign out button', async () => {
      const screen = render(html`<forge-app-bar-profile-button sign-out-button="false" profile-button></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      const popup = await openPopup(el);

      const profileCard = popup.querySelector('forge-profile-card') as IProfileCardComponent;
      const profileButton = profileCard.shadowRoot?.querySelector('forge-button#profile-button') as HTMLButtonElement;

      expect(profileCard.shadowRoot?.activeElement).toBe(profileButton);
    });

    it('should keep focus on trigger button if not showing sign out or profile buttons', async () => {
      const screen = render(html`<forge-app-bar-profile-button sign-out-button="false" profile-button="false"></forge-app-bar-profile-button>`);
      const el = screen.container.querySelector('forge-app-bar-profile-button') as IAppBarProfileButtonComponent;

      await openPopup(el);
      const iconButton = el.querySelector('forge-icon-button') as IIconButtonComponent;

      expect(document.activeElement).toBe(iconButton);
    });

    async function openPopup(el: IAppBarProfileButtonComponent): Promise<IPopoverComponent> {
      const iconButton = el.querySelector('forge-icon-button') as IIconButtonComponent;
      iconButton.focus();
      await userEvent.click(iconButton);
      await task(POPOVER_ANIMATION_DURATION);
      type ComponentWithCore = IAppBarProfileButtonComponent & { _core: { _adapter: { _popupElement: IPopoverComponent } } };
      return (el as ComponentWithCore)._core._adapter._popupElement;
    }
  });
});

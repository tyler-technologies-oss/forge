import { afterEach, describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import { task } from '../core/utils/utils.js';
import type { IAvatarComponent } from '../avatar/index.js';
import type { IButtonComponent } from '../button/index.js';
import type { IPopoverComponent } from '../popover/index.js';
import type { IThemeToggleComponent } from '../theme-toggle/index.js';
import type { IUserProfileComponent } from './user-profile.js';

import './user-profile.js';
import './profile-link/index.js';

// Enter/exit animation duration + buffer for the underlying forge-popover transition
const ANIMATION_TIMEOUT = 300;

describe('User Profile', () => {
  afterEach(() => {
    localStorage.removeItem('.forge-theme');
    document.documentElement.removeAttribute('data-forge-theme');
  });

  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.element.shadowRoot).not.toBeNull();
  });

  it('should use default sign out text when no sign out text is slotted', async () => {
    const harness = await createFixture();

    expect(harness.signOutButton.textContent?.trim()).toBe('Sign Out');
  });

  it('content should project into the sign out button slot', async () => {
    const harness = await createFixture({ signOutButtonText: 'Custom Sign Out' });
    const assignedNodes = harness.signOutButtonSlot.assignedNodes();

    expect(assignedNodes.length).toBeGreaterThanOrEqual(1);
    expect(assignedNodes[0].textContent?.trim()).toBe('Custom Sign Out');
  });

  it('content should project into the link slot', async () => {
    const harness = await createFixture({ profileLinkTitle: 'Profile Link', profileLinkIcon: 'settings' });
    const linkSlot = getShadowElement(harness.element, 'slot[name="link"]') as HTMLSlotElement;

    expect(linkSlot.assignedNodes().length).toBeGreaterThanOrEqual(1);
  });

  it('content in the full name div should be the same as the full-name attribute', async () => {
    const harness = await createFixture({ fullName: 'Harley Andrews' });

    expect(harness.fullNameEl.textContent).toBe('Harley Andrews');
  });

  it('content in the email div should be the same as the email attribute', async () => {
    const harness = await createFixture({ email: 'harley.andrews@doggos.com' });

    expect(harness.emailEl.textContent).toBe('harley.andrews@doggos.com');
  });

  it('theme toggle should be present when the attribute is present', async () => {
    const harness = await createFixture({ themeToggle: true });

    expect(harness.themeToggleContainerEl).toBeTruthy();
  });

  it('theme toggle should be removed when the attribute is not present', async () => {
    const harness = await createFixture();

    expect(harness.themeToggleContainerEl).toBeFalsy();
  });

  it('should dispatch the forge-user-profile-sign-out event when the sign out button is clicked', async () => {
    const harness = await createFixture({ signOutButtonText: 'Sign out' });
    const spy = vi.fn();

    await userEvent.click(harness.avatarButton);
    harness.element.addEventListener('forge-user-profile-sign-out', spy);

    await userEvent.click(harness.signOutButton);

    expect(spy).toHaveBeenCalled();
  });

  it('should set imageUrl on both avatar components when image-url attribute is provided', async () => {
    const testImageUrl = 'https://example.com/avatar.jpg';
    const harness = await createFixture({ imageUrl: testImageUrl });

    expect(harness.buttonAvatar.imageUrl).toBe(testImageUrl);
    expect(harness.popoverAvatar.imageUrl).toBe(testImageUrl);
  });

  it('should control popover state via open property', async () => {
    const harness = await createFixture();

    harness.element.open = true;
    await harness.element.updateComplete;
    await task(ANIMATION_TIMEOUT);

    expect(harness.element.open).toBe(true);
    expect(harness.popover?.open).toBe(true);

    harness.element.open = false;
    await harness.element.updateComplete;
    await task(ANIMATION_TIMEOUT);

    expect(harness.element.open).toBe(false);
    expect(harness.popover?.open).toBe(false);
  });

  it('should support initial open state via fixture config', async () => {
    const harness = await createFixture({ open: true });
    await task(ANIMATION_TIMEOUT);

    expect(harness.element.open).toBe(true);
    expect(harness.popover?.open).toBe(true);
  });

  it('should handle forge-popover-toggle event for synchronization', async () => {
    const harness = await createFixture();

    harness.popover?.dispatchEvent(new CustomEvent('forge-popover-toggle', { detail: { newState: 'open' }, bubbles: true }));
    await harness.element.updateComplete;

    expect(harness.element.open).toBe(true);

    harness.popover?.dispatchEvent(new CustomEvent('forge-popover-toggle', { detail: { newState: 'closed' }, bubbles: true }));
    await harness.element.updateComplete;

    expect(harness.element.open).toBe(false);
  });

  it('should synchronize when popover is opened via click', async () => {
    const harness = await createFixture();

    await userEvent.click(harness.avatarButton);
    await task(ANIMATION_TIMEOUT);

    expect(harness.popover?.open).toBe(true);
    expect(harness.element.open).toBe(true);
  });

  it('should synchronize when popover is closed via light dismiss', async () => {
    const harness = await createFixture();

    harness.element.open = true;
    await harness.element.updateComplete;
    await task(ANIMATION_TIMEOUT);

    expect(harness.element.open).toBe(true);
    expect(harness.popover?.open).toBe(true);

    harness.popover?.dispatchEvent(new CustomEvent('forge-popover-toggle', { detail: { newState: 'closed' }, bubbles: true }));
    await harness.element.updateComplete;

    expect(harness.element.open).toBe(false);
  });

  it('should handle rapid open/close operations', async () => {
    const harness = await createFixture();

    harness.element.open = true;
    harness.element.open = false;
    harness.element.open = true;

    await harness.element.updateComplete;
    await task(ANIMATION_TIMEOUT);

    expect(harness.element.open).toBe(true);
    expect(harness.popover?.open).toBe(true);
  });

  it('should have setTheme method that sets theme toggle theme', async () => {
    const harness = await createFixture({ themeToggle: true });

    expect(typeof harness.element.setTheme).toBe('function');
    expect(harness.themeToggleContainerEl).toBeTruthy();

    expect(() => harness.element.setTheme('light')).not.toThrow();
    expect(() => harness.element.setTheme('dark')).not.toThrow();
    expect(() => harness.element.setTheme('system')).not.toThrow();

    const setThemeSpy = vi.spyOn(harness.themeToggle!, 'setTheme');
    harness.element.setTheme('light');

    expect(setThemeSpy).toHaveBeenCalledWith('light');
  });

  it('should still apply the theme when the theme toggle is not rendered', async () => {
    const harness = await createFixture({ themeToggle: false });

    expect(harness.themeToggleContainerEl).toBeFalsy();

    expect(() => harness.element.setTheme('light')).not.toThrow();
    expect(harness.htmlElement.getAttribute('data-forge-theme')).toBe('light');

    expect(() => harness.element.setTheme('dark')).not.toThrow();
    expect(harness.htmlElement.getAttribute('data-forge-theme')).toBe('dark');
  });

  it('should pass the default aria label through to the theme toggle and render default labels when nothing is slotted', async () => {
    const harness = await createFixture({ themeToggle: true });

    expect(harness.themeToggle?.groupAriaLabel).toBe('Select a theme');
    expect(harness.themeToggleTitleSlot?.assignedNodes({ flatten: true })[0]?.textContent?.trim()).toBe('Theme');
    expect(harness.themeToggleLightLabelSlot?.assignedNodes({ flatten: true })[0]?.textContent?.trim()).toBe('Light');
    expect(harness.themeToggleDarkLabelSlot?.assignedNodes({ flatten: true })[0]?.textContent?.trim()).toBe('Dark');
    expect(harness.themeToggleSystemLabelSlot?.assignedNodes({ flatten: true })[0]?.textContent?.trim()).toBe('System');
  });

  it('should pass a custom aria label through to the theme toggle and project custom label content', async () => {
    const harness = await createFixture({
      themeToggle: true,
      themeToggleAriaLabel: 'Choose a theme',
      themeToggleTitle: 'Appearance',
      themeToggleLightLabel: 'Bright',
      themeToggleDarkLabel: 'Night',
      themeToggleSystemLabel: 'Auto'
    });

    expect(harness.themeToggle?.groupAriaLabel).toBe('Choose a theme');
    expect(harness.themeToggleTitleSlot?.assignedNodes({ flatten: true })[0]?.textContent?.trim()).toBe('Appearance');
    expect(harness.themeToggleLightLabelSlot?.assignedNodes({ flatten: true })[0]?.textContent?.trim()).toBe('Bright');
    expect(harness.themeToggleDarkLabelSlot?.assignedNodes({ flatten: true })[0]?.textContent?.trim()).toBe('Night');
    expect(harness.themeToggleSystemLabelSlot?.assignedNodes({ flatten: true })[0]?.textContent?.trim()).toBe('Auto');
  });

  it('should show sign in button when fullName is not provided (user not logged in)', async () => {
    const harness = await createFixture({ fullName: '' });

    expect(harness.signInButton).toBeTruthy();
    expect(harness.signInButton.textContent?.trim()).toBe('Sign in');
  });

  it('should not show popover when user is not logged in', async () => {
    const harness = await createFixture({ fullName: '' });

    expect(harness.popover).toBeFalsy();
  });

  it('should dispatch forge-user-profile-sign-in event when sign in button is clicked', async () => {
    const harness = await createFixture({ fullName: '' });
    const spy = vi.fn();

    harness.element.addEventListener('forge-user-profile-sign-in', spy);

    await userEvent.click(harness.signInButton);

    expect(spy).toHaveBeenCalled();
  });
});

class UserProfileHarness extends TestHarness<IUserProfileComponent> {
  public initElementRefs(): void {
    // Elements are queried lazily via getters below since they change based on component state.
  }

  public get avatarButton(): HTMLElement {
    return getShadowElement(this.element, '#popover-trigger');
  }

  public get buttonAvatar(): IAvatarComponent {
    return getShadowElement(this.element, '#button-avatar') as IAvatarComponent;
  }

  public get popoverAvatar(): IAvatarComponent {
    return getShadowElement(this.element, '#popover-avatar') as IAvatarComponent;
  }

  public get popover(): IPopoverComponent | null {
    return getShadowElement(this.element, '#user-profile-popover') as IPopoverComponent | null;
  }

  public get fullNameEl(): HTMLElement {
    return getShadowElement(this.element, '.full-name');
  }

  public get emailEl(): HTMLElement {
    return getShadowElement(this.element, '.email');
  }

  public get htmlElement(): HTMLElement {
    return document.documentElement;
  }

  public get themeToggleContainerEl(): HTMLElement | null {
    return getShadowElement(this.element, '.theme-toggle-container') as HTMLElement | null;
  }

  public get themeToggleTitleSlot(): HTMLSlotElement | undefined {
    return this.themeToggle?.shadowRoot?.querySelector('slot[name="title"]') as HTMLSlotElement | undefined;
  }

  public get themeToggleLightLabelSlot(): HTMLSlotElement | undefined {
    return this.themeToggle?.shadowRoot?.querySelector('slot[name="light-label"]') as HTMLSlotElement | undefined;
  }

  public get themeToggleDarkLabelSlot(): HTMLSlotElement | undefined {
    return this.themeToggle?.shadowRoot?.querySelector('slot[name="dark-label"]') as HTMLSlotElement | undefined;
  }

  public get themeToggleSystemLabelSlot(): HTMLSlotElement | undefined {
    return this.themeToggle?.shadowRoot?.querySelector('slot[name="system-label"]') as HTMLSlotElement | undefined;
  }

  public get signOutButtonSlot(): HTMLSlotElement {
    return getShadowElement(this.element, 'slot[name="sign-out-button-text"]') as HTMLSlotElement;
  }

  public get signOutButton(): IButtonComponent {
    return getShadowElement(this.element, '#sign-out-button') as IButtonComponent;
  }

  public get themeToggle(): IThemeToggleComponent | null {
    return getShadowElement(this.element, 'forge-theme-toggle') as IThemeToggleComponent | null;
  }

  public get signInButton(): IButtonComponent {
    return getShadowElement(this.element, '.sign-in-button') as IButtonComponent;
  }
}

interface UserProfileFixtureConfig {
  themeToggle?: boolean;
  fullName?: string;
  email?: string;
  imageUrl?: string;
  profileLinkTitle?: string;
  profileLinkIcon?: string;
  signOutButtonText?: string;
  open?: boolean;
  themeToggleAriaLabel?: string;
  themeToggleTitle?: string;
  themeToggleLightLabel?: string;
  themeToggleDarkLabel?: string;
  themeToggleSystemLabel?: string;
}

async function createFixture({
  themeToggle = false,
  fullName = 'Harley Andrews',
  email = 'harley.andrews@doggos.com',
  imageUrl = '',
  profileLinkTitle = 'Profile Link',
  profileLinkIcon = 'settings',
  signOutButtonText,
  open = false,
  themeToggleAriaLabel,
  themeToggleTitle,
  themeToggleLightLabel,
  themeToggleDarkLabel,
  themeToggleSystemLabel
}: UserProfileFixtureConfig = {}): Promise<UserProfileHarness> {
  const screen = render(html`
    <forge-user-profile
      .themeToggle=${themeToggle}
      .fullName=${fullName}
      .email=${email}
      .imageUrl=${imageUrl}
      .open=${open}
      theme-toggle-aria-label=${ifDefined(themeToggleAriaLabel)}>
      ${profileLinkTitle
        ? html`<forge-profile-link slot="link">
            <forge-icon slot="icon" name=${profileLinkIcon} external></forge-icon>
            <a href="http://www.google.com" target="_blank">${profileLinkTitle}</a>
          </forge-profile-link>`
        : ''}
      ${signOutButtonText ? html`<span slot="sign-out-button-text">${signOutButtonText}</span>` : null}
      ${themeToggleTitle ? html`<span slot="theme-toggle-title">${themeToggleTitle}</span>` : null}
      ${themeToggleLightLabel ? html`<span slot="theme-toggle-light-label">${themeToggleLightLabel}</span>` : null}
      ${themeToggleDarkLabel ? html`<span slot="theme-toggle-dark-label">${themeToggleDarkLabel}</span>` : null}
      ${themeToggleSystemLabel ? html`<span slot="theme-toggle-system-label">${themeToggleSystemLabel}</span>` : null}
    </forge-user-profile>
  `);
  const el = screen.container.querySelector('forge-user-profile') as IUserProfileComponent;
  await el.updateComplete;

  return new UserProfileHarness(el);
}

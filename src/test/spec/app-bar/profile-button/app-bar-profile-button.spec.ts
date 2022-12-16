import { getShadowElement, removeElement } from '@tylertech/forge-core';
import { tick, timer } from '@tylertech/forge-testing';
import { defineAppBarProfileButtonComponent, IAppBarProfileButtonComponent, AppBarProfileButtonComponent, APP_BAR_PROFILE_BUTTON_CONSTANTS } from '@tylertech/forge/app-bar/profile-button';
import { ProfileCardComponent, PROFILE_CARD_CONSTANTS } from '@tylertech/forge/profile-card';
import { PopupComponent, POPUP_CONSTANTS } from '@tylertech/forge/popup';

const fullName = 'Jane Doe';
const email = 'jane.doe@gmail.com';
const avatarImageUrl = 'https://cdn.forge.tylertech.com/v1/images/spot/artistry-spot.svg';
const avatarLetterCount = 1;
const avatarText = 'OP';

interface ITestContext {
  context: ITestAppBarProfileButtonContext;
}

interface ITestAppBarProfileButtonContext {
  component: IAppBarProfileButtonComponent;
  destroy(): void;
}

describe('AppBarProfileButtonComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    const popups = Array.from(document.querySelectorAll(POPUP_CONSTANTS.elementName));
    popups.forEach(p => removeElement(p as HTMLElement));
    defineAppBarProfileButtonComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
    const popups = Array.from(document.querySelectorAll(POPUP_CONSTANTS.elementName));
    popups.forEach(p => removeElement(p as HTMLElement));
  });

  it('should be instantiated', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.isConnected).toBe(true, 'Component should be connected');
    expect(this.context.component instanceof AppBarProfileButtonComponent).toBe(true, 'Component should be instance of ProfileButtonComponent');
  });

  it('should set full name via property', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.fullName = fullName;
    expect(this.context.component.fullName).toBe(fullName, `fullName property should be ${fullName}`);
    expect(this.context.component
      .getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.FULL_NAME))
      .toBe(fullName, `fullName attribute should be ${fullName}`);
  });

  it('should set full name via attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.FULL_NAME, fullName);
    expect(this.context.component.fullName).toBe(fullName, `fullName property should be ${fullName}`);
    expect(this.context.component
      .getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.FULL_NAME))
      .toBe(fullName, `fullName attribute should be ${fullName}`);
  });

  it('should set email via property', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.email = email;
    expect(this.context.component.email).toBe(email, `email property should be ${email}`);
    expect(this.context.component
      .getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.EMAIL))
      .toBe(email, `email attribute should be ${email}`);
  });

  it('should set email via attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.EMAIL, email);
    expect(this.context.component.email).toBe(email, `email property should be ${email}`);
    expect(this.context.component
      .getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.EMAIL))
      .toBe(email, `email attribute should be ${email}`);
  });

  it('should set avatar image url via property', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.avatarImageUrl = avatarImageUrl;
    expect(this.context.component.avatarImageUrl).toBe(avatarImageUrl, `avatarImageUrl property should be ${avatarImageUrl}`);
    expect(this.context.component
      .getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_IMAGE_URL))
      .toBe(avatarImageUrl, `avatarImageUrl attribute should be ${avatarImageUrl}`);
  });

  it('should set avatar image url via attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_IMAGE_URL, avatarImageUrl);
    expect(this.context.component.avatarImageUrl).toBe(avatarImageUrl, `avatarImageUrl property should be ${avatarImageUrl}`);
    expect(this.context.component
      .getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_IMAGE_URL))
      .toBe(avatarImageUrl, `avatarImageUrl attribute should be ${avatarImageUrl}`);
  });

  it('should set avatar letter count via property', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.avatarLetterCount = avatarLetterCount;
    expect(this.context.component.avatarLetterCount).toBe(avatarLetterCount, `avatarLetterCount property should be ${avatarLetterCount}`);
    expect(this.context.component
      .getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_LETTER_COUNT))
      .toBe(avatarLetterCount.toString(), `avatarLetterCount attribute should be ${avatarLetterCount}`);
  });

  it('should set avatar letter count via attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_LETTER_COUNT, avatarLetterCount.toString());
    expect(this.context.component.avatarLetterCount).toBe(avatarLetterCount, `avatarLetterCount property should be ${avatarLetterCount}`);
    expect(this.context.component
      .getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_LETTER_COUNT))
      .toBe(avatarLetterCount.toString(), `avatarLetterCount attribute should be ${avatarLetterCount}`);
  });

  it('should set avatar text via property', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.avatarText = avatarText;
    expect(this.context.component.avatarText).toBe(avatarText, `avatarText property should be ${avatarText}`);
    expect(this.context.component.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_TEXT)).toBe(avatarText, `avatarText attribute should be ${avatarText}`);
  });

  it('should set avatar text via attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_TEXT, avatarText);
    expect(this.context.component.avatarText).toBe(avatarText, `AvatarText property should be ${avatarText}`);
    expect(this.context.component.getAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.AVATAR_TEXT)).toBe(avatarText, `avatarText attribute should be ${avatarText}`);
  });

  it('should set show sign out button via property', async function(this: ITestContext) {
    this.context = setupTestContext();
    // set to false since it's defaulted to true
    this.context.component.signOutButton = false;
    await timer();
    this.context.component.signOutButton = true;
    expect(this.context.component.signOutButton).toBe(true, 'signOutButton property should be true');
    expect(this.context.component.hasAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON)).toBe(true, 'signOutButton attribute should be present');
  });

  it('should set show sign out button via attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.signOutButton = false;
    this.context.component.setAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON, '');
    expect(this.context.component.signOutButton).toBe(true, 'profileButton property should be true');
    expect(this.context.component.hasAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.SIGN_OUT_BUTTON)).toBe(true, 'profileButton attribute should be present');
  });

  it('should set show profile button via property', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.profileButton = true;
    expect(this.context.component.profileButton).toBe(true, 'profileButton property should be true');
    expect(this.context.component.hasAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.PROFILE_BUTTON)).toBe(true, 'profileButton attribute should be present');
  });

  it('should set show profile button via attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.profileButton = false;
    this.context.component.setAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.PROFILE_BUTTON, '');
    expect(this.context.component.profileButton).toBe(true, 'profileButton property should be true');
    expect(this.context.component.hasAttribute(APP_BAR_PROFILE_BUTTON_CONSTANTS.attributes.PROFILE_BUTTON)).toBe(true, 'profileButton attribute should be present');
  });

  describe('interaction', function(this: ITestContext) {
    it('should not open the profile card unless clicked', async function(this: ITestContext) {
      this.context = setupTestContext();
      const popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      const profileCard = document.querySelector(PROFILE_CARD_CONSTANTS.elementName) as ProfileCardComponent;
      expect(popup).toBeNull();
      expect(profileCard).toBeNull();
    });

    it('should open and close a profile card popup when clicked', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.click();
      await tick();
      let popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      const profileCard = popup.querySelector(PROFILE_CARD_CONSTANTS.elementName) as ProfileCardComponent;
      expect(popup).not.toBeNull();
      expect(profileCard).not.toBeNull();
      this.context.component.click();
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      expect(popup).toBeNull();
    });

    it('should close a profile card popup when escape is pressed', async function(this: ITestContext) {
      this.context = setupTestContext();
      
      this.context.component.click();
      const closeSpy = spyOn<any>(this.context.component['_foundation'], '_closeDropdown');
      await tick();
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit event when profile button is clicked', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.profileButton = true;
      this.context.component.signOutButton = false;
      this.context.component.click();
      await tick();
      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(PROFILE_CARD_CONSTANTS.events.PROFILE, callback);      
      const popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      const profileCard = popup.querySelector(PROFILE_CARD_CONSTANTS.elementName) as ProfileCardComponent;
      const profileButton = getShadowElement(profileCard, PROFILE_CARD_CONSTANTS.selectors.PROFILE_BUTTON) as HTMLButtonElement;
      profileButton.click();      
      await tick();
      expect(callback).toHaveBeenCalled();
    });

    it('should emit event when sign out button is clicked', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.profileButton = false;
      this.context.component.signOutButton = true;
      this.context.component.click();
      await tick();
      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(PROFILE_CARD_CONSTANTS.events.SIGN_OUT, callback);      
      const popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      const profileCard = popup.querySelector(PROFILE_CARD_CONSTANTS.elementName) as ProfileCardComponent;
      const signOutButton = getShadowElement(profileCard, PROFILE_CARD_CONSTANTS.selectors.SIGN_OUT_BUTTON) as HTMLButtonElement;
      signOutButton.click();      
      await tick();
      expect(callback).toHaveBeenCalled();
    });

    it('should set profile card properties appropriately', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.fullName = fullName;
      this.context.component.email = email;
      this.context.component.signOutButton = !this.context.component.signOutButton;
      this.context.component.profileButton = !this.context.component.profileButton;
      this.context.component.click();
      await tick();
      const popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      const profileCard = popup.querySelector(PROFILE_CARD_CONSTANTS.elementName) as ProfileCardComponent;
      expect(profileCard.fullName).toEqual(this.context.component.fullName);
      expect(profileCard.email).toEqual(this.context.component.email);
      expect(profileCard.signOut).toEqual(this.context.component.signOutButton);
      expect(profileCard.profile).toEqual(this.context.component.profileButton);
      popup.open = false;
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
    });

    it('should use the profile card builder correctly', async function(this: ITestContext) {
      this.context = setupTestContext();
      const profileCardContent = document.createElement('div');
      profileCardContent.innerText = 'Hello, World!';
      this.context.component.profileCardBuilder = () => {
        return profileCardContent;
      };
      this.context.component.click();
      await tick();
      const popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      const profileCard = popup.querySelector(PROFILE_CARD_CONSTANTS.elementName) as ProfileCardComponent;
      expect(profileCard.innerHTML).toEqual(profileCardContent.outerHTML);
      popup.open = false;
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
    });

    it('should open via property', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.open = true;
      await tick();

      const popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      const profileCard = popup.querySelector(PROFILE_CARD_CONSTANTS.elementName) as ProfileCardComponent;
      expect(popup).not.toBeNull();
      expect(profileCard).not.toBeNull();
    });

    it('should close via property', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.open = true;
      await tick();
      
      this.context.component.open = false;
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();
      
      const popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      const profileCard = document.querySelector(PROFILE_CARD_CONSTANTS.elementName) as ProfileCardComponent;

      expect(popup).toBeNull();
      expect(profileCard).toBeNull();
    });

    it('should show default sign out text', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.open = true;
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();
      
      const popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      const profileCard = popup.querySelector(PROFILE_CARD_CONSTANTS.elementName) as ProfileCardComponent;
      const signOutButton = getShadowElement(profileCard, PROFILE_CARD_CONSTANTS.selectors.SIGN_OUT_BUTTON) as HTMLButtonElement;

      expect(signOutButton.textContent).toBe(PROFILE_CARD_CONSTANTS.defaults.SIGN_OUT_BUTTON_TEXT);
    });

    it('should show default profile text', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.open = true;
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();
      
      const popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      const profileCard = popup.querySelector(PROFILE_CARD_CONSTANTS.elementName) as ProfileCardComponent;
      const profileButton = getShadowElement(profileCard, PROFILE_CARD_CONSTANTS.selectors.PROFILE_BUTTON) as HTMLButtonElement;

      expect(profileButton.textContent).toBe(PROFILE_CARD_CONSTANTS.defaults.PROFILE_BUTTON_TEXT);
    });

    it('should show custom sign out text', async function(this: ITestContext) {
      this.context = setupTestContext();

      const expectedSignOutText = 'Custom sign out text';
      this.context.component.signOutButtonText = expectedSignOutText;
      
      this.context.component.open = true;
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();
      
      const popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      const profileCard = popup.querySelector(PROFILE_CARD_CONSTANTS.elementName) as ProfileCardComponent;
      const signOutButton = getShadowElement(profileCard, PROFILE_CARD_CONSTANTS.selectors.SIGN_OUT_BUTTON) as HTMLButtonElement;

      expect(signOutButton.textContent).toBe(expectedSignOutText);
    });

    it('should show custom profile text', async function(this: ITestContext) {
      this.context = setupTestContext();

      const expectedProfileText = 'Custom profile text';
      this.context.component.profileButtonText = expectedProfileText;

      this.context.component.open = true;
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();
      
      const popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      const profileCard = popup.querySelector(PROFILE_CARD_CONSTANTS.elementName) as ProfileCardComponent;
      const profileButton = getShadowElement(profileCard, PROFILE_CARD_CONSTANTS.selectors.PROFILE_BUTTON) as HTMLButtonElement;

      expect(profileButton.textContent).toBe(expectedProfileText);
    });

    it('should change custom sign out text while open', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.open = true;
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();

      const popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      const profileCard = popup.querySelector(PROFILE_CARD_CONSTANTS.elementName) as ProfileCardComponent;
      const signOutButton = getShadowElement(profileCard, PROFILE_CARD_CONSTANTS.selectors.SIGN_OUT_BUTTON) as HTMLButtonElement;

      expect(signOutButton.textContent).toBe(PROFILE_CARD_CONSTANTS.defaults.SIGN_OUT_BUTTON_TEXT);

      const expectedSignOutText = 'Custom sign out text';
      this.context.component.signOutButtonText = expectedSignOutText;

      expect(signOutButton.textContent).toBe(expectedSignOutText);
    });

    it('should show custom profile text', async function(this: ITestContext) {
      this.context = setupTestContext();

      this.context.component.open = true;
      await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
      await tick();
      
      const popup = document.querySelector(POPUP_CONSTANTS.elementName) as PopupComponent;
      const profileCard = popup.querySelector(PROFILE_CARD_CONSTANTS.elementName) as ProfileCardComponent;
      const profileButton = getShadowElement(profileCard, PROFILE_CARD_CONSTANTS.selectors.PROFILE_BUTTON) as HTMLButtonElement;

      expect(profileButton.textContent).toBe(PROFILE_CARD_CONSTANTS.defaults.PROFILE_BUTTON_TEXT);

      const expectedProfileText = 'Custom profile text';
      this.context.component.profileButtonText = expectedProfileText;

      expect(profileButton.textContent).toBe(expectedProfileText);
    });
  });

  function setupTestContext(): ITestAppBarProfileButtonContext {
    const fixture = document.createElement('div');
    fixture.id = 'profile-button-test-fixture';
    const component = document.createElement(APP_BAR_PROFILE_BUTTON_CONSTANTS.elementName) as IAppBarProfileButtonComponent;
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }
});

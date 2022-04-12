import { IAvatarComponent, IToolbarComponent } from '@tylertech/forge';
import { getActiveElement, getShadowElement, removeElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';
import { defineProfileCardComponent, IProfileCardComponent, PROFILE_CARD_CONSTANTS } from '@tylertech/forge/profile-card';

interface ITestContext {
  context: ITestProfileCardContext
}

interface ITestProfileCardContext {
  component: IProfileCardComponent;
  getFullNameElement(): HTMLElement;
  getEmailElement(): HTMLElement;
  getAvatarElement(): IAvatarComponent;
  getActionToolbar(): IToolbarComponent;
  getProfileButton(): HTMLButtonElement;
  getSignOutButton(): HTMLButtonElement;
  destroy(): void;
}

describe('ProfileCardComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineProfileCardComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.shadowRoot).not.toBeNull();
  });

  describe('full name', function(this: ITestContext) {
    it('should set the full name element\'s text content to match the text passed to the component', function(this: ITestContext) {
      this.context = setupTestContext();
      const testValue = 'test name';
      this.context.component.fullName = testValue;
      expect(this.context.getFullNameElement().textContent).toBe(testValue);
    });
  });

  describe('email', function(this: ITestContext) {
    it('should set the email element\'s text content to match the text passed to the component', function(this: ITestContext) {
      this.context = setupTestContext();
      const testValue = 'test@email.com';
      this.context.component.email = testValue;
      expect(this.context.getEmailElement().textContent).toBe(testValue);
    });
  });

  describe('signout', function(this: ITestContext) {
    it('should display the signout button by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.getSignOutButton().style.getPropertyValue('display')).toBe('', 'signout button not displayed');
    });

    it('should not display the signout button when component\'s property is false', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.signOut = false;
      expect(this.context.getSignOutButton().style.getPropertyValue('display')).toBe('none', 'signout button displayed');
    });

    it('should display the signout button when component\'s property is set from false to true', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.signOut = false;
      expect(this.context.getSignOutButton().style.getPropertyValue('display')).toBe('none', 'signout button displayed');

      this.context.component.signOut = true;
      expect(this.context.getSignOutButton().style.getPropertyValue('display')).toBe('', 'signout button not displayed');
    });
  });

  describe('profile', function(this: ITestContext) {
    it('should not display the profile button by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.getProfileButton().style.getPropertyValue('display')).toBe('none', 'profile button displayed');
      expect(this.context.component.profile).toBe(false, 'component property not set as expected');
      const attrVal = this.context.component.getAttribute(PROFILE_CARD_CONSTANTS.attributes.PROFILE);
      expect(attrVal).toBeNull('component attribute not set as expected');
    });

    it('should display the profile button when component\'s property is true', function(this: ITestContext) {
      this.context = setupTestContext();
      const testValue = true;
      this.context.component.profile = testValue;
      expect(this.context.getProfileButton().style.getPropertyValue('display')).toBe('', 'profile button displayed');
      expect(this.context.component.profile).toBe(testValue, 'component property not set as expected');
    });

    it('should not display the profile button when component\'s property is set from true to false', async function(this: ITestContext) {
      this.context = setupTestContext();
      const testValue = true;
      this.context.component.profile = testValue;
      await tick();
      expect(this.context.getProfileButton().style.getPropertyValue('display')).toBe('', 'profile button displayed');
      expect(this.context.component.profile).toBe(testValue, 'component property should be true');

      const testValue2 = false;
      this.context.component.profile = testValue2;
      await tick();
      expect(this.context.getProfileButton().style.getPropertyValue('display')).toBe('none', 'profile button displayed');
      expect(this.context.component.profile).toBe(testValue2, 'component property should be false');
    });
  });

  describe('action toolbar', function(this: ITestContext) {
    it('should display the action toolbar by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.getActionToolbar().style.getPropertyValue('display')).toBe('', 'action toolbar displayed');
    });

    it('should not display the action toolbar when component\'s actions are not present', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.profile = false;
      this.context.component.signOut = false;
      expect(this.context.getActionToolbar().style.getPropertyValue('display')).toBe('none', 'action toolbar displayed');
    });

    it('should display the action toolbar when just the component\'s signout action is present', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.profile = false;
      this.context.component.signOut = true;
      expect(this.context.getActionToolbar().style.getPropertyValue('display')).toBe('', 'action toolbar not displayed');
    });

    it('should display the action toolbar when just the component\'s profile action is present', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.profile = true;
      this.context.component.signOut = false;
      expect(this.context.getActionToolbar().style.getPropertyValue('display')).toBe('', 'action toolbar not displayed');
    });

    it('should display the action toolbar when both of the the component\'s profile and signout actions are present', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.profile = true;
      this.context.component.signOut = true;
      expect(this.context.getActionToolbar().style.getPropertyValue('display')).toBe('', 'action toolbar not displayed');
    });
  });

  describe('avatar text', function(this: ITestContext) {
    it('should set the avatar text to match the text passed to the component property', function(this: ITestContext) {
      this.context = setupTestContext();
      const testValue = 'avatar test';
      this.context.component.avatarText = testValue;
      expect(this.context.component.avatarText).toBe(testValue, 'component property not set as expected');
      const attrVal = this.context.component.getAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_TEXT);
      expect(attrVal).toBe(testValue, 'component attribute not set as expected');
      expect(this.context.getAvatarElement().text).toBe(testValue, 'avatar element avatar text property not set as expected');
    });

    it('should set the avatar text to match the text passed to the component attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      const testValue = 'avatar test';
      this.context.component.setAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_TEXT, testValue);
      expect(this.context.component.avatarText).toBe(testValue, 'component property not set as expected');
      const attrVal = this.context.component.getAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_TEXT);
      expect(attrVal).toBe(testValue, 'component attribute not set as expected');
      expect(this.context.getAvatarElement().text).toBe(testValue, 'avatar element avatar text property not set as expected');
    });
  });

  describe('avatar image url', function(this: ITestContext) {
    it('should set the avatar image url to match the text passed to the component property', function(this: ITestContext) {
      this.context = setupTestContext();
      const testValue = 'avatarImageUrl.com';
      this.context.component.avatarImageUrl = testValue;
      expect(this.context.component.avatarImageUrl).toBe(testValue, 'component property not set as expected');
      const attrVal = this.context.component.getAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_IMAGE_URL);
      expect(attrVal).toBe(testValue, 'component attribute not set as expected');
      expect(this.context.getAvatarElement().imageUrl).toBe(testValue, 'avatar element image url property not set as expected');
    });

    it('should set the avatar image url to match the text passed to the component attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      const testValue = 'avatarImageUrl.com';
      this.context.component.setAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_IMAGE_URL, testValue);
      expect(this.context.component.avatarImageUrl).toBe(testValue, 'component property not set as expected');
      const attrVal = this.context.component.getAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_IMAGE_URL);
      expect(attrVal).toBe(testValue, 'component attribute not set as expected');
      expect(this.context.getAvatarElement().imageUrl).toBe(testValue, 'avatar element image url property not set as expected');
    });
  });

  describe('avatar letter count', function(this: ITestContext) {
    it('should set the avatar letter count to match the value passed to the component property', function(this: ITestContext) {
      this.context = setupTestContext();
      const testValue = 3;
      this.context.component.avatarLetterCount = testValue;
      expect(this.context.component.avatarLetterCount).toBe(testValue, 'component property not set as expected');
      const attrVal = this.context.component.getAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_LETTER_COUNT);
      expect(attrVal).toBe(`${testValue}`, 'component attribute not set as expected');
      expect(this.context.getAvatarElement().letterCount).toBe(testValue, 'avatar element letterCount property not set as expected');
    });

    it('should set the avatar letter count to match the value passed to the component attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      const testValue = 3;
      this.context.component.setAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_LETTER_COUNT, `${testValue}`);
      expect(this.context.component.avatarLetterCount).toBe(testValue, 'component property not set as expected');
      const attrVal = this.context.component.getAttribute(PROFILE_CARD_CONSTANTS.attributes.AVATAR_LETTER_COUNT);
      expect(attrVal).toBe(`${testValue}`, 'component attribute not set as expected');
      expect(this.context.getAvatarElement().letterCount).toBe(testValue, 'avatar element letterCount property not set as expected');
    });
  });

  describe('focus', function(this: ITestContext) {
    it('should initially focus the signout button when signout button is present', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.signOut = true;
      await tick();
      const activeElement = getActiveElement();
      expect(activeElement).toBe(this.context.getSignOutButton(), 'sign out button is not focused');
    });
  });

  function setupTestContext(): ITestProfileCardContext {
    const fixture = document.createElement('div');
    fixture.id = 'profile-card-test-fixture';
    const component = document.createElement(PROFILE_CARD_CONSTANTS.elementName) as IProfileCardComponent;
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      getFullNameElement: () => getShadowElement(component, PROFILE_CARD_CONSTANTS.selectors.FULL_NAME),
      getEmailElement: () => getShadowElement(component, PROFILE_CARD_CONSTANTS.selectors.EMAIL),
      getAvatarElement: () => getShadowElement(component, PROFILE_CARD_CONSTANTS.selectors.AVATAR) as IAvatarComponent,
      getActionToolbar: () => getShadowElement(component, PROFILE_CARD_CONSTANTS.selectors.ACTION_TOOLBAR) as IToolbarComponent,
      getProfileButton: () => getShadowElement(component, PROFILE_CARD_CONSTANTS.selectors.PROFILE_BUTTON) as HTMLButtonElement,
      getSignOutButton: () => getShadowElement(component, PROFILE_CARD_CONSTANTS.selectors.SIGN_OUT_BUTTON) as HTMLButtonElement,
      destroy: () => removeElement(fixture)
    };
  }  
});

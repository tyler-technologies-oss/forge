import { removeElement } from '@tylertech/forge-core';
import { APP_BAR_NOTIFICATION_BUTTON_CONSTANTS, defineAppBarNotificationButtonComponent, IAppBarNotificationButtonComponent } from '@tylertech/forge/app-bar/notification-button';

interface ITestContext {
  context: ITestAppBarNotificationButtonContext;
}

interface ITestAppBarNotificationButtonContext {
  component: IAppBarNotificationButtonComponent;
  destroy(): void;
}

describe('AppBarNotificationButtonComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineAppBarNotificationButtonComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('Badge count', function(this: ITestContext) {
    it('should sync property and attribute count when count property is set', function(this: ITestContext) {
      this.context = setupTestContext();
      const count = 5;
      this.context.component.count = count;
      expect(this.context.component.count).toBe(count, `Component count property should be set to: ${count}`);
      const attrValue = this.context.component.getAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.COUNT);
      expect(attrValue).not.toBeNull('Component count attribute cannot be null');
      expect(attrValue ? +attrValue : -1).toBe(count, `Component count attribute should be : ${count}`);
    });

    it('should sync property and attribute count when count attribute is set', function(this: ITestContext) {
      this.context = setupTestContext();
      const count = 5;
      this.context.component.setAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.COUNT, String(count));
      expect(this.context.component.count).toBe(count, `Component count property should be set to: ${count}`);
      const attrValue = this.context.component.getAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.COUNT);
      expect(attrValue).not.toBeNull('Component count attribute cannot be null');
      expect(attrValue ? +attrValue : -1).toBe(count, `Component count attribute should be : ${count}`);
    });

    it('should sync property and attribute count when count property is set and then count attribute is set', function(this: ITestContext) {
      this.context = setupTestContext();
      let count = 5;
      this.context.component.count = count;
      expect(this.context.component.count).toBe(count, `Component count property should be set to: ${count}`);
      let attrValue = this.context.component.getAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.COUNT);
      expect(attrValue).not.toBeNull('Component count attribute cannot be null');
      expect(attrValue ? +attrValue : -1).toBe(count, `Component count attribute should be : ${count}`);

      count = 0;
      this.context.component.setAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.COUNT, String(count));
      expect(this.context.component.count).toBe(count, `Component count property should be set to: ${count}`);
      attrValue = this.context.component.getAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.COUNT);
      expect(attrValue).not.toBeNull('Component count attribute cannot be null');
      expect(attrValue ? +attrValue : -1).toBe(count, `Component count attribute should be : ${count}`);
    });

    it('should not show badge if count property is set', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.count = 5;

      expect(this.context.component.showBadge).toBeFalse();
    });
  });

  describe('Use dot display', function(this: ITestContext) {
    it('should default dot property and attribute to false', function(this: ITestContext) {
      this.context = setupTestContext();
      const useDotDisplay = false;
      expect(this.context.component.dot).toBe(useDotDisplay, `Component dot property should be set to: ${useDotDisplay}`);
      expect(this.context.component.hasAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.DOT)).toBe(useDotDisplay, 'Component has dot attribute');
    });

    it('should set dot property and attribute when dot property is updated to true', function(this: ITestContext) {
      this.context = setupTestContext();
      const useDotDisplay = true;
      this.context.component.dot = useDotDisplay;
      expect(this.context.component.dot).toBe(useDotDisplay, `Component dot property should be set to: ${useDotDisplay}`);
      expect(this.context.component.hasAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.DOT)).toBe(useDotDisplay, 'Component does not have dot attribute');
    });

    it('should set dot property and attribute when dot attribute is added', function(this: ITestContext) {
      this.context = setupTestContext();
      const useDotDisplay = true;
      this.context.component.setAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.DOT, '');
      expect(this.context.component.dot).toBe(useDotDisplay, `Component dot property should be set to: ${useDotDisplay}`);
      expect(this.context.component.hasAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.DOT)).toBe(useDotDisplay, 'Component does not have dot attribute');
    });
  });

  describe('theme', function(this: ITestContext) {
    it('should change theme when set via property', function(this: ITestContext) {
      this.context = setupTestContext();
      const theme = 'danger';
      this.context.component.theme = theme;
      expect(this.context.component.theme).toBe(theme, `Component property theme value should be set to: ${theme}`);
      expect(this.context.component.getAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.THEME)).toBe(theme, `Component attribute theme value should be set to: ${theme}`);
    });

    it('should remove theme when set as emptyString via property', function(this: ITestContext) {
      this.context = setupTestContext();
      const theme: string = '';
      this.context.component.theme = theme;
      expect(this.context.component.theme).toBe(theme, `Component property theme value should be set to: ${theme}`);
      expect(this.context.component.getAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.THEME)).toBe(theme, `Component attribute theme value should be set to: ${theme}`);
    });
  });

  describe('icon', function (this: ITestContext) {
    it('should change icon when set via property', function (this: ITestContext) {
      this.context = setupTestContext();
      const icon = 'connection';
      this.context.component.icon = icon;
      expect(this.context.component.icon).toBe(icon, `Component property icon value should be set to: ${icon}`);
      expect(this.context.component.getAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.ICON)).toBe(icon, `Component attribute icon value should be set to: ${icon}`);
    });
  });

  describe('showBadge', function(this: ITestContext) {
    it('should default showBadge property and attribute to false', function(this: ITestContext) {
      this.context = setupTestContext();
      const showBadge = false;
      expect(this.context.component.showBadge).toBe(showBadge, `Component showBadge property should be set to: ${showBadge}`);
      expect(this.context.component.hasAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.SHOW_BADGE)).toBe(showBadge, 'Component does not have showBadge attribute');
    });

    it('should set showBadge property and attribute when showBadge property is updated to true', function(this: ITestContext) {
      this.context = setupTestContext();
      const showBadge = true;
      this.context.component.showBadge = showBadge;
      expect(this.context.component.showBadge).toBe(showBadge, `Component showBadge property should be set to: ${showBadge}`);
      expect(this.context.component.hasAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.SHOW_BADGE)).toBe(showBadge, 'Component does not have showBadge attribute');
    });

    it('should set showBadge property and attribute when showBadge attribute is added', function(this: ITestContext) {
      this.context = setupTestContext();
      const showBadge = true;
      this.context.component.setAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.SHOW_BADGE, '');
      expect(this.context.component.showBadge).toBe(showBadge, `Component showBadge property should be set to: ${showBadge}`);
      expect(this.context.component.hasAttribute(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.attributes.SHOW_BADGE)).toBe(showBadge, 'Component does not have showBadge attribute');
    });
  });

  function setupTestContext(): ITestAppBarNotificationButtonContext {
    const fixture = document.createElement('div');
    fixture.id = 'notification-button-test-fixture';
    const component = document.createElement(APP_BAR_NOTIFICATION_BUTTON_CONSTANTS.elementName) as IAppBarNotificationButtonComponent;
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }
  
});

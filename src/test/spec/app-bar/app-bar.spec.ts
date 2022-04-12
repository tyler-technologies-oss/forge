import { IAppBarComponent, APP_BAR_CONSTANTS, defineAppBarComponent } from '@tylertech/forge/app-bar';
import { removeElement, getShadowElement } from '@tylertech/forge-core';

interface ITestContext {
  context: ITestAppBarContext;
}

interface ITestAppBarContext {
  component: IAppBarComponent;
  getTitleElement(): HTMLElement;
  destroy(): void;
}

describe('AppBarComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineAppBarComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('Instantiation', function(this: ITestContext) {
    it('should be instantiated', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.isConnected).toBe(true, 'Component should be connected.');
    });

    it('should contain a shadow root', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component.shadowRoot).not.toBeNull();
    });
  });

  describe('Title text', function(this: ITestContext) {
    it('should render with title set via attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      const title = 'Title Test';
      this.context.component.setAttribute(APP_BAR_CONSTANTS.attributes.TITLE_TEXT, title);
      expect(this.context.component.titleText).toBe(title, `Component title-text property should be set to: ${title}`);
      expect(this.context.getTitleElement().textContent).toBe(title, `Title element text content should be set to: ${title}`);
    });

    it('should render with title when set via property', function(this: ITestContext) {
      this.context = setupTestContext();
      const title = 'Title Test';
      this.context.component.titleText = title;
      expect(this.context.component.getAttribute(APP_BAR_CONSTANTS.attributes.TITLE_TEXT)).toBe(title, `Component title-text attribute should be ${title}`);
      expect(this.context.getTitleElement().textContent).toBe(title, `Title element text content should be set to: ${title}`);
    });
  });

  describe('Fixed state', function(this: ITestContext) {
    it('should render with fixed state when set to true via attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      const isFixed = true;
      this.context.component.setAttribute(APP_BAR_CONSTANTS.attributes.FIXED, String(isFixed));
      expect(this.context.component.fixed).toBe(isFixed, `Component fixed property should be set to: ${isFixed}`);
      expect(getShadowElement(this.context.component, APP_BAR_CONSTANTS.selectors.FIXED)).not.toBeNull('Fixed class should be assigned to shadow element');
    });

    it('should render with fixed state when set to true via property', function(this: ITestContext) {
      this.context = setupTestContext();
      const isFixed = true;
      this.context.component.fixed = isFixed;
      expect(this.context.component.fixed).toBe(isFixed, `Component fixed property should be set to: ${isFixed}`);
      expect(getShadowElement(this.context.component, APP_BAR_CONSTANTS.selectors.FIXED)).not.toBeNull('Fixed class should be assigned to shadow element');
    });

    it('should render without fixed state by default when fixed attribute is not present', function(this: ITestContext) {
      this.context = setupTestContext();
      const isFixed = false;
      this.context.component.removeAttribute(APP_BAR_CONSTANTS.attributes.FIXED);
      expect(this.context.component.fixed).toBe(isFixed, `Component fixed property should be set to: ${isFixed}`);
      expect(getShadowElement(this.context.component, APP_BAR_CONSTANTS.selectors.FIXED)).toBeNull('Fixed class should not be assigned to shadow element');
    });

    it('should render without fixed state when fixed attribute is set to false', function(this: ITestContext) {
      this.context = setupTestContext();
      const isFixed = false;
      this.context.component.setAttribute(APP_BAR_CONSTANTS.attributes.FIXED, String(isFixed));
      expect(this.context.component.fixed).toBe(isFixed, `Component fixed property should be set to: ${isFixed}`);
      expect(getShadowElement(this.context.component, APP_BAR_CONSTANTS.selectors.FIXED)).toBeNull('Fixed class should not be assigned to shadow element');
    });

    it('should render without fixed state when set to false via property', function(this: ITestContext) {
      this.context = setupTestContext();
      const isFixed = false;
      this.context.component.fixed = isFixed;
      expect(this.context.component.fixed).toBe(isFixed, `Component fixed property should be set to: ${isFixed}`);
      expect(getShadowElement(this.context.component, APP_BAR_CONSTANTS.selectors.FIXED)).toBeNull('Fixed class should not be assigned to shadow element');
    });
  });

  describe('Raised state', function(this: ITestContext) {
    it('should render with raised state when set to true via attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      const isRaised = true;
      this.context.component.setAttribute(APP_BAR_CONSTANTS.attributes.RAISED, String(isRaised));
      expect(this.context.component.raised).toBe(isRaised, `Component raised property should be set to: ${isRaised}`);
      expect(getShadowElement(this.context.component, APP_BAR_CONSTANTS.selectors.RAISED)).not.toBeNull('Raised class should be assigned to shadow element');
    });

    it('should render with raised state when set to true via property', function(this: ITestContext) {
      this.context = setupTestContext();
      const isRaised = true;
      this.context.component.raised = isRaised;
      expect(this.context.component.raised).toBe(isRaised, `Component raised property should be set to: ${isRaised}`);
      expect(getShadowElement(this.context.component, APP_BAR_CONSTANTS.selectors.RAISED)).not.toBeNull('Raised class should be assigned to shadow element');
    });

    it('should render with raised state by default when raised attribute is not present', function(this: ITestContext) {
      this.context = setupTestContext();
      const isRaised = true;
      this.context.component.removeAttribute(APP_BAR_CONSTANTS.attributes.RAISED);
      expect(this.context.component.raised).toBe(isRaised, `Component raised property should be set to: ${isRaised}`);
      expect(getShadowElement(this.context.component, APP_BAR_CONSTANTS.selectors.RAISED)).not.toBeNull('Raised class should be assigned to shadow element');
    });

    it('should render without raised state when raised attribute is set to false', function(this: ITestContext) {
      this.context = setupTestContext();
      const isRaised = false;
      this.context.component.setAttribute(APP_BAR_CONSTANTS.attributes.RAISED, String(isRaised));
      expect(this.context.component.raised).toBe(isRaised, `Component raised property should be set to: ${isRaised}`);
      expect(getShadowElement(this.context.component, APP_BAR_CONSTANTS.selectors.RAISED)).toBeNull('Raised class should not be assigned to shadow element');
    });

    it('should render without raised state when set to false via property', function(this: ITestContext) {
      this.context = setupTestContext();
      const isRaised = false;
      this.context.component.raised = isRaised;
      expect(this.context.component.raised).toBe(isRaised, `Component raised property should be set to: ${isRaised}`);
      expect(getShadowElement(this.context.component, APP_BAR_CONSTANTS.selectors.RAISED)).toBeNull('Raised class should not be assigned to shadow element');
    });
  });

  describe('Theme', function(this: ITestContext) {
    it('should change theme when set via property', function(this: ITestContext) {
      this.context = setupTestContext();
      const theme = 'orange';
      this.context.component.theme = theme;
      expect(this.context.component.theme).toBe(theme, `Component property theme value should be set to: ${theme}`);
      expect(this.context.component.getAttribute(APP_BAR_CONSTANTS.attributes.THEME)).toBe(theme, `Component attribute theme value should be set to: ${theme}`);
    });

    it('should remove theme when set as null via property', function(this: ITestContext) {
      this.context = setupTestContext();
      const theme: string | null = null;
      this.context.component.theme = theme;
      expect(this.context.component.theme).toBe(theme, `Component property theme value should be set to: ${theme}`);
      expect(this.context.component.getAttribute(APP_BAR_CONSTANTS.attributes.THEME)).toBeNull(`Component attribute theme value should be set to: ${theme}`);
    });
  });

  function setupTestContext(): ITestAppBarContext {
    const fixture = document.createElement('div');
    fixture.id = 'app-bar-test-fixture';
    const component = document.createElement('forge-app-bar');
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      getTitleElement: () => getShadowElement(component, APP_BAR_CONSTANTS.selectors.TITLE),
      destroy: () => removeElement(fixture)
    };
  }  
});

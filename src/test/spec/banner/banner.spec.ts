import { removeElement, getShadowElement } from '@tylertech/forge-core';
import { defineBannerComponent, IBannerComponent, BANNER_CONSTANTS, BannerComponent, BUTTON_CONSTANTS, IButtonComponent } from '@tylertech/forge';
import { tick } from '@tylertech/forge-testing';

const DEFAULT_TEXT_CONTENT = 'Laboris cillum dolore id incididunt consequat nisi nisi. Consequat cillum officia quis quis.';

interface ITestContext {
  context: ITestBannerContext;
}

interface ITestBannerContext {
  component: IBannerComponent;
  destroy(): void;
}

describe('BannerComponent', function(this: ITestContext) {

  let component: IBannerComponent;

  beforeAll(function(this: ITestContext) {
    defineBannerComponent();
  });

  beforeEach(function(this: ITestContext) {
    this.context = setupTestContext();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('Instantiation', function(this: ITestContext) {
    it('should be connected', function(this: ITestContext) {
      expect(this.context.component.isConnected).toBe(true);
    });

    it('should instantiate component with shadow dom', function(this: ITestContext) {
      expect(this.context.component.shadowRoot).toBeDefined();
    });

    it('should instantiate component as BannerComponent', function(this: ITestContext) {
      expect(this.context.component instanceof BannerComponent).toBe(true, 'Component should be an instance of BannerComponent.');
    });

    it('should initially be in undismissed state by default', function(this: ITestContext) {
      expect(isDismissedClassApplied(this.context.component)).toBe(false, 'dismissed class should not be applied');
      expect(this.context.component.dismissed).toBe(false, 'dismissed property should be false');
    });

    it('should be shown by default', function(this: ITestContext) {
      expect(this.context.component.canDismiss === true).toBe(true, 'canDismiss property should be true');
      expect(dismissButtonIsVisible(this.context.component)).toBe(true, 'dismiss button should be visible');
    });
  });

  describe('API (Properties) - dismissed', function(this: ITestContext) {
    it('should set dismissed state when dismissed property is set to true', function(this: ITestContext) {
      this.context.component.dismissed = true;
      expect(isDismissedClassApplied(this.context.component)).toBe(true, 'dismissed class should be applied');
      expect(this.context.component.dismissed).toBe(true, 'dismissed property should be true');
    });

    it('should set undismissed state when dismissed property is set to false from true', async function(this: ITestContext) {
      this.context.component.dismissed = true;
      await tick();

      this.context.component.dismissed = false;
      expect(isDismissedClassApplied(this.context.component)).toBe(false, 'dismissed class should not be applied');
      expect(this.context.component.dismissed).toBe(false, 'dismissed property should be false');
    });
  });

  describe('API (Attributes) - dismissed', function(this: ITestContext) {
    it('should set dismissed state when dismissed attribute is set to true', function(this: ITestContext) {
      this.context.component.setAttribute(BANNER_CONSTANTS.attributes.DISMISSED, 'true');
      expect(isDismissedClassApplied(this.context.component)).toBe(true, 'dismissed class should be applied');
      expect(this.context.component.dismissed).toBe(true, 'dismissed property should be true');
    });

    it('should set undismissed state when dismissed attribute is set to true from false', async function(this: ITestContext) {
      this.context.component.setAttribute(BANNER_CONSTANTS.attributes.DISMISSED, 'true');
      await tick();

      this.context.component.setAttribute(BANNER_CONSTANTS.attributes.DISMISSED, 'false');
      expect(isDismissedClassApplied(this.context.component)).toBe(false, 'dismissed class should not be applied');
      expect(this.context.component.dismissed).toBe(false, 'dismissed property should be false');
    });
  });

  describe('API (Properties) - canDismiss', function(this: ITestContext) {
    it('should not be shown when canDismiss is false', function(this: ITestContext) {
      this.context.component.canDismiss = false;
      expect(this.context.component.canDismiss === false).toBe(true, 'canDismiss property should be false');
      expect(dismissButtonIsVisible(this.context.component)).toBe(false, 'dismiss button should not be visible');
    });

    it('should be shown when canDismiss flips from false to true', async function(this: ITestContext) {
      this.context.component.canDismiss = false;
      await tick();
      this.context.component.canDismiss = true;
      expect(this.context.component.canDismiss === true).toBe(true, 'canDismiss property should be true');
      expect(dismissButtonIsVisible(this.context.component)).toBe(true, 'dismiss button should be visible');
    });
  });

  describe('API (Attributes) - can-dismiss', function(this: ITestContext) {
    it('should not be shown when can-dismiss is false', function(this: ITestContext) {
      this.context.component.setAttribute(BANNER_CONSTANTS.attributes.CAN_DISMISS, 'false');
      expect(this.context.component.canDismiss === false).toBe(true, 'canDismiss property should be false');
      expect(dismissButtonIsVisible(this.context.component)).toBe(false, 'dismiss button should not be visible');
    });

    it('should be shown when can-dismiss flips from false to true', async function(this: ITestContext) {
      this.context.component.setAttribute(BANNER_CONSTANTS.attributes.CAN_DISMISS, 'false');
      await tick();
      this.context.component.setAttribute(BANNER_CONSTANTS.attributes.CAN_DISMISS, 'true');
      expect(this.context.component.canDismiss === true).toBe(true, 'canDismiss property should be true');
      expect(dismissButtonIsVisible(this.context.component)).toBe(true, 'dismiss button should be visible');
    });
  });

  describe('Events', function(this: ITestContext) {
    it('should emit dismissed event when banner is dismissed', async function(this: ITestContext) {
      this.context.component.dismissed = false;
      const dismissedSpy = jasmine.createSpy('dismissed event');
      this.context.component.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissedSpy)
      this.context.component.dismissed = true;
      await tick();
      expect(dismissedSpy).toHaveBeenCalled();
    });

    it('should emit undismissed event when banner is undismissed', async function(this: ITestContext) {
      this.context.component.dismissed = true;
      const undismissedSpy = jasmine.createSpy('undismissed event');
      this.context.component.addEventListener(BANNER_CONSTANTS.events.UNDISMISSED, undismissedSpy)
      this.context.component.dismissed = false;
      await tick();
      expect(undismissedSpy).toHaveBeenCalled();
    });
  });

  describe('Internal dismiss', function(this: ITestContext) {
    it('should emit dismiss event when banner is dismissed from internal icon button', function(this: ITestContext) {
      this.context.component.dismissed = false;
      const dismissBtn = getShadowElement(this.context.component, BANNER_CONSTANTS.selectors.DISMISS_BUTTON);
      dismissBtn.click();
      expect(isDismissedClassApplied(this.context.component)).toBe(true, 'dismissed class should be applied');
      expect(this.context.component.dismissed).toBe(true, 'dismissed should be true');
    });
  });

  function setupTestContext(): ITestBannerContext {
    const fixture = document.createElement('div');
    fixture.id = 'banner-test-fixture';
    const component = document.createElement(BANNER_CONSTANTS.elementName) as IBannerComponent;
    const icon = document.createElement('i') as HTMLElement;
    icon.textContent = 'add_alert';
    icon.classList.add('tyler-icons');
    component.appendChild(icon);
    const text = document.createElement('div') as HTMLElement;
    text.slot = 'text';
    text.textContent = DEFAULT_TEXT_CONTENT;
    component.appendChild(text);
    const buttonComponent = document.createElement(BUTTON_CONSTANTS.elementName) as IButtonComponent;
    buttonComponent.setAttribute('type', 'outlined');
    const buttonElement = document.createElement('button') as HTMLButtonElement;
    buttonElement.type = 'button';
    buttonElement.textContent = 'Learn more...';
    buttonComponent.appendChild(buttonElement);
    component.appendChild(buttonComponent);
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }

  function isDismissedClassApplied(component: IBannerComponent): boolean {
    const rootElement = getShadowElement(component, BANNER_CONSTANTS.selectors.BANNER);
    return rootElement.classList.contains(BANNER_CONSTANTS.classes.DISMISSED);

  }

  function dismissButtonIsVisible(component: IBannerComponent): boolean {
    const dismissBtn = getShadowElement(component, BANNER_CONSTANTS.selectors.FORGE_DISMISS_BUTTON);
    return !dismissBtn.hasAttribute('hidden');
  }
});

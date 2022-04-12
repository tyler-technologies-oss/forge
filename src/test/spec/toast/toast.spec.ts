import { IToastComponent, TOAST_CONSTANTS, defineToastComponent } from '@tylertech/forge/toast';
import { timer, tick } from '@tylertech/forge-testing';
import { removeElement, getShadowElement, dashify } from '@tylertech/forge-core';

const customHorizontalMargin = '50px';
const customVerticalMargin = '75px';
const defaultMargin = '24px';

interface ITestContext {
  context: IToastTestContext;
}

interface IToastTestContext {
  component: IToastComponent;
  attach(): void;
  destroy(): void;
  getToastActionText(): string;
  getToastContainerElement(): HTMLElement;
  getToastActionButtonElement(): HTMLButtonElement;
  getToastMessage(): string;
  getCloseButton(): HTMLButtonElement;
}

describe('ToastComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineToastComponent();
  });

  describe('without default attribute values', function(this: ITestContext) {
    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    it('should be instantiated', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.attach();
      expect(this.context.component).toBeDefined();
      expect(this.context.component.shadowRoot).toBeDefined();
    });

    it('should have default values', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.attach();

      const message = this.context.getToastMessage();
      expect(message).toBe('', 'Expected default message to be empty in DOM');
      expect(this.context.component.message).toBeUndefined('Expected default internal message to be undefined');
      expect(this.context.component.getAttribute(TOAST_CONSTANTS.attributes.MESSAGE)).toBeNull();

      const actionText = this.context.getToastActionText();
      expect(actionText).toBe('', 'Expected default action text to be empty in DOM');
      expect(this.context.component.actionText).toBeUndefined('Expected default internal action text to be undefined');
      expect(this.context.component.getAttribute(TOAST_CONSTANTS.attributes.ACTION_TEXT)).toBeNull();

      expect(this.context.component.duration).toBe(TOAST_CONSTANTS.defaults.DURATION, 'Expected default duration to be set');
      expect(this.context.component.getAttribute(TOAST_CONSTANTS.attributes.DURATION)).toBeNull();

      expect(this.context.component.placement).toBe(TOAST_CONSTANTS.defaults.PLACEMENT, 'Expected default placement to be set');
      expect(this.context.getToastContainerElement().classList.contains(TOAST_CONSTANTS.classes.CONTAINER)).toBe(true, 'Expected default placement to be set in DOM');
      expect(this.context.component.getAttribute(TOAST_CONSTANTS.attributes.PLACEMENT)).toBeNull();
    });

    it('should set message', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.message = 'Test message';
      this.context.attach();
      const message = this.context.getToastMessage();
      expect(message).toBe('Test message');
    });

    it('should change message through attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.message = 'Test message';
      this.context.attach();

      this.context.component.setAttribute(TOAST_CONSTANTS.attributes.MESSAGE, 'New message');
      const message = this.context.getToastMessage();

      expect(message).toBe('New message');
      expect(this.context.component.getAttribute(TOAST_CONSTANTS.attributes.MESSAGE)).toBe('New message');
    });

    it('should change action text through attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.actionText = 'action text';
      this.context.attach();
      this.context.component.setAttribute(TOAST_CONSTANTS.attributes.ACTION_TEXT, 'new action text');
      const actionText = this.context.getToastActionText();
      expect(actionText).toBe('new action text');
    });

    it('should change placement through attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.attach();
      this.context.component.setAttribute(TOAST_CONSTANTS.attributes.PLACEMENT, 'bottom-start');
      const containerElement = this.context.getToastContainerElement();

      expect(containerElement.classList.contains(TOAST_CONSTANTS.classes.BOTTOM_LEFT)).toBe(true);
      expect(this.context.component.placement).toBe('bottom-start');
    });

    it('should change duration through attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.attach();
      this.context.component.setAttribute(TOAST_CONSTANTS.attributes.DURATION, '3000');

      expect(this.context.component.duration).toBe(3000);
      expect(this.context.component.getAttribute(TOAST_CONSTANTS.attributes.DURATION)).toBe('3000');
    });

    it('should use default duration when setting duration through attribute if invalid', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.attach();
      this.context.component.setAttribute(TOAST_CONSTANTS.attributes.DURATION, 'abc');
      expect(this.context.component.duration).toBe(TOAST_CONSTANTS.defaults.DURATION);
    });

    it('should remove toast element from the DOM when hiding manually', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.attach();
      this.context.component.hide();

      const containerElement = this.context.getToastContainerElement();
      expect(containerElement.classList.contains(TOAST_CONSTANTS.classes.ACTIVE)).toBeFalse();
    });

    it('should emit close event when hidden', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.attach();

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TOAST_CONSTANTS.events.CLOSE, callback);

      await timer(TOAST_CONSTANTS.defaults.DURATION);
      expect(callback).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not emit close event when hidden manually', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.attach();

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TOAST_CONSTANTS.events.CLOSE, callback);

      this.context.component.hide();

      await timer(TOAST_CONSTANTS.defaults.DURATION);
      expect(callback).not.toHaveBeenCalled();
    });

    it('should emit action event when clicking on action', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.actionText = 'CANCEL';
      this.context.attach();

      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(TOAST_CONSTANTS.events.ACTION, callback);

      const actionButton = this.context.getToastActionButtonElement();
      actionButton.click();

      expect(callback).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should remove action button when action text is empty', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.actionText = 'CANCEL';
      this.context.attach();
      this.context.component.actionText = '';

      const actionButton = this.context.getToastActionButtonElement();
      expect(actionButton).toBeNull();
    });

    it('should set all toast placement properly', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.attach();

      const containerElement = this.context.getToastContainerElement();

      this.context.component.placement = 'top-start';
      expect(containerElement.classList.contains(TOAST_CONSTANTS.classes.TOP_LEFT)).toBe(true, 'Expected top left class');

      this.context.component.placement = 'top';
      expect(containerElement.classList.contains(TOAST_CONSTANTS.classes.TOP)).toBe(true, 'Expected top class');

      this.context.component.placement = 'top-end';
      expect(containerElement.classList.contains(TOAST_CONSTANTS.classes.TOP_RIGHT)).toBe(true, 'Expected top right class');

      this.context.component.placement = 'bottom-start';
      expect(containerElement.classList.contains(TOAST_CONSTANTS.classes.BOTTOM_LEFT)).toBe(true, 'Expected bottom left class');

      this.context.component.placement = 'bottom';
      expect(containerElement.classList.contains(TOAST_CONSTANTS.classes.BOTTOM)).toBe(true, 'Expected bottom class');

      this.context.component.placement = 'bottom-end';
      expect(containerElement.classList.contains(TOAST_CONSTANTS.classes.BOTTOM_RIGHT)).toBe(true, 'Expected bottom right class');
    });

    it('should show close button by default', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.attach();
      await tick();

      expect(this.context.component.showClose).toBeTrue();
      expect(this.context.getCloseButton().style.display === 'none').toBeFalsy();
    });

    it('should not show close button', async function(this: ITestContext) {
      this.context = setupTestContext();
      
      this.context.component.showClose = false;
      this.context.attach();
      await tick();

      expect(this.context.component.showClose).toBeFalse();
      expect(this.context.getCloseButton().style.display === 'none').toBeTrue();
    });

    it('should not show close button via attribute', async function(this: ITestContext) {
      this.context = setupTestContext();
      
      this.context.component.setAttribute(TOAST_CONSTANTS.attributes.SHOW_CLOSE, 'false');
      this.context.attach();
      await tick();

      expect(this.context.component.showClose).toBeFalse();
      expect(this.context.getCloseButton().style.display === 'none').toBeTrue();
    });

    it('should hide when close button is clicked', async function(this: ITestContext) {
      this.context = setupTestContext();
      
      this.context.attach();
      await tick();
      this.context.getCloseButton().click();
      
      const containerElement = this.context.getToastContainerElement();
      expect(containerElement.classList.contains(TOAST_CONSTANTS.classes.ACTIVE)).toBeFalse();
    });

    it('should show custom content view builder function', async function(this: ITestContext) {
      this.context = setupTestContext();
      
      const id = 'custom-toast-content';
      const builderSpy = jasmine.createSpy('builder spy', () => {
        const div = document.createElement('div');
        div.id = id;
        div.textContent = 'Custom toast';
        return div;
      }).and.callThrough();
      this.context.component.builder = builderSpy;
      this.context.attach();
      await tick();

      const customContentElement = this.context.component.querySelector(`#${id}`);
      expect(builderSpy).toHaveBeenCalledTimes(1);
      expect(customContentElement).toBeTruthy();
    });
  });

  describe('with default attribute values', function(this: ITestContext) {
    const defaultAttributes: any = {
      message: 'Default message',
      actionText: 'DEFAULT ACTION TEXT',
      duration: 3000,
      placement: 'top'
    };

    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    it('should have proper default values from attributes', function(this: ITestContext) {
      this.context = setupTestContext(true, defaultAttributes);
      this.context.attach();

      expect(this.context.component.message).toBe(defaultAttributes.message);
      expect(this.context.component.getAttribute(TOAST_CONSTANTS.attributes.MESSAGE)).toBe(defaultAttributes.message);

      expect(this.context.component.actionText).toBe(defaultAttributes.actionText);
      expect(this.context.component.getAttribute(TOAST_CONSTANTS.attributes.ACTION_TEXT)).toBe(defaultAttributes.actionText);

      expect(this.context.component.duration).toBe(defaultAttributes.duration);
      expect(this.context.component.getAttribute(TOAST_CONSTANTS.attributes.DURATION)).toBe(defaultAttributes.duration.toString());

      expect(this.context.component.placement).toBe(defaultAttributes.placement);
      expect(this.context.component.getAttribute(TOAST_CONSTANTS.attributes.PLACEMENT)).toBe(defaultAttributes.placement);
    });
  });

  describe('custom properties', function(this: ITestContext) {
    const defaultAttributes: any = {
      message: 'Default message',
      actionText: 'DEFAULT ACTION TEXT',
      duration: 3000,
      placement: 'top'
    };

    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    describe('with position top left', function(this: ITestContext) {
      it('should have customized margin when set', async function(this: ITestContext) {
        this.context = setupTestContext(true, defaultAttributes);
        this.context.attach();
        this.context.component.placement = 'top-start';
        this.context.component.style.setProperty(TOAST_CONSTANTS.customCssPositionProperties.TOP_LEFT_MARGIN_TOP, customVerticalMargin);
        this.context.component.style.setProperty(TOAST_CONSTANTS.customCssPositionProperties.TOP_LEFT_MARGIN_LEFT, customHorizontalMargin);
        await tick();

        const rootElement = getShadowElement(this.context.component, TOAST_CONSTANTS.selectors.CONTAINER);
        const marginTop = getComputedStyle(rootElement).marginTop;
        const marginLeft = getComputedStyle(rootElement).marginLeft;

        expect(marginTop).toBe(customVerticalMargin);
        expect(marginLeft).toBe(customHorizontalMargin);
      });

      it('should have default margin when not customized', async function(this: ITestContext) {
        this.context = setupTestContext(true, defaultAttributes);
        this.context.attach();
        this.context.component.placement = 'top-start';
        await tick();

        const rootElement = getShadowElement(this.context.component, TOAST_CONSTANTS.selectors.CONTAINER);
        const marginTop = getComputedStyle(rootElement).marginTop;
        const marginLeft = getComputedStyle(rootElement).marginLeft;

        expect(marginTop).toBe(defaultMargin);
        expect(marginLeft).toBe(defaultMargin);
      });
    });

    describe('with position top', function(this: ITestContext) {
      it('should have customized margin when set', async function(this: ITestContext) {
        this.context = setupTestContext(true, defaultAttributes);
        this.context.attach();
        this.context.component.placement = 'top';
        this.context.component.style.setProperty(TOAST_CONSTANTS.customCssPositionProperties.TOP_MARGIN_TOP, customVerticalMargin);
        await tick();

        const rootElement = getShadowElement(this.context.component, TOAST_CONSTANTS.selectors.CONTAINER);
        const marginTop = getComputedStyle(rootElement).marginTop;

        expect(marginTop).toBe(customVerticalMargin);
      });

      it('should have default margin when not customized', async function(this: ITestContext) {
        this.context = setupTestContext(true, defaultAttributes);
        this.context.attach();
        this.context.component.placement = 'top';
        await tick();

        const rootElement = getShadowElement(this.context.component, TOAST_CONSTANTS.selectors.CONTAINER);
        const marginTop = getComputedStyle(rootElement).marginTop;

        expect(marginTop).toBe('0px');
      });
    });

    describe('with position top right', function(this: ITestContext) {
      it('should have customized margin when set', async function(this: ITestContext) {
        this.context = setupTestContext(true, defaultAttributes);
        this.context.attach();
        this.context.component.placement = 'top-end';
        this.context.component.style.setProperty(TOAST_CONSTANTS.customCssPositionProperties.TOP_RIGHT_MARGIN_TOP, customVerticalMargin);
        this.context.component.style.setProperty(TOAST_CONSTANTS.customCssPositionProperties.TOP_RIGHT_MARGIN_RIGHT, customHorizontalMargin);
        await tick();

        const rootElement = getShadowElement(this.context.component, TOAST_CONSTANTS.selectors.CONTAINER);
        const marginTop = getComputedStyle(rootElement).marginTop;
        const marginRight = getComputedStyle(rootElement).marginRight;

        expect(marginTop).toBe(customVerticalMargin);
        expect(marginRight).toBe(customHorizontalMargin);
      });

      it('should have default margin when not customized', async function(this: ITestContext) {
        this.context = setupTestContext(true, defaultAttributes);
        this.context.attach();
        this.context.component.placement = 'top-end';
        await tick();

        const rootElement = getShadowElement(this.context.component, TOAST_CONSTANTS.selectors.CONTAINER);
        const marginTop = getComputedStyle(rootElement).marginTop;
        const marginRight = getComputedStyle(rootElement).marginRight;

        expect(marginTop).toBe(defaultMargin);
        expect(marginRight).toBe(defaultMargin);
      });
    });

    describe('position bottom left', function(this: ITestContext) {
      it('should have customized margin when set', async function(this: ITestContext) {
        this.context = setupTestContext(true, defaultAttributes);
        this.context.attach();
        this.context.component.placement = 'bottom-start';
        this.context.component.style.setProperty(TOAST_CONSTANTS.customCssPositionProperties.BOTTOM_LEFT_MARGIN_BOTTOM, customVerticalMargin);
        this.context.component.style.setProperty(TOAST_CONSTANTS.customCssPositionProperties.BOTTOM_LEFT_MARGIN_LEFT, customHorizontalMargin);
        await tick();

        const rootElement = getShadowElement(this.context.component, TOAST_CONSTANTS.selectors.CONTAINER);
        const marginBottom = getComputedStyle(rootElement).marginBottom;
        const marginLeft = getComputedStyle(rootElement).marginLeft;

        expect(marginBottom).toBe(customVerticalMargin);
        expect(marginLeft).toBe(customHorizontalMargin);
      });

      it('should have default margin when not customized', async function(this: ITestContext) {
        this.context = setupTestContext(true, defaultAttributes);
        this.context.attach();
        this.context.component.placement = 'bottom-start';
        await tick();

        const rootElement = getShadowElement(this.context.component, TOAST_CONSTANTS.selectors.CONTAINER);
        const marginBottom = getComputedStyle(rootElement).marginBottom;
        const marginLeft = getComputedStyle(rootElement).marginLeft;

        expect(marginBottom).toBe(defaultMargin);
        expect(marginLeft).toBe(defaultMargin);
      });
    });

    describe('position bottom', function(this: ITestContext) {
      it('should have customized margin when set', async function(this: ITestContext) {
        this.context = setupTestContext(true, defaultAttributes);
        this.context.attach();
        this.context.component.placement = 'bottom';
        this.context.component.style.setProperty(TOAST_CONSTANTS.customCssPositionProperties.BOTTOM_MARGIN_BOTTOM, customVerticalMargin);
        await tick();

        const rootElement = getShadowElement(this.context.component, TOAST_CONSTANTS.selectors.CONTAINER);
        const marginBottom = getComputedStyle(rootElement).marginBottom;

        expect(marginBottom).toBe(customVerticalMargin);
      });

      it('should have default margin when not customized', async function(this: ITestContext) {
        this.context = setupTestContext(true, defaultAttributes);
        this.context.attach();
        this.context.component.placement = 'bottom';
        await tick();

        const rootElement = getShadowElement(this.context.component, TOAST_CONSTANTS.selectors.CONTAINER);
        const marginBottom = getComputedStyle(rootElement).marginBottom;

        expect(marginBottom).toBe('0px');
      });
    });

    describe('position bottom right', function(this: ITestContext) {
      it('should have customized margin when set', async function(this: ITestContext) {
        this.context = setupTestContext(true, defaultAttributes);
        this.context.attach();
        this.context.component.placement = 'bottom-end';
        this.context.component.style.setProperty(TOAST_CONSTANTS.customCssPositionProperties.BOTTOM_RIGHT_MARGIN_BOTTOM, customVerticalMargin);
        this.context.component.style.setProperty(TOAST_CONSTANTS.customCssPositionProperties.BOTTOM_RIGHT_MARGIN_RIGHT, customHorizontalMargin);
        await tick();

        const rootElement = getShadowElement(this.context.component, TOAST_CONSTANTS.selectors.CONTAINER);
        const marginBottom = getComputedStyle(rootElement).marginBottom;
        const marginRight = getComputedStyle(rootElement).marginRight;

        expect(marginBottom).toBe(customVerticalMargin);
        expect(marginRight).toBe(customHorizontalMargin);
      });

      it('should have default margin when not customized', async function(this: ITestContext) {
        this.context = setupTestContext(true, defaultAttributes);
        this.context.attach();
        this.context.component.placement = 'bottom-end';
        await tick();

        const rootElement = getShadowElement(this.context.component, TOAST_CONSTANTS.selectors.CONTAINER);
        const marginBottom = getComputedStyle(rootElement).marginBottom;
        const marginRight = getComputedStyle(rootElement).marginRight;

        expect(marginBottom).toBe(defaultMargin);
        expect(marginRight).toBe(defaultMargin);
      });
    });
  });

  function setupTestContext(append = false, attributes?: { [key: string]: string }): IToastTestContext {
    const component = document.createElement('forge-toast');

    if (attributes) {
      for (const prop in attributes) {
        if (attributes.hasOwnProperty(prop)) {
          const attrName = dashify(prop);
          component.setAttribute(attrName, attributes[prop]);
        }
      }
    }

    if (append) {
      document.body.appendChild(component);
    }

    return {
      component,
      attach: () => document.body.appendChild(component),
      destroy: () => removeElement(component),
      getToastActionText: () => {
        const actionButton = getShadowElement(component, TOAST_CONSTANTS.selectors.ACTION_BUTTON);
        return actionButton ? actionButton.innerText : '';
      },
      getToastContainerElement: () => getShadowElement(component, TOAST_CONSTANTS.selectors.CONTAINER),
      getToastActionButtonElement: () => getShadowElement(component, TOAST_CONSTANTS.selectors.ACTION_BUTTON) as HTMLButtonElement,
      getToastMessage: () => getShadowElement(component, TOAST_CONSTANTS.selectors.MESSAGE).innerText,
      getCloseButton: () => getShadowElement(component, TOAST_CONSTANTS.selectors.CLOSE_BUTTON) as HTMLButtonElement
    };
  }
});

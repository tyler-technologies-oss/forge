import { removeElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';
import { ButtonComponent, BUTTON_CONSTANTS, defineButtonComponent, IButtonComponent } from '@tylertech/forge/button';

interface ITestContext {
  context: ITestButtonContext | ITestPartialButtonContext;
}

interface ITestButtonContext {
  component: IButtonComponent;
  buttonElement: HTMLButtonElement;
  destroy(): void;
}

interface ITestPartialButtonContext {
  component: IButtonComponent;
  destroy(): void;
}

describe('ButtonComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineButtonComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('with default values', function(this: ITestContext) {
    it('should be instantiated', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.component instanceof ButtonComponent).toBe(true);
    });

    it('should receive correct default classes', async function(this: ITestContext) {
      this.context = setupTestContext();
      const buttonElement = (this.context as ITestButtonContext).buttonElement;
      expect(buttonElement.classList.contains(BUTTON_CONSTANTS.classes.BUTTON)).toBe(true, 'Expected the default button class');

      // Waiting a frame because ForgeRipple doesn't set its classes until the next cycle
      await tick();
      expect(buttonElement.classList.contains('mdc-ripple-upgraded')).toBe(true, 'Expected the mdc-ripple-upgraded class');
    });

    it('should not receive other type classes', function(this: ITestContext) {
      this.context = setupTestContext();
      const buttonElement = (this.context as ITestButtonContext).buttonElement;
      expect(buttonElement.classList.contains(BUTTON_CONSTANTS.classes.BUTTON_RAISED)).not.toBe(true);
      expect(buttonElement.classList.contains(BUTTON_CONSTANTS.classes.BUTTON_DENSE)).not.toBe(true);
      expect(buttonElement.classList.contains(BUTTON_CONSTANTS.classes.BUTTON_OUTLINED)).not.toBe(true);
      expect(buttonElement.classList.contains(BUTTON_CONSTANTS.classes.BUTTON_UNELEVATED)).not.toBe(true);
    });

    it('should emit click event from button', function(this: ITestContext) {
      this.context = setupTestContext();
      const callback = jasmine.createSpy('callback');
      const buttonElement = (this.context as ITestButtonContext).buttonElement;
      buttonElement.addEventListener('click', callback);
      buttonElement.click();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should bubble click event through to component', function(this: ITestContext) {
      this.context = setupTestContext();
      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener('click', callback);
      const buttonElement = (this.context as ITestButtonContext).buttonElement;
      buttonElement.click();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should apply the correct default class to a dynamically added button', async function(this: ITestContext) {
      this.context = setupTestContext();
      const oldButton = this.context.component.querySelector('button');
      const newButton = document.createElement('button');
      if (oldButton) {
        oldButton.remove();
      } else {
        fail(`Button doesn't exist`);
      }
      this.context.component.append(newButton);
      await tick();
      expect(newButton.classList.contains(BUTTON_CONSTANTS.classes.BUTTON)).toBeTrue();
    });

    it('should apply the correct class and attribute to a dynamically added icon', async function(this: ITestContext) {
      this.context = setupTestContext();
      const icon = document.createElement('forge-icon');
      const buttonElement = (this.context as ITestButtonContext).buttonElement;
      buttonElement.prepend(icon);
      await tick();
      expect(icon.classList.contains(BUTTON_CONSTANTS.classes.ICON)).toBeTrue();
      expect(icon.getAttribute('aria-hidden') === 'true').toBeTrue();
    });
  });

  describe('partial rendering', function(this: ITestContext) {
    it('should wait for child elements before initialization', async function(this: ITestContext) {
      this.context = setupPartialTestContext();
      const buttonElement = document.createElement('button');
      buttonElement.textContent = 'BUTTON';
      this.context.component.appendChild(buttonElement);
      expect(buttonElement.classList.contains(BUTTON_CONSTANTS.classes.BUTTON)).toBe(false);
      await tick();
      expect(this.context.component.children.length).toBe(1);
      expect(buttonElement.classList.contains(BUTTON_CONSTANTS.classes.BUTTON)).toBe(true);
    });

    it('should not add classes if child is not a button', async function(this: ITestContext) {
      this.context = setupPartialTestContext();
      const span = document.createElement('span');
      this.context.component.appendChild(span);
      await tick();
      expect(span.classList.contains(BUTTON_CONSTANTS.classes.BUTTON)).toBe(false);
    });

    it('should allow for label element within button', async function(this: ITestContext) {
      this.context = setupPartialTestContext();
      const buttonElement = document.createElement('button');

      const labelElement = document.createElement('span');
      labelElement.textContent = 'BUTTON';
      buttonElement.appendChild(labelElement);

      this.context.component.appendChild(buttonElement);

      await tick();
      expect(labelElement.classList.contains(BUTTON_CONSTANTS.classes.LABEL)).toBe(true);
    });

    it('should allow for icon element within button', async function(this: ITestContext) {
      this.context = setupPartialTestContext();
      const buttonElement = document.createElement('button');

      const iconElement = document.createElement('i');
      iconElement.classList.add('tyler-icons');
      iconElement.textContent = 'face';
      buttonElement.appendChild(iconElement);

      this.context.component.appendChild(buttonElement);

      await tick();
      expect(iconElement.classList.contains(BUTTON_CONSTANTS.classes.ICON)).toBe(true);
      expect(iconElement.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('with raised type', function(this: ITestContext) {
    describe('set via property', function(this: ITestContext) {
      it('should mirror property to attribute', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.type = 'raised';
        expect(this.context.component.getAttribute(BUTTON_CONSTANTS.attributes.TYPE)).toBe('raised');
      });

      it('should set type via property', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.type = 'raised';
        const buttonElement = (this.context as ITestButtonContext).buttonElement;
        expect(buttonElement.classList.contains(BUTTON_CONSTANTS.classes.BUTTON_RAISED)).toBe(true);
      });
    });

    describe('set via property', function(this: ITestContext) {
      it('should set type via attribute', function(this: ITestContext) {
        this.context = setupTestContext('raised');
        this.context.component.setAttribute(BUTTON_CONSTANTS.attributes.TYPE, 'raised');
        expect(this.context.component.type).toBe('raised', 'Expected the type property to match the attribute value');
        const buttonElement = (this.context as ITestButtonContext).buttonElement;
        expect(buttonElement.classList.contains(BUTTON_CONSTANTS.classes.BUTTON_RAISED)).toBe(true);
      });
    });
  });

  describe('with unelevated type', function(this: ITestContext) {
    it('should set correct classes', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(BUTTON_CONSTANTS.attributes.TYPE, 'unelevated');
      const buttonElement = (this.context as ITestButtonContext).buttonElement;
      expect(buttonElement.classList.contains(BUTTON_CONSTANTS.classes.BUTTON_UNELEVATED)).toBe(true);
    });
  });

  describe('with outlined type', function(this: ITestContext) {
    it('should set correct classes', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(BUTTON_CONSTANTS.attributes.TYPE, 'outlined');
      const buttonElement = (this.context as ITestButtonContext).buttonElement;
      expect(buttonElement.classList.contains(BUTTON_CONSTANTS.classes.BUTTON_OUTLINED)).toBe(true);
    });
  });

  describe('with dense type', function(this: ITestContext) {
    it('should set correct classes', function(this: ITestContext) {
      this.context = setupTestContext();
      const buttonElement = (this.context as ITestButtonContext).buttonElement;
      this.context.component.setAttribute(BUTTON_CONSTANTS.attributes.TYPE, 'dense');
      expect(buttonElement.classList.contains(BUTTON_CONSTANTS.classes.BUTTON_DENSE)).toBe(true);
    });
  });

  function setupTestContext(typeAttribute?: string): ITestButtonContext {
    const fixture = document.createElement('div');
    fixture.id = 'button-test-fixture';
    const component = document.createElement(BUTTON_CONSTANTS.elementName) as IButtonComponent;
    if (typeAttribute) {
      component.setAttribute(BUTTON_CONSTANTS.attributes.TYPE, typeAttribute);
    }
    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'BUTTON';
    component.appendChild(buttonElement);
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      buttonElement,
      destroy: () => removeElement(fixture)
    };
  }

  function setupPartialTestContext(): ITestPartialButtonContext {
    const fixture = document.createElement('div');
    fixture.id = 'button-test-fixture';
    const component = document.createElement(BUTTON_CONSTANTS.elementName) as IButtonComponent;
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }
});

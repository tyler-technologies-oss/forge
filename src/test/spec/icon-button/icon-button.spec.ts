import { ForgeRipple } from '@tylertech/forge/ripple';
import { removeElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';
import { defineIconButtonComponent, ICON_BUTTON_CONSTANTS, IIconButtonComponent } from '@tylertech/forge/icon-button';

interface ITestContext {
  context: ITestIconButtonContext
}

interface ITestIconButtonContext {
  component: IIconButtonComponent;
  getButtonElement(): HTMLButtonElement;
  getIconElements(): NodeListOf<HTMLElement>;
  append(): void;
  destroy(): void;
}

describe('IconButtonComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineIconButtonComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('toggle off', function(this: ITestContext) {
    it('should be connected', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.isConnected).toBe(true);
    });

    it('should not be in toggle mode by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.toggle).toBe(false);
    });

    it('should not intialize if no button element is provided', function(this: ITestContext) {
      this.context = setupTestContext(false, false, false);
      expect(this.context.component['rippleInstance']).toBeUndefined();
    });

    it('should receive correct class', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      expect(this.context.getButtonElement().classList.contains(ICON_BUTTON_CONSTANTS.classes.BUTTON)).toBe(true);
    });

    it('should instantiate unbounded ripple', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      const button = this.context.getButtonElement();
      await tick();
      expect(button.classList.contains('mdc-ripple-upgraded')).toBe(true);
      expect(button.classList.contains('mdc-ripple-upgraded--unbounded')).toBe(true);
    });
  });

  describe('toggle on', function(this: ITestContext) {
    it('should be off by default', async function(this: ITestContext) {
      this.context = setupTestContext(true, true);
      await tick();
      expect(this.context.component.isOn).toBe(false);
      expect(this.context.getButtonElement().classList.contains('forge-icon-button--on')).toBe(false);
    });

    it('should set correct classes on icon elements', async function(this: ITestContext) {
      this.context = setupTestContext(true, true);
      await tick();
      const icons = this.context.getIconElements();
      expect(icons.item(0).classList.contains('forge-icon-button__icon')).toBe(true);
      expect(icons.item(1).classList.contains('forge-icon-button__icon')).toBe(true);
    });

    it('should show off icon by default', async function(this: ITestContext) {
      this.context = setupTestContext(true, true);
      await tick();
      const icons = this.context.getIconElements();
      await tick();
      expect(getComputedStyle(icons.item(0)).display).toBe('none');
      expect(getComputedStyle(icons.item(1)).display).not.toBe('none');
    });

    it('should emit change event when clicked', async function(this: ITestContext) {
      this.context = setupTestContext(true, true);
      const button = this.context.getButtonElement();
      const callback = jasmine.createSpy('callback');
      this.context.component.addEventListener(ICON_BUTTON_CONSTANTS.events.CHANGE, callback);
      await tick();
      button.click();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(jasmine.any(CustomEvent));
      expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({ detail: true }));
    });

    it('should use attribute to find on icon', async function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      const button = this.context.getButtonElement();
      const icons = this.context.getIconElements();

      // Move the "off" icon before the "on" icon
      button.insertAdjacentElement('afterbegin', icons.item(1));

      // Add the "on" attribute to the "on" icon
      icons.item(0).setAttribute(ICON_BUTTON_CONSTANTS.attributes.ICON_ON, '');

      this.context.append();

      await tick();

      const renderedIcons = button.querySelectorAll('i') as NodeListOf<HTMLElement>;
      expect(renderedIcons.item(1).classList.contains('forge-icon-button__icon--on')).toBe(true);
    });

    it('should throw error when icon count does not match 2', async function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      const button = this.context.getButtonElement();
      const icon = document.createElement('i') as HTMLElement;
      icon.textContent = 'face';
      button.appendChild(icon);

      const onerror = spyOn<any>(window, 'onerror');
      this.context.append();
      await tick();
      expect(onerror).toHaveBeenCalledTimes(1);
    });

    it('should use toggle when set via attribute', async function(this: ITestContext) {
      this.context = setupTestContext(false, true);
      this.context.component.toggle = false;
      this.context.component.setAttribute(ICON_BUTTON_CONSTANTS.attributes.TOGGLE, '');
      this.context.append();
      await tick();
      expect(this.context.component.toggle).toBe(true);
    });

    it('should toggle on and off', async function(this: ITestContext) {
      this.context = setupTestContext(true, true);
      await tick();
      const button = this.context.getButtonElement();
      const icons = this.context.getIconElements();
      button.click();
      await tick();
      expect(getComputedStyle(icons.item(0)).display).not.toBe('none');
      expect(getComputedStyle(icons.item(1)).display).toBe('none');
      await tick();
      button.click();
      await tick();
      expect(getComputedStyle(icons.item(0)).display).toBe('none');
      expect(getComputedStyle(icons.item(1)).display).not.toBe('none');
    });
  });

  describe('density', function(this: ITestContext) {    
    it('should be non-dense by default', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      expect(this.context.component.dense).toBe(false);
      expect(this.context.component.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSE)).toBe(false);
      expect(this.context.getButtonElement().classList.contains(ICON_BUTTON_CONSTANTS.classes.BUTTON_DENSE)).toBe(false);
    });

    it('should set dense via property', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      this.context.component.dense = true;
      expect(this.context.component.dense).toBe(true);
      expect(this.context.component.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSE)).toBe(true);
      expect(this.context.getButtonElement().classList.contains(ICON_BUTTON_CONSTANTS.classes.BUTTON_DENSE)).toBe(true);
    });

    it('should set dense via attribute', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      this.context.component.setAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSE, '');
      expect(this.context.component.dense).toBe(true);
      expect(this.context.component.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSE)).toBe(true);
      expect(this.context.getButtonElement().classList.contains(ICON_BUTTON_CONSTANTS.classes.BUTTON_DENSE)).toBe(true);
    });

    it('should set density with only unique values', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      const applyDensitySpy = spyOn<any>(this.context.component, '_applyDensity');
      expect(applyDensitySpy.calls.count()).toBe(0);
      await tick();
      this.context.component.dense = true;
      expect(applyDensitySpy.calls.count()).toBe(1);
      await tick();
      this.context.component.dense = true;
      expect(applyDensitySpy.calls.count()).toBe(1);
    });
  });

  describe('is on', function(this: ITestContext) {
    it('should be off be default', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      expect(this.context.component.isOn).toBe(false);
      expect(this.context.getButtonElement().classList.contains(ICON_BUTTON_CONSTANTS.classes.BUTTON_ON)).toBe(false);
    });

    it('should set isOn via property', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      this.context.component.isOn = true;
      expect(this.context.component.isOn).toBe(true);
      expect(this.context.getButtonElement().classList.contains(ICON_BUTTON_CONSTANTS.classes.BUTTON_ON)).toBe(true);
      this.context.component.isOn = false;
      expect(this.context.component.isOn).toBe(false);
      expect(this.context.getButtonElement().classList.contains(ICON_BUTTON_CONSTANTS.classes.BUTTON_ON)).toBe(false);
    });

    it('should set isOn via attribute', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      this.context.component.setAttribute(ICON_BUTTON_CONSTANTS.attributes.IS_ON, '');
      expect(this.context.component.isOn).toBe(true);
      expect(this.context.component.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.IS_ON)).toBe(true);
      expect(this.context.getButtonElement().classList.contains(ICON_BUTTON_CONSTANTS.classes.BUTTON_ON)).toBe(true);
    });

    it('should set isOn with only unique values', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      const applyToggleSpy = spyOn<any>(this.context.component, '_applyToggle');
      expect(applyToggleSpy.calls.count()).toBe(0);
      await tick();
      this.context.component.isOn = true;
      expect(applyToggleSpy.calls.count()).toBe(1);
      await tick();
      this.context.component.isOn = true;
      expect(applyToggleSpy.calls.count()).toBe(1);
    });
  });

  describe('density level', function(this: ITestContext) {
    it('should set density level be default', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      expect(this.context.component.densityLevel).toBe(5);
      expect(this.context.component.getAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSE)).toBeNull();
    });

    it('should set density level via property', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      this.context.component.dense = true;
      this.context.component.densityLevel = 3
      const densityLevelClass = ICON_BUTTON_CONSTANTS.classes.DENSITY[2];
      expect(this.context.getButtonElement().classList.contains(densityLevelClass)).toBe(true);
    });

    it('should not apply density level if dense is off', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      this.context.component.densityLevel = 3
      const densityLevelClass = ICON_BUTTON_CONSTANTS.classes.DENSITY[2];
      expect(this.context.getButtonElement().classList.contains(densityLevelClass)).toBe(false);
    });

    it('should set density level via property', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      this.context.component.densityLevel = 3;
      expect(this.context.component.densityLevel).toBe(3);
      this.context.component.densityLevel = 5;
      expect(this.context.component.densityLevel).toBe(5);
    });

    it('should set density level with only unique values', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      const applyDensitySpy = spyOn<any>(this.context.component, '_applyDensity');
      expect(applyDensitySpy.calls.count()).toBe(0);
      await tick();
      this.context.component.densityLevel = 3;
      expect(applyDensitySpy.calls.count()).toBe(1);
      await tick();
      this.context.component.densityLevel = 3;
      expect(applyDensitySpy.calls.count()).toBe(1);
    });

    it('should set density level to 1 when value is less than 1', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      this.context.component.dense = true;
      this.context.component.densityLevel = -1;
      expect(this.context.component.densityLevel).toBe(1);
      const densityLevelClass = ICON_BUTTON_CONSTANTS.classes.DENSITY[0];
      expect(this.context.getButtonElement().classList.contains(densityLevelClass)).toBe(true);
    });

    it('should set density level to 6 when value is greater than 6', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      this.context.component.densityLevel = 7;
      expect(this.context.component.densityLevel).toBe(6);
    });

    it('should set density level to 5 when value is not a number', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      this.context.component.densityLevel = 3;
      expect(this.context.component.densityLevel).toBe(3);
      this.context.component.densityLevel = undefined as unknown as number;
      expect(this.context.component.densityLevel).toBe(5);
    });
  });

  describe('ripple', function(this: ITestContext) {
    it('should reset ripple when initializing', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      const ripple: ForgeRipple = this.context.component['_rippleInstance'];
      const rippleDestroySpy = spyOn(ripple, 'destroy');
      expect(rippleDestroySpy.calls.count()).toBe(0);
      this.context.component['_initialize']();
      expect(rippleDestroySpy.calls.count()).toBe(1);
    });

    it('should layout the ripple via component', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      const ripple: ForgeRipple = this.context.component['_rippleInstance'];
      const rippleLayoutSpy = spyOn(ripple, 'layout');
      expect(rippleLayoutSpy.calls.count()).toBe(0);
      this.context.component.layout();
      expect(rippleLayoutSpy.calls.count()).toBe(1);
    });
  });

  describe('without button element by default', function(this: ITestContext) {
    it('should not initialize', async function(this: ITestContext) {
      this.context = setupTestContext(true, false, false);
      await tick();
      expect(this.context.component['_buttonElement']).toBeFalsy();
    });
  });

  function setupTestContext(append = false, isToggle = false, hasButton = true): ITestIconButtonContext {
    const fixture = document.createElement('div');
    fixture.id = 'icon-button-test-fixture';
    const component = document.createElement(ICON_BUTTON_CONSTANTS.elementName) as IIconButtonComponent;    
    if (hasButton) {
      const button = document.createElement('button');  
      if (isToggle) {
        component.toggle = true;        
        const onIcon = document.createElement('i');
        onIcon.classList.add('tyler-icons');
        onIcon.textContent = 'favorite';  
        const offIcon = document.createElement('i');
        offIcon.classList.add('tyler-icons');
        offIcon.textContent = 'favorite_outline';        
        button.appendChild(onIcon);
        button.appendChild(offIcon);
      } else {
        button.textContent = 'Button Text';
      }  
      component.appendChild(button);
    }
    fixture.appendChild(component);
    if (append) document.body.appendChild(fixture);
    return {
      component,
      getButtonElement: () => component.querySelector('button') as HTMLButtonElement,
      getIconElements: () => component.querySelectorAll('i') as NodeListOf<HTMLElement>,
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }
});

import { getShadowElement, parseStyle, removeElement, getActiveElement } from '@tylertech/forge-core';
import { tick, timer } from '@tylertech/forge-testing';
import { definePopupComponent, IPopupComponent, IPopupPosition, PopupAnimationType, POPUP_CONSTANTS } from '@tylertech/forge/popup';
import { tryCleanupPopups } from '../../utils';

interface ITestContext {
  context: ITestPopUpContext;
}

interface ITestPopUpContext {
  hostElement: HTMLElement;
  targetElement: HTMLElement;
  component: IPopupComponent;
  rootElement: HTMLElement;
  destroy(): void;
}

describe('Popup component', function(this: ITestContext) {

  beforeAll(function(this: ITestContext) {
    definePopupComponent();
  });

  function setupTestContext(): ITestPopUpContext {
    const hostElement = document.createElement('div');
    const targetElement = document.createElement('button');
    targetElement.style.height = '10px';
    targetElement.style.width = '20px';
    targetElement.style.margin = '150px';
    hostElement.appendChild(targetElement);
    document.body.appendChild(hostElement);

    const component = document.createElement(POPUP_CONSTANTS.elementName) as IPopupComponent;
    const popupContent = document.createElement('div');
    popupContent.style.height = '100px';
    popupContent.style.width = '100px';
    component.appendChild(popupContent);
    const rootElement = getShadowElement(component, POPUP_CONSTANTS.selectors.CONTAINER);
    return {
      hostElement,
      targetElement,
      component,
      rootElement,
      destroy: () => {
        removeElement(hostElement);
        tryCleanupPopups();
      }
    };
  }

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should be instantiated', function(this: ITestContext) {
    this.context = setupTestContext();
    const { component } = this.context;
    expect(component).toBeDefined();
  });

  it('should have proper default values', function(this: ITestContext) {
    this.context = setupTestContext();
    const { component } = this.context;
    expect(component.targetElement).toBeUndefined('expected targetElement to be undefined');
    expect(component.placement).toBe('bottom-start', 'Expected placement to be bottom-start');
    expect(component.open).toBe(false, 'Expected open to be false');
    expect(component.openCallback).toBe(undefined, 'Expected openCallback to be undefined');
    expect(component.closeCallback).toBe(undefined, 'Expected closeCallback to be undefined');
  });

  it('should reflect attributes to component properties', function(this: ITestContext) {
    this.context = setupTestContext();
    const { component } = this.context;
    component.setAttribute(POPUP_CONSTANTS.attributes.PLACEMENT, 'top-right');
    document.body.appendChild(component);
    expect(component.placement).toBe('top-right');
    component.remove();
  });

  it('should handle undefined values', function(this: ITestContext) {
    this.context = setupTestContext();
    const { component } = this.context;
    component.placement = undefined as any;
    expect(component.placement).toBe('bottom-start');
    component.open = undefined as any;
    expect(component.open).toBe(false);
  });

  it('should get and set the target element', function(this: ITestContext) {
    this.context = setupTestContext();
    const { component, targetElement } = this.context;
    component.targetElement = targetElement;
    expect(component.targetElement).toBe(targetElement);
  });

  it('should get and set the placement', function(this: ITestContext) {
    this.context = setupTestContext();
    const { component,  } = this.context;
    component.placement = 'top-end';
    expect(component.placement).toBe('top-end');
    component.setAttribute(POPUP_CONSTANTS.attributes.PLACEMENT, 'bottom-start');
    expect(component.placement).toBe('bottom-start');
    component.removeAttribute(POPUP_CONSTANTS.attributes.PLACEMENT);
  });

  it('should open and close the popup', function(this: ITestContext) {
    this.context = setupTestContext();
    const { component, targetElement } = this.context;
    component.targetElement = targetElement;
    component.open = true;
    expect(component.isConnected).toBeTrue();
    component.open = false;
    expect(component.isConnected).toBeFalse();
  });

  it('should emit open and close events from the targetElement', function(this: ITestContext) {
    this.context = setupTestContext();
    const { component, targetElement } = this.context;
    component.targetElement = targetElement;
    const callback = jasmine.createSpy('callback');
    targetElement.addEventListener(POPUP_CONSTANTS.events.OPEN, callback);
    targetElement.addEventListener(POPUP_CONSTANTS.events.CLOSE, callback);
    component.open = true;
    expect(callback).toHaveBeenCalledTimes(1);
    component.open = false;
    expect(callback).toHaveBeenCalledTimes(2);
    targetElement.removeEventListener(POPUP_CONSTANTS.events.OPEN, callback);
    targetElement.removeEventListener(POPUP_CONSTANTS.events.CLOSE, callback);
  });

  it('should accept and return focus on open and close', async function(this: ITestContext) {
    this.context = setupTestContext();
    const { component, targetElement } = this.context;
    component.targetElement = targetElement;
    targetElement.focus();
    expect(document.activeElement).toBe(targetElement);
    component.open = true;
    await tick();
    component.open = false;
    await timer(POPUP_CONSTANTS.numbers.ANIMATION_DURATION);
    expect(document.activeElement).toBe(targetElement);
  });

  it('should append to body', function(this: ITestContext) {
    this.context = setupTestContext();
    const { component, targetElement } = this.context;
    component.targetElement = targetElement;
    component.open = true;
    expect(component.parentElement).toBe(document.body);
  });

  it('should emit a position event', async function(this: ITestContext) {
    this.context = setupTestContext();

    const { component, targetElement } = this.context;
    component.targetElement = targetElement;
    targetElement.focus();

    const callback = jasmine.createSpy('position callback');
    component.addEventListener(POPUP_CONSTANTS.events.POSITION, callback);

    component.open = true;

    await tick();

    expect(callback).toHaveBeenCalled();
  });

  describe('should call the openCallback function', function(this: ITestContext) {
    it('should open when resolved', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement } = this.context;
      let resolved = false;
      const openCallback = () => {
        return new Promise<void>(resolve => {
          resolved = true;
          resolve();
        });
      };

      component.targetElement = targetElement;
      component.openCallback = openCallback;
      component.open = true;

      await timer(100);
      expect(resolved).toBe(true);
      expect(component.open).toBeTrue();
      expect(component.isConnected).toBeTrue();
    });

    it('should not open when rejecting', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement } = this.context;
      let cancelled = false;
      const openCallback = () => {
        return new Promise<boolean>((resolve, reject) => {
          cancelled = true;
          reject();
        });
      };

      component.targetElement = targetElement;
      component.openCallback = openCallback;
      component.open = true;

      await timer(100);
      expect(cancelled).toBe(true);
      expect(component.open).toBeFalse();
      expect(component.isConnected).toBeFalse();
    });
  });

  describe('should call the closeCallback function', function(this: ITestContext) {
    it('should close when resolved', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement } = this.context;
      let resolved = false;
      const closeCallback = () => {
        return new Promise<boolean>(resolve => {
          resolved = true;
          resolve(true);
        });
      };

      component.targetElement = targetElement;
      component.closeCallback = closeCallback;
      component.open = true;
      expect(component.isConnected).toBeTrue();
      component.open = false;
      await timer(100);
      expect(resolved).toBe(true);
      expect(component.isConnected).toBeFalse();
    });

    it('should not close when rejecting', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement } = this.context;
      let rejected = false;
      const closeCallback = () => {
        return new Promise<boolean>((resolve, reject) => {
          rejected = true;
          reject();
        });
      };

      component.targetElement = targetElement;
      component.closeCallback = closeCallback;
      component.open = true;
      expect(component.isConnected).toBeTrue();
      component.open = false;
      await timer(100);
      expect(rejected).toBe(true);
      expect(component.isConnected).toBeTrue();
    });
  });

  describe('attributes', () => {
    it('manageFocus should focus popup when true', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement } = this.context;
      component.targetElement = targetElement;
      component.setAttribute(POPUP_CONSTANTS.attributes.MANAGE_FOCUS, '');
      component.open = true;
      await tick();

      expect(getActiveElement()).toBe(component);
    });

    it('manageFocus should not focus popup when true', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement } = this.context;
      component.targetElement = targetElement;
      component.setAttribute(POPUP_CONSTANTS.attributes.MANAGE_FOCUS, '');
      component.removeAttribute(POPUP_CONSTANTS.attributes.MANAGE_FOCUS);
      component.open = true;
      await tick();

      expect(getActiveElement()).not.toBe(component);
    });

    it('animationType should set the correct root styles', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement, rootElement } = this.context;
      component.targetElement = targetElement;
      component.setAttribute(POPUP_CONSTANTS.attributes.ANIMATION_TYPE, PopupAnimationType.Dropdown);
      component.open = true;
      await tick();

      expect(rootElement.classList.contains(POPUP_CONSTANTS.classes.SELECT)).toBe(true, `the root element does not have the correct ${POPUP_CONSTANTS.classes.SELECT}`);
    });

    it('static should not allow close on blur', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement } = this.context;
      component.targetElement = targetElement;
      component.setAttribute(POPUP_CONSTANTS.attributes.STATIC, '');
      component.open = true;
      await tick();
      component.dispatchEvent(new Event('blur'));
      await tick();

      expect(component.open).toBe(true);
    });

    it('static should not allow close on blur', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement } = this.context;
      component.targetElement = targetElement;
      component.setAttribute(POPUP_CONSTANTS.attributes.STATIC, '');
      component.open = true;
      await tick();
      component.dispatchEvent(new Event('blur'));
      await tick();
      expect(component.open).toBe(true);
    });
  });

  describe('properties', function(this: ITestContext) {
    it('manageFocus should focus popup when true', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement } = this.context;
      component.targetElement = targetElement;
      component.manageFocus = true;
      component.open = true;
      await tick();

      expect(getActiveElement()).toBe(component);
      expect(component.manageFocus).toBe(true);
    });

    it('manageFocus should not focus popup when true', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement } = this.context;
      component.targetElement = targetElement;
      component.manageFocus = false;
      component.open = true;
      await tick();

      expect(getActiveElement()).not.toBe(component);
      expect(component.manageFocus).toBe(false);
    });

    it('animationType should set the correct root styles as dropdown', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement, rootElement } = this.context;
      component.targetElement = targetElement;
      component.animationType = PopupAnimationType.Dropdown;
      component.open = true;
      await tick();

      expect(rootElement.classList.contains(POPUP_CONSTANTS.classes.SELECT)).toBe(true, `the root element does not have the correct ${POPUP_CONSTANTS.classes.SELECT}`);
      expect(component.animationType).toBe(PopupAnimationType.Dropdown);
    });

    it('animationType should not add root styles as menu', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement, rootElement } = this.context;
      component.targetElement = targetElement;
      component.animationType = PopupAnimationType.Menu;
      component.open = true;
      await tick();

      expect(rootElement.classList.contains(POPUP_CONSTANTS.classes.SELECT)).toBe(false, `the root element does not have the correct ${POPUP_CONSTANTS.classes.SELECT}`);
      expect(component.animationType).toBe(PopupAnimationType.Menu);
    });

    it('animationType should not add root styles as none', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement, rootElement } = this.context;
      component.targetElement = targetElement;
      component.animationType = PopupAnimationType.None;
      component.open = true;
      await tick();

      expect(rootElement.classList.contains(POPUP_CONSTANTS.classes.SELECT)).toBe(false, `the root element does not have the correct ${POPUP_CONSTANTS.classes.SELECT}`);
      expect(component.animationType).toBe(PopupAnimationType.None);
    });

    it('should allow close on blur when static is false', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement } = this.context;
      component.targetElement = targetElement;
      component.static = false;
      component.open = true;
      await tick();
      component.dispatchEvent(new Event('blur'));
      await tick();
      expect(component.open).toBe(false);
      expect(component.static).toBe(false);
    });

    it('static should not allow close on blur when true', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement } = this.context;
      component.targetElement = targetElement;
      component.static = true;
      component.open = true;
      await tick();
      component.dispatchEvent(new Event('blur'));
      await tick();
      expect(component.open).toBe(true);
      expect(component.static).toBe(true);
    });

    it('targetElement should throw if set to something other than an element', function(this: ITestContext) {
      this.context = setupTestContext();
      const { component } = this.context;
      const action = () => {
        component.targetElement = undefined as any;
      };

      expect(action).toThrowError('targetElement on Popup component must be an HTMLElement');
    });

    it('open should throw if target is not an element', function(this: ITestContext) {
      this.context = setupTestContext();
      const { component } = this.context;
      const action = () => {
        component.open = true;
      };

      expect(action).toThrowError();
    });
  });

  describe('methods', function(this: ITestContext) {
    it('position', async function(this: ITestContext) {
      this.context = setupTestContext();
      const { component, targetElement } = this.context;
      component.targetElement = targetElement;

      expect(component.style.top).toBe('');
      component.position();
      await tick();

      expect(component.style.top).not.toBe('');
    });
  });

  it('should disconnect correctly if removed when opened', function(this: ITestContext) {
    this.context = setupTestContext();
    const { component, targetElement } = this.context;
    component.targetElement = targetElement;
    component.open = true;
    removeElement(component);

    expect(component.isConnected).toBe(false);
  });

  function getComponentPosition(component: IPopupComponent): IPopupPosition {
    const { x, y } = component.getBoundingClientRect();
    return { x, y };
  }
});

import { getShadowElement, removeElement } from '@tylertech/forge-core';
import { dispatchNativeEvent, tick, timer } from '@tylertech/forge-testing';
import { BACKDROP_CONSTANTS } from '@tylertech/forge';
import { BASE_DRAWER_CONSTANTS, defineModalDrawerComponent, IModalDrawerComponent, MODAL_DRAWER_CONSTANTS } from '@tylertech/forge/drawer';

interface ITestContext {
  context: ITestModalDrawerContext;
}

interface ITestModalDrawerContext {
  component: IModalDrawerComponent;
  append(): void;
  destroy(): void;
}

describe('ModalDrawerComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineModalDrawerComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should show backdrop when defaulting to open', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(BASE_DRAWER_CONSTANTS.attributes.OPEN, '');
    this.context.append();
    const backdrop = getShadowElement(this.context.component, BACKDROP_CONSTANTS.elementName);
    
    await tick();

    expect(backdrop).toBeTruthy();
    expect(backdrop.hasAttribute('hidden')).toBeFalse();
  });

  it('should close when backdrop is clicked', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.open = true;
    this.context.append();
    await timer(100);
    const backdrop = getShadowElement(this.context.component, BACKDROP_CONSTANTS.elementName);
    const backdropElement = getShadowElement(backdrop, BACKDROP_CONSTANTS.selectors.CONTAINER);
    dispatchNativeEvent(backdropElement, 'click');
    await tick();
    expect(this.context.component.open).toBe(false);
  });

  it('should emit a close event when backdrop is clicked', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.open = true;
    this.context.append();

    const callback = jasmine.createSpy('close callback');
    this.context.component.addEventListener(MODAL_DRAWER_CONSTANTS.events.CLOSE, callback);
    await timer(100);
    const backdrop = getShadowElement(this.context.component, BACKDROP_CONSTANTS.elementName);
    const backdropElement = getShadowElement(backdrop, BACKDROP_CONSTANTS.selectors.CONTAINER);
    dispatchNativeEvent(backdropElement, 'click');
    await tick();

    expect(this.context.component.open).toBe(false);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not close backdrop when clicked if close event is cancelled', async function (this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.open = true;
    this.context.append();
    this.context.component.addEventListener(MODAL_DRAWER_CONSTANTS.events.CLOSE, evt => evt.preventDefault());
    await timer(100);
    await tick();

    const backdrop = getShadowElement(this.context.component, BACKDROP_CONSTANTS.elementName);
    const backdropElement = getShadowElement(backdrop, BACKDROP_CONSTANTS.selectors.CONTAINER);
    dispatchNativeEvent(backdropElement, 'click');
    await tick();

    expect(this.context.component.open).toBe(true);
  });

  it('should not show backdrop when open is set to false by default', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.append();

    await tick();
    const backdrop = getShadowElement(this.context.component, BACKDROP_CONSTANTS.elementName);
    const backdropStyle = getComputedStyle(backdrop);

    expect(backdrop.hasAttribute('hidden')).toBeTrue();
    expect(backdropStyle.display).toBe('none');
  });

  it('should transition to open when modal opens', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.open = false;
    this.context.append();
    await tick();

    expect(this.context.component.open).toBe(false);

    const drawerElement = getShadowElement(this.context.component, BASE_DRAWER_CONSTANTS.selectors.DRAWER);
    this.context.component.open = true;

    expect(drawerElement.classList.contains(BASE_DRAWER_CONSTANTS.classes.CLOSED)).toBeFalse();
  });

  it('should emit after open event when open animation completes', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(BASE_DRAWER_CONSTANTS.attributes.OPEN, 'false');
    this.context.append();

    const afterOpenSpy = jasmine.createSpy('after open');
    this.context.component.addEventListener(BASE_DRAWER_CONSTANTS.events.AFTER_OPEN, afterOpenSpy);

    this.context.component.open = true;

    // transition events do not run in jasmine so we need to trigger it ourselves
    const drawerElement = getShadowElement(this.context.component, BASE_DRAWER_CONSTANTS.selectors.DRAWER) as HTMLElement;
    drawerElement.dispatchEvent(new TransitionEvent('transitionend', { propertyName: 'transform' }));

    expect(afterOpenSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit after close event when close animation completes', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.setAttribute(BASE_DRAWER_CONSTANTS.attributes.OPEN, '');

    const afterCloseSpy = jasmine.createSpy('after close');
    this.context.component.addEventListener(BASE_DRAWER_CONSTANTS.events.AFTER_CLOSE, afterCloseSpy);

    this.context.component.open = false;

    // transition events do not run in jasmine so we need to trigger it ourselves
    const drawerElement = getShadowElement(this.context.component, BASE_DRAWER_CONSTANTS.selectors.DRAWER) as HTMLElement;
    drawerElement.dispatchEvent(new TransitionEvent('transitionend', { propertyName: 'transform' }));

    expect(afterCloseSpy).toHaveBeenCalledTimes(1);
  });

  function setupTestContext(append = false): ITestModalDrawerContext {
    const content = document.createElement('div');
    content.style.width = '256px';
    content.style.height = '5000px';

    const component = document.createElement('forge-modal-drawer');
    component.appendChild(content);

    const fixture = document.createElement('div');
    fixture.id = 'modal-drawer-test-fixture';
    fixture.appendChild(component);

    if (append) {
      document.body.appendChild(fixture);
    }

    return {
      component,
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }
});

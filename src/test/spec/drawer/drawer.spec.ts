import { getShadowElement, removeElement } from '@tylertech/forge-core';
import { frame } from '@tylertech/forge/core/utils/utils';
import { defineDrawerComponent, IDrawerComponent, BASE_DRAWER_CONSTANTS } from '@tylertech/forge/drawer';

interface ITestContext {
  context: ITestDrawerContext;
}

interface ITestDrawerContext {
  component: IDrawerComponent;
  append(): void;
  destroy(): void;
}

describe('MiniDrawerComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineDrawerComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate drawer instance', function (this: ITestContext) {
    this.context = setupTestContext(true);
    
    expect(this.context.component.isConnected).toBe(true);
  });

  it('should be open by default', function (this: ITestContext) {
    this.context = setupTestContext(true);

    expect(this.context.component.open).toBe(true);
  });

  it('should open the drawer when closed', async function (this: ITestContext) {
    this.context = setupTestContext();
    await frame();
    this.context.component.open = false;
    this.context.append();

    expect(this.context.component.open).toBe(false);

    this.context.component.open = true;
    await frame();

    expect(this.context.component.open).toBe(true);
  });

  it('should render with right direction via property', function (this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.direction = 'right';
    this.context.append();

    const root = getShadowElement(this.context.component, BASE_DRAWER_CONSTANTS.selectors.DRAWER);

    expect(root.classList.contains(BASE_DRAWER_CONSTANTS.classes.LEFT)).toBe(false);
    expect(root.classList.contains(BASE_DRAWER_CONSTANTS.classes.RIGHT)).toBe(true);
  });

  it('should render with right direction via attribute', function (this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(BASE_DRAWER_CONSTANTS.attributes.DIRECTION, 'right');
    this.context.append();

    const root = getShadowElement(this.context.component, BASE_DRAWER_CONSTANTS.selectors.DRAWER);

    expect(root.classList.contains(BASE_DRAWER_CONSTANTS.classes.LEFT)).toBe(false);
    expect(root.classList.contains(BASE_DRAWER_CONSTANTS.classes.RIGHT)).toBe(true);
  });

  it('should change direction after initial direction', async function (this: ITestContext) {
    this.context = setupTestContext(true);

    const root = getShadowElement(this.context.component, BASE_DRAWER_CONSTANTS.selectors.DRAWER);
    await frame();
    this.context.component.direction = 'right';

    expect(root.classList.contains(BASE_DRAWER_CONSTANTS.classes.LEFT)).toBe(false);
    expect(root.classList.contains(BASE_DRAWER_CONSTANTS.classes.RIGHT)).toBe(true);
  });

  ///

  it('should default to left direction', function(this: ITestContext) {
    this.context = setupTestContext(true);
    const root = getShadowElement(this.context.component, BASE_DRAWER_CONSTANTS.selectors.DRAWER);

    expect(this.context.component.direction).toBe('left');
    expect(root.classList.contains(BASE_DRAWER_CONSTANTS.classes.LEFT));
  });

  it('should be open by default', function(this: ITestContext) {
    this.context = setupTestContext(true);

    expect(this.context.component.open).toBe(true);
  });

  it('should allow opening of drawer', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    const root = getShadowElement(this.context.component, BASE_DRAWER_CONSTANTS.selectors.DRAWER);

    await frame();
    this.context.component.open = true;
    await frame();

    expect(this.context.component.open).toBe(true);
    expect(root.classList.contains(BASE_DRAWER_CONSTANTS.classes.CLOSED)).toBe(false);
  });

  it('should close drawer after defaulting to open', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(BASE_DRAWER_CONSTANTS.attributes.OPEN, '');
    this.context.append();

    const root = getShadowElement(this.context.component, BASE_DRAWER_CONSTANTS.selectors.DRAWER);
    await frame();
    this.context.component.open = false;

    expect(root.classList.contains(BASE_DRAWER_CONSTANTS.classes.CLOSING)).toBe(true);
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

    const afterCloseSpy = jasmine.createSpy('after close');
    this.context.component.addEventListener(BASE_DRAWER_CONSTANTS.events.AFTER_CLOSE, afterCloseSpy);
    this.context.component.open = false;

    // transition events do not run in jasmine so we need to trigger it ourselves
    const drawerElement = getShadowElement(this.context.component, BASE_DRAWER_CONSTANTS.selectors.DRAWER) as HTMLElement;
    drawerElement.dispatchEvent(new TransitionEvent('transitionend', { propertyName: 'transform' }));

    expect(afterCloseSpy).toHaveBeenCalledTimes(1);
  });

  function setupTestContext(append = false): ITestDrawerContext {
    const content = document.createElement('div');
    content.style.width = '256px';
    content.style.height = '5000px';

    const component = document.createElement('forge-drawer');
    component.appendChild(content);

    const fixture = document.createElement('div');
    fixture.id = 'drawer-test-fixture';
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

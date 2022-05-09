import { removeElement } from '@tylertech/forge-core';
import { defineRippleComponent, IRippleComponent, RIPPLE_CONSTANTS } from '@tylertech/forge/ripple';
import { ForgeRipple } from '@tylertech/forge/ripple/forge-ripple';

interface ITestContext {
  context: ITestRippleContext;
}

interface ITestRippleContext {
  component: IRippleComponent;
  rippleSurface: HTMLElement;
  getRippleInstance(): ForgeRipple;
  append(): void;
  destroy(): void;
}

describe('RippleComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineRippleComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should attach styles to closest previous sibling over parent', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.target = '#id';
    this.context.append();
    expect(this.context.rippleSurface.classList.contains(RIPPLE_CONSTANTS.classes.SURFACE)).toBe(true, 'component did not set the correct class');
  });

  it('should attach styles to target without hashtag', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.target = 'id';
    this.context.append();

    expect(this.context.rippleSurface.classList.contains(RIPPLE_CONSTANTS.classes.SURFACE)).toBe(true, 'component did not set the correct class');
  });

  it('should attach styles to target without hashtag with attribute set', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(RIPPLE_CONSTANTS.attributes.TARGET, '#id');
    this.context.append();

    expect(this.context.rippleSurface.classList.contains(RIPPLE_CONSTANTS.classes.SURFACE)).toBe(true, 'component did not set the correct class');
  });

  it('should set unbounded via property', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.unbounded = true;
    this.context.append();
    
    expect(this.context.getRippleInstance().unbounded).toBeTrue();
  });

  it('should set unbounded via attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(RIPPLE_CONSTANTS.attributes.UNBOUNDED, '');
    this.context.append();

    expect(this.context.getRippleInstance().unbounded).toBeTrue();
  });

  it('should toggle unbounded', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.append();

    expect(this.context.component.unbounded).withContext('Expected component state false by default').toBeFalse();
    expect(this.context.getRippleInstance().unbounded).withContext('Expected unbounded not to be set on instance by default').toBeFalse();
    
    this.context.component.unbounded = true;
    expect(this.context.component.unbounded).withContext('Expected component state true after toggle').toBeTrue();
    expect(this.context.getRippleInstance().unbounded).withContext('Expected unbounded to be set on instance after toggle').toBeTrue();
    
    this.context.component.unbounded = false;
    expect(this.context.component.unbounded).withContext('Expected component state false after toggle').toBeFalse();
    expect(this.context.getRippleInstance().unbounded).withContext('Expected unbounded NOT to be set on instance after toggle').toBeFalse();
  });

  function setupTestContext(): ITestRippleContext {
    const fixture = document.createElement('div');
    fixture.id = 'ripple-test-fixture';
    
    const rippleSurface = document.createElement('div');
    rippleSurface.id = 'id';

    const component = document.createElement(RIPPLE_CONSTANTS.elementName) as IRippleComponent;
    rippleSurface.appendChild(component);
    fixture.appendChild(rippleSurface);

    return {
      component,
      rippleSurface,
      getRippleInstance: () => component['_foundation']['_adapter']['_ripple'] as ForgeRipple,
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }
});

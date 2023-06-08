import { getShadowElement, removeElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';
import { CircularProgressComponent, CIRCULAR_PROGRESS_CONSTANTS, defineCircularProgressComponent, ICircularProgressComponent } from '@tylertech/forge';

interface ITestContext {
  context: ITestCircularProgressContext;
}

interface ITestCircularProgressContext {
  component: ICircularProgressComponent;
  rootElement: HTMLElement;
  getDeterminateProgressElement(): HTMLElement;
  append(): void;
  destroy(): void;
}

describe('CircularProgressComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineCircularProgressComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should be instantiated', function(this: ITestContext) {
    this.context = setupTestContext(true);

    expect(this.context.component.isConnected).toBe(true);
    expect(this.context.component instanceof CircularProgressComponent).toBe(true);
  });

  it('should render with correct default values', function(this: ITestContext) {
    this.context = setupTestContext(true);

    expect(this.context.component.determinate).toBeFalse();
    expect(this.context.rootElement.classList.contains(CIRCULAR_PROGRESS_CONSTANTS.classes.INDETERMINATE)).toBeTrue();
    expect(this.context.component.progress).toBe(0);
  });

  it('should set determinate', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE, '');
    this.context.append();

    expect(this.context.component.determinate).toBeTrue();
    expect(this.context.rootElement.classList.contains(CIRCULAR_PROGRESS_CONSTANTS.classes.INDETERMINATE)).toBeFalse();
    expect(this.context.getDeterminateProgressElement().getAttribute('stroke-dashoffset')).toBe('100');
  });

  it('should set progress', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.determinate = true;
    this.context.component.setAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS, '0.5');
    this.context.append();

    expect(this.context.component.progress).toBe(0.5);
    expect(this.context.rootElement.getAttribute('aria-valuenow')).toBe('0.5');
    expect(this.context.getDeterminateProgressElement().getAttribute('stroke-dashoffset')).toBe('50');
  });

  it('should reflect progress to attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.determinate = true;
    this.context.component.progress = 0.5;
    this.context.append();
    
    expect(this.context.component.getAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS)).toBe('0.5');
    
    this.context.component.progress = 0.75;

    expect(this.context.component.getAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS)).toBe('0.75');
  });

  it('should reflect determinate to attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.determinate = true;
    this.context.append();

    expect(this.context.component.hasAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE)).toBeTrue();
    
    this.context.component.determinate = false;

    expect(this.context.component.hasAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE)).toBeFalse();
  });

  it('should proxy data-aria-label', function(this: ITestContext) {
    this.context = setupTestContext();
    const label = 'Example circular progress';
    this.context.component.setAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.ARIA_LABEL, label);
    this.context.append();

    expect(this.context.rootElement.getAttribute('aria-label')).toBe(label);
  });

  function setupTestContext(append = false): ITestCircularProgressContext {
    const fixture = document.createElement('div');
    fixture.id = 'circular-progress-test-fixture';

    const component = document.createElement('forge-circular-progress');
    fixture.appendChild(component);

    const rootElement = getShadowElement(component, CIRCULAR_PROGRESS_CONSTANTS.selectors.ROOT);

    if (append) {
      document.body.appendChild(fixture);
    }

    return {
      component,
      rootElement,
      getDeterminateProgressElement: () => getShadowElement(component, CIRCULAR_PROGRESS_CONSTANTS.selectors.DETERMINATE_PROGRESS_CIRCLE),
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }
});

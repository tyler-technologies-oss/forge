import { getShadowElement, removeElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';
import { CircularProgressComponent, CIRCULAR_PROGRESS_CONSTANTS, defineCircularProgressComponent, ICircularProgressComponent } from '@tylertech/forge';

interface ITestContext {
  context: ITestCircularProgressContext;
}

interface ITestCircularProgressContext {
  component: ICircularProgressComponent;
  getRootElement(): HTMLElement;
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
    expect(this.context.component.progress).toBe(0);
    expect(this.context.component.open).toBeTrue();
  });

  it('should set progress via attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.determinate = true;
    this.context.component.setAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS, '0.5');
    this.context.append();

    expect(this.context.component.progress).toBe(0.5);
  });

  it('should set determinate via attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE, '');
    this.context.append();

    expect(this.context.component.determinate).toBeTrue();
  });

  it('should set open via attribute', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.append();
    this.context.component.setAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.OPEN, 'true');

    expect(this.context.component.open).toBeTrue();
  });

  it('should set aria-label', function(this: ITestContext) {
    this.context = setupTestContext();
    const label = 'Example circular progress';
    this.context.component.setAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESSBAR_ARIA_LABEL, label);
    this.context.append();

    expect(this.context.getRootElement().getAttribute('aria-label')).toBe(label);
  });

  it('should close', function(this: ITestContext) {
    this.context = setupTestContext(true);
    this.context.component.open = false;

    expect(this.context.component.open).toBeFalse();
    expect(this.context.getRootElement().classList.contains('mdc-circular-progress--closed')).toBeTrue();
  });

  it('should connect closed', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.open = false;
    this.context.append();

    expect(this.context.getRootElement().classList.contains('mdc-circular-progress--closed')).toBeTrue();
  });

  function setupTestContext(append = false): ITestCircularProgressContext {
    const fixture = document.createElement('div');
    fixture.id = 'circular-progress-test-fixture';

    const component = document.createElement('forge-circular-progress');
    fixture.appendChild(component);

    if (append) {
      document.body.appendChild(fixture);
    }

    return {
      component,
      getRootElement: () => getShadowElement(component, CIRCULAR_PROGRESS_CONSTANTS.selectors.ROOT),
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }
});

import { removeElement } from '@tylertech/forge-core';
import { StepComponent, STEP_CONSTANTS, defineStepComponent, IStepComponent } from '@tylertech/forge';

interface ITestContext {
  context: ITestStepContext
}

interface ITestStepContext {
  component: IStepComponent;
  destroy(): void;
}

describe('StepComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineStepComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.shadowRoot).not.toBeNull();
  });  

  function setupTestContext(): ITestStepContext {
    const fixture = document.createElement('div');
    fixture.id = 'step-test-fixture';
    const component = document.createElement(STEP_CONSTANTS.elementName) as IStepComponent;
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }
});

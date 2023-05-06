import { ISpinnerTestContext, SPINNER_CONSTANTS, defineSpinnerComponent } from '@tylertech/forge';

interface ITestContext {
  context: ISpinnerTestContext;
}

interface ISpinnerTestContext {
  component: ISpinnerComponent;
  destroy(): void;
}

describe('SpinnerComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineSpinnerComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTextContext();

    expect(this.context.component.shadowRoot).toBeTruthy();
  });

  function setupTextContext(): ISpinnerTestContext {
    const component = document.createElement(SPINNER_CONSTANTS.elementName);
    document.body.appendChild(component);
    return {
      component,
      destroy: () => {
        document.body.removeChild(component);
      }
    };
  }
});

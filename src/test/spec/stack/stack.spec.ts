import { IStackTestContext, STACK_CONSTANTS, defineStackComponent } from '@tylertech/forge';

interface ITestContext {
  context: IStackTestContext;
}

interface IStackTestContext {
  component: IStackComponent;
  destroy(): void;
}

describe('StackComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineStackComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTextContext();

    expect(this.context.component.shadowRoot).toBeTruthy();
  });

  function setupTextContext(): IStackTestContext {
    const component = document.createElement(STACK_CONSTANTS.elementName);
    document.body.appendChild(component);
    return {
      component,
      destroy: () => {
        document.body.removeChild(component);
      }
    };
  }
});

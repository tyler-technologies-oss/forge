import { IPopoverTestContext, POPOVER_CONSTANTS, definePopoverComponent } from '@tylertech/forge';

interface ITestContext {
  context: IPopoverTestContext;
}

interface IPopoverTestContext {
  component: IPopoverComponent;
  destroy(): void;
}

describe('PopoverComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    definePopoverComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTextContext();

    expect(this.context.component.shadowRoot).toBeTruthy();
  });

  function setupTextContext(): IPopoverTestContext {
    const component = document.createElement(POPOVER_CONSTANTS.elementName);
    document.body.appendChild(component);
    return {
      component,
      destroy: () => {
        document.body.removeChild(component);
      }
    };
  }
});

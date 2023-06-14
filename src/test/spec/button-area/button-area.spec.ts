import { IButtonAreaTestContext, BUTTON_AREA_CONSTANTS, defineButtonAreaComponent } from '@tylertech/forge';

interface ITestContext {
  context: IButtonAreaTestContext;
}

interface IButtonAreaTestContext {
  component: IButtonAreaComponent;
  destroy(): void;
}

describe('ButtonAreaComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineButtonAreaComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTextContext();

    expect(this.context.component.shadowRoot).toBeTruthy();
  });

  function setupTextContext(): IButtonAreaTestContext {
    const component = document.createElement(BUTTON_AREA_CONSTANTS.elementName);
    document.body.appendChild(component);
    return {
      component,
      destroy: () => {
        document.body.removeChild(component);
      }
    };
  }
});

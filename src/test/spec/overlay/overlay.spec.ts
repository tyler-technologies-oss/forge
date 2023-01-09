import { IOverlayTestContext, OVERLAY_CONSTANTS, defineOverlayComponent } from '@tylertech/forge';

interface ITestContext {
  context: IOverlayTestContext;
}

interface IOverlayTestContext {
  component: IOverlayComponent;
  destroy(): void;
}

describe('OverlayComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineOverlayComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTextContext();

    expect(this.context.component.shadowRoot).toBeTruthy();
  });

  function setupTextContext(): IOverlayTestContext {
    const component = document.createElement(OVERLAY_CONSTANTS.elementName);
    document.body.appendChild(component);
    return {
      component,
      destroy: () => {
        document.body.removeChild(component);
      }
    };
  }
});

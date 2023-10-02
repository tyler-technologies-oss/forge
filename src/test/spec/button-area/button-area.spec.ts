import { BUTTON_AREA_CONSTANTS, IButtonAreaComponent, defineButtonAreaComponent } from '@tylertech/forge';

interface ITestContext {
  context: IButtonAreaTestContext;
}

interface IButtonAreaTestContext {
  component: IButtonAreaComponent;
  button: HTMLButtonElement;
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

  it('should handle click', function(this: ITestContext) {
    this.context = setupTextContext();

    const callback = jasmine.createSpy('callback');
    this.context.component.addEventListener('click', callback);
    this.context.component.click();
    expect(callback).toHaveBeenCalled();
  });

  it('should handle click from the button', function(this: ITestContext) {
    this.context = setupTextContext();

    const callback = jasmine.createSpy('callback');
    this.context.component.addEventListener('click', callback);
    this.context.button.click();
    expect(callback).toHaveBeenCalled();
  });

  it('should disable', function(this: ITestContext) {
    this.context = setupTextContext();

    this.context.component.disabled = true;
    const callback = jasmine.createSpy('callback');
    this.context.component.addEventListener('click', callback);
    this.context.button.click();
    expect(callback).not.toHaveBeenCalled();
    expect(this.context.button.disabled).toBeTrue();
  });

  it('should not handle click from ignored children', function(this: ITestContext) {
    this.context = setupTextContext();

    const callback = jasmine.createSpy('callback');
    this.context.component.addEventListener('click', callback);

    const button = document.createElement('button');
    button.toggleAttribute('data-forge-ignore', true);
    this.context.component.append(button);
    button.click();
    expect(callback).not.toHaveBeenCalled();
  });

  function setupTextContext(): IButtonAreaTestContext {
    const component = document.createElement(BUTTON_AREA_CONSTANTS.elementName) as IButtonAreaComponent;
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('slot', 'button');
    component.append(button);
    document.body.appendChild(component);

    return {
      component,
      button,
      destroy: () => {
        document.body.removeChild(component);
      }
    };
  }
});

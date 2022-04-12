import { getShadowElement, removeElement } from '@tylertech/forge-core';
import { defineFilePickerComponent, FILE_PICKER_CONSTANTS, IFilePickerComponent } from '@tylertech/forge';

interface ITestContext {
  context: ITestFilePickerContext;
}

interface ITestFilePickerContext {
  component: IFilePickerComponent;
  getRootElement(): HTMLElement;
  getInputElement(): HTMLInputElement;
  getButtonElement(): HTMLButtonElement;
  destroy(): void;
}

describe('FilePickerComponent', function(this: ITestContext) {
  
  beforeAll(function(this: ITestContext) {
    defineFilePickerComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should instantiate component instance', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.shadowRoot).not.toBeNull();
  });

  it('should contain the file select button', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.getButtonElement()).toBeDefined();
  });

  it('should contain the file input element', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.getInputElement()).toBeDefined();
  });

  it('should initialize with no accept value', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.accept).toBeNull();
  });

  it('should initialize with no capture value', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.capture).toBeNull();
  });

  it('should initialize with multiple set to false', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.multiple).toBeFalse();
  });

  it('should initialize with disabled set to false', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.disabled).toBeFalse();
  });

  it('should initialize with compact set to false', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.component.compact).toBeFalse();
  });

  it('should allow accept to be set to null', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.accept = '.png';
    this.context.component.accept = null;
    expect(this.context.component.accept).toBeNull();
  });

  it('should allow capture to be set to null', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.capture = 'user';
    this.context.component.capture = null;
    expect(this.context.component.capture).toBeNull();
  });

  it('should allow multiple to be set to false', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.multiple = true;
    this.context.component.multiple = false;
    expect(this.context.component.multiple).toBeFalse();
  });

  it('should allow disabled to be set to false', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.disabled = true;
    this.context.component.disabled = false;
    expect(this.context.component.disabled).toBeFalse();
  });

  it('should allow compact to be set to false', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.compact = true;
    this.context.component.compact = false;
    expect(this.context.component.compact).toBeFalse();
  });

  describe('attributes', function(this: ITestContext) {
    it('should update the accept value when the accept attribute is set', function(this: ITestContext) {
      this.context = setupTestContext();
      const format = '.png';
      this.context.component.setAttribute(FILE_PICKER_CONSTANTS.attributes.ACCEPT, format);
      expect(this.context.component.accept).toBe(format);
    });

    it('should update the capture value when the capture attribute is set', function(this: ITestContext) {
      this.context = setupTestContext();
      const camera = 'user';
      this.context.component.setAttribute(FILE_PICKER_CONSTANTS.attributes.CAPTURE, camera);
      expect(this.context.component.capture).toBe(camera);
    });

    it('should update the multiple value when the multiple attribute is set', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(FILE_PICKER_CONSTANTS.attributes.MULTIPLE, '');
      expect(this.context.component.multiple).toBeTrue();
    });

    it('should update the disabled value when the disabled attribute is set', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(FILE_PICKER_CONSTANTS.attributes.DISABLED, '');
      expect(this.context.component.disabled).toBeTrue();
    });

    it('should update the compact value when the compact attribute is set', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(FILE_PICKER_CONSTANTS.attributes.COMPACT, '');
      expect(this.context.component.compact).toBeTrue();
    });

    it('should set the accept attribute on the input when accept is set', function(this: ITestContext) {
      this.context = setupTestContext();
      const format = '.png';
      this.context.component.accept = format;
      expect(this.context.getInputElement().getAttribute(FILE_PICKER_CONSTANTS.attributes.ACCEPT)).toBe(format);
    });
  });

  describe('events', function(this: ITestContext) {
    it('should activate a click on the file input when the select button is clicked', async function(this: ITestContext) {
      this.context = setupTestContext();
      const spy = jasmine.createSpy('File select');
      this.context.getInputElement().addEventListener('click', spy);
      this.context.getButtonElement().click();
      expect(spy).toHaveBeenCalled();
    });

    it('should trigger a change event when the file input is triggered', function(this: ITestContext) {
      this.context = setupTestContext();
      const spy = jasmine.createSpy('File picker change');
      this.context.component.addEventListener(FILE_PICKER_CONSTANTS.events.FILES_CHANGED, spy);
      this.context.getInputElement().dispatchEvent(new Event('change', { bubbles: true }));
      expect(spy).toHaveBeenCalled();
    });
  });

  function setupTestContext(): ITestFilePickerContext {
    const fixture = document.createElement('div');
    fixture.id = 'file-picker-test-fixture';
    const component = document.createElement(FILE_PICKER_CONSTANTS.elementName) as IFilePickerComponent;
    const button = document.createElement('button');
    button.id = 'file-picker-button';
    component.appendChild(button);
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      getRootElement: () => getShadowElement(component, FILE_PICKER_CONSTANTS.selectors.CONTAINER),
      getInputElement: () => getShadowElement(component, FILE_PICKER_CONSTANTS.selectors.CONTAINER)
        .querySelector(FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement,
      getButtonElement: () => component.querySelector('#file-picker-button') as HTMLButtonElement,
      destroy: () => removeElement(fixture)
    };
  }  
});

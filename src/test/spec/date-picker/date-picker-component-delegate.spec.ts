import { removeElement } from '@tylertech/forge-core';
import {
  defineDatePickerComponent,
  DatePickerComponentDelegate,
  DatePickerComponentDelegateProps,
  IDatePickerComponent,
  IDatePickerComponentDelegateOptions
} from '@tylertech/forge/date-picker';

interface ITestContext {
  context: ITestDatePickerComponentDelegateContext;
}

interface ITestDatePickerComponentDelegateContext {
  delegate: DatePickerComponentDelegate;
  destroy(): void;
}

describe('DatePickerComponentDelegate', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineDatePickerComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should create default date picker', function(this: ITestContext) {
    this.context = setupTestContext();
    expect(this.context.delegate.value).toBeNull();
  });

  it('should set value via config', function(this: ITestContext) {
    this.context = setupTestContext({ value: '01/01/2020' });
    expect(this.context.delegate.value).toEqual(new Date('01/01/2020'));
  });

  it('should set value dynamically', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.delegate.value = '01/01/2020';

    expect(this.context.delegate.value).toEqual(new Date('01/01/2020'));
  });

  it('should set value via component', function(this: ITestContext) {
    this.context = setupTestContext();
    const date = new Date('01/01/2020');
    this.context.delegate.element.value = date;

    expect(this.context.delegate.value).toEqual(date);
  });

  it('should listen for change event', function(this: ITestContext) {
    this.context = setupTestContext();

    const value = '01/01/2020';
    const changeSpy = jasmine.createSpy('change spy');
    this.context.delegate.onChange(changeSpy);
    _setInputValue(this.context.delegate.element, value, 'input');

    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith(value);
  });

  it('should listen for input event', function(this: ITestContext) {
    this.context = setupTestContext();
    const inputSpy = jasmine.createSpy('input spy');
    this.context.delegate.onInput(inputSpy);
    _setInputValue(this.context.delegate.element, '01/01/2020', 'input');

    expect(inputSpy).toHaveBeenCalledTimes(1);
  });

  it('should listen for input event when masked', function(this: ITestContext) {
    this.context = setupTestContext();
    const inputSpy = jasmine.createSpy('input spy');
    this.context.delegate.onInput(inputSpy);
    _setInputValue(this.context.delegate.element, '01/01/2020', 'input');

    expect(inputSpy).toHaveBeenCalledTimes(1);
  });

  it('should listen for focus event', function(this: ITestContext) {
    this.context = setupTestContext();
    
    const focusSpy = jasmine.createSpy('focus spy');
    this.context.delegate.onFocus(focusSpy);

    const input = this.context.delegate.getInputElement();
    input.focus();

    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it('should listen for blur event', function(this: ITestContext) {
    this.context = setupTestContext();
    
    const blurSpy = jasmine.createSpy('blur spy');
    this.context.delegate.onBlur(blurSpy);

    const input = this.context.delegate.getInputElement();
    input.focus();
    input.blur();
    
    expect(blurSpy).toHaveBeenCalledTimes(1);
  });

  it('should set disabled via config', function(this: ITestContext) {
    this.context = setupTestContext({ disabled: true });
    
    expect(this.context.delegate.element.disabled).toBe(true);
    expect(this.context.delegate.getInputElement().disabled).toBe(true);
  });

  it('should set disabled dynamically', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.delegate.disabled = true;

    expect(this.context.delegate.element.disabled).toBe(true);
    expect(this.context.delegate.getInputElement().disabled).toBe(true);
  });

  it('should set validity', function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.delegate.invalid = true;

    expect(this.context.delegate.invalid).toBe(true);
  });

  it('should set required via config', function(this: ITestContext) {
    this.context = setupTestContext({}, { textFieldDelegateConfig: { props: { required: true }}});

    expect(this.context.delegate.getTextFieldElement().required).toBe(true);
  });

  it('should set label via config', function(this: ITestContext) {
    this.context = setupTestContext({}, { textFieldDelegateConfig: { options: { label: 'Test label' }}});
        
    const labelElement = this.context.delegate.getTextFieldElement().querySelector('label') as HTMLLabelElement;
    expect(labelElement.textContent).toBe('Test label');
  });

  it('should set min via config', function(this: ITestContext) {
    const minDate = new Date();
    this.context = setupTestContext({ min: minDate });

    expect(this.context.delegate.element.min).toEqual(minDate);

  });

  it('should set max via config', function(this: ITestContext) {
    const maxDate = new Date();
    this.context = setupTestContext({ max: maxDate});
    
    expect(this.context.delegate.element.max).toEqual(maxDate);
  });

  it('should set disabled dates via config', function(this: ITestContext) {
    const disabledDates = [new Date()];
    this.context = setupTestContext({ disabledDates: disabledDates });
    
    expect(this.context.delegate.element.disabledDates).toEqual(disabledDates);
  });

  it('should set mask props via config', function(this: ITestContext) {
    this.context = setupTestContext({
      masked: true,
      showMaskFormat: true,
      maskFormat: 'YYYY-MM-DD'
    });

    expect(this.context.delegate.element.masked).toEqual(true);
    expect(this.context.delegate.element.showMaskFormat).toEqual(true);
    expect(this.context.delegate.element.maskFormat).toEqual('YYYY-MM-DD');

  });

  it('should set parse callback via config', function(this: ITestContext) {
    this.context = setupTestContext({ parseCallback: dateStr => new Date() });
    
    type ComponentWithCore = IDatePickerComponent & { _core: { _parseCallback: (dateStr: string) => Date }};
    expect((this.context.delegate.element as ComponentWithCore)['_core']['_parseCallback']).not.toBeFalsy();
  });

  it('should set format callback via config', function(this: ITestContext) {
    this.context = setupTestContext({ formatCallback: date => '' });

    type ComponentWithCore = IDatePickerComponent & { _core: { _formatCallback: (date: Date) => string }};
    expect((this.context.delegate.element as ComponentWithCore)['_core']['_formatCallback']).not.toBeFalsy();
  });

  it('should set popup classes via config', function(this: ITestContext) {
    this.context = setupTestContext({ popupClasses: 'test-class' });

    expect(this.context.delegate.element.popupClasses).toEqual('test-class');
  });

  it('should set value mode via config', function(this: ITestContext) {
    this.context = setupTestContext({ valueMode: 'string' });

    expect(this.context.delegate.element.valueMode).toEqual('string');
  });

  function setupTestContext(props?: DatePickerComponentDelegateProps, options?: IDatePickerComponentDelegateOptions): ITestDatePickerComponentDelegateContext {
    const fixture = document.createElement('div');
    fixture.id = 'date-picker-delegate-test-fixture';
    
    const delegate = new DatePickerComponentDelegate({ props, options });
    fixture.appendChild(delegate.element);
    document.body.appendChild(fixture);

    return {
      delegate,
      destroy: () => {
        delegate.destroy();
        removeElement(fixture);
      }
    };
  } 

  function _setInputValue(datePicker: IDatePickerComponent, value: string, event: string): void {
    const input = datePicker.querySelector('input') as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new KeyboardEvent(event));
  }
});

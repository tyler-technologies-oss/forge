import { removeElement } from '@tylertech/forge-core';
import { DateRangeComponentDelegate, defineDateRangePickerComponent } from '@tylertech/forge/date-range-picker';
import { defineTextFieldComponent } from '@tylertech/forge/text-field';

interface ITestContext {
  context: ITestDateRangeComponentDelegateContext;
}

interface ITestDateRangeComponentDelegateContext {
  delegate: DateRangeComponentDelegate;
  append(): void;
  destroy(): void;
}

describe('DateRangeComponentDelegate', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineDateRangePickerComponent();
    defineTextFieldComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should retrieve default value', function(this: ITestContext) {
    this.context = setupTestContext(true);
    expect(this.context.delegate.value).toEqual({ from: null, to: null });
  });

  it('should set value', function(this: ITestContext) {
    this.context = setupTestContext(true);
    const value = { from: '01/01/2020', to: '02/01/2020' };
    this.context.delegate.value = value;

    expect(this.context.delegate.value).toEqual({ from: new Date(value.from), to: new Date(value.to) });
    expect(this.context.delegate.element.value?.from).toEqual(new Date(value.from));
    expect(this.context.delegate.element.value?.to).toEqual(new Date(value.to));
  });

  it('should execute change callback when "from" input is modified', function(this: ITestContext) {
    this.context = setupTestContext(true);

    const changeSpy = jasmine.createSpy('change spy');
    this.context.delegate.onChange(changeSpy);
    this.context.delegate.fromInput.value = '01/01/2020';
    this.context.delegate.fromInput.dispatchEvent(new KeyboardEvent('input'));
    
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ from: new Date('01/01/2020'), to: null }));
  });

  it('should execute change callback when "to" input is modified', function(this: ITestContext) {
    this.context = setupTestContext(true);
    const changeSpy = jasmine.createSpy('change spy');
    this.context.delegate.onChange(changeSpy);
    this.context.delegate.toInput.focus();
    this.context.delegate.toInput.value = '01/01/2020';
    this.context.delegate.toInput.dispatchEvent(new KeyboardEvent('input'));
    
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ from: null, to: new Date('01/01/2020') }));
  });

  it('should set disabled', function(this: ITestContext) {
    this.context = setupTestContext(true);
    this.context.delegate.disabled = true;

    expect(this.context.delegate.fromInput.disabled).toBe(true);
    expect(this.context.delegate.toInput.disabled).toBe(true);
  });

  it('should set text-field invalid', function(this: ITestContext) {
    this.context = setupTestContext(true)
    this.context.delegate.invalid = true;

    expect(this.context.delegate.textField.invalid).toBeTrue();
  });

  it('should validate based on current state of input values', function(this: ITestContext) {
    this.context = setupTestContext(true);
    
    expect(this.context.delegate.invalid).toBeFalse();
    
    this.context.delegate.value = { from: '01/01/2020', to: '02/01/2020' };
    expect(this.context.delegate.invalid).toBeFalse();
  });

  function setupTestContext(append = false): ITestDateRangeComponentDelegateContext {
    const fixture = document.createElement('div');
    fixture.id = 'date-range-delegate-test-fixture';
    const delegate = new DateRangeComponentDelegate();
    fixture.appendChild(delegate.element);
    if (append) {
      document.body.appendChild(fixture);
    }
    return {
      delegate,
      append: () => document.body.appendChild(fixture),
      destroy: () => {
        delegate.destroy();
        removeElement(fixture);
      }
    };
  }
});

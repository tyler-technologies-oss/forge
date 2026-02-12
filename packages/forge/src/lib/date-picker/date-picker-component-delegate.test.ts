import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { removeElement } from '@tylertech/forge-core';
import {
  defineDatePickerComponent,
  DatePickerComponentDelegate,
  DatePickerComponentDelegateProps,
  IDatePickerComponent,
  IDatePickerComponentDelegateOptions
} from './index.js';

interface IDatePickerComponentDelegateHarness {
  delegate: DatePickerComponentDelegate;
  destroy(): void;
}

describe('DatePickerComponentDelegate', () => {
  let harness: IDatePickerComponentDelegateHarness;

  beforeAll(() => {
    defineDatePickerComponent();
  });

  afterEach(() => {
    if (harness) {
      harness.destroy();
      harness = undefined!;
    }
  });

  it('should create default date picker', () => {
    harness = setupTestContext();
    expect(harness.delegate.value).toBeNull();
  });

  it('should set value via config', () => {
    harness = setupTestContext({ value: '01/01/2020' });
    expect(harness.delegate.value).toEqual(new Date('01/01/2020'));
  });

  it('should set value dynamically', () => {
    harness = setupTestContext();
    harness.delegate.value = '01/01/2020';

    expect(harness.delegate.value).toEqual(new Date('01/01/2020'));
  });

  it('should set value via component', () => {
    harness = setupTestContext();
    const date = new Date('01/01/2020');
    harness.delegate.element.value = date;

    expect(harness.delegate.value).toEqual(date);
  });

  it('should listen for change event', () => {
    harness = setupTestContext();

    const value = '01/01/2020';
    const changeSpy = vi.fn();
    harness.delegate.onChange(changeSpy);
    _setInputValue(harness.delegate.element, value, 'input');

    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy).toHaveBeenCalledWith(value);
  });

  it('should listen for input event', () => {
    harness = setupTestContext();
    const inputSpy = vi.fn();
    harness.delegate.onInput(inputSpy);
    _setInputValue(harness.delegate.element, '01/01/2020', 'input');

    expect(inputSpy).toHaveBeenCalledOnce();
  });

  it('should listen for input event when masked', () => {
    harness = setupTestContext();
    const inputSpy = vi.fn();
    harness.delegate.onInput(inputSpy);
    _setInputValue(harness.delegate.element, '01/01/2020', 'input');

    expect(inputSpy).toHaveBeenCalledOnce();
  });

  it('should listen for focus event', () => {
    harness = setupTestContext();

    const focusSpy = vi.fn();
    harness.delegate.onFocus(focusSpy);

    const input = harness.delegate.getInputElement();
    input.focus();

    expect(document.activeElement === input).toBe(true);
    expect(focusSpy).toHaveBeenCalledOnce();
  });

  it('should listen for blur event', () => {
    harness = setupTestContext();

    const blurSpy = vi.fn();
    harness.delegate.onBlur(blurSpy);

    const input = harness.delegate.getInputElement();
    input.focus();

    expect(document.activeElement).toBe(input);

    input.blur();

    expect(document.activeElement === input).toBe(false);
    expect(blurSpy).toHaveBeenCalledOnce();
  });

  it('should set disabled via config', () => {
    harness = setupTestContext({ disabled: true });

    expect(harness.delegate.element.disabled).toBe(true);
    expect(harness.delegate.getInputElement().disabled).toBe(true);
  });

  it('should set disabled dynamically', () => {
    harness = setupTestContext();
    harness.delegate.disabled = true;

    expect(harness.delegate.element.disabled).toBe(true);
    expect(harness.delegate.getInputElement().disabled).toBe(true);
  });

  it('should set validity', () => {
    harness = setupTestContext();
    harness.delegate.invalid = true;

    expect(harness.delegate.invalid).toBe(true);
  });

  it('should set required via config', () => {
    harness = setupTestContext({}, { textFieldDelegateConfig: { props: { required: true } } });

    expect(harness.delegate.getTextFieldElement().required).toBe(true);
  });

  it('should set label via config', () => {
    harness = setupTestContext({}, { textFieldDelegateConfig: { options: { label: 'Test label' } } });

    const labelElement = harness.delegate.getTextFieldElement().querySelector('label') as HTMLLabelElement;
    expect(labelElement.textContent).toBe('Test label');
  });

  it('should set min via config', () => {
    const minDate = new Date();
    harness = setupTestContext({ min: minDate });

    expect(harness.delegate.element.min).toEqual(minDate);
  });

  it('should set max via config', () => {
    const maxDate = new Date();
    harness = setupTestContext({ max: maxDate });

    expect(harness.delegate.element.max).toEqual(maxDate);
  });

  it('should set disabled dates via config', () => {
    const disabledDates = [new Date()];
    harness = setupTestContext({ disabledDates });

    expect(harness.delegate.element.disabledDates).toEqual(disabledDates);
  });

  it('should set mask props via config', () => {
    harness = setupTestContext({
      masked: true,
      showMaskFormat: true,
      maskFormat: 'YYYY-MM-DD'
    });

    expect(harness.delegate.element.masked).toBe(true);
    expect(harness.delegate.element.showMaskFormat).toBe(true);
    expect(harness.delegate.element.maskFormat).toBe('YYYY-MM-DD');
  });

  it('should set parse callback via config', () => {
    harness = setupTestContext({ parseCallback: _dateStr => new Date() });

    type ComponentWithCore = IDatePickerComponent & { _core: { _parseCallback: (dateStr: string) => Date } };
    expect((harness.delegate.element as ComponentWithCore)['_core']['_parseCallback']).toBeDefined();
  });

  it('should set format callback via config', () => {
    harness = setupTestContext({ formatCallback: _date => '' });

    type ComponentWithCore = IDatePickerComponent & { _core: { _formatCallback: (date: Date) => string } };
    expect((harness.delegate.element as ComponentWithCore)['_core']['_formatCallback']).toBeDefined();
  });

  it('should set popup classes via config', () => {
    harness = setupTestContext({ popupClasses: 'test-class' });

    expect(harness.delegate.element.popupClasses).toBe('test-class');
  });

  it('should set value mode via config', () => {
    harness = setupTestContext({ valueMode: 'string' });

    expect(harness.delegate.element.valueMode).toBe('string');
  });

  function setupTestContext(props?: DatePickerComponentDelegateProps, options?: IDatePickerComponentDelegateOptions): IDatePickerComponentDelegateHarness {
    const fixtureElement = document.createElement('div');
    fixtureElement.id = 'date-picker-delegate-test-fixture';

    const delegate = new DatePickerComponentDelegate({ props, options });
    fixtureElement.appendChild(delegate.element);
    document.body.appendChild(fixtureElement);

    return {
      delegate,
      destroy: () => {
        delegate.destroy();
        removeElement(fixtureElement);
      }
    };
  }

  function _setInputValue(datePicker: IDatePickerComponent, value: string, event: string): void {
    const input = datePicker.querySelector('input') as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new KeyboardEvent(event));
  }
});

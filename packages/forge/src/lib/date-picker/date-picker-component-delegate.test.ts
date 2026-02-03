import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { removeElement } from '@tylertech/forge-core';
import {
  defineDatePickerComponent,
  DatePickerComponentDelegate,
  DatePickerComponentDelegateProps,
  IDatePickerComponent,
  IDatePickerComponentDelegateOptions
} from './index';

interface IDatePickerComponentDelegateHarness {
  delegate: DatePickerComponentDelegate;
  destroy(): void;
}

describe('DatePickerComponentDelegate', () => {
  let harness: IDatePickerComponentDelegateHarness;

  before(() => {
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
    expect(harness.delegate.value).to.be.null;
  });

  it('should set value via config', () => {
    harness = setupTestContext({ value: '01/01/2020' });
    expect(harness.delegate.value).to.deep.equal(new Date('01/01/2020'));
  });

  it('should set value dynamically', () => {
    harness = setupTestContext();
    harness.delegate.value = '01/01/2020';

    expect(harness.delegate.value).to.deep.equal(new Date('01/01/2020'));
  });

  it('should set value via component', () => {
    harness = setupTestContext();
    const date = new Date('01/01/2020');
    harness.delegate.element.value = date;

    expect(harness.delegate.value).to.deep.equal(date);
  });

  it('should listen for change event', () => {
    harness = setupTestContext();

    const value = '01/01/2020';
    const changeSpy = spy();
    harness.delegate.onChange(changeSpy);
    _setInputValue(harness.delegate.element, value, 'input');

    expect(changeSpy.calledOnce).to.be.true;
    expect(changeSpy.calledWith(value)).to.be.true;
  });

  it('should listen for input event', () => {
    harness = setupTestContext();
    const inputSpy = spy();
    harness.delegate.onInput(inputSpy);
    _setInputValue(harness.delegate.element, '01/01/2020', 'input');

    expect(inputSpy.calledOnce).to.be.true;
  });

  it('should listen for input event when masked', () => {
    harness = setupTestContext();
    const inputSpy = spy();
    harness.delegate.onInput(inputSpy);
    _setInputValue(harness.delegate.element, '01/01/2020', 'input');

    expect(inputSpy.calledOnce).to.be.true;
  });

  it('should listen for focus event', () => {
    harness = setupTestContext();

    const focusSpy = spy();
    harness.delegate.onFocus(focusSpy);

    const input = harness.delegate.getInputElement();
    input.dispatchEvent(new FocusEvent('focus'));
    input.focus();

    expect(document.activeElement === input).to.be.true;
    expect(focusSpy.calledOnce).to.be.true;
  });

  it('should listen for blur event', () => {
    harness = setupTestContext();

    const blurSpy = spy();
    harness.delegate.onBlur(blurSpy);

    const input = harness.delegate.getInputElement();
    input.dispatchEvent(new FocusEvent('focus'));
    input.focus();

    expect(document.activeElement).to.equal(input);

    input.dispatchEvent(new FocusEvent('blur'));
    input.blur();

    expect(document.activeElement === input).to.be.false;
    expect(blurSpy.calledOnce).to.be.true;
  });

  it('should set disabled via config', () => {
    harness = setupTestContext({ disabled: true });

    expect(harness.delegate.element.disabled).to.be.true;
    expect(harness.delegate.getInputElement().disabled).to.be.true;
  });

  it('should set disabled dynamically', () => {
    harness = setupTestContext();
    harness.delegate.disabled = true;

    expect(harness.delegate.element.disabled).to.be.true;
    expect(harness.delegate.getInputElement().disabled).to.be.true;
  });

  it('should set validity', () => {
    harness = setupTestContext();
    harness.delegate.invalid = true;

    expect(harness.delegate.invalid).to.be.true;
  });

  it('should set required via config', () => {
    harness = setupTestContext({}, { textFieldDelegateConfig: { props: { required: true } } });

    expect(harness.delegate.getTextFieldElement().required).to.be.true;
  });

  it('should set label via config', () => {
    harness = setupTestContext({}, { textFieldDelegateConfig: { options: { label: 'Test label' } } });

    const labelElement = harness.delegate.getTextFieldElement().querySelector('label') as HTMLLabelElement;
    expect(labelElement.textContent).to.equal('Test label');
  });

  it('should set min via config', () => {
    const minDate = new Date();
    harness = setupTestContext({ min: minDate });

    expect(harness.delegate.element.min).to.deep.equal(minDate);
  });

  it('should set max via config', () => {
    const maxDate = new Date();
    harness = setupTestContext({ max: maxDate });

    expect(harness.delegate.element.max).to.deep.equal(maxDate);
  });

  it('should set disabled dates via config', () => {
    const disabledDates = [new Date()];
    harness = setupTestContext({ disabledDates });

    expect(harness.delegate.element.disabledDates).to.deep.equal(disabledDates);
  });

  it('should set mask props via config', () => {
    harness = setupTestContext({
      masked: true,
      showMaskFormat: true,
      maskFormat: 'YYYY-MM-DD'
    });

    expect(harness.delegate.element.masked).to.equal(true);
    expect(harness.delegate.element.showMaskFormat).to.equal(true);
    expect(harness.delegate.element.maskFormat).to.equal('YYYY-MM-DD');
  });

  it('should set parse callback via config', () => {
    harness = setupTestContext({ parseCallback: dateStr => new Date() });

    type ComponentWithCore = IDatePickerComponent & { _core: { _parseCallback: (dateStr: string) => Date } };
    expect((harness.delegate.element as ComponentWithCore)['_core']['_parseCallback']).to.not.be.undefined;
  });

  it('should set format callback via config', () => {
    harness = setupTestContext({ formatCallback: date => '' });

    type ComponentWithCore = IDatePickerComponent & { _core: { _formatCallback: (date: Date) => string } };
    expect((harness.delegate.element as ComponentWithCore)['_core']['_formatCallback']).to.not.be.undefined;
  });

  it('should set popup classes via config', () => {
    harness = setupTestContext({ popupClasses: 'test-class' });

    expect(harness.delegate.element.popupClasses).to.equal('test-class');
  });

  it('should set value mode via config', () => {
    harness = setupTestContext({ valueMode: 'string' });

    expect(harness.delegate.element.valueMode).to.equal('string');
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

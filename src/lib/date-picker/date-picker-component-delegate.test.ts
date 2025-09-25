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
  before(() => {
    defineDatePickerComponent();
  });

  afterEach(function () {
    if (this.currentTest?.ctx.harness) {
      this.currentTest.ctx.harness.destroy();
    }
  });

  it('should create default date picker', function () {
    this.harness = setupTestContext();
    expect(this.harness.delegate.value).to.be.null;
  });

  it('should set value via config', function () {
    this.harness = setupTestContext({ value: '01/01/2020' });
    expect(this.harness.delegate.value).to.deep.equal(new Date('01/01/2020'));
  });

  it('should set value dynamically', function () {
    this.harness = setupTestContext();
    this.harness.delegate.value = '01/01/2020';

    expect(this.harness.delegate.value).to.deep.equal(new Date('01/01/2020'));
  });

  it('should set value via component', function () {
    this.harness = setupTestContext();
    const date = new Date('01/01/2020');
    this.harness.delegate.element.value = date;

    expect(this.harness.delegate.value).to.deep.equal(date);
  });

  it('should listen for change event', function () {
    this.harness = setupTestContext();

    const value = '01/01/2020';
    const changeSpy = spy();
    this.harness.delegate.onChange(changeSpy);
    _setInputValue(this.harness.delegate.element, value, 'input');

    expect(changeSpy.calledOnce).to.be.true;
    expect(changeSpy.calledWith(value)).to.be.true;
  });

  it('should listen for input event', function () {
    this.harness = setupTestContext();
    const inputSpy = spy();
    this.harness.delegate.onInput(inputSpy);
    _setInputValue(this.harness.delegate.element, '01/01/2020', 'input');

    expect(inputSpy.calledOnce).to.be.true;
  });

  it('should listen for input event when masked', function () {
    this.harness = setupTestContext();
    const inputSpy = spy();
    this.harness.delegate.onInput(inputSpy);
    _setInputValue(this.harness.delegate.element, '01/01/2020', 'input');

    expect(inputSpy.calledOnce).to.be.true;
  });

  it('should listen for focus event', function () {
    this.harness = setupTestContext();

    const focusSpy = spy();
    this.harness.delegate.onFocus(focusSpy);

    const input = this.harness.delegate.getInputElement();
    input.focus();

    expect(focusSpy.calledOnce).to.be.true;
  });

  it('should listen for blur event', function () {
    this.harness = setupTestContext();

    const blurSpy = spy();
    this.harness.delegate.onBlur(blurSpy);

    const input = this.harness.delegate.getInputElement();
    input.focus();
    input.blur();

    expect(blurSpy.calledOnce).to.be.true;
  });

  it('should set disabled via config', function () {
    this.harness = setupTestContext({ disabled: true });

    expect(this.harness.delegate.element.disabled).to.be.true;
    expect(this.harness.delegate.getInputElement().disabled).to.be.true;
  });

  it('should set disabled dynamically', function () {
    this.harness = setupTestContext();
    this.harness.delegate.disabled = true;

    expect(this.harness.delegate.element.disabled).to.be.true;
    expect(this.harness.delegate.getInputElement().disabled).to.be.true;
  });

  it('should set validity', function () {
    this.harness = setupTestContext();
    this.harness.delegate.invalid = true;

    expect(this.harness.delegate.invalid).to.be.true;
  });

  it('should set required via config', function () {
    this.harness = setupTestContext({}, { textFieldDelegateConfig: { props: { required: true } } });

    expect(this.harness.delegate.getTextFieldElement().required).to.be.true;
  });

  it('should set label via config', function () {
    this.harness = setupTestContext({}, { textFieldDelegateConfig: { options: { label: 'Test label' } } });

    const labelElement = this.harness.delegate.getTextFieldElement().querySelector('label') as HTMLLabelElement;
    expect(labelElement.textContent).to.equal('Test label');
  });

  it('should set min via config', function () {
    const minDate = new Date();
    this.harness = setupTestContext({ min: minDate });

    expect(this.harness.delegate.element.min).to.deep.equal(minDate);
  });

  it('should set max via config', function () {
    const maxDate = new Date();
    this.harness = setupTestContext({ max: maxDate });

    expect(this.harness.delegate.element.max).to.deep.equal(maxDate);
  });

  it('should set disabled dates via config', function () {
    const disabledDates = [new Date()];
    this.harness = setupTestContext({ disabledDates });

    expect(this.harness.delegate.element.disabledDates).to.deep.equal(disabledDates);
  });

  it('should set mask props via config', function () {
    this.harness = setupTestContext({
      masked: true,
      showMaskFormat: true,
      maskFormat: 'YYYY-MM-DD'
    });

    expect(this.harness.delegate.element.masked).to.equal(true);
    expect(this.harness.delegate.element.showMaskFormat).to.equal(true);
    expect(this.harness.delegate.element.maskFormat).to.equal('YYYY-MM-DD');
  });

  it('should set parse callback via config', function () {
    this.harness = setupTestContext({ parseCallback: dateStr => new Date() });

    type ComponentWithCore = IDatePickerComponent & { _core: { _parseCallback: (dateStr: string) => Date } };
    expect((this.harness.delegate.element as ComponentWithCore)['_core']['_parseCallback']).to.not.be.undefined;
  });

  it('should set format callback via config', function () {
    this.harness = setupTestContext({ formatCallback: date => '' });

    type ComponentWithCore = IDatePickerComponent & { _core: { _formatCallback: (date: Date) => string } };
    expect((this.harness.delegate.element as ComponentWithCore)['_core']['_formatCallback']).to.not.be.undefined;
  });

  it('should set popup classes via config', function () {
    this.harness = setupTestContext({ popupClasses: 'test-class' });

    expect(this.harness.delegate.element.popupClasses).to.equal('test-class');
  });

  it('should set value mode via config', function () {
    this.harness = setupTestContext({ valueMode: 'string' });

    expect(this.harness.delegate.element.valueMode).to.equal('string');
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

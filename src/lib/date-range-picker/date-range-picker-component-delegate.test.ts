import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { removeElement } from '@tylertech/forge-core';
import { DateRangeComponentDelegate, defineDateRangePickerComponent, IDatePickerRange } from './index';
import { defineTextFieldComponent } from '../text-field';

interface IDateRangeComponentDelegateHarness {
  delegate: DateRangeComponentDelegate;
  append(): void;
  destroy(): void;
}

describe('DateRangeComponentDelegate', () => {
  before(() => {
    defineDateRangePickerComponent();
    defineTextFieldComponent();
  });

  afterEach(function () {
    if (this.currentTest?.ctx?.harness) {
      this.currentTest.ctx.harness.destroy();
    }
  });

  it('should retrieve default value', function () {
    this.harness = setupTestContext(true);
    expect(this.harness.delegate.value).to.deep.equal({ from: null, to: null });
  });

  it('should set value', function () {
    this.harness = setupTestContext(true);
    const value = { from: '01/01/2020', to: '02/01/2020' };
    this.harness.delegate.value = value;

    expect(this.harness.delegate.value).to.deep.equal({ from: new Date(value.from), to: new Date(value.to) });
    expect(this.harness.delegate.element.value?.from).to.deep.equal(new Date(value.from));
    expect(this.harness.delegate.element.value?.to).to.deep.equal(new Date(value.to));
    expect(this.harness.delegate.fromInput.value).to.equal(value.from);
    expect(this.harness.delegate.toInput.value).to.equal(value.to);
  });

  it('should set default value', function () {
    const value = { from: '01/01/2020', to: '02/01/2020' };
    this.harness = setupTestContext(true, value);

    expect(this.harness.delegate.value).to.deep.equal({ from: new Date(value.from), to: new Date(value.to) });
    expect(this.harness.delegate.element.value?.from).to.deep.equal(new Date(value.from));
    expect(this.harness.delegate.element.value?.to).to.deep.equal(new Date(value.to));
    expect(this.harness.delegate.fromInput.value).to.equal(value.from);
    expect(this.harness.delegate.toInput.value).to.equal(value.to);
  });

  it('should execute change callback when "from" input is modified', function () {
    this.harness = setupTestContext(true);

    const changeSpy = spy();
    this.harness.delegate.onChange(changeSpy);
    this.harness.delegate.fromInput.value = '01/01/2020';
    this.harness.delegate.fromInput.dispatchEvent(new KeyboardEvent('input'));

    expect(changeSpy.calledOnce).to.be.true;
    const callArgs = changeSpy.getCall(0).args[0];
    expect(callArgs.from).to.deep.equal(new Date('01/01/2020'));
    expect(callArgs.to).to.be.null;
  });

  it('should execute change callback when "to" input is modified', function () {
    this.harness = setupTestContext(true);
    const changeSpy = spy();
    this.harness.delegate.onChange(changeSpy);
    this.harness.delegate.toInput.focus();
    this.harness.delegate.toInput.value = '01/01/2020';
    this.harness.delegate.toInput.dispatchEvent(new KeyboardEvent('input'));

    expect(changeSpy.calledOnce).to.be.true;
    const callArgs = changeSpy.getCall(0).args[0];
    expect(callArgs.from).to.be.null;
    expect(callArgs.to).to.deep.equal(new Date('01/01/2020'));
  });

  it('should set disabled', function () {
    this.harness = setupTestContext(true);
    this.harness.delegate.disabled = true;

    expect(this.harness.delegate.fromInput.disabled).to.be.true;
    expect(this.harness.delegate.toInput.disabled).to.be.true;
  });

  it('should set text-field invalid', function () {
    this.harness = setupTestContext(true);
    this.harness.delegate.invalid = true;

    expect(this.harness.delegate.textField.invalid).to.be.true;
  });

  it('should validate based on current state of input values', function () {
    this.harness = setupTestContext(true);

    expect(this.harness.delegate.invalid).to.be.false;

    this.harness.delegate.value = { from: '01/01/2020', to: '02/01/2020' };
    expect(this.harness.delegate.invalid).to.be.false;
  });

  function setupTestContext(append = false, defaultValue?: IDatePickerRange): IDateRangeComponentDelegateHarness {
    const fixtureElement = document.createElement('div');
    fixtureElement.id = 'date-range-delegate-test-fixture';
    const delegate = new DateRangeComponentDelegate(defaultValue ? { props: { value: defaultValue } } : undefined);
    fixtureElement.appendChild(delegate.element);
    if (append) {
      document.body.appendChild(fixtureElement);
    }
    return {
      delegate,
      append: () => document.body.appendChild(fixtureElement),
      destroy: () => {
        delegate.destroy();
        removeElement(fixtureElement);
      }
    };
  }
});

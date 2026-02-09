import { expect } from '@open-wc/testing';
import { removeElement } from '@tylertech/forge-core';
import { spy } from 'sinon';
import type { ISelectOption } from './core/index.js';
import { ISelectComponent } from './select/index.js';
import type { ISelectComponentDelegateConfig, ISelectComponentDelegateOptions, SelectComponentDelegateProps } from './select-component-delegate.js';
import { SelectComponentDelegate } from './select-component-delegate.js';

import './select/index.js';

interface ITestSelectComponentDelegateContext {
  delegate: SelectComponentDelegate;
  component: ISelectComponent;
  fixture: HTMLElement;
  destroy(): void;
}

const DEFAULT_OPTIONS: ISelectOption[] = [
  { label: 'One', value: '1' },
  { label: 'Two', value: '2' },
  { label: 'Three', value: '3' }
];

describe('SelectComponentDelegate', () => {
  afterEach(function () {
    this.currentTest?.ctx?.context?.destroy();
  });

  it('should be instantiated', function () {
    this.context = setupTestContext();

    expect(this.context.delegate).to.exist;
    expect(this.context.component).to.exist;
  });

  it('should set options', function () {
    this.context = setupTestContext();

    const expectedOptions = (this.context.component.options as ISelectOption[]).map(({ label, value }) => ({ label, value }));
    expect(expectedOptions).to.deep.equal(DEFAULT_OPTIONS);
  });

  it('should set placeholder', function () {
    const placeholder = 'Choose...';
    this.context = setupTestContext({ placeholder });

    expect(this.context.component.placeholder).to.equal(placeholder);
  });

  it('should set disabled', function () {
    const disabled = true;
    this.context = setupTestContext({ disabled });

    expect(this.context.component.disabled).to.equal(disabled);
  });

  it('should set multiple', function () {
    this.context = setupTestContext({ multiple: true });

    expect(this.context.component.multiple).to.be.true;
  });

  it('should set required', function () {
    this.context = setupTestContext({ required: true });

    expect(this.context.component.required).to.be.true;
  });

  it('should set invalid', function () {
    this.context = setupTestContext({ invalid: true });

    expect(this.context.component.invalid).to.be.true;
  });

  it('should set label', function () {
    const label = 'Label text';
    this.context = setupTestContext({ label });

    expect(this.context.component.label).to.equal(label);
  });

  it('should set floatLabel', function () {
    this.context = setupTestContext({ floatLabel: true });

    expect(this.context.component.floatLabel).to.be.true;
  });

  it('should set helperText', function () {
    const helperText = 'Choose an option';
    this.context = setupTestContext({}, { helperText });

    const helperTextElement = this.context.component.querySelector('[slot=helper-text]') as HTMLElement;

    expect(helperTextElement.innerText).to.equal(helperText);
  });

  it('should set value', function () {
    const { value } = DEFAULT_OPTIONS[1];
    this.context = setupTestContext({ value });

    expect(this.context.delegate.value).to.equal(value);
  });

  it('should set value dynamically', function () {
    this.context = setupTestContext();
    const value = `${DEFAULT_OPTIONS[0].value}`;
    this.context.delegate.value = value;

    expect(this.context.delegate.value).to.equal(value);
  });

  it('should notify changes', function () {
    this.context = setupTestContext();

    const changeSpy = spy();
    this.context.delegate.onChange(changeSpy);

    const value = `${DEFAULT_OPTIONS[0].value}`;
    this.context.component.open = true;

    this.context.component.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    this.context.component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(changeSpy).to.have.been.calledOnceWith(value);
  });

  it('should notify focus', function () {
    this.context = setupTestContext();

    const focusSpy = spy();
    this.context.delegate.onFocus(focusSpy);
    this.context.component.focus();

    expect(focusSpy).to.have.been.calledOnce;
  });

  it('should notify blur', function () {
    this.context = setupTestContext();

    const blurSpy = spy();
    this.context.delegate.onBlur(blurSpy);

    this.context.component.focus();
    this.context.component.blur();

    expect(blurSpy).to.have.been.calledOnce;
  });

  it('should set disabled via method', function () {
    this.context = setupTestContext();

    this.context.delegate.disabled = true;

    expect(this.context.component.disabled).to.be.true;
  });

  it('should remove helper text', function () {
    this.context = setupTestContext({}, { helperText: 'Choose an option.' });

    this.context.delegate.setHelperText(null);

    const helperTextElement = this.context.component.querySelector('[slot=helper-text]') as HTMLElement;
    expect(helperTextElement).to.not.exist;
  });

  function setupTestContext(props?: SelectComponentDelegateProps, options?: ISelectComponentDelegateOptions): ITestSelectComponentDelegateContext {
    const delegateConfig: ISelectComponentDelegateConfig = {
      props: {
        ...props,
        options: DEFAULT_OPTIONS
      },
      options
    };
    const delegate = new SelectComponentDelegate(delegateConfig);
    const fixture = document.createElement('div');
    fixture.id = 'select-component-delegate-fixture';
    fixture.appendChild(delegate.element);
    document.body.append(fixture);

    return {
      delegate,
      component: delegate.element,
      fixture,
      destroy: () => {
        removeElement(fixture);
        delegate.destroy();
      }
    };
  }
});

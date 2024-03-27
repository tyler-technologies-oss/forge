import { ISelectComponent, ISelectComponentDelegateOptions, SelectComponentDelegate, defineSelectComponent, ISelectOption, SelectComponentDelegateProps, ISelectComponentDelegateConfig } from '@tylertech/forge';
import { removeElement } from '@tylertech/forge-core';
import { dispatchKeyEvent } from '@tylertech/forge-testing';

interface ITestContext {
  context: ITestSelectComponentDelegateContext;
}

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

describe('SelectComponentDelegate', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineSelectComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should be instantiated', function(this: ITestContext) {
    this.context = setupTestContext();

    expect(this.context.delegate).toBeTruthy();
    expect(this.context.component).toBeTruthy();
  });

  it('should set options', function(this: ITestContext) {
    this.context = setupTestContext();

    const expectedOptions = (<ISelectOption[]>this.context.component.options).map(({ label, value }) => ({ label, value }));
    expect(expectedOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('should set placeholder', function(this: ITestContext) {
    const placeholder = 'Choose...';
    this.context = setupTestContext({ placeholder });

    expect(this.context.component.placeholder).toBe(placeholder);
  });

  it('should set disabled', function(this: ITestContext) {
    const disabled = true;
    this.context = setupTestContext({ disabled });

    expect(this.context.component.disabled).toBe(disabled);
  });

  it('should set multiple', function(this: ITestContext) {
    this.context = setupTestContext({ multiple: true });

    expect(this.context.component.multiple).toBeTrue();
  });

  it('should set required', function(this: ITestContext) {
    this.context = setupTestContext({ required: true });

    expect(this.context.component.required).toBeTrue();
  });

  it('should set invalid', function(this: ITestContext) {
    this.context = setupTestContext({ invalid: true });

    expect(this.context.component.invalid).toBeTrue();
  });

  it('should set label', function(this: ITestContext) {
    const label = 'Label text';
    this.context = setupTestContext({ label });

    expect(this.context.component.label).toBe(label);
  });

  it('should set floatLabel', function(this: ITestContext) {
    this.context = setupTestContext({ floatLabel: true });

    expect(this.context.component.floatLabel).toBeTrue();
  });

  it('should set helperText', function(this: ITestContext) {
    const helperText = 'Choose an option';
    this.context = setupTestContext({}, { helperText });

    const helperTextElement = this.context.component.querySelector('[slot=helper-text]') as HTMLElement;

    expect(helperTextElement.innerText).toBe(helperText);
  });

  it('should set value', function(this: ITestContext) {
    const { value } = DEFAULT_OPTIONS[1];
    this.context = setupTestContext({ value });

    expect(this.context.delegate.value).toBe(value);
  });

  it('should set value dynamically', function(this: ITestContext) {
    this.context = setupTestContext();
    const value = `${DEFAULT_OPTIONS[0].value}`;
    this.context.delegate.value = value;

    expect(this.context.delegate.value).toBe(value);
  });

  it('should notify changes', function(this: ITestContext) {
    this.context = setupTestContext();

    const changeSpy = jasmine.createSpy('change spy');
    this.context.delegate.onChange(changeSpy);

    const value = `${DEFAULT_OPTIONS[0].value}`;
    this.context.component.open = true;

    dispatchKeyEvent(this.context.component, 'keydown', 'ArrowDown');
    dispatchKeyEvent(this.context.component, 'keydown', 'Enter');

    expect(changeSpy).toHaveBeenCalledOnceWith(value);
  });

  it('should notify focus', function(this: ITestContext) {
    this.context = setupTestContext();

    const focusSpy = jasmine.createSpy('focus spy');
    this.context.delegate.onFocus(focusSpy);
    this.context.component.focus();

    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it('should notify blur', function(this: ITestContext) {
    this.context = setupTestContext();

    const blurSpy = jasmine.createSpy('blur spy');
    this.context.delegate.onBlur(blurSpy);

    this.context.component.focus();
    this.context.component.blur();

    expect(blurSpy).toHaveBeenCalledTimes(1);
  });

  it('should set disabled via method', function(this: ITestContext) {
    this.context = setupTestContext();

    this.context.delegate.disabled = true;

    expect(this.context.component.disabled).toBeTrue();
  });

  it('should remove helper text', function(this: ITestContext) {
    this.context = setupTestContext({}, { helperText: 'Choose an option.' });

    this.context.delegate.setHelperText(null);
    
    const helperTextElement = this.context.component.querySelector('[slot=helper-text]') as HTMLElement;
    expect(helperTextElement).toBeFalsy();
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

import { describe, it, expect, vi, afterEach } from 'vitest';
import { removeElement } from '@tylertech/forge-core';
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
  let context: ITestSelectComponentDelegateContext | null = null;

  afterEach(() => {
    context?.destroy();
    context = null;
  });

  it('should be instantiated', () => {
    context = setupTestContext();

    expect(context.delegate).toBeTruthy();
    expect(context.component).toBeTruthy();
  });

  it('should set options', () => {
    context = setupTestContext();

    const expectedOptions = (context.component.options as ISelectOption[]).map(({ label, value }) => ({ label, value }));
    expect(expectedOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('should set placeholder', () => {
    const placeholder = 'Choose...';
    context = setupTestContext({ placeholder });

    expect(context.component.placeholder).toBe(placeholder);
  });

  it('should set disabled', () => {
    const disabled = true;
    context = setupTestContext({ disabled });

    expect(context.component.disabled).toBe(disabled);
  });

  it('should set multiple', () => {
    context = setupTestContext({ multiple: true });

    expect(context.component.multiple).toBe(true);
  });

  it('should set required', () => {
    context = setupTestContext({ required: true });

    expect(context.component.required).toBe(true);
  });

  it('should set invalid', () => {
    context = setupTestContext({ invalid: true });

    expect(context.component.invalid).toBe(true);
  });

  it('should set label', () => {
    const label = 'Label text';
    context = setupTestContext({ label });

    expect(context.component.label).toBe(label);
  });

  it('should set floatLabel', () => {
    context = setupTestContext({ floatLabel: true });

    expect(context.component.floatLabel).toBe(true);
  });

  it('should set helperText', () => {
    const helperText = 'Choose an option';
    context = setupTestContext({}, { helperText });

    const helperTextElement = context.component.querySelector('[slot=helper-text]') as HTMLElement;

    expect(helperTextElement.innerText).toBe(helperText);
  });

  it('should set value', () => {
    const { value } = DEFAULT_OPTIONS[1];
    context = setupTestContext({ value });

    expect(context.delegate.value).toBe(value);
  });

  it('should set value dynamically', () => {
    context = setupTestContext();
    const value = `${DEFAULT_OPTIONS[0].value}`;
    context.delegate.value = value;

    expect(context.delegate.value).toBe(value);
  });

  it('should notify changes', () => {
    context = setupTestContext();

    const changeSpy = vi.fn();
    context.delegate.onChange(changeSpy);

    const value = `${DEFAULT_OPTIONS[0].value}`;
    context.component.open = true;

    context.component.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    context.component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy).toHaveBeenCalledWith(value);
  });

  it('should notify focus', () => {
    context = setupTestContext();

    const focusSpy = vi.fn();
    context.delegate.onFocus(focusSpy);
    context.component.focus();

    expect(focusSpy).toHaveBeenCalledOnce();
  });

  it('should notify blur', () => {
    context = setupTestContext();

    const blurSpy = vi.fn();
    context.delegate.onBlur(blurSpy);

    context.component.focus();
    context.component.blur();

    expect(blurSpy).toHaveBeenCalledOnce();
  });

  it('should set disabled via method', () => {
    context = setupTestContext();

    context.delegate.disabled = true;

    expect(context.component.disabled).toBe(true);
  });

  it('should remove helper text', () => {
    context = setupTestContext({}, { helperText: 'Choose an option.' });

    context.delegate.setHelperText(null);

    const helperTextElement = context.component.querySelector('[slot=helper-text]') as HTMLElement;
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

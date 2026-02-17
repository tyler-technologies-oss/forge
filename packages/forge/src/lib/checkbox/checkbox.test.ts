import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import { CHECKBOX_CONSTANTS, CheckboxComponentDelegate, ICheckboxComponent } from '../checkbox/index.js';
import { internals } from '../constants.js';
import type { IFocusIndicatorComponent } from '../focus-indicator/index.js';
import type { IStateLayerComponent } from '../state-layer/index.js';

import './checkbox.js';

class CheckboxHarness extends TestHarness<ICheckboxComponent> {
  public rootElement: HTMLElement;
  public containerElement: HTMLElement;
  public backgroundElement: HTMLElement;
  public checkmarkElement: HTMLElement;
  public checkmarkPathElement: HTMLElement;
  public mixedmarkElement: HTMLElement;
  public mixedmarkPathElement: HTMLElement;
  public labelElement: HTMLElement;
  public stateLayer: IStateLayerComponent;
  public focusIndicator: IFocusIndicatorComponent;

  constructor(el: ICheckboxComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.rootElement = getShadowElement(this.element, CHECKBOX_CONSTANTS.selectors.ROOT);
    this.containerElement = getShadowElement(this.element, '#container');
    this.backgroundElement = getShadowElement(this.element, '[part="background"]');
    this.checkmarkElement = getShadowElement(this.element, '[part="checkmark"]');
    this.checkmarkPathElement = getShadowElement(this.element, '[part="checkmark-path"]');
    this.mixedmarkElement = getShadowElement(this.element, '[part="mixedmark"]');
    this.mixedmarkPathElement = getShadowElement(this.element, '[part="mixedmark-path"]');
    this.labelElement = getShadowElement(this.element, CHECKBOX_CONSTANTS.selectors.LABEL);
    this.stateLayer = getShadowElement(this.element, '[part="state-layer"]') as IStateLayerComponent;
    this.focusIndicator = getShadowElement(this.element, '[part="focus-indicator"]') as IFocusIndicatorComponent;
  }

  public async pressSpaceKey(): Promise<void> {
    await userEvent.keyboard(' ');
  }

  public async clickElement(el: HTMLElement): Promise<void> {
    await userEvent.click(el);
  }
}

describe('Checkbox', () => {
  it('should contain shadow root', async () => {
    const screen = render(html`<forge-checkbox></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const ariaScreen = render(html`<forge-checkbox aria-label="Active"></forge-checkbox>`);
    const ariaEl = ariaScreen.container.querySelector('forge-checkbox') as ICheckboxComponent;
    await expect(ariaEl).toBeAccessible();

    const labelScreen = render(html`<forge-checkbox>Active</forge-checkbox>`);
    const labelEl = labelScreen.container.querySelector('forge-checkbox') as ICheckboxComponent;
    await expect(labelEl).toBeAccessible();
  });

  it('should render with correct default values', async () => {
    const screen = render(html`<forge-checkbox></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;
    const ctx = new CheckboxHarness(el);

    await expect(el).not.toBeAccessible();
    expect(el.checked).toBe(false);
    expect(el.defaultChecked).toBe(false);
    expect(el.indeterminate).toBe(false);
    expect(el.value).toBe('on');
    expect(el.dense).toBe(false);
    expect(el.disabled).toBe(false);
    expect(el.required).toBe(false);
    expect(el.readonly).toBe(false);
    expect(el.labelPosition).toBe('end');
    expect(ctx.rootElement.lastElementChild).toBe(ctx.labelElement);
  });

  it('should accept checked', async () => {
    const screen = render(html`<forge-checkbox checked></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;

    expect(el.checked).toBe(true);
  });

  it('should accept default-checked', async () => {
    const screen = render(html`<forge-checkbox default-checked></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;

    expect(el.defaultChecked).toBe(true);
  });

  it('should accept indeterminate', async () => {
    const screen = render(html`<forge-checkbox indeterminate></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;

    expect(el.indeterminate).toBe(true);
  });

  it('should accept value', async () => {
    const screen = render(html`<forge-checkbox value="value"></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;

    expect(el.value).toBe('value');
  });

  it('should accept dense', async () => {
    const screen = render(html`<forge-checkbox dense></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;

    expect(el.dense).toBe(true);
  });

  it('should accept disabled', async () => {
    const screen = render(html`<forge-checkbox disabled aria-label="Active"></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;

    expect(el.disabled).toBe(true);
    await expect(el).toBeAccessible();
  });

  it('should accept required', async () => {
    const screen = render(html`<forge-checkbox required></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;

    expect(el.required).toBe(true);
  });

  it('should accept readonly', async () => {
    const screen = render(html`<forge-checkbox readonly></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;
    const changeSpy = vi.fn();

    el.addEventListener('change', changeSpy);

    expect(el.readonly).toBe(true);
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('should accept label-position', async () => {
    const screen = render(html`<forge-checkbox label-position="start"></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;
    const ctx = new CheckboxHarness(el);

    expect(el.labelPosition).toBe('start');
    expect(ctx.rootElement.firstElementChild).toBe(ctx.labelElement);

    el.labelPosition = 'end';

    expect(el.labelPosition).toBe('end');
    expect(ctx.rootElement.lastElementChild).toBe(ctx.labelElement);
  });

  it('should not set non-string value as attribute', async () => {
    const screen = render(html`<forge-checkbox></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;
    const value = { value: 'value' } as any;
    el.value = value;

    expect(el.value).toBe(value);
    expect(el.getAttribute('value')).toBeNull();
  });

  it('should toggle', async () => {
    const screen = render(html`<forge-checkbox></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;

    el.toggle();

    expect(el.checked).toBe(true);
  });

  it('should toggle checked', async () => {
    const screen = render(html`<forge-checkbox aria-label="Active"></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;

    el.toggle(true);

    expect(el.checked).toBe(true);
    await expect(el).toBeAccessible();
  });

  it('should toggle unchecked', async () => {
    const screen = render(html`<forge-checkbox checked></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;

    el.toggle(false);

    expect(el.checked).toBe(false);
  });

  it('should maintain checked state when indeterminate', async () => {
    const screen = render(html`<forge-checkbox indeterminate></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;

    el.checked = true;

    expect(el.checked).toBe(true);
    expect(el.indeterminate).toBe(true);

    el.indeterminate = false;
    el.indeterminate = true;

    expect(el.checked).toBe(true);
    expect(el.indeterminate).toBe(true);

    el.checked = false;

    expect(el.checked).toBe(false);
    expect(el.indeterminate).toBe(true);

    el.indeterminate = false;
    el.indeterminate = true;

    expect(el.checked).toBe(false);
    expect(el.indeterminate).toBe(true);
  });

  it('should dismiss indeterminate when user toggled', async () => {
    const screen = render(html`<forge-checkbox indeterminate></forge-checkbox>`);
    const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;
    const ctx = new CheckboxHarness(el);

    await ctx.clickElement(ctx.containerElement);

    expect(el.indeterminate).toBe(false);
  });

  describe('form association', () => {
    it('should return form element and name', async () => {
      const screen = render(html`<form name="test-form"></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;

      const checkboxEl = document.createElement('forge-checkbox');
      checkboxEl.setAttribute('name', 'test-checkbox');
      form.appendChild(checkboxEl);

      expect(checkboxEl.form).toBe(form);
      expect(checkboxEl.name).toBe('test-checkbox');
      expect(checkboxEl.labels).toHaveLength(0);

      checkboxEl.name = 'new-name';
      expect(checkboxEl.name).toBe('new-name');

      checkboxEl.name = null as any;
      expect(checkboxEl.name).toBe('');
    });

    it('should return associated form labels', async () => {
      const screen = render(html`<form name="test-form"></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;

      const checkboxEl = document.createElement('forge-checkbox');
      checkboxEl.setAttribute('id', 'test-checkbox');
      form.appendChild(checkboxEl);

      const labelText = 'Test Label';
      const labelEl = document.createElement('label');
      labelEl.setAttribute('for', 'test-checkbox');
      labelEl.textContent = labelText;
      form.appendChild(labelEl);

      expect(checkboxEl.labels).toHaveLength(1);
      expect(checkboxEl.labels[0]).toBe(labelEl);
    });

    it('should set form value when value is set', async () => {
      const screen = render(html`<form name="test-form"></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;

      const checkboxEl = document.createElement('forge-checkbox');
      checkboxEl.setAttribute('name', 'test-checkbox');
      form.appendChild(checkboxEl);

      let formData = new FormData(form);
      expect(formData.get('test-checkbox')).toBeNull();

      checkboxEl.checked = true;
      formData = new FormData(form);
      expect(formData.get('test-checkbox')).toBe('on');
    });

    it('should reset value when form is reset', async () => {
      const screen = render(html`<form name="test-form"></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;

      const checkboxEl = document.createElement('forge-checkbox');
      checkboxEl.setAttribute('name', 'test-checkbox');
      form.appendChild(checkboxEl);

      checkboxEl.checked = true;
      let formData = new FormData(form);
      expect(formData.get('test-checkbox')).toBe('on');

      form.reset();
      formData = new FormData(form);

      expect(checkboxEl.checked).toBe(false);
      expect(formData.get('test-checkbox')).toBeNull();

      checkboxEl.defaultChecked = true;
      formData = new FormData(form);
      expect(formData.get('test-checkbox')).toBeNull();

      form.reset();
      formData = new FormData(form);

      expect(checkboxEl.checked).toBe(true);
      expect(formData.get('test-checkbox')).toBe('on');
    });

    it('should restore form state', async () => {
      const screen = render(html`<form name="test-form"></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;

      const checkboxEl = document.createElement('forge-checkbox') as ICheckboxComponent;
      const setFormValueSpy = vi.spyOn(checkboxEl, 'setFormValue');
      checkboxEl.name = 'test-checkbox';
      checkboxEl.toggleAttribute('checked', true);
      form.appendChild(checkboxEl);

      const [value, state] = setFormValueSpy.mock.calls[0] ?? [null, null];
      const newCheckboxEl = document.createElement('forge-checkbox') as ICheckboxComponent;
      newCheckboxEl.name = 'test-checkbox';
      checkboxEl.remove();
      form.appendChild(newCheckboxEl);

      let restoreState: any = state ?? value;
      if (restoreState instanceof FormData) {
        restoreState = Array.from((restoreState as any).entries());
      }

      newCheckboxEl.formStateRestoreCallback(restoreState, 'restore');

      expect(newCheckboxEl.checked).toBe(true);
      expect(newCheckboxEl.indeterminate).toBe(false);
    });

    it('should validate', async () => {
      const screen = render(html`<forge-checkbox required></forge-checkbox>`);
      const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;

      expect(el[internals].validity.valid).toBe(false);
      expect(el[internals].validationMessage).not.toBe('');
      expect(el[internals].checkValidity()).toBe(false);
      expect(el[internals].reportValidity()).toBe(false);

      el.checked = true;

      expect(el[internals].willValidate).toBe(true);
      expect(el[internals].validity.valid).toBe(true);
      expect(el[internals].validationMessage).toBe('');
      expect(el[internals].checkValidity()).toBe(true);
      expect(el[internals].reportValidity()).toBe(true);
    });

    it('should set custom validity', async () => {
      const screen = render(html`<forge-checkbox required></forge-checkbox>`);
      const el = screen.container.querySelector('forge-checkbox') as ICheckboxComponent;
      const message = 'Custom error message';

      el[internals].setValidity({ customError: true }, message);

      expect(el[internals].validationMessage).toBe(message);
    });
  });

  describe('delegate', () => {
    it('should create delegate with default values', () => {
      const delegate = new CheckboxComponentDelegate();

      expect(delegate.checked).toBe(false);
      expect(delegate.defaultChecked).toBe(false);
      expect(delegate.indeterminate).toBe(false);
      expect(delegate.value).toBe('on');
      expect(delegate.dense).toBe(false);
      expect(delegate.disabled).toBe(false);
      expect(delegate.required).toBe(false);
      expect(delegate.readonly).toBe(false);
      expect(delegate.labelPosition).toBe('end');
    });

    it('should set properties via the constructor', () => {
      const delegate = new CheckboxComponentDelegate({
        props: {
          checked: true,
          defaultChecked: true,
          indeterminate: true,
          value: 'value',
          dense: true,
          disabled: true,
          required: true,
          readonly: true,
          labelPosition: 'start'
        }
      });

      expect(delegate.checked).toBe(true);
      expect(delegate.defaultChecked).toBe(true);
      expect(delegate.indeterminate).toBe(true);
      expect(delegate.value).toBe('value');
      expect(delegate.dense).toBe(true);
      expect(delegate.disabled).toBe(true);
      expect(delegate.required).toBe(true);
      expect(delegate.readonly).toBe(true);
      expect(delegate.labelPosition).toBe('start');
    });

    it('should set checked', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.checked = true;
      expect(delegate.checked).toBe(true);
    });

    it('should set defaultChecked', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.defaultChecked = true;
      expect(delegate.defaultChecked).toBe(true);
    });

    it('should set indeterminate', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.indeterminate = true;
      expect(delegate.indeterminate).toBe(true);
    });

    it('should set value', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.value = 'value';
      expect(delegate.value).toBe('value');
    });

    it('should set dense', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.dense = true;
      expect(delegate.dense).toBe(true);
    });

    it('should set disabled', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.disabled = true;
      expect(delegate.disabled).toBe(true);
    });

    it('should set required', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.required = true;
      expect(delegate.required).toBe(true);
    });

    it('should set readonly', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.readonly = true;
      expect(delegate.readonly).toBe(true);
    });

    it('should set labelPosition', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.labelPosition = 'start';
      expect(delegate.labelPosition).toBe('start');
    });

    it('should toggle', () => {
      const delegate = new CheckboxComponentDelegate();

      delegate.toggle();
      expect(delegate.checked).toBe(true);

      delegate.toggle(false);
      expect(delegate.checked).toBe(false);

      delegate.toggle(true);
      expect(delegate.checked).toBe(true);
    });

    it('should set label via constructor', () => {
      const delegate = new CheckboxComponentDelegate({ options: { label: 'Label' } });
      expect(delegate.element.innerText).toBe('Label');
    });

    it('should set label', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.setLabel('Label');
      expect(delegate.element.innerText).toBe('Label');
    });
  });
});

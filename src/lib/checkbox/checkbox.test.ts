import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { TestHarness } from '../../test/utils/test-harness';
import { CHECKBOX_CONSTANTS, CheckboxComponentDelegate, ICheckboxComponent } from '../checkbox';
import { internals } from '../constants';
import { IFocusIndicatorComponent } from '../focus-indicator';
import { IStateLayerComponent } from '../state-layer';

import './checkbox';

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
    await sendKeys({ press: ' ' });
  }

  public async clickElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height } = el.getBoundingClientRect();

    await sendMouse({
      type: 'click',
      position: [Math.floor(x + window.scrollX + width / 2), Math.floor(y + window.scrollY + height / 2)]
    });
  }
}

describe('Checkbox', () => {
  it('should contain shadow root', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox></forge-checkbox>`);
    expect(el.shadowRoot).to.not.be.null;
  });

  it('should be accessible', async () => {
    const ariaEl = await fixture<ICheckboxComponent>(html`<forge-checkbox aria-label="Active"></forge-checkbox>`);
    await expect(ariaEl).to.be.accessible();

    const labelEl = await fixture<ICheckboxComponent>(html`<forge-checkbox>Active</forge-checkbox>`);
    await expect(labelEl).to.be.accessible();
  });

  it('should render with correct default values', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox></forge-checkbox>`);
    const ctx = new CheckboxHarness(el);

    await expect(el).not.to.be.accessible();
    expect(el.checked).to.be.false;
    expect(el.defaultChecked).to.be.false;
    expect(el.indeterminate).to.be.false;
    expect(el.value).to.equal('on');
    expect(el.dense).to.be.false;
    expect(el.disabled).to.be.false;
    expect(el.required).to.be.false;
    expect(el.readonly).to.be.false;
    expect(el.labelPosition).to.equal('end');
    expect(ctx.rootElement.lastElementChild).to.equal(ctx.labelElement);
  });

  it('should accept checked', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox checked></forge-checkbox>`);
    expect(el.checked).to.be.true;
  });

  it('should accept default-checked', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox default-checked></forge-checkbox>`);
    expect(el.defaultChecked).to.be.true;
  });

  it('should accept indeterminate', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox indeterminate></forge-checkbox>`);
    expect(el.indeterminate).to.be.true;
  });

  it('should accept value', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox value="value"></forge-checkbox>`);
    expect(el.value).to.equal('value');
  });

  it('should accept dense', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox dense></forge-checkbox>`);
    expect(el.dense).to.be.true;
  });

  it('should accept disabled', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox disabled aria-label="Active"></forge-checkbox>`);

    expect(el.disabled).to.be.true;
    await expect(el).to.be.accessible();
  });

  it('should accept required', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox required></forge-checkbox>`);
    expect(el.required).to.be.true;
  });

  it('should accept readonly', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox readonly></forge-checkbox>`);
    const changeSpy = spy();

    el.addEventListener('change', changeSpy);

    expect(el.readonly).to.be.true;
    expect(changeSpy).to.not.have.been.called;
  });

  it('should accept label-position', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox label-position="start"></forge-checkbox>`);
    const ctx = new CheckboxHarness(el);

    expect(el.labelPosition).to.equal('start');
    expect(ctx.rootElement.firstElementChild).to.equal(ctx.labelElement);

    el.labelPosition = 'end';

    expect(el.labelPosition).to.equal('end');
    expect(ctx.rootElement.lastElementChild).to.equal(ctx.labelElement);
  });

  it('should not set non-string value as attribute', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox></forge-checkbox>`);
    const value = { value: 'value' } as any;
    el.value = value;
    expect(el.value).to.equal(value);
    expect(el.getAttribute('value')).to.be.null;
  });

  it('should toggle', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox></forge-checkbox>`);

    el.toggle();

    expect(el.checked).to.be.true;
  });

  it('should toggle checked', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox aria-label="Active"></forge-checkbox>`);

    el.toggle(true);

    expect(el.checked).to.be.true;
    await expect(el).to.be.accessible();
  });

  it('should toggle unchecked', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox checked></forge-checkbox>`);

    el.toggle(false);

    expect(el.checked).to.be.false;
  });

  it('should maintain checked state when indeterminate', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox indeterminate></forge-checkbox>`);

    // Set checked while indeterminate
    el.checked = true;

    expect(el.checked).to.be.true;
    expect(el.indeterminate).to.be.true;

    // Set indeterminate while checked
    el.indeterminate = false;
    el.indeterminate = true;

    expect(el.checked).to.be.true;
    expect(el.indeterminate).to.be.true;

    // Unset checked while indeterminate
    el.checked = false;

    expect(el.checked).to.be.false;
    expect(el.indeterminate).to.be.true;

    // Set indeterminate while unchecked
    el.indeterminate = false;
    el.indeterminate = true;

    expect(el.checked).to.be.false;
    expect(el.indeterminate).to.be.true;
  });

  it('should dismiss indeterminate when user toggled', async () => {
    const el = await fixture<ICheckboxComponent>(html`<forge-checkbox indeterminate></forge-checkbox>`);
    const ctx = new CheckboxHarness(el);

    await ctx.clickElement(ctx.containerElement);

    expect(el.indeterminate).to.be.false;
  });

  describe('form association', () => {
    it('should return form element and name', async () => {
      const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

      const checkboxEl = document.createElement('forge-checkbox');
      checkboxEl.setAttribute('name', 'test-checkbox');
      form.appendChild(checkboxEl);

      expect(checkboxEl.form).to.equal(form);
      expect(checkboxEl.name).to.equal('test-checkbox');
      expect(checkboxEl.labels).to.be.empty;

      checkboxEl.name = 'new-name';
      expect(checkboxEl.name).to.equal('new-name');

      checkboxEl.name = null as any;
      expect(checkboxEl.name).to.be.empty;
    });

    it('should return associated form labels', async () => {
      const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

      const checkboxEl = document.createElement('forge-checkbox');
      checkboxEl.setAttribute('id', 'test-checkbox');
      form.appendChild(checkboxEl);

      const labelText = 'Test Label';
      const labelEl = document.createElement('label');
      labelEl.setAttribute('for', 'test-checkbox');
      labelEl.textContent = labelText;
      form.appendChild(labelEl);

      expect(checkboxEl.labels).to.have.lengthOf(1);
      expect(checkboxEl.labels[0]).to.equal(labelEl);
    });

    it('should set form value when value is set', async () => {
      const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

      const checkboxEl = document.createElement('forge-checkbox');
      checkboxEl.setAttribute('name', 'test-checkbox');
      form.appendChild(checkboxEl);

      let formData = new FormData(form);
      expect(formData.get('test-checkbox')).to.be.null;

      checkboxEl.checked = true;
      formData = new FormData(form);
      expect(formData.get('test-checkbox')).to.equal('on');
    });

    it('should reset value when form is reset', async () => {
      const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

      const checkboxEl = document.createElement('forge-checkbox');
      checkboxEl.setAttribute('name', 'test-checkbox');
      form.appendChild(checkboxEl);

      checkboxEl.checked = true;
      let formData = new FormData(form);
      expect(formData.get('test-checkbox')).to.equal('on');

      form.reset();
      formData = new FormData(form);

      expect(checkboxEl.checked).to.be.false;
      expect(formData.get('test-checkbox')).to.be.null;

      checkboxEl.defaultChecked = true;
      formData = new FormData(form);
      expect(formData.get('test-checkbox')).to.be.null;

      form.reset();
      formData = new FormData(form);

      expect(checkboxEl.checked).to.be.true;
      expect(formData.get('test-checkbox')).to.equal('on');
    });

    it('should restore form state', async () => {
      const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

      const checkboxEl = document.createElement('forge-checkbox') as ICheckboxComponent;
      const setFormValueSpy = spy(checkboxEl, 'setFormValue');
      checkboxEl.name = 'test-checkbox';
      checkboxEl.toggleAttribute('checked', true);
      form.appendChild(checkboxEl);

      const [value, state] = setFormValueSpy.args[0] ?? [null, null];
      const newCheckboxEl = document.createElement('forge-checkbox') as ICheckboxComponent;
      newCheckboxEl.name = 'test-checkbox';
      checkboxEl.remove();
      form.appendChild(newCheckboxEl);

      let restoreState: any = state ?? value;
      if (restoreState instanceof FormData) {
        restoreState = Array.from((restoreState as any).entries());
      }

      newCheckboxEl.formStateRestoreCallback(restoreState, 'restore');

      expect(newCheckboxEl.checked).to.be.true;
      expect(newCheckboxEl.indeterminate).to.be.false;
    });

    it('should validate', async () => {
      const el = await fixture<ICheckboxComponent>(html`<forge-checkbox required></forge-checkbox>`);

      expect(el[internals].validity.valid).to.be.false;
      expect(el[internals].validationMessage).not.to.be.empty;
      expect(el[internals].checkValidity()).to.be.false;
      expect(el[internals].reportValidity()).to.be.false;

      el.checked = true;

      expect(el[internals].willValidate).to.be.true;
      expect(el[internals].validity.valid).to.be.true;
      expect(el[internals].validationMessage).to.be.empty;
      expect(el[internals].checkValidity()).to.be.true;
      expect(el[internals].reportValidity()).to.be.true;
    });

    it('should set custom validity', async () => {
      const el = await fixture<ICheckboxComponent>(html`<forge-checkbox required></forge-checkbox>`);
      const message = 'Custom error message';

      el[internals].setValidity({ customError: true }, message);

      expect(el[internals].validationMessage).to.equal(message);
    });
  });

  describe('delegate', () => {
    it('should create delegate with default values', () => {
      const delegate = new CheckboxComponentDelegate();
      expect(delegate.checked).to.be.false;
      expect(delegate.defaultChecked).to.be.false;
      expect(delegate.indeterminate).to.be.false;
      expect(delegate.value).to.equal('on');
      expect(delegate.dense).to.be.false;
      expect(delegate.disabled).to.be.false;
      expect(delegate.required).to.be.false;
      expect(delegate.readonly).to.be.false;
      expect(delegate.labelPosition).to.equal('end');
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
      expect(delegate.checked).to.be.true;
      expect(delegate.defaultChecked).to.be.true;
      expect(delegate.indeterminate).to.be.true;
      expect(delegate.value).to.equal('value');
      expect(delegate.dense).to.be.true;
      expect(delegate.disabled).to.be.true;
      expect(delegate.required).to.be.true;
      expect(delegate.readonly).to.be.true;
      expect(delegate.labelPosition).to.equal('start');
    });

    it('should set checked', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.checked = true;
      expect(delegate.checked).to.be.true;
    });

    it('should set defaultChecked', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.defaultChecked = true;
      expect(delegate.defaultChecked).to.be.true;
    });

    it('should set indeterminate', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.indeterminate = true;
      expect(delegate.indeterminate).to.be.true;
    });

    it('should set value', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.value = 'value';
      expect(delegate.value).to.equal('value');
    });

    it('should set dense', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.dense = true;
      expect(delegate.dense).to.be.true;
    });

    it('should set disabled', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.disabled = true;
      expect(delegate.disabled).to.be.true;
    });

    it('should set required', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.required = true;
      expect(delegate.required).to.be.true;
    });

    it('should set readonly', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.readonly = true;
      expect(delegate.readonly).to.be.true;
    });

    it('should set labelPosition', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.labelPosition = 'start';
      expect(delegate.labelPosition).to.equal('start');
    });

    it('should toggle', () => {
      const delegate = new CheckboxComponentDelegate();

      delegate.toggle();
      expect(delegate.checked).to.be.true;

      delegate.toggle(false);
      expect(delegate.checked).to.be.false;

      delegate.toggle(true);
      expect(delegate.checked).to.be.true;
    });

    it('should set label via constructor', () => {
      const delegate = new CheckboxComponentDelegate({ options: { label: 'Label' } });
      expect(delegate.element.innerText).to.equal('Label');
    });

    it('should set label', () => {
      const delegate = new CheckboxComponentDelegate();
      delegate.setLabel('Label');
      expect(delegate.element.innerText).to.equal('Label');
    });
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../../core/testing/test-harness.js';
import type { IFocusIndicatorComponent } from '../../focus-indicator/index.js';
import type { IStateLayerComponent } from '../../state-layer/index.js';
import type { IRadioComponent } from '../radio/index.js';
import { RADIO_CONSTANTS } from '../radio/index.js';
import { getFormState, getFormValue, internals } from '../../constants.js';
import { frame, task } from '../../core/index.js';
import { RadioComponentDelegate } from './radio-component-delegate.js';

import './radio.js';

class RadioHarness extends TestHarness<HTMLElement> {
  public radioElements: IRadioComponent[];

  constructor(el: HTMLElement) {
    super(el);
  }

  public initElementRefs(): void {
    this.radioElements = Array.from(this.element.querySelectorAll(RADIO_CONSTANTS.elementName));
  }

  public getRootElement(el: IRadioComponent): HTMLElement {
    return getShadowElement(el, RADIO_CONSTANTS.selectors.ROOT);
  }

  public getLabelElement(el: IRadioComponent): HTMLElement {
    return getShadowElement(el, RADIO_CONSTANTS.selectors.LABEL);
  }

  public getStateLayer(el: IRadioComponent): IStateLayerComponent {
    return getShadowElement(el, '[part=state-layer]') as IStateLayerComponent;
  }

  public getFocusIndicator(el: IRadioComponent): IFocusIndicatorComponent {
    return getShadowElement(el, '[part=focus-indicator]') as IFocusIndicatorComponent;
  }

  public async clickElement(el: HTMLElement): Promise<void> {
    await userEvent.click(el);
  }
}

describe('Radio', () => {
  it('should contain shadow root', async () => {
    const screen = render(html`<forge-radio></forge-radio>`);
    const el = screen.container.querySelector('forge-radio') as IRadioComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen1 = render(html`<forge-radio aria-label="Active"></forge-radio>`);
    const ariaEl = screen1.container.querySelector('forge-radio') as IRadioComponent;
    await expect(ariaEl).toBeAccessible();

    const screen2 = render(html`<forge-radio>Active</forge-radio>`);
    const labelEl = screen2.container.querySelector('forge-radio') as IRadioComponent;
    await expect(labelEl).toBeAccessible();
  });

  it('should render with correct default values', async () => {
    const screen = render(html`<forge-radio></forge-radio>`);
    const el = screen.container.querySelector('forge-radio') as IRadioComponent;
    const ctx = new RadioHarness(el);

    await expect(el).not.toBeAccessible();
    expect(el.checked).toBe(false);
    expect(el.defaultChecked).toBe(false);
    expect(el.value).toBe('on');
    expect(el.required).toBe(false);
    expect(el.dense).toBe(false);
    expect(el.labelPosition).toBe('end');
    expect(el.disabled).toBe(false);
    expect(el.readonly).toBe(false);
    expect(ctx.getRootElement(el).lastElementChild).toBe(ctx.getLabelElement(el));
  });

  describe('attributes', () => {
    it('should set checked', async () => {
      const screen = render(html`<forge-radio checked></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      expect(el.checked).toBe(true);
    });

    it('should set defaultChecked', async () => {
      const screen = render(html`<forge-radio default-checked></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      expect(el.defaultChecked).toBe(true);
    });

    it('should set value', async () => {
      const screen = render(html`<forge-radio value="active"></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      expect(el.value).toBe('active');
    });

    it('should set required', async () => {
      const screen = render(html`<forge-radio required></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      expect(el.required).toBe(true);
    });

    it('should set dense', async () => {
      const screen = render(html`<forge-radio dense></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      expect(el.dense).toBe(true);
    });

    it('should set labelPosition', async () => {
      const screen = render(html`<forge-radio label-position="start"></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      const ctx = new RadioHarness(el);

      expect(el.labelPosition).toBe('start');
      expect(ctx.getRootElement(el).firstElementChild).toBe(ctx.getLabelElement(el));

      el.labelPosition = 'end';

      expect(el.labelPosition).toBe('end');
      expect(ctx.getRootElement(el).lastElementChild).toBe(ctx.getLabelElement(el));
    });

    it('should set disabled', async () => {
      const screen = render(html`<forge-radio disabled>Active</forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      expect(el.disabled).toBe(true);
      await expect(el).toBeAccessible();
    });

    it('should set readonly', async () => {
      const screen = render(html`<forge-radio readonly></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      expect(el.readonly).toBe(true);
    });

    it('should not set non-string value as attribute', async () => {
      const screen = render(html`<forge-radio></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      const value = { value: 'value' } as any;
      el.value = value;
      expect(el.value).toBe(value);
      expect(el.getAttribute('value')).toBeNull();
    });
  });

  describe('form association', () => {
    it('should return form element and name', async () => {
      const screen = render(html`<form name="test-form"><forge-radio name="test-radio"></forge-radio></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);

      expect(ctx.radioElements[0].form).toBe(form);
      expect(ctx.radioElements[0].name).toBe('test-radio');
      expect(ctx.radioElements[0].labels).toHaveLength(0);

      ctx.radioElements[0].name = 'new-name';
      expect(ctx.radioElements[0].name).toBe('new-name');

      ctx.radioElements[0].name = null as any;
      expect(ctx.radioElements[0].name).toHaveLength(0);
    });

    it('should return associated form labels', async () => {
      const screen = render(html`<form name="test-form"><label for="test-radio">Test label</label><forge-radio id="test-radio"></forge-radio></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const labelEl = form.querySelector('label') as HTMLLabelElement;

      expect(ctx.radioElements[0].labels).toHaveLength(1);
      expect(ctx.radioElements[0].labels[0]).toBe(labelEl);
    });

    it('should set form value when value is set', async () => {
      const screen = render(html`<form name="test-form"><forge-radio name="test-radio"></forge-radio></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);

      let formData = new FormData(form);
      expect(formData.get('test-radio')).toBeNull();

      ctx.radioElements[0].checked = true;
      formData = new FormData(form);
      expect(formData.get('test-radio')).toBe('on');
    });

    it('should reset value when form is reset', async () => {
      const screen = render(html`<form name="test-form"><forge-radio name="test-radio"></forge-radio></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);

      ctx.radioElements[0].checked = true;
      let formData = new FormData(form);
      expect(formData.get('test-radio')).toBe('on');

      form.reset();
      await task();
      formData = new FormData(form);

      expect(ctx.radioElements[0].checked).toBe(false);
      expect(formData.get('test-radio')).toBeNull();

      ctx.radioElements[0].defaultChecked = true;
      formData = new FormData(form);
      expect(formData.get('test-radio')).toBeNull();

      form.reset();
      await task();
      formData = new FormData(form);

      expect(ctx.radioElements[0].checked).toBe(true);
      expect(formData.get('test-radio')).toBe('on');
    });

    it('should restore form state', async () => {
      const screen = render(html`<form name="test-form"><forge-radio name="test-radio"></forge-radio></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const setFormValueSpy = vi.spyOn(ctx.radioElements[0][internals], 'setFormValue');

      ctx.radioElements[0].checked = true;

      const [value, state] = setFormValueSpy.mock.calls[0] ?? [null, null];
      const newRadioEl = document.createElement('forge-radio');
      ctx.radioElements[0].remove();
      form.appendChild(newRadioEl);

      let restoreState: any = state ?? value;
      if (restoreState instanceof FormData) {
        restoreState = Array.from((restoreState as any).entries());
      }

      (newRadioEl as any).formStateRestoreCallback(restoreState, 'restore');

      expect(ctx.radioElements[0].checked).toBe(true);
    });

    it('should validate', async () => {
      const screen = render(html`<forge-radio required></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;

      expect(el[internals].validity.valid).toBe(false);
      expect(el[internals].validationMessage).not.toHaveLength(0);
      expect(el[internals].checkValidity()).toBe(false);
      expect(el[internals].reportValidity()).toBe(false);

      el.checked = true;

      expect(el[internals].willValidate).toBe(true);
      expect(el[internals].validity.valid).toBe(true);
      expect(el[internals].validationMessage).toHaveLength(0);
      expect(el[internals].checkValidity()).toBe(true);
      expect(el[internals].reportValidity()).toBe(true);
    });

    it('should set custom validity', async () => {
      const screen = render(html`<forge-radio required></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      const message = 'Custom error message';

      el[internals].setValidity({ customError: true }, message);

      expect(el[internals].validationMessage).toBe(message);
    });

    it('should get form value', async () => {
      const screen = render(html`<forge-radio></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      let formValue = el[getFormValue]();

      expect(formValue).toBeNull();

      el.checked = true;
      formValue = el[getFormValue]();

      expect(formValue).toBe('on');
    });

    it('should get form state', async () => {
      const screen = render(html`<forge-radio></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      let formState = el[getFormState]();

      expect(formState).toBe('unchecked');

      el.checked = true;
      formState = el[getFormState]();

      expect(formState).toBe('checked');
    });
  });

  describe('interaction', () => {
    it('should check on click', async () => {
      const screen = render(html`<forge-radio></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      const ctx = new RadioHarness(el);

      await ctx.clickElement(el);
      await task();

      expect(el.checked).toBe(true);
    });

    it('should not uncheck on click', async () => {
      const screen = render(html`<forge-radio checked></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      const ctx = new RadioHarness(el);

      await ctx.clickElement(el);
      await task();

      expect(el.checked).toBe(true);
    });

    it('should not check on click when disabled', async () => {
      const screen = render(html`<forge-radio disabled></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;

      await userEvent.click(el, { force: true });
      await task();

      expect(el.checked).toBe(false);
    });

    it('should not check on click when readonly', async () => {
      const screen = render(html`<forge-radio readonly></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      const ctx = new RadioHarness(el);

      await ctx.clickElement(el);
      await task();

      expect(el.checked).toBe(false);
    });

    it('should not check if click is prevented', async () => {
      const screen = render(html`<forge-radio></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      const ctx = new RadioHarness(el);

      el.addEventListener('click', evt => evt.preventDefault());

      await ctx.clickElement(el);
      await task();

      expect(el.checked).toBe(false);
    });

    it('should check on space key', async () => {
      const screen = render(html`<forge-radio></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      el.focus();

      await userEvent.keyboard(' ');

      expect(el.checked).toBe(true);
    });

    it('should not uncheck on space key', async () => {
      const screen = render(html`<forge-radio checked></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      el.focus();

      await userEvent.keyboard(' ');

      expect(el.checked).toBe(true);
    });

    it('should not check on space key when disabled', async () => {
      const screen = render(html`<forge-radio disabled></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      el.focus();

      await userEvent.keyboard(' ');

      expect(el.checked).toBe(false);
    });

    it('should not check on space key when readonly', async () => {
      const screen = render(html`<forge-radio readonly></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      el.focus();

      await userEvent.keyboard(' ');

      expect(el.checked).toBe(false);
    });

    it('should not check on space key if prevented', async () => {
      const screen = render(html`<forge-radio></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      el.focus();

      el.addEventListener('keyup', evt => evt.preventDefault());

      await userEvent.keyboard(' ');
      await task();

      expect(el.checked).toBe(false);
    });
  });

  describe('label aware', () => {
    it('should accept forge label click', async () => {
      const screen = render(html`<forge-radio></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;

      el.labelClickedCallback?.();
      await task();

      expect(el.checked).toBe(true);
    });

    it('should accept forge label change', async () => {
      const screen = render(html`<forge-radio></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      el.labelChangedCallback?.('Test label');
      expect(el.ariaLabel).toBe('Test label');
      await expect(el).toBeAccessible();

      el.labelChangedCallback?.(null);
      expect(el.ariaLabel).toBeNull();
      await expect(el).not.toBeAccessible();
    });
  });

  describe('events', () => {
    it('should emit change event', async () => {
      const screen = render(html`<forge-radio></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      const ctx = new RadioHarness(el);
      const changeSpy = vi.fn();

      el.addEventListener(RADIO_CONSTANTS.events.CHANGE, changeSpy);

      await ctx.clickElement(el);
      await task();

      expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('should emit input event', async () => {
      const screen = render(html`<forge-radio></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      const ctx = new RadioHarness(el);
      const inputSpy = vi.fn();

      el.addEventListener(RADIO_CONSTANTS.events.INPUT, inputSpy);

      await ctx.clickElement(el);
      await task();

      expect(inputSpy).toHaveBeenCalledOnce();
    });

    it('should allow change event to be cancelled', async () => {
      const screen = render(html`<forge-radio></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      const ctx = new RadioHarness(el);

      el.addEventListener(RADIO_CONSTANTS.events.CHANGE, evt => evt.preventDefault());

      await ctx.clickElement(el);
      await task();

      expect(el.checked).toBe(false);
    });

    it('should allow input event to be cancelled', async () => {
      const screen = render(html`<forge-radio></forge-radio>`);
      const el = screen.container.querySelector('forge-radio') as IRadioComponent;
      const ctx = new RadioHarness(el);

      el.addEventListener(RADIO_CONSTANTS.events.INPUT, evt => evt.preventDefault());

      await ctx.clickElement(el);
      await task();

      expect(el.checked).toBe(false);
    });
  });

  describe('radio group', () => {
    it('should should not group unnamed radios', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio></forge-radio>
          <forge-radio></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].checked = true;
      radioEls[1].checked = true;

      expect(radioEls[0].checked).toBe(true);
      expect(radioEls[1].checked).toBe(true);
    });

    it('should group radios with same name but not part of form', async () => {
      const screen = render(html`
        <div>
          <forge-radio name="test-radio"></forge-radio>
          <forge-radio name="test-radio"></forge-radio>
        </div>
      `);
      const el = screen.container.querySelector('div') as HTMLElement;
      const ctx = new RadioHarness(el);
      const radioEls = ctx.radioElements;

      radioEls[0].checked = true;
      radioEls[1].checked = true;

      expect(radioEls[0].checked).toBe(false);
      expect(radioEls[1].checked).toBe(true);
    });

    it('should group radios with same name and in same form', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio"></forge-radio>
          <forge-radio name="test-radio"></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].checked = true;
      radioEls[1].checked = true;

      expect(radioEls[0].checked).toBe(false);
      expect(radioEls[1].checked).toBe(true);
    });

    it('should not group radios with same name in different forms', async () => {
      const screen = render(html`
        <div>
          <form>
            <forge-radio name="test-radio"></forge-radio>
          </form>
          <form>
            <forge-radio name="test-radio"></forge-radio>
          </form>
        </div>
      `);
      const el = screen.container.querySelector('div') as HTMLElement;
      const ctx = new RadioHarness(el);
      const radioEls = ctx.radioElements;

      radioEls[0].checked = true;
      radioEls[1].checked = true;

      expect(radioEls[0].checked).toBe(true);
      expect(radioEls[1].checked).toBe(true);
    });

    it('should submit value of checked radio', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].checked = true;

      let formData = new FormData(form);
      expect(formData.get('test-radio')).toBe('one');

      radioEls[1].checked = true;

      formData = new FormData(form);
      expect(formData.get('test-radio')).toBe('two');
    });

    it('should unchecked other radios in group when radio is checked', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].checked = true;
      radioEls[1].checked = true;

      expect(radioEls[0].checked).toBe(false);
      expect(radioEls[1].checked).toBe(true);
    });

    it('should focus next radio in group when arrow down key is pressed', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].focus();

      await userEvent.keyboard('{ArrowDown}');

      expect(radioEls[0].checked).toBe(false);
      expect(radioEls[1].checked).toBe(true);
    });

    it('should focus previous radio in group when arrow up key is pressed', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[1].focus();

      await userEvent.keyboard('{ArrowUp}');

      expect(radioEls[0].checked).toBe(true);
      expect(radioEls[1].checked).toBe(false);
    });

    it('should focus next radio in group when arrow right key is pressed', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].focus();

      await userEvent.keyboard('{ArrowRight}');

      expect(radioEls[0].checked).toBe(false);
      expect(radioEls[1].checked).toBe(true);
    });

    it('should focus previous radio in group when arrow left key is pressed', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[1].focus();

      await userEvent.keyboard('{ArrowLeft}');

      expect(radioEls[0].checked).toBe(true);
      expect(radioEls[1].checked).toBe(false);
    });

    it('should skip disabled radio when arrow key is pressed', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two" disabled></forge-radio>
          <forge-radio name="test-radio" value="three"></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].focus();

      await userEvent.keyboard('{ArrowDown}');

      expect(radioEls[0].checked).toBe(false);
      expect(radioEls[1].checked).toBe(false);
      expect(radioEls[2].checked).toBe(true);
    });

    it('should skip readonly radio when arrow key is pressed', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two" readonly></forge-radio>
          <forge-radio name="test-radio" value="three"></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].focus();

      await userEvent.keyboard('{ArrowDown}');

      expect(radioEls[0].checked).toBe(false);
      expect(radioEls[1].checked).toBe(false);
      expect(radioEls[2].checked).toBe(true);
    });

    it('should only include checked radio in tab order', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one" checked></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      await frame();

      expect(radioEls[0].tabIndex).toBe(0);
      expect(radioEls[1].tabIndex).toBe(-1);
    });

    it('should include all radios in tab order when none are checked', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      expect(radioEls[0].tabIndex).toBe(0);
      expect(radioEls[1].tabIndex).toBe(0);
    });

    it('should remove other radios from tab order when radio is focused', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].focus();

      expect(radioEls[0].tabIndex).toBe(0);
      expect(radioEls[1].tabIndex).toBe(-1);
    });

    it('should not change focus if change event is prevented', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one" checked></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[1].addEventListener(RADIO_CONSTANTS.events.CHANGE, evt => evt.preventDefault());

      radioEls[0].focus();

      await userEvent.keyboard('{ArrowDown}');
      await task();

      expect(document.activeElement).toBe(radioEls[0]);
      expect(radioEls[0].checked).toBe(true);
      expect(radioEls[1].checked).toBe(false);
    });
  });

  describe('adding and removing', () => {
    it('should make all radios focusable when checked radio is removed', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
          <forge-radio name="test-radio" value="three" checked></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[2].remove();
      await task();

      expect(radioEls[0].tabIndex).toBe(0);
      expect(radioEls[1].tabIndex).toBe(0);
    });

    it('should make other radios non-focusable when checked radio is added', async () => {
      const screen = render(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      const checkedRadio = document.createElement(RADIO_CONSTANTS.elementName) as IRadioComponent;
      checkedRadio.name = 'test-radio';
      checkedRadio.value = 'three';
      checkedRadio.checked = true;

      form.appendChild(checkedRadio);
      await task();

      expect(radioEls[0].tabIndex).toBe(-1);
      expect(radioEls[1].tabIndex).toBe(-1);
      expect(checkedRadio.tabIndex).toBe(0);
    });

    it('should uncheck radio when checked radio is added', async () => {
      const screen = render(html`
        <form>
          <forge-radio name="test-radio" value="one" checked></forge-radio>
        </form>
      `);
      const form = screen.container.querySelector('form') as HTMLFormElement;
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      const checkedRadio = document.createElement(RADIO_CONSTANTS.elementName) as IRadioComponent;
      checkedRadio.name = 'test-radio';
      checkedRadio.value = 'two';
      checkedRadio.checked = true;

      form.appendChild(checkedRadio);
      await task();

      expect(radioEls[0].checked).toBe(false);
      expect(checkedRadio.checked).toBe(true);
    });
  });

  describe('delegate', () => {
    it('should create delegate with default values', () => {
      const delegate = new RadioComponentDelegate();
      expect(delegate.value).toBe('on');
      expect(delegate.checked).toBe(false);
      expect(delegate.defaultChecked).toBe(false);
      expect(delegate.dense).toBe(false);
      expect(delegate.disabled).toBe(false);
      expect(delegate.required).toBe(false);
      expect(delegate.readonly).toBe(false);
      expect(delegate.name).toHaveLength(0);
      expect(delegate.labelPosition).toBe('end');
    });

    it('should set properties via the constructor', () => {
      const delegate = new RadioComponentDelegate({
        props: {
          value: 'value',
          checked: true,
          defaultChecked: true,
          dense: true,
          disabled: true,
          required: true,
          readonly: true,
          name: 'test-radio',
          labelPosition: 'start'
        }
      });
      expect(delegate.value).toBe('value');
      expect(delegate.checked).toBe(true);
      expect(delegate.defaultChecked).toBe(true);
      expect(delegate.dense).toBe(true);
      expect(delegate.disabled).toBe(true);
      expect(delegate.required).toBe(true);
      expect(delegate.readonly).toBe(true);
      expect(delegate.name).toBe('test-radio');
      expect(delegate.labelPosition).toBe('start');
    });

    it('should set value', () => {
      const delegate = new RadioComponentDelegate();
      delegate.value = 'value';
      expect(delegate.value).toBe('value');
    });

    it('should set checked', () => {
      const delegate = new RadioComponentDelegate();
      delegate.checked = true;
      expect(delegate.checked).toBe(true);
    });

    it('should set defaultChecked', () => {
      const delegate = new RadioComponentDelegate();
      delegate.defaultChecked = true;
      expect(delegate.defaultChecked).toBe(true);
    });

    it('should set dense', () => {
      const delegate = new RadioComponentDelegate();
      delegate.dense = true;
      expect(delegate.dense).toBe(true);
    });

    it('should set disabled', () => {
      const delegate = new RadioComponentDelegate();
      delegate.disabled = true;
      expect(delegate.disabled).toBe(true);
    });

    it('should set required', () => {
      const delegate = new RadioComponentDelegate();
      delegate.required = true;
      expect(delegate.required).toBe(true);
    });

    it('should set readonly', () => {
      const delegate = new RadioComponentDelegate();
      delegate.readonly = true;
      expect(delegate.readonly).toBe(true);
    });

    it('should set name', () => {
      const delegate = new RadioComponentDelegate();
      delegate.name = 'test-radio';
      expect(delegate.name).toBe('test-radio');
    });

    it('should set labelPosition', () => {
      const delegate = new RadioComponentDelegate();
      delegate.labelPosition = 'start';
      expect(delegate.labelPosition).toBe('start');
    });

    it('should set label via constructor', () => {
      const delegate = new RadioComponentDelegate({ options: { label: 'Test label' } });
      expect(delegate.element.innerText).toBe('Test label');
    });

    it('should set label', () => {
      const delegate = new RadioComponentDelegate();
      delegate.setLabel('Test label');
      expect(delegate.element.innerText).toBe('Test label');

      delegate.setLabel(null);
      expect(delegate.element.innerText).toHaveLength(0);
    });

    it('should set id via constructor', () => {
      const delegate = new RadioComponentDelegate({ options: { id: 'test' } });
      expect(delegate.element.id).toBe('test');
    });
  });
});

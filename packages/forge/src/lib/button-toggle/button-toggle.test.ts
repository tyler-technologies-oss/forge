import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { userEvent } from 'vitest/browser';
import { frame, task } from '../core/utils/utils.js';
import { TestHarness } from '../core/testing/test-harness.js';
import type { IButtonToggleGroupComponent } from './button-toggle-group/button-toggle-group.js';
import type { IButtonToggleComponent } from './button-toggle/button-toggle.js';
import { BUTTON_TOGGLE_CONSTANTS } from './button-toggle/button-toggle-constants.js';
import { ButtonToggleGroupTheme, BUTTON_TOGGLE_GROUP_CONSTANTS } from './button-toggle-group/index.js';
import { getFormState } from '../constants.js';

import './button-toggle-group/button-toggle-group.js';
import '../label/label.js';

describe('Button Toggle', () => {
  it('should be accessible', async () => {
    const harness = await createFixture();

    await expect(harness.element).toBeAccessible();
    expect(harness.element.getAttribute('role')).toBe('group');
    expect(harness.buttonToggles.every(toggle => toggle.getAttribute('role') === 'button')).toBe(true);
    expect(harness.buttonToggles.every(toggle => toggle.getAttribute('aria-pressed') === 'false')).toBe(true);
  });

  (['primary', 'secondary', 'tertiary', 'danger', 'success', 'warning', 'info'] as ButtonToggleGroupTheme[]).forEach(theme => {
    it(`should be accessible with selected values for theme ${theme}`, async () => {
      const harness = await createFixture({ theme, value: 'two' });

      if (theme !== 'tertiary') {
        expect(harness.element.getAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.THEME)).toBe(theme);
      }

      expect(harness.buttonToggles[1].selected).toBe(true);
      expect(harness.buttonToggles[1].getAttribute('aria-pressed')).toBe('true');
      await expect(harness.element).toBeAccessible();
    });
  });

  it('should not have value by default', async () => {
    const harness = await createFixture();

    expect(harness.element.value).toBeNull();
    expect(harness.buttonToggles.every(toggle => toggle.selected)).toBe(false);
  });

  it('should set value', async () => {
    const harness = await createFixture();

    harness.element.value = 'two';

    expect(harness.element.value).toBe('two');
    expect(harness.buttonToggles[1].selected).toBe(true);
    expect(harness.buttonToggles[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('should set default value', async () => {
    const harness = await createFixture({ value: 'two' });

    expect(harness.element.value).toBe('two');
    expect(harness.buttonToggles[1].selected).toBe(true);
    expect(harness.buttonToggles[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('should default value with non-string type', async () => {
    const harness = await createFixture();
    harness.buttonToggles[2].value = 2;
    harness.element.value = 2;

    await frame();

    expect(harness.element.value).toBe(2);
    expect(harness.buttonToggles[2].selected).toBe(true);
    expect(harness.buttonToggles[2].getAttribute('aria-pressed')).toBe('true');
  });

  it('should set value via attribute', async () => {
    const harness = await createFixture();

    harness.element.setAttribute('value', 'two');

    expect(harness.element.value).toBe('two');
    expect(harness.buttonToggles[1].selected).toBe(true);
    expect(harness.buttonToggles[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('should remove value', async () => {
    const harness = await createFixture({ value: 'two' });

    expect(harness.element.value).toBe('two');

    harness.element.value = null;

    expect(harness.element.value).toBeNull();
    expect(harness.buttonToggles.every(toggle => toggle.selected)).toBe(false);
    expect(harness.buttonToggles.every(toggle => toggle.getAttribute('aria-pressed') === 'false')).toBe(true);
  });

  it('should set multiple values', async () => {
    const harness = await createFixture({ multiple: true, value: ['one', 'three'] });

    expect(harness.element.value).toEqual(['one', 'three']);
    expect(harness.buttonToggles[0].selected).toBe(true);
    expect(harness.buttonToggles[0].getAttribute('aria-pressed')).toBe('true');
    expect(harness.buttonToggles[2].selected).toBe(true);
    expect(harness.buttonToggles[2].getAttribute('aria-pressed')).toBe('true');
  });

  (['vertical', 'stretch', 'mandatory', 'disabled', 'required', 'readonly', 'dense'] as const).forEach(attr => {
    it(`should set ${attr}`, async () => {
      const harness = await createFixture({ [attr]: true });

      expect(harness.element[attr]).toBe(true);
      expect(harness.element.hasAttribute((BUTTON_TOGGLE_GROUP_CONSTANTS.attributes as { [key: string]: string })[attr.toUpperCase()])).toBe(true);
    });

    it(`should set ${attr} via attribute`, async () => {
      const harness = await createFixture();

      harness.element.setAttribute(attr, '');

      expect(harness.element[attr]).toBe(true);
      expect(harness.element.hasAttribute((BUTTON_TOGGLE_GROUP_CONSTANTS.attributes as { [key: string]: string })[attr.toUpperCase()])).toBe(true);

      harness.element.removeAttribute(attr);

      expect(harness.element[attr]).toBe(false);
      expect(harness.element.hasAttribute((BUTTON_TOGGLE_GROUP_CONSTANTS.attributes as { [key: string]: string })[attr.toUpperCase()])).toBe(false);
    });
  });

  it('should set non-focusable when disabled', async () => {
    const harness = await createFixture({ disabled: true });

    expect(harness.element.disabled).toBe(true);
    expect(harness.element.hasAttribute('disabled')).toBe(true);
    expect(harness.buttonToggles.every(toggle => toggle.tabIndex === -1)).toBe(true);
  });

  it('should set readonly', async () => {
    const harness = await createFixture({ readonly: true });

    expect(harness.element.readonly).toBe(true);
    expect(harness.element.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.READONLY)).toBe(true);
    expect(harness.buttonToggles.every(toggle => toggle.readonly)).toBe(true);
  });

  it('should not toggle when readonly', async () => {
    const harness = await createFixture({ readonly: true });
    const changeSpy = vi.fn();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaMouse(0);
    await harness.selectToggleViaMouse(1);
    await harness.selectToggleViaMouse(2);

    expect(harness.element.value).toBeNull();
    expect(harness.buttonToggles.every(toggle => toggle.selected)).toBe(false);
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('should set outlined', async () => {
    const harness = await createFixture({ outlined: false });

    expect(harness.element.outlined).toBe(false);
    expect(harness.element.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.NO_OUTLINE)).toBe(true);
  });

  it('should set outlined via attribute', async () => {
    const harness = await createFixture();

    harness.element.setAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.NO_OUTLINE, '');

    expect(harness.element.outlined).toBe(false);
    expect(harness.element.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.NO_OUTLINE)).toBe(true);

    harness.element.removeAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.NO_OUTLINE);

    expect(harness.element.outlined).toBe(true);
    expect(harness.element.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.NO_OUTLINE)).toBe(false);
  });

  it('should select button toggle when clicked', async () => {
    const harness = await createFixture();
    const changeSpy = vi.fn();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaMouse(1);

    expect(harness.element.value).toBe('two');
    expect(harness.buttonToggles[1].selected).toBe(true);
    expect(harness.buttonToggles[1].getAttribute('aria-pressed')).toBe('true');
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toBe('two');
  });

  it('should select button toggle when focused and space is pressed', async () => {
    const harness = await createFixture();
    const changeSpy = vi.fn();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaKeyboard(1);

    expect(harness.element.value).toBe('two');
    expect(harness.buttonToggles[1].selected).toBe(true);
    expect(harness.buttonToggles[1].getAttribute('aria-pressed')).toBe('true');
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toBe('two');
  });

  it('should select button toggle when click() is called', async () => {
    const harness = await createFixture();
    const changeSpy = vi.fn();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    harness.buttonToggles[1].click();
    await task();

    expect(harness.element.value).toBe('two');
    expect(harness.buttonToggles[1].selected).toBe(true);
    expect(harness.buttonToggles[1].getAttribute('aria-pressed')).toBe('true');
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toBe('two');
  });

  it('should deselect button toggle when clicked', async () => {
    const harness = await createFixture({ value: 'two' });
    const changeSpy = vi.fn();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaMouse(1);

    expect(harness.element.value).toBeNull();
    expect(harness.buttonToggles[1].selected).toBe(false);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toBeNull();
  });

  it('should deselect button toggle when focused and space is pressed', async () => {
    const harness = await createFixture({ value: 'two' });
    const changeSpy = vi.fn();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaKeyboard(1);

    expect(harness.element.value).toBeNull();
    expect(harness.buttonToggles[1].selected).toBe(false);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toBeNull();
  });

  it('should select multiple button toggles when clicked', async () => {
    const harness = await createFixture({ multiple: true });
    const changeSpy = vi.fn();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaMouse(0);
    await harness.selectToggleViaMouse(2);

    expect(harness.element.value).toEqual(['one', 'three']);
    expect(harness.buttonToggles[0].selected).toBe(true);
    expect(harness.buttonToggles[2].selected).toBe(true);
    expect(changeSpy).toHaveBeenCalledTimes(2);
    expect(changeSpy.mock.calls[0][0].detail).toEqual(['one']);
    expect(changeSpy.mock.calls[1][0].detail).toEqual(['one', 'three']);
  });

  it('should select multiple button toggles when focused and space is pressed', async () => {
    const harness = await createFixture({ multiple: true });
    const changeSpy = vi.fn();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaKeyboard(0);
    await harness.selectToggleViaKeyboard(2);

    expect(harness.element.value).toEqual(['one', 'three']);
    expect(harness.buttonToggles[0].selected).toBe(true);
    expect(harness.buttonToggles[2].selected).toBe(true);
    expect(changeSpy).toHaveBeenCalledTimes(2);
    expect(changeSpy.mock.calls[0][0].detail).toEqual(['one']);
    expect(changeSpy.mock.calls[1][0].detail).toEqual(['one', 'three']);
  });

  it('should not select button toggle when change event is cancelled from click', async () => {
    const harness = await createFixture();
    const changeSpy = vi.fn(evt => evt.preventDefault());
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaMouse(1);

    expect(harness.element.value).toBeNull();
    expect(harness.buttonToggles[1].selected).toBe(false);
  });

  it('should not select button toggle when change event is cancelled from keyboard', async () => {
    const harness = await createFixture();
    const changeSpy = vi.fn(evt => evt.preventDefault());
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaKeyboard(1);

    expect(harness.element.value).toBeNull();
    expect(harness.buttonToggles[1].selected).toBe(false);
  });

  it('should not deselect last selected button toggle when mandatory is set', async () => {
    const harness = await createFixture({ value: 'two', mandatory: true });
    const changeSpy = vi.fn();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaMouse(1);

    expect(harness.element.value).toBe('two');
    expect(harness.buttonToggles[1].selected).toBe(true);
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('should associate parent form', async () => {
    const harness = await createFixtureWithForm();

    expect(harness.element.form).toBeInstanceOf(HTMLFormElement);
  });

  it('should have name', async () => {
    const harness = await createFixtureWithForm();

    expect(harness.element.name).toBe('my-test-button-toggle-group');
    expect(harness.element.form?.elements.namedItem('my-test-button-toggle-group')).toBe(harness.element);
  });

  it('should set form value', async () => {
    const harness = await createFixtureWithForm();

    harness.element.value = 'two';

    const formData = new FormData(harness.element.form as HTMLFormElement);
    expect(formData.get('my-test-button-toggle-group')).toBe('two');
  });

  it('should set form value when multiple', async () => {
    const harness = await createFixtureWithForm({ multiple: true });

    harness.element.value = ['one', 'three'];

    const formData = new FormData(harness.element.form as HTMLFormElement);
    expect(formData.getAll('my-test-button-toggle-group')).toEqual(['one', 'three']);
  });

  it('should restore form state', async () => {
    const harness = await createFixtureWithForm();

    harness.element.value = 'two';

    const state = harness.element[getFormState]();

    harness.element.value = null;

    expect(harness.element.value).toBeNull();

    harness.element.formStateRestoreCallback(state, 'restore');

    expect(harness.element.value).toBe('two');
  });

  it('should restore form state to null if no value is set', async () => {
    const harness = await createFixtureWithForm();

    const state = harness.element[getFormState]();

    expect(harness.element.value).toBeNull();

    harness.element.formStateRestoreCallback(state, 'restore');

    expect(harness.element.value).toBeNull();
  });

  it('should restore form state when multiple', async () => {
    const harness = await createFixtureWithForm({ multiple: true });

    harness.element.value = ['one', 'three'];

    const state = harness.element[getFormState]();

    harness.element.value = null;

    expect(harness.element.value).toEqual([]);

    harness.element.formStateRestoreCallback(state, 'restore');

    expect(harness.element.value).toEqual(['one', 'three']);
  });

  it('should set validity when required', async () => {
    const harness = await createFixtureWithForm({ required: true });

    expect(harness.element.required).toBe(true);
    expect(harness.element.hasAttribute('required')).toBe(true);
    expect(harness.element.willValidate).toBe(true);
    expect(harness.element.validity.valueMissing).toBe(true);
    expect(harness.element.validationMessage).not.toBe('');

    harness.element.value = 'one';

    expect(harness.element.validity.valueMissing).toBe(false);
    expect(harness.element.validationMessage).toBe('');
  });

  it('should set validity when required with multiple', async () => {
    const harness = await createFixtureWithForm({ multiple: true, required: true });

    expect(harness.element.required).toBe(true);
    expect(harness.element.hasAttribute('required')).toBe(true);
    expect(harness.element.willValidate).toBe(true);
    expect(harness.element.validity.valueMissing).toBe(true);
    expect(harness.element.validationMessage).not.toBe('');

    harness.element.value = ['one', 'two'];

    expect(harness.element.validity.valueMissing).toBe(false);
    expect(harness.element.validationMessage).toBe('');
  });

  it('should not set validity when not required', async () => {
    const harness = await createFixtureWithForm();

    expect(harness.element.required).toBe(false);
    expect(harness.element.willValidate).toBe(true);
    expect(harness.element.validity.valueMissing).toBe(false);
    expect(harness.element.validationMessage).toBe('');
  });

  it('should reset value when form is reset', async () => {
    const harness = await createFixtureWithForm({ value: 'two' });

    expect(harness.element.getAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VALUE)).toBe('two');
    expect(harness.element.value).toBe('two');

    harness.element.value = 'one';

    expect(harness.element.value).toBe('one');
    expect(harness.element.getAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VALUE)).toBe('two');

    harness.element.form?.reset();

    expect(harness.element.value).toBe('two');
  });

  it('should set associate <label>', async () => {
    const harness = await createFixtureWithForm();

    expect(harness.element.labels).toHaveLength(1);
    expect(harness.element.labels[0].textContent).toBe('Test label');
  });

  it('should associate <forge-label>', async () => {
    const harness = await createFixtureWithForm();
    const labelChangedCallbackSpy = vi.spyOn(harness.element, 'labelChangedCallback');

    const label = document.createElement('forge-label');
    label.for = harness.element.id;
    label.textContent = 'Test label';
    harness.element.before(label);

    await frame();

    expect(labelChangedCallbackSpy).toHaveBeenCalledOnce();
    expect(harness.element.getAttribute('aria-label')).toBe(label.textContent);
  });

  it('should store value if not matching existing button toggles', async () => {
    const harness = await createFixture({ value: 'new-value' });

    expect(harness.element.value).toBe('new-value');
    expect(harness.buttonToggles.every(toggle => toggle.selected)).toBe(false);
    expect(harness.buttonToggles.every(toggle => toggle.getAttribute('aria-pressed') === 'false')).toBe(true);
  });

  it('should inherit current state when button toggle is added dynamically', async () => {
    const harness = await createFixture({ readonly: true, disabled: true, value: 'new-value' });

    const buttonToggle = document.createElement('forge-button-toggle');
    buttonToggle.value = 'new-value';
    harness.element.appendChild(buttonToggle);
    await frame();

    expect(buttonToggle.disabled).toBe(true);
    expect(buttonToggle.readonly).toBe(true);
    expect(buttonToggle.selected).toBe(true);
  });

  it('should apply selected state to button toggles when multiple is changed', async () => {
    const harness = await createFixture({ multiple: true, value: ['one', 'two'] });

    expect(harness.element.value).toEqual(['one', 'two']);
    expect(harness.buttonToggles[0].selected).toBe(true);
    expect(harness.buttonToggles[1].selected).toBe(true);
    expect(harness.buttonToggles[2].selected).toBe(false);

    harness.element.multiple = false;

    expect(harness.element.value).toBe('one');
    expect(harness.buttonToggles[0].selected).toBe(true);
    expect(harness.buttonToggles[1].selected).toBe(false);
    expect(harness.buttonToggles[2].selected).toBe(false);

    harness.element.multiple = true;

    expect(harness.element.value).toEqual(['one', 'two']);
    expect(harness.buttonToggles[0].selected).toBe(true);
    expect(harness.buttonToggles[1].selected).toBe(true);
    expect(harness.buttonToggles[2].selected).toBe(false);
  });
});

class ButtonToggleGroupHarness extends TestHarness<IButtonToggleGroupComponent> {
  constructor(el: IButtonToggleGroupComponent) {
    super(el);
  }

  public initElementRefs(): void {}

  public get buttonToggles(): IButtonToggleComponent[] {
    return Array.from(this.element.querySelectorAll(BUTTON_TOGGLE_CONSTANTS.elementName));
  }

  public async selectToggleViaMouse(index: number): Promise<void> {
    if (!this.buttonToggles[index]) {
      throw new Error(`Button toggle at index ${index} does not exist.`);
    }
    await userEvent.click(this.buttonToggles[index]);
  }

  public async selectToggleViaKeyboard(index: number): Promise<void> {
    this.buttonToggles[index].focus();
    await userEvent.keyboard(' ');
  }
}

interface ButtonToggleGroupFixtureConfig {
  value?: unknown | unknown[] | null;
  outlined?: boolean;
  multiple?: boolean;
  stretch?: boolean;
  mandatory?: boolean;
  vertical?: boolean;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  dense?: boolean;
  theme?: ButtonToggleGroupTheme;
}

async function createFixture({
  value,
  outlined,
  multiple,
  stretch,
  mandatory,
  vertical,
  disabled,
  required,
  readonly,
  dense,
  theme
}: ButtonToggleGroupFixtureConfig = {}): Promise<ButtonToggleGroupHarness> {
  const screen = render(html`
    <forge-button-toggle-group
      aria-label="Choose an option"
      .value=${value}
      ?multiple=${multiple}
      .outlined=${outlined ?? true}
      ?stretch=${stretch}
      ?mandatory=${mandatory}
      ?vertical=${vertical}
      ?disabled=${disabled}
      ?required=${required}
      ?readonly=${readonly}
      ?dense=${dense}
      .theme=${theme as ButtonToggleGroupTheme}>
      <forge-button-toggle value="one">One</forge-button-toggle>
      <forge-button-toggle value="two" aria-label="Label for Two">Two</forge-button-toggle>
      <forge-button-toggle value="three">Three</forge-button-toggle>
    </forge-button-toggle-group>
  `);
  const el = screen.container.querySelector('forge-button-toggle-group') as IButtonToggleGroupComponent;
  return new ButtonToggleGroupHarness(el);
}

async function createFixtureWithForm({ value = '', multiple = false, required = false } = {}): Promise<ButtonToggleGroupHarness> {
  const screen = render(html`
    <form>
      <label for="button-toggle-group">Test label</label>
      <forge-button-toggle-group
        id="button-toggle-group"
        name="my-test-button-toggle-group"
        value="${value || nothing}"
        .multiple="${multiple}"
        ?required="${required}">
        <forge-button-toggle value="one">One</forge-button-toggle>
        <forge-button-toggle value="two">Two</forge-button-toggle>
        <forge-button-toggle value="three">Three</forge-button-toggle>
      </forge-button-toggle-group>
    </form>
  `);
  const buttonToggleGroup = screen.container.querySelector(BUTTON_TOGGLE_GROUP_CONSTANTS.elementName) as IButtonToggleGroupComponent;
  return new ButtonToggleGroupHarness(buttonToggleGroup);
}

import { nothing } from 'lit';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { TestHarness } from '../core/testing/test-harness';
import { IButtonToggleGroupComponent } from './button-toggle-group/button-toggle-group';
import { IButtonToggleComponent } from './button-toggle/button-toggle';
import { BUTTON_TOGGLE_CONSTANTS } from './button-toggle/button-toggle-constants';
import { ButtonToggleGroupTheme, BUTTON_TOGGLE_GROUP_CONSTANTS } from './button-toggle-group';
import { getFormState } from '../constants';

import './button-toggle-group/button-toggle-group';
import '../label/label';

describe('Button Toggle', () => {
  it('should be accessible', async () => {
    const harness = await createFixture();

    await expect(harness.element).to.be.accessible();
    expect(harness.element.getAttribute('role')).to.equal('group');
    expect(harness.buttonToggles.every(toggle => toggle.getAttribute('role') === 'button')).to.be.true;
    expect(harness.buttonToggles.every(toggle => toggle.getAttribute('aria-pressed') === 'false')).to.be.true;
  });

  ['primary', 'secondary', 'tertiary', 'danger', 'success', 'warning', 'info'].forEach((theme: ButtonToggleGroupTheme) => {
    it(`should be accessible with selected values for theme ${theme}`, async () => {
      const harness = await createFixture({ theme, value: 'two' });

      // tertiary is the default
      if (theme !== 'tertiary') {
        expect(harness.element.getAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.THEME)).to.equal(theme);
      }

      expect(harness.buttonToggles[1].selected).to.be.true;
      expect(harness.buttonToggles[1].getAttribute('aria-pressed')).to.equal('true');
      await expect(harness.element).to.be.accessible();
    });
  });

  it('should not have value by default', async () => {
    const harness = await createFixture();

    expect(harness.element.value).to.equal(null);
    expect(harness.buttonToggles.every(toggle => toggle.selected)).to.be.false;
  });

  it('should set value', async () => {
    const harness = await createFixture();

    harness.element.value = 'two';

    expect(harness.element.value).to.equal('two');
    expect(harness.buttonToggles[1].selected).to.be.true;
    expect(harness.buttonToggles[1].getAttribute('aria-pressed')).to.equal('true');
  });

  it('should set default value', async () => {
    const harness = await createFixture({ value: 'two' });

    expect(harness.element.value).to.equal('two');
    expect(harness.buttonToggles[1].selected).to.be.true;
    expect(harness.buttonToggles[1].getAttribute('aria-pressed')).to.equal('true');
  });

  it('should default value with non-string type', async () => {
    const harness = await createFixture();
    harness.buttonToggles[2].value = 2;
    harness.element.value = 2;

    await elementUpdated(harness.element);

    expect(harness.element.value).to.equal(2);
    expect(harness.buttonToggles[2].selected).to.be.true;
    expect(harness.buttonToggles[2].getAttribute('aria-pressed')).to.equal('true');
  });

  it('should set value via attribute', async () => {
    const harness = await createFixture();

    harness.element.setAttribute('value', 'two');

    expect(harness.element.value).to.equal('two');
    expect(harness.buttonToggles[1].selected).to.be.true;
    expect(harness.buttonToggles[1].getAttribute('aria-pressed')).to.equal('true');
  });

  it('should remove value', async () => {
    const harness = await createFixture({ value: 'two' });

    expect(harness.element.value).to.equal('two');

    harness.element.value = null;

    expect(harness.element.value).to.equal(null);
    expect(harness.buttonToggles.every(toggle => toggle.selected)).to.be.false;
    expect(harness.buttonToggles.every(toggle => toggle.getAttribute('aria-pressed') === 'false')).to.be.true;
  });

  it('should set multiple values', async () => {
    const harness = await createFixture({ multiple: true, value: ['one', 'three'] });

    expect(harness.element.value).to.deep.equal(['one', 'three']);
    expect(harness.buttonToggles[0].selected).to.be.true;
    expect(harness.buttonToggles[0].getAttribute('aria-pressed')).to.equal('true');
    expect(harness.buttonToggles[2].selected).to.be.true;
    expect(harness.buttonToggles[2].getAttribute('aria-pressed')).to.equal('true');
  });

  /**
   * Execute the same tests for all boolean state attributes.
   */
  (['vertical', 'stretch', 'mandatory', 'disabled', 'required', 'readonly', 'dense'] as const).forEach(attr => {
    it(`should set ${attr}`, async () => {
      const harness = await createFixture({ [attr]: true });

      expect(harness.element[attr]).to.be.true;
      expect(harness.element.hasAttribute((BUTTON_TOGGLE_GROUP_CONSTANTS.attributes as { [key: string]: string })[attr.toUpperCase()])).to.be.true;
    });

    it(`should set ${attr} via attribute`, async () => {
      const harness = await createFixture();

      harness.element.setAttribute(attr, '');

      expect(harness.element[attr]).to.be.true;
      expect(harness.element.hasAttribute((BUTTON_TOGGLE_GROUP_CONSTANTS.attributes as { [key: string]: string })[attr.toUpperCase()])).to.be.true;

      harness.element.removeAttribute(attr);

      expect(harness.element[attr]).to.be.false;
      expect(harness.element.hasAttribute((BUTTON_TOGGLE_GROUP_CONSTANTS.attributes as { [key: string]: string })[attr.toUpperCase()])).to.be.false;
    });
  });

  it('should set non-focusable when disabled', async () => {
    const harness = await createFixture({ disabled: true });

    expect(harness.element.disabled).to.be.true;
    expect(harness.element.hasAttribute('disabled')).to.be.true;
    expect(harness.buttonToggles.every(toggle => toggle.tabIndex === -1)).to.be.true;
  });

  it('should set readonly', async () => {
    const harness = await createFixture({ readonly: true });

    expect(harness.element.readonly).to.be.true;
    expect(harness.element.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.READONLY)).to.be.true;
    expect(harness.buttonToggles.every(toggle => toggle.readonly)).to.be.true;
  });

  it('should not toggle when readonly', async () => {
    const harness = await createFixture({ readonly: true });
    const changeSpy = sinon.spy();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaMouse(0);
    await harness.selectToggleViaMouse(1);
    await harness.selectToggleViaMouse(2);

    expect(harness.element.value).to.be.null;
    expect(harness.buttonToggles.every(toggle => toggle.selected)).to.be.false;
    expect(changeSpy).not.to.have.been.called;
  });

  it('should set outlined', async () => {
    const harness = await createFixture({ outlined: false });

    expect(harness.element.outlined).to.be.false;
    expect(harness.element.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.NO_OUTLINE)).to.be.true;
  });

  it('should set outlined via attribute', async () => {
    const harness = await createFixture();

    harness.element.setAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.NO_OUTLINE, '');

    expect(harness.element.outlined).to.be.false;
    expect(harness.element.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.NO_OUTLINE)).to.be.true;

    harness.element.removeAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.NO_OUTLINE);

    expect(harness.element.outlined).to.be.true;
    expect(harness.element.hasAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.NO_OUTLINE)).to.be.false;
  });

  it('should select button toggle when clicked', async () => {
    const harness = await createFixture();
    const changeSpy = sinon.spy();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaMouse(1);

    expect(harness.element.value).to.equal('two');
    expect(harness.buttonToggles[1].selected).to.be.true;
    expect(harness.buttonToggles[1].getAttribute('aria-pressed')).to.equal('true');
    expect(changeSpy).to.have.been.calledOnce;
    expect(changeSpy.firstCall.args[0].detail).to.equal('two');
  });

  it('should select button toggle when focused and space is pressed', async () => {
    const harness = await createFixture();
    const changeSpy = sinon.spy();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaKeyboard(1);

    expect(harness.element.value).to.equal('two');
    expect(harness.buttonToggles[1].selected).to.be.true;
    expect(harness.buttonToggles[1].getAttribute('aria-pressed')).to.equal('true');
    expect(changeSpy).to.have.been.calledOnce;
    expect(changeSpy.firstCall.args[0].detail).to.equal('two');
  });

  it('should select button toggle when click() is called', async () => {
    const harness = await createFixture();
    const changeSpy = sinon.spy();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    harness.buttonToggles[1].click();
    await elementUpdated(harness.element);

    expect(harness.element.value).to.equal('two');
    expect(harness.buttonToggles[1].selected).to.be.true;
    expect(harness.buttonToggles[1].getAttribute('aria-pressed')).to.equal('true');
    expect(changeSpy).to.have.been.calledOnce;
    expect(changeSpy.firstCall.args[0].detail).to.equal('two');
  });

  it('should deselect button toggle when clicked', async () => {
    const harness = await createFixture({ value: 'two' });
    const changeSpy = sinon.spy();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaMouse(1);

    expect(harness.element.value).to.equal(null);
    expect(harness.buttonToggles[1].selected).to.be.false;
    expect(changeSpy).to.have.been.calledOnce;
    expect(changeSpy.firstCall.args[0].detail).to.equal(null);
  });

  it('should deselect button toggle when focused and space is pressed', async () => {
    const harness = await createFixture({ value: 'two' });
    const changeSpy = sinon.spy();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaKeyboard(1);

    expect(harness.element.value).to.equal(null);
    expect(harness.buttonToggles[1].selected).to.be.false;
    expect(changeSpy).to.have.been.calledOnce;
    expect(changeSpy.firstCall.args[0].detail).to.equal(null);
  });

  it('should select multiple button toggles when clicked', async () => {
    const harness = await createFixture({ multiple: true });
    const changeSpy = sinon.spy();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaMouse(0);
    await harness.selectToggleViaMouse(2);

    expect(harness.element.value).to.deep.equal(['one', 'three']);
    expect(harness.buttonToggles[0].selected).to.be.true;
    expect(harness.buttonToggles[2].selected).to.be.true;
    expect(changeSpy).to.have.been.calledTwice;
    expect(changeSpy.firstCall.args[0].detail).to.deep.equal(['one']);
    expect(changeSpy.secondCall.args[0].detail).to.deep.equal(['one', 'three']);
  });

  it('should select multiple button toggles when focused and space is pressed', async () => {
    const harness = await createFixture({ multiple: true });
    const changeSpy = sinon.spy();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaKeyboard(0);
    await harness.selectToggleViaKeyboard(2);

    expect(harness.element.value).to.deep.equal(['one', 'three']);
    expect(harness.buttonToggles[0].selected).to.be.true;
    expect(harness.buttonToggles[2].selected).to.be.true;
    expect(changeSpy).to.have.been.calledTwice;
    expect(changeSpy.firstCall.args[0].detail).to.deep.equal(['one']);
    expect(changeSpy.secondCall.args[0].detail).to.deep.equal(['one', 'three']);
  });

  it('should not select button toggle when change event is cancelled from click', async () => {
    const harness = await createFixture();
    const changeSpy = sinon.spy(evt => evt.preventDefault());
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaMouse(1);

    expect(harness.element.value).to.equal(null);
    expect(harness.buttonToggles[1].selected).to.be.false;
  });

  it('should not select button toggle when change event is cancelled from keyboard', async () => {
    const harness = await createFixture();
    const changeSpy = sinon.spy(evt => evt.preventDefault());
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaKeyboard(1);

    expect(harness.element.value).to.equal(null);
    expect(harness.buttonToggles[1].selected).to.be.false;
  });

  it('should not deselect last selected button toggle when mandatory is set', async () => {
    const harness = await createFixture({ value: 'two', mandatory: true });
    const changeSpy = sinon.spy();
    harness.element.addEventListener(BUTTON_TOGGLE_GROUP_CONSTANTS.events.CHANGE, changeSpy);

    await harness.selectToggleViaMouse(1);

    expect(harness.element.value).to.equal('two');
    expect(harness.buttonToggles[1].selected).to.be.true;
    expect(changeSpy).not.to.have.been.called;
  });

  it('should associate parent form', async () => {
    const harness = await createFixtureWithForm();

    expect(harness.element.form).to.be.an.instanceOf(HTMLFormElement);
  });

  it('should have name', async () => {
    const harness = await createFixtureWithForm();

    expect(harness.element.name).to.equal('my-test-button-toggle-group');
    expect(harness.element.form?.elements.namedItem('my-test-button-toggle-group')).to.equal(harness.element);
  });

  it('should set form value', async () => {
    const harness = await createFixtureWithForm();

    harness.element.value = 'two';

    const formData = new FormData(harness.element.form as HTMLFormElement);
    expect(formData.get('my-test-button-toggle-group')).to.equal('two');
  });

  it('should set form value when multiple', async () => {
    const harness = await createFixtureWithForm({ multiple: true });

    harness.element.value = ['one', 'three'];

    const formData = new FormData(harness.element.form as HTMLFormElement);
    expect(formData.getAll('my-test-button-toggle-group')).to.deep.equal(['one', 'three']);
  });

  it('should restore form state', async () => {
    const harness = await createFixtureWithForm();

    harness.element.value = 'two';

    const state = harness.element[getFormState]();

    harness.element.value = null;

    expect(harness.element.value).to.be.null;

    harness.element.formStateRestoreCallback(state, 'restore');

    expect(harness.element.value).to.deep.equal('two');
  });

  it('should restore form state to null if no value is set', async () => {
    const harness = await createFixtureWithForm();

    const state = harness.element[getFormState]();

    expect(harness.element.value).to.be.null;

    harness.element.formStateRestoreCallback(state, 'restore');

    expect(harness.element.value).to.be.null;
  });

  it('should restore form state when multiple', async () => {
    const harness = await createFixtureWithForm({ multiple: true });

    harness.element.value = ['one', 'three'];

    const state = harness.element[getFormState]();

    harness.element.value = null;

    expect(harness.element.value).to.deep.equal([]);

    harness.element.formStateRestoreCallback(state, 'restore');

    expect(harness.element.value).to.deep.equal(['one', 'three']);
  });

  it('should set validity when required', async () => {
    const harness = await createFixtureWithForm({ required: true });

    expect(harness.element.required).to.be.true;
    expect(harness.element.hasAttribute('required')).to.be.true;
    expect(harness.element.willValidate).to.be.true;
    expect(harness.element.validity.valueMissing).to.be.true;
    expect(harness.element.validationMessage).not.to.be.empty;

    harness.element.value = 'one';

    expect(harness.element.validity.valueMissing).to.be.false;
    expect(harness.element.validationMessage).to.be.empty;
  });

  it('should set validity when required with multiple', async () => {
    const harness = await createFixtureWithForm({ multiple: true, required: true });

    expect(harness.element.required).to.be.true;
    expect(harness.element.hasAttribute('required')).to.be.true;
    expect(harness.element.willValidate).to.be.true;
    expect(harness.element.validity.valueMissing).to.be.true;
    expect(harness.element.validationMessage).not.to.be.empty;

    harness.element.value = ['one', 'two'];

    expect(harness.element.validity.valueMissing).to.be.false;
    expect(harness.element.validationMessage).to.be.empty;
  });

  it('should not set validity when not required', async () => {
    const harness = await createFixtureWithForm();

    expect(harness.element.required).to.be.false;
    expect(harness.element.willValidate).to.be.true;
    expect(harness.element.validity.valueMissing).to.be.false;
    expect(harness.element.validationMessage).to.be.empty;
  });

  it('should reset value when form is reset', async () => {
    const harness = await createFixtureWithForm({ value: 'two' });

    expect(harness.element.getAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VALUE)).to.equal('two');
    expect(harness.element.value).to.equal('two');

    harness.element.value = 'one';

    expect(harness.element.value).to.equal('one');
    expect(harness.element.getAttribute(BUTTON_TOGGLE_GROUP_CONSTANTS.attributes.VALUE)).to.equal('two');

    harness.element.form?.reset();

    expect(harness.element.value).to.equal('two');
  });

  it('should set associate <label>', async () => {
    const harness = await createFixtureWithForm();

    expect(harness.element.labels).to.have.lengthOf(1);
    expect(harness.element.labels[0].textContent).to.equal('Test label');
  });

  it('should associate <forge-label>', async () => {
    const harness = await createFixtureWithForm();
    const labelChangedCallbackSpy = sinon.spy(harness.element, 'labelChangedCallback');

    const label = document.createElement('forge-label');
    label.for = harness.element.id;
    label.textContent = 'Test label';
    harness.element.before(label);

    await elementUpdated(harness.element);

    expect(labelChangedCallbackSpy).to.have.been.calledOnce;
    expect(harness.element.getAttribute('aria-label')).to.equal(label.textContent);
  });

  it('should store value if not matching existing button toggles', async () => {
    const harness = await createFixture({ value: 'new-value' });

    expect(harness.element.value).to.equal('new-value');
    expect(harness.buttonToggles.every(toggle => toggle.selected)).to.be.false;
    expect(harness.buttonToggles.every(toggle => toggle.getAttribute('aria-pressed') === 'false')).to.be.true;
  });

  it('should inherit current state when button toggle is added dynamically', async () => {
    const harness = await createFixture({ readonly: true, disabled: true, value: 'new-value' });

    const buttonToggle = document.createElement('forge-button-toggle');
    buttonToggle.value = 'new-value';
    harness.element.appendChild(buttonToggle);
    await elementUpdated(harness.element);

    expect(buttonToggle.disabled).to.be.true;
    expect(buttonToggle.readonly).to.be.true;
    expect(buttonToggle.selected).to.be.true;
  });

  it('should apply selected state to button toggles when multiple is changed', async () => {
    const harness = await createFixture({ multiple: true, value: ['one', 'two'] });

    expect(harness.element.value).to.deep.equal(['one', 'two']);
    expect(harness.buttonToggles[0].selected).to.be.true;
    expect(harness.buttonToggles[1].selected).to.be.true;
    expect(harness.buttonToggles[2].selected).to.be.false;

    harness.element.multiple = false;

    expect(harness.element.value).to.equal('one');
    expect(harness.buttonToggles[0].selected).to.be.true;
    expect(harness.buttonToggles[1].selected).to.be.false;
    expect(harness.buttonToggles[2].selected).to.be.false;

    harness.element.multiple = true;

    expect(harness.element.value).to.deep.equal(['one', 'two']);
    expect(harness.buttonToggles[0].selected).to.be.true;
    expect(harness.buttonToggles[1].selected).to.be.true;
    expect(harness.buttonToggles[2].selected).to.be.false;
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

  public selectToggleViaMouse(index: number): Promise<void> {
    if (!this.buttonToggles[index]) {
      throw new Error(`Button toggle at index ${index} does not exist.`);
    }
    const { x, y, width, height } = this.buttonToggles[index].getBoundingClientRect();
    return sendMouse({
      type: 'click',
      position: [Math.floor(x + window.scrollX + width / 2), Math.floor(y + window.scrollY + height / 2)]
    });
  }

  public selectToggleViaKeyboard(index: number): Promise<void> {
    this.buttonToggles[index].focus();
    return sendKeys({ press: ' ' });
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
  const el = await fixture<IButtonToggleGroupComponent>(html`
    <forge-button-toggle-group
      aria-label="Choose an option"
      .value=${value}
      ?multiple=${multiple}
      .outlined=${!!outlined}
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
  return new ButtonToggleGroupHarness(el);
}

async function createFixtureWithForm({ value = '', multiple = false, required = false } = {}): Promise<ButtonToggleGroupHarness> {
  const formEl = await fixture<HTMLFormElement>(html`
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
  const buttonToggleGroup = formEl.querySelector(BUTTON_TOGGLE_GROUP_CONSTANTS.elementName) as IButtonToggleGroupComponent;
  return new ButtonToggleGroupHarness(buttonToggleGroup);
}

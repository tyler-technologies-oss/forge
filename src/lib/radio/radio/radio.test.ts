import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../../../test/utils/test-harness';
import { IFocusIndicatorComponent } from '../../focus-indicator';
import { IStateLayerComponent } from '../../state-layer';
import { IRadioComponent, RADIO_CONSTANTS } from '../radio';
import { spy } from 'sinon';
import { getFormState, getFormValue, internals } from '../../constants';
import { task } from '../../core';
import { RadioComponentDelegate } from './radio-component-delegate';

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

  public async pressKey(key: string): Promise<void> {
    await sendKeys({ press: key });
  }

  public async clickElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height } = el.getBoundingClientRect();

    await sendMouse({ type: 'click', position: [
      Math.floor(x + window.scrollX + width / 2),
      Math.floor(y + window.scrollY + height / 2),
    ]});
  }
}

describe('Radio', () => {
  it('should contain shadow root', async () => {
    const el = await fixture(html`<forge-radio></forge-radio>`);
    expect(el.shadowRoot).to.not.be.null;
  });

  it('should be accessible', async () => {
    const ariaEl = await fixture(html`<forge-radio aria-label="Active"></forge-radio>`);
    await expect(ariaEl).to.be.accessible();

    const labelEl = await fixture(html`<forge-radio>Active</forge-radio>`);
    await expect(labelEl).to.be.accessible();
  });

  it('should render with correct default values', async () => {
    const el = await fixture<IRadioComponent>(html`<forge-radio></forge-radio>`);
    const ctx = new RadioHarness(el);

    await expect(el).not.to.be.accessible();
    expect(el.checked).to.be.false;
    expect(el.defaultChecked).to.be.false;
    expect(el.value).to.equal('on');
    expect(el.required).to.be.false;
    expect(el.dense).to.be.false;
    expect(el.labelPosition).to.equal('end');
    expect(el.disabled).to.be.false;
    expect(el.readonly).to.be.false;
    expect(ctx.getRootElement(el).lastElementChild).to.equal(ctx.getLabelElement(el));
  });

  describe('attributes', async () => {
    it('should set checked', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio checked></forge-radio>`);
      expect(el.checked).to.be.true;
    });

    it('should set defaultChecked', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio default-checked></forge-radio>`);
      expect(el.defaultChecked).to.be.true;
    });

    it('should set value', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio value="active"></forge-radio>`);
      expect(el.value).to.equal('active');
    });

    it('should set required', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio required></forge-radio>`);
      expect(el.required).to.be.true;
    });

    it('should set dense', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio dense></forge-radio>`);
      expect(el.dense).to.be.true;
    });

    it('should set labelPosition', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio label-position="start"></forge-radio>`);
      const ctx = new RadioHarness(el);

      expect(el.labelPosition).to.equal('start');
      expect (ctx.getRootElement(el).firstElementChild).to.equal(ctx.getLabelElement(el));

      el.labelPosition = 'end';

      expect(el.labelPosition).to.equal('end');
      expect (ctx.getRootElement(el).lastElementChild).to.equal(ctx.getLabelElement(el));
    });

    it('should set disabled', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio disabled>Active</forge-radio>`);
      expect(el.disabled).to.be.true;
      await expect(el).to.be.accessible();
    });

    it('should set readonly', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio readonly></forge-radio>`);
      expect(el.readonly).to.be.true;
    });
  });

  describe('form association', async () => {
    it('should return form element and name', async () => {
      const form = await fixture<HTMLFormElement>(html`<form name="test-form"><forge-radio name="test-radio"></forge-radio></form>`);
      const ctx = new RadioHarness(form as HTMLElement);

      expect(ctx.radioElements[0].form).to.equal(form);
      expect(ctx.radioElements[0].name).to.equal('test-radio');
      expect(ctx.radioElements[0].labels).to.be.empty;

      ctx.radioElements[0].name = 'new-name';
      expect(ctx.radioElements[0].name).to.equal('new-name');

      ctx.radioElements[0].name = null as any;
      expect(ctx.radioElements[0].name).to.be.empty;
    });

    it('should return associated form labels', async () => {
      const form = await fixture<HTMLFormElement>(html`<form name="test-form"><label for="test-radio">Test label</label><forge-radio id="test-radio"></forge-radio></form>`);
      const ctx = new RadioHarness(form);
      const labelEl = form.querySelector('label') as HTMLLabelElement;

      expect(ctx.radioElements[0].labels).to.have.lengthOf(1);
      expect(ctx.radioElements[0].labels[0]).to.equal(labelEl);
    });

    it('should set form value when value is set', async () => {
      const form = await fixture<HTMLFormElement>(html`<form name="test-form"><forge-radio name="test-radio"></forge-radio></form>`);
      const ctx = new RadioHarness(form);

      let formData = new FormData(form);
      expect(formData.get('test-radio')).to.be.null;

      ctx.radioElements[0].checked = true;
      formData = new FormData(form);
      expect(formData.get('test-radio')).to.equal('on');
    });

    it('should reset value when form is reset', async () => {
      const form = await fixture<HTMLFormElement>(html`<form name="test-form"><forge-radio name="test-radio"></forge-radio></form>`);
      const ctx = new RadioHarness(form);

      ctx.radioElements[0].checked = true;
      let formData = new FormData(form);
      expect(formData.get('test-radio')).to.equal('on');

      form.reset();
      await task();
      formData = new FormData(form);

      expect(ctx.radioElements[0].checked).to.be.false;
      expect(formData.get('test-radio')).to.be.null;

      ctx.radioElements[0].defaultChecked = true;
      formData = new FormData(form);
      expect(formData.get('test-radio')).to.be.null;

      form.reset();
      await task();
      formData = new FormData(form);

      expect(ctx.radioElements[0].checked).to.be.true;
      expect(formData.get('test-radio')).to.equal('on');
    });

    it('should restore form state', async () => {
      const form = await fixture<HTMLFormElement>(html`<form name="test-form"><forge-radio name="test-radio"></forge-radio></form>`);
      const ctx = new RadioHarness(form);
      const setFormValueSpy = spy(ctx.radioElements[0][internals], 'setFormValue');

      ctx.radioElements[0].checked = true;

      const [value, state] = setFormValueSpy.args ?? [null, null];
      const newRadioEl = document.createElement('forge-radio');
      ctx.radioElements[0].remove();
      form.appendChild(newRadioEl);

      let restoreState: any = state ?? value;
      if (restoreState instanceof FormData) {
        restoreState = Array.from((restoreState as any).entries());
      }

      (newRadioEl as any).formStateRestoreCallback(restoreState, 'restore');

      expect(ctx.radioElements[0].checked).to.be.true;
    });

    it('should validate', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio required></forge-radio>`);

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
      const el = await fixture<IRadioComponent>(html`<forge-radio required></forge-radio>`);
      const message = 'Custom error message';

      el[internals].setValidity({ customError: true }, message);

      expect(el[internals].validationMessage).to.equal(message);
    });

    it('should get form value', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio></forge-radio>`);
      let formValue = el[getFormValue]();

      expect(formValue).to.be.null;

      el.checked = true;
      formValue = el[getFormValue]();

      expect(formValue).to.equal('on');
    });

    it('should get form state', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio></forge-radio>`);
      let formState = el[getFormState]();

      expect(formState).to.equal('unchecked');

      el.checked = true;
      formState = el[getFormState]();

      expect(formState).to.equal('checked');
    });
  });

  describe('interaction', async () => {
    it('should check on click', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio></forge-radio>`);
      const ctx = new RadioHarness(el);

      await ctx.clickElement(el);
      await task();

      expect(el.checked).to.be.true;
    });

    it('should not uncheck on click', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio checked></forge-radio>`);
      const ctx = new RadioHarness(el);

      await ctx.clickElement(el);
      await task();

      expect(el.checked).to.be.true;
    });

    it('should not check on click when disabled', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio disabled></forge-radio>`);
      const ctx = new RadioHarness(el);

      await ctx.clickElement(el);
      await task();

      expect(el.checked).to.be.false;
    });

    it('should not check on click when readonly', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio readonly></forge-radio>`);
      const ctx = new RadioHarness(el);

      await ctx.clickElement(el);
      await task();

      expect(el.checked).to.be.false;
    });

    it('should not check if click is prevented', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio></forge-radio>`);
      const ctx = new RadioHarness(el);

      el.addEventListener('click', evt => evt.preventDefault());

      await ctx.clickElement(el);
      await task();

      expect(el.checked).to.be.false;
    });

    it('should check on space key', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio></forge-radio>`);
      const ctx = new RadioHarness(el);
      el.focus();

      await ctx.pressKey(' ');

      expect(el.checked).to.be.true;
    });

    it('should not uncheck on space key', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio checked></forge-radio>`);
      const ctx = new RadioHarness(el);
      el.focus();

      await ctx.pressKey(' ');

      expect(el.checked).to.be.true;
    });

    it('should not check on space key when disabled', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio disabled></forge-radio>`);
      const ctx = new RadioHarness(el);
      el.focus();

      await ctx.pressKey(' ');

      expect(el.checked).to.be.false;
    });

    it('should not check on space key when readonly', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio readonly></forge-radio>`);
      const ctx = new RadioHarness(el);
      el.focus();

      await ctx.pressKey(' ');

      expect(el.checked).to.be.false;
    });

    it('should not check on space key if prevented', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio></forge-radio>`);
      const ctx = new RadioHarness(el);
      el.focus();

      el.addEventListener('keyup', evt => evt.preventDefault());

      await ctx.pressKey(' ');
      await task();

      expect(el.checked).to.be.false;
    });
  });

  describe('label aware', async () => {
    it('should accept forge label click', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio></forge-radio>`)

      el.labelClickedCallback?.();
      await task();

      expect(el.checked).to.be.true;
    });

    it('should accept forge label change', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio></forge-radio>`);
      el.labelChangedCallback?.('Test label');
      expect(el.ariaLabel).to.equal('Test label');
      await expect(el).to.be.accessible();

      el.labelChangedCallback?.(null);
      expect(el.ariaLabel).to.be.null;
      await expect(el).not.to.be.accessible();
    });
  });

  describe('events', async () => {
    it('should emit change event', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio></forge-radio>`);
      const ctx = new RadioHarness(el);
      const changeSpy = spy();

      el.addEventListener(RADIO_CONSTANTS.events.CHANGE, changeSpy);

      await ctx.clickElement(el);
      await task();

      expect(changeSpy).to.have.been.calledOnce;
    });

    it('should emit input event', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio></forge-radio>`);
      const ctx = new RadioHarness(el);
      const inputSpy = spy();

      el.addEventListener(RADIO_CONSTANTS.events.INPUT, inputSpy);

      await ctx.clickElement(el);
      await task();

      expect(inputSpy).to.have.been.calledOnce;
    });

    it('should allow change event to be cancelled', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio></forge-radio>`);
      const ctx = new RadioHarness(el);

      el.addEventListener(RADIO_CONSTANTS.events.CHANGE, evt => evt.preventDefault());

      await ctx.clickElement(el);
      await task();

      expect(el.checked).to.be.false;
    });

    it('should allow input event to be cancelled', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio></forge-radio>`);
      const ctx = new RadioHarness(el);

      el.addEventListener(RADIO_CONSTANTS.events.INPUT, evt => evt.preventDefault());

      await ctx.clickElement(el);
      await task();

      expect(el.checked).to.be.false;
    });
  });

  describe('radio group', async () => {
    it('should should not group unnamed radios', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio></forge-radio>
          <forge-radio></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].checked = true;
      radioEls[1].checked = true;

      expect(radioEls[0].checked).to.be.true;
      expect(radioEls[1].checked).to.be.true;
    });

    it('should group radios with same name but not part of form', async () => {
      const el = await fixture<HTMLElement>(html`
        <div>
          <forge-radio name="test-radio"></forge-radio>
          <forge-radio name="test-radio"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(el);
      const radioEls = ctx.radioElements;

      radioEls[0].checked = true;
      radioEls[1].checked = true;

      expect(radioEls[0].checked).to.be.false;
      expect(radioEls[1].checked).to.be.true;
    });

    it('should group radios with same name and in same form', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio"></forge-radio>
          <forge-radio name="test-radio"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].checked = true;
      radioEls[1].checked = true;

      expect(radioEls[0].checked).to.be.false;
      expect(radioEls[1].checked).to.be.true;
    });

    it('should not group radios with same name in different forms', async () => {
      const el = await fixture<HTMLElement>(html`
        <div>
          <form>
            <forge-radio name="test-radio"></forge-radio>
          </form>
          <form>
            <forge-radio name="test-radio"></forge-radio>
          </form>
        </div<
      `);
      const ctx = new RadioHarness(el);
      const radioEls = ctx.radioElements;

      radioEls[0].checked = true;
      radioEls[1].checked = true;

      expect(radioEls[0].checked).to.be.true;
      expect(radioEls[1].checked).to.be.true;
    });

    it('should submit value of checked radio', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].checked = true;

      let formData = new FormData(form);
      expect(formData.get('test-radio')).to.equal('one');

      radioEls[1].checked = true;

      formData = new FormData(form);
      expect(formData.get('test-radio')).to.equal('two');
    });

    it('should unchecked other radios in group when radio is checked', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].checked = true;
      radioEls[1].checked = true;

      expect(radioEls[0].checked).to.be.false;
      expect(radioEls[1].checked).to.be.true;
    });

    it('should focus next radio in group when arrow down key is pressed', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].focus();

      await ctx.pressKey('ArrowDown');

      expect(radioEls[0].checked).to.be.false;
      expect(radioEls[1].checked).to.be.true;
    });

    it('should focus previous radio in group when arrow up key is pressed', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[1].focus();

      await ctx.pressKey('ArrowUp');

      expect(radioEls[0].checked).to.be.true;
      expect(radioEls[1].checked).to.be.false;
    });

    it('should focus next radio in group when arrow right key is pressed', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].focus();

      await ctx.pressKey('ArrowRight');

      expect(radioEls[0].checked).to.be.false;
      expect(radioEls[1].checked).to.be.true;
    });

    it('should focus previous radio in group when arrow left key is pressed', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[1].focus();

      await ctx.pressKey('ArrowLeft');

      expect(radioEls[0].checked).to.be.true;
      expect(radioEls[1].checked).to.be.false;
    });

    it('should check next radio in group when arrow down key is pressed', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].focus();

      await ctx.pressKey('ArrowDown');

      expect(radioEls[0].checked).to.be.false;
      expect(radioEls[1].checked).to.be.true;
    });

    it('should check previous radio in group when arrow up key is pressed', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[1].focus();

      await ctx.pressKey('ArrowUp');

      expect(radioEls[0].checked).to.be.true;
      expect(radioEls[1].checked).to.be.false;
    });

    it('should check next radio in group when arrow right key is pressed', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].focus();

      await ctx.pressKey('ArrowRight');

      expect(radioEls[0].checked).to.be.false;
      expect(radioEls[1].checked).to.be.true;
    });

    it('should check previous radio in group when arrow left key is pressed', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[1].focus();

      await ctx.pressKey('ArrowLeft');

      expect(radioEls[0].checked).to.be.true;
      expect(radioEls[1].checked).to.be.false;
    });

    it('should skip disabled radio when arrow key is pressed', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two" disabled></forge-radio>
          <forge-radio name="test-radio" value="three"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].focus();

      await ctx.pressKey('ArrowDown');

      expect(radioEls[0].checked).to.be.false;
      expect(radioEls[1].checked).to.be.false;
      expect(radioEls[2].checked).to.be.true;
    });

    it('should skip readonly radio when arrow key is pressed', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two" readonly></forge-radio>
          <forge-radio name="test-radio" value="three"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].focus();

      await ctx.pressKey('ArrowDown');

      expect(radioEls[0].checked).to.be.false;
      expect(radioEls[1].checked).to.be.false;
      expect(radioEls[2].checked).to.be.true;
    });

    it('should only include checked radio in tab order', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one" checked></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      await elementUpdated(radioEls[0]);

      expect(radioEls[0].tabIndex).to.equal(0);
      expect(radioEls[1].tabIndex).to.equal(-1);
    });

    it('should include all radios in tab order when none are checked', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      expect(radioEls[0].tabIndex).to.equal(0);
      expect(radioEls[1].tabIndex).to.equal(0);
    });

    it('should remove other radios from tab order when radio is focused', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[0].focus();

      expect(radioEls[0].tabIndex).to.equal(0);
      expect(radioEls[1].tabIndex).to.equal(-1);
    });

    it('should not change focus if change event is prevented', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one" checked></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[1].addEventListener(RADIO_CONSTANTS.events.CHANGE, evt => evt.preventDefault());

      radioEls[0].focus();

      await ctx.pressKey('ArrowDown');
      await task();

      expect(radioEls[0]).to.be.focus;
      expect(radioEls[0].checked).to.be.true;
      expect(radioEls[1].checked).to.be.false;
    });
  });

  describe('adding and removing', async () => {
    it('should make all radios focusable when checked radio is removed', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
          <forge-radio name="test-radio" value="three" checked></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      radioEls[2].remove();
      await task();

      expect(radioEls[0].tabIndex).to.equal(0);
      expect(radioEls[1].tabIndex).to.equal(0);
    });

    it('should make other radios non-focusable when checked radio is added', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form name="test-form">
          <forge-radio name="test-radio" value="one"></forge-radio>
          <forge-radio name="test-radio" value="two"></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      const checkedRadio = document.createElement(RADIO_CONSTANTS.elementName) as IRadioComponent;
      checkedRadio.name = 'test-radio';
      checkedRadio.value = 'three';
      checkedRadio.checked = true;

      form.appendChild(checkedRadio);
      await task();

      expect(radioEls[0].tabIndex).to.equal(-1);
      expect(radioEls[1].tabIndex).to.equal(-1);
      expect(checkedRadio.tabIndex).to.equal(0);
    });

    it('should uncheck radio when checked radio is added', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <forge-radio name="test-radio" value="one" checked></forge-radio>
        </form>
      `);
      const ctx = new RadioHarness(form);
      const radioEls = ctx.radioElements;

      const checkedRadio = document.createElement(RADIO_CONSTANTS.elementName) as IRadioComponent;
      checkedRadio.name = 'test-radio';
      checkedRadio.value = 'two';
      checkedRadio.checked = true;

      form.appendChild(checkedRadio);
      await task();

      expect(radioEls[0].checked).to.be.false;
      expect(checkedRadio.checked).to.be.true;
    });
  });

  describe('delegate', async () => {
    it('should create delegate with default values', () => {
      const delegate = new RadioComponentDelegate();
      expect(delegate.value).to.equal('on');
      expect(delegate.checked).to.be.false;
      expect(delegate.defaultChecked).to.be.false;
      expect(delegate.dense).to.be.false;
      expect(delegate.disabled).to.be.false;
      expect(delegate.required).to.be.false;
      expect(delegate.readonly).to.be.false;
      expect(delegate.name).to.be.empty;
      expect(delegate.labelPosition).to.equal('end');
    });

    it('should set properties via the constructor', () => {
      const delegate = new RadioComponentDelegate({ props: {
        value: 'value',
        checked: true,
        defaultChecked: true,
        dense: true,
        disabled: true,
        required: true,
        readonly: true,
        name: 'test-radio',
        labelPosition: 'start',
      }});
      expect(delegate.value).to.equal('value');
      expect(delegate.checked).to.be.true;
      expect(delegate.defaultChecked).to.be.true;
      expect(delegate.dense).to.be.true;
      expect(delegate.disabled).to.be.true;
      expect(delegate.required).to.be.true;
      expect(delegate.readonly).to.be.true;
      expect(delegate.name).to.equal('test-radio');
      expect(delegate.labelPosition).to.equal('start');
    });

    it('should set value', () => {
      const delegate = new RadioComponentDelegate();
      delegate.value = 'value';
      expect(delegate.value).to.equal('value');
    });

    it('should set checked', () => {
      const delegate = new RadioComponentDelegate();
      delegate.checked = true;
      expect(delegate.checked).to.be.true;
    });

    it('should set defaultChecked', () => {
      const delegate = new RadioComponentDelegate();
      delegate.defaultChecked = true;
      expect(delegate.defaultChecked).to.be.true;
    });

    it('should set dense', () => {
      const delegate = new RadioComponentDelegate();
      delegate.dense = true;
      expect(delegate.dense).to.be.true;
    });

    it('should set disabled', () => {
      const delegate = new RadioComponentDelegate();
      delegate.disabled = true;
      expect(delegate.disabled).to.be.true;
    });

    it('should set required', () => {
      const delegate = new RadioComponentDelegate();
      delegate.required = true;
      expect(delegate.required).to.be.true;
    });

    it('should set readonly', () => {
      const delegate = new RadioComponentDelegate();
      delegate.readonly = true;
      expect(delegate.readonly).to.be.true;
    });

    it('should set name', () => {
      const delegate = new RadioComponentDelegate();
      delegate.name = 'test-radio';
      expect(delegate.name).to.equal('test-radio');
    });

    it('should set labelPosition', () => {
      const delegate = new RadioComponentDelegate();
      delegate.labelPosition = 'start';
      expect(delegate.labelPosition).to.equal('start');
    });

    it('should set label via constructor', () => {
      const delegate = new RadioComponentDelegate({ options: { label: 'Test label' } });
      expect(delegate.element.innerText).to.equal('Test label');
    });

    it('should set label', () => {
      const delegate = new RadioComponentDelegate();
      delegate.setLabel('Test label');
      expect(delegate.element.innerText).to.equal('Test label');
    });
  });
});

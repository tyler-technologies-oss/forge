import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../../test/utils/test-harness';
import { IFocusIndicatorComponent } from '../focus-indicator';
import { IStateLayerComponent } from '../state-layer';
import { ISwitchComponent, SWITCH_CONSTANTS } from '../switch';

class SwitchHarness extends TestHarness<ISwitchComponent> {
  public rootElement: HTMLElement;
  public inputContainerElement: HTMLElement;
  public inputElement: HTMLInputElement;
  public trackElement: HTMLElement;
  public handleElement: HTMLElement;
  public iconOffElement: HTMLElement;
  public iconOffPathElement: HTMLElement;
  public iconOnElement: HTMLElement;
  public iconOnPathElement: HTMLElement;
  public labelElement: HTMLElement;
  public stateLayer: IStateLayerComponent;
  public focusIndicator: IFocusIndicatorComponent;

  constructor(el: ISwitchComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.rootElement = getShadowElement(this.element, SWITCH_CONSTANTS.selectors.ROOT);
    this.inputContainerElement = getShadowElement(this.element, '[part="input-container"]');
    this.inputElement = getShadowElement(this.element, SWITCH_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    this.trackElement = getShadowElement(this.element, '[part="track"]');
    this.handleElement = getShadowElement(this.element, '[part="handle"]');
    this.iconOffElement = getShadowElement(this.element, SWITCH_CONSTANTS.selectors.ICON_OFF);
    this.iconOffPathElement = getShadowElement(this.element, '[part="icon-off-path"]');
    this.iconOnElement = getShadowElement(this.element, SWITCH_CONSTANTS.selectors.ICON_ON);
    this.iconOnPathElement = getShadowElement(this.element, '[part="icon-on-path"]');
    this.labelElement = getShadowElement(this.element, SWITCH_CONSTANTS.selectors.LABEL);
    this.stateLayer = getShadowElement(this.element, '[part="state-layer"]') as IStateLayerComponent;
    this.focusIndicator = getShadowElement(this.element, '[part="focus-indicator"]') as IFocusIndicatorComponent;
  }

  public async pressSpaceKey(): Promise<void> {
    await sendKeys({ press: ' ' });
  }

  public async clickElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height } = el.getBoundingClientRect();

    await sendMouse({ type: 'click', position: [
      Math.floor(x + window.scrollX + width / 2),
      Math.floor(y + window.scrollY + height / 2),
    ]});
  }
}

describe('Switch', () => {
  it('should contain shadow root', async () => {
    const el = await fixture(html`<forge-switch></forge-switch>`);
  });

  it('should be accessible', async () => {
    const ariaEl = await fixture(html`<forge-switch aria-label="Active"></forge-switch>`);
    await expect(ariaEl).to.be.accessible();

    const labelEl = await fixture(html`<forge-switch>Active</forge-switch>`);
    await expect(labelEl).to.be.accessible();
  });

  it('should render with correct default values', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch></forge-switch>`);
    const ctx = new SwitchHarness(el);

    await expect(el).not.to.be.accessible();
    expect(el.on).to.be.false;
    expect(el.selected).to.be.false;
    expect(el.dense).to.be.false;
    expect(el.disabled).to.be.false;
    expect(el.required).to.be.false;
    expect(el.icon).to.equal('on');
    expect(el.labelPosition).to.equal('end');
    expect(ctx.inputElement.checked).to.be.false;
    expect(window.getComputedStyle(ctx.iconOffElement).display).to.equal('none');
    expect(window.getComputedStyle(ctx.iconOnElement).display).to.not.equal('none');
    expect(ctx.rootElement.lastElementChild).to.equal(ctx.labelElement);
  });

  it('should accept on', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch on></forge-switch>`);
    const ctx = new SwitchHarness(el);

    expect(el.on).to.be.true;
    expect(el.selected).to.be.true;
    expect(ctx.inputElement.checked).to.be.true;
  });

  it('should accept selected', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch selected></forge-switch>`);
    const ctx = new SwitchHarness(el);

    expect(el.on).to.be.true;
    expect(el.selected).to.be.true;
    expect(ctx.inputElement.checked).to.be.true;
  });

  it('should accept disabled', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch disabled aria-label="Active"></forge-switch>`);
    const ctx = new SwitchHarness(el);

    expect(el.disabled).to.be.true;
    expect(ctx.inputElement.disabled).to.be.true;
    await expect(el).to.be.accessible();
  });

  it('should accept required', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch required></forge-switch>`);
    const ctx = new SwitchHarness(el);

    expect(el.required).to.be.true;
    expect(ctx.inputElement.required).to.be.true;
  });

  it('should accept dense', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch dense></forge-switch>`);

    expect(el.dense).to.be.true;
  });

  it('should accept icon', async () => {
    const offEl = await fixture<ISwitchComponent>(html`<forge-switch icon="off"></forge-switch>`);
    const offCtx = new SwitchHarness(offEl);
    
    expect(offEl.icon).to.equal('off');
    expect(window.getComputedStyle(offCtx.iconOffElement).display).to.not.equal('none');
    expect(window.getComputedStyle(offCtx.iconOnElement).display).to.equal('none');
    
    const bothEl = await fixture<ISwitchComponent>(html`<forge-switch icon="both"></forge-switch>`);
    const bothCtx = new SwitchHarness(bothEl);
    
    expect(bothEl.icon).to.equal('both');
    expect(window.getComputedStyle(bothCtx.iconOffElement).display).to.not.equal('none');
    expect(window.getComputedStyle(bothCtx.iconOnElement).display).to.not.equal('none');
    
    const noneEl = await fixture<ISwitchComponent>(html`<forge-switch icon="none"></forge-switch>`);
    const noneCtx = new SwitchHarness(noneEl);

    expect(noneEl.icon).to.equal('none');
    expect(window.getComputedStyle(noneCtx.iconOffElement).display).to.equal('none');
    expect(window.getComputedStyle(noneCtx.iconOnElement).display).to.equal('none');
  });

  it('should accept label position', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch label-position="start"></forge-switch>`);
    const ctx = new SwitchHarness(el);

    expect(el.labelPosition).to.equal('start');
    expect(ctx.rootElement.firstElementChild).to.equal(ctx.labelElement);

    el.labelPosition = 'end';

    expect(el.labelPosition).to.equal('end');
    expect(ctx.rootElement.lastElementChild).to.equal(ctx.labelElement);
  });

  it('should toggle', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch></forge-switch>`);
    const ctx = new SwitchHarness(el);

    el.toggle();

    expect(el.on).to.be.true;
    expect(ctx.inputElement.checked).to.be.true;
  });

  it('should toggle on', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch aria-label="Active"></forge-switch>`);
    const ctx = new SwitchHarness(el);

    el.toggle(true);

    expect(el.on).to.be.true;
    expect(ctx.inputElement.checked).to.be.true;
    await expect(el).to.be.accessible();
  });

  it('should toggle off', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch on></forge-switch>`);
    const ctx = new SwitchHarness(el);

    el.toggle(false);

    expect(el.on).to.be.false;
    expect(ctx.inputElement.checked).to.be.false;
  });

  it('should set on when clicked', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch></forge-switch>`);
    const ctx = new SwitchHarness(el);
    const changeSpy = spy();
    el.addEventListener('forge-switch-change', changeSpy);

    await ctx.clickElement(el);

    expect(el.on).to.be.true;
    expect(ctx.inputElement.checked).to.be.true;
    expect(changeSpy.calledWith(new CustomEvent('forge-switch-input', { detail: true }))).to.be.true;
  });

  it('should set on when space is pressed', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch></forge-switch>`);
    const ctx = new SwitchHarness(el);
    const changeSpy = spy();
    el.addEventListener('forge-switch-change', changeSpy);

    el.focus();
    await ctx.pressSpaceKey();

    expect(el.on).to.be.true;
    expect(ctx.inputElement.checked).to.be.true;
    expect(changeSpy.calledWith(new CustomEvent('forge-switch-input', { detail: true }))).to.be.true;
  });

  it('should cancel change event', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch></forge-switch>`);
    const ctx = new SwitchHarness(el);
    el.addEventListener('forge-switch-change', (event: Event) => {
      event.preventDefault();
    });

    await ctx.clickElement(el);

    expect(el.on).to.be.false;
    expect(ctx.inputElement.checked).to.be.false;
  });

  it('should return form element and name', async () => {
    const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);
    
    const switchEl = document.createElement('forge-switch');
    switchEl.setAttribute('name', 'test-switch');
    form.appendChild(switchEl);

    expect(switchEl.form).to.equal(form);
    expect(switchEl.name).to.equal('test-switch');
    expect(switchEl.labels).to.be.empty;

    switchEl.name = 'new-name';
    expect(switchEl.name).to.equal('new-name');

    switchEl.name = null as any;
    expect(switchEl.name).to.be.empty;
  });

  it('should return associated form labels', async () => {
    const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);
    
    const switchEl = document.createElement('forge-switch');
    switchEl.setAttribute('id', 'test-switch');
    form.appendChild(switchEl);

    const labelText = 'Test Label';
    const label = document.createElement('label');
    label.setAttribute('for', 'test-switch');
    label.textContent = labelText;
    form.appendChild(label);

    expect(switchEl.labels.length).to.equal(1);
    expect(switchEl.labels[0].textContent).to.equal(labelText);
  });

  it('should set form value when value is set', async () => {
    const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

    const switchEl = document.createElement('forge-switch');
    switchEl.setAttribute('name', 'test-switch');
    form.appendChild(switchEl);

    let formData = new FormData(form);
    expect(formData.get('test-switch')).to.equal('false');

    switchEl.on = true;
    formData = new FormData(form);
    expect(formData.get('test-switch')).to.equal('true');
  });

  it('should reset value when form is reset', async () => {
    const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);
    
    const switchEl = document.createElement('forge-switch');
    switchEl.setAttribute('name', 'test-switch');
    form.appendChild(switchEl);

    switchEl.on = true;
    let formData = new FormData(form);
    expect(formData.get('test-switch')).to.equal('true');

    form.reset();
    formData = new FormData(form);

    expect(switchEl.on).to.be.false;
    expect(formData.get('test-switch')).to.equal('false');
  });

  it('should restore form state', async () => {
    const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

    const switchEl = document.createElement('forge-switch');
    const setFormValueSpy = spy(switchEl.internals, 'setFormValue');
    switchEl.name = 'test-switch';
    switchEl.toggleAttribute('on', true)
    form.appendChild(switchEl);
    
    const [value, state] = setFormValueSpy.args ?? [null, null];
    const newSwitchEl = document.createElement('forge-switch');
    switchEl.remove();
    form.appendChild(newSwitchEl);

    let restoreState: any = state ?? value;
    if (restoreState instanceof FormData) {
      restoreState = Array.from((restoreState as any).entries());
    }

    (newSwitchEl as any).formStateRestoreCallback(restoreState, 'restore');

    expect(switchEl.on).to.be.true;
  });

  it('should validate', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch required></forge-switch>`);

    expect(el.validity.valid).to.be.false;
    expect(el.validationMessage).to.not.be.empty;
    expect(el.checkValidity()).to.be.false;
    expect(el.reportValidity()).to.be.false;
    
    el.on = true;

    expect(el.willValidate).to.be.true;
    expect(el.validity.valid).to.be.true;
    expect(el.validationMessage).to.be.empty;
    expect(el.checkValidity()).to.be.true;
    expect(el.reportValidity()).to.be.true;
  });

  it('should set custom validity', async () => {
    const el = await fixture<ISwitchComponent>(html`<forge-switch required></forge-switch>`);
    const message = 'test message';

    el.setCustomValidity(message);

    expect(el.validationMessage).to.equal(message);
  });
});
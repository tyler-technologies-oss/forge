import { sendKeys } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../core/testing/test-harness.js';
import { ISliderComponent } from '../slider/index.js';
import { SLIDER_CONSTANTS } from './slider-constants.js';
import type { IStateLayerComponent } from '../state-layer/state-layer.js';
import { internals } from '../constants.js';

import './slider.js';

class SliderHarness extends TestHarness<ISliderComponent> {
  public rootElement: HTMLElement;
  public trackElement: HTMLElement;
  public handleContainerElement: HTMLElement;
  public endInputElement: HTMLInputElement;
  public endHandleElement: HTMLElement;
  public endHandleThumbElement: HTMLElement;
  public endLabelElement: HTMLElement;
  public endLabelContentElement: HTMLElement;
  public endStateLayer: IStateLayerComponent;
  public startInputElement: HTMLInputElement;
  public startHandleElement: HTMLElement;
  public startHandleThumbElement: HTMLElement;
  public startLabelElement: HTMLElement;
  public startLabelContentElement: HTMLElement;
  public startStateLayer: IStateLayerComponent;

  constructor(el: ISliderComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.rootElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.ROOT);
    this.trackElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.TRACK);
    this.handleContainerElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.HANDLE_CONTAINER);
    this.endInputElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.END_INPUT) as HTMLInputElement;
    this.endHandleElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.END_HANDLE);
    this.endHandleThumbElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.END_HANDLE_THUMB);
    this.endLabelElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.END_LABEL);
    this.endLabelContentElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.END_LABEL_CONTENT);
    this.endStateLayer = getShadowElement(this.element, '.handle.end forge-state-layer') as IStateLayerComponent;
    this.startInputElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_INPUT) as HTMLInputElement;
    this.startHandleElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_HANDLE);
    this.startHandleThumbElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_HANDLE_THUMB);
    this.startLabelElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_LABEL);
    this.startLabelContentElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_LABEL_CONTENT);
    this.startStateLayer = getShadowElement(this.element, '.handle.start forge-state-layer') as IStateLayerComponent;
  }

  public focusStart(): void {
    this.startInputElement.focus();
  }

  public focusEnd(): void {
    this.endInputElement.focus();
  }

  public async pressArrowKey(key: 'ArrowLeft' | 'ArrowRight'): Promise<void> {
    await sendKeys({ press: key });
  }

  public async simulateEndInteraction(type: 'input' | 'change', value: number): Promise<void> {
    this.endInputElement.focus();
    this.endInputElement.valueAsNumber = value;
    this.endInputElement.dispatchEvent(new InputEvent(type, { bubbles: true, composed: true }));
  }

  public simulateStartInteraction(type: 'input' | 'change', value: number): void {
    this.endInputElement.focus();
    this.startInputElement.valueAsNumber = value;
    this.startInputElement.dispatchEvent(new InputEvent(type, { bubbles: true, composed: true }));
  }

  public simulateStartEnter(): void {
    const bounds = this.startHandleThumbElement.getBoundingClientRect();
    let { x, y } = bounds;
    const { width, height } = bounds;
    x = x + width / 2;
    y = y + height / 2;
    this.startInputElement.dispatchEvent(new PointerEvent('pointerenter', { clientX: x, clientY: y, screenX: x, screenY: y }));
  }

  public simulateStartMove(divisor = 2): void {
    const bounds = this.startInputElement.getBoundingClientRect();
    let { x, y } = bounds;
    const { width, height } = bounds;
    x = x + width / divisor;
    y = y + height / divisor;
    this.startInputElement.dispatchEvent(new PointerEvent('pointermove', { clientX: x, clientY: y, screenX: x, screenY: y }));
  }

  public simulateStartLeave(): void {
    this.startInputElement.dispatchEvent(new PointerEvent('pointerleave'));
  }

  public simulateEndEnter(): void {
    const bounds = this.endHandleThumbElement.getBoundingClientRect();
    let { x, y } = bounds;
    const { width, height } = bounds;
    x = x + width / 2;
    y = y + height / 2;
    this.endInputElement.dispatchEvent(new PointerEvent('pointerenter', { clientX: x, clientY: y, screenX: x, screenY: y }));
  }

  public simulateEndMove(divisor = 2): void {
    const bounds = this.endInputElement.getBoundingClientRect();
    let { x, y } = bounds;
    const { width, height } = bounds;
    x = x + width / divisor;
    y = y + height / divisor;
    this.endInputElement.dispatchEvent(new PointerEvent('pointermove', { clientX: x, clientY: y, screenX: x, screenY: y }));
  }

  public simulateEndLeave(): void {
    this.endInputElement.dispatchEvent(new PointerEvent('pointerleave'));
  }
}

describe('Slider', () => {
  it('should contain shadow root', async () => {
    const el = await fixture(html`<forge-slider></forge-slider>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture(html`<forge-slider data-aria-label="Choose value"></forge-slider>`);
    await expect(el).to.be.accessible();
  });

  it('should be accessible with range', async () => {
    const el = await fixture(html`<forge-slider range data-aria-label-start="Choose start value" data-aria-label-end="Choose end value"></forge-slider>`);
    await expect(el).to.be.accessible();
  });

  it('should render with correct default values', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el).not.to.be.accessible();
    expect(el.value).to.equal(50);
    expect(el.min).to.equal(0);
    expect(el.max).to.equal(100);
    expect(el.step).to.equal(1);
    expect(el.disabled).to.be.false;
    expect(el.readonly).to.be.false;
    expect(el.labeled).to.be.true;
    expect(el.range).to.be.false;
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).to.equal('0.5');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).to.equal('0');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-tick-count')).to.equal('100');
    expect(ctx.endInputElement.valueAsNumber).to.equal(50);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).to.equal('50');
    expect(ctx.endInputElement.min).to.equal('0');
    expect(ctx.endInputElement.max).to.equal('100');
    expect(ctx.endInputElement.step).to.equal('1');
    expect(ctx.startInputElement).to.be.null;
    expect(ctx.endLabelContentElement.textContent).to.equal('50');
    expect(ctx.startLabelContentElement).to.be.null;
    expect(ctx.trackElement.classList.contains(SLIDER_CONSTANTS.classes.TICKMARKS)).to.be.false;
  });

  it('should accept value', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider value="75"></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el.value).to.equal(75);
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).to.equal('0.75');
    expect(ctx.endInputElement.valueAsNumber).to.equal(75);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).to.equal('75');
    expect(ctx.endLabelContentElement.textContent).to.equal('75');
  });

  it('should accept min', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider min="25"></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el.min).to.equal(25);
    expect(ctx.endInputElement.min).to.equal('25');
  });

  it('should accept max', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider max="75"></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el.max).to.equal(75);
    expect(ctx.endInputElement.max).to.equal('75');
  });

  it('should accept value below min, but render within range', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider value="-100"></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el.value).to.equal(-100);
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).to.equal('0');
    expect(ctx.endInputElement.valueAsNumber).to.equal(0);
  });

  it('should accept value above max, but render within range', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider value="500"></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el.value).to.equal(500);
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).to.equal('1');
    expect(ctx.endInputElement.valueAsNumber).to.equal(100);
  });

  it('should accept valueEnd below min, but render within range in range mode', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider range value-start="-100" value-end="-100"></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el.valueStart).to.equal(-100);
    expect(el.valueEnd).to.equal(-100);
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).to.equal('0');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).to.equal('0');
    expect(ctx.startInputElement.valueAsNumber).to.equal(0);
    expect(ctx.endInputElement.valueAsNumber).to.equal(0);
  });

  it('should accept valueStart above max, but render within range in range mode', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider range value-start="500" value-end="500"></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el.valueStart).to.equal(500);
    expect(el.valueEnd).to.equal(500);
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).to.equal('1');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).to.equal('1');
    expect(ctx.startInputElement.valueAsNumber).to.equal(100);
    expect(ctx.endInputElement.valueAsNumber).to.equal(100);
  });

  it('should accept step', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider step="10"></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el.step).to.equal(10);
    expect(ctx.endInputElement.step).to.equal('10');
    expect(ctx.endInputElement.step).to.equal('10');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-tick-count')).to.equal('10');
  });

  it('should show tickmarks', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider tickmarks></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el.tickmarks).to.be.true;
    expect(ctx.trackElement.classList.contains(SLIDER_CONSTANTS.classes.TICKMARKS)).to.be.true;
  });

  it('should accept disabled', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider disabled></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el.disabled).to.be.true;
    expect(ctx.endInputElement.disabled).to.be.true;
    expect(ctx.endStateLayer.disabled).to.be.true;
  });

  it('should accepts disabled in range mode', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider range disabled></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el.disabled).to.be.true;
    expect(ctx.startInputElement.disabled).to.be.true;
    expect(ctx.endInputElement.disabled).to.be.true;
    expect(ctx.startStateLayer.disabled).to.be.true;
    expect(ctx.endStateLayer.disabled).to.be.true;
  });

  it('should accept readonly', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider readonly></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el.readonly).to.be.true;
    expect(ctx.endInputElement.readOnly).to.be.true;
  });

  it('should accept labeled', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider labeled="false"></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el.labeled).to.be.false;
    expect(ctx.endLabelContentElement).to.be.null;
  });

  it('should accept range', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider range></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(el.range).to.be.true;
    expect(ctx.startInputElement).not.to.be.null;
    expect(ctx.startInputElement.valueAsNumber).to.equal(33);
    expect(ctx.startInputElement.getAttribute('aria-valuetext')).to.equal('33');
    expect(ctx.startInputElement.min).to.equal('0');
    expect(ctx.startInputElement.max).to.equal('100');
    expect(ctx.startInputElement.step).to.equal('1');
    expect(ctx.startLabelContentElement.textContent).to.equal('33');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).to.equal('0.33');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).to.equal('0.67');
    expect(ctx.endInputElement.valueAsNumber).to.equal(67);
  });

  it('should update range dynamically', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider></forge-slider>`);
    const ctx = new SliderHarness(el);

    el.range = true;
    await elementUpdated(el);
    ctx.invalidate();

    expect(el.range).to.be.true;
    expect(ctx.startInputElement).not.to.be.null;
    expect(ctx.startInputElement.valueAsNumber).to.equal(33);
    expect(ctx.startInputElement.getAttribute('aria-valuetext')).to.equal('33');
    expect(ctx.startInputElement.min).to.equal('0');
    expect(ctx.startInputElement.max).to.equal('100');
    expect(ctx.startInputElement.step).to.equal('1');
    expect(ctx.startLabelContentElement.textContent).to.equal('33');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).to.equal('0.33');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).to.equal('0.67');
    expect(ctx.endInputElement.valueAsNumber).to.equal(67);
  });

  it('should decrease value when left arrow key pressed', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider data-aria-label="Choose value"></forge-slider>`);
    const ctx = new SliderHarness(el);
    const inputSpy = spy();
    const changeSpy = spy();
    el.addEventListener('forge-slider-input', inputSpy);
    el.addEventListener('forge-slider-change', changeSpy);

    await ctx.focusEnd();
    await ctx.pressArrowKey('ArrowLeft');

    await expect(el).to.be.accessible();
    expect(el.value).to.equal(49);
    expect(ctx.endInputElement.valueAsNumber).to.equal(49);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).to.equal('49');
    expect(ctx.endLabelContentElement.textContent).to.equal('49');
    expect(inputSpy.calledOnceWith(new CustomEvent('forge-slider-input', { detail: 49 }))).to.be.true;
    expect(changeSpy.calledOnceWith(new CustomEvent('forge-slider-change', { detail: 49 }))).to.be.true;
  });

  it('should increase value when right arrow key pressed', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider data-aria-label="Choose value"></forge-slider>`);
    const ctx = new SliderHarness(el);
    const inputSpy = spy();
    const changeSpy = spy();
    el.addEventListener('forge-slider-input', inputSpy);
    el.addEventListener('forge-slider-change', changeSpy);

    await ctx.focusEnd();
    await ctx.pressArrowKey('ArrowRight');

    await expect(el).to.be.accessible();
    expect(el.value).to.equal(51);
    expect(ctx.endInputElement.valueAsNumber).to.equal(51);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).to.equal('51');
    expect(ctx.endLabelContentElement.textContent).to.equal('51');
    expect(inputSpy.calledOnceWith(new CustomEvent('forge-slider-input', { detail: { value: 51 } }))).to.be.true;
    expect(changeSpy.calledOnceWith(new CustomEvent('forge-slider-change', { detail: { value: 51 } }))).to.be.true;
  });

  it('should change value when clicking on input', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider data-aria-label="Choose value"></forge-slider>`);
    const ctx = new SliderHarness(el);
    const changeSpy = spy();
    const inputSpy = spy();
    el.addEventListener('forge-slider-change', changeSpy);
    el.addEventListener('forge-slider-input', inputSpy);

    await ctx.simulateEndInteraction('change', 33);

    await expect(el).to.be.accessible();
    expect(el.value).to.equal(33);
    expect(changeSpy.calledOnceWith(new CustomEvent('forge-slider-input', { detail: { value: 33 } }))).to.be.true;
    expect(inputSpy.called).to.be.false;
  });

  it('should change value when clicking on input with range', async () => {
    const el = await fixture<ISliderComponent>(
      html`<forge-slider data-aria-label-start="Choose start value" data-aria-label-end="Choose end value" range></forge-slider>`
    );
    const ctx = new SliderHarness(el);
    const changeSpy = spy();
    const inputSpy = spy();
    el.addEventListener('forge-slider-range-change', changeSpy);
    el.addEventListener('forge-slider-range-input', inputSpy);

    ctx.simulateStartInteraction('input', 25);
    ctx.simulateStartInteraction('input', 30);
    ctx.simulateStartInteraction('change', 30);

    ctx.simulateEndInteraction('input', 75);
    ctx.simulateEndInteraction('input', 80);
    ctx.simulateEndInteraction('change', 80);

    await expect(el).to.be.accessible();
    expect(el.valueStart).to.equal(30);
    expect(el.valueEnd).to.equal(80);
    expect(changeSpy.calledTwice).to.be.true;
    expect(inputSpy.callCount).to.be.equal(4);
    expect(changeSpy.calledWith(new CustomEvent('forge-slider-range-input', { detail: { valueStart: 25, valueEnd: 67 } }))).to.be.true;
    expect(changeSpy.calledWith(new CustomEvent('forge-slider-range-input', { detail: { valueStart: 30, valueEnd: 67 } }))).to.be.true;
    expect(inputSpy.calledWith(new CustomEvent('forge-slider-range-input', { detail: { valueStart: 30, valueEnd: 75 } }))).to.be.true;
    expect(inputSpy.calledWith(new CustomEvent('forge-slider-range-input', { detail: { valueStart: 30, valueEnd: 80 } }))).to.be.true;
    expect(changeSpy.calledWith(new CustomEvent('forge-slider-range-change', { detail: { valueStart: 30, valueEnd: 67 } }))).to.be.true;
    expect(changeSpy.calledWith(new CustomEvent('forge-slider-range-change', { detail: { valueStart: 30, valueEnd: 80 } }))).to.be.true;
  });

  it('should show label when hovering end input', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider></forge-slider>`);
    const ctx = new SliderHarness(el);

    ctx.simulateEndEnter();
    await elementUpdated(el);

    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.true;
    expect(ctx.endHandleElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.true;
  });

  it('should return form element and name', async () => {
    const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

    const slider = document.createElement('forge-slider');
    slider.setAttribute('name', 'test-slider');
    form.appendChild(slider);

    expect(slider.form).to.equal(form);
    expect(slider.name).to.equal('test-slider');
    expect(slider.labels).to.be.empty;

    slider.name = 'new-name';
    expect(slider.name).to.equal('new-name');

    slider.name = null as any;
    expect(slider.name).to.be.empty;
  });

  it('should return associated form labels', async () => {
    const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

    const slider = document.createElement('forge-slider');
    slider.setAttribute('id', 'test-slider');
    form.appendChild(slider);

    const labelText = 'Test Label';
    const label = document.createElement('label');
    label.setAttribute('for', 'test-slider');
    label.textContent = labelText;
    form.appendChild(label);

    expect(slider.labels.length).to.equal(1);
    expect(slider.labels[0].textContent).to.equal(labelText);
  });

  it('should set form value when value is set', async () => {
    const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

    const slider = document.createElement('forge-slider');
    slider.setAttribute('name', 'test-slider');
    form.appendChild(slider);

    let formData = new FormData(form);
    expect(formData.get('test-slider')).to.equal('50');

    slider.value = 10;
    formData = new FormData(form);
    expect(formData.get('test-slider')).to.equal('10');
  });

  it('should set form value when value is set with range', async () => {
    const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

    const slider = document.createElement('forge-slider');
    slider.range = true;
    slider.setAttribute('name-start', 'test-slider-start');
    slider.setAttribute('name-end', 'test-slider-end');
    form.appendChild(slider);

    let formData = new FormData(form);
    expect(slider.nameStart).to.equal('test-slider-start');
    expect(slider.nameEnd).to.equal('test-slider-end');
    expect(formData.get('test-slider-start')).to.equal('33');
    expect(formData.get('test-slider-end')).to.equal('67');

    slider.valueStart = 10;
    slider.valueEnd = 90;
    formData = new FormData(form);

    expect(formData.get('test-slider-start')).to.equal('10');
    expect(formData.get('test-slider-end')).to.equal('90');
  });

  it('should set form value with name when value is set with range without individual start and end names', async () => {
    const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

    const slider = document.createElement('forge-slider');
    slider.range = true;
    slider.setAttribute('name', 'test-slider');
    form.appendChild(slider);

    let formData = new FormData(form);
    expect(formData.getAll('test-slider')).to.deep.equal(['33', '67']);

    slider.valueStart = 10;
    slider.valueEnd = 90;
    formData = new FormData(form);

    expect(formData.getAll('test-slider')).to.deep.equal(['10', '90']);
  });

  it('should reset value when form is reset', async () => {
    const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

    const slider = document.createElement('forge-slider');
    slider.setAttribute('name', 'test-slider');
    form.appendChild(slider);

    slider.value = 10;
    let formData = new FormData(form);
    expect(formData.get('test-slider')).to.equal('10');

    form.reset();
    formData = new FormData(form);

    expect(slider.value).to.equal(50);
    expect(formData.get('test-slider')).to.equal('50');
  });

  it('should reset value when form is reset with range', async () => {
    const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

    const slider = document.createElement('forge-slider');
    slider.range = true;
    slider.nameStart = 'test-slider-start';
    slider.nameEnd = 'test-slider-end';
    slider.setAttribute('value-start', '40');
    slider.setAttribute('value-end', '60');
    form.appendChild(slider);

    slider.valueStart = 10;
    slider.valueEnd = 90;

    let formData = new FormData(form);
    expect(formData.get('test-slider-start')).to.equal('10');
    expect(formData.get('test-slider-end')).to.equal('90');

    form.reset();
    formData = new FormData(form);

    expect(slider.valueStart).to.equal(40);
    expect(slider.valueEnd).to.equal(60);
    expect(formData.get('test-slider-start')).to.equal('40');
    expect(formData.get('test-slider-end')).to.equal('60');
  });

  it('should restore form state', async () => {
    const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

    const slider = document.createElement('forge-slider');
    const setFormValueSpy = spy(slider[internals], 'setFormValue');
    slider.name = 'test-slider';
    slider.setAttribute('value', '75');
    form.appendChild(slider);

    const [value, state] = setFormValueSpy.args ?? [null, null];
    const newSlider = document.createElement('forge-slider');
    slider.remove();
    form.appendChild(newSlider);

    let restoreState: any = state ?? value;
    if (restoreState instanceof FormData) {
      restoreState = Array.from((restoreState as any).entries());
    }

    (newSlider as any).formStateRestoreCallback(restoreState, 'restore');

    expect(slider.value).to.equal(75);
  });

  it('should restore form state with range', async () => {
    const form = await fixture<HTMLFormElement>(html`<form name="test-form"></form>`);

    const slider = document.createElement('forge-slider');
    const setFormValueSpy = spy(slider[internals], 'setFormValue');
    slider.range = true;
    slider.nameStart = 'test-slider-start';
    slider.nameEnd = 'test-slider-end';
    slider.setAttribute('value-start', '40');
    slider.setAttribute('value', '60');
    form.appendChild(slider);

    const [value, state] = setFormValueSpy.args ?? [null, null];
    const newSlider = document.createElement('forge-slider');
    slider.remove();
    form.appendChild(newSlider);

    let restoreState: any = state ?? value;
    if (restoreState instanceof FormData) {
      restoreState = Array.from(restoreState.entries());
    }

    (newSlider as any).formStateRestoreCallback(restoreState, 'restore');

    expect(slider.valueStart).to.equal(40);
    expect(slider.value).to.equal(60);
  });

  it('should hover end handle', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider></forge-slider>`);
    const ctx = new SliderHarness(el);

    await ctx.simulateEndEnter();
    await elementUpdated(el);

    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.true;
    expect(ctx.endHandleElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.true;
  });

  it('should hover start handle', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider range></forge-slider>`);
    const ctx = new SliderHarness(el);

    await ctx.simulateStartEnter();
    await elementUpdated(el);

    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.true;
    expect(ctx.startHandleElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.true;
  });

  it('should not set end hover if moving mouse over input when not focused', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider></forge-slider>`);
    const ctx = new SliderHarness(el);

    await ctx.simulateEndEnter();
    await elementUpdated(el);
    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.true;
    expect(ctx.endHandleElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.true;

    await ctx.simulateEndMove(1);
    await elementUpdated(el);
    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.false;
    expect(ctx.endHandleElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.false;
  });

  it('should not set start hover if moving mouse over input when not focused', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider range></forge-slider>`);
    const ctx = new SliderHarness(el);

    await ctx.simulateStartEnter();
    await elementUpdated(el);
    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.true;
    expect(ctx.startHandleElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.true;

    await ctx.simulateStartMove(1);
    await elementUpdated(el);
    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.false;
    expect(ctx.startHandleElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.false;
  });

  it('should toggle to range mode dynamically', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider></forge-slider>`);
    const ctx = new SliderHarness(el);

    await elementUpdated(el);
    el.range = true;
    await elementUpdated(el);
    ctx.invalidate();

    expect(el.range).to.be.true;
    expect(ctx.startInputElement).to.be.ok;
    expect(ctx.startHandleElement).to.be.ok;
    expect(ctx.startStateLayer).to.be.ok;
    expect(ctx.startInputElement.valueAsNumber).to.equal(33);
    expect(ctx.startInputElement.getAttribute('aria-valuetext')).to.equal('33');
    expect(ctx.startLabelContentElement.textContent).to.equal('33');
    expect(ctx.startInputElement.min).to.equal(String(ctx.element.min));
    expect(ctx.startInputElement.max).to.equal(String(ctx.element.max));
    expect(ctx.startInputElement.step).to.equal(String(ctx.element.step));
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).to.equal('0.33');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).to.equal('0.67');
    expect(ctx.endInputElement.valueAsNumber).to.equal(67);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).to.equal('67');
    expect(ctx.endLabelContentElement.textContent).to.equal('67');
  });

  it('should toggle from range mode dynamically', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider range></forge-slider>`);
    const ctx = new SliderHarness(el);

    await elementUpdated(el);
    el.range = false;
    await elementUpdated(el);
    ctx.invalidate();

    expect(el.range).to.be.false;
    expect(ctx.startInputElement).not.to.be.ok;
    expect(ctx.startHandleElement).not.to.be.ok;
    expect(ctx.startStateLayer).not.to.be.ok;
    expect(ctx.startLabelContentElement).not.to.ok;
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).to.equal('0');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).to.equal('0.5');
    expect(ctx.endInputElement.valueAsNumber).to.equal(50);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).to.equal('50');
    expect(ctx.endLabelContentElement.textContent).to.equal('50');
  });

  it('should inherit min, max, and step when toggling to range mode dynamically while rendering within range bounds', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider min="40" max="60" step="2"></forge-slider>`);
    const ctx = new SliderHarness(el);

    await elementUpdated(el);
    el.range = true;
    await elementUpdated(el);
    ctx.invalidate();

    expect(ctx.startInputElement.valueAsNumber).to.equal(40);
    expect(ctx.startInputElement.getAttribute('aria-valuetext')).to.equal('40');
    expect(ctx.startLabelContentElement.textContent).to.equal('40');
    expect(ctx.startInputElement.min).to.equal('40');
    expect(ctx.startInputElement.max).to.equal('60');
    expect(ctx.startInputElement.step).to.equal('2');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).to.equal('0');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).to.equal('1');
    expect(ctx.endInputElement.valueAsNumber).to.equal(60);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).to.equal('60');
    expect(ctx.endLabelContentElement.textContent).to.equal('60');
  });

  it('should instantiate start handle ripple when toggling to range mode dynamically', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider></forge-slider>`);
    const ctx = new SliderHarness(el);

    await ctx.simulateEndEnter();
    await ctx.simulateEndLeave();
    el.range = true;
    ctx.invalidate();

    expect(ctx.startStateLayer).to.be.ok;
  });

  it('should destroy start handle ripple when toggling from range mode dynamically', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider range></forge-slider>`);
    const ctx = new SliderHarness(el);

    await ctx.simulateEndEnter();
    await ctx.simulateEndLeave();

    expect(ctx.startStateLayer).to.be.ok;

    el.range = false;
    ctx.invalidate();

    expect(ctx.startStateLayer).not.to.be.ok;
  });

  it('should toggle labeled dynamically', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider></forge-slider>`);
    const ctx = new SliderHarness(el);

    el.labeled = false;
    await elementUpdated(el);
    ctx.invalidate();

    expect(el.labeled).to.be.false;
    expect(ctx.endLabelContentElement).to.be.null;
  });

  it('should toggle labeled dynamically in range mode', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider range></forge-slider>`);
    const ctx = new SliderHarness(el);

    el.labeled = false;
    ctx.invalidate();

    expect(el.labeled).to.be.false;
    expect(ctx.endLabelContentElement).to.be.null;
    expect(ctx.startLabelContentElement).to.be.null;
  });

  it('should create labels dynamically in range mode', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider range labeled="false"></forge-slider>`);
    const ctx = new SliderHarness(el);

    await elementUpdated(el);
    expect(ctx.endLabelContentElement).not.to.be.ok;
    expect(ctx.startLabelContentElement).not.to.be.ok;

    el.labeled = true;
    await elementUpdated(el);
    ctx.invalidate();

    expect(el.labeled).to.be.true;
    expect(ctx.endLabelContentElement).to.be.ok;
    expect(ctx.startLabelContentElement).to.be.ok;
  });

  it('should initialize and activate start handle ripple when focused in range mode', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider range></forge-slider>`);
    const ctx = new SliderHarness(el);

    await ctx.focusStart();
    await elementUpdated(el);

    expect(ctx.endStateLayer).to.be.ok;
    // expect(ctx.endRippleActive).to.be.false;
    expect(ctx.startStateLayer).to.be.ok;
    // expect(ctx.startRippleActive).to.be.true;
  });

  it('should call labelBuilder', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider></forge-slider>`);
    const ctx = new SliderHarness(el);

    const labelBuilderSpy = spy((value: number) => `Value: ${value}`);
    el.labelBuilder = labelBuilderSpy;
    await elementUpdated(el);

    expect(ctx.endLabelContentElement.textContent).to.equal('Value: 50');
    expect(labelBuilderSpy).to.have.been.calledOnceWith(50);

    await ctx.simulateEndInteraction('change', 10);

    expect(ctx.endLabelContentElement.textContent).to.equal('Value: 10');
    expect(labelBuilderSpy).to.have.been.calledTwice;
    expect(labelBuilderSpy).to.have.been.calledWith(10);
  });

  it('should set label via property', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider label="Test"></forge-slider>`);
    const ctx = new SliderHarness(el);

    expect(ctx.endLabelContentElement.textContent).to.equal('Test');

    await ctx.simulateEndInteraction('change', 10);
    el.label = 'Test: 10';

    expect(ctx.endLabelContentElement.textContent).to.equal('Test: 10');
  });

  describe('in range mode', () => {
    it('should add border when thumbs overlap', async () => {
      const el = await fixture<ISliderComponent>(html`<forge-slider range value-start="50" value-end="50"></forge-slider>`);
      const ctx = new SliderHarness(el);

      expect(ctx.startHandleElement.classList.contains(SLIDER_CONSTANTS.classes.OVERLAPPING)).to.be.true;
      expect(ctx.endHandleElement.classList.contains(SLIDER_CONSTANTS.classes.OVERLAPPING)).to.be.true;
    });

    it('should clamp end value to start', async () => {
      const el = await fixture<ISliderComponent>(html`<forge-slider range></forge-slider>`);
      const ctx = new SliderHarness(el);

      await ctx.simulateEndInteraction('change', 10); // Default for start handle is 33
      await elementUpdated(el);

      expect(el.valueStart).to.equal(33);
      expect(el.valueEnd).to.equal(33);
      expect(ctx.startInputElement.valueAsNumber).to.equal(33);
      expect(ctx.endInputElement.valueAsNumber).to.equal(33);
      expect(ctx.startLabelContentElement.textContent).to.equal('33');
      expect(ctx.endLabelContentElement.textContent).to.equal('33');
    });

    it('should clamp start value to end', async () => {
      const el = await fixture<ISliderComponent>(html`<forge-slider range></forge-slider>`);
      const ctx = new SliderHarness(el);

      await ctx.simulateStartInteraction('change', 90); // Default for end handle is 67
      await elementUpdated(el);

      expect(el.valueStart).to.equal(67);
      expect(el.valueEnd).to.equal(67);
      expect(ctx.startInputElement.valueAsNumber).to.equal(67);
      expect(ctx.endInputElement.valueAsNumber).to.equal(67);
      expect(ctx.startLabelContentElement.textContent).to.equal('67');
      expect(ctx.endLabelContentElement.textContent).to.equal('67');
    });

    it('should call labelBuilder', async () => {
      const el = await fixture<ISliderComponent>(html`<forge-slider range></forge-slider>`);
      const ctx = new SliderHarness(el);

      const labelBuilderSpy = spy((value: number) => `Value: ${value}`);
      el.labelBuilder = labelBuilderSpy;
      await elementUpdated(el);

      expect(el.labelBuilder).to.equal(labelBuilderSpy);
      expect(ctx.startLabelContentElement.textContent).to.equal('Value: 33');
      expect(ctx.endLabelContentElement.textContent).to.equal('Value: 67');
      expect(labelBuilderSpy).to.have.been.calledTwice;
      expect(labelBuilderSpy).to.have.been.calledWith(33);
      expect(labelBuilderSpy).to.have.been.calledWith(67);

      await ctx.simulateStartInteraction('change', 10);
      await ctx.simulateEndInteraction('change', 90);

      expect(ctx.startLabelContentElement.textContent).to.equal('Value: 10');
      expect(ctx.endLabelContentElement.textContent).to.equal('Value: 90');
      expect(labelBuilderSpy.callCount).to.equal(6);
      expect(labelBuilderSpy).to.have.been.calledWith(10);
      expect(labelBuilderSpy).to.have.been.calledWith(90);
    });

    it('should set labels via property', async () => {
      const el = await fixture<ISliderComponent>(html`<forge-slider range label-start="Test start" label-end="Test end"></forge-slider>`);
      const ctx = new SliderHarness(el);

      expect(ctx.startLabelContentElement.textContent).to.equal('Test start');
      expect(ctx.endLabelContentElement.textContent).to.equal('Test end');

      await ctx.simulateStartInteraction('change', 10);
      await ctx.simulateEndInteraction('change', 90);
      el.labelStart = 'Test: 10';
      el.labelEnd = 'Test: 90';

      expect(ctx.startLabelContentElement.textContent).to.equal('Test: 10');
      expect(ctx.endLabelContentElement.textContent).to.equal('Test: 90');
    });
  });

  describe('when disabled', () => {
    it('should be accessible', async () => {
      const el = await fixture(html`<forge-slider disabled data-aria-label="Choose value"></forge-slider>`);
      await expect(el).to.be.accessible();
    });

    it('should not change value when clicking on input', async () => {
      const el = await fixture<ISliderComponent>(html`<forge-slider disabled></forge-slider>`);
      const ctx = new SliderHarness(el);
      const changeSpy = spy();
      const inputSpy = spy();
      el.addEventListener('forge-slider-change', changeSpy);
      el.addEventListener('forge-slider-input', inputSpy);

      await ctx.simulateEndInteraction('change', 25);

      expect(el.value).to.equal(50);
      expect(changeSpy.called).to.be.false;
      expect(inputSpy.called).to.be.false;
    });
  });

  describe('when readonly', () => {
    it('should not change value when clicking on input in range mode', async () => {
      const el = await fixture<ISliderComponent>(html`<forge-slider readonly range></forge-slider>`);
      const ctx = new SliderHarness(el);
      const changeSpy = spy();
      const inputSpy = spy();
      el.addEventListener('forge-slider-change', changeSpy);
      el.addEventListener('forge-slider-input', inputSpy);

      await ctx.simulateStartInteraction('change', 10);
      await ctx.simulateEndInteraction('change', 90);

      expect(el.value).to.equal(50);
      expect(el.valueStart).to.equal(33);
      expect(el.valueEnd).to.equal(67);
      expect(changeSpy.called).to.be.false;
      expect(inputSpy.called).to.be.false;
    });
  });
});

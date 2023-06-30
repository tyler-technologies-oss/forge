import { sendKeys } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import { getShadowElement } from '@tylertech/forge-core';
import { FixtureContext } from '../../test/utils/fixture-context';
import { ISliderComponent } from '../slider';
import { SLIDER_CONSTANTS } from './slider-constants';

import './slider';

class SliderFixtureContext extends FixtureContext<ISliderComponent> {
  public rootElement: HTMLElement;
  public trackElement: HTMLElement;
  public handleContainerElement: HTMLElement;
  public endInputElement: HTMLInputElement;
  public endHandleElement: HTMLElement;
  public endHandleThumbElement: HTMLElement;
  public endLabelElement: HTMLElement;
  public endLabelContentElement: HTMLElement;
  public startInputElement: HTMLInputElement;
  public startHandleElement: HTMLElement;
  public startHandleThumbElement: HTMLElement;
  public startLabelElement: HTMLElement;
  public startLabelContentElement: HTMLElement;

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
    this.startInputElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_INPUT) as HTMLInputElement;
    this.startHandleElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_HANDLE);
    this.startHandleThumbElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_HANDLE_THUMB);
    this.startLabelElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_LABEL);
    this.startLabelContentElement = getShadowElement(this.element, SLIDER_CONSTANTS.selectors.START_LABEL_CONTENT);
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

  public simulateEndInteraction(type: 'input' | 'change', value: number): void {
    this.endInputElement.focus();
    this.endInputElement.valueAsNumber = value;
    this.endInputElement.dispatchEvent(new InputEvent(type, { bubbles: true, composed: true }));
  }

  public simulateStartInteraction(type: 'input' | 'change', value: number): void {
    this.endInputElement.focus();
    this.startInputElement.valueAsNumber = value;
    this.startInputElement.dispatchEvent(new InputEvent(type, { bubbles: true, composed: true }));
  }

  public simulateEndHover(): void {
    let { x, y, width, height } = this.endHandleThumbElement.getBoundingClientRect();
    x = x + (width / 2);
    y = y + (height / 2);
    this.endInputElement.dispatchEvent(new PointerEvent('pointerenter', { clientX: x, clientY: y, screenX: x, screenY: y }));
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
    const ctx = new SliderFixtureContext(el);

    expect(el).not.to.be.accessible();
    expect(el.value).to.equal(50);
    expect(el.min).to.equal(0);
    expect(el.max).to.equal(100);
    expect(el.step).to.equal(1);
    expect(el.disabled).to.be.false;
    expect(el.readonly).to.be.false;
    expect(el.labeled).to.be.true;
    expect(el.range).to.be.false;
    expect(ctx.rootElement.style.getPropertyValue('--_end-fraction')).to.equal('0.5');
    expect(ctx.rootElement.style.getPropertyValue('--_start-fraction')).to.equal('0');
    expect(ctx.rootElement.style.getPropertyValue('--_tick-count')).to.equal('100');
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
    const ctx = new SliderFixtureContext(el);

    expect(el.value).to.equal(75);
    expect(ctx.rootElement.style.getPropertyValue('--_end-fraction')).to.equal('0.75');
    expect(ctx.endInputElement.valueAsNumber).to.equal(75);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).to.equal('75');
    expect(ctx.endLabelContentElement.textContent).to.equal('75');
  });

  it('should accept min', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider min="25"></forge-slider>`);
    const ctx = new SliderFixtureContext(el);

    expect(el.min).to.equal(25);
    expect(ctx.endInputElement.min).to.equal('25');
  });

  it('should accept max', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider max="75"></forge-slider>`);
    const ctx = new SliderFixtureContext(el);

    expect(el.max).to.equal(75);
    expect(ctx.endInputElement.max).to.equal('75');
  });

  it('should accept value below min, but render within range', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider value="-100"></forge-slider>`);
    const ctx = new SliderFixtureContext(el);

    expect(el.value).to.equal(-100);
    expect(ctx.rootElement.style.getPropertyValue('--_end-fraction')).to.equal('0');
    expect(ctx.endInputElement.valueAsNumber).to.equal(0);
  });

  it('should accept value above max, but render within range', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider value="500"></forge-slider>`);
    const ctx = new SliderFixtureContext(el);

    expect(el.value).to.equal(500);
    expect(ctx.rootElement.style.getPropertyValue('--_end-fraction')).to.equal('1');
    expect(ctx.endInputElement.valueAsNumber).to.equal(100);
  });

  it('should accept step', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider step="10"></forge-slider>`);
    const ctx = new SliderFixtureContext(el);

    expect(el.step).to.equal(10);
    expect(ctx.endInputElement.step).to.equal('10');
    expect(ctx.endInputElement.step).to.equal('10');
    expect(ctx.rootElement.style.getPropertyValue('--_tick-count')).to.equal('10');
  });

  it('should show tickmarks', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider tickmarks></forge-slider>`);
    const ctx = new SliderFixtureContext(el);

    expect(el.tickmarks).to.be.true;
    expect(ctx.trackElement.classList.contains(SLIDER_CONSTANTS.classes.TICKMARKS)).to.be.true;
  });

  it('should accept disabled', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider disabled></forge-slider>`);
    const ctx = new SliderFixtureContext(el);

    expect(el.disabled).to.be.true;
    expect(ctx.endInputElement.disabled).to.be.true;
  });

  it('should accept readonly', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider readonly></forge-slider>`);
    const ctx = new SliderFixtureContext(el);

    expect(el.readonly).to.be.true;
    expect(ctx.endInputElement.readOnly).to.be.true;
  });

  it('should accept labeled', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider labeled="false"></forge-slider>`);
    const ctx = new SliderFixtureContext(el);

    expect(el.labeled).to.be.false;
    expect(ctx.endLabelContentElement).to.be.null;
  });

  it('should accept range', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider range></forge-slider>`);
    const ctx = new SliderFixtureContext(el);

    expect(el.range).to.be.true;
    expect(ctx.startInputElement).not.to.be.null;
    expect(ctx.startInputElement.valueAsNumber).to.equal(33);
    expect(ctx.startInputElement.getAttribute('aria-valuetext')).to.equal('33');
    expect(ctx.startInputElement.min).to.equal('0');
    expect(ctx.startInputElement.max).to.equal('100');
    expect(ctx.startInputElement.step).to.equal('1');
    expect(ctx.startLabelContentElement.textContent).to.equal('33');
    expect(ctx.rootElement.style.getPropertyValue('--_start-fraction')).to.equal('0.33');
    expect(ctx.rootElement.style.getPropertyValue('--_end-fraction')).to.equal('0.67');
    expect(ctx.endInputElement.valueAsNumber).to.equal(67);
  });

  it('should update range dynamically', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider></forge-slider>`);
    const ctx = new SliderFixtureContext(el);

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
    expect(ctx.rootElement.style.getPropertyValue('--_start-fraction')).to.equal('0.33');
    expect(ctx.rootElement.style.getPropertyValue('--_end-fraction')).to.equal('0.67');
    expect(ctx.endInputElement.valueAsNumber).to.equal(67);
  });

  it('should decrease value when left arrow key pressed', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider data-aria-label="Choose value"></forge-slider>`);
    const ctx = new SliderFixtureContext(el);
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
    const ctx = new SliderFixtureContext(el);
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
    expect(inputSpy.calledOnceWith(new CustomEvent('forge-slider-input', { detail: 51 }))).to.be.true;
    expect(changeSpy.calledOnceWith(new CustomEvent('forge-slider-change', { detail: 51 }))).to.be.true;
  });

  it('should change value when clicking on input', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider data-aria-label="Choose value"></forge-slider>`);
    const ctx = new SliderFixtureContext(el);
    const changeSpy = spy();
    const inputSpy = spy();
    el.addEventListener('forge-slider-change', changeSpy);
    el.addEventListener('forge-slider-input', inputSpy);

    ctx.simulateEndInteraction('change', 33);

    await expect(el).to.be.accessible();
    expect(el.value).to.equal(33);
    expect(changeSpy.calledOnceWith(new CustomEvent('forge-slider-input', { detail: 33 }))).to.be.true;
    expect(inputSpy.called).to.be.false;
  });

  it('should change value when clicking on input with range', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider data-aria-label-start="Choose start value" data-aria-label-end="Choose end value" range></forge-slider>`);
    const ctx = new SliderFixtureContext(el);
    const changeSpy = spy();
    const inputSpy = spy();
    el.addEventListener('forge-slider-change', changeSpy);
    el.addEventListener('forge-slider-input', inputSpy);

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
    expect(changeSpy.calledWith(new CustomEvent('forge-slider-input', { detail: { valueStart: 25, valueEnd: 67 }}))).to.be.true;
    expect(changeSpy.calledWith(new CustomEvent('forge-slider-input', { detail: { valueStart: 30, valueEnd: 67 }}))).to.be.true;
    expect(inputSpy.calledWith(new CustomEvent('forge-slider-input', { detail: { valueStart: 30, valueEnd: 75 }}))).to.be.true;
    expect(inputSpy.calledWith(new CustomEvent('forge-slider-input', { detail: { valueStart: 30, valueEnd: 80 }}))).to.be.true;
    expect(changeSpy.calledWith(new CustomEvent('forge-slider-change', { detail: { valueStart: 30, valueEnd: 67 }}))).to.be.true;
    expect(changeSpy.calledWith(new CustomEvent('forge-slider-change', { detail: { valueStart: 30, valueEnd: 80 }}))).to.be.true;
  });

  it('should show label when hovering end input', async () => {
    const el = await fixture<ISliderComponent>(html`<forge-slider></forge-slider>`);
    const ctx = new SliderFixtureContext(el);

    ctx.simulateEndHover();

    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.true;
    expect(ctx.endHandleThumbElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).to.be.true;
    expect(getComputedStyle(ctx.endLabelElement).transform).to.equal('scale(1)');
  });

  // it('should return form element and name', async () => {
  //   const el = await fixture<HTMLFormElement>(html`<form><forge-slider name="test-slider"></forge-slider></form>`);
  //   const slider = el.querySelector<ISliderComponent>('forge-slider') as ISliderComponent;

  //   expect(slider.form).to.equal(el);
  //   expect(slider.name).to.equal('test-slider');
  // });
});

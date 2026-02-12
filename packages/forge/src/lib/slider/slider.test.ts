import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { SliderComponent } from './slider.js';
import { SLIDER_CONSTANTS } from './slider-constants.js';
import type { IStateLayerComponent } from '../state-layer/state-layer.js';
import { internals } from '../constants.js';
import { frame } from '../core/utils/utils.js';

import './slider.js';

class SliderHarness {
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

  constructor(public element: SliderComponent) {
    this.initElementRefs();
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

  public invalidate(): void {
    this.initElementRefs();
  }

  public focusStart(): void {
    this.startInputElement.focus();
  }

  public focusEnd(): void {
    this.endInputElement.focus();
  }

  public async pressArrowKey(key: 'ArrowLeft' | 'ArrowRight'): Promise<void> {
    await userEvent.keyboard(`{${key}}`);
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

async function createFixture(template = html`<forge-slider></forge-slider>`): Promise<{ el: SliderComponent; ctx: SliderHarness }> {
  const screen = render(template);
  const el = screen.container.querySelector('forge-slider') as SliderComponent;
  const ctx = new SliderHarness(el);
  return { el, ctx };
}

describe('Slider', () => {
  it('should contain shadow root', async () => {
    const { el } = await createFixture();
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const { el } = await createFixture(html`<forge-slider data-aria-label="Choose value"></forge-slider>`);
    await expect(el).toBeAccessible();
  });

  it('should be accessible with range', async () => {
    const { el } = await createFixture(
      html`<forge-slider range data-aria-label-start="Choose start value" data-aria-label-end="Choose end value"></forge-slider>`
    );
    await expect(el).toBeAccessible();
  });

  it('should render with correct default values', async () => {
    const { el, ctx } = await createFixture();

    await expect(el).not.toBeAccessible();
    expect(el.value).toBe(50);
    expect(el.min).toBe(0);
    expect(el.max).toBe(100);
    expect(el.step).toBe(1);
    expect(el.disabled).toBe(false);
    expect(el.readonly).toBe(false);
    expect(el.labeled).toBe(true);
    expect(el.range).toBe(false);
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).toBe('0.5');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).toBe('0');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-tick-count')).toBe('100');
    expect(ctx.endInputElement.valueAsNumber).toBe(50);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).toBe('50');
    expect(ctx.endInputElement.min).toBe('0');
    expect(ctx.endInputElement.max).toBe('100');
    expect(ctx.endInputElement.step).toBe('1');
    expect(ctx.startInputElement).toBeNull();
    expect(ctx.endLabelContentElement.textContent).toBe('50');
    expect(ctx.startLabelContentElement).toBeNull();
    expect(ctx.trackElement.classList.contains(SLIDER_CONSTANTS.classes.TICKMARKS)).toBe(false);
  });

  it('should accept value', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider value="75"></forge-slider>`);

    expect(el.value).toBe(75);
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).toBe('0.75');
    expect(ctx.endInputElement.valueAsNumber).toBe(75);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).toBe('75');
    expect(ctx.endLabelContentElement.textContent).toBe('75');
  });

  it('should accept min', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider min="25"></forge-slider>`);

    expect(el.min).toBe(25);
    expect(ctx.endInputElement.min).toBe('25');
  });

  it('should accept max', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider max="75"></forge-slider>`);

    expect(el.max).toBe(75);
    expect(ctx.endInputElement.max).toBe('75');
  });

  it('should accept value below min, but render within range', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider value="-100"></forge-slider>`);

    expect(el.value).toBe(-100);
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).toBe('0');
    expect(ctx.endInputElement.valueAsNumber).toBe(0);
  });

  it('should accept value above max, but render within range', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider value="500"></forge-slider>`);

    expect(el.value).toBe(500);
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).toBe('1');
    expect(ctx.endInputElement.valueAsNumber).toBe(100);
  });

  it('should accept valueEnd below min, but render within range in range mode', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider range value-start="-100" value-end="-100"></forge-slider>`);

    expect(el.valueStart).toBe(-100);
    expect(el.valueEnd).toBe(-100);
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).toBe('0');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).toBe('0');
    expect(ctx.startInputElement.valueAsNumber).toBe(0);
    expect(ctx.endInputElement.valueAsNumber).toBe(0);
  });

  it('should accept valueStart above max, but render within range in range mode', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider range value-start="500" value-end="500"></forge-slider>`);

    expect(el.valueStart).toBe(500);
    expect(el.valueEnd).toBe(500);
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).toBe('1');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).toBe('1');
    expect(ctx.startInputElement.valueAsNumber).toBe(100);
    expect(ctx.endInputElement.valueAsNumber).toBe(100);
  });

  it('should accept step', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider step="10"></forge-slider>`);

    expect(el.step).toBe(10);
    expect(ctx.endInputElement.step).toBe('10');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-tick-count')).toBe('10');
  });

  it('should show tickmarks', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider tickmarks></forge-slider>`);

    expect(el.tickmarks).toBe(true);
    expect(ctx.trackElement.classList.contains(SLIDER_CONSTANTS.classes.TICKMARKS)).toBe(true);
  });

  it('should accept disabled', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider disabled></forge-slider>`);

    expect(el.disabled).toBe(true);
    expect(ctx.endInputElement.disabled).toBe(true);
    expect(ctx.endStateLayer.disabled).toBe(true);
  });

  it('should accepts disabled in range mode', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider range disabled></forge-slider>`);

    expect(el.disabled).toBe(true);
    expect(ctx.startInputElement.disabled).toBe(true);
    expect(ctx.endInputElement.disabled).toBe(true);
    expect(ctx.startStateLayer.disabled).toBe(true);
    expect(ctx.endStateLayer.disabled).toBe(true);
  });

  it('should accept readonly', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider readonly></forge-slider>`);

    expect(el.readonly).toBe(true);
    expect(ctx.endInputElement.readOnly).toBe(true);
  });

  it('should accept labeled', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider labeled="false"></forge-slider>`);

    expect(el.labeled).toBe(false);
    expect(ctx.endLabelContentElement).toBeNull();
  });

  it('should accept range', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider range></forge-slider>`);

    expect(el.range).toBe(true);
    expect(ctx.startInputElement).not.toBeNull();
    expect(ctx.startInputElement.valueAsNumber).toBe(33);
    expect(ctx.startInputElement.getAttribute('aria-valuetext')).toBe('33');
    expect(ctx.startInputElement.min).toBe('0');
    expect(ctx.startInputElement.max).toBe('100');
    expect(ctx.startInputElement.step).toBe('1');
    expect(ctx.startLabelContentElement.textContent).toBe('33');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).toBe('0.33');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).toBe('0.67');
    expect(ctx.endInputElement.valueAsNumber).toBe(67);
  });

  it('should update range dynamically', async () => {
    const { el, ctx } = await createFixture();

    el.range = true;
    await frame();
    ctx.invalidate();

    expect(el.range).toBe(true);
    expect(ctx.startInputElement).not.toBeNull();
    expect(ctx.startInputElement.valueAsNumber).toBe(33);
    expect(ctx.startInputElement.getAttribute('aria-valuetext')).toBe('33');
    expect(ctx.startInputElement.min).toBe('0');
    expect(ctx.startInputElement.max).toBe('100');
    expect(ctx.startInputElement.step).toBe('1');
    expect(ctx.startLabelContentElement.textContent).toBe('33');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).toBe('0.33');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).toBe('0.67');
    expect(ctx.endInputElement.valueAsNumber).toBe(67);
  });

  it('should decrease value when left arrow key pressed', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider data-aria-label="Choose value"></forge-slider>`);
    const inputSpy = vi.fn();
    const changeSpy = vi.fn();
    el.addEventListener('forge-slider-input', inputSpy);
    el.addEventListener('forge-slider-change', changeSpy);

    ctx.focusEnd();
    await ctx.pressArrowKey('ArrowLeft');

    await expect(el).toBeAccessible();
    expect(el.value).toBe(49);
    expect(ctx.endInputElement.valueAsNumber).toBe(49);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).toBe('49');
    expect(ctx.endLabelContentElement.textContent).toBe('49');
    expect(inputSpy).toHaveBeenCalledOnce();
    expect(changeSpy).toHaveBeenCalledOnce();
  });

  it('should increase value when right arrow key pressed', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider data-aria-label="Choose value"></forge-slider>`);
    const inputSpy = vi.fn();
    const changeSpy = vi.fn();
    el.addEventListener('forge-slider-input', inputSpy);
    el.addEventListener('forge-slider-change', changeSpy);

    ctx.focusEnd();
    await ctx.pressArrowKey('ArrowRight');

    await expect(el).toBeAccessible();
    expect(el.value).toBe(51);
    expect(ctx.endInputElement.valueAsNumber).toBe(51);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).toBe('51');
    expect(ctx.endLabelContentElement.textContent).toBe('51');
    expect(inputSpy).toHaveBeenCalledOnce();
    expect(changeSpy).toHaveBeenCalledOnce();
  });

  it('should change value when clicking on input', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider data-aria-label="Choose value"></forge-slider>`);
    const changeSpy = vi.fn();
    const inputSpy = vi.fn();
    el.addEventListener('forge-slider-change', changeSpy);
    el.addEventListener('forge-slider-input', inputSpy);

    ctx.simulateEndInteraction('change', 33);

    await expect(el).toBeAccessible();
    expect(el.value).toBe(33);
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(inputSpy).not.toHaveBeenCalled();
  });

  it('should change value when clicking on input with range', async () => {
    const { el, ctx } = await createFixture(
      html`<forge-slider data-aria-label-start="Choose start value" data-aria-label-end="Choose end value" range></forge-slider>`
    );
    const changeSpy = vi.fn();
    const inputSpy = vi.fn();
    el.addEventListener('forge-slider-range-change', changeSpy);
    el.addEventListener('forge-slider-range-input', inputSpy);

    ctx.simulateStartInteraction('input', 25);
    ctx.simulateStartInteraction('input', 30);
    ctx.simulateStartInteraction('change', 30);

    ctx.simulateEndInteraction('input', 75);
    ctx.simulateEndInteraction('input', 80);
    ctx.simulateEndInteraction('change', 80);

    await expect(el).toBeAccessible();
    expect(el.valueStart).toBe(30);
    expect(el.valueEnd).toBe(80);
    expect(changeSpy).toHaveBeenCalledTimes(2);
    expect(inputSpy).toHaveBeenCalledTimes(4);
  });

  it('should show label when hovering end input', async () => {
    const { ctx } = await createFixture();

    ctx.simulateEndEnter();
    await frame();

    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).toBe(true);
    expect(ctx.endHandleElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).toBe(true);
  });

  it('should return form element and name', async () => {
    const screen = render(html`<form name="test-form"></form>`);
    const form = screen.container.querySelector('form') as HTMLFormElement;

    const slider = document.createElement('forge-slider');
    slider.setAttribute('name', 'test-slider');
    form.appendChild(slider);

    expect(slider.form).toBe(form);
    expect(slider.name).toBe('test-slider');
    expect(slider.labels).toHaveLength(0);

    slider.name = 'new-name';
    expect(slider.name).toBe('new-name');

    slider.name = null as any;
    expect(slider.name).toBe('');
  });

  it('should return associated form labels', async () => {
    const screen = render(html`<form name="test-form"></form>`);
    const form = screen.container.querySelector('form') as HTMLFormElement;

    const slider = document.createElement('forge-slider');
    slider.setAttribute('id', 'test-slider');
    form.appendChild(slider);

    const labelText = 'Test Label';
    const label = document.createElement('label');
    label.setAttribute('for', 'test-slider');
    label.textContent = labelText;
    form.appendChild(label);

    expect(slider.labels.length).toBe(1);
    expect(slider.labels[0].textContent).toBe(labelText);
  });

  it('should set form value when value is set', async () => {
    const screen = render(html`<form name="test-form"></form>`);
    const form = screen.container.querySelector('form') as HTMLFormElement;

    const slider = document.createElement('forge-slider');
    slider.setAttribute('name', 'test-slider');
    form.appendChild(slider);

    let formData = new FormData(form);
    expect(formData.get('test-slider')).toBe('50');

    slider.value = 10;
    formData = new FormData(form);
    expect(formData.get('test-slider')).toBe('10');
  });

  it('should set form value when value is set with range', async () => {
    const screen = render(html`<form name="test-form"></form>`);
    const form = screen.container.querySelector('form') as HTMLFormElement;

    const slider = document.createElement('forge-slider');
    slider.range = true;
    slider.setAttribute('name-start', 'test-slider-start');
    slider.setAttribute('name-end', 'test-slider-end');
    form.appendChild(slider);

    let formData = new FormData(form);
    expect(slider.nameStart).toBe('test-slider-start');
    expect(slider.nameEnd).toBe('test-slider-end');
    expect(formData.get('test-slider-start')).toBe('33');
    expect(formData.get('test-slider-end')).toBe('67');

    slider.valueStart = 10;
    slider.valueEnd = 90;
    formData = new FormData(form);

    expect(formData.get('test-slider-start')).toBe('10');
    expect(formData.get('test-slider-end')).toBe('90');
  });

  it('should set form value with name when value is set with range without individual start and end names', async () => {
    const screen = render(html`<form name="test-form"></form>`);
    const form = screen.container.querySelector('form') as HTMLFormElement;

    const slider = document.createElement('forge-slider');
    slider.range = true;
    slider.setAttribute('name', 'test-slider');
    form.appendChild(slider);

    let formData = new FormData(form);
    expect(formData.getAll('test-slider')).toEqual(['33', '67']);

    slider.valueStart = 10;
    slider.valueEnd = 90;
    formData = new FormData(form);

    expect(formData.getAll('test-slider')).toEqual(['10', '90']);
  });

  it('should reset value when form is reset', async () => {
    const screen = render(html`<form name="test-form"></form>`);
    const form = screen.container.querySelector('form') as HTMLFormElement;

    const slider = document.createElement('forge-slider');
    slider.setAttribute('name', 'test-slider');
    form.appendChild(slider);

    slider.value = 10;
    let formData = new FormData(form);
    expect(formData.get('test-slider')).toBe('10');

    form.reset();
    formData = new FormData(form);

    expect(slider.value).toBe(50);
    expect(formData.get('test-slider')).toBe('50');
  });

  it('should reset value when form is reset with range', async () => {
    const screen = render(html`<form name="test-form"></form>`);
    const form = screen.container.querySelector('form') as HTMLFormElement;

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
    expect(formData.get('test-slider-start')).toBe('10');
    expect(formData.get('test-slider-end')).toBe('90');

    form.reset();
    formData = new FormData(form);

    expect(slider.valueStart).toBe(40);
    expect(slider.valueEnd).toBe(60);
    expect(formData.get('test-slider-start')).toBe('40');
    expect(formData.get('test-slider-end')).toBe('60');
  });

  it('should restore form state', async () => {
    const screen = render(html`<form name="test-form"></form>`);
    const form = screen.container.querySelector('form') as HTMLFormElement;

    const slider = document.createElement('forge-slider');
    const setFormValueSpy = vi.spyOn(slider[internals], 'setFormValue');
    slider.name = 'test-slider';
    slider.setAttribute('value', '75');
    form.appendChild(slider);

    const [value, state] = setFormValueSpy.mock.calls[0] ?? [null, null];
    const newSlider = document.createElement('forge-slider');
    slider.remove();
    form.appendChild(newSlider);

    let restoreState: any = state ?? value;
    if (restoreState instanceof FormData) {
      restoreState = Array.from((restoreState as any).entries());
    }

    (newSlider as any).formStateRestoreCallback(restoreState, 'restore');

    expect(slider.value).toBe(75);
  });

  it('should restore form state with range', async () => {
    const screen = render(html`<form name="test-form"></form>`);
    const form = screen.container.querySelector('form') as HTMLFormElement;

    const slider = document.createElement('forge-slider');
    const setFormValueSpy = vi.spyOn(slider[internals], 'setFormValue');
    slider.range = true;
    slider.nameStart = 'test-slider-start';
    slider.nameEnd = 'test-slider-end';
    slider.setAttribute('value-start', '40');
    slider.setAttribute('value', '60');
    form.appendChild(slider);

    const [value, state] = setFormValueSpy.mock.calls[0] ?? [null, null];
    const newSlider = document.createElement('forge-slider');
    slider.remove();
    form.appendChild(newSlider);

    let restoreState: any = state ?? value;
    if (restoreState instanceof FormData) {
      restoreState = Array.from(restoreState.entries());
    }

    (newSlider as any).formStateRestoreCallback(restoreState, 'restore');

    expect(slider.valueStart).toBe(40);
    expect(slider.value).toBe(60);
  });

  it('should hover end handle', async () => {
    const { ctx } = await createFixture();

    ctx.simulateEndEnter();
    await frame();

    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).toBe(true);
    expect(ctx.endHandleElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).toBe(true);
  });

  it('should hover start handle', async () => {
    const { ctx } = await createFixture(html`<forge-slider range></forge-slider>`);

    ctx.simulateStartEnter();
    await frame();

    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).toBe(true);
    expect(ctx.startHandleElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).toBe(true);
  });

  it('should not set end hover if moving mouse over input when not focused', async () => {
    const { ctx } = await createFixture();

    ctx.simulateEndEnter();
    await frame();
    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).toBe(true);
    expect(ctx.endHandleElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).toBe(true);

    ctx.simulateEndMove(1);
    await frame();
    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).toBe(false);
    expect(ctx.endHandleElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).toBe(false);
  });

  it('should not set start hover if moving mouse over input when not focused', async () => {
    const { ctx } = await createFixture(html`<forge-slider range></forge-slider>`);

    ctx.simulateStartEnter();
    await frame();
    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).toBe(true);
    expect(ctx.startHandleElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).toBe(true);

    ctx.simulateStartMove(1);
    await frame();
    expect(ctx.handleContainerElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).toBe(false);
    expect(ctx.startHandleElement.classList.contains(SLIDER_CONSTANTS.classes.HOVER)).toBe(false);
  });

  it('should toggle to range mode dynamically', async () => {
    const { el, ctx } = await createFixture();

    await frame();
    el.range = true;
    await frame();
    ctx.invalidate();

    expect(el.range).toBe(true);
    expect(ctx.startInputElement).toBeTruthy();
    expect(ctx.startHandleElement).toBeTruthy();
    expect(ctx.startStateLayer).toBeTruthy();
    expect(ctx.startInputElement.valueAsNumber).toBe(33);
    expect(ctx.startInputElement.getAttribute('aria-valuetext')).toBe('33');
    expect(ctx.startLabelContentElement.textContent).toBe('33');
    expect(ctx.startInputElement.min).toBe(String(ctx.element.min));
    expect(ctx.startInputElement.max).toBe(String(ctx.element.max));
    expect(ctx.startInputElement.step).toBe(String(ctx.element.step));
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).toBe('0.33');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).toBe('0.67');
    expect(ctx.endInputElement.valueAsNumber).toBe(67);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).toBe('67');
    expect(ctx.endLabelContentElement.textContent).toBe('67');
  });

  it('should toggle from range mode dynamically', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider range></forge-slider>`);

    await frame();
    el.range = false;
    await frame();
    ctx.invalidate();

    expect(el.range).toBe(false);
    expect(ctx.startInputElement).toBeFalsy();
    expect(ctx.startHandleElement).toBeFalsy();
    expect(ctx.startStateLayer).toBeFalsy();
    expect(ctx.startLabelContentElement).toBeFalsy();
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).toBe('0');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).toBe('0.5');
    expect(ctx.endInputElement.valueAsNumber).toBe(50);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).toBe('50');
    expect(ctx.endLabelContentElement.textContent).toBe('50');
  });

  it('should inherit min, max, and step when toggling to range mode dynamically while rendering within range bounds', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider min="40" max="60" step="2"></forge-slider>`);

    await frame();
    el.range = true;
    await frame();
    ctx.invalidate();

    expect(ctx.startInputElement.valueAsNumber).toBe(40);
    expect(ctx.startInputElement.getAttribute('aria-valuetext')).toBe('40');
    expect(ctx.startLabelContentElement.textContent).toBe('40');
    expect(ctx.startInputElement.min).toBe('40');
    expect(ctx.startInputElement.max).toBe('60');
    expect(ctx.startInputElement.step).toBe('2');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-start-fraction')).toBe('0');
    expect(ctx.rootElement.style.getPropertyValue('--_slider-end-fraction')).toBe('1');
    expect(ctx.endInputElement.valueAsNumber).toBe(60);
    expect(ctx.endInputElement.getAttribute('aria-valuetext')).toBe('60');
    expect(ctx.endLabelContentElement.textContent).toBe('60');
  });

  it('should instantiate start handle ripple when toggling to range mode dynamically', async () => {
    const { el, ctx } = await createFixture();

    ctx.simulateEndEnter();
    ctx.simulateEndLeave();
    el.range = true;
    ctx.invalidate();

    expect(ctx.startStateLayer).toBeTruthy();
  });

  it('should destroy start handle ripple when toggling from range mode dynamically', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider range></forge-slider>`);

    ctx.simulateEndEnter();
    ctx.simulateEndLeave();

    expect(ctx.startStateLayer).toBeTruthy();

    el.range = false;
    ctx.invalidate();

    expect(ctx.startStateLayer).toBeFalsy();
  });

  it('should toggle labeled dynamically', async () => {
    const { el, ctx } = await createFixture();

    el.labeled = false;
    await frame();
    ctx.invalidate();

    expect(el.labeled).toBe(false);
    expect(ctx.endLabelContentElement).toBeNull();
  });

  it('should toggle labeled dynamically in range mode', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider range></forge-slider>`);

    el.labeled = false;
    ctx.invalidate();

    expect(el.labeled).toBe(false);
    expect(ctx.endLabelContentElement).toBeNull();
    expect(ctx.startLabelContentElement).toBeNull();
  });

  it('should create labels dynamically in range mode', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider range labeled="false"></forge-slider>`);

    await frame();
    expect(ctx.endLabelContentElement).toBeFalsy();
    expect(ctx.startLabelContentElement).toBeFalsy();

    el.labeled = true;
    await frame();
    ctx.invalidate();

    expect(el.labeled).toBe(true);
    expect(ctx.endLabelContentElement).toBeTruthy();
    expect(ctx.startLabelContentElement).toBeTruthy();
  });

  it('should initialize and activate start handle ripple when focused in range mode', async () => {
    const { ctx } = await createFixture(html`<forge-slider range></forge-slider>`);

    ctx.focusStart();
    await frame();

    expect(ctx.endStateLayer).toBeTruthy();
    expect(ctx.startStateLayer).toBeTruthy();
  });

  it('should call labelBuilder', async () => {
    const { el, ctx } = await createFixture();

    const labelBuilderSpy = vi.fn((value: number) => `Value: ${value}`);
    el.labelBuilder = labelBuilderSpy;
    await frame();

    expect(ctx.endLabelContentElement.textContent).toBe('Value: 50');
    expect(labelBuilderSpy).toHaveBeenCalledWith(50);

    ctx.simulateEndInteraction('change', 10);

    expect(ctx.endLabelContentElement.textContent).toBe('Value: 10');
    expect(labelBuilderSpy).toHaveBeenCalledTimes(2);
    expect(labelBuilderSpy).toHaveBeenCalledWith(10);
  });

  it('should set label via property', async () => {
    const { el, ctx } = await createFixture(html`<forge-slider label="Test"></forge-slider>`);

    expect(ctx.endLabelContentElement.textContent).toBe('Test');

    ctx.simulateEndInteraction('change', 10);
    el.label = 'Test: 10';

    expect(ctx.endLabelContentElement.textContent).toBe('Test: 10');
  });

  describe('in range mode', () => {
    it('should add border when thumbs overlap', async () => {
      const { ctx } = await createFixture(html`<forge-slider range value-start="50" value-end="50"></forge-slider>`);

      expect(ctx.startHandleElement.classList.contains(SLIDER_CONSTANTS.classes.OVERLAPPING)).toBe(true);
      expect(ctx.endHandleElement.classList.contains(SLIDER_CONSTANTS.classes.OVERLAPPING)).toBe(true);
    });

    it('should clamp end value to start', async () => {
      const { el, ctx } = await createFixture(html`<forge-slider range></forge-slider>`);

      ctx.simulateEndInteraction('change', 10); // Default for start handle is 33
      await frame();

      expect(el.valueStart).toBe(33);
      expect(el.valueEnd).toBe(33);
      expect(ctx.startInputElement.valueAsNumber).toBe(33);
      expect(ctx.endInputElement.valueAsNumber).toBe(33);
      expect(ctx.startLabelContentElement.textContent).toBe('33');
      expect(ctx.endLabelContentElement.textContent).toBe('33');
    });

    it('should clamp start value to end', async () => {
      const { el, ctx } = await createFixture(html`<forge-slider range></forge-slider>`);

      ctx.simulateStartInteraction('change', 90); // Default for end handle is 67
      await frame();

      expect(el.valueStart).toBe(67);
      expect(el.valueEnd).toBe(67);
      expect(ctx.startInputElement.valueAsNumber).toBe(67);
      expect(ctx.endInputElement.valueAsNumber).toBe(67);
      expect(ctx.startLabelContentElement.textContent).toBe('67');
      expect(ctx.endLabelContentElement.textContent).toBe('67');
    });

    it('should call labelBuilder', async () => {
      const { el, ctx } = await createFixture(html`<forge-slider range></forge-slider>`);

      const labelBuilderSpy = vi.fn((value: number) => `Value: ${value}`);
      el.labelBuilder = labelBuilderSpy;
      await frame();

      expect(el.labelBuilder).toBe(labelBuilderSpy);
      expect(ctx.startLabelContentElement.textContent).toBe('Value: 33');
      expect(ctx.endLabelContentElement.textContent).toBe('Value: 67');
      expect(labelBuilderSpy).toHaveBeenCalledTimes(2);
      expect(labelBuilderSpy).toHaveBeenCalledWith(33, 'start');
      expect(labelBuilderSpy).toHaveBeenCalledWith(67, 'end');

      ctx.simulateStartInteraction('change', 10);
      ctx.simulateEndInteraction('change', 90);

      expect(ctx.startLabelContentElement.textContent).toBe('Value: 10');
      expect(ctx.endLabelContentElement.textContent).toBe('Value: 90');
      expect(labelBuilderSpy).toHaveBeenCalledTimes(6);
      expect(labelBuilderSpy).toHaveBeenCalledWith(10, 'start');
      expect(labelBuilderSpy).toHaveBeenCalledWith(90, 'end');
    });

    it('should set labels via property', async () => {
      const { el, ctx } = await createFixture(html`<forge-slider range label-start="Test start" label-end="Test end"></forge-slider>`);

      expect(ctx.startLabelContentElement.textContent).toBe('Test start');
      expect(ctx.endLabelContentElement.textContent).toBe('Test end');

      ctx.simulateStartInteraction('change', 10);
      ctx.simulateEndInteraction('change', 90);
      el.labelStart = 'Test: 10';
      el.labelEnd = 'Test: 90';

      expect(ctx.startLabelContentElement.textContent).toBe('Test: 10');
      expect(ctx.endLabelContentElement.textContent).toBe('Test: 90');
    });
  });

  describe('when disabled', () => {
    it('should be accessible', async () => {
      const { el } = await createFixture(html`<forge-slider disabled data-aria-label="Choose value"></forge-slider>`);
      await expect(el).toBeAccessible();
    });

    it('should not change value when clicking on input', async () => {
      const { el, ctx } = await createFixture(html`<forge-slider disabled></forge-slider>`);
      const changeSpy = vi.fn();
      const inputSpy = vi.fn();
      el.addEventListener('forge-slider-change', changeSpy);
      el.addEventListener('forge-slider-input', inputSpy);

      ctx.simulateEndInteraction('change', 25);

      expect(el.value).toBe(50);
      expect(changeSpy).not.toHaveBeenCalled();
      expect(inputSpy).not.toHaveBeenCalled();
    });
  });

  describe('when readonly', () => {
    it('should not change value when clicking on input in range mode', async () => {
      const { el, ctx } = await createFixture(html`<forge-slider readonly range></forge-slider>`);
      const changeSpy = vi.fn();
      const inputSpy = vi.fn();
      el.addEventListener('forge-slider-change', changeSpy);
      el.addEventListener('forge-slider-input', inputSpy);

      ctx.simulateStartInteraction('change', 10);
      ctx.simulateEndInteraction('change', 90);

      expect(el.value).toBe(50);
      expect(el.valueStart).toBe(33);
      expect(el.valueEnd).toBe(67);
      expect(changeSpy).not.toHaveBeenCalled();
      expect(inputSpy).not.toHaveBeenCalled();
    });
  });
});

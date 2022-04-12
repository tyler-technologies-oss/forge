import { defineSliderComponent, ISliderComponent, SLIDER_CONSTANTS, SliderComponent } from '@tylertech/forge/slider';
import { removeElement, getShadowElement, emitEvent } from '@tylertech/forge-core';
import { tick, timer } from '@tylertech/forge-testing';
import { MDCSlider } from '@material/slider';

interface ITestContext {
  context: ITestSliderContext;
}

interface ITestSliderContext {
  component: ISliderComponent;
  getMDCSlider(): MDCSlider;
  getStep(): number;
  getMin(): number;
  getMax(): number;
  append(): void;
  destroy(): void;
}

describe('SliderComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineSliderComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  it('should be instantiated', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await timer();
    expect(this.context.component.isConnected).toBe(true);
    expect(this.context.component instanceof SliderComponent).toBe(true);
    expect(this.context.getMDCSlider() instanceof MDCSlider).toBe(true);
  });

  it('should be continuous by default', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await timer();
    expect(this.context.component.type).toBe('continuous');
  });

  it('should use discrete template', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.type = 'discrete';
    this.context.append();
    await timer();
    const rootElement = getShadowElement(this.context.component, SLIDER_CONSTANTS.selectors.ROOT);
    expect(rootElement.classList.contains('mdc-slider--discrete')).toBe(true);
  });

  it('should emit input event', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await timer();
    const rootElement = getShadowElement(this.context.component, SLIDER_CONSTANTS.selectors.ROOT);
    const callback = jasmine.createSpy('input event callback');
    this.context.component.addEventListener(SLIDER_CONSTANTS.events.FORGE_INPUT, callback);
    emitEvent(rootElement, SLIDER_CONSTANTS.events.MDC_INPUT, null);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(jasmine.any(CustomEvent));
  });

  it('should emit change event', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await timer();
    const rootElement = getShadowElement(this.context.component, SLIDER_CONSTANTS.selectors.ROOT);
    const callback = jasmine.createSpy('change event callback');
    this.context.component.addEventListener(SLIDER_CONSTANTS.events.FORGE_CHANGE, callback);
    emitEvent(rootElement, SLIDER_CONSTANTS.events.MDC_CHANGE, null);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(jasmine.any(CustomEvent));
  });

  it('should set disabled via property', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await timer();
    this.context.component.disabled = true;
    expect(this.context.getMDCSlider().getDisabled()).toBe(true);
  });

  it('should set disabled via attribute', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await timer();
    this.context.component.setAttribute(SLIDER_CONSTANTS.attributes.DISABLED, 'true');
    expect(this.context.component.disabled).toBe(true);
    expect(this.context.getMDCSlider().getDisabled()).toBe(true);
  });

  it('should set disabled via attribute when set by default', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(SLIDER_CONSTANTS.attributes.DISABLED, 'true');
    this.context.append();
    await timer();
    expect(this.context.component.disabled).toBe(true);
    expect(this.context.getMDCSlider().getDisabled()).toBe(true);
  });

  it('should set value via property', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await timer();
    this.context.component.value = 50;
    expect(this.context.getMDCSlider().getValue()).toBe(50);
    expect(this.context.component.getAttribute(SLIDER_CONSTANTS.attributes.VALUE)).toBe('50');
  });

  it('should set value via attribute', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await timer();
    this.context.component.setAttribute(SLIDER_CONSTANTS.attributes.VALUE, '50');
    expect(this.context.component.value).toBe(50);
    expect(this.context.getMDCSlider().getValue()).toBe(50);
  });

  it('should set value via attribute when set by default', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(SLIDER_CONSTANTS.attributes.VALUE, '50');
    this.context.append();
    await timer();
    expect(this.context.component.value).toBe(50);
    expect(this.context.getMDCSlider().getValue()).toBe(50);
  });

  it('should set min via property', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await timer();
    this.context.component.min = 25;
    expect(this.context.getMin()).toBe(25);
    expect(this.context.component.getAttribute(SLIDER_CONSTANTS.attributes.MIN)).toBe('25');
  });

  it('should set min via attribute', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await timer();
    this.context.component.setAttribute(SLIDER_CONSTANTS.attributes.MIN, '25');
    await tick();

    expect(this.context.component.min).toBe(25, 'Expected component min state to be 25');
    expect(this.context.getMin()).toBe(25, 'Expected MDC slider min state to be 25');
  });

  it('should set min via attribute when set by default', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(SLIDER_CONSTANTS.attributes.MIN, '25');
    this.context.append();
    await timer();
    expect(this.context.component.min).toBe(25);
    expect(this.context.getMin()).toBe(25);
  });

  it('should set max via property', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await timer();

    this.context.component.max = 75;
    await tick();

    expect(this.context.getMax()).toBe(75, 'Expected MDC slider to be set to 75');
    expect(this.context.component.getAttribute(SLIDER_CONSTANTS.attributes.MAX)).toBe('75');
  });

  it('should set max via attribute', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await timer();
    this.context.component.setAttribute(SLIDER_CONSTANTS.attributes.MAX, '75');
    await tick();

    expect(this.context.component.max).toBe(75);
    expect(this.context.getMax()).toBe(75);
  });

  it('should set min via attribute when set by default', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(SLIDER_CONSTANTS.attributes.MAX, '75');
    this.context.append();
    await timer();
    expect(this.context.component.max).toBe(75);
    expect(this.context.getMax()).toBe(75);
  });

  it('should set step via property', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await timer();
    this.context.component.step = 2;
    expect(this.context.getStep()).toBe(2);
    expect(this.context.component.getAttribute(SLIDER_CONSTANTS.attributes.STEP)).toBe('2');
  });

  it('should set step via attribute', async function(this: ITestContext) {
    this.context = setupTestContext(true);
    await timer();
    this.context.component.setAttribute(SLIDER_CONSTANTS.attributes.STEP, '2');
    await tick();

    expect(this.context.component.step).toBe(2);
    expect(this.context.getStep()).toBe(2);
  });

  it('should set min via attribute when set by default', async function(this: ITestContext) {
    this.context = setupTestContext();
    this.context.component.setAttribute(SLIDER_CONSTANTS.attributes.STEP, '2');
    this.context.append();
    await timer();
    expect(this.context.component.step).toBe(2);
    expect(this.context.getStep()).toBe(2);
  });

  function setupTestContext(append = false): ITestSliderContext {
    const fixture = document.createElement('div');
    fixture.id = 'slider-test-fixture';
    const component = document.createElement(SLIDER_CONSTANTS.elementName) as ISliderComponent;
    fixture.appendChild(component);
    if (append) {
      document.body.appendChild(fixture);
    }
    return {
      component,
      getMDCSlider: () => component['_mdcSlider'],
      getStep: () => {
        const inputElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.VALUE_INPUT) as HTMLInputElement;
        return +inputElement.step;
      },
      getMin: () => {
        const inputElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.VALUE_INPUT) as HTMLInputElement;
        return +inputElement.min;
      },
      getMax: () => {
        const inputElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.VALUE_INPUT) as HTMLInputElement;
        return +inputElement.max;
      },
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }
});

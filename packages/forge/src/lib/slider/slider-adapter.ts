import { getShadowElement, toggleAttribute, toggleClass } from '@tylertech/forge-core';
import { internals } from '../constants.js';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter.js';
import { elementsOverlapping, isPointerOverElement } from '../core/utils/utils.js';
import { ISliderComponent } from '../slider/index.js';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../state-layer/index.js';
import { SLIDER_CONSTANTS } from './slider-constants.js';
import { createLabel, createStartHandleElement, createStartInputElement } from './slider-utils.js';

export interface ISliderState {
  startFraction: number;
  endFraction: number;
  tickCount: number;
}

export interface ISliderAdapter extends IBaseAdapter {
  addInputListener(type: keyof HTMLElementEventMap, listener: EventListener): void;
  update(state: ISliderState): void;
  updateLabels(labelStart: string, labelEnd: string): void;
  updateHandleLayering(): void;
  tryHoverStartHandle(coords: { x: number; y: number }): void;
  tryHoverEndHandle(coords: { x: number; y: number }): void;
  tryDetectOverlap(): void;
  leaveHandleContainer(): void;
  syncInputValues(valueStart: number, valueEnd: number): void;
  setRange(value: boolean): void;
  setTickmarks(value: boolean): void;
  setStep(step: number): void;
  setMin(value: number): void;
  setMax(value: number): void;
  setDisabled(value: boolean): void;
  setReadonly(value: boolean): void;
  toggleLabels(value: boolean): void;
  setStartAriaLabel(value: string | null): void;
  setEndAriaLabel(value: string | null): void;
}

export class SliderAdapter extends BaseAdapter<ISliderComponent> implements ISliderAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _trackElement: HTMLElement;
  private readonly _handleContainerElement: HTMLElement;
  private readonly _endInputElement: HTMLInputElement;
  private readonly _endHandleElement: HTMLElement;
  private readonly _endHandleThumbElement: HTMLElement;
  private _endLabelContentElement: HTMLElement | undefined;
  private _startInputElement: HTMLInputElement | undefined;
  private _startHandleElement: HTMLElement | undefined;
  private _startHandleThumbElement: HTMLElement | undefined;
  private _startLabelContentElement: HTMLElement | undefined;

  constructor(component: ISliderComponent) {
    super(component);

    this._rootElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.ROOT);
    this._trackElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.TRACK);
    this._handleContainerElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.HANDLE_CONTAINER);
    this._endInputElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.END_INPUT) as HTMLInputElement;
    this._endHandleElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.END_HANDLE);
    this._endHandleThumbElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.END_HANDLE_THUMB);
    this._endLabelContentElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.END_LABEL_CONTENT);
  }

  public addInputListener(type: keyof HTMLElementEventMap, listener: EventListener): void {
    const inputs = this._getInputs();
    inputs.forEach(input => input.addEventListener(type, listener));
  }

  public update({ startFraction, endFraction, tickCount }: ISliderState): void {
    this._rootElement.style.setProperty(SLIDER_CONSTANTS.cssCustomProperties.START_FRACTION, String(startFraction));
    this._rootElement.style.setProperty(SLIDER_CONSTANTS.cssCustomProperties.END_FRACTION, String(endFraction));
    this._rootElement.style.setProperty(SLIDER_CONSTANTS.cssCustomProperties.TICK_COUNT, String(tickCount));
  }

  public updateLabels(labelStart: string, labelEnd: string): void {
    if (this._startLabelContentElement) {
      this._startLabelContentElement.textContent = labelStart;
    }

    if (this._endLabelContentElement) {
      this._endLabelContentElement.textContent = labelEnd;
    }

    this._startInputElement?.setAttribute('aria-valuetext', labelStart);
    this._endInputElement.setAttribute('aria-valuetext', labelEnd);
  }

  public updateHandleLayering(): void {
    const isEndFocused = this._endInputElement.matches(':focus');
    if (this._startHandleElement) {
      toggleClass(this._startHandleElement, !isEndFocused, SLIDER_CONSTANTS.classes.ON_TOP);
    }
    toggleClass(this._endHandleElement, isEndFocused, SLIDER_CONSTANTS.classes.ON_TOP);
  }

  public tryHoverStartHandle(coords: { x: number; y: number }): void {
    if (this._startHandleThumbElement && isPointerOverElement(coords, this._startHandleThumbElement)) {
      this._handleContainerElement.classList.add(SLIDER_CONSTANTS.classes.HOVER);
      this._startHandleElement?.classList.add(SLIDER_CONSTANTS.classes.HOVER);
    } else if (!this._startInputElement?.matches(':focus')) {
      this._handleContainerElement.classList.remove(SLIDER_CONSTANTS.classes.HOVER);
      this._startHandleElement?.classList.remove(SLIDER_CONSTANTS.classes.HOVER);
    }
  }

  public tryHoverEndHandle(coords: { x: number; y: number }): void {
    if (isPointerOverElement(coords, this._endHandleThumbElement)) {
      this._handleContainerElement.classList.add(SLIDER_CONSTANTS.classes.HOVER);
      this._endHandleElement.classList.add(SLIDER_CONSTANTS.classes.HOVER);
    } else if (!this._endInputElement.matches(':focus')) {
      this._handleContainerElement.classList.remove(SLIDER_CONSTANTS.classes.HOVER);
      this._endHandleElement.classList.remove(SLIDER_CONSTANTS.classes.HOVER);
    }
  }

  public tryDetectOverlap(): void {
    if (this._startHandleElement) {
      const isOverlapping = elementsOverlapping(this._startHandleElement, this._endHandleElement);
      toggleClass(this._endHandleElement, isOverlapping, SLIDER_CONSTANTS.classes.OVERLAPPING);
      toggleClass(this._startHandleElement, isOverlapping, SLIDER_CONSTANTS.classes.OVERLAPPING);
    }
  }

  public leaveHandleContainer(): void {
    this._handleContainerElement.classList.remove(SLIDER_CONSTANTS.classes.HOVER);
  }

  public syncInputValues(valueStart: number, valueEnd: number): void {
    if (this._startInputElement) {
      this._startInputElement.valueAsNumber = valueStart;
    }
    this._endInputElement.valueAsNumber = valueEnd;

    if (this._startInputElement) {
      const data = new FormData();
      data.append(this._component.nameStart, String(valueStart));
      data.append(this._component.nameEnd, String(valueEnd));
      this._component[internals].setFormValue(data);
    } else {
      this._component[internals].setFormValue(String(valueEnd));
    }
  }

  public setRange(value: boolean): void {
    this._rootElement.classList.toggle(SLIDER_CONSTANTS.classes.RANGE, value);

    if (value) {
      // Create start input
      this._startInputElement = createStartInputElement(this._component);
      this._rootElement.insertAdjacentElement('afterbegin', this._startInputElement);

      // Ensure the end input is updated to the valueEnd property value now that we are in range mode
      this._endInputElement.valueAsNumber = this._component.valueEnd;

      // Create start handle
      const thumbLabel = this._startInputElement.value;
      this._startHandleElement = createStartHandleElement(thumbLabel);
      this._handleContainerElement.insertAdjacentElement('afterbegin', this._startHandleElement);
      this._startHandleThumbElement = getShadowElement(this._component, SLIDER_CONSTANTS.selectors.START_HANDLE_THUMB);
      this._startLabelContentElement = getShadowElement(this._component, SLIDER_CONSTANTS.selectors.START_LABEL_CONTENT);
    } else {
      this._startInputElement?.remove();
      this._startHandleElement?.remove();

      this._startInputElement = undefined;
      this._startHandleElement = undefined;
      this._startHandleThumbElement = undefined;
      this._startLabelContentElement = undefined;
    }
  }

  public setTickmarks(value: boolean): void {
    this._trackElement.classList.toggle(SLIDER_CONSTANTS.classes.TICKMARKS, value);
  }

  public setStep(step: number): void {
    const inputs = this._getInputs();
    inputs.forEach(input => (input.step = String(step)));
  }

  public setMin(value: number): void {
    const inputs = this._getInputs();
    inputs.forEach(input => (input.min = String(value)));
  }

  public setMax(value: number): void {
    const inputs = this._getInputs();
    inputs.forEach(input => (input.max = String(value)));
  }

  public setDisabled(value: boolean): void {
    const inputs = this._getInputs();
    inputs.forEach(input => (input.disabled = value));

    const stateLayers = this._rootElement.querySelectorAll(STATE_LAYER_CONSTANTS.elementName) as NodeListOf<IStateLayerComponent>;
    stateLayers.forEach(sl => (sl.disabled = value));
  }

  public setReadonly(value: boolean): void {
    const inputs = this._getInputs();
    inputs.forEach(input => (input.readOnly = value));
  }

  public toggleLabels(value: boolean): void {
    const labels = this._rootElement.querySelectorAll(SLIDER_CONSTANTS.selectors.LABEL);
    labels.forEach(label => label.remove());

    this._endLabelContentElement = undefined;
    this._startLabelContentElement = undefined;

    if (value) {
      const endLabelEl = createLabel(this._endInputElement.value);
      this._endHandleElement.insertAdjacentElement('beforeend', endLabelEl);
      this._endLabelContentElement = getShadowElement(this._component, SLIDER_CONSTANTS.selectors.END_LABEL_CONTENT);

      if (this._startInputElement) {
        const startLabelEl = createLabel(this._startInputElement.value);
        this._startHandleElement?.insertAdjacentElement('beforeend', startLabelEl);
        this._startLabelContentElement = getShadowElement(this._component, SLIDER_CONSTANTS.selectors.START_LABEL_CONTENT);
      }
    }
  }

  public setStartAriaLabel(value: string | null): void {
    if (this._startInputElement) {
      toggleAttribute(this._startInputElement, !!value, 'aria-label', value as string);
    }
  }

  public setEndAriaLabel(value: string | null): void {
    toggleAttribute(this._endInputElement, !!value, 'aria-label', value as string);
  }

  private _getInputs(): HTMLInputElement[] {
    const inputs: HTMLInputElement[] = [];
    if (this._startInputElement) {
      inputs.push(this._startInputElement);
    }
    return [...inputs, this._endInputElement];
  }
}

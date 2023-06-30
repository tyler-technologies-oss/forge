import { getShadowElement, toggleAttribute, toggleClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { elementsOverlapping, isPointerOverElement, userInteractionListener } from '../core/utils/utils';
import { ISliderComponent } from '../slider';
import { SLIDER_CONSTANTS } from './slider-constants';
import { SliderHandleRipple } from './slider-handle-ripple';

export interface ISliderState {
  startFraction: number;
  endFraction: number;
  tickCount: number;
}

export interface ISliderAdapter extends IBaseAdapter {
  initialize(): void;
  destroy(): void;
  addInputListener(type: keyof HTMLElementEventMap, listener: EventListener): void;
  update(state: ISliderState): void;
  updateLabels(labelStart: string, labelEnd: string): void;
  updateHandleLayering(): void;
  hasFocus(): boolean;
  tryHoverStartHandle(coords: { x: number; y: number }): void;
  tryHoverEndHandle(coords: { x: number; y: number }): void;
  tryBlurStartHandle(): void;
  tryBlurEndHandle(): void;
  tryDetectOverlap(): void;
  unhoverHandleContainer(): void;
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

export class SliderAdapter extends BaseAdapter<ISliderComponent> {
  private readonly _rootElement: HTMLElement;
  private readonly _trackElement: HTMLElement;
  private readonly _handleContainerElement: HTMLElement;
  private readonly _endInputElement: HTMLInputElement;
  private readonly _endHandleElement: HTMLElement;
  private readonly _endHandleThumbElement: HTMLElement;
  private readonly _endHandleRippleSurfaceElement: HTMLElement;
  private _endLabelContentElement: HTMLElement | undefined;
  private _startInputElement: HTMLInputElement | undefined;
  private _startHandleElement: HTMLElement | undefined;
  private _startHandleThumbElement: HTMLElement | undefined;
  private _startHandleRippleSurfaceElement: HTMLElement | undefined;
  private _startLabelContentElement: HTMLElement | undefined;
  private _startHandleRipple: SliderHandleRipple | undefined;
  private _endHandleRipple: SliderHandleRipple | undefined;
  private _ripplesInitialized = false;

  constructor(component: ISliderComponent) {
    super(component);

    this._rootElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.ROOT);
    this._trackElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.TRACK);
    this._handleContainerElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.HANDLE_CONTAINER);
    this._endInputElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.END_INPUT) as HTMLInputElement;
    this._endHandleElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.END_HANDLE);
    this._endHandleThumbElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.END_HANDLE_THUMB);
    this._endHandleRippleSurfaceElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.END_RIPPLE_SURFACE);
    this._endLabelContentElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.END_LABEL_CONTENT);
  }

  public initialize(): void {
    this._deferRippleInitialization();
  }

  public destroy(): void {
    this._startHandleRipple?.destroy();
    this._startHandleRipple = undefined;

    this._endHandleRipple?.destroy();
    this._endHandleRipple = undefined;

    this._ripplesInitialized = false;
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

  public hasFocus(): boolean {
    return this._component.matches(':focus');
  }

  public tryHoverStartHandle(coords: { x: number; y: number }): void {
    if (!this._startHandleThumbElement) {
      return;
    }

    this._startHandleRipple?.emulateFocus();

    if (isPointerOverElement(coords, this._startHandleThumbElement)) {
      this._handleContainerElement.classList.add(SLIDER_CONSTANTS.classes.HOVER);
      this._startHandleElement?.classList.add(SLIDER_CONSTANTS.classes.HOVER);
    } else if (!this._startInputElement?.matches(':focus')) {
      this._handleContainerElement.classList.remove(SLIDER_CONSTANTS.classes.HOVER);
      this._startHandleElement?.classList.remove(SLIDER_CONSTANTS.classes.HOVER);
    }
  }

  public tryHoverEndHandle(coords: { x: number; y: number }): void {
    this._endHandleRipple?.emulateFocus();

    if (isPointerOverElement(coords, this._endHandleThumbElement)) {
      this._handleContainerElement.classList.add(SLIDER_CONSTANTS.classes.HOVER);
      this._endHandleThumbElement.classList.add(SLIDER_CONSTANTS.classes.HOVER);
    } else if (!this._endInputElement.matches(':focus')) {
      this._handleContainerElement.classList.remove(SLIDER_CONSTANTS.classes.HOVER);
      this._endHandleThumbElement.classList.remove(SLIDER_CONSTANTS.classes.HOVER);
    }
  }

  public tryBlurStartHandle(): void {
    if (!this._startInputElement?.matches(':focus')) {
      this._startHandleRipple?.emulateBlur();
    }
  }

  public tryBlurEndHandle(): void {
    if (!this._endInputElement.matches(':focus')) {
      this._endHandleRipple?.emulateBlur();
    }
  }

  public tryDetectOverlap(): void {
    if (!this._startHandleElement) {
      return;
    }
    const isOverlapping = elementsOverlapping(this._startHandleElement, this._endHandleElement);
    toggleClass(this._endHandleElement, isOverlapping, SLIDER_CONSTANTS.classes.OVERLAPPING);
    toggleClass(this._startHandleElement, isOverlapping, SLIDER_CONSTANTS.classes.OVERLAPPING);
  }

  public unhoverHandleContainer(): void {
    this._handleContainerElement.classList.remove(SLIDER_CONSTANTS.classes.HOVER);
  }

  public syncInputValues(valueStart: number, valueEnd: number): void {
    if (this._startInputElement) {
      this._startInputElement.valueAsNumber = valueStart;
    }
    this._endInputElement.valueAsNumber = valueEnd;
  }

  public setRange(value: boolean): void {
    this._rootElement.classList.toggle(SLIDER_CONSTANTS.classes.RANGE, value);

    if (value) {
      // Create start input
      this._startInputElement = this._createStartInputElement();
      this._rootElement.insertAdjacentElement('afterbegin', this._startInputElement);

      // Ensure the end input is updated to the valueEnd property value now that we are in range mode
      this._endInputElement.valueAsNumber = this._component.valueEnd;

      // Create start handle
      const thumbLabel = this._startInputElement.value;
      this._startHandleElement = this._createStartHandleElement(thumbLabel);
      this._handleContainerElement.insertAdjacentElement('afterbegin', this._startHandleElement);
      this._startHandleThumbElement = getShadowElement(this._component, SLIDER_CONSTANTS.selectors.START_HANDLE_THUMB);
      this._startHandleRippleSurfaceElement = getShadowElement(this._component, SLIDER_CONSTANTS.selectors.START_RIPPLE_SURFACE);
      this._startLabelContentElement = getShadowElement(this._component, SLIDER_CONSTANTS.selectors.START_LABEL_CONTENT);

      // Initialize start handle ripple if the end handle ripple has already been initialized
      if (this._ripplesInitialized) {
        this._tryInitializeStartHandleRipple();
      }
    } else {
      this._startInputElement?.remove();
      this._startHandleElement?.remove();

      this._startHandleRipple?.destroy();
      this._startHandleRipple = undefined;

      this._startInputElement = undefined;
      this._startHandleElement = undefined;
      this._startHandleThumbElement = undefined;
      this._startHandleRippleSurfaceElement = undefined;
      this._startLabelContentElement = undefined;
    }
  }

  public setTickmarks(value: boolean): void {
    this._trackElement.classList.toggle(SLIDER_CONSTANTS.classes.TICKMARKS, value);
  }

  public setStep(step: number): void {
    const inputs = this._getInputs();
    inputs.forEach(input => input.step = String(step));
  }

  public setMin(value: number): void {
    const inputs = this._getInputs();
    inputs.forEach(input => input.min = String(value));
  }

  public setMax(value: number): void {
    const inputs = this._getInputs();
    inputs.forEach(input => input.max = String(value));
  }

  public setDisabled(value: boolean): void {
    const inputs = this._getInputs();
    inputs.forEach(input => input.disabled = value);
  }

  public setReadonly(value: boolean): void {
    const inputs = this._getInputs();
    inputs.forEach(input => input.readOnly = value);
  }

  public toggleLabels(value: boolean): void {
    const labels = this._rootElement.querySelectorAll(SLIDER_CONSTANTS.selectors.LABEL);
    labels.forEach(label => label.remove());

    this._endLabelContentElement = undefined;
    this._startLabelContentElement = undefined;

    if (value) {
      const createLabel = (text: string): string => `
        <div class="label">
          <span class="label-content">${text}</span>
        </div>
      `;

      const endLabelEl = createLabel(this._endInputElement.value);
      this._endHandleElement.insertAdjacentHTML('beforeend', endLabelEl);
      this._endLabelContentElement = getShadowElement(this._component, SLIDER_CONSTANTS.selectors.END_LABEL_CONTENT);
      
      if (this._startInputElement) {
        const startLabelEl = createLabel(this._startInputElement.value);
        this._startHandleElement?.insertAdjacentHTML('beforeend', startLabelEl);
        this._startLabelContentElement = getShadowElement(this._component, SLIDER_CONSTANTS.selectors.START_LABEL_CONTENT);
      }
    }
  }

  public setStartAriaLabel(value: string | null): void {
    if (this._startInputElement) {
      toggleAttribute(this._startInputElement, !!value, 'aria-label', value ?? undefined);
    }
  }

  public setEndAriaLabel(value: string | null): void {
    toggleAttribute(this._endInputElement, !!value, 'aria-label', value ?? undefined);
  }

  private _getInputs(): HTMLInputElement[] {
    const inputs: HTMLInputElement[] = [];
    if (this._startInputElement) {
      inputs.push(this._startInputElement);
    }
    return [...inputs, this._endInputElement];
  }

  private async _deferRippleInitialization(): Promise<void> {
    const type = await userInteractionListener(this._rootElement);
    this._ripplesInitialized = true;
    this._tryInitializeEndHandleRipple(type);
    this._tryInitializeStartHandleRipple(type);
  }

  private _createStartInputElement(): HTMLInputElement {
    const startInput = document.createElement('input');
    startInput.type = 'range';
    startInput.id = 'start';
    startInput.min = String(this._component.min);
    startInput.max = String(this._component.max);
    startInput.step = String(this._component.step);
    startInput.valueAsNumber = this._component.valueStart;
    startInput.disabled = this._component.disabled;
    startInput.classList.add('start');
    
    if (this._component.hasAttribute(SLIDER_CONSTANTS.attributes.ARIA_LABEL_START)) {
      startInput.setAttribute('aria-label', this._component.getAttribute(SLIDER_CONSTANTS.attributes.ARIA_LABEL_START) as string);
    }
    startInput.setAttribute('aria-valuetext', String(this._component.valueStart));

    return startInput;
  }

  private _createStartHandleElement(thumbLabel: string): HTMLElement {
    const startHandle = document.createElement('div');
    startHandle.classList.add('handle', 'start');
    
    const startHandleNub = document.createElement('div');
    startHandleNub.classList.add('handle-nub');
    startHandle.appendChild(startHandleNub);
    
    const startHandleLabel = document.createElement('div');
    startHandleLabel.classList.add('label');
    startHandle.appendChild(startHandleLabel);

    const startHandleLabelContent = document.createElement('span');
    startHandleLabelContent.textContent = thumbLabel;
    startHandleLabelContent.classList.add('label-content');
    startHandleLabel.appendChild(startHandleLabelContent);

    const startHandleRipple = document.createElement('span');
    startHandleRipple.classList.add('forge-slider__handle-ripple');
    startHandle.appendChild(startHandleRipple);
    
    return startHandle;
  }

  private _tryInitializeEndHandleRipple(type?: string): void {
    if (this._endHandleRipple) {
      return;
    }
    this._endHandleRipple = new SliderHandleRipple(this._endHandleRippleSurfaceElement, this._endInputElement);
    if (type === 'focusin' && this._endInputElement.matches(':focus')) {
      this._endHandleRipple.emulateFocus();
    }
  }

  private _tryInitializeStartHandleRipple(type?: string): void {
    if (this._startHandleRipple || !this._startInputElement || !this._startHandleRippleSurfaceElement) {
      return;
    }
    this._startHandleRipple = new SliderHandleRipple(this._startHandleRippleSurfaceElement, this._startInputElement);
    if (type === 'focusin' && this._startInputElement?.matches(':focus')) {
      this._startHandleRipple.emulateFocus();
    }
  }
}

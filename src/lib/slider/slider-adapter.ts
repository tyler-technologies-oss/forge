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
  labels: boolean;
}

export interface ISliderAdapter extends IBaseAdapter {
  initialize(): void;
  destroy(): void;
  addInputListener(type: keyof HTMLElementEventMap, listener: EventListener): void;
  update(state: ISliderState): void;
  updateHandleLayering(): void;
  hasFocus(): boolean;
  tryHoverStartHandle(coords: { x: number; y: number }): void;
  tryHoverEndHandle(coords: { x: number; y: number }): void;
  tryBlurStartHandle(): void;
  tryBlurEndHandle(): void;
  tryToggleOverlap(): void;
  syncInputValues(valueStart: number, valueEnd: number): void;
  setRange(value: boolean): void;
  setTickmarks(value: boolean): void;
  setStep(step: number): void;
  setMin(value: number): void;
  setMax(value: number): void;
  setDisabled(value: boolean): void;
  toggleLabels(value: boolean): void;
  setStartAriaLabel(value: string | null): void;
  setEndAriaLabel(value: string | null): void;
}

export class SliderAdapter extends BaseAdapter<ISliderComponent> {
  private readonly _rootElement: HTMLElement;
  private readonly _trackElement: HTMLElement;
  private readonly _handleContainer: HTMLElement;
  private readonly _endInput: HTMLInputElement;
  private readonly _endHandle: HTMLElement;
  private readonly _endHandleThumb: HTMLElement;
  private readonly _endHandleRippleSurface: HTMLElement;
  private _endLabelContentElement: HTMLElement | undefined;
  private _startInput: HTMLInputElement | undefined;
  private _startHandle: HTMLElement | undefined;
  private _startHandleThumb: HTMLElement | undefined;
  private _startHandleRippleSurface: HTMLElement | undefined;
  private _startLabelContentElement: HTMLElement | undefined;
  private _startHandleRipple: SliderHandleRipple | undefined;
  private _endHandleRipple: SliderHandleRipple | undefined;
  private _userInteraction = false;

  constructor(component: ISliderComponent) {
    super(component);

    this._rootElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.ROOT);
    this._trackElement = getShadowElement(component, SLIDER_CONSTANTS.selectors.TRACK);
    this._handleContainer = getShadowElement(component, SLIDER_CONSTANTS.selectors.HANDLE_CONTAINER);
    this._endInput = getShadowElement(component, SLIDER_CONSTANTS.selectors.END_INPUT) as HTMLInputElement;
    this._endHandle = getShadowElement(component, SLIDER_CONSTANTS.selectors.END_HANDLE);
    this._endHandleThumb = getShadowElement(component, SLIDER_CONSTANTS.selectors.END_HANDLE_THUMB);
    this._endHandleRippleSurface = getShadowElement(component, SLIDER_CONSTANTS.selectors.END_RIPPLE_SURFACE);
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

    this._userInteraction = false;
  }

  public addInputListener(type: keyof HTMLElementEventMap, listener: EventListener): void {
    const inputs = this._getInputs();
    inputs.forEach(input => input.addEventListener(type, listener));
  }

  public update({ startFraction, endFraction, tickCount, labels }: ISliderState): void {
    this._rootElement.style.setProperty(SLIDER_CONSTANTS.cssCustomProperties.START_FRACTION, String(startFraction));
    this._rootElement.style.setProperty(SLIDER_CONSTANTS.cssCustomProperties.END_FRACTION, String(endFraction));
    this._rootElement.style.setProperty(SLIDER_CONSTANTS.cssCustomProperties.TICK_COUNT, String(tickCount));

    const startInput = this._rootElement.querySelector(SLIDER_CONSTANTS.selectors.START_INPUT) as HTMLInputElement | null;
    
    const startLabel = String(startInput?.valueAsNumber ?? 0);
    const endLabel = String(this._endInput.valueAsNumber ?? 0);
    startInput?.setAttribute('aria-valuetext', startLabel);
    this._endInput.setAttribute('aria-valuetext', endLabel);

    if (labels) {
      const startLabelEl = this._rootElement.querySelector(SLIDER_CONSTANTS.selectors.START_LABEL_CONTENT) as HTMLElement;

      if (startLabelEl) {
        startLabelEl.textContent = startLabel;
      }
      if (this._endLabelContentElement) {
        this._endLabelContentElement.textContent = endLabel;
      }
    }
  }

  public updateHandleLayering(): void {
    const startHandle = this._handleContainer.querySelector(SLIDER_CONSTANTS.selectors.START_HANDLE) as HTMLElement;
    const isEndFocused = this._endInput.matches(':focus');
    if (startHandle) {
      toggleClass(startHandle, !isEndFocused, SLIDER_CONSTANTS.classes.ON_TOP);
    }
    toggleClass(this._endHandle, isEndFocused, SLIDER_CONSTANTS.classes.ON_TOP);
  }

  public hasFocus(): boolean {
    return this._component.matches(':focus');
  }

  public tryHoverStartHandle(coords: { x: number; y: number }): void {
    if (!this._startHandleThumb) {
      return;
    }

    this._startHandleRipple?.emulateFocus();

    if (isPointerOverElement(coords, this._startHandleThumb)) {
      this._handleContainer.classList.add('hover');
      this._startHandle?.classList.add('hover');
    } else if (!this._startInput?.matches(':focus')) {
      this._handleContainer.classList.remove('hover');
      this._startHandle?.classList.remove('hover');
    }

    // if (!this._startInput?.matches(':focus')) {
    //   this._startHandleRipple?.emulateBlur();
    // }
  }

  public tryHoverEndHandle(coords: { x: number; y: number }): void {
    this._endHandleRipple?.emulateFocus();

    if (isPointerOverElement(coords, this._endHandleThumb)) {
      this._handleContainer.classList.add('hover');
      this._endHandleThumb.classList.add('hover');
    } else if (!this._endInput.matches(':focus')) {
      this._handleContainer.classList.remove('hover');
      this._endHandleThumb.classList.remove('hover');
    }

    // if (!this._endInput.matches(':focus')) {
    //   this._endHandleRipple?.emulateBlur();
    // }
  }

  public tryBlurStartHandle(): void {
    if (!this._startInput?.matches(':focus')) {
      this._startHandleRipple?.emulateBlur();
    }
  }

  public tryBlurEndHandle(): void {
    if (!this._endInput.matches(':focus')) {
      this._endHandleRipple?.emulateBlur();
    }
  }

  public tryToggleOverlap(): void {
    const startHandle = this._handleContainer.querySelector(SLIDER_CONSTANTS.selectors.START_HANDLE) as HTMLElement;
    const isOverlapping = elementsOverlapping(startHandle, this._endHandle);
    toggleClass(this._endHandle, isOverlapping, SLIDER_CONSTANTS.classes.OVERLAPPING);
    toggleClass(startHandle, isOverlapping, SLIDER_CONSTANTS.classes.OVERLAPPING);
  }

  public syncInputValues(valueStart: number, valueEnd: number): void {
    if (this._startInput) {
      this._startInput.valueAsNumber = valueStart;
    }
    this._endInput.valueAsNumber = valueEnd;
  }

  public setRange(value: boolean): void {
    this._rootElement.classList.toggle(SLIDER_CONSTANTS.classes.RANGE, value);

    if (value) {
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
      this._rootElement.insertAdjacentElement('afterbegin', startInput);

      // Ensure the end input is updated to the valueEnd property value now that we are in range mode
      this._endInput.valueAsNumber = this._component.valueEnd;

      const percent = startInput.value;
      const startHandle = `
        <div class="handle start">
          <div class="handle-nub"></div>
          <div class="label">
            <span class="label-content">${percent}</span>
          </div>
          <span class="forge-slider__handle-ripple"></span>
        </div>
      `;
      this._handleContainer.insertAdjacentHTML('afterbegin', startHandle);

      this._startInput = startInput;
      this._startHandle = getShadowElement(this._component, SLIDER_CONSTANTS.selectors.START_HANDLE);
      this._startHandleThumb = getShadowElement(this._component, SLIDER_CONSTANTS.selectors.START_HANDLE_THUMB);
      this._startHandleRippleSurface = getShadowElement(this._component, SLIDER_CONSTANTS.selectors.START_RIPPLE_SURFACE);
      this._startLabelContentElement = getShadowElement(this._component, SLIDER_CONSTANTS.selectors.START_LABEL_CONTENT);

      if (this._userInteraction) {
        this._tryInitializeStartHandleRipple();
      }
    } else {
      const startInput = this._rootElement.querySelector(SLIDER_CONSTANTS.selectors.START_INPUT) as HTMLInputElement | null;
      const startHandle = this._rootElement.querySelector(SLIDER_CONSTANTS.selectors.START_HANDLE) as HTMLElement | null;
      startInput?.remove();
      startHandle?.remove();

      this._startHandleRipple?.destroy();
      this._startHandleRipple = undefined;

      this._startInput = undefined;
      this._startHandle = undefined;
      this._startHandleThumb = undefined;
      this._startHandleRippleSurface = undefined;
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

      const endLabelEl = createLabel(this._endInput.value);
      this._endHandle.insertAdjacentHTML('beforeend', endLabelEl);
      
      const startInput = this._rootElement.querySelector(SLIDER_CONSTANTS.selectors.START_INPUT) as HTMLInputElement | null;
      if (startInput) {
        const startLabelEl = createLabel(startInput.value);
        const startHandle = this._handleContainer.querySelector(SLIDER_CONSTANTS.selectors.START_HANDLE) as HTMLElement | null;
        startHandle?.insertAdjacentHTML('beforeend', startLabelEl);
      }
    }
  }

  public setStartAriaLabel(value: string | null): void {
    const startInput = this._rootElement.querySelector(SLIDER_CONSTANTS.selectors.START_INPUT) as HTMLInputElement | null;
    if (startInput) {
      toggleAttribute(startInput, !!value, 'aria-label', value ?? undefined);
    }
  }

  public setEndAriaLabel(value: string | null): void {
    toggleAttribute(this._endInput, !!value, 'aria-label', value ?? undefined);
  }

  private _getInputs(): NodeListOf<HTMLInputElement> {
    return this._rootElement.querySelectorAll(SLIDER_CONSTANTS.selectors.INPUT);
  }

  private async _deferRippleInitialization(): Promise<void> {
    const type = await userInteractionListener(this._rootElement);
    this._userInteraction = true;
    this._tryInitializeEndHandleRipple(type);
    this._tryInitializeStartHandleRipple(type);
  }

  private _tryInitializeEndHandleRipple(type?: string): void {
    if (this._endHandleRipple) {
      return;
    }
    const inputElement = this._rootElement.querySelector(SLIDER_CONSTANTS.selectors.END_INPUT) as HTMLInputElement;
    this._endHandleRipple = new SliderHandleRipple(this._endHandleRippleSurface, inputElement);
    if (type === 'focusin' && inputElement?.matches(':focus')) {
      this._endHandleRipple.emulateFocus();
    }
  }

  private _tryInitializeStartHandleRipple(type?: string): void {
    const startInputElement = this._rootElement.querySelector(SLIDER_CONSTANTS.selectors.START_INPUT) as HTMLInputElement;
    if (this._startHandleRipple || !startInputElement) {
      return;
    }

    const surface = this._handleContainer.querySelector(SLIDER_CONSTANTS.selectors.START_RIPPLE_SURFACE) as HTMLElement;
    this._startHandleRipple = new SliderHandleRipple(surface, startInputElement);
    if (type === 'focusin' && startInputElement?.matches(':focus')) {
      this._startHandleRipple.emulateFocus();
    }
  }
}

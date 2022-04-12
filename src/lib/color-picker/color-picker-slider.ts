import { COLOR_PICKER_CONSTANTS } from './color-picker-constants';
import { relativeCoords } from './color-picker-utils';

export interface IColorPickerSliderOptions {
  min: number;
  max: number;
  step: number;
  change: (value: number) => void;
}

export class ColorPickerSlider {
  private _percent = 1;
  private _min = 0;
  private _max = 1;
  private _step = 0.01;
  private _thumbElement: HTMLElement;
  private _keydownListener: (evt: KeyboardEvent) => void;
  private _downListener: (evt: MouseEvent & TouchEvent) => void;
  private _moveListener: (evt: MouseEvent & TouchEvent) => void;
  private _upListener: (evt: MouseEvent & TouchEvent) => void;
  
  constructor(private _rootElement: HTMLElement, private _changeListener: (value: number) => void) {
    this._keydownListener = evt => this._onKeydown(evt);
    this._downListener = evt => this._onDown(evt);
    this._moveListener = evt => this._onMove(evt);
    this._upListener = evt => this._onUp(evt);
    this._initialize();
  }

  public destroy(): void {
    this._unlisten();
  }

  public setValue(value: number): void {
    this._percent = value;
    this._setThumbPosition(this._percent);
  }

  private _initialize(): void {
    this._thumbElement = this._rootElement.querySelector(COLOR_PICKER_CONSTANTS.selectors.SLIDER_THUMB) as HTMLElement;
    this._listen();
    this._setThumbPosition(this._percent);
  }

  private _listen(): void {
    this._thumbElement.addEventListener('keydown', this._keydownListener);
    this._rootElement.addEventListener('mousedown', this._downListener);
    this._rootElement.addEventListener('touchstart', this._downListener);
  }

  private _unlisten(): void {
    this._thumbElement.removeEventListener('keydown', this._keydownListener);
    this._rootElement.removeEventListener('mousedown', this._downListener);
    this._rootElement.removeEventListener('touchstart', this._downListener);
    document.removeEventListener('mousemove', this._moveListener);
    document.removeEventListener('touchmove', this._moveListener);
    document.removeEventListener('mouseup', this._upListener);
    document.removeEventListener('touchend', this._upListener);
  }

  private _onKeydown(evt: KeyboardEvent): void {
    const isArrowLeftKey = evt.key === 'ArrowLeft' || evt.keyCode === 37;
    const isArrowRightKey = evt.key === 'ArrowRight' || evt.keyCode === 39;
    const isHomeKey = evt.key === 'Home' || evt.keyCode === 36;
    const isEndKey = evt.key === 'End' || evt.keyCode === 35;

    if (isArrowLeftKey) {
      evt.preventDefault();
      this._percent -= this._step;
    } else if (isArrowRightKey) {
      evt.preventDefault();
      this._percent += this._step;
    } else if (isHomeKey) {
      evt.preventDefault();
      this._percent = this._min;
    } else if (isEndKey) {
      evt.preventDefault();
      this._percent = this._max;
    }

    if (this._percent < this._min) {
      this._percent = this._min;
    } else if (this._percent > this._max) {
      this._percent = this._max;
    }

    this._setThumbPosition(this._percent);
    this._notify();
  }

  private _onDown(evt: MouseEvent & TouchEvent): void {
    evt.preventDefault();
    document.addEventListener('mousemove', this._moveListener);
    document.addEventListener('touchmove', this._moveListener);
    document.addEventListener('mouseup', this._upListener);
    document.addEventListener('touchend', this._upListener);
    this._updateThumbPosition(evt);
  }

  private _onMove(evt: MouseEvent & TouchEvent): void {
    evt.preventDefault();
    this._thumbElement.classList.add(COLOR_PICKER_CONSTANTS.classes.SLIDER_THUMB_ACTIVE);
    this._updateThumbPosition(evt);
  }

  private _onUp(evt: MouseEvent & TouchEvent): void {
    this._thumbElement.classList.remove(COLOR_PICKER_CONSTANTS.classes.SLIDER_THUMB_ACTIVE);
    document.removeEventListener('mousemove', this._moveListener);
    document.removeEventListener('touchmove', this._moveListener);
    document.removeEventListener('mouseup', this._upListener);
    document.removeEventListener('touchend', this._upListener);
    this._updateThumbPosition(evt);
    this._thumbElement.focus();
  }

  private _updateThumbPosition(evt: MouseEvent & TouchEvent): void {
    const x = /^mouse/.test(evt.type) ? evt.clientX : evt.changedTouches[0].clientX;
    this._percent = this._calculateSliderPercent(x);
    this._setThumbPosition(this._percent);
    this._notify();
  }

  private _calculateSliderPercent(absX: number): number {
    const coords = relativeCoords(absX, 0, this._rootElement);
    return parseFloat((coords.x / coords.width).toFixed(2));
  }

  private _setThumbPosition(percent: number): void {
    this._thumbElement.style.left = `${percent * 100}%`;
  }

  private _notify(): void {
    if (typeof this._changeListener === 'function') {
      this._changeListener(this._percent);
    }
  }
}

import { COLOR_PICKER_CONSTANTS } from './color-picker-constants';
import { relativeCoords } from './color-picker-utils';

export class ColorPickerGradientSlider {
  private _xPercent: number;
  private _yPercent: number;
  private _thumbElement: HTMLElement;
  private _keydownListener: (evt: KeyboardEvent) => void;
  private _downListener: (evt: MouseEvent & TouchEvent) => void;
  private _moveListener: (evt: MouseEvent & TouchEvent) => void;
  private _upListener: (evt: MouseEvent & TouchEvent) => void;

  constructor(
    private _rootElement: HTMLElement,
    private _changeListener: (x: number, y: number) => void
  ) {
    this._keydownListener = evt => this._onKeydown(evt);
    this._downListener = evt => this._onDown(evt);
    this._moveListener = evt => this._onMove(evt);
    this._upListener = evt => this._onUp(evt);
    this._initialize();
  }

  public destroy(): void {
    this._unlisten();
  }

  public setValue(saturation: number, value: number): void {
    window.requestAnimationFrame(() => {
      const bounds = this._rootElement.getBoundingClientRect();
      this._xPercent = Math.round(bounds.width * (saturation / 100));
      this._yPercent = bounds.height - Math.round(bounds.height * (value / 100));
      this._setThumbPosition(this._xPercent, this._yPercent);
    });
  }

  private _initialize(): void {
    this._thumbElement = this._rootElement.querySelector(COLOR_PICKER_CONSTANTS.selectors.GRADIENT_THUMB) as HTMLElement;
    this._listen();
    this._setThumbPosition(this._xPercent, this._yPercent);
  }

  private _listen(): void {
    this._rootElement.addEventListener('keydown', this._keydownListener);
    this._rootElement.addEventListener('mousedown', this._downListener);
    this._rootElement.addEventListener('touchstart', this._downListener);
  }

  private _unlisten(): void {
    this._rootElement.removeEventListener('keydown', this._keydownListener);
    this._rootElement.removeEventListener('mousedown', this._downListener);
    this._rootElement.removeEventListener('touchstart', this._downListener);
    document.removeEventListener('mousemove', this._moveListener);
    document.removeEventListener('touchmove', this._moveListener);
    document.removeEventListener('mouseup', this._upListener);
    document.removeEventListener('touchend', this._upListener);
  }

  private _onKeydown(evt: KeyboardEvent): void {
    const isEnterKey = evt.key === 'Enter' || evt.keyCode === 13;
    const isArrowLeftKey = evt.key === 'ArrowLeft' || evt.keyCode === 37;
    const isArrowUpKey = evt.key === 'ArrowUp' || evt.keyCode === 38;
    const isArrowRightKey = evt.key === 'ArrowRight' || evt.keyCode === 39;
    const isArrowDownKey = evt.key === 'ArrowDown' || evt.keyCode === 40;

    const bounds = this._rootElement.getBoundingClientRect();

    if (isArrowDownKey) {
      evt.preventDefault();
      this._yPercent++;
    } else if (isArrowUpKey) {
      evt.preventDefault();
      this._yPercent--;
    } else if (isArrowLeftKey) {
      evt.preventDefault();
      this._xPercent--;
    } else if (isArrowRightKey) {
      evt.preventDefault();
      this._xPercent++;
    } else if (isEnterKey) {
      evt.preventDefault();
      // TODO(kieran.nichols): Select the current color
    } else {
      return;
    }

    if (this._xPercent > bounds.width) {
      this._xPercent = bounds.width;
    } else if (this._xPercent < 0) {
      this._xPercent = 0;
    }

    if (this._yPercent > bounds.height) {
      this._yPercent = bounds.height;
    } else if (this._yPercent < 0) {
      this._yPercent = 0;
    }

    this._setThumbPosition(this._xPercent, this._yPercent);
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
    this._updateThumbPosition(evt);
  }

  private _onUp(evt: MouseEvent & TouchEvent): void {
    document.removeEventListener('mousemove', this._moveListener);
    document.removeEventListener('touchmove', this._moveListener);
    document.removeEventListener('mouseup', this._upListener);
    document.removeEventListener('touchend', this._upListener);
    this._updateThumbPosition(evt);
    this._thumbElement.focus();
  }

  private _updateThumbPosition(evt: MouseEvent & TouchEvent): void {
    const isMouseEvent = /^mouse/.test(evt.type);
    const x = isMouseEvent ? evt.clientX : evt.changedTouches[0].clientX;
    const y = isMouseEvent ? evt.clientY : evt.changedTouches[0].clientY;
    const coords = this._calculateSliderPercent(x, y);
    this._setThumbPosition(coords.x, coords.y);
    this._xPercent = parseInt(((coords.x / coords.width) * 100).toString(), 10);
    this._yPercent = Math.abs(parseInt(((coords.y / coords.height) * 100).toString(), 10) - 100);
    this._notify();
  }

  private _calculateSliderPercent(absX: number, absY: number): { x: number; y: number; width: number; height: number } {
    return relativeCoords(absX, absY, this._rootElement);
  }

  private _setThumbPosition(xPercent: number, yPercent: number): void {
    this._thumbElement.style.left = `${xPercent}px`;
    this._thumbElement.style.top = `${yPercent}px`;
  }

  private _notify(): void {
    if (typeof this._changeListener === 'function') {
      this._changeListener(this._xPercent, this._yPercent);
    }
  }
}

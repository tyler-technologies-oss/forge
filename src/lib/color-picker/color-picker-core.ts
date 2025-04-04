import { debounce } from '@tylertech/forge-core';
import { Nullable } from '../core';
import { IColorPickerAdapter } from './color-picker-adapter';
import {
  COLOR_PICKER_CONSTANTS,
  ColorPickerChangeEventSource,
  ColorPickerChangeEventType,
  ColorPickerValueType,
  DEFAULT_COLOR,
  IColorPickerChangeEventData,
  IHSVA,
  IRGBA
} from './color-picker-constants';
import { ColorPickerGradientSlider } from './color-picker-gradient-slider';
import { ColorPickerSlider } from './color-picker-slider';
import { formatHex, formatRgba, hexToRgba, hsvaToRgba, isValidHex, isValidHSVA, isValidRGBA, rgbaToHex, rgbaToHsva } from './color-picker-utils';

export interface IColorPickerCore {
  value: Nullable<string>;
  rgba: Nullable<IRGBA>;
  hsva: Nullable<IHSVA>;
  opacity: Nullable<number>;
  allowOpacity: boolean;
  debounceChangeEvent: boolean;
}

export class ColorPickerCore implements IColorPickerCore {
  private _value: Nullable<string> = null;
  private _allowOpacity = true;
  private _hex = DEFAULT_COLOR;
  private _hsva: IHSVA = { h: 0, s: 0, v: 0, a: 1 };
  private _rgba: IRGBA = { r: 0, g: 0, b: 0, a: 1 };
  private _debounceChangeEvent = false;
  private _valueType = ColorPickerValueType.HEX;
  private _gradientSlider: ColorPickerGradientSlider;
  private _hueSlider: ColorPickerSlider;
  private _opacitySlider: ColorPickerSlider;
  private _initialized = false;
  private _gradientSliderChangedListener: (x: number, y: number) => void;
  private _hueSliderChangedListener: (percent: number) => void;
  private _opacitySliderChangedListener: (percent: number) => void;
  private _typeClickListener: (evt: MouseEvent) => void;
  private _hexInputChangedListener: (evt: KeyboardEvent) => void;
  private _rgbaInputChangedListener: (evt: KeyboardEvent) => void;
  private _hsvaInputChangedListener: (evt: KeyboardEvent) => void;
  private _triggerChangeEvent: (type: ColorPickerChangeEventType, source: ColorPickerChangeEventSource) => void;

  constructor(private _adapter: IColorPickerAdapter) {
    this._gradientSliderChangedListener = (x, y) => this._onGradientSliderChanged(x, y);
    this._hueSliderChangedListener = value => this._onHueSliderChanged(value);
    this._opacitySliderChangedListener = value => this._onOpacitySliderChanged(value);
    this._typeClickListener = evt => this._onTypeClicked(evt);
    this._hexInputChangedListener = evt => this._onHexInputChanged();
    this._rgbaInputChangedListener = evt => this._onRgbaInputChanged();
    this._hsvaInputChangedListener = evt => this._onHsvaInputChanged();
  }

  public initialize(): void {
    this._initialized = true;
    this._applyChangeEventTrigger();
    this._adapter.setTypeClickListener(this._typeClickListener);
    this._adapter.setHexInputListener('input', this._hexInputChangedListener);
    this._adapter.setRgbaInputListener('input', this._rgbaInputChangedListener);
    this._adapter.setHsvaInputListener('input', this._hsvaInputChangedListener);
    this._gradientSlider = new ColorPickerGradientSlider(this._adapter.getGradientElement(), this._gradientSliderChangedListener);
    this._hueSlider = new ColorPickerSlider(this._adapter.getHueSliderElement(), this._hueSliderChangedListener);
    this._opacitySlider = new ColorPickerSlider(this._adapter.getOpacitySliderElement(), this._opacitySliderChangedListener);

    this._initializeOpacity();
    this._setColorFromHex();
    this._adapter.setActiveValueType(this._valueType);
  }

  public destroy(): void {
    this._adapter.removeTypeClickListener(this._typeClickListener);
    this._adapter.removeHexInputListener('input', this._hexInputChangedListener);
    this._adapter.removeRgbaInputListener('input', this._hexInputChangedListener);
    this._adapter.removeHsvaInputListener('input', this._hexInputChangedListener);

    this._gradientSlider.destroy();
    this._hueSlider.destroy();
    this._opacitySlider.destroy();
    this._initialized = false;
  }

  private _applyChangeEventTrigger(): void {
    if (this._debounceChangeEvent) {
      this._triggerChangeEvent = debounce(
        (type: ColorPickerChangeEventType, source: ColorPickerChangeEventSource) => {
          this._emitChangeEvent(type, source);
        },
        COLOR_PICKER_CONSTANTS.numbers.CHANGE_EVENT_DEBOUNCE_THRESHOLD,
        false
      );
    } else {
      this._triggerChangeEvent = (type, source) => this._emitChangeEvent(type, source);
    }
  }

  private _initializeOpacity(): void {
    this._hsva.a = 1;
    this._adapter.toggleOpacityControls(this._allowOpacity);
    this._render();
  }

  private _onTypeClicked(evt: MouseEvent): void {
    if (this._valueType === ColorPickerValueType.HEX) {
      this._valueType = ColorPickerValueType.RGBA;
    } else if (this._valueType === ColorPickerValueType.RGBA) {
      this._valueType = ColorPickerValueType.HSVA;
    } else if (this._valueType === ColorPickerValueType.HSVA) {
      this._valueType = ColorPickerValueType.HEX;
    }

    this._adapter.setActiveValueType(this._valueType);
    this._adapter.focusValueInput(this._valueType);
  }

  private _onHexInputChanged(): void {
    const value = this._adapter.getHexInputValue();
    if (isValidHex(value)) {
      this.value = value;
      this._triggerChangeEvent('input', 'hex');
    }
  }

  private _onRgbaInputChanged(): void {
    const value = this._adapter.getRgbaInputValue();
    if (isValidRGBA(value)) {
      this.value = rgbaToHex(value);
      this._triggerChangeEvent('input', 'rgba');
    }
  }

  private _onHsvaInputChanged(): void {
    const value = this._adapter.getHsvaInputValue();
    if (isValidHSVA(value)) {
      this.value = rgbaToHex(hsvaToRgba(value));
      this._triggerChangeEvent('input', 'hsva');
    }
  }

  private _setColorFromHex(): void {
    this._rgba = hexToRgba(this._hex);
    this._hsva = rgbaToHsva(this._rgba);

    if (this._initialized) {
      this._gradientSlider.setValue(this._hsva.s, this._hsva.v);
      this._hueSlider.setValue(parseFloat((this._hsva.h / 360).toFixed(2)));
      this._opacitySlider.setValue(this._hsva.a);
      this._render();
    }
  }

  private _onGradientSliderChanged(x: number, y: number): void {
    this._hsva.s = x;
    this._hsva.v = y;
    this._syncColors();
    this._render();
    this._triggerChangeEvent('slider', 'gradient');
  }

  private _onHueSliderChanged(value: number): void {
    this._hsva.h = parseInt((360 * value).toString(), 10);
    this._syncColors();
    this._setGradientColor();
    this._render();
    this._triggerChangeEvent('slider', 'hue');
  }

  private _onOpacitySliderChanged(value: number): void {
    this._hsva.a = value;
    this._syncColors();
    this._render();
    this._triggerChangeEvent('slider', 'opacity');
  }

  private _setGradientColor(): void {
    const rgba = hsvaToRgba({ h: this._hsva.h, s: 100, v: 100, a: 1 });
    this._adapter.setGradientColor(`rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`);
  }

  private _syncColors(): void {
    this._rgba = hsvaToRgba(this._hsva);
    this._hex = rgbaToHex(this._rgba);
    this._value = this._hex || null;
  }

  private _render(): void {
    this._setGradientColor();
    this._adapter.setPreviewColor(formatRgba(this._rgba));
    this._adapter.setHexInputValue(`#${this._hex}`);
    this._adapter.setRgbaInputValue(this._rgba);
    this._adapter.setHsvaInputValue(this._hsva);
    this._adapter.updateA11y(this._hsva.h, Math.round(this._hsva.a * 100));
  }

  private _emitChangeEvent(type: ColorPickerChangeEventType, source: ColorPickerChangeEventSource): void {
    const data: IColorPickerChangeEventData = {
      type,
      source,
      hex: formatHex(this._hex, false).replace(/^#/, ''),
      rgba: this._rgba,
      hsva: this._hsva
    };
    if (this._allowOpacity) {
      data.alpha = this._hsva.a;
    }
    this._adapter.emitHostEvent(COLOR_PICKER_CONSTANTS.events.CHANGE, data);
  }

  public get value(): Nullable<string> {
    return formatHex(this._hex, false);
  }
  public set value(value: Nullable<string>) {
    if (this._value !== value) {
      this._value = value || DEFAULT_COLOR;

      if (!isValidHex(this._value)) {
        throw new Error('Invalid hex value provided.');
      }

      this._hex = this._value.replace(/^#/, '');
      this._setColorFromHex();
      this._adapter.setHostAttribute(COLOR_PICKER_CONSTANTS.attributes.VALUE, this._value);
    }
  }

  public get rgba(): Nullable<IRGBA> {
    return !!this._rgba ? { ...this._rgba } : null;
  }
  public set rgba(value: Nullable<IRGBA>) {
    if (value) {
      if (isValidRGBA(value)) {
        this.value = rgbaToHex(value);
      }
    } else {
      this.value = null;
    }
  }

  public get hsva(): Nullable<IHSVA> {
    return !!this._hsva ? { ...this._hsva } : null;
  }
  public set hsva(value: Nullable<IHSVA>) {
    if (value) {
      if (isValidHSVA(value)) {
        this.value = rgbaToHex(hsvaToRgba(value));
      }
    } else {
      this.value = null;
    }
  }

  public get opacity(): Nullable<number> {
    return this._hsva ? this._hsva.a : null;
  }
  public set opacity(value: Nullable<number>) {
    if (this._hsva.a !== value) {
      if (value != null && this._allowOpacity) {
        if (value >= 0 && value <= 1) {
          this._hsva.a = value;
          this._syncColors();

          if (this._initialized) {
            this._opacitySlider.setValue(this._hsva.a);
            this._render();
          }
        } else {
          console.warn(`The provided opacity value (${value}) must be between 0 and 1.`);
        }
      }
    }
  }

  public get allowOpacity(): boolean {
    return this._allowOpacity;
  }
  public set allowOpacity(value: boolean) {
    this._allowOpacity = value;
    if (this._initialized) {
      this._initializeOpacity();
    }
  }

  public get debounceChangeEvent(): boolean {
    return this._debounceChangeEvent;
  }
  public set debounceChangeEvent(value: boolean) {
    if (this._debounceChangeEvent !== value) {
      this._debounceChangeEvent = value;
      if (this._initialized) {
        this._applyChangeEventTrigger();
      }
    }
  }
}

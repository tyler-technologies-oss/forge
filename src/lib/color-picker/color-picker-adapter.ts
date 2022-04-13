import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IColorPickerComponent } from './color-picker';
import { ColorPickerValueType, COLOR_PICKER_CONSTANTS, IHSVA, IRGBA } from './color-picker-constants';

export interface IColorPickerAdapter extends IBaseAdapter {
  setPreviewColor(rgbaStyle: string): void;
  setHexInputValue(value: string): void;
  setRgbaInputValue(rgba: IRGBA): void;
  setHsvaInputValue(hsva: IHSVA): void;
  updateA11y(hueValue: number, opacityValue: number): void;
  setGradientColor(value: string): void;
  getHueSliderElement(): HTMLElement;
  getOpacitySliderElement(): HTMLElement;
  getGradientElement(): HTMLElement;
  setActiveValueType(type: ColorPickerValueType): void;
  focusValueInput(type: ColorPickerValueType): void;
  setTypeClickListener(listener: (evt: MouseEvent) => void): void;
  removeTypeClickListener(listener: (evt: MouseEvent) => void): void;
  setHexInputListener(type: string, listener: (evt: Event) => void): void;
  removeHexInputListener(type: string, listener: (evt: Event) => void): void;
  getHexInputValue(): string;
  setRgbaInputListener(type: string, listener: (evt: Event) => void): void;
  removeRgbaInputListener(type: string, listener: (evt: Event) => void): void;
  getRgbaInputValue(): IRGBA;
  setHsvaInputListener(type: string, listener: (evt: Event) => void): void;
  removeHsvaInputListener(type: string, listener: (evt: Event) => void): void;
  getHsvaInputValue(): IHSVA;
  toggleOpacityControls(visible: boolean): void;
}

export class ColorPickerAdapter extends BaseAdapter<IColorPickerComponent> implements IColorPickerAdapter {
  private _gradientElement: HTMLElement;
  private _previewColorElement: HTMLElement;
  private _hexInputElement: HTMLInputElement;
  private _rgbaInputRElement: HTMLInputElement;
  private _rgbaInputGElement: HTMLInputElement;
  private _rgbaInputBElement: HTMLInputElement;
  private _rgbaInputAElement: HTMLInputElement;
  private _hsvaInputHElement: HTMLInputElement;
  private _hsvaInputSElement: HTMLInputElement;
  private _hsvaInputVElement: HTMLInputElement;
  private _hsvaInputAElement: HTMLInputElement;
  private _hueSliderElement: HTMLElement;
  private _hueSliderThumbElement: HTMLElement;
  private _opacitySliderElement: HTMLElement;
  private _opacitySliderThumbElement: HTMLElement;
  private _hexValueContainerElement: HTMLElement;
  private _rgbaValueContainerElement: HTMLElement;
  private _hsvaValueContainerElement: HTMLElement;
  private _typeButtonElement: HTMLButtonElement;

  constructor(component: IColorPickerComponent) {
    super(component);
    this._gradientElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.GRADIENT);
    this._previewColorElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.PREVIEW_COLOR);
    this._hexInputElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.HEX_INPUT) as HTMLInputElement;
    this._rgbaInputRElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_R) as HTMLInputElement;
    this._rgbaInputGElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_G) as HTMLInputElement;
    this._rgbaInputBElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_B) as HTMLInputElement;
    this._rgbaInputAElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_A) as HTMLInputElement;
    this._hsvaInputHElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_H) as HTMLInputElement;
    this._hsvaInputSElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_S) as HTMLInputElement;
    this._hsvaInputVElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_V) as HTMLInputElement;
    this._hsvaInputAElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_A) as HTMLInputElement;
    this._hueSliderElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.HUE_SLIDER);
    this._hueSliderThumbElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.HUE_SLIDER_THUMB);
    this._opacitySliderElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.OPACITY_SLIDER);
    this._opacitySliderThumbElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.OPACITY_SLIDER_THUMB);
    this._hexValueContainerElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HEX_CONTAINER);
    this._rgbaValueContainerElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_RGBA_CONTAINER);
    this._hsvaValueContainerElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.COLOR_VALUE_HSVA_CONTAINER);
    this._typeButtonElement = getShadowElement(component, COLOR_PICKER_CONSTANTS.selectors.TYPE_BUTTON) as HTMLButtonElement;
  }

  public setPreviewColor(rgbaStyle: string): void {
    this._previewColorElement.style.backgroundColor = rgbaStyle;
  }

  public setHexInputValue(value: string): void {
    this._hexInputElement.value = value;
  }

  public setRgbaInputValue(rgba: IRGBA): void {
    this._rgbaInputRElement.value = rgba.r.toString();
    this._rgbaInputGElement.value = rgba.g.toString();
    this._rgbaInputBElement.value = rgba.b.toString();
    this._rgbaInputAElement.value = rgba.a.toString();
  }

  public setHsvaInputValue(hsva: IHSVA): void {
    this._hsvaInputHElement.value = hsva.h.toString();
    this._hsvaInputSElement.value = hsva.s.toString();
    this._hsvaInputVElement.value = hsva.v.toString();
    this._hsvaInputAElement.value = hsva.a.toString();
  }

  public updateA11y(hueValue: number, opacityValue: number): void {
    this._hueSliderThumbElement.setAttribute('aria-valuenow', hueValue.toString());
    this._hueSliderThumbElement.setAttribute('aria-valuetext', hueValue.toString());

    this._opacitySliderThumbElement.setAttribute('aria-valuenow', opacityValue.toString());
    this._opacitySliderThumbElement.setAttribute('aria-valuetext', opacityValue.toString());
  }

  public setGradientColor(value: string): void {
    this._gradientElement.style.backgroundColor = value;
  }

  public getHueSliderElement(): HTMLElement {
    return this._hueSliderElement;
  }

  public getOpacitySliderElement(): HTMLElement {
    return this._opacitySliderElement;
  }

  public getGradientElement(): HTMLElement {
    return this._gradientElement;
  }

  public setActiveValueType(type: ColorPickerValueType): void {
    this._hexValueContainerElement.style.display = 'none';
    this._rgbaValueContainerElement.style.display = 'none';
    this._hsvaValueContainerElement.style.display = 'none';

    switch (type) {
      case ColorPickerValueType.HEX:
        this._hexValueContainerElement.style.removeProperty('display');
        break;
      case ColorPickerValueType.RGBA:
        this._rgbaValueContainerElement.style.removeProperty('display');
        break;
      case ColorPickerValueType.HSVA:
        this._hsvaValueContainerElement.style.removeProperty('display');
        break;
    }
  }

  public focusValueInput(type: ColorPickerValueType): void {
    switch (type) {
      case ColorPickerValueType.HEX:
        this._hexInputElement.focus();
        this._hexInputElement.select();
        break;
      case ColorPickerValueType.RGBA:
        this._rgbaInputRElement.focus();
        this._rgbaInputRElement.select();
        break;
      case ColorPickerValueType.HSVA:
        this._hsvaInputHElement.focus();
        this._hsvaInputHElement.select();
        break;
    }
  }

  public setTypeClickListener(listener: (evt: MouseEvent) => void): void {
    this._typeButtonElement.addEventListener('click', listener);
  }

  public removeTypeClickListener(listener: (evt: MouseEvent) => void): void {
    this._typeButtonElement.removeEventListener('click', listener);
  }

  public setHexInputListener(type: string, listener: (evt: Event) => void): void {
    this._hexInputElement.addEventListener(type, listener);
  }

  public removeHexInputListener(type: string, listener: (evt: Event) => void): void {
    this._hexInputElement.removeEventListener(type, listener);
  }

  public getHexInputValue(): string {
    return this._hexInputElement.value;
  }

  public setRgbaInputListener(type: string, listener: (evt: Event) => void): void {
    this._rgbaInputRElement.addEventListener(type, listener);
    this._rgbaInputGElement.addEventListener(type, listener);
    this._rgbaInputBElement.addEventListener(type, listener);
    this._rgbaInputAElement.addEventListener(type, listener);
  }

  public removeRgbaInputListener(type: string, listener: (evt: Event) => void): void {
    this._rgbaInputRElement.removeEventListener(type, listener);
    this._rgbaInputGElement.removeEventListener(type, listener);
    this._rgbaInputBElement.removeEventListener(type, listener);
    this._rgbaInputAElement.removeEventListener(type, listener);
  }

  public getRgbaInputValue(): IRGBA {
    return {
      r: parseInt(this._rgbaInputRElement.value, 10),
      g: parseInt(this._rgbaInputGElement.value, 10),
      b: parseInt(this._rgbaInputBElement.value, 10),
      a: parseFloat(this._rgbaInputAElement.value)
    };
  }

  public setHsvaInputListener(type: string, listener: (evt: Event) => void): void {
    this._hsvaInputHElement.addEventListener(type, listener);
    this._hsvaInputSElement.addEventListener(type, listener);
    this._hsvaInputVElement.addEventListener(type, listener);
    this._hsvaInputAElement.addEventListener(type, listener);
  }

  public removeHsvaInputListener(type: string, listener: (evt: Event) => void): void {
    this._hsvaInputHElement.removeEventListener(type, listener);
    this._hsvaInputSElement.removeEventListener(type, listener);
    this._hsvaInputVElement.removeEventListener(type, listener);
    this._hsvaInputAElement.removeEventListener(type, listener);
  }

  public getHsvaInputValue(): IHSVA {
    return {
      h: parseInt(this._hsvaInputHElement.value, 10),
      s: parseInt(this._hsvaInputSElement.value, 10),
      v: parseInt(this._hsvaInputVElement.value, 10),
      a: parseFloat(this._hsvaInputAElement.value)
    };
  }

  public toggleOpacityControls(visible: boolean): void {
    if (visible) {
      this._opacitySliderElement.style.removeProperty('display');
      if (this._rgbaInputAElement.parentElement) {
        this._rgbaInputAElement.parentElement.style.removeProperty('display');
      }
      if (this._hsvaInputAElement.parentElement) {
        this._hsvaInputAElement.parentElement.style.removeProperty('display');
      }
    } else {
      this._opacitySliderElement.style.display = 'none';
      if (this._rgbaInputAElement.parentElement) {
        this._rgbaInputAElement.parentElement.style.display = 'none';
      }
      if (this._hsvaInputAElement.parentElement) {
        this._hsvaInputAElement.parentElement.style.display = 'none';
      }
    }
  }
}

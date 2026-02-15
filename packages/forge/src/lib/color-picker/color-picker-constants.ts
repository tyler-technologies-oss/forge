import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}color-picker`;

const attributes = {
  VALUE: 'value',
  ALLOW_OPACITY: 'allow-opacity',
  DEBOUNCE_CHANGE_EVENT: 'debounce-change-event'
};

const classes = {
  SLIDER_THUMB_ACTIVE: 'forge-color-picker__slider-thumb--active',
  GRADIENT_THUMB_ACTIVE: 'forge-color-picker__gradient-thumb--active'
};

const selectors = {
  GRADIENT: '.forge-color-picker__gradient',
  GRADIENT_THUMB: '.forge-color-picker__gradient-thumb',
  PREVIEW_COLOR: '.forge-color-picker__color-preview',
  HEX_INPUT: '#forge-color-picker-hex-input',
  RGBA_INPUT: '#forge-color-picker-rgba-input',
  HSVA_INPUT: '#forge-color-picker-hsva-input',
  HUE_SLIDER: '.forge-color-picker__hue-slider',
  HUE_SLIDER_THUMB: '#forge-color-picker-hue-thumb',
  OPACITY_SLIDER: '.forge-color-picker__opacity-slider',
  OPACITY_SLIDER_THUMB: '#forge-color-picker-opacity-thumb',
  SLIDER: '.forge-color-picker__slider',
  SLIDER_THUMB: '.forge-color-picker__slider-thumb',
  COLOR_VALUE_HEX_CONTAINER: '.forge-color-picker__color-hex',
  COLOR_VALUE_RGBA_CONTAINER: '.forge-color-picker__color-rgba',
  COLOR_VALUE_HSVA_CONTAINER: '.forge-color-picker__color-hsva',
  TYPE_BUTTON: '#forge-color-picker-type-button',
  COLOR_VALUE_RGBA_R: '#forge-color-picker-rgba-r-input',
  COLOR_VALUE_RGBA_G: '#forge-color-picker-rgba-g-input',
  COLOR_VALUE_RGBA_B: '#forge-color-picker-rgba-b-input',
  COLOR_VALUE_RGBA_A: '#forge-color-picker-rgba-a-input',
  COLOR_VALUE_HSVA_H: '#forge-color-picker-hsva-h-input',
  COLOR_VALUE_HSVA_S: '#forge-color-picker-hsva-s-input',
  COLOR_VALUE_HSVA_V: '#forge-color-picker-hsva-v-input',
  COLOR_VALUE_HSVA_A: '#forge-color-picker-hsva-a-input'
};

const events = {
  CHANGE: `${elementName}-change`
};

const numbers = {
  CHANGE_EVENT_DEBOUNCE_THRESHOLD: 200
};

export const COLOR_PICKER_CONSTANTS = {
  elementName,
  attributes,
  events,
  classes,
  selectors,
  numbers
};

export const DEFAULT_COLOR = '000000';

export enum ColorPickerValueType {
  HEX = 'hex',
  RGB = 'rgb',
  RGBA = 'rgba',
  HSV = 'hsv',
  HSVA = 'hsva'
}

export interface IRGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface IHSVA {
  h: number;
  s: number;
  v: number;
  a: number;
}

export type ColorPickerChangeEventType = 'slider' | 'input';
export type ColorPickerChangeEventSource = 'gradient' | 'hue' | 'opacity' | 'hex' | 'rgba' | 'hsva';

export interface IColorPickerChangeEventData {
  type: ColorPickerChangeEventType;
  source: ColorPickerChangeEventSource;
  hex: string;
  rgba: IRGBA;
  hsva: IHSVA;
  alpha?: number;
}

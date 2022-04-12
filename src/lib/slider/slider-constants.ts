import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}slider`;

const attributes = {
  TYPE: 'type',
  VALUE: 'value',
  VALUE_START: 'value-start',
  MIN: 'min',
  MAX: 'max',
  STEP: 'step',
  DISABLED: 'disabled',
  COLOR: 'color'
};

const selectors = {
  ROOT: '.mdc-slider',
  THUMB: '.mdc-slider__thumb[part=thumb],.mdc-slider__thumb[part=\'thumb-end\']',
  THUMB_START: '.mdc-slider__thumb[part=\'thumb-start\']',
  VALUE_INPUT: 'input[id=\'value-input\']',
  VALUE_INPUT_START: 'input[id=\'value-input-start\']',
  TRACK_CONTAINER: '.mdc-slider__track-container',
  TRACK_ACTIVE_FILL: '.mdc-slider__track--active_fill'
};

const events = {
  MDC_INPUT: 'MDCSlider:input',
  MDC_CHANGE: 'MDCSlider:change',
  FORGE_INPUT: 'forge-slider-input',
  FORGE_CHANGE: 'forge-slider-change'
};

export const SLIDER_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  events
};

export interface ISliderInputEventData {
  value?: number;
  valueStart?: number;
  valueEnd?: number;
}

export interface ISliderChangeEventData extends ISliderInputEventData {}

export type SliderType = 'continuous' | 'discrete' | 'discrete-markers' | 'continuous-range' | 'discrete-range' | 'discrete-range-markers';

import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}slider`;

const attributes = {
  ARIA_LABEL: 'data-aria-label',
  ARIA_LABEL_START: 'data-aria-label-start',
  ARIA_LABEL_END: 'data-aria-label-end',
  VALUE: 'value',
  VALUE_START: 'value-start',
  VALUE_END: 'value-end',
  MIN: 'min',
  MAX: 'max',
  STEP: 'step',
  TICKMARKS: 'tickmarks',
  LABELED: 'labeled',
  RANGE: 'range',
  DISABLED: 'disabled',
  READONLY: 'readonly'
};

const selectors = {
  ROOT: '.forge-slider',
  TRACK: '.forge-slider__track',
  HANDLE_CONTAINER: '.handle-container',
  START_INPUT: 'input.start',
  END_INPUT: 'input.end',
  START_HANDLE: '.handle.start',
  START_HANDLE_THUMB: '.handle.start .handle-nub',
  END_HANDLE: '.handle.end',
  END_HANDLE_THUMB: '.handle.end .handle-nub',
  START_LABEL: '.handle.start .label',
  START_LABEL_CONTENT: '.handle.start .label-content',
  END_LABEL: '.handle.end .label',
  END_LABEL_CONTENT: '.handle.end .label-content',
  START_RIPPLE_SURFACE: '.handle.start .forge-slider__handle-ripple',
  END_RIPPLE_SURFACE: '.handle.end .forge-slider__handle-ripple',
  LABEL: '.label',
  INPUT: 'input[type=range]'
};

const classes = {
  RANGE: 'forge-slider--range',
  TICKMARKS: 'forge-slider__track--tickmarks',
  ON_TOP: 'on-top',
  OVERLAPPING: 'overlapping',
  HOVER: 'hover'
};

const events = {
  INPUT: 'forge-slider-input',
  CHANGE: 'forge-slider-change'
};

const cssCustomProperties = {
  START_FRACTION: '--_start-fraction',
  END_FRACTION: '--_end-fraction',
  TICK_COUNT: '--_tick-count'
};

const numbers = {
  DEFAULT_STEP: 1
};

export const SLIDER_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  classes,
  events,
  numbers,
  cssCustomProperties
};

export interface ISliderInputEventData {
  value: number;
}

export interface ISliderRangeInputEventData {
  valueStart: number;
  valueEnd: number;
}

export interface ISliderChangeEventData extends ISliderInputEventData {}
export interface ISliderRangeChangeEventData extends ISliderRangeInputEventData {}

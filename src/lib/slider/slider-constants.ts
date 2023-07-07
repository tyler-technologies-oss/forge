import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}slider`;

const attributes = {
  ARIA_LABEL: 'data-aria-label',
  ARIA_LABEL_START: 'data-aria-label-start',
  ARIA_LABEL_END: 'data-aria-label-end',
  VALUE: 'value',
  VALUE_START: 'value-start',
  VALUE_END: 'value-end',
  LABEL: 'label',
  LABEL_START: 'label-start',
  LABEL_END: 'label-end',
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
  TRACK: '.track',
  HANDLE_CONTAINER: '.handle-container',
  START_INPUT: 'input.start',
  END_INPUT: 'input.end',
  START_HANDLE: '.handle.start',
  START_HANDLE_THUMB: '.handle.start .handle-thumb',
  END_HANDLE: '.handle.end',
  END_HANDLE_THUMB: '.handle.end .handle-thumb',
  START_LABEL: '.handle.start .handle-label',
  START_LABEL_CONTENT: '.handle.start .handle-label-content',
  END_LABEL: '.handle.end .handle-label',
  END_LABEL_CONTENT: '.handle.end .handle-label-content',
  START_RIPPLE_SURFACE: '.handle.start .handle-ripple',
  END_RIPPLE_SURFACE: '.handle.end .handle-ripple',
  LABEL: '.handle-label',
  INPUT: 'input[type=range]'
};

const classes = {
  RANGE: 'range',
  TICKMARKS: 'tickmarks',
  ON_TOP: 'on-top',
  OVERLAPPING: 'overlapping',
  HOVER: 'hover',
  HANDLE: 'handle',
  HANDLE_RIPPLE: 'handle-ripple',
  HANDLE_THUMB: 'handle-thumb',
  HANDLE_START: 'start',
  HANDLE_LABEL: 'handle-label',
  LABEL: 'handle-label',
  LABEL_CONTENT: 'handle-label-content'
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
  DEFAULT_STEP: 1,
  DEFAULT_VALUE: 50,
  DEFAULT_START_VALUE: 33,
  DEFAULT_END_VALUE: 67
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

export interface ISliderRangeEventData {
  valueStart: number;
  valueEnd: number;
}

export type SliderLabelBuilder = (value: number, which?: 'start' | 'end') => string;

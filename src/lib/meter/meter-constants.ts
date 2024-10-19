import { COMPONENT_NAME_PREFIX, Theme } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}meter`;

const observedAttributes = {
  VALUE: 'value',
  MIN: 'min',
  MAX: 'max',
  LOW: 'low',
  HIGH: 'high',
  TICKMARKS: 'tickmarks',
  DENSITY: 'density',
  THEME: 'theme',
  MUTED: 'muted',
  SHAPE: 'shape',
  INNER_SHAPE: 'inner-shape'
};

const attributes = {
  ...observedAttributes
};

const numbers = {
  DEFAULT_VALUE: 0,
  DEFAULT_MIN: 0,
  DEFAULT_MAX: 1,
  DEFAULT_LOW: 0,
  DEFAULT_HIGH: 1
};

export const METER_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  numbers
};

export type MeterDensity = 'default' | 'small' | 'medium' | 'large';
export type MeterShape = 'default' | 'round' | 'squared';
export type MeterInnerShape = 'default' | 'inherit';
export type MeterStatus = 'low' | 'middle' | 'high';
export type MeterTheme = Theme | 'default';

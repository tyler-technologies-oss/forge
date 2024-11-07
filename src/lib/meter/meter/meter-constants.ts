import { COMPONENT_NAME_PREFIX, Theme } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}meter`;

const numbers = {
  DEFAULT_VALUE: 0,
  DEFAULT_MIN: 0,
  DEFAULT_MAX: 1
};

const events = {
  CHANGE: 'change'
};

export const METER_CONSTANTS = {
  elementName,
  numbers,
  events
};

export type MeterDensity = 'default' | 'small' | 'medium' | 'large';
export type MeterShape = 'default' | 'round' | 'squared';
export type MeterInnerShape = 'default' | 'inherit';
export type MeterStatus = 'optimal' | 'suboptimal' | 'least-optimal';
export type MeterTheme = Theme | 'default';

import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}backdrop`;

const selectors = {
  CONTAINER: '.forge-backdrop'
};

const numbers = {
  OPACITY: 0.54,
  DELAY: 0,
  TRANSITION_DURATION: 150
};

const attributes = {
  DELAY: 'delay',
  MAX_OPACITY: 'max-opacity',
  APPEARANCE: 'appearance',
  FIXED: 'fixed'
};

const events = {
  BACKDROP_CLICK: `${elementName}-click`
};

export const BACKDROP_CONSTANTS = {
  elementName,
  selectors,
  numbers,
  attributes,
  events
};

export type BackdropAppearance = 'light' | 'dark' | undefined;

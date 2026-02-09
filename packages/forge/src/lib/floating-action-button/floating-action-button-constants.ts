import { COMPONENT_NAME_PREFIX, Density, Theme } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}fab`;

const observedAttributes = {
  THEME: 'theme',
  DENSITY: 'density',
  ELEVATION: 'elevation'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  LABEL_SLOT: 'slot[name=label]'
};

const classes = {
  EXTENDED: `${elementName}--extended`
};

const defaults = {
  DEFAULT_THEME: 'secondary' as Theme,
  DEFAULT_DENSITY: 'medium' as FloatingActionButtonDensity,
  DEFAULT_ELEVATION: 'raised' as FloatingActionButtonElevation
};

export const FLOATING_ACTION_BUTTON_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  classes,
  defaults
};

export type FloatingActionButtonDensity = Density;
export type FloatingActionButtonElevation = 'raised' | 'lowered';

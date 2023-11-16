import { COMPONENT_NAME_PREFIX, Density } from '../constants';

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

export const FLOATING_ACTION_BUTTON_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  classes
};

export type FloatingActionButtonDensity = Density;
export type FloatingActionButtonElevation = 'raised' | 'lowered';

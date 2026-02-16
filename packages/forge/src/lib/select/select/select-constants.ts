import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}select`;

const selectors = {
  FIELD: '#field',
  SELECTED_TEXT: '#selected-text',
  LABEL: '#select-label'
};

const observedAttributes = {
  OPEN: 'open',
  TYPE: 'type',
  VALUE: 'value',
  LABEL: 'label',
  MULTIPLE: 'multiple',
  DISABLED: 'disabled',
  PLACEHOLDER: 'placeholder',
  OBSERVE_SCROLL: 'observe-scroll',
  OBSERVE_SCROLL_THRESHOLD: 'observe-scroll-threshold',
  SHOW_SELECT_ALL: 'show-select-all',
  SELECT_ALL_LABEL: 'select-all-label'
};

const attributes = {
  ...observedAttributes
};

const events = {
  SCROLLED_BOTTOM: `${elementName}-scrolled-bottom`,
  SELECT_ALL: `${elementName}-select-all`
};

export const SELECT_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  events
};

export { type FieldDensity as SelectDensityType, type FieldShape as SelectShapeType } from '../../field/base/base-field-constants.js';

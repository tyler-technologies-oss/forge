import { COMPONENT_NAME_PREFIX } from '../../constants';

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
  OBSERVE_SCROLL_THRESHOLD: 'observe-scroll-threshold'
};

const attributes = {
  ...observedAttributes
};

const events = {
  SCROLLED_BOTTOM: `${elementName}-scrolled-bottom`
};

export const SELECT_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  events
};

export {
  type FieldDensity as SelectDensityType,
  type FieldShape as SelectShapeType
} from '../../field-next/base/base-field-constants';

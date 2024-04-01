import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}label-value`;

const observedAttributes = {
  EMPTY: 'empty',
  ELLIPSIS: 'ellipsis',
  DENSITY: 'density',
  ALIGN: 'align'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  ROOT: '.forge-label-value'
};

export const LABEL_VALUE_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors
};

export type LabelValueAlignment = 'start' | 'center' | 'end';

export { type FieldDensity as LabelValueDensityType } from '../field-next/base/base-field-constants';

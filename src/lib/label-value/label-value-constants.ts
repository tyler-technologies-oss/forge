import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}label-value`;

const attributes = {
  EMPTY: 'empty',
  ELLIPSIS: 'ellipsis',
  DENSITY: 'density',
  ALIGN: 'align'
};

const classes = {
  EMPTY: 'forge-label-value--empty',
  ELLIPSIS: 'forge-label-value--ellipsis',
  DENSE: 'forge-label-value--dense',
  ROOMY: 'forge-label-value--roomy',
  ALIGN_CENTER: 'forge-label-value--align-center',
  ALIGN_RIGHT: 'forge-label-value--align-right'
};

const selectors = {
  ROOT: '.forge-label-value'
};

export const LABEL_VALUE_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors
};

export type LabelValueAlignment = 'left' | 'center' | 'right';
export { FieldDensityType as LabelValueDensityType } from '../field/field-constants';

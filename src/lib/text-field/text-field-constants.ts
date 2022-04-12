import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}text-field`;

const attributes = {
  MULTI_INPUT: 'data-forge-multi-input',
  MULTI_INPUT_SEPARATOR: 'data-forge-multi-input-separator'
};

const classes = {
  ROOT: 'forge-text-field',
  MULTI_INPUT: 'forge-text-field--multi-input',
  TEXTAREA: 'forge-text-field--textarea'
};

const selectors = {
  ROOT: `.${classes.ROOT}`
};

export const TEXT_FIELD_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors
};

export {
  FieldDensityType as TextFieldDensityType,
  FieldFloatLabelType as TextFieldFloatLabelType,
  FieldShapeType as TextFieldShapeType
} from '../field/field-constants';

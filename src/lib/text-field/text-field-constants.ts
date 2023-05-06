import { COMPONENT_NAME_PREFIX } from '../constants';
import { FIELD_CONSTANTS } from '../field/field-constants';
import { SPINNER_CONSTANTS } from '../spinner';

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
  ROOT: `.${classes.ROOT}`,
  SPINNER: `${SPINNER_CONSTANTS.elementName}`
};

const observedInputAttributes = [...FIELD_CONSTANTS.observedInputAttributes, 'type', 'min', 'max', 'step'];

export const TEXT_FIELD_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors,
  observedInputAttributes
};

export {
  type FieldDensityType as TextFieldDensityType,
  type FieldFloatLabelType as TextFieldFloatLabelType,
  type FieldShapeType as TextFieldShapeType
} from '../field/field-constants';

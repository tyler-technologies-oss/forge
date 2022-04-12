import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}chip-field`;

const classes = {
  ROOT: 'forge-chip-field'
};

const slots = {
  LABEL: 'label',
  HELPER_TEXT: 'helper-text',
  MEMBER: 'member'
};

const selectors = {
  ROOT: `.${classes.ROOT}`,
  INPUT_CONTAINER: '.forge-field__input-container',
  INPUT: 'input',
  LABEL: `[slot=${slots.LABEL}]`,
  HELPER_TEXT: `[slot=${slots.HELPER_TEXT}]`,
  MEMBER: `[slot=${slots.MEMBER}]`,
  LABEL_SLOT: `slot[name=${slots.LABEL}]`,
  MEMBER_SLOT: `slot[name=${slots.MEMBER}]`
};

const events = {
  MEMBER_ADDED: `${elementName}-member-added`,
  MEMBER_REMOVED: `${elementName}-member-removed`
};

export const CHIP_FIELD_CONSTANTS = {
  elementName,
  classes,
  slots,
  selectors,
  events
};

export {
  FieldDensityType as ChipFieldDensityType,
  FieldFloatLabelType as ChipFieldFloatLabelType,
  FieldShapeType as ChipFieldShapeType
} from '../field/field-constants';

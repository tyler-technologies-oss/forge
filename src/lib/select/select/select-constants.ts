import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}select`;

const classes = {
  ROOT: 'forge-select',
  OPENED: 'forge-select--opened',
  SELECTED_TEXT: 'forge-select__selected-text',
  DROPDOWN: 'forge-select__dropdown',
  LABEL_FLOAT: 'forge-select--label-float',
  GROUP_WRAPPER: 'forge-select__group-wrapper'
};

const selectors = {
  ROOT: `.${classes.ROOT}`,
  SELECTED_TEXT: `.${classes.SELECTED_TEXT}`,
  LABEL: 'label#select-label',
  LEADING_SLOT: 'slot[name=leading]',
  ADDON_END_SLOT: 'slot[name=addon-end]'
};

const attributes = {
  TYPE: 'type',
  VALUE: 'value',
  LABEL: 'label',
  MULTIPLE: 'multiple',
  DISABLED: 'disabled',
  PLACEHOLDER: 'placeholder',
  OBSERVE_SCROLL: 'observe-scroll',
  OBSERVE_SCROLL_THRESHOLD: 'observe-scroll-threshold'
};

const events = {
  SCROLLED_BOTTOM: `${elementName}-scrolled-bottom`
};

export const SELECT_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  events
};

export {
  type FieldDensityType as SelectDensityType,
  type FieldFloatLabelType as SelectFloatLabelType,
  type FieldShapeType as SelectShapeType
} from '../../field/field-constants';

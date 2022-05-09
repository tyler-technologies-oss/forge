import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}checkbox`;

const classes = {
  CONTAINER: 'forge-checkbox-container',
  ROOT: 'mdc-checkbox',
  CHECKBOX: 'mdc-checkbox',
  CHECKBOX_DENSE: 'forge-checkbox--dense',
  ANIM_CHECKED_INDETERMINATE: 'mdc-checkbox--anim-checked-indeterminate',
  ANIM_CHECKED_UNCHECKED: 'mdc-checkbox--anim-checked-unchecked',
  ANIM_INDETERMINATE_CHECKED: 'mdc-checkbox--anim-indeterminate-checked',
  ANIM_INDETERMINATE_UNCHECKED: 'mdc-checkbox--anim-indeterminate-unchecked',
  ANIM_UNCHECKED_CHECKED: 'mdc-checkbox--anim-unchecked-checked',
  ANIM_UNCHECKED_INDETERMINATE: 'mdc-checkbox--anim-unchecked-indeterminate',
  BACKGROUND: 'mdc-checkbox__background',
  CHECKMARK: 'mdc-checkbox__checkmark',
  CHECKMARK_PATH: 'mdc-checkbox__checkmark-path',
  DISABLED: 'mdc-checkbox--disabled',
  WRAPPER_DISABLED: 'forge-checkbox-wrapper--disabled',
  MIXEDMARK: 'mdc-checkbox__mixedmark',
  SELECTED: 'mdc-checkbox--selected',
  UPGRADED: 'mdc-checkbox--upgraded',
  CHECKED: 'forge-checkbox--checked',
  INDETERMINATE: 'forge-checkbox--indeterminate',
  FOCUSED: 'forge-checkbox--focused',
  ENABLED: 'forge-checkbox--enabled'
};

const selectors = {
  INPUT: 'input',
  LABEL: 'label',
  ROOT: `.${classes.ROOT}`,
  WRAPPER: '.forge-checkbox-wrapper'
};

const attributes = {
  DENSE: 'dense',
  CHECKED: 'checked',
  SLOT: 'slot',
  DISABLED: 'disabled',
  INDETERMINATE: 'indeterminate'
};

export const strings = {
  ARIA_CHECKED_ATTR: 'aria-checked',
  ARIA_CHECKED_INDETERMINATE_VALUE: 'mixed',
  DATA_INDETERMINATE_ATTR: 'data-indeterminate',
  NATIVE_CONTROL_SELECTOR: '.mdc-checkbox__native-control',
  TRANSITION_STATE_CHECKED: 'checked',
  TRANSITION_STATE_INDETERMINATE: 'indeterminate',
  TRANSITION_STATE_INIT: 'init',
  TRANSITION_STATE_UNCHECKED: 'unchecked'
};

const CB_PROTO_PROPS = ['checked', 'indeterminate', 'disabled'];

export const numbers = {
  ANIM_END_LATCH_MS: 250
};

export const CHECKBOX_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  strings,
  CB_PROTO_PROPS,
  numbers
};

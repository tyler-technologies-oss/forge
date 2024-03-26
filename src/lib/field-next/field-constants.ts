import { COMPONENT_NAME_PREFIX } from '../constants';
import { LABEL_CONSTANTS } from '../label';
import { BASE_FIELD_CONSTANTS } from './base/base-field-constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}field`;

const observedAttributes = {
  ...BASE_FIELD_CONSTANTS.observedAttributes,
  POPOVER_EXPANDED: 'popover-expanded',
  MULTILINE: 'multiline',
  FOCUS_INDICATOR_ALLOW_FOCUS: 'focus-indicator-allow-focus',
  FOCUS_INDICATOR_FOCUS_MODE: 'focus-indicator-focus-mode'
};

const attributes = {
  ...observedAttributes,
  MULTI_INPUT_SEPARATOR: 'data-forge-multi-input-separator'
};

const classes = {
  FLOATING_IN: 'forge-field--floating-in',
  FLOATING_OUT: 'forge-field--floating-out',
  HAS_LABEL: 'forge-field--has-label',
  HAS_START: 'forge-field--has-start',
  HAS_END: 'forge-field--has-end',
  HAS_ACCESSORY: 'forge-field--has-accessory',
  HAS_SUPPORT_START: 'forge-field--has-support-text-start',
  HAS_SUPPORT_END: 'forge-field--has-support-text-end',
  RESIZE_CONTAINER: 'resize-container'
};

const selectors = {
  ROOT: '#root',
  CONTAINER: '#container',
  LABEL: '#label',
  POPOVER_ICON: '#popover-icon',
  RESIZE_CONTAINER: `.${classes.RESIZE_CONTAINER}`,
  LABEL_ELEMENTS: `:where(label, ${LABEL_CONSTANTS.elementName})`,
  POPOVER_TARGET: '.popover-target'
};

const parts = {
  ROOT: 'root',
  LABEL: 'label',
  CONTAINER: 'container',
  START: 'start',
  INPUT: 'input',
  POPOVER_ICON: 'popover-icon',
  END: 'end',
  ACCESSORY: 'accessory',
  SUPPORT_TEXT: 'support-text',
  SUPPORT_TEXT_START: 'support-text-start',
  SUPPORT_TEXT_END: 'support-text-end',
  FOCUS_INDICATOR: 'focus-indicator'
};

const events = {
  POPOVER_ICON_CLICK: `${elementName}-popover-icon-click`
};

const defaults = {
  ...BASE_FIELD_CONSTANTS.defaults
};

const animations = {
  FLOAT_IN_LABEL: 'float-in-label-animation',
  FLOAT_OUT_LABEL: 'float-out-label-animation'
};

export const FIELD_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  classes,
  selectors,
  parts,
  events,
  defaults,
  animations
};

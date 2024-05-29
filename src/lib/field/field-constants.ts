import { COMPONENT_NAME_PREFIX } from '../constants';
import { LABEL_CONSTANTS } from '../label';
import { BASE_FIELD_CONSTANTS } from './base/base-field-constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}field`;

const observedAttributes = {
  ...BASE_FIELD_CONSTANTS.observedAttributes,
  MULTILINE: 'multiline',
  FOCUS_INDICATOR_ALLOW_FOCUS: 'focus-indicator-allow-focus',
  FOCUS_INDICATOR_FOCUS_MODE: 'focus-indicator-focus-mode'
};

const attributes = {
  ...observedAttributes,
  MULTI_INPUT_SEPARATOR: 'data-forge-multi-input-separator'
};

const classes = {
  FLOATING_IN: 'floating-in',
  FLOATING_OUT: 'floating-out',
  HAS_LABEL: 'has-label',
  HAS_START: 'has-start',
  HAS_END: 'has-end',
  HAS_ACCESSORY: 'has-accessory',
  HAS_SUPPORT_START: 'has-support-text-start',
  HAS_SUPPORT_END: 'has-support-text-end'
};

const selectors = {
  ROOT: '#root',
  CONTAINER: '#container',
  LABEL: '#label',
  POPOVER_ICON: '#popover-icon',
  LABEL_ELEMENTS: `:where(label, ${LABEL_CONSTANTS.elementName})`,
  POPOVER_TARGET: '.popover-target'
};

const parts = {
  ROOT: 'root',
  LABEL: 'label',
  SURFACE: 'surface',
  START: 'start',
  INPUT: 'input',
  END: 'end',
  POPOVER_ICON: 'popover-icon',
  ACCESSORY: 'accessory',
  SUPPORT_TEXT: 'support-text',
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

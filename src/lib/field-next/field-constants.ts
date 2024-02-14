import { COMPONENT_NAME_PREFIX, Density, Theme } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}field`;

const observedAttributes = {
  LABEL_POSITION: 'label-position',
  LABEL_ALIGNMENT: 'label-alignment',
  FLOAT_LABEL: 'float-label',
  INVALID: 'invalid',
  REQUIRED: 'required',
  OPTIONAL: 'optional',
  DISABLED: 'disabled',
  VARIANT: 'variant',
  THEME: 'theme',
  SHAPE: 'shape',
  DENSITY: 'density',
  DENSE: 'dense',
  POPOVER_ICON: 'popover-icon',
  POPOVER_EXPANDED: 'popover-expanded',
  MULTILINE: 'multiline',
  SUPPORT_TEXT_INSET: 'support-text-inset'
};

const attributes = {
  ...observedAttributes
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
  LABEL_SLOT: 'slot[name=label]',
  START_SLOT: 'slot[name=start]',
  END_SLOT: 'slot[name=end]',
  ACCESSORY_SLOT: 'slot[name=accessory]',
  SUPPORT_START_SLOT: 'slot[name=support-text-start]',
  SUPPORT_END_SLOT: 'slot[name=support-text-end]',
  POPOVER_ICON: '#popover-icon',
  RESIZE_CONTAINER: `.${classes.RESIZE_CONTAINER}`
};

const events = {
  POPOVER_ICON_CLICK: `${elementName}-popover-icon-click`
};

const defaults = {
  DEFAULT_VARIANT: 'outlined' as FieldVariant,
  DEFAULT_THEME: 'default' as FieldTheme,
  DEFAULT_SHAPE: 'default' as FieldShape,
  DEFAULT_DENSITY: 'medium' as FieldDensity,
  DEFAULT_LABEL_POSITION: 'inset' as FieldLabelPosition,
  DEFAULT_LABEL_ALIGNMENT: 'default' as FieldLabelAlignment,
  DEFAULT_SUPPORT_TEXT_INSET: 'none' as FieldSupportTextInset
};

const animations = {
  FLOAT_IN_LABEL: 'float-in-label-animation',
  FLOAT_OUT_LABEL: 'float-out-label-animation'
};

const values = {
  ANIMATION_TIMEOUT_DURATION: 1000
};

export const FIELD_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  classes,
  selectors,
  events,
  defaults,
  animations,
  values
};

export type FieldVariant = 'plain' | 'outlined' | 'tonal' | 'filled' | 'raised';
export type FieldTheme = Theme | 'default';
export type FieldShape = 'default' | 'rounded' | 'squared';
export type FieldDensity = Density | 'extra-small' | 'extra-large';
export type FieldLabelPosition = 'inline-start' | 'inline-end' | 'block-start' | 'inset' | 'none';
export type FieldLabelAlignment = 'default' | 'center' | 'baseline' | 'start' | 'end';
export type FieldSupportTextInset = 'start' | 'end' | 'both' | 'none';
export type FieldSlot = 'label' | 'start' | 'end' | 'accessory' | 'support-start' | 'support-end';

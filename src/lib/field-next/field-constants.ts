import { COMPONENT_NAME_PREFIX, Density, Theme } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}field`;

const attributes = {
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

const classes = {
  FLOATING: 'forge-field--floating',
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
  DEFAUL_SHAPE: 'default' as FieldShape,
  DEFAULT_DENSITY: 'medium' as FieldDensity,
  DEFAULT_LABEL_POSITION: 'inset' as FieldLabelPosition,
  DEFAULT_LABEL_ALIGNMENT: 'default' as FieldLabelAlignment,
  DEFAULT_SUPPORT_TEXT_INSET: 'none' as FieldSupportTextInset
};

const animations = {
  FLOATING_INPUT: 'floating-input-animation'
};

export const FIELD_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors,
  events,
  defaults,
  animations
};

export type FieldVariant = 'plain' | 'outlined' | 'tonal' | 'filled' | 'raised';
export type FieldTheme = Theme | 'default';
export type FieldShape = 'default' | 'rounded' | 'squared';
export type FieldDensity = Density | 'extra-small' | 'extra-large';
export type FieldLabelPosition = 'inline-start' | 'inline-end' | 'block-start' | 'inset' | 'none';
export type FieldLabelAlignment = 'default' | 'centered' | 'baseline' | 'start' | 'end';
export type FieldSupportTextInset = 'start' | 'end' | 'both' | 'none';
export type FieldSlot = 'start' | 'end' | 'accessory' | 'support-start' | 'support-end';

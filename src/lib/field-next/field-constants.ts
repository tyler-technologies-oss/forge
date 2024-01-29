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
  DENSITY: 'density',
  DENSE: 'dense',
  POPOVER_ICON: 'popover-icon',
  POPOVER_EXPANDED: 'popover-expanded'
};

const classes = {
  FLOATING: 'forge-field--floating',
  HAS_START: 'forge-field--has-start',
  HAS_END: 'forge-field--has-end',
  HAS_ACCESSORY: 'forge-field--has-accessory',
  HAS_HELPER_START: 'forge-field--has-helper-start',
  HAS_HELPER_END: 'forge-field--has-helper-end'
};

const selectors = {
  ROOT: '#root',
  CONTAINER: '#container',
  LABEL: '#label',
  START_SLOT: 'slot[name=start]',
  END_SLOT: 'slot[name=end]',
  ACCESSORY_SLOT: 'slot[name=accessory]',
  HELPER_START_SLOT: 'slot[name=helper-text-start]',
  HELPER_END_SLOT: 'slot[name=helper-text-end]',
  POPOVER_ICON: '#popover-icon'
};

const events = {
  POPOVER_ICON_CLICK: `${elementName}-popover-icon-click`
};

const defaults = {
  DEFAULT_VARIANT: 'outlined' as FieldVariant,
  DEFAULT_THEME: 'default' as FieldTheme,
  DEFAULT_DENSITY: 'medium' as FieldDensity,
  DEFAULT_LABEL_POSITION: 'inline-start' as FieldLabelPosition,
  DEFAULT_LABEL_ALIGNMENT: 'default' as FieldLabelAlignment
};

export const FIELD_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors,
  events,
  defaults
};

export type FieldVariant = 'plain' | 'outlined' | 'tonal' | 'filled' | 'raised';
export type FieldTheme = Theme | 'default';
export type FieldDensity = Density | 'extra-small' | 'extra-large';
export type FieldLabelPosition = 'inline-start' | 'inline-end' | 'block-start' | 'inset' | 'none';
export type FieldLabelAlignment = 'default' | 'centered' | 'baseline' | 'start' | 'end';
export type FieldSlot = 'start' | 'end' | 'accessory' | 'helper-start' | 'helper-end';

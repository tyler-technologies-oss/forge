import { Density, Theme } from '../../constants';

const observedAttributes = {
  LABEL_POSITION: 'label-position',
  LABEL_ALIGNMENT: 'label-alignment',
  INVALID: 'invalid',
  REQUIRED: 'required',
  OPTIONAL: 'optional',
  DISABLED: 'disabled',
  FLOAT_LABEL: 'float-label',
  VARIANT: 'variant',
  THEME: 'theme',
  SHAPE: 'shape',
  DENSITY: 'density',
  DENSE: 'dense',
  POPOVER_ICON: 'popover-icon',
  SUPPORT_TEXT_INSET: 'support-text-inset'
};

const attributes = {
  ...observedAttributes
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

export const BASE_FIELD_CONSTANTS = {
  observedAttributes,
  attributes,
  defaults
};

export type FieldVariant = 'plain' | 'outlined' | 'tonal' | 'filled' | 'raised';
export type FieldTheme = Theme | 'default';
export type FieldShape = 'default' | 'rounded' | 'squared';
export type FieldDensity = Density | 'extra-small' | 'extra-large';
export type FieldLabelPosition = 'inline-start' | 'inline-end' | 'block-start' | 'inset' | 'none';
export type FieldLabelAlignment = 'default' | 'center' | 'baseline' | 'start' | 'end';
export type FieldSupportTextInset = 'start' | 'end' | 'both' | 'none';

import { COMPONENT_NAME_PREFIX, Density, Theme } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}field`;

const attributes = {
  LABEL_POSITION: 'label-position',
  LABEL_ALIGNMENT: 'label-alignment',
  INVALID: 'invalid',
  REQUIRED: 'required',
  OPTIONAL: 'optional',
  DISABLED: 'disabled',
  VARIANT: 'variant',
  THEME: 'theme',
  DENSITY: 'density',
  DENSE: 'dense'
};

const selectors = {
  ROOT: '#root',
  LABEL: '#label',
  CONTAINER: '#container'
};

const defaults = {
  DEFAULT_VARIANT: 'outlined' as FieldVariant,
  DEFAULT_THEME: 'primary' as FieldTheme,
  DEFAULT_DENSITY: 'medium' as FieldDensity,
  DEFAULT_LABEL_POSITION: 'inline-start' as FieldLabelPosition,
  DEFAULT_LABEL_ALIGNMENT: 'default' as FieldLabelAlignment
};

export const FIELD_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  defaults
};

export type FieldVariant = 'plain' | 'outlined' | 'tonal' | 'filled' | 'raised';
export type FieldTheme = Theme;
export type FieldDensity = Density;
export type FieldLabelPosition = 'inline-start' | 'inline-end' | 'block-start' | 'inset' | 'none';
export type FieldLabelAlignment = 'default' | 'centered' | 'baseline' | 'start' | 'end';

import { COMPONENT_NAME_PREFIX, Density, Theme } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}icon-button`;

const observedAttributes = {
  TOGGLE: 'toggle',
  ON: 'on',
  VARIANT: 'variant',
  THEME: 'theme',
  SHAPE: 'shape',
  DENSITY: 'density'
};

const attributes = {
  ...observedAttributes,
  ARIA_PRESSED: 'aria-pressed'
};

const events = {
  TOGGLE: `${elementName}-toggle`
};

const defaults = {
  DEFAULT_VARIANT: 'icon' as IconButtonVariant,
  DEFAULT_THEME: 'default' as IconButtonTheme,
  DEFAULT_SHAPE: 'circular' as IconButtonShape,
  DEFAULT_DENSITY: 'large' as IconButtonDensity
};

export const ICON_BUTTON_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  events,
  defaults
};

export type IconButtonVariant = 'icon' | 'outlined' | 'tonal' | 'filled' | 'raised';
export type IconButtonTheme = Theme | 'default';
export type IconButtonShape = 'circular' | 'squared';
export type IconButtonDensity = Density;

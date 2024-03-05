import { COMPONENT_NAME_PREFIX, Theme } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}chip`;

const observedAttributes = {
  TYPE: 'type',
  VALUE: 'value',
  SELECTED: 'selected',
  INVALID: 'invalid',
  DISABLED: 'disabled',
  DENSE: 'dense',
  THEME: 'theme',
  HREF: 'href',
  TARGET: 'target',
  DOWNLOAD: 'download',
  REL: 'rel'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  ROOT: '.forge-chip',
  TRIGGER: '#trigger'
};

const events = {
  DELETE: `${elementName}-delete`,
  SELECT: `${elementName}-select`,
  NAVIGATE: `${elementName}-navigate`
};

const defaults = {
  TYPE: 'action' as ChipType,
  THEME: 'primary' as ChipTheme
};

export const CHIP_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  events,
  defaults
};

export type ChipTheme = Theme;
export type ChipType =  'choice' | 'filter' | 'action' | 'input' | 'field';

export interface IChipSelectEventData<T = any> {
  value: T;
  selected: boolean;
}

export interface IChipDeleteEventData<T = any> {
  value: T;
}

export interface IChipState {
  type: ChipType;
  disabled: boolean;
  dense: boolean;
}

export interface IChipNavigateEventData {
  direction: 'previous' | 'next';
}

import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}keyboard-shortcut`;

const observedAttributes = {
  KEY: 'key',
  TARGET: 'target',
  GLOBAL: 'global',
  ALLOW_WHILE_TYPING: 'allow-while-typing',
  USE_CODE: 'use-code',
  PREVENT_DEFAULT: 'prevent-default',
  CAPTURE: 'capture',
  DISABLED: 'disabled'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  TOOLTIP: 'forge-tooltip'
};

const events = {
  ACTIVATE: `${elementName}-activate`
};

export const KEYBOARD_SHORTCUT_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  events
};

export const textInputTypes = ['date', 'datetime', 'datetime-local', 'email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week'];

export type KeyboardShortcutActivateCallback = (event: KeyboardEvent) => void;

export interface IKeyCombination {
  key: string;
  modifier?: string;
}

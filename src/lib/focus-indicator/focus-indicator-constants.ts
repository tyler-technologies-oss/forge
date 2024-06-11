import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}focus-indicator`;

const observedAttributes = {
  TARGET: 'target',
  ACTIVE: 'active',
  INWARD: 'inward',
  CIRCULAR: 'circular',
  ALLOW_FOCUS: 'allow-focus',
  FOCUS_MODE: 'focus-mode'
};

const attributes = {
  ...observedAttributes
};

const defaults = {
  FOCUS_MODE: 'focusin' as FocusIndicatorFocusMode
};

export const FOCUS_INDICATOR_CONSTANTS = {
  elementName,
  attributes,
  defaults
};

export type FocusIndicatorFocusMode = 'focus' | 'focusin';

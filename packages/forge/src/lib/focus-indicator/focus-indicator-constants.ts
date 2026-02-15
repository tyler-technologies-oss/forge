import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}focus-indicator`;

export const FOCUS_INDICATOR_CONSTANTS = {
  /** @deprecated use `FOCUS_INDICATOR_TAG_NAME` instead. */
  elementName
};

export type FocusIndicatorFocusMode = 'focus' | 'focusin';

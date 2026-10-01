import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}busy-indicator`;

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const BUSY_INDICATOR_CONSTANTS = {
  elementName
};

export type BusyIndicatorMode = 'fullscreen' | 'inline';
export type BusyIndicatorVariant = 'spinner' | 'progress' | 'message-only';
export type BusyIndicatorFocusMode = 'auto' | 'manual';

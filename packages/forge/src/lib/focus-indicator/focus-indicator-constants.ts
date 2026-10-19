import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}focus-indicator`;

export const FOCUS_INDICATOR_CONSTANTS = {
  /** @deprecated use `FOCUS_INDICATOR_TAG_NAME` instead. */
  elementName
};

export type FocusIndicatorFocusMode = 'focus' | 'focusin';

/** Relative positions along each axis used to sample whether the anchor is visible. Center first for an early exit. */
export const FOCUS_INDICATOR_SAMPLE_RATIOS = [0.5, 0.1, 0.9];

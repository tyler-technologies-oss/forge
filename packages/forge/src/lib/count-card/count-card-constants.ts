import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}count-card`;

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const COUNT_CARD_CONSTANTS = {
  elementName
};

export type CountCardTheme = 'none' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' | 'warning' | 'info' | 'info-secondary';

export const COUNT_CARD_THEME_STATES: CountCardTheme[] = ['none', 'primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info', 'info-secondary'];

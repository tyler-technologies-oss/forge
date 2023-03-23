import { COMPONENT_NAME_PREFIX } from '../constants';
import { OPEN_ICON_CONSTANTS } from '../open-icon';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}expansion-panel`;

const classes = {
  CONTAINER: 'forge-expansion-panel',
  HEADER: 'forge-expansion-panel__header',
  HEADER_BUTTON: 'forge-expansion-panel__header--button',
  CONTENT: 'forge-expansion-panel__content',
  BUTTON: 'forge-expansion-panel__button'
};

const ids = {
  CONTENT: 'content'
};

const selectors = {
  CONTAINER: `.${classes.CONTAINER}`,
  HEADER: `.${classes.HEADER}`,
  CONTENT: `.${classes.CONTENT}`,
  HEADER_SLOT: `.${classes.HEADER} > slot[name=header]`,
  OPEN_ICON: `[slot=header] ${OPEN_ICON_CONSTANTS.elementName}`,
  BUTTON: `.${classes.BUTTON}`,
  IGNORE: `[forge-ignore]`
};

const events = {
  TOGGLE: `${elementName}-toggle`
};

const attributes = {
  OPEN: 'open',
  ORIENTATION: 'orientation',
  USE_ANIMATIONS: 'use-animations',
  TYPE: 'type',
  ACCESSIBLE_LABEL: 'accessible-label'
};

const numbers = {
  COLLAPSE_ANIMATION_DURATION: 400,
  CLICK_DEBOUNCE_THRESHOLD: 200
};

const strings = {
  ORIENTATION_VERTICAL: 'vertical',
  ORIENTATION_HORIZONTAL: 'horizontal',
  EXPANSION_VERTICAL_TRANSITION: `height ${numbers.COLLAPSE_ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${numbers.COLLAPSE_ANIMATION_DURATION}ms ease-in-out`,
  EXPANSION_HORIZONTAL_TRANSITION: `width ${numbers.COLLAPSE_ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${numbers.COLLAPSE_ANIMATION_DURATION}ms ease-in-out`
};

export const EXPANSION_PANEL_CONSTANTS = {
  elementName,
  classes,
  ids,
  selectors,
  events,
  attributes,
  numbers,
  strings
};

export type ExpansionPanelType = 'button' | 'manual';

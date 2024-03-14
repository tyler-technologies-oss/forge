import { COMPONENT_NAME_PREFIX } from '../constants';
import { OPEN_ICON_CONSTANTS } from '../open-icon';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}expansion-panel`;

const observedAttributes = {
  OPEN: 'open',
  ORIENTATION: 'orientation',
  ANIMATION_TYPE: 'animation-type'
};

const attributes = {
  ...observedAttributes,
  OPENING: 'opening'
};

const classes = {
  HIDDEN: 'hidden'
};

const selectors = {
  HEADER: '.header',
  CONTENT: '.content',
  IGNORE: ':is([data-forge-ignore],[forge-ignore])',
  OPEN_ICON: `:is([slot=header] ${OPEN_ICON_CONSTANTS.elementName}, ${OPEN_ICON_CONSTANTS.elementName}[slot^=header])`
};

const events = {
  TOGGLE: `${elementName}-toggle`,
  ANIMATION_COMPLETE: `${elementName}-animation-complete`
};

export const EXPANSION_PANEL_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  classes,
  selectors,
  events
};

export type ExpansionPanelOrientation = 'horizontal' | 'vertical';
export type ExpansionPanelAnimationType = 'default' | 'none';

import { COMPONENT_NAME_PREFIX } from '../constants';
import { PopupPlacement } from '../popup';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}tooltip`;

const attributes = {
  TEXT: 'text',
  TARGET: 'target',
  DELAY: 'delay',
  POSITION: 'position',
  HOST: 'forge-tooltip-host'
};

const classes = {
  TOOLTIP: 'forge-tooltip',
  TOOLTIP_OPEN: 'forge-tooltip--open',
  TOOLTIP_TOP: 'forge-tooltip--top',
  TOOLTIP_RIGHT: 'forge-tooltip--right',
  TOOLTIP_BOTTOM: 'forge-tooltip--bottom',
  TOOLTIP_LEFT: 'forge-tooltip--left'
};

const selectors = {
  HOST: `[${attributes.HOST}]`
};

const numbers = {
  DEFAULT_DELAY: 500,
  LONGPRESS_THRESHOLD: 750,
  LONGPRESS_VISIBILITY_DURATION: 3000
};

const strings  = {
  DEFAULT_POSITION: 'right'
};

export const TOOLTIP_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors,
  numbers,
  strings
};

export type TooltipBuilder = () => HTMLElement;

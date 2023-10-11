import { COMPONENT_NAME_PREFIX } from '../constants';
import { IOverlayToggleEventData } from '../overlay';

const elementName = `${COMPONENT_NAME_PREFIX}popover`;

const attributes = {
  OPEN: 'open',
  ARROW: 'arrow',
  ANIMATION_TYPE: 'animation-type',
  TRIGGER_TYPE: 'trigger-type'
};

const classes = {
  ARROW: 'arrow'
};

const selectors = {
  SURFACE: '.forge-popover'
};

const parts = {
  ARROW: 'arrow'
};

const events = {
  BEFORETOGGLE: `${elementName}-beforetoggle`,
  TOGGLE: `${elementName}-toggle`
};

export const POPOVER_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors,
  parts,
  events
};

export type PopoverAnimationType = 'none' | 'zoom' | 'slide' | 'fade';
export type PopoverTriggerType = 'click' | 'hover' | 'focus';

export interface PopoverToggleEventData extends IOverlayToggleEventData {}

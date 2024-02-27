import { COMPONENT_NAME_PREFIX } from '../constants';
import { OverlayLightDismissReason } from '../overlay';

const elementName = `${COMPONENT_NAME_PREFIX}popover`;

const attributes = {
  OPEN: 'open',
  ARROW: 'arrow',
  ANIMATION_TYPE: 'animation-type',
  TRIGGER_TYPE: 'trigger-type',
  LONGPRESS_DELAY: 'longpress-delay',
  PERSISTENT_HOVER: 'persistent-hover',
  DELAY: 'delay',
  HOVER_DISMISS_DELAY: 'hover-dismiss-delay'
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

const defaults = {
  TRIGGER_TYPE: 'click' as PopoverTriggerType,
  DELAY: 500
};

export const POPOVER_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors,
  parts,
  events,
  defaults
};

export const POPOVER_HOVER_TIMEOUT = 500;

export type PopoverAnimationType = 'none' | 'zoom' | 'slide' | 'fade';
export type PopoverTriggerType = 'click' | 'hover' | 'focus' | 'longpress' | 'doubleclick' | 'contextmenu' | 'manual';
export type PopoverDismissReason = OverlayLightDismissReason | PopoverTriggerType | 'destroy';

export interface IPopoverToggleEventData {
  newState: 'closed' | 'open';
  oldState: 'closed' | 'open';
}

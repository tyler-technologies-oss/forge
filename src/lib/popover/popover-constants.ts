import { COMPONENT_NAME_PREFIX } from '../constants';
import { OverlayLightDismissReason } from '../overlay';

const elementName = `${COMPONENT_NAME_PREFIX}popover`;

const observedAttributes = {
  ARROW: 'arrow',
  ANIMATION_TYPE: 'animation-type',
  TRIGGER_TYPE: 'trigger-type',
  LONGPRESS_DELAY: 'longpress-delay',
  PERSISTENT_HOVER: 'persistent-hover',
  HOVER_DELAY: 'hover-delay',
  HOVER_DISMISS_DELAY: 'hover-dismiss-delay',
  PRESET: 'preset'
};

const attributes = {
  ...observedAttributes,
  OPEN: 'open',
  HOST: 'forge-popover-host',
  CONSTRAIN_VIEWPORT_WIDTH: 'constrain-viewport-width'
};

const classes = {
  ARROW: 'arrow',
  EXITING: 'exiting'
};

const selectors = {
  SURFACE: '.forge-popover',
  HOST: `:is(forge-dialog,forge-popover,[${attributes.HOST}])`
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
  HOVER_DELAY: 0,
  PRESET: 'popover' as PopoverPreset
};

export const POPOVER_CONSTANTS = {
  elementName,
  observedAttributes,
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
export type PopoverPreset = 'popover' | 'dropdown' | 'list';

export interface IPopoverToggleEventData {
  newState: 'closed' | 'open';
  oldState: 'closed' | 'open';
}

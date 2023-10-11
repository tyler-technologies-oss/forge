import { PositionPlacement } from '@tylertech/forge-core';
import { COMPONENT_NAME_PREFIX } from '../constants';
import { supportsPopover } from '../core';

const elementName = `${COMPONENT_NAME_PREFIX}overlay`;

const observedAttributes = {
  TARGET: 'target',
  OPEN: 'open',
  INLINE: 'inline',
  PLACEMENT: 'placement',
  POSITION_STRATEGY: 'position-strategy',
  HIDE: 'hide',
  STATIC: 'static',
  SHIFT: 'shift',
  NO_FLIP: 'no-flip',
  AUTO: 'auto',
  DIALOG: 'dialog',
  MODAL: 'modal'
};

const attributes = {
  ...observedAttributes,
  POSITION_PLACEMENT: 'position-placement'
};

const classes = {
  OVERLAY: 'forge-overlay'
};

const selectors = {
  ROOT: `.${classes.OVERLAY}`,
  OPEN_OVERLAYS: `${elementName}[${attributes.OPEN}]`
};

const events = {
  LIGHT_DISMISS: `${elementName}-light-dismiss`
};

export const OVERLAY_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  classes,
  selectors,
  events
};

export const CAN_USE_POPOVER = supportsPopover();

export interface IOverlayOffset { mainAxis?: number; crossAxis?: number; alignmentAxis?: number }

export type OverlayPositionStrategy = 'absolute' | 'fixed';
export type OverlayPlacement = PositionPlacement;

export interface IOverlayToggleEventData {
  newState: 'closed' | 'open';
  oldState: 'closed' | 'open';
}

export interface OverlayToggleEvent extends Event, IOverlayToggleEventData {}
export interface OverlayLightDismissEventData {
  type: 'modal' | 'modeless';
}

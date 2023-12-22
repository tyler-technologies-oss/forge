import { PositionPlacement } from '@tylertech/forge-core';
import { COMPONENT_NAME_PREFIX } from '../constants';
import { supportsPopover } from '../core';

const elementName = `${COMPONENT_NAME_PREFIX}overlay`;

const observedAttributes = {
  ANCHOR: 'anchor',
  OPEN: 'open',
  INLINE: 'inline',
  PLACEMENT: 'placement',
  POSITION_STRATEGY: 'position-strategy',
  HIDE: 'hide',
  STATIC: 'static',
  SHIFT: 'shift',
  FLIP: 'flip',
  BOUNDARY: 'boundary',
  FALLBACK_PLACEMENTS: 'fallback-placements',
  AUTO: 'auto'
} as const;

const attributes = {
  ...observedAttributes,
  POSITION_PLACEMENT: 'position-placement'
} as const;

const classes = {
  OVERLAY: 'forge-overlay'
} as const;

const selectors = {
  ROOT: `.${classes.OVERLAY}`
} as const;

const events = {
  LIGHT_DISMISS: `${elementName}-light-dismiss`
} as const;

const defaults = {
  HIDE: 'auto',
  FLIP: 'auto'
} as const;

export const OVERLAY_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  classes,
  selectors,
  events,
  defaults
};

export const SUPPORTS_POPOVER = supportsPopover();

export interface IOverlayOffset { mainAxis?: number; crossAxis?: number; alignmentAxis?: number }

export type OverlayPositionStrategy = 'absolute' | 'fixed';
export type OverlayPlacement = PositionPlacement;
export type OverlayHideState = 'auto' | 'off';
export type OverlayFlipState = 'auto' | 'main' | 'cross' | 'off';
export type OverlayLightDismissReason = 'click' | 'escape';

export interface IOverlayToggleEvent extends Event {
  newState: 'closed' | 'open';
  oldState: 'closed' | 'open';
}
export interface OverlayLightDismissEventData {
  reason: OverlayLightDismissReason;
}

export const overlayStack = Symbol('overlayStack');

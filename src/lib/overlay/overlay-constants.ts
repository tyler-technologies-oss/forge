import { COMPONENT_NAME_PREFIX } from '../constants';
import { supportsPopover } from '../core';
import { PositionPlacement } from '../core/utils/position-utils';

const elementName = `${COMPONENT_NAME_PREFIX}overlay` as const;

const observedAttributes = {
  ANCHOR: 'anchor',
  NO_ANCHOR: 'no-anchor',
  OPEN: 'open',
  INLINE: 'inline',
  PLACEMENT: 'placement',
  POSITION_STRATEGY: 'position-strategy',
  HIDE: 'hide',
  PERSISTENT: 'persistent',
  SHIFT: 'shift',
  FLIP: 'flip',
  BOUNDARY: 'boundary',
  FALLBACK_PLACEMENTS: 'fallback-placements'
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
  LIGHT_DISMISS: `${elementName}-light-dismiss`,
  DESCENDANT_TEST: `${elementName}-descendant-test`
} as const;

const defaults = {
  HIDE: 'anchor-hidden' satisfies OverlayHideState,
  FLIP: 'auto' satisfies OverlayFlipState
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

export interface IOverlayOffset {
  mainAxis?: number;
  crossAxis?: number;
  alignmentAxis?: number;
}

export type OverlayPositionStrategy = 'absolute' | 'fixed';
export type OverlayPlacement = PositionPlacement | 'auto';
export type OverlayHideState = 'anchor-hidden' | 'never';
export type OverlayFlipState = 'auto' | 'main' | 'cross' | 'never';
export type OverlayLightDismissReason = 'click' | 'escape';

export interface IOverlayToggleEvent extends Event {
  newState: 'closed' | 'open';
  oldState: 'closed' | 'open';
}
export interface OverlayLightDismissEventData {
  reason: OverlayLightDismissReason;
}

export const overlayStack = Symbol('overlayStack');

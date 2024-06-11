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
export type OverlayPlacement = PositionPlacement;
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

/**
 * This is a map of fallback placements for each placement. The fallback placements are used when the
 * original placement is not possible due to the boundary or other constraints.
 */
export const OVERLAY_FALLBACK_PLACEMENT_MAP: Record<OverlayPlacement, OverlayPlacement[]> = {
  // Left
  left: ['right', 'bottom', 'top', 'top-start', 'top-end', 'left-start', 'left-end', 'right-start', 'right-end'],
  'left-start': ['left-end', 'right-start', 'right-end', 'bottom', 'top'],
  'left-end': ['left-start', 'right-end', 'right-start', 'bottom', 'top', 'bottom-start', 'bottom-end'],

  // Right
  right: ['left', 'bottom', 'top', 'top-start', 'top-end', 'left-start', 'left-end', 'right-start', 'right-end'],
  'right-start': ['right-end', 'left-start', 'left-end', 'bottom', 'top'],
  'right-end': ['right-start', 'left-end', 'left-start', 'bottom', 'top', 'bottom-start', 'bottom-end'],

  // Top
  top: ['bottom', 'left', 'right', 'bottom-start', 'left-start', 'left-end', 'right-start', 'right-end'],
  'top-start': ['bottom-start', 'left', 'right', 'left-start', 'left-end', 'right-start', 'right-end'],
  'top-end': ['bottom-end', 'left', 'right', 'right-start', 'right-end', 'left-start', 'left-end'],

  // Bottom
  bottom: ['top', 'left', 'right', 'top-start', 'left-start', 'left-end', 'right-start', 'right-end'],
  'bottom-start': ['top-start', 'left', 'right', 'left-start', 'left-end', 'right-start', 'right-end'],
  'bottom-end': ['top-end', 'left', 'right', 'right-start', 'right-end', 'left-start', 'left-end']
};

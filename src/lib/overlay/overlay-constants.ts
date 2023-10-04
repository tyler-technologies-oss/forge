import { PositionPlacement } from '@tylertech/forge-core';
import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}overlay`;

const observedAttributes = {
  OPEN: 'open',
  INLINE: 'inline',
  PLACEMENT: 'placement',
  POSITION_STRATEGY: 'position-strategy',
  HIDE: 'hide',
  STATIC: 'static',
  SHIFT: 'shift',
  NO_FLIP: 'no-flip',
  AUTO: 'auto'
};

const attributes = {
  ...observedAttributes,
  POSITION_PLACEMENT: 'position-placement'
};

const selectors = {
  ROOT: '.forge-overlay',
  ARROW: '.arrow'
};

const events = {
  BEFORETOGGLE: `${elementName}-beforetoggle`,
  TOGGLE: `${elementName}-toggle`
};

export const OVERLAY_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  selectors,
  events
};

export interface IOverlayOffset { mainAxis?: number; crossAxis?: number; alignmentAxis?: number }

export type OverlayPositionStrategy = 'absolute' | 'fixed';
export type OverlayPlacement = PositionPlacement;

export interface OverlayToggleEventData {
  open: boolean;
}

export interface OverlayToggleEvent extends Event {
  newState: 'closed' | 'open';
  oldState: 'closed' | 'open';
}

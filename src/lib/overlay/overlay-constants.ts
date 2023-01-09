import { PositionPlacement } from '@tylertech/forge-core';
import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}overlay`;

const attributes = {
  OPEN: 'open',
  PLACEMENT: 'placement',
  POSITION_STRATEGY: 'position-strategy',
  HIDE_WHEN_CLIPPED: 'hide-when-clipped'
};

export const OVERLAY_CONSTANTS = {
  elementName,
  attributes
};

export interface IOverlayPosition { x: number; y: number }

export type OverlayPositionStrategy = 'absolute' | 'fixed';
export type OverlayPlacement = PositionPlacement;

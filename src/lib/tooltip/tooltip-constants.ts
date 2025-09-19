import { COMPONENT_NAME_PREFIX } from '../constants';
import { PositionPlacement } from '../core/utils/position-utils';
import { OverlayFlipState } from '../overlay/overlay-constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}tooltip`;

const observedAttributes = {
  ID: 'id',
  OPEN: 'open',
  TYPE: 'type',
  ANCHOR: 'anchor',
  TARGET: 'target', // deprecated
  PLACEMENT: 'placement',
  POSITION: 'position', // deprecated
  DELAY: 'delay',
  OFFSET: 'offset',
  FLIP: 'flip',
  BOUNDARY: 'boundary',
  FALLBACK_PLACEMENTS: 'fallback-placements',
  TRIGGER_TYPE: 'trigger-type'
} as const;

const attributes = {
  ...observedAttributes
} as const;

const numbers = {
  LONGPRESS_VISIBILITY_DURATION: 3000,
  HOVER_OUTSIDE_THRESHOLD: 100
};

const defaults = {
  DELAY: 500,
  OFFSET: 4,
  FLIP: 'auto' as OverlayFlipState,
  TYPE: 'presentation' as TooltipType,
  PLACEMENT: 'right' as TooltipPlacement,
  TRIGGER_TYPES: ['hover'] as TooltipTriggerType[]
};

const selectors = {
  CONTENT: '.forge-tooltip',
  ARROW: '.arrow',
  DEFAULT_SLOT: 'slot:not([name])'
} as const;

export const TOOLTIP_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  numbers,
  defaults,
  selectors
};

export type TooltipType = 'presentation' | 'label' | 'description';
export type TooltipPlacement = PositionPlacement;
export type TooltipTriggerType = 'hover' | 'longpress' | 'focus';

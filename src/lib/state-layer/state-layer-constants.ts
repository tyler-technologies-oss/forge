import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName = `${COMPONENT_NAME_PREFIX}state-layer`;

const observedAttributes = {
  TARGET: 'target',
  DISABLED: 'disabled'
};

const attributes = {
  ...observedAttributes
};

const selectors = {
  SURFACE: '.forge-state-layer'
};

const classes = {
  HOVERED: 'forge-state-layer--hovered',
  PRESSED: 'forge-state-layer--pressed'
};

export const STATE_LAYER_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  classes
};

export class StateLayerCoords {
  constructor(public x: number, public y: number) {}

  public static fromPointerEvent(event: PointerEvent): StateLayerCoords {
    return new StateLayerCoords(event.pageX, event.pageY);
  }
}

export const TOUCH_DELAY_MS = 150;
export const PRESS_GROW_MS = 450;
export const MINIMUM_PRESS_MS = 225;
export const INITIAL_ORIGIN_SCALE = 0.2;
export const PADDING = 10;
export const SOFT_EDGE_MINIMUM_SIZE = 75;
export const SOFT_EDGE_CONTAINER_RATIO = 0.35;
export const PRESS_PSEUDO = '::after';
export const ANIMATION_FILL = 'forwards';
export const EASING = 'cubic-bezier(0.2, 0, 0, 1)';

/**
 * Interaction states for the state layer.
 *
 * On Touch:
 *  - `INACTIVE -> TOUCH_DELAY -> WAITING_FOR_CLICK -> INACTIVE`
 *  - `INACTIVE -> TOUCH_DELAY -> HOLDING -> WAITING_FOR_CLICK -> INACTIVE`
 *
 * On Mouse or Pen:
 *   - `INACTIVE -> WAITING_FOR_CLICK -> INACTIVE`
 */
export enum PointerState {
  /**
   * Initial state of the control, no touch in progress.
   *
   * Transitions:
   *   - on touch down: transition to `TOUCH_DELAY`.
   *   - on mouse down: transition to `WAITING_FOR_CLICK`.
   */
  INACTIVE,
  /**
   * Touch down has been received, waiting to determine if it's a swipe or
   * scroll.
   *
   * Transitions:
   *   - on touch up: begin press; transition to `WAITING_FOR_CLICK`.
   *   - on cancel: transition to `INACTIVE`.
   *   - after `TOUCH_DELAY_MS`: begin press; transition to `HOLDING`.
   */
  TOUCH_DELAY,
  /**
   * A touch has been deemed to be a press
   *
   * Transitions:
   *  - on up: transition to `WAITING_FOR_CLICK`.
   */
  HOLDING,
  /**
   * The user touch has finished, transition into rest state.
   *
   * Transitions:
   *   - on click end press; transition to `INACTIVE`.
   */
  WAITING_FOR_CLICK
}

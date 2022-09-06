import { safeMin, scaleValue } from '../../core/utils/utils';
import { ISplitViewPanelState } from './split-view-panel-constants';
import { ISplitViewPanelAdapter } from './split-view-panel-adapter';

export type InputDeviceType = 'pointer' | 'keyboard';

export type SplitViewPanelBpundary = 'min' | 'max' | 'none';

/**
 * Creates a default split view panel state object.
 * @returns A new state object.
 */
export function initState(): ISplitViewPanelState {
  return {
    orientation: 'horizontal',
    resizable: 'none',
    arrowKeyHeld: false,
    keyboardDelta: 0,
    isAtMin: false,
    isAtMax: false,
    min: 0
  };
}

/**
 * Gets a state object reflecting the panel's parameters at the beginning of a resize.
 * @param adapter The panel's adapter.
 * @param state The panel's state object.
 * @returns An updated state object.
 */
export function setState(adapter: ISplitViewPanelAdapter, state: ISplitViewPanelState): ISplitViewPanelState {
  const currentSize = adapter.getContentSize(state.orientation);
  return {
    ...state,
    currentSize,
    startSize: currentSize,
    availableSpace: adapter.getAvailableSpace(state.orientation, state.resizable),
    siblingSize: adapter.getSiblingContentSize(),
    isAtMin: false,
    isAtMax: false
  };
}

/**
 * Gets a state object with all properties related to a resize reset to default.
 * @param state The panel's state object.
 * @returns An updated state object.
 */
export function clearState(state: ISplitViewPanelState): ISplitViewPanelState {
  return {
    ...state,
    arrowKeyHeld: false,
    keyboardDelta: 0,
    isAtMin: false,
    isAtMax: false
  };
}

/**
 * Performs a panel resize triggered by a pointer event.
 * @param adapter The panel's adapter.
 * @param evt The pointer event.
 * @param state The panel's state object.
 * @returns Whether a resize happened.
 */
export function pointerResize(adapter: ISplitViewPanelAdapter, evt: PointerEvent, state: ISplitViewPanelState): boolean {
  if (state.startPoint === undefined || state.startSize === undefined || state.resizable === undefined) {
    return false;
  }

  const evtPoint = state.orientation === 'horizontal' ? evt.clientX : evt.clientY;
  let delta = state.startPoint - evtPoint;
  if (state.resizable === 'start') {
    delta *= -1;
  }

  const size = state.startSize - delta;
  state.currentSize = clampSize(size, state);
  adapter.setContentSize(state.currentSize);
  handleBoundariesDuringResize(adapter, state, 'pointer');
  adapter.setValuenow(getValuenow(state.currentSize, state));

  const siblingDelta = size - state.currentSize + delta;
  resizeSibling(adapter, siblingDelta, state);

  return size !== state.currentSize;
}

/**
 * Performs a panel resize triggered by a keyboard event.
 * @param adapter The panel's adapter.
 * @param increment The pixel amount to change the panel's size.
 * @param state The panel's state object.
 * @returns Whether a resize happened.
 */
export function keyboardResize(adapter: ISplitViewPanelAdapter, increment: number, state: ISplitViewPanelState): boolean {
  if (state.startSize === undefined) {
    return false;
  }

  state.keyboardDelta += increment;

  const size = state.startSize + state.keyboardDelta;
  state.currentSize = clampSize(size, state);
  adapter.setContentSize(state.currentSize);
  handleBoundariesDuringResize(adapter, state, 'keyboard');
  adapter.setValuenow(getValuenow(state.currentSize, state));

  const siblingDelta = size - state.currentSize + state.keyboardDelta * -1;
  resizeSibling(adapter, siblingDelta, state);

  return size !== state.currentSize;
}

/**
 * Resizes a panel to its minimum possible size.
 * @param adapter The panel's adapter.
 * @param state The panel's state object.
 * @returns The new pixel size of the panel.
 */
export function minResize(adapter: ISplitViewPanelAdapter, state: ISplitViewPanelState): number {
  adapter.setContentSize(state.min);
  return state.min;
}

/**
 * Resizes a panel to its maximum possible size.
 * @param adapter The panel's adapter.
 * @param state The panel's state object.
 * @returns The new pixel size of the panel.
 */
export function maxResize(adapter: ISplitViewPanelAdapter, state: ISplitViewPanelState): number {
  const availableSpace = adapter.getAvailableSpace(state.orientation, state.resizable);
  const max = safeMin(state.max, availableSpace);
  adapter.setContentSize(max);
  return max;
}

/**
   * Sets a panel's sibling's size to reflect changes in the panel's size.
   * @param adapter The panel's adapter.
   * @param delta The change in size to apply to the sibling.
   * @param state The panel's state object.
   */
export function resizeSibling(adapter: ISplitViewPanelAdapter, delta: number, state: ISplitViewPanelState): void {
  if (state.siblingSize !== undefined) {
    const siblingSize = state.siblingSize + delta;
    adapter.setSiblingContentSize(siblingSize);
  }
}

/**
   * Returns a size limited to an allowed range.
   * @param size The size to try setting this panel to.
   * @param state The panel's state object.
   * @returns A pixel value.
   */
export function clampSize(size: number, state: ISplitViewPanelState): number {
  size = Math.max(size, state.min);
  size = safeMin(size, state.max, state.availableSpace);
  return size;
}

/**
   * Checks whether a panel is at its min or max size while resizing and runs logic related to
   * that once.
   * @param adapter The panel's adapter.
   * @param state The panel's state object.
   * @param inputDevice The input device responsible for the resize.
   * @returns Whether the panel is at its min or max size.
   */
export function handleBoundariesDuringResize(adapter: ISplitViewPanelAdapter, state: ISplitViewPanelState, inputDevice?: InputDeviceType): boolean {
  if (state.currentSize === undefined) {
    return false;
  }

  // Check min
  if (state.currentSize <= state.min) {
    // Just reached the min
    if (!state.isAtMin) {
      adapter.activateRipple(inputDevice === 'pointer');
      if (inputDevice === 'pointer') {
        adapter.setBodyCursor(state.orientation, { resizable: state.resizable, boundary: 'min' });
      }
      state.isAtMin = true;
    }
    return true;
  } else if (state.isAtMin) {
    // TODO: is it more performant to have the else if condition or to always set the variable?
    state.isAtMin = false;
  }

  // Check max
  const max = safeMin(state.max, state.availableSpace);
  if (state.currentSize >= max) {
    // Just reached the max
    if(!state.isAtMax) {
      adapter.activateRipple(inputDevice === 'pointer');
      if (inputDevice === 'pointer') {
        adapter.setBodyCursor(state.orientation, { resizable: state.resizable, boundary: 'max' });
      }
      state.isAtMax = true;
    }
    return true;
  } else if (state.isAtMax) {
    state.isAtMax = false;
  }

  if (inputDevice === 'pointer') {
    adapter.setBodyCursor(state.orientation);
  }
  
  return false;
}

/**
   * Checks whether a panel is at its min or max size while not resizing and runs logic related to
   * that once.
   * @param adapter The panel's adapter.
   * @param size The panel's size.
   * @param state The panel's state object.
   * @returns Whether the panel is at its min or max size.
   */
export function handleBoundariesAfterResize(adapter: ISplitViewPanelAdapter, size: number, state: ISplitViewPanelState): boolean {
  if (size <= state.min) {
    adapter.setHandleCursor(state.orientation, { resizable: state.resizable, boundary: 'min' });
    return true;
  }

  const max = safeMin(state.max, state.availableSpace);
  if (size >= max) {
    adapter.setHandleCursor(state.orientation, { resizable: state.resizable, boundary: 'max' });
    return true;
  }

  adapter.setHandleCursor(state.orientation);
  return false;
}

/**
   * Gets the accessible valuenow of a panel.
   * @param size The panel's size in pixels.
   * @param state The panel's state object.
   */
export function getValuenow(size: number, state: ISplitViewPanelState): number {
  if (!state.availableSpace || !state.max) {
    return 100;
  }

  const max = safeMin(state.max, state.availableSpace);
  return scaleValue(size, state.min, max);
}

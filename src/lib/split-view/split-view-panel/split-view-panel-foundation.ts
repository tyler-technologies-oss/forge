import { ICustomElementFoundation } from '@tylertech/forge-core';

import { percentToPixels, safeMin, scaleValue } from '../../core/utils/utils';
import { eventIncludesArrowKey } from '../../core/utils/event-utils';
import { ISplitViewPanelState, SplitViewPanelPosition, SPLIT_VIEW_PANEL_CONSTANTS } from './split-view-panel-constants';
import { ISplitViewPanelAdapter } from './split-view-panel-adapter';
import { SplitViewOrientation } from '../split-view/split-view-constants';
import { ISplitViewBase } from '../core/split-view-base';
import { parseSize } from '../core/split-view-core-utils';
import { clampSize, clearState, getValueNow, handleBoundariesAfterResize, handleBoundariesDuringResize, initState, keyboardResize, maxResize, minResize, pointerResize, setState } from './split-view-panel-utils';

export interface ISplitViewPanelFoundation extends ISplitViewBase, ICustomElementFoundation {
  position: SplitViewPanelPosition;
  size: number | string;
  min: number;
  max: number | undefined;
  accessibleLabel: string;
  open: boolean;
  getContentSize(): number;
  getCollapsibleSize(): number;
  setContentSize(size: number): void;
  setOrientation(value: SplitViewOrientation): void;
  setCursor(): void;
  updateAccessibility(): void;
}

export class SplitViewPanelFoundation implements ISplitViewPanelFoundation {
  // API
  private _size: number | string = '200';
  private _accessibleLabel = 'Split view panel';
  private _open = true;
  private _disabled = false;
  private _disableClose = false;
  private _autoClose = false;
  private _autoCloseThreshold = 0;
  
  // State
  private _state: ISplitViewPanelState = initState();
  private _isInitialized = false;

  // Properties stored in state
  private get _orientation(): SplitViewOrientation {
    return this._state.orientation;
  }
  private set _orientation(value: SplitViewOrientation) {
    this._state.orientation = value;
  }

  private get _position(): SplitViewPanelPosition {
    return this._state.position;
  }
  private set _position(value: SplitViewPanelPosition) {
    this._state.position = value;
  }

  private get _min(): number {
    return this._state.min;
  }
  private set _min(value: number) {
    this._state.min = value;
  }

  private get _max(): number | undefined {
    return this._state.max;
  }
  private set _max(value: number | undefined) {
    this._state.max = value;
  }

  // Listeners
  private _pointerdownListener: (evt: PointerEvent) => void;
  private _pointerupListener: (evt: PointerEvent) => void;
  private _pointermoveListener: (evt: PointerEvent) => void;
  private _keydownListener: (evt: KeyboardEvent) => void;
  private _keyupListener: (evt: KeyboardEvent) => void;

  constructor(private _adapter: ISplitViewPanelAdapter) {
    this._pointerdownListener = evt => this._onPointerdown(evt);
    this._pointerupListener = evt => this._onPointerup(evt);
    this._pointermoveListener = evt => this._onPointermove(evt);
    this._keydownListener = evt => this._onKeydown(evt);
    this._keyupListener = evt => this._onKeyup(evt);
  }

  public initialize(): void {
    this._adapter.initialize();
    this._adapter.setPointerdownListener(this._pointerdownListener);
    this._adapter.setKeydownListener(this._keydownListener);
    this._matchParentProperties();
    this._applyPosition();
    this._applyMin();
    this._applyMax();
    this._applySize();
    this._applyAccessibleLabel();
    this._applyOpen();
    this._applyDisabled();
    this._applyDisableClose();
    this._applyAutoClose();
    this._applyAutoCloseThreshold();
    this._isInitialized = true;
  }

  public disconnect(): void {
    this._adapter.removePointerupListener(this._pointerupListener);
    this._adapter.removePointermoveListener(this._pointermoveListener);
  }

  /**
   * Handles a pointerdown event and sets further pointer event listeners.
   * @param evt The pointer event.
   */
  private _onPointerdown(evt: PointerEvent): void {
    if (this._disabled) {
      return;
    }

    evt.preventDefault();

    this._adapter.setPointermoveListener(this._pointermoveListener);
    this._adapter.setPointerupListener(this._pointerupListener);
    this._handlePointerdown(evt);
  }

  /**
   * Handles a pointerup event and removes pointer event listeners.
   * @param evt The pointer event.
   */
  private _onPointerup(evt: PointerEvent): void {
    if (this._disabled) {
      return;
    }

    evt.preventDefault();

    this._adapter.removePointermoveListener(this._pointermoveListener);
    this._adapter.removePointerupListener(this._pointerupListener);
    this._handlePointerup();
  }

  /**
   * Handles a pointermove event and removes pointer events if the mouse button is released.
   * @param evt The pointer event.
   */
  private _onPointermove(evt: PointerEvent): void {
    if (this._disabled) {
      return;
    }

    evt.preventDefault();

    // Detect when the mouse button is released outside of the document
    if (evt.buttons === 0) {
      this._adapter.removePointermoveListener(this._pointermoveListener);
      this._adapter.removePointerupListener(this._pointerupListener);
      this._handlePointerup();
      return;
    }

    this._handlePointermove(evt);
  }

  /**
   * Handles a keydown event and sets a keyup listener if an arrow key is pressed.
   * @param evt The keyboard event.
   */
  private _onKeydown(evt: KeyboardEvent): void {
    if (this._disabled) {
      return;
    }

    if (evt.key === 'Enter') {
      this._handleEnterKey(evt);
    } else if (evt.key === 'Home') {
      this._handleHomeKey(evt);
    } else if (evt.key === 'End') {
      this._handleEndKey(evt);
    } else if (eventIncludesArrowKey(evt)) {
      this._adapter.setKeyupListener(this._keyupListener);
      this._handleArrowKey(evt);
    }
  }

  /**
   * Handles a keyup event and removes the keyup listener if an arrow key was released.
   * @param evt The keyboard event.
   */
  private _onKeyup(evt: KeyboardEvent): void {
    if (eventIncludesArrowKey(evt)) {
      this._adapter.removeKeyupListener(this._keyupListener);
      this._handleArrowKeyUp();
    }
  }

  /**
   * Toggles the open state.
   * @param evt 
   */
  private _handleEnterKey(evt: KeyboardEvent): void {
    if (this._disableClose) {
      return;
    }

    evt.preventDefault();
    this._open = !this._open;
    this._applyOpen();
  }

  /**
   * Sets panel size to the min.
   * @param evt
   */
  private _handleHomeKey(evt: KeyboardEvent): void {
    evt.preventDefault();

    const size = minResize(this._adapter, this._state);
    this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, size);
  }

  /**
   * Sets panel size to the max.
   * @param evt
   */
  private _handleEndKey(evt: KeyboardEvent): void {
    evt.preventDefault();

    const size = maxResize(this._adapter, this._state);
    this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, size);
  }

  /**
   * Runs resize logic if an arrow key is included in the event.
   * @param evt 
   */
  private _handleArrowKey(evt: KeyboardEvent): void {
    let increment = 0;
    if (this._orientation === 'horizontal') {
      switch (evt.key) {
        case 'ArrowLeft':
          increment = -1;
          break;
        case 'ArrowRight':
          increment = 1;
          break;
        default:
          return;
      }
    } else {
      switch (evt.key) {
        case 'ArrowUp':
          increment = -1;
          break;
        case 'ArrowDown':
          increment = 1;
          break;
        default:
          return;
      }
    }

    evt.preventDefault();

    if (this._position === 'end') {
      increment *= -1;
    }
    if (evt.shiftKey) {
      increment *= 10;
    }

    this._tryHandleArrowKeyDown();
    this._handleArrowKeyHeld(increment);
  }

  /**
   * Sets resize properties when an arrow key is first pressed.
   */
  private _tryHandleArrowKeyDown(): void {
    if (!this._state.arrowKeyHeld) {
      this._startResize();
    }
    this._state.arrowKeyHeld = true;
  }

  /**
   * Performs cleanup logic after a keyboard driven resize.
   */
  private _handleArrowKeyUp(): void {
    this._endResize();
  }

  /**
   * Resizes the panel by a set amount.
   * @param increment The pixel change in size.
   */
  private _handleArrowKeyHeld(increment: number): void {
    if (keyboardResize(this._adapter, increment, this._state)) {
      this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, this._state.currentSize);
    }
  }

  /**
   * Handles the beginning of a pointer driven resize.
   * @param evt 
   */
  private _handlePointerdown(evt: MouseEvent): void {
    this._adapter.setGrabbed(true);
    this._adapter.focusHandle();
    
    this._startResize();
    this._state.startPoint = this._orientation === 'horizontal' ? evt.clientX : evt.clientY;
    handleBoundariesDuringResize(this._adapter, this._state, 'pointer');
  }

  /**
   * Handles the end of a pointer driven resize.
   */
  private _handlePointerup(): void {
    this._adapter.setGrabbed(false);
    this._endResize();
  }

  /**
   * Resizes the panel from a pointer event.
   * @param evt 
   */
  private _handlePointermove(evt: PointerEvent): void {
    if(pointerResize(this._adapter, evt, this._state)) {
      this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, this._state.currentSize);
    }
  }

  /**
   * Handles common logic to begin a resize.
   */
  private _startResize(): void {
    this._state = setState(this._adapter, this._state);
    this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_START, this._state.startSize);
  }

  /**
   * Handles common logic to end a resize.
   */
  private _endResize(): void {
    this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_END, this._state.currentSize);

    if (this._state.startSize !== this._state.currentSize) {
      this._adapter.updateParentAccessibility();
    }
    this._adapter.setParentCursors();

    this._state = clearState(this._state);
    this._tryAutoClose();
  }

  /**
   * Auto close the panel if enabled and within the size threshold.
   */
  private _tryAutoClose(): void {
    const size = this._adapter.getContentSize(this._orientation);
    if (this._autoClose && size <= this._autoCloseThreshold) {
      this._open = false;
      this._applyOpen();
    }
  }

  /**
   * Sets orientation, disabled, disable close, and autoclose to reflect the parent split view.
   */
  private _matchParentProperties(): void {
    // Match parent disabled state
    const parentDisabled = this._adapter.getParentProperty('disabled') as boolean;
    if (!this._isInitialized || this._disabled !== parentDisabled) {
      this._disabled = parentDisabled;
      this._applyDisabled();
    }

    // Match parent disable close
    const parentDisableClose = this._adapter.getParentProperty('disableClose') as boolean;
    if (!this._isInitialized || this._disableClose !== parentDisableClose) {
      this._disableClose = parentDisableClose;
      this._applyDisableClose();
    }

    // Match parent auto close
    const parentAutoClose = this._adapter.getParentProperty('autoClose') as boolean;
    if (!this._isInitialized || this._autoClose !== parentAutoClose) {
      this._autoClose = parentAutoClose;
      this._applyAutoClose();
    }
  }

  private _applyOrientation(): void {
    this._adapter.setOrientation(this._orientation);
  }

  /**
   * Get/set position. This affects the side the handle appears on and the direction the panel closes into.
   */
  public get position(): SplitViewPanelPosition {
    return this._position;
  }
  public set position(value: SplitViewPanelPosition) {
    if (this._position !== value) {
      this._position = value;
      this._applyPosition();
    }
  }

  private _applyPosition(): void {
    this._adapter.setHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.POSITION, this._position);
    this._adapter.setPosition(this._position);
  }

  /**
   * Get/set panel size.
   */
  public get size(): number | string {
    return this._size;
  }
  public set size(value: number | string) {
    if (this._size !== value) {
      this._size = value;
      this._applySize();
    }
  }

  private _applySize(): void {
    const parsedSize = parseSize(this._size);
    let pixelSize = parsedSize.amount;
    if (parsedSize.unit === '%') {
      const parentSize = this._adapter.getParentSize(this._orientation);
      pixelSize = percentToPixels(parsedSize.amount, parentSize);
    }

    this._adapter.setHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.SIZE, this._size.toString());
    this._adapter.setContentSize(pixelSize);
    // Wait for the DOM to render to get available space
    window.requestAnimationFrame(() => {
      const availableSpace = this._adapter.getAvailableSpace(this._orientation, this._position);
      const maxSize = safeMin(this._max, availableSpace);
      const newValue = scaleValue(pixelSize, this._min, maxSize);
      this._adapter.setValue(newValue);
      handleBoundariesAfterResize(this._adapter, pixelSize, { ...this._state, availableSpace });
    });
  }

  /** Get/set min panel size. */
  public get min(): number {
    return this._min;
  }
  public set min(value: number) {
    if (this._min !== value) {
      this._min = value;
      this._applyMin();
    }
  }

  private _applyMin(): void {
    this._adapter.setHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.MIN, this._min.toString());

    if (this._position === 'default') {
      return;
    }

    const size = this._adapter.getContentSize(this._orientation);
    if (size < this._min) {
      const newSize = clampSize(size, this._state);
      this._adapter.setContentSize(newSize);
      this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, newSize);
    }
  }

  /** Get/set max panel size. */
  public get max(): number | undefined {
    return this._max;
  }
  public set max(value: number | undefined) {
    if (this._max !== value) {
      this._max = value;
      this._applyMax();
    }
  }

  private _applyMax(): void {
    this._adapter.toggleHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.MAX, this._max !== undefined, this._max?.toString());

    if (this._position === 'default' || this._max === undefined) {
      return;
    }
    
    const size = this._adapter.getContentSize(this._orientation);
    if (size > this._max) {
      const newSize = clampSize(size, this._state);
      this._adapter.setContentSize(newSize);
      this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, newSize);
    }
  }

  /**
   * Get/set the accessible label.
   */
  public get accessibleLabel(): string {
    return this._accessibleLabel;
  }
  public set accessibleLabel(value: string) {
    if (this._accessibleLabel !== value) {
      this._accessibleLabel = value;
      this._applyAccessibleLabel();
    }
  }

  private _applyAccessibleLabel(): void {
    this._adapter.setHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.ACCESSIBLE_LABEL, this._accessibleLabel);
    this._adapter.setAccessibleLabel(this._accessibleLabel);
  }

  /**
   * Get/set whether the panel is open.
   */
  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    if (this._open !== value) {
      this._open = value;
      this._applyOpen();
    }
  }

  private _applyOpen(): void {
    this._adapter.setHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.OPEN, this._open.toString());
    this._adapter.setOpen(this._open, this._isInitialized);
  }

  /**
   * Get/set whether interactions are disabled.
   */
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._applyDisabled();
    }
  }

  private _applyDisabled(): void {
    this._adapter.toggleHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.DISABLED, this._disabled);
    this._adapter.setDisabled(this._disabled);
  }

  /**
   * Get/set whether closing the panel is disabled.
   */
  public get disableClose(): boolean {
    return this._disableClose;
  }
  public set disableClose(value: boolean) {
    if (this._disableClose !== value) {
      this._disableClose = value;
      this._applyDisableClose();
    }
  }

  private _applyDisableClose(): void {
    this._adapter.toggleHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.DISABLE_CLOSE, this._disableClose);
  }

  /**
   * Get/set whether the panel closes when a threshold size is reached.
   */
  public get autoClose(): boolean {
    return this._autoClose;
  }
  public set autoClose(value: boolean) {
    if (this._autoClose !== value) {
      this._autoClose = value;
      this._applyAutoClose();
    }
  }

  private _applyAutoClose(): void {
    this._adapter.toggleHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE, this._autoClose);
    if (this._isInitialized) {
      this._tryAutoClose();
    }
  }

  /** Get/set the size at which the panel auto closes. */
  public get autoCloseThreshold(): number {
    return this._autoCloseThreshold;
  }
  public set autoCloseThreshold(value: number) {
    if (this._autoCloseThreshold !== value) {
      this._autoCloseThreshold = value;
      this._applyAutoCloseThreshold();
    }
  }

  private _applyAutoCloseThreshold(): void {
    this._adapter.setHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE_THRESHOLD, this._autoCloseThreshold.toString());
    if (this._isInitialized) {
      this._tryAutoClose();
    }
  }

  /**
   * Gets the size of panel content without the handle.
   * @returns Content size in pixels.
   */
  public getContentSize(): number {
    return this._adapter.getContentSize(this._orientation);
  }

  /**
   * Gets how much the panel can shrink from its current size.
   * @returns The difference between the current and min size in pixels.
   */
  public getCollapsibleSize(): number {
    return this._adapter.getContentSize(this._orientation) - this._min;
  }

  /**
   * Sets a new size for the content area.
   * @param size The new content size in pixels.
   */
  public setContentSize(size: number): void {
    if (this._position !== 'default') {
      const newSize = clampSize(size, this._state);
      this._adapter.setContentSize(newSize);
      this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, newSize);
    }
  }

  /**
   * Sets whether the panel resizes horizontally or vertically.
   * @param value An orientation.
   */
  public setOrientation(value: SplitViewOrientation): void {
    this._orientation = value;
    this._applyOrientation();
  }

  /**
   * Sets the appropriate handle cursor.
   */
  public setCursor(): void {
    const size = this._adapter.getContentSize(this._orientation);
    const availableSpace = this._adapter.getAvailableSpace(this._orientation, this._position);

    handleBoundariesAfterResize(this._adapter, size, { ...this._state, availableSpace });
  }

  /**
   * Recalculates and sets the accessible value.
   */
  public updateAccessibility(): void {
    const size = this._adapter.getContentSize(this._orientation);
    const availableSpace = this._adapter.getAvailableSpace(this._orientation, this._position);
    const valueNow = getValueNow(size, { ...this._state, availableSpace });

    this._adapter.setValue(valueNow);
  }
}

import { ICustomElementFoundation } from '@tylertech/forge-core';

import { SplitViewPanelPosition, SPLIT_VIEW_PANEL_CONSTANTS } from './split-view-panel-constants';
import { ISplitViewPanelAdapter } from './split-view-panel-adapter';
import { SplitViewOrientation } from '../split-view/split-view-constants';
import { getActualMax, mapSizeToValue } from '../core/split-view-core-utils';
import { ISplitViewBase } from '../core/split-view-base';

export interface ISplitViewPanelFoundation extends ISplitViewBase, ICustomElementFoundation {
  position: SplitViewPanelPosition;
  min: number;
  max: number | undefined;
  label: string;
  open: boolean;
  getContentSize(): number;
  getCollapsibleSize(): number;
  setContentSize(size: number): void;
  setOrientation(value: SplitViewOrientation): void;
  updateAccessibility(): void;
}

export class SplitViewPanelFoundation implements ISplitViewPanelFoundation {
  // API
  private _position: SplitViewPanelPosition = 'default';
  private _size = 200;
  private _min = 0;
  private _max: number | undefined;
  private _label = 'Split view panel';
  private _open = true;
  private _disabled = false;
  private _disableClose = false;
  private _autoClose = false;

  private _autoCloseThreshold = 0;

  // State
  private _orientation: SplitViewOrientation = 'horizontal';
  private _isGrabbed = false;
  private _arrowKeyHeld = false;
  private _startPoint: number | undefined; // Set when dragging begins
  private _startSize: number | undefined; // Set when dragging begins
  private _currentSize: number | undefined; // Set when dragging begins
  private _availableSpace: number | undefined; // Set when dragging begins
  private _siblingSize: number | undefined; // Set when dragging begins
  private _keyboardDelta = 0 ;
  private _isInitialized = false;

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
    this._adapter.setPointerupListener(this._pointerupListener);
    this._adapter.setPointermoveListener(this._pointermoveListener);
    this._adapter.setKeydownListener(this._keydownListener);
    this._adapter.setKeyupListener(this._keyupListener);
    this._matchParentProperties();
    this._applyPosition();
    this._applyMin();
    this._applyMax();
    this._applySize();
    this._applyLabel();
    this._applyOpen();
    this._applyDisabled();
    this._applyDisableClose();
    this._applyAutoClose();
    this._isInitialized = true;
  }

  public disconnect(): void {
    this._adapter.removePointerupListener(this._pointerupListener);
    this._adapter.removePointermoveListener(this._pointermoveListener);
  }

  private _onPointerdown(evt: PointerEvent): void {
    if (this._disabled) {
      return;
    }

    evt.preventDefault();
    this._handlePointerdown(evt);
  }

  private _onPointerup(evt: PointerEvent): void {
    if (this._disabled) {
      return;
    }

    if (this._isGrabbed) {
      evt.preventDefault();
      this._handlePointerup();
    }
  }

  private _onPointermove(evt: PointerEvent): void {
    if (this._disabled) {
      return;
    }

    if (!this._isGrabbed) {
      return;
    }

    evt.preventDefault();

    // Detect when the mouse button is released outside of the document
    if (evt.buttons === 0) {
      this._handlePointerup();
    }

    this._handlePointermove(evt);
  }

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
    } else {
      this._tryHandleArrowKey(evt);
    }
  }

  private _onKeyup(evt: KeyboardEvent): void {
    this._tryHandleArrowKeyUp(evt);
  }

  /**
   * Toggles the open state.
   * 
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
   * 
   * @param evt
   */
  private _handleHomeKey(evt: KeyboardEvent): void {
    evt.preventDefault();

    this._adapter.setContentSize(this._min);

    const contentSize = this._adapter.getContentSize(this._orientation);
    this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, contentSize);
  }

  /**
   * Sets panel size to the max.
   * 
   * @param evt
   */
  private _handleEndKey(evt: KeyboardEvent): void {
    evt.preventDefault();

    const availableSpace = this._adapter.getAvailableSpace(this._orientation, this._position);
    const maxSize = getActualMax(this._max, availableSpace);
    this._adapter.setContentSize(maxSize);

    const contentSize = this._adapter.getContentSize(this._orientation);
    this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, contentSize);
  }

  /**
   * Runs resize logic if an arrow key is included in the event.
   * 
   * @param evt 
   */
  private _tryHandleArrowKey(evt: KeyboardEvent): void {
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

    if (this._position === 'end') {
      increment *= -1;
    }
    if (evt.shiftKey) {
      increment *= 10;
    }

    evt.preventDefault();
    this._tryHandleArrowKeyDown();
    this._handleArrowKeyHeld(increment);
  }

  /**
   * Sets resize properties when an arrow key is first pressed.
   */
  private _tryHandleArrowKeyDown(): void {
    if (!this._arrowKeyHeld) {
      this._startResize();
      this._keyboardDelta = 0;
    }
    this._arrowKeyHeld = true;
  }

  /**
   * Resizes the panel by a set amount.
   * 
   * @param increment The pixel change in size.
   */
  private _handleArrowKeyHeld(increment: number): void {
    if (this._startSize === undefined) {
      return;
    }

    this._keyboardDelta += increment;

    const newSize = this._startSize + this._keyboardDelta;
    this._currentSize = this._clampSize(newSize);
    this._adapter.setContentSize(this._currentSize);

    if (this._availableSpace || this._max) {
      const maxSize = getActualMax(this._max, this._availableSpace);
      this._setValue(this._currentSize, maxSize);
    } else {
      this._setValue(this._currentSize, this._currentSize);
    }

    this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, this._currentSize);

    this._resizeSibling(newSize, this._keyboardDelta * -1);
  }

  /**
   * Performs cleanup logic after a keyboard driven resize.
   * 
   * @param evt 
   */
  private _tryHandleArrowKeyUp(evt: KeyboardEvent): void {
    if (evt.key === 'ArrowLeft' || evt.key === 'ArrowRight' || evt.key === 'ArrowUp' || evt.key === 'ArrowDown') {
      // TODO: handle any work that should happen after resizing
      this._arrowKeyHeld = false;
      this._endResize();
      this._keyboardDelta = 0;
    }
  }

  /**
   * Handles the beginning of a pointer driven resize.
   * 
   * @param evt 
   */
  private _handlePointerdown(evt: MouseEvent): void {
    this._isGrabbed = true;
    this._adapter.setGrabbed(true, this._orientation);
    
    this._startPoint = this._orientation === 'horizontal' ? evt.clientX : evt.clientY;
    this._startResize();
  }

  /**
   * Handles the end of a pointer driven resize.
   */
  private _handlePointerup(): void {
    this._isGrabbed = false;
    this._adapter.setGrabbed(false, this._orientation);
    this._endResize();
  }

  /**
   * Resizes the panel from a pointer event.
   * 
   * @param evt 
   */
  private _handlePointermove(evt: PointerEvent): void {
    if (this._startPoint === undefined || this._startSize === undefined || this._position === 'default') {
      return;
    }

    const mousePoint = this._orientation === 'horizontal' ? evt.clientX : evt.clientY;
    let delta = this._startPoint - mousePoint;
    if (this._position === 'end') {
      delta *= -1;
    }
    const newSize = this._startSize - delta;
    this._currentSize = this._clampSize(newSize);
    this._adapter.setContentSize(this._currentSize);

    if (this._availableSpace || this._max) {
      const maxSize = getActualMax(this._max, this._availableSpace);
      this._setValue(this._currentSize, maxSize);
    } else {
      this._setValue(this._currentSize, this._currentSize);
    }

    this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, this._currentSize);

    this._resizeSibling(newSize, delta);
  }

  /**
   * Handles common logic to begin a resize.
   */
  private _startResize(): void {
    this._startSize = this._adapter.getContentSize(this._orientation);
    this._availableSpace = this._adapter.getAvailableSpace(this._orientation, this._position);
    this._siblingSize = this._adapter.getSiblingContentSize();

    this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.DRAG_START, this._startSize);
  }

  /**
   * Handles common logic to end a resize.
   */
  private _endResize(): void {
    this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.DRAG_END, this._currentSize);

    this._startPoint = undefined;
    this._startSize = undefined;
    this._currentSize = undefined;
    this._availableSpace = undefined;
    this._siblingSize = undefined;

    this._tryAutoClose();
  }

  /**
   * Sets the sibling size to reflect changes in this panel's size.
   * 
   * @param newSize This panel's current size.
   * @param delta The change in size since the resize began.
   */
  private _resizeSibling(newSize: number, delta: number): void {
    if (this._siblingSize !== undefined) {
      const minSizeAdjustment = Math.max(0, this._min - newSize);
      const maxSizeAdjustment = this._max ? Math.min(0, (this._max ?? 0) - newSize) : 0;
      const newSiblingContentSize = this._siblingSize + delta - minSizeAdjustment - maxSizeAdjustment;
      this._adapter.setSiblingContentSize(newSiblingContentSize);
    }
  }

  /**
   * Returns a size limited to an allowed range.
   * 
   * @param size The size to try setting this panel to.
   * @returns A pixel value.
   */
  private _clampSize(size: number): number {
    size = Math.max(size, this._min);
    size = Math.min(size, getActualMax(this._max, this._availableSpace));
    return size;
  }

  /**
   * Sets the accessible value.
   * 
   * @param size This panel's size in pixels.
   * @param maxSize The upper limit of this panel's size, including space ceded by the sibling panel.
   */
  private _setValue(size: number, maxSize: number): void {
    const value = mapSizeToValue(size, this._min, maxSize);
    this._adapter.setValue(value);
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
    // Match parent orientation
    const parentOrientation = this._adapter.getParentProperty('orientation') as SplitViewOrientation;
    if (!this._isInitialized || this._orientation !== parentOrientation) {
      this._orientation = parentOrientation;
      this._applyOrientation();
    }

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
  public get size(): number {
    return this._size;
  }
  public set size(value: number) {
    if (this._size !== value) {
      this._size = value;
      this._applySize();
    }
  }

  private _applySize(): void {
    this._adapter.setHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.SIZE, this._size.toString());
    this._adapter.setContentSize(this._size);
    // Wait for the DOM to render to get available space
    window.requestAnimationFrame(() => {
      const availableSpace = this._adapter.getAvailableSpace(this._orientation, this._position);
      const maxSize = getActualMax(this._max, availableSpace);
      const newValue = mapSizeToValue(this._size, this._min, maxSize);
      this._adapter.setValue(newValue);
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
    if (size > this._min) {
      const newSize = this._clampSize(size);
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
    if (size < this._max) {
      const newSize = this._clampSize(size);
      this._adapter.setContentSize(newSize);
      this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, newSize);
    }
  }

  /**
   * Get/set the accessible label.
   */
  public get label(): string {
    return this._label;
  }
  public set label(value: string) {
    if (this._label !== value) {
      this._label = value;
      this._applyLabel();
    }
  }

  private _applyLabel(): void {
    this._adapter.setHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.LABEL, this._label);
    this._adapter.setLabel(this._label);
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
    this._adapter.setOpen(this._open);
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
  }

  /**
   * Gets the size of panel content without the handle.
   * 
   * @returns Content size in pixels.
   */
  public getContentSize(): number {
    return this._adapter.getContentSize(this._orientation);
  }

  /**
   * Gets how much the panel can shrink from its current size.
   * 
   * @returns The difference between the current and min size in pixels.
   */
  public getCollapsibleSize(): number {
    return this._adapter.getContentSize(this._orientation) - this._min;
  }

  /**
   * Sets a new size for the content area.
   * 
   * @param size The new content size in pixels.
   */
  public setContentSize(size: number): void {
    if (this._position !== 'default') {
      const newSize = this._clampSize(size);
      this._adapter.setContentSize(newSize);
      this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, newSize);
    }
  }

  /**
   * Sets whether the panel resizes horizontally or vertically.
   * 
   * @param value An orientation.
   */
  public setOrientation(value: SplitViewOrientation): void {
    this._orientation = value;
    this._applyOrientation();
  }

  /**
   * Recalculates and sets the accessible value.
   */
  public updateAccessibility(): void {
    const size = this._adapter.getContentSize(this._orientation);
    const availableSpace = this._adapter.getAvailableSpace(this._orientation, this._position);

    if (availableSpace || this._max) {
      const maxSize = getActualMax(this._max, availableSpace);
      this._setValue(size, maxSize);
    } else {
      this._setValue(size, size);
    }
  }
}

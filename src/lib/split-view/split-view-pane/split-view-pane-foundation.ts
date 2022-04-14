import { ICustomElementFoundation } from '@tylertech/forge-core';

import { SplitViewPaneDirection, SPLIT_VIEW_PANE_CONSTANTS } from './split-view-pane-constants';
import { ISplitViewPaneAdapter } from './split-view-pane-adapter';
import { SplitViewOrientation } from '../split-view/split-view-constants';
import { getActualMax, mapSizeToValue } from '../core/split-view-core-utils';

export interface ISplitViewPaneFoundation extends ICustomElementFoundation {
  direction: SplitViewPaneDirection;
  label: string;
  open: boolean;
  disabled: boolean;
  getContentSize(): number;
  getCollapsibleSize(): number;
  setContentSize(size: number): void;
  setOrientation(value: SplitViewOrientation): void;
}

export class SplitViewPaneFoundation implements ISplitViewPaneFoundation {
  // API
  private _direction: SplitViewPaneDirection = 'none';
  private _size = 200;
  private _min = 0;
  private _max: number | undefined;
  private _label = 'Split view pane';
  private _open = true;
  private _disabled = false;

  // State
  private _orientation: SplitViewOrientation = 'horizontal';
  private _isGrabbed = false;
  private _startPoint: number | undefined; // Set when dragging begins
  private _startSize: number | undefined; // Set when dragging begins
  private _currentSize: number | undefined; // Set when dragging begins
  private _availableSpace: number | undefined; // Set when dragging begins
  private _siblingSize: number | undefined; // Set when dragging begins
  private _isInitialized = false;

  // Listeners
  // TODO: incorporate touch event handlers?
  private _mousedownListener: (evt: MouseEvent) => void;
  private _mouseupListener: (evt: MouseEvent) => void;
  private _mousemoveListener: (evt: MouseEvent) => void;
  private _keydownListener: (evt: KeyboardEvent) => void;

  constructor(private _adapter: ISplitViewPaneAdapter) {
    this._mousedownListener = evt => this._onMousedown(evt);
    this._mouseupListener = evt => this._onMouseup(evt);
    this._mousemoveListener = evt => this._onMousemove(evt);
    this._keydownListener = evt => this._onKeydown(evt);
  }

  public initialize(): void {
    this._adapter.initialize();
    this._adapter.setMousedownListener(this._mousedownListener);
    this._adapter.setMouseupListener(this._mouseupListener);
    this._adapter.setMousemoveListener(this._mousemoveListener);
    this._adapter.setKeydownListener(this._keydownListener);
    this._matchParentProperties();
    this._applyDirection();
    this._applySize();
    this._applyLabel();
    this._applyOpen();
    this._applyDisabled();
    this._isInitialized = true;
  }

  public disconnect(): void {
    this._adapter.removeMouseupListener(this._mouseupListener);
    this._adapter.removeMousemoveListener(this._mousemoveListener);
  }

  private _onMousedown(evt: MouseEvent): void {
    if (this._disabled) {
      return;
    }

    evt.preventDefault();
    this._grab(evt);
  }

  private _onMouseup(evt: MouseEvent): void {
    if (this._disabled) {
      return;
    }

    if (this._isGrabbed) {
      evt.preventDefault();
      this._release();
    }
  }

  private _onMousemove(evt: MouseEvent): void {
    if (this._disabled) {
      return;
    }

    if (!this._isGrabbed) {
      return;
    }

    evt.preventDefault();

    // Detect when the mouse button is released outside of the document
    if (evt.buttons === 0) {
      this._release();
    }

    this._resize(evt);
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

  private _handleEnterKey(evt: KeyboardEvent): void {
    evt.preventDefault();
    this._open = !this._open;
    this._applyOpen();
  }

  private _handleHomeKey(evt: KeyboardEvent): void {
    evt.preventDefault();
    this._adapter.setContentSize(this._min);
    this._adapter.emitHostEvent(SPLIT_VIEW_PANE_CONSTANTS.events.RESIZE, this._adapter.getContentSize(this._orientation));
  }

  private _handleEndKey(evt: KeyboardEvent): void {
    evt.preventDefault();
    console.log({ max: this._max, availableSpace: this._adapter.getAvailableSpace(this._orientation, this._direction) });
    this._adapter.setContentSize(getActualMax(this._max, this._adapter.getAvailableSpace(this._orientation, this._direction)));
    this._adapter.emitHostEvent(SPLIT_VIEW_PANE_CONSTANTS.events.RESIZE, this._adapter.getContentSize(this._orientation));
  }

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

    evt.preventDefault();

    if (this._direction === 'end') {
      increment *= -1;
    }
    if (evt.shiftKey) {
      increment *= 10;
    }

    // TODO: get and cap at available space when using keyboard, could be a performance drain when repeated
    // TODO: set sibling pane size when using keyboard, also a possible performance drain
    let newSize = this._adapter.getContentSize(this._orientation);
    newSize = this._clampSize(newSize + increment);
    this._adapter.setContentSize(newSize);
    this._currentSize = newSize;
    this._adapter.emitHostEvent(SPLIT_VIEW_PANE_CONSTANTS.events.RESIZE, this._currentSize);
  }

  private _grab(evt: MouseEvent): void {
    this._isGrabbed = true;
    this._adapter.setGrabbed(true, this._orientation);
    
    this._startPoint = this._orientation === 'horizontal' ? evt.clientX : evt.clientY;
    this._startSize = this._adapter.getContentSize(this._orientation);
    this._availableSpace = this._adapter.getAvailableSpace(this._orientation, this._direction);
    this._siblingSize = this._adapter.getSiblingContentSize();

    this._adapter.emitHostEvent(SPLIT_VIEW_PANE_CONSTANTS.events.DRAG_START, this._startSize);
  }

  private _release(): void {
    this._isGrabbed = false;
    this._adapter.setGrabbed(false, this._orientation);
    this._adapter.emitHostEvent(SPLIT_VIEW_PANE_CONSTANTS.events.DRAG_END, this._currentSize);

    this._startPoint = undefined;
    this._startSize = undefined;
    this._currentSize = undefined;
    this._availableSpace = undefined;
    this._siblingSize = undefined;
  }

  private _resize(evt: MouseEvent): void {
    if (this._startPoint === undefined || this._startSize === undefined || this._direction === 'none') {
      return;
    }

    const mousePoint = this._orientation === 'horizontal' ? evt.clientX : evt.clientY;
    let delta = this._startPoint - mousePoint;
    if (this._direction === 'end') {
      delta *= -1;
    }
    const newSize = this._startSize - delta;
    this._currentSize = this._clampSize(newSize);
    this._adapter.setContentSize(this._currentSize);

    if (this._availableSpace || this._max) {
      this._setValue(this._currentSize, getActualMax(this._max, this._availableSpace));
    } else {
      this._setValue(this._currentSize, this._currentSize);
    }

    this._adapter.emitHostEvent(SPLIT_VIEW_PANE_CONSTANTS.events.RESIZE, this._currentSize);

    this._resizeSibling(newSize, delta);
  }

  private _resizeSibling(newSize: number, delta: number): void {
    if (this._siblingSize !== undefined) {
      const minSizeAdjustment = Math.max(0, this._min - newSize);
      const maxSizeAdjustment = this._max ? Math.min(0, (this._max ?? 0) - newSize) : 0;
      this._adapter.setSiblingContentSize(this._siblingSize + delta - minSizeAdjustment - maxSizeAdjustment);
    }
  }

  private _clampSize(size: number): number {
    size = Math.max(size, this._min);
    size = Math.min(size, getActualMax(this._max, this._availableSpace));
    return size;
  }

  private _setValue(size: number, maxSize: number): void {
    const value = mapSizeToValue(size, this._min, maxSize);
    this._adapter.setValue(value);
  }

  private _matchParentProperties(): void {
    // Match parent orientation
    const parentOrientation = this._adapter.getParentProperty('orientation') as SplitViewOrientation;
    if (!this._isInitialized || this._orientation !== parentOrientation) {
      this._orientation = parentOrientation;
      this._applyOrientation();
    }

    // Match parent disabled status
    const parentDisabled = this._adapter.getParentProperty('disabled') as boolean;
    if (!this._isInitialized || this._disabled !== parentDisabled) {
      this._disabled = parentDisabled;
      this._applyDisabled();
    }
  }

  private _applyOrientation(): void {
    this._adapter.setOrientation(this._orientation);
  }

  public get direction(): SplitViewPaneDirection {
    return this._direction;
  }
  public set direction(value: SplitViewPaneDirection) {
    if (this._direction !== value) {
      this._direction = value;
      this._applyDirection();
    }
  }

  private _applyDirection(): void {
    this._adapter.setHostAttribute(SPLIT_VIEW_PANE_CONSTANTS.attributes.DIRECTION, this._direction);
    this._adapter.setDirection(this._direction);
  }

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
    this._adapter.setHostAttribute(SPLIT_VIEW_PANE_CONSTANTS.attributes.SIZE, this._size.toString());
    this._adapter.setContentSize(this._size);
    // Wait for the DOM to render to get available space
    window.requestAnimationFrame(() => {
      this._adapter.setValue(mapSizeToValue(this._size, this._min, getActualMax(this._max, this._adapter.getAvailableSpace(this._orientation, this._direction))));
    });
  }

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
    this._adapter.setHostAttribute(SPLIT_VIEW_PANE_CONSTANTS.attributes.LABEL, this._label);
    this._adapter.setLabel(this._label);
  }

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
    this._adapter.setHostAttribute(SPLIT_VIEW_PANE_CONSTANTS.attributes.OPEN, this._open.toString());
    this._adapter.setOpen(this._open);
  }

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
    this._adapter.toggleHostAttribute(SPLIT_VIEW_PANE_CONSTANTS.attributes.DISABLED, this._disabled);
    this._adapter.setDisabled(this._disabled);
  }

  public getContentSize(): number {
    return this._adapter.getContentSize(this._orientation);
  }

  public getCollapsibleSize(): number {
    return this._adapter.getContentSize(this._orientation) - this._min;
  }

  public setContentSize(size: number): void {
    if (this._direction !== 'none') {
      const newSize = this._clampSize(size);
      this._adapter.setContentSize(newSize);
      this._adapter.emitHostEvent(SPLIT_VIEW_PANE_CONSTANTS.events.RESIZE, newSize);
    }
  }

  public setOrientation(value: SplitViewOrientation): void {
    this._orientation = value;
    this._applyOrientation();
  }
}

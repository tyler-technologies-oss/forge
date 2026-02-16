import { isDefined } from '@tylertech/forge-core';

import { safeMin, scaleValue } from '../../core/utils/utils.js';
import { eventIncludesArrowKey } from '../../core/utils/event-utils.js';
import {
  ISplitViewPanelOpenEvent,
  ISplitViewPanelState,
  SplitViewInputDeviceType,
  SplitViewPanelResizable,
  SPLIT_VIEW_PANEL_CONSTANTS
} from './split-view-panel-constants.js';
import { ISplitViewPanelAdapter } from './split-view-panel-adapter.js';
import { ISplitViewUpdateConfig, SplitViewOrientation } from '../split-view/split-view-constants.js';
import { ISplitViewBase } from '../core/split-view-base.js';
import {
  clampSize,
  clearState,
  getPixelDimension,
  getValuenow,
  handleBoundariesAfterResize,
  handleBoundariesDuringResize,
  initState,
  keyboardResize,
  maxResize,
  minResize,
  pointerResize,
  setState
} from './split-view-panel-utils.js';

export interface ISplitViewPanelCore extends Partial<ISplitViewBase> {
  resizable: SplitViewPanelResizable;
  size: number | string;
  min: number | string;
  max: number | string | undefined;
  accessibleLabel: string;
  open: boolean;
  getContentSize(): number;
  getCollapsibleSize(): number;
  setContentSize(size: number): void;
  update(config: ISplitViewUpdateConfig): void;
}

export class SplitViewPanelCore implements ISplitViewPanelCore {
  // API
  private _size: number | string = 200;
  private _min: number | string = 0;
  private _max: number | string | undefined;
  private _accessibleLabel = 'Split view panel';
  private _open = true;
  private _disabled?: boolean;
  private _allowClose?: boolean;
  private _autoClose?: boolean;
  private _autoCloseThreshold?: number;

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

  private get _resizable(): SplitViewPanelResizable {
    return this._state.resizable;
  }
  private set _resizable(value: SplitViewPanelResizable) {
    this._state.resizable = value;
  }

  private get _pixelMin(): number {
    return this._state.min;
  }
  private set _pixelMin(value: number) {
    this._state.min = value;
  }

  private get _pixelMax(): number | undefined {
    return this._state.max;
  }
  private set _pixelMax(value: number | undefined) {
    this._state.max = value;
  }

  // Properties inherited from parent split view
  private _parentProperties: Partial<ISplitViewBase> = {};

  // Applied properties that can be inherited from parent
  private get _appliedDisabled(): boolean {
    return this._disabled ?? this._parentProperties.disabled ?? false;
  }

  private get _appliedAllowClose(): boolean {
    return this._allowClose ?? this._parentProperties.allowClose ?? false;
  }

  private get _appliedAutoClose(): boolean {
    return this._autoClose ?? this._parentProperties.autoClose ?? false;
  }

  private get _appliedAutoCloseThreshold(): number {
    return this._autoCloseThreshold ?? this._parentProperties.autoCloseThreshold ?? 0;
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
    this._getParentProperties();
    this._applyResizable();
    this._applyMin();
    this._applyMax();
    this._applySize();
    this._applyAccessibleLabel();
    this._applyOpen();
    this._applyDisabled();
    this._applyAllowClose();
    this._applyAutoClose();
    this._applyAutoCloseThreshold();
    this._isInitialized = true;
  }

  public destroy(): void {
    this._adapter.tryRemoveOverlay();
    this._adapter.removePointerupListener(this._pointerupListener);
    this._adapter.removePointermoveListener(this._pointermoveListener);
  }

  /**
   * Handles a pointerdown event and sets further pointer event listeners.
   * @param evt The pointer event.
   */
  private _onPointerdown(evt: PointerEvent): void {
    if (this._appliedDisabled || !this._allowResize('pointer')) {
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
    if (this._appliedDisabled) {
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
    if (this._appliedDisabled) {
      return;
    }

    if (evt.key === 'Enter') {
      this._handleEnterKey(evt);
    } else if (evt.key === 'Home' && this._allowResize('keyboard')) {
      this._handleHomeKey(evt);
    } else if (evt.key === 'End' && this._allowResize('keyboard')) {
      this._handleEndKey(evt);
    } else if (eventIncludesArrowKey(evt) && this._allowResize('keyboard')) {
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
    if (!this._appliedAllowClose) {
      return;
    }

    evt.preventDefault();
    this._tryOpenOrClose(!this._open, false, true);
  }

  /**
   * Sets panel size to the min.
   * @param evt
   */
  private _handleHomeKey(evt: KeyboardEvent): void {
    evt.preventDefault();

    const size = minResize(this._adapter, this._state);
    this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, size);
    this._tryAutoClose();
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

    if (this._resizable === 'start') {
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
    if (pointerResize(this._adapter, evt, this._state)) {
      this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, this._state.currentSize);
    }
  }

  /**
   * Emits a will resize event and allows it to be cancelled.
   * @returns Whether the resize should proceed.
   */
  private _allowResize(inputDeviceType: SplitViewInputDeviceType): boolean {
    return this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_RESIZE, { inputDeviceType }, true, true);
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
    this._adapter.updateParent({ accessibility: this._state.startSize !== this._state.currentSize, cursor: true });
    this._state = clearState(this._state);
    this._tryAutoClose();
  }

  /**
   * Emits a will open or will close event and sets the panel open or closed if allowed.
   * @param shouldOpen Whether the panel should open or close. Defaults to `true`.
   * @param auto Whether the panel auto-opened or auto-closed.
   * @param userInitiated Whether opening or closing via user action instead of programmatically.
   */
  private _tryOpenOrClose(shouldOpen = true, auto = false, userInitiated = false): void {
    const eventType = shouldOpen ? SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_OPEN : SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_CLOSE;
    const event: ISplitViewPanelOpenEvent = {
      auto,
      userInitiated
    };
    const isAllowed = this._adapter.emitHostEvent(eventType, event, true, true);
    if (!isAllowed) {
      return;
    }
    this._open = shouldOpen;
    this._applyOpen(event);
  }

  /**
   * Auto close the panel if enabled and within the size threshold.
   */
  private _tryAutoClose(): void {
    const size = this._adapter.getContentSize(this._orientation);
    if (this._appliedAutoClose && size <= this._appliedAutoCloseThreshold) {
      this._tryOpenOrClose(false, true, false);
    }
  }

  /**
   * Sets orientation, disabled, disable close, and autoclose to reflect the parent split view.
   */
  private _getParentProperties(): void {
    // Parent disabled state
    const parentDisabled = this._adapter.getParentProperty('disabled') as boolean;
    this._parentProperties.disabled = parentDisabled;
    this._applyParentDisabled();

    // Parent disable close
    const parentAllowClose = this._adapter.getParentProperty('allowClose') as boolean;
    this._parentProperties.allowClose = parentAllowClose;

    // Parent auto close
    const parentAutoClose = this._adapter.getParentProperty('autoClose') as boolean;
    this._parentProperties.autoClose = parentAutoClose;
    this._applyParentAutoClose();

    // Parent auto close threshold
    const parentAutoCloseThreshold = this._adapter.getParentProperty('autoCloseThreshold') as number;
    this._parentProperties.autoCloseThreshold = parentAutoCloseThreshold;
    this._applyParentAutoCloseThreshold();
  }

  private _applyOrientation(): void {
    this._adapter.setOrientation(this._orientation);
  }

  /**
   * Get/set resizable. This affects the side the handle appears on and the direction the panel closes into.
   */
  public get resizable(): SplitViewPanelResizable {
    return this._resizable;
  }
  public set resizable(value: SplitViewPanelResizable) {
    if (this._resizable !== value) {
      this._resizable = value;
      this._applyResizable();
    }
  }

  private _applyResizable(): void {
    this._adapter.setHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.RESIZABLE, this._resizable);
    this._adapter.setResizable(this._resizable);
  }

  /**
   * Get/set panel size.
   */
  public get size(): number | string {
    return this._size;
  }
  public set size(value: number | string) {
    if (this._size.toString() !== value.toString()) {
      this._size = value;
      this._applySize();
    }
  }

  private _applySize(): void {
    const parentSize = this._adapter.getParentSize(this._orientation);
    const pixelSize = getPixelDimension(this._size, parentSize);

    this._adapter.setHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.SIZE, this._size.toString());
    this._adapter.setContentSize(pixelSize);
    // Wait for the DOM to render to get available space
    window.requestAnimationFrame(() => {
      const availableSpace = this._adapter.getAvailableSpace(this._orientation, this._resizable);
      const maxSize = safeMin(this._pixelMax, availableSpace);
      const newValue = scaleValue(pixelSize, this._pixelMin, maxSize);
      this._adapter.setValuenow(newValue);
      this._adapter.updateParent({ cursor: true });
    });
  }

  /** Get/set min panel size. */
  public get min(): number | string {
    return this._min;
  }
  public set min(value: number | string) {
    if (this._min.toString() !== value.toString()) {
      this._min = value;
      this._applyMin();
    }
  }

  private _applyMin(): void {
    this._adapter.setHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.MIN, this._min.toString());

    const parentSize = this._adapter.getParentSize(this._orientation);
    this._pixelMin = getPixelDimension(this._min, parentSize);

    if (this._resizable === 'off') {
      return;
    }

    const size = this._adapter.getContentSize(this._orientation);
    if (size < this._pixelMin) {
      this.setContentSize(size);
    }
  }

  /** Get/set max panel size. */
  public get max(): number | string | undefined {
    return this._max;
  }
  public set max(value: number | string | undefined) {
    if (this._max?.toString() !== value?.toString()) {
      this._max = value;
      this._applyMax();
    }
  }

  private _applyMax(): void {
    this._adapter.toggleHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.MAX, this._max !== undefined, this._max?.toString());

    if (this._max === undefined) {
      this._pixelMax = undefined;
      return;
    }

    const parentSize = this._adapter.getParentSize(this._orientation);
    this._pixelMax = getPixelDimension(this._max, parentSize);

    if (this._resizable === 'off') {
      return;
    }

    const size = this._adapter.getContentSize(this._orientation);
    if (size > this._pixelMax) {
      this.setContentSize(size);
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
      if (this._isInitialized) {
        this._tryOpenOrClose(value, false, false);
        return;
      }

      this._open = value;
      const event: ISplitViewPanelOpenEvent | undefined = this._isInitialized
        ? {
            auto: false,
            userInitiated: false
          }
        : undefined;
      this._applyOpen(event);
    }
  }

  private _applyOpen(event?: ISplitViewPanelOpenEvent): void {
    this._adapter.setHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.OPEN, this._open.toString());
    this._adapter.setOpen(this._open, this._isInitialized, event);
  }

  /**
   * Get/set whether interactions are disabled.
   */
  public get disabled(): boolean | undefined {
    return this._disabled;
  }
  public set disabled(value: boolean | undefined) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._applyDisabled();
    }
  }

  private _applyDisabled(): void {
    this._adapter.toggleHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.DISABLED, this._disabled ?? false);
    this._adapter.setDisabled(this._appliedDisabled);
  }

  private _applyParentDisabled(): void {
    if (this._isInitialized && !isDefined(this._disabled)) {
      this._adapter.setDisabled(this._appliedDisabled);
    }
  }

  /**
   * Get/set whether closing the panel is disabled.
   */
  public get allowClose(): boolean | undefined {
    return this._allowClose;
  }
  public set allowClose(value: boolean | undefined) {
    if (this._allowClose !== value) {
      this._allowClose = value;
      this._applyAllowClose();
    }
  }

  private _applyAllowClose(): void {
    this._adapter.toggleHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.ALLOW_CLOSE, this._allowClose ?? false);
  }

  /**
   * Get/set whether the panel closes when a threshold size is reached.
   */
  public get autoClose(): boolean | undefined {
    return this._autoClose;
  }
  public set autoClose(value: boolean | undefined) {
    if (this._autoClose !== value) {
      this._autoClose = value;
      this._applyAutoClose();
    }
  }

  private _applyAutoClose(): void {
    this._adapter.toggleHostAttribute(SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE, this._autoClose ?? false);
    if (this._isInitialized) {
      this._tryAutoClose();
    }
  }

  private _applyParentAutoClose(): void {
    if (this._isInitialized && !isDefined(this._autoClose)) {
      this._tryAutoClose();
    }
  }

  /** Get/set the size at which the panel auto closes. */
  public get autoCloseThreshold(): number | undefined {
    return this._autoCloseThreshold;
  }
  public set autoCloseThreshold(value: number | undefined) {
    if (this._autoCloseThreshold !== value) {
      this._autoCloseThreshold = value;
      this._applyAutoCloseThreshold();
    }
  }

  private _applyAutoCloseThreshold(): void {
    this._adapter.toggleHostAttribute(
      SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE_THRESHOLD,
      isDefined(this._autoCloseThreshold),
      this.autoCloseThreshold?.toString()
    );
    if (this._isInitialized) {
      this._tryAutoClose();
    }
  }

  private _applyParentAutoCloseThreshold(): void {
    if (this._isInitialized && !isDefined(this._autoCloseThreshold)) {
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
    const parentSize = this._adapter.getParentSize(this._orientation);
    const pixelMin = getPixelDimension(this._min, parentSize);
    return this._adapter.getContentSize(this._orientation) - pixelMin;
  }

  /**
   * Sets a new size for the content area.
   * @param size The new content size in pixels.
   */
  public setContentSize(size: number): void {
    if (this._resizable === 'off') {
      return;
    }

    const newSize = clampSize(size, this._state);
    this._adapter.setContentSize(newSize);
    if (this._isInitialized) {
      this._adapter.emitHostEvent(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, newSize);
    }
  }

  /**
   * Updates the proved characteristics.
   * @param config An update configuration.
   */
  public update(config: ISplitViewUpdateConfig): void {
    // Orientation
    if (config.orientation) {
      this._orientation = config.orientation;
      this._applyOrientation();
    }

    // Parent properties
    if (config.properties) {
      if (isDefined(config.properties.disabled) && this._parentProperties.disabled !== config.properties.disabled) {
        this._parentProperties.disabled = config.properties.disabled;
        this._applyDisabled();
      }
      if (isDefined(config.properties.allowClose)) {
        this._parentProperties.allowClose = config.properties.allowClose;
      }
      if (isDefined(config.properties.autoClose) && this._parentProperties.autoClose !== config.properties.autoClose) {
        this._parentProperties.autoClose = config.properties.autoClose;
        if (!isDefined(this._autoClose)) {
          this._applyAutoClose();
        }
      }
      if (isDefined(config.properties.autoCloseThreshold) && this._parentProperties.autoCloseThreshold !== config.properties.autoCloseThreshold) {
        this._parentProperties.autoCloseThreshold = config.properties.autoCloseThreshold;
        if (!isDefined(this._autoCloseThreshold)) {
          this._applyAutoCloseThreshold();
        }
      }
    }

    // Size
    if (config.size && this.open) {
      const parentSize = this._adapter.getParentSize(this._orientation);
      this._pixelMin = getPixelDimension(this._min, parentSize);
      this._pixelMax = isDefined(this._max) ? getPixelDimension(this._max as number | string, parentSize) : undefined;
      this.setContentSize(this._adapter.getContentSize(this._orientation));
    }

    // The following properties don't apply to non-resizable panels
    if (this._resizable === 'off') {
      return;
    }

    const size = this._adapter.getContentSize(this._orientation);
    const availableSpace = this._adapter.getAvailableSpace(this._orientation, this._resizable);

    // Accessibility
    if (config.accessibility && this.open) {
      const valueNow = getValuenow(size, { ...this._state, availableSpace });
      this._adapter.setValuenow(valueNow);
    }

    // Contextual cursor
    if (config.cursor) {
      handleBoundariesAfterResize(this._adapter, size, { ...this._state, availableSpace });
    }
  }
}

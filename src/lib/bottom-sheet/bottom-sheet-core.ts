import { getEventPath, ICustomElementCore } from '@tylertech/forge-core';
import { DIALOG_CONSTANTS } from '../dialog';
import { IBottomSheetAdapter } from './bottom-sheet-adapter';
import { BottomSheetMode, BOTTOM_SHEET_CONSTANTS, IBottomSheetDragContext } from './bottom-sheet-constants';

export interface IBottomSheetCore extends ICustomElementCore {
  mode: BottomSheetMode;
  open: boolean;
  persistent: boolean;
  fullscreen: boolean;
}

export class BottomSheetCore implements IBottomSheetCore {
  private _open = false;
  private _mode: BottomSheetMode = 'nonmodal';
  private _persistent = false;
  private _fullscreen = false;
  private _isDragging = false;
  private _dragContext: IBottomSheetDragContext | undefined;
  private _lastPosition: { y: number; clientY: number } | undefined;
  private _bodyScrollHandler = (): void => this._onBodyScroll();
  private _dragStartHandler: EventListener = this._onDragStart.bind(this);
  private _dragMoveHandler: EventListener = this._onDragMove.bind(this);
  private _dragEndHandler: EventListener = this._onDragEnd.bind(this);
  private _dragCancelHandler: EventListener = this._onDragCancel.bind(this);
  private _dialogDismissListener: EventListener = this._onDialogDismiss.bind(this);
  private _dialogBeforeCloseListener: EventListener = this._onDialogBeforeClose.bind(this);

  constructor(public _adapter: IBottomSheetAdapter) {}

  public initialize(): void {
    this._adapter.initialize();
    if (this._open) {
      this._openBottomSheet();
    }
  }

  private _openBottomSheet(): void {
    if (this._fullscreen) {
      this._adapter.setFullscreen(true);
    }

    this._adapter.addDialogListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, this._dialogBeforeCloseListener);
    this._adapter.addDialogListener(DIALOG_CONSTANTS.events.CLOSE, this._dialogDismissListener);
    this._adapter.open();

    if (this._adapter.isScrollable()) {
      this._initScrollableHandlers();
    }

    this._adapter.trySetInitialFocus();

    this._adapter.setBodyAttribute(BOTTOM_SHEET_CONSTANTS.attributes.OPEN, 'true');
    this._adapter.dispatchHostEvent(new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.OPEN, { bubbles: true }));
  }

  private _closeBottomSheet(): void {
    this._adapter.removeDialogListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, this._dialogBeforeCloseListener);
    this._adapter.removeDialogListener(DIALOG_CONSTANTS.events.CLOSE, this._dialogDismissListener);
    this._adapter.close();
    this._adapter.dispatchHostEvent(new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.CLOSE, { bubbles: true }));
    this._open = false;
    this._adapter.setFullscreen(false);
  }

  private _onDialogDismiss(): void {
    this._closeBottomSheet();
  }

  private _onDialogBeforeClose(evt: CustomEvent): void {
    const beforeCloseEvent = new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, {
      bubbles: true,
      cancelable: true
    });
    this._adapter.dispatchHostEvent(beforeCloseEvent);
    if (beforeCloseEvent.defaultPrevented) {
      evt.preventDefault();
    }
  }

  /** If scrollable, allow drag to/from fullscreen, and make fullscreen on scroll. */
  private _initScrollableHandlers(): void {
    if (!this._adapter.isFullscreen() && this._adapter.isScrollable()) {
      this._adapter.setDragTargetHandler('mousedown', this._dragStartHandler);
      this._adapter.setDragTargetHandler('touchstart', this._dragStartHandler);
      this._adapter.setBodyScrollHandler(this._bodyScrollHandler);
    }
  }

  private _onBodyScroll(): void {
    if (!this._adapter.isFullscreen() && !this._isDragging) {
      this._adapter.setFullscreen(true);
      this._adapter.dispatchHostEvent(new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.FULLSCREEN, { bubbles: true, detail: true }));
    }
  }

  private _onDragStart(evt: MouseEvent | TouchEvent): void {
    if (this._adapter.isFullscreen()) {
      const eventPath = getEventPath(evt);
      const isWithinScrollContainer = this._adapter.isScrollable() && this._adapter.isContentChild(eventPath[0]);
      if (isWithinScrollContainer) {
        // We ignore drag events that originate from within the scrollable content when in full screen mode (to allow for scroll interactions)
        return;
      }
    }

    evt.stopPropagation();

    const bounds = this._adapter.getContainerBounds();
    const clientY = evt instanceof MouseEvent ? evt.clientY : evt.touches[0].clientY;
    this._dragContext = {
      top: clientY - bounds.top,
      height: bounds.height
    };
    this._adapter.setBodyListener('mousemove', this._dragMoveHandler, { passive: false });
    this._adapter.setBodyListener('touchmove', this._dragMoveHandler, { passive: false });
    this._adapter.setBodyListener('mouseup', this._dragEndHandler);
    this._adapter.setBodyListener('touchend', this._dragEndHandler);
    this._adapter.setBodyListener('touchcancel', this._dragCancelHandler);
  }

  private _onDragMove(evt: MouseEvent | TouchEvent): void {
    evt.stopPropagation();
    evt.preventDefault();
    if (!this._dragContext) {
      return;
    }
    const clientY = evt instanceof MouseEvent ? evt.clientY : evt.touches[0].clientY;
    const height = { y: window.innerHeight - clientY + this._dragContext.top };

    // If this is the beginning of the move sequence, we emit the start event (to allow for preventing default) and
    // then update the surface position if not prevented
    if (!this._isDragging) {
      this._isDragging = true;
      const dragStartEvt = new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.DRAG_START, {
        bubbles: true,
        detail: height,
        cancelable: true
      });
      this._adapter.dispatchHostEvent(dragStartEvt);
      if (dragStartEvt.defaultPrevented) {
        return;
      }
      this._adapter.setDragging(true);
    }

    // If not fullscreen, clamp to minimum of original height.
    const newPosition = this._adapter.isFullscreen() ? height : { y: Math.max(height.y, this._dragContext.height) };

    // Only update the position if it actually changed
    if (!this._lastPosition || newPosition.y !== this._lastPosition.y) {
      const dragMoveEvt = new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.DRAGGED, {
        bubbles: true,
        detail: newPosition,
        cancelable: true
      });
      this._adapter.dispatchHostEvent(dragMoveEvt);
      if (dragMoveEvt.defaultPrevented) {
        return;
      }
      this._lastPosition = { ...newPosition, clientY };
      this._adapter.setContainerHeight(newPosition.y);
    }
  }

  private _onDragEnd(): void {
    if (this._lastPosition) {
      const clientY = this._lastPosition.clientY;
      const dragContext = this._dragContext;
      if (dragContext) {
        const isFullscreen = this._adapter.isFullscreen();
        if (isFullscreen && clientY > 0) {
          this._adapter.setFullscreen(false);
        } else if (!isFullscreen && clientY < dragContext.height + dragContext.top) {
          this._adapter.setFullscreen(true);
        }
        const fullscreenEvt = new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.FULLSCREEN, {
          bubbles: true,
          detail: isFullscreen
        });
        this._adapter.dispatchHostEvent(fullscreenEvt);
      }
    }
    if (this._isDragging) {
      const dragEndEvt = new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.DRAG_END, { bubbles: true });
      this._adapter.dispatchHostEvent(dragEndEvt);
    }
    this._dragComplete();
  }

  private _onDragCancel(): void {
    if (this._isDragging) {
      const dragCancelEvt = new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.DRAG_CANCEL, { bubbles: true });
      this._adapter.dispatchHostEvent(dragCancelEvt);
    }
    this._dragComplete();
  }

  private _dragComplete(): void {
    this._adapter.setDragging(false);
    this._adapter.removeBodyListener('mousemove', this._dragMoveHandler);
    this._adapter.removeBodyListener('touchmove', this._dragMoveHandler);
    this._adapter.removeBodyListener('mouseup', this._dragEndHandler);
    this._adapter.removeBodyListener('touchend', this._dragEndHandler);
    this._adapter.removeBodyListener('touchcancel', this._dragCancelHandler);
    this._adapter.setContainerHeight(null);
    this._lastPosition = undefined;
    this._dragContext = undefined;
    this._isDragging = false;
  }

  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    value = Boolean(value);
    if (this._open !== value) {
      this._open = value;
      if (this._adapter.isConnected) {
        if (this._open) {
          this._openBottomSheet();
        } else {
          this._closeBottomSheet();
        }
      }
      this._adapter.toggleHostAttribute(BOTTOM_SHEET_CONSTANTS.attributes.OPEN, value);
    }
  }

  public get mode(): BottomSheetMode {
    return this._mode;
  }
  public set mode(value: BottomSheetMode) {
    if (this._mode !== value) {
      this._mode = value;
      this._adapter.setDialogProperty('mode', this._mode);
    }
  }

  public get persistent(): boolean {
    return this._persistent;
  }
  public set persistent(value: boolean) {
    value = Boolean(value);
    if (this._persistent !== value) {
      this._persistent = value;
      this._adapter.setDialogProperty('persistent', this._persistent);
      this._adapter.toggleHostAttribute(BOTTOM_SHEET_CONSTANTS.attributes.PERSISTENT, this._persistent);
    }
  }

  public get fullscreen(): boolean {
    return this._fullscreen;
  }
  public set fullscreen(value: boolean) {
    if (this._fullscreen !== value) {
      this._fullscreen = value;
      this._adapter.setFullscreen(this._fullscreen);
      this._adapter.toggleHostAttribute(BOTTOM_SHEET_CONSTANTS.attributes.FULLSCREEN, this._fullscreen);
    }
  }
}

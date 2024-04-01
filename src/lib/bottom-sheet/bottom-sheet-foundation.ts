import { ICustomElementFoundation, getEventPath } from '@tylertech/forge-core';

import { IBottomSheetAdapter } from './bottom-sheet-adapter';
import { BOTTOM_SHEET_CONSTANTS, IBottomSheetDragContext, IBottomSheetDragStartEventData } from './bottom-sheet-constants';

export interface IBottomSheetFoundation extends ICustomElementFoundation {
  backdropClose: boolean;
  escapeClose: boolean;
  open: boolean;
  fullscreen: boolean;
  showBackdrop: boolean;
  openCallback: () => void | Promise<void>;
  closeCallback: () => void | Promise<void>;
  beforeCloseCallback: () => boolean | Promise<boolean>;
}

export class BottomSheetFoundation implements IBottomSheetFoundation {
  private _open = false;
  private _backdropClose = true;
  private _escapeClose = true;
  private _fullscreen = false;
  private _showBackdrop = false;
  private _openCallback: () => void | Promise<void>;
  private _closeCallback: () => void | Promise<void>;
  private _beforeCloseCallback: () => boolean | Promise<boolean>;
  private _openTransitionEndHandler: (evt: TransitionEvent) => void;
  private _closeTransitionEndHandler: (evt: TransitionEvent) => void;
  private _documentKeydownHandler: (evt: KeyboardEvent) => void;
  private _backdropClickHandler: (evt: CustomEvent) => void;
  private _isDragging = false;
  private _dragContext: IBottomSheetDragContext | undefined;
  private _lastPosition: { y: number; clientY: number } | undefined;
  private _bodyScrollHandler = (): void => this._onBodyScroll();
  private _dragStartHandler = ($event: MouseEvent): void => this._onDragStart($event);
  private _dragMoveHandler = ($event: MouseEvent): void => this._onDragMove($event);
  private _dragEndHandler = (): void => this._onDragEnd();
  private _dragCancelHandler = (): void => this._onDragCancel();

  constructor(public _adapter: IBottomSheetAdapter) {
    this._openTransitionEndHandler = (_evt: TransitionEvent) => this._onOpenTransitionEnd();
    this._closeTransitionEndHandler = (_evt: TransitionEvent) => this._onCloseTransitionEnd();
    this._documentKeydownHandler = (evt: KeyboardEvent) => this._onDocumentKeydown(evt);
    this._backdropClickHandler = (evt: CustomEvent) => this._onBackdropClick(evt);
  }

  public initialize(): void {
    this._adapter.initializeAccessibility();
  }

  public destroy(): void {
    if (this._open) {
      this._adapter.deregisterTransitionEndHandler(this._openTransitionEndHandler);
      this._adapter.removeDocumentListener('keydown', this._documentKeydownHandler);
      this._adapter.deregisterBackdropClickHandler(this._backdropClickHandler);
    }
  }

  private _setOpen(open: boolean): void {
    this._open = open;
    if (this._open) {
      this._openBottomSheet();
    } else {
      this._closeBottomSheet();
    }
    this._adapter.toggleHostAttribute(BOTTOM_SHEET_CONSTANTS.attributes.OPEN, this._open);
  }

  private _openBottomSheet(): void {
    this._adapter.attach();
    this._adapter.setBodyAttribute(BOTTOM_SHEET_CONSTANTS.attributes.OPEN, 'true');
    this._adapter.registerTransitionEndHandler(this._openTransitionEndHandler);
    this._setDocumentKeydownListener(this._escapeClose);
    this._setBackdropClickListener(this._backdropClose);

    // Ensure transitions are triggered properly
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        this._adapter.setVisibility(true);
        this._adapter.emitHostEvent(BOTTOM_SHEET_CONSTANTS.events.OPEN);
        this._adapter.trySetInitialFocus();
        this._adapter.initScrollable();
      });
    });
  }

  private _closeBottomSheet(): void {
    this._adapter.deregisterTransitionEndHandler(this._openTransitionEndHandler);
    this._adapter.removeDocumentListener('keydown', this._documentKeydownHandler);
    this._adapter.deregisterBackdropClickHandler(this._backdropClickHandler);
    this._adapter.registerTransitionEndHandler(this._closeTransitionEndHandler);

    this._adapter.setVisibility(false);
  }

  private _onCloseTransitionEnd(): void {
    this._adapter.emitHostEvent(BOTTOM_SHEET_CONSTANTS.events.CLOSE);
    this._adapter.detach();
    const openBottomSheets = this._adapter.getOpenBottomSheets(BOTTOM_SHEET_CONSTANTS.elementName);
    if (!openBottomSheets.length) {
      this._adapter.removeBodyAttribute(BOTTOM_SHEET_CONSTANTS.attributes.OPEN);
    }
  }

  private _onOpenTransitionEnd(): void {
    if (!this._open) {
      return;
    }
    this._adapter.deregisterTransitionEndHandler(this._openTransitionEndHandler);
    this._adapter.emitHostEvent(BOTTOM_SHEET_CONSTANTS.events.READY);
    this._adapter.tryLayoutChildren();
    if (this._adapter.isScrollable()) {
      this._initScrollableHandlers();
    }
  }

  private _onDocumentKeydown(evt: KeyboardEvent): void {
    evt.stopPropagation();
    if (evt.key && (evt.key === 'Escape' || evt.key === 'Esc')) {
      this._tryClose();
    }
  }

  private _onBackdropClick(evt: CustomEvent): void {
    evt.stopPropagation();
    this._tryClose();
  }

  private async _tryClose(): Promise<void> {
    const isCancelled = !this._adapter.emitHostEvent(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, undefined, undefined, true);
    if (isCancelled) {
      return;
    }

    if (!this._beforeCloseCallback) {
      this.open = false;
      return;
    }

    try {
      const shouldClose = await Promise.resolve(this._beforeCloseCallback());
      if (shouldClose) {
        this.open = false;
        return;
      }
    } catch (err) {
      return;
    }
  }

  private _setBackdropClickListener(attach: boolean): void {
    if (!this._open) {
      return;
    }

    if (attach) {
      this._adapter.registerBackdropClickHandler(this._backdropClickHandler);
    } else {
      this._adapter.deregisterBackdropClickHandler(this._backdropClickHandler);
    }
  }

  private _setDocumentKeydownListener(attach: boolean): void {
    if (!this._open) {
      return;
    }

    if (attach) {
      this._adapter.addDocumentListener('keydown', this._documentKeydownHandler);
    } else {
      this._adapter.removeDocumentListener('keydown', this._documentKeydownHandler);
    }
  }

  /** Controls whether clicking the backdrop closes the bottom sheet or not. */
  public set backdropClose(value: boolean) {
    value = Boolean(value);
    if (this._backdropClose !== value) {
      this._backdropClose = value;
      this._setBackdropClickListener(this._backdropClose);
      this._adapter.toggleHostAttribute(BOTTOM_SHEET_CONSTANTS.attributes.BACKDROP_CLOSE, this._backdropClose);
    }
  }
  public get backdropClose(): boolean {
    return this._backdropClose;
  }

  /** Controls whether pressing the escape key closes the sheet or not. */
  public set escapeClose(value: boolean) {
    value = Boolean(value);
    if (this._escapeClose !== value) {
      this._escapeClose = value;
      this._setDocumentKeydownListener(this._escapeClose);
      this._adapter.toggleHostAttribute(BOTTOM_SHEET_CONSTANTS.attributes.ESCAPE_CLOSE, this._escapeClose);
    }
  }
  public get escapeClose(): boolean {
    return this._escapeClose;
  }

  public get open(): boolean {
    return this._open;
  }

  public set open(value: boolean) {
    if (this._open !== value) {
      value = Boolean(value);
      if (value !== this._open) {
        const callback = value ? this._openCallback : this._closeCallback;
        if (callback) {
          Promise.resolve(callback())
            .then(() => {
              this._setOpen(value);
            })
            .catch(() => { });
        } else {
          this._setOpen(value);
        }
      }
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

  public get showBackdrop(): boolean {
    return this._showBackdrop;
  }
  public set showBackdrop(value: boolean) {
    if (this._showBackdrop !== value) {
      this._showBackdrop = value;
      this._adapter.setBackdropVisibility(value);
      this._adapter.toggleHostAttribute(BOTTOM_SHEET_CONSTANTS.attributes.SHOW_BACKDROP, this._showBackdrop);
    }
  }

  public get openCallback(): () => void | Promise<void> {
    return this._openCallback;
  }
  public set openCallback(callback: () => void | Promise<void>) {
    this._openCallback = callback;
  }

  public get closeCallback(): () => void | Promise<void> {
    return this._closeCallback;
  }
  public set closeCallback(callback: () => void | Promise<void>) {
    this._closeCallback = callback;
  }

  public get beforeCloseCallback(): () => boolean | Promise<boolean> {
    return this._beforeCloseCallback;
  }
  public set beforeCloseCallback(callback: () => boolean | Promise<boolean>) {
    this._beforeCloseCallback = callback;
  }

  /** If scrollable, allow drag to/from fullscreen, and make fullscreen on scroll. */
  private _initScrollableHandlers(): void {
    if (!this._fullscreen && this._adapter.isScrollable()) {
      this._adapter.setDragTargetHandler('mousedown', this._dragStartHandler);
      this._adapter.setDragTargetHandler('touchstart', this._dragStartHandler);
      this._adapter.setBodyScrollHandler(this._bodyScrollHandler);
    }
  }

  private _onBodyScroll(): void {
    if (!this._fullscreen && !this._isDragging) {
      this.fullscreen = true;
      this._adapter.emitHostEvent(BOTTOM_SHEET_CONSTANTS.events.FULLSCREEN, this._fullscreen);
    }
  }

  private _onDragStart(evt: MouseEvent | TouchEvent): void {
    if (this._fullscreen) {
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
      const canDrag = this._adapter.emitHostEvent(BOTTOM_SHEET_CONSTANTS.events.DRAG_START, height as IBottomSheetDragStartEventData, true, true);
      if (!canDrag) {
        return;
      }
      this._adapter.setDragging(true);
    }

    // If not fullscreen, clamp to minimum of original height.
    const newPosition = this._fullscreen ? height : { y: Math.max(height.y, this._dragContext.height) };

    // Only update the position if it actually changed
    if (!this._lastPosition || newPosition.y !== this._lastPosition.y) {
      const canMove = this._adapter.emitHostEvent(BOTTOM_SHEET_CONSTANTS.events.DRAGGED, newPosition as IBottomSheetDragStartEventData, true, true);
      if (canMove) {
        this._lastPosition = { ...newPosition, clientY };
        this._adapter.setContainerHeight(newPosition.y);
      }
    }
  }

  private _onDragEnd(): void {
    if (this._lastPosition) {
      const clientY = this._lastPosition.clientY;
      const dragContext = this._dragContext;
      if (dragContext) {
        if (this._fullscreen && clientY > 0) {
          this.fullscreen = false;
          this._adapter.emitHostEvent(BOTTOM_SHEET_CONSTANTS.events.FULLSCREEN, this._fullscreen);
        } else if (!this._fullscreen && clientY < dragContext.height + dragContext.top) {
          this.fullscreen = true;
          this._adapter.emitHostEvent(BOTTOM_SHEET_CONSTANTS.events.FULLSCREEN, this._fullscreen);
        }
      }
    }
    if (this._isDragging) {
      this._adapter.emitHostEvent(BOTTOM_SHEET_CONSTANTS.events.DRAG_END);
    }
    this._dragComplete();
  }

  private _onDragCancel(): void {
    if (this._isDragging) {
      this._adapter.emitHostEvent(BOTTOM_SHEET_CONSTANTS.events.DRAG_CANCEL);
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
}

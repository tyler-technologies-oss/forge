import { ICustomElementFoundation, isDefined, isNumber, isString } from '@tylertech/forge-core';
import { IDialogAdapter } from './dialog-adapter';
import { DialogPositionType, DialogStateCallback, DIALOG_CONSTANTS, IDialogMoveContext, IDialogMoveStartEventData } from './dialog-constants';

export interface IDialogFoundation extends ICustomElementFoundation {
  backdropClose: boolean;
  escapeClose: boolean;
  open: boolean;
  fullscreen: boolean;
  openCallback: DialogStateCallback;
  closeCallback: DialogStateCallback;
  beforeCloseCallback: DialogStateCallback;
  positionType: DialogPositionType;
  positionX: number | string | null;
  positionY: number | string | null;
  moveable: boolean;
  moveTarget: string;
  initializeMoveTarget(): void;
  resetPosition(): void;
  show(parent?: HTMLElement): Promise<void>;
  hide(remove?: boolean): Promise<void>;
}

export class DialogFoundation implements IDialogFoundation {
  // Private vars
  private _open = false;
  private _backdropClose = true;
  private _escapeClose = true;
  private _fullscreen = false;
  private _openCallback: DialogStateCallback;
  private _closeCallback: DialogStateCallback;
  private _beforeCloseCallback: DialogStateCallback;
  private _positionType: DialogPositionType = 'absolute';
  private _positionX: string | null = null;
  private _positionY: string | null = null;
  private _moveable = false;
  private _moveTarget = DIALOG_CONSTANTS.selectors.DFEAULT_MOVE_TARGET;
  private _isAnimating = false;
  private _isMoving = false;
  private _moveContext: IDialogMoveContext | undefined;
  private _lastPosition: { x: number; y: number } | undefined;

  // Event handlers
  private _transitionEndHandler: (evt: TransitionEvent) => void;
  private _documentKeydownHandler: (evt: KeyboardEvent) => void;
  private _backdropClickHandler: (evt: CustomEvent) => void;
  private _moveTargetMouseDownHandler: (evt: MouseEvent) => void;
  private _moveTargetMouseMoveHandler: (evt: MouseEvent) => void;
  private _moveTargetMouseUpHandler: (evt: MouseEvent) => void;

  constructor(public _adapter: IDialogAdapter) {
    this._transitionEndHandler = (evt: TransitionEvent) => this._onTransitionEnd();
    this._documentKeydownHandler = (evt: KeyboardEvent) => this._onDocumentKeydown(evt);
    this._backdropClickHandler = (evt: CustomEvent) => this._onBackdropClick(evt);
    this._moveTargetMouseDownHandler = (evt: MouseEvent) => this._onMoveTargetMouseDown(evt);
    this._moveTargetMouseMoveHandler = (evt: MouseEvent) => this._onMoveTargetMouseMove(evt);
    this._moveTargetMouseUpHandler = (evt: MouseEvent) => this._onMoveTargetMouseUp(evt);
  }

  public initialize(): void {
    this._adapter.initializeAccessibility();
    if (this._open) {
      if (this._moveable) {
        this._adapter.setMoveable(this._moveable);
        this._initMoveTarget();
      }
    }
  }

  public destroy(): void {
    if (this._open) {
      this._removeDragHandlers();
      this._adapter.deregisterTransitionEndHandler(this._transitionEndHandler);
      this._adapter.removeDocumentListener('keydown', this._documentKeydownHandler);
      this._adapter.deregisterBackdropClickHandler(this._backdropClickHandler);
    }
  }

  private async _applyOpen(value: boolean): Promise<void> {
    if (value) {
      if (typeof this._openCallback === 'function' && !await this._executeOpenCallback()) {
        return;
      }
      this._open = value;
      this._openDialog();
    } else {
      if (typeof this._closeCallback === 'function' && !await this._executeCloseCallback()) {
        return;
      }
      this._open = value;
      this._closeDialog();
    }

    this._adapter.toggleHostAttribute(DIALOG_CONSTANTS.attributes.OPEN, this._open);
  }

  private async _executeOpenCallback(): Promise<boolean> {
    try {
      return await Promise.resolve(this._openCallback()) !== false;
    } catch (e) {
      return false;
    }
  }

  private async _executeCloseCallback(): Promise<boolean> {
    try {
      return await Promise.resolve(this._closeCallback()) !== false;
    } catch (e) {
      return false;
    }
  }

  public initializeMoveTarget(): void {
    if (!this._moveTarget) {
      this._moveTarget = DIALOG_CONSTANTS.selectors.DFEAULT_MOVE_TARGET;
    }
    this._initMoveTarget();
  }

  public resetPosition(): void {
    this._adapter.setSurfacePosition(this._positionX, this._positionY, this._positionType);
  }

  public async show(parent?: HTMLElement): Promise<void> {
    this._open = true;
    if (!this._adapter.isConnected) {
      this._adapter.attach(parent);
    }
    await this._openDialog();
  }

  public async hide(remove?: boolean): Promise<void> {
    this._open = false;
    await this._closeDialog();
    if (remove) {
      this._adapter.detach();
    }
  }

  private _normalizePositionValue(value: number | string | null): string | null {
    if (isNumber(value)) {
      return `${value}px`;
    } else if (isString(value)) {
      return value;
    }
    return null;
  }

  private _openDialog(): Promise<void> {
    if (!this._fullscreen) {
      if (this._moveable) {
        this._adapter.setMoveable(this._moveable);
      }
      if (this._positionX !== null || this._positionY !== null) {
        this._adapter.setSurfacePosition(this._positionX, this._positionY, this._positionType);
      }
    }

    this._adapter.setBodyAttribute(DIALOG_CONSTANTS.attributes.OPEN, 'true');
    this._adapter.registerTransitionEndHandler(this._transitionEndHandler);
    this._setDocumentKeydownListener(this._escapeClose);
    this._setBackdropClickListener(this._backdropClose);
    this._adapter.setAnimating(true);
    this._isAnimating = true;

    // Ensure transitions are triggered properly
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        this._adapter.setVisibility(true);
        this._adapter.emitHostEvent(DIALOG_CONSTANTS.events.OPEN);
        this._adapter.trySetInitialFocus();
        if (this._adapter.isScrollable()) {
          this._adapter.addRootClass(DIALOG_CONSTANTS.classes.SCROLLABLE);
        }
      });
    });

    return new Promise<void>(resolve => {
      // Wait for the dialog to finish animating open, then emit the ready event and attach any listeners
      setTimeout(() => {
        window.requestAnimationFrame(() => {
          if (this._open && this._isAnimating) {
            this._onTransitionEnd();
            resolve();
          }
        });
      }, DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);
    });
  }

  private _closeDialog(): Promise<void> {
    if (this._moveTarget) {
      this._removeDragHandlers();
    }

    this._adapter.deregisterTransitionEndHandler(this._transitionEndHandler);

    if (this._escapeClose) {
      this._adapter.removeDocumentListener('keydown', this._documentKeydownHandler);
    }
    if (this._backdropClose) {
      this._adapter.deregisterBackdropClickHandler(this._backdropClickHandler);
    }

    this._isAnimating = false;
    this._moveContext = undefined;
    this._lastPosition = undefined;
    this._adapter.setAnimating(true);
    this._adapter.setVisibility(false);

    return new Promise<void>(resolve => {
      setTimeout(() => {
        this._adapter.emitHostEvent(DIALOG_CONSTANTS.events.CLOSE);
        const openDialogs = this._adapter.getOpenDialogs(`${DIALOG_CONSTANTS.elementName}[${DIALOG_CONSTANTS.attributes.OPEN}]`);
        if (!openDialogs.length) {
          this._adapter.removeBodyAttribute(DIALOG_CONSTANTS.attributes.OPEN);
        }
        this._adapter.setAnimating(false);
        resolve();
      }, DIALOG_CONSTANTS.numbers.ANIMATION_DURATION);
    });
  }

  private _onTransitionEnd(): void {
    if (!this._isAnimating) {
      return;
    }
    this._adapter.deregisterTransitionEndHandler(this._transitionEndHandler);
    this._adapter.setAnimating(false);
    this._adapter.emitHostEvent(DIALOG_CONSTANTS.events.READY);
    this._adapter.tryLayoutChildren();
    if (this._moveable) {
      this._initMoveTarget();
    }
    this._isAnimating = false;
  }

  private _initMoveTarget(): void {
    if (!this._fullscreen && this._moveable && this._moveTarget && this._adapter.setMoveTarget(this._moveTarget)) {
      this._adapter.setMoveTargetHandler('mousedown', this._moveTargetMouseDownHandler);
    }
  }

  private _removeDragHandlers(): void {
    this._adapter.removeDragTargetHandler('mousedown', this._moveTargetMouseDownHandler);
    this._adapter.removeDocumentListener('mousemove', this._moveTargetMouseMoveHandler);
    this._adapter.removeDocumentListener('mouseup', this._moveTargetMouseUpHandler);
  }

  private _onMoveTargetMouseDown(evt: MouseEvent): void {
    evt.preventDefault();
    this._adapter.captureActiveElement();
    const bounds = this._adapter.getSurfaceBounds();
    this._moveContext = {
      top: evt.clientY - bounds.top,
      left: evt.clientX - bounds.left,
      height: bounds.height,
      width: bounds.width
    };
    this._adapter.setDocumentListener('mousemove', this._moveTargetMouseMoveHandler);
    this._adapter.setDocumentListener('mouseup', this._moveTargetMouseUpHandler);
  }

  private _onMoveTargetMouseMove(evt: MouseEvent): void {
    evt.preventDefault();
    const position = this._calculateOffsetPosition(evt.pageX, evt.pageY, this._moveContext);

    // If this is the beginning of the move sequence, we emit the start event (to allow for preventing default) and
    // then update the surface position if not prevented
    if (!this._isMoving) {
      this._isMoving = true;
      const canDrag = this._adapter.emitHostEvent(DIALOG_CONSTANTS.events.MOVE_START, position as IDialogMoveStartEventData, true, true);
      if (!canDrag) {
        return;
      }
    }

    // Ensure that the surface position stays within the bounds of the screen
    const newPosition = this._clampPosition(position, this._moveContext);

    // Only update the position if it actually changed
    if (!this._lastPosition || newPosition.x !== this._lastPosition.x || newPosition.y !== this._lastPosition.y) {
      const canMove = this._adapter.emitHostEvent(DIALOG_CONSTANTS.events.MOVED, newPosition as IDialogMoveStartEventData, true, true);
      if (canMove) {
        this._lastPosition = { ...newPosition };
        const newX = this._normalizePositionValue(newPosition.x);
        const newY = this._normalizePositionValue(newPosition.y);
        this._adapter.setSurfacePosition(newX, newY, 'absolute');
      }
    }
  }

  private _onMoveTargetMouseUp(evt: MouseEvent): void {
    if (this._isMoving) {
      this._adapter.emitHostEvent(DIALOG_CONSTANTS.events.MOVE_END);
    }
    this._moveComplete();
  }

  private _moveComplete(): void {
    this._adapter.tryRestoreActiveElement();
    this._adapter.removeDocumentListener('mousemove', this._moveTargetMouseMoveHandler);
    this._adapter.removeDocumentListener('mouseup', this._moveTargetMouseUpHandler);
    this._lastPosition = undefined;
    this._moveContext = undefined;
    this._isMoving = false;
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
    const isCancelled = !this._adapter.emitHostEvent(DIALOG_CONSTANTS.events.BEFORE_CLOSE, undefined, undefined, true);
    if (isCancelled) {
      return;
    }

    if (!this._beforeCloseCallback) {
      this.open = false;
      return;
    }

    try {
      const shouldClose = await Promise.resolve(this._beforeCloseCallback()) !== false;
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

    if (attach && this._backdropClose) {
      this._adapter.registerBackdropClickHandler(this._backdropClickHandler);
    } else if (!attach) {
      this._adapter.deregisterBackdropClickHandler(this._backdropClickHandler);
    }
  }

  private _setDocumentKeydownListener(attach: boolean): void {
    if (!this._open) {
      return;
    }

    if (attach && this._escapeClose) {
      this._adapter.setDocumentListener('keydown', this._documentKeydownHandler);
    } else if (!attach) {
      this._adapter.removeDocumentListener('keydown', this._documentKeydownHandler);
    }
  }

  private _calculateOffsetPosition(pageX: number, pageY: number, context?: IDialogMoveContext): { x: number; y: number } {
    return {
      x: pageX - (context?.left || 0),
      y: pageY - (context?.top || 0)
    };
  }

  private _clampPosition({ x, y }: { x: number; y: number }, context?: IDialogMoveContext): { x: number; y: number } {
    let width = 0;
    let height = 0;

    if (context) {
      width = context.width;
      height = context.height;
    }

    if (x <= 0) {
      x = 0;
    } else if (x + width >= window.innerWidth) {
      x = window.innerWidth - width;
    }

    if (y <= 0) {
      y = 0;
    } else if (y + height >= window.innerHeight) {
      y = window.innerHeight - height;
    }

    return { x, y };
  }

  /** Controls whether clicking the backdrop closes the dialog or not. */
  public set backdropClose(value: boolean) {
    value = Boolean(value);
    if (this._backdropClose !== value) {
      this._backdropClose = value;

      this._setBackdropClickListener(this._backdropClose);

      if (isDefined(this._backdropClose)) {
        this._adapter.setHostAttribute(DIALOG_CONSTANTS.attributes.BACKDROP_CLOSE, this._backdropClose.toString());
      } else {
        this._adapter.removeHostAttribute(DIALOG_CONSTANTS.attributes.BACKDROP_CLOSE);
      }
    }
  }
  public get backdropClose(): boolean {
    return this._backdropClose;
  }

  /** Controls whether pressing the escape key closes the dialog or not. */
  public set escapeClose(value: boolean) {
    value = Boolean(value);
    if (this._escapeClose !== value) {
      this._escapeClose = value;
      this._setDocumentKeydownListener(this._escapeClose);
      if (isDefined(this._escapeClose)) {
        this._adapter.setHostAttribute(DIALOG_CONSTANTS.attributes.ESCAPE_CLOSE, this._escapeClose.toString());
      } else {
        this._adapter.removeHostAttribute(DIALOG_CONSTANTS.attributes.ESCAPE_CLOSE);
      }
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
        this._applyOpen(value);
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
    }
  }

  public get openCallback(): DialogStateCallback {
    return this._openCallback;
  }
  public set openCallback(callback: DialogStateCallback) {
    this._openCallback = callback;
  }

  public get closeCallback(): DialogStateCallback {
    return this._closeCallback;
  }
  public set closeCallback(callback: DialogStateCallback) {
    this._closeCallback = callback;
  }

  public get beforeCloseCallback(): DialogStateCallback {
    return this._beforeCloseCallback;
  }
  public set beforeCloseCallback(callback: DialogStateCallback) {
    this._beforeCloseCallback = callback;
  }

  public get positionType(): DialogPositionType {
    return this._positionType;
  }
  public set positionType(value: DialogPositionType) {
    if (this._positionType !== value) {
      this._positionType = value;
      if (this._open) {
        this._adapter.setSurfacePosition(this._positionX, this._positionY, this._positionType);
      }
    }
  }

  public get positionX(): number | string | null {
    return this._positionX;
  }
  public set positionX(value: number | string | null) {
    if (this._positionX !== value) {
      this._positionX = this._normalizePositionValue(value);
      if (this._open) {
        this._adapter.setSurfacePosition(this._positionX, this._positionY, this._positionType);
      }
    }
  }

  public get positionY(): number | string | null {
    return this._positionY;
  }
  public set positionY(value: number | string | null) {
    if (this._positionY !== value) {
      this._positionY = this._normalizePositionValue(value);
      if (this._open) {
        this._adapter.setSurfacePosition(this._positionX, this._positionY, this._positionType);
      }
    }
  }

  public get moveable(): boolean {
    return this._moveable;
  }
  public set moveable(value: boolean) {
    if (this._moveable !== value) {
      this._moveable = value;
      if (this._open) {
        this._adapter.setMoveable(this._moveable);
        if (this._moveable) {
          this._initMoveTarget();
        } else {
          this._removeDragHandlers();
          this._isMoving = false;
        }
      }
    }
  }

  public get moveTarget(): string {
    return this._moveTarget;
  }
  public set moveTarget(value: string) {
    this._moveTarget = value;
  }
}

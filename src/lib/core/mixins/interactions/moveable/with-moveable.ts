import { getActiveElement, isNumber, isString } from '@tylertech/forge-core';
import { AbstractConstructor, MixinBase } from '../../../../constants';

export type MoveBoundary = 'viewport' | 'none';

export interface IWithMoveableMoveContext {
  top: number;
  left: number;
  height: number;
  width: number;
}

export declare abstract class WithMoveableContract {
  public stopMoveListener(): void;
  protected _movePointerDownListener: EventListener;
  protected _moveBoundary: MoveBoundary;
  protected abstract _getMoveableBounds(): { top: number; left: number; height: number; width: number };
  protected abstract _updatePosition(x: string | null, y: string | null): void;
  protected abstract _onMoveStart(): boolean;
  protected abstract _onMove(position: { x: number; y: number }): boolean;
  protected abstract _onMoveEnd(): void;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function WithMoveable<TBase extends MixinBase<object>>(base: TBase = class {} as unknown as TBase) {
  abstract class Moveable extends base {
    private _isMoving = false;
    private _moveContext: IWithMoveableMoveContext | undefined;
    private _lastPosition: { x: number; y: number } | undefined;
    private _activeElement: HTMLElement | undefined = undefined;
    protected _moveBoundary: MoveBoundary = 'viewport';

    protected _movePointerDownListener = this._onMoveTargetPointerDown.bind(this);
    private _movePointerMoveListener = this._onMoveTargetPointerMove.bind(this);
    private _movePointerUpListener = this._onMoveTargetPointerUp.bind(this);

    protected abstract _getMoveableBounds(): { top: number; left: number; height: number; width: number };
    protected abstract _updatePosition(x: string | null, y: string | null): void;
    protected abstract _onMoveStart(): boolean;
    protected abstract _onMove(position: { x: number; y: number }): boolean;
    protected abstract _onMoveEnd(): void;

    public stopMoveListener(): void {
      this._updatePosition(null, null);
      document.removeEventListener('pointermove', this._movePointerMoveListener);
      document.removeEventListener('pointerup', this._movePointerUpListener);
      this._isMoving = false;
      this._moveContext = undefined;
      this._lastPosition = undefined;
      this._activeElement = undefined;
    }

    private _onMoveTargetPointerDown(evt: PointerEvent): void {
      evt.preventDefault();

      this._captureActiveElement();

      const bounds = this._getMoveableBounds();

      this._moveContext = {
        top: evt.pageY - bounds.top,
        left: evt.pageX - bounds.left,
        height: bounds.height,
        width: bounds.width
      };
      document.addEventListener('pointermove', this._movePointerMoveListener);
      document.addEventListener('pointerup', this._movePointerUpListener);
    }

    private _onMoveTargetPointerMove(evt: PointerEvent): void {
      evt.preventDefault();
      const position = this._calculateOffsetPosition(evt.pageX, evt.pageY, this._moveContext);

      // If this is the beginning of the move sequence, we emit the start event (to allow for preventing default) and
      // then update the surface position if not prevented
      if (!this._isMoving) {
        this._isMoving = true;
        const defaultPrevented = this._onMoveStart();
        if (defaultPrevented) {
          return;
        }
      }

      // Ensure that the surface position stays within the bounds of the screen if boundary is set to viewport
      const newPosition = this._moveBoundary === 'viewport' ? this._clampPosition(position, this._moveContext) : position;

      // Only update the position if it actually changed
      if (!this._lastPosition || newPosition.x !== this._lastPosition.x || newPosition.y !== this._lastPosition.y) {
        const defaultPrevented = this._onMove(newPosition);
        if (!defaultPrevented) {
          this._lastPosition = { ...newPosition };
          const newX = this._normalizePositionValue(newPosition.x);
          const newY = this._normalizePositionValue(newPosition.y);
          this._updatePosition(newX, newY);
        }
      }
    }

    private _onMoveTargetPointerUp(_evt: PointerEvent): void {
      if (this._isMoving) {
        this._onMoveEnd();
      }
      this._moveComplete();
    }

    private _moveComplete(): void {
      this._tryRestoreActiveElement();

      document.removeEventListener('pointermove', this._movePointerMoveListener);
      document.removeEventListener('pointerup', this._movePointerUpListener);

      this._lastPosition = undefined;
      this._moveContext = undefined;
      this._isMoving = false;
    }

    private _captureActiveElement(): void {
      this._activeElement = getActiveElement() as HTMLElement;
      this._activeElement?.blur();
    }

    private _tryRestoreActiveElement(): void {
      if (this._activeElement?.isConnected) {
        this._activeElement.focus();
      }
      this._activeElement = undefined;
    }

    private _normalizePositionValue(value: number | string | null | undefined): string | null {
      if (isNumber(value)) {
        return `${value}px`;
      } else if (isString(value)) {
        return value;
      }
      return null;
    }

    private _calculateOffsetPosition(pageX: number, pageY: number, context?: IWithMoveableMoveContext): { x: number; y: number } {
      return {
        x: pageX - (context?.left ?? 0),
        y: pageY - (context?.top ?? 0)
      };
    }

    private _clampPosition({ x, y }: { x: number; y: number }, context?: IWithMoveableMoveContext): { x: number; y: number } {
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
  }

  return Moveable as AbstractConstructor<WithMoveableContract> & TBase;
}

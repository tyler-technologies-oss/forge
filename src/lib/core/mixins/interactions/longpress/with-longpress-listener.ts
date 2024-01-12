import { AbstractConstructor, canUserHoverElements, MixinBase } from '../../../../constants';

/**
 * The delay in milliseconds before a longpress event is detected.
 */
export const LONGPRESS_TRIGGER_DELAY = 500;

export declare abstract class WithLongpressListenerContract {
  /**
   * The delay in milliseconds before a longpress event is detected.
   */
  protected _longpressDelay: number;

  /**
   * Called when a longpress event is detected.
   */
  protected abstract _onLongpress(): void;

  /**
   * Called after a longpress event has been detected, but after the user has released the pointer.
   */
  protected _onLongpressEnd(evt: PointerEvent | TouchEvent): void;

  /**
   * Starts listening for longpress events.
   */
  protected _startLongpressListener(el: HTMLElement): void;

  /**
   * Stops listening for longpress events.
   */
  protected _stopLongpressListener(el: HTMLElement): void;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function WithLongpressListener<TBase extends MixinBase<object>>(base: TBase = (class {} as unknown) as TBase) {
  abstract class LongpressListener extends base {
    private _longpressTimeout: number | undefined;
    private _longpressStartListener = this._onLongpressStart.bind(this);
    private _longpressEndListener = this._onLongpressEnd.bind(this);
    private _longpressContextMenuListener = this._onLongpressContextMenu.bind(this);
    private _longpressClickPrevent = this._onLongpressClickPrevent.bind(this);
    
    protected _longpressDelay = LONGPRESS_TRIGGER_DELAY;

    protected abstract _onLongpress(): void;

    protected _startLongpressListener(el: HTMLElement): void {
      const type = canUserHoverElements ? 'pointerdown' : 'touchstart';
      el.addEventListener(type, this._longpressStartListener);
    }

    protected _stopLongpressListener(el: HTMLElement): void {
      const type = canUserHoverElements ? 'pointerdown' : 'touchstart';
      el.removeEventListener(type, this._longpressStartListener);
      this._unlistenLongpressEnd(el);
    }

    private _onLongpressStart(evt: PointerEvent): void {
      (evt.target as HTMLElement).setPointerCapture(evt.pointerId);
      this._listenLongpressEnd(evt.target as HTMLElement);
      this._longpressTimeout = window.setTimeout(() => {
        this._onLongpress();

        if (!canUserHoverElements) {
          navigator.vibrate(1);
        }

        // We need to prevent any ghost click events from firing after a longpress is detected
        (evt.target as HTMLElement).addEventListener('click', this._longpressClickPrevent, { capture: true, once: true });
      }, this._longpressDelay);
    }

    private _onLongpressClickPrevent(evt: MouseEvent): void {
      evt.stopPropagation();
    }

    protected _onLongpressEnd(evt: PointerEvent | TouchEvent): void {
      this._clearTimeout();
      this._unlistenLongpressEnd(evt.target as HTMLElement);
    }

    private _onLongpressContextMenu(evt: PointerEvent | TouchEvent): void {
      this._clearTimeout();
      (evt.target as HTMLElement).removeEventListener('click', this._longpressClickPrevent, { capture: true });
      this._unlistenLongpressEnd(evt.target as HTMLElement);
    }

    private _listenLongpressEnd(el: HTMLElement): void {
      if (!canUserHoverElements) {
        el.addEventListener('touchend', this._longpressEndListener);
      } else {
        el.addEventListener('pointerup', this._longpressEndListener);
        el.addEventListener('pointercancel', this._longpressEndListener);
        el.addEventListener('contextmenu', this._longpressContextMenuListener);
      }
    }

    private _unlistenLongpressEnd(el: HTMLElement): void {
      if (!canUserHoverElements) {
        el.removeEventListener('touchend', this._longpressEndListener);
      } else {
        el.removeEventListener('pointerup', this._longpressEndListener);
        el.removeEventListener('pointercancel', this._longpressEndListener);
        el.removeEventListener('contextmenu', this._longpressContextMenuListener);
      }
    }

    private _clearTimeout(): void {
      window.clearTimeout(this._longpressTimeout);
      this._longpressTimeout = undefined;
    }
  }

  return LongpressListener as AbstractConstructor<WithLongpressListenerContract> & TBase;
}

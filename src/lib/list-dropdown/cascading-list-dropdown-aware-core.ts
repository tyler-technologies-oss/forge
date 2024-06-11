import { IListDropdownAwareCore, ListDropdownAwareCore } from './list-dropdown-aware-core';

export interface ICascadingListDropdownAwareCore extends IListDropdownAwareCore {}

export interface ICascadingListDropdownAwareCoreConfiguration {
  popupTimeout: number;
  targetTimeout: number;
}

export abstract class CascadingListDropdownAwareCore<T> extends ListDropdownAwareCore implements ICascadingListDropdownAwareCore {
  protected _open = false;
  protected _options: T[] = [];
  protected _childOpen = false;
  protected _popupHasMouse = false; // Used to determine if the popup element is under the users mouse
  protected _mouseCoords: { x: number; y: number };
  protected _activeMouseLeaveTimeout: number;
  protected _targetMouseEnterListener: (evt: MouseEvent) => void;
  protected _targetMouseLeaveListener: (evt: MouseEvent) => void;
  protected _childPopupMouseEnterListener: (evt: MouseEvent) => void;
  protected _childPopupMouseLeaveListener: (evt: MouseEvent) => void;
  protected _documentMouseMoveListener: (evt: MouseEvent) => void;

  protected abstract _attachCascadingListeners(): void;
  protected abstract _detachCascadingListeners(): void;
  protected abstract _onCascadingOptionSelected(data: any): void;
  protected abstract _onCascadingChildOpen(index: number): void;
  protected abstract _onCascadingChildClose(index: number): void;
  protected abstract _closeDropdown(): void;
  protected abstract _openDropdown({ fromKeyboard }: { fromKeyboard?: boolean }): void;
  protected abstract _setCascadeTargetInactive(): void;
  protected abstract _isOwnElement(element: Element): boolean;

  constructor(private _config: ICascadingListDropdownAwareCoreConfiguration) {
    super();
    this._targetMouseEnterListener = evt => this._onTargetMouseEnter(evt);
    this._targetMouseLeaveListener = evt => this._onTargetMouseLeave(evt);
    this._childPopupMouseEnterListener = () => this._onChildPopupMouseEnter();
    this._childPopupMouseLeaveListener = () => this._onChildPopupMouseLeave();
    this._documentMouseMoveListener = evt => (this._mouseCoords = { x: evt.pageX, y: evt.pageY });
  }

  private _onChildPopupMouseEnter(): void {
    this._popupHasMouse = true;
  }

  private _onChildPopupMouseLeave(): void {
    this._popupHasMouse = false;
    setTimeout(() => {
      const mouseElement = document.elementFromPoint(this._mouseCoords.x, this._mouseCoords.y);
      if (!this._popupHasMouse && !this._childOpen && (!mouseElement || !this._isOwnElement(mouseElement))) {
        this._setCascadeTargetInactive();
        this._closeDropdown();
      }
    }, this._config.popupTimeout);
  }

  private _onTargetMouseEnter(evt: MouseEvent): void {
    if (!this._options.length) {
      return;
    }
    this._openDropdown({ fromKeyboard: false });
  }

  private _onTargetMouseLeave(evt: MouseEvent): void {
    // We wrap this in a timeout to allow for the user to take an indirect path toward an open child menu. This
    // allows for the popup to stay open while the user is moving their mouse to it (makes the transition easier and more smooth)
    this._activeMouseLeaveTimeout = window.setTimeout(() => {
      // Ignore this if our open state has changed, or if we have a child popup open now
      if (!this._open || this._childOpen) {
        return;
      }
      if (this._mouseCoords) {
        // We ignore this event if the mouse moved to an element within our own popup
        const mouseElement = document.elementFromPoint(this._mouseCoords.x, this._mouseCoords.y);
        if (mouseElement && this._isOwnElement(mouseElement)) {
          return;
        }
      }
      this._setCascadeTargetInactive();
      this._closeDropdown();
    }, this._config.targetTimeout);
  }

  protected _clearMouseLeaveTimeout(): void {
    if (this._activeMouseLeaveTimeout !== undefined) {
      window.clearTimeout(this._activeMouseLeaveTimeout);
    }
  }
}

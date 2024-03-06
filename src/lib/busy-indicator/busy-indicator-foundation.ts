import { ICustomElementFoundation, isDefined } from '@tylertech/forge-core';
import { IBusyIndicatorAdapter } from './busy-indicator-adapter';
import { BusyIndicatorLayoutDirection, BUSY_INDICATOR_CONSTANTS } from './busy-indicator-constants';

export interface IBusyIndicatorFoundation extends ICustomElementFoundation {
  titleText: string;
  message: string;
  cancel: boolean;
  spinner: boolean;
  progressBar: boolean;
  progressBarDeterminate: boolean;
  progress: number;
  buffer: number;
  width: number | 'auto';
  direction: BusyIndicatorLayoutDirection;
  manageFocus: boolean;
  fixed: boolean;
  hide(force?: boolean): void;
}

/**
 * Provides facilities and helper methods for creating a busy indicator component.
 */
export class BusyIndicatorFoundation implements IBusyIndicatorFoundation {
  private _titleText: string;
  private _message: string;
  private _canCancel = false;
  private _showSpinner = true;
  private _showProgressBar = false;
  private _progressBarDeterminate = false;
  private _progress = 0;
  private _buffer = 0;
  private _cancelListenerAttached = false;
  private _width: number | 'auto';
  private _previouslyFocusedElement?: HTMLElement;
  private _direction: BusyIndicatorLayoutDirection = 'row';
  private _manageFocus = true;
  private _fixed = true;

  constructor(private _adapter: IBusyIndicatorAdapter) {}

  public destroy(): void {
    this._adapter.removeCancelButtonEventListener('click', this._onCancelClick);
  }

  public show(): void {
    this._applyDirection();
    this._adapter.setParentAttribute(BUSY_INDICATOR_CONSTANTS.attributes.PARENT_OPEN, 'true');
    this._adapter.setHostAttribute('tabindex', '0');
    this._adapter.setSurfaceOpacity(0);
    this._adapter.setFixed(this._fixed);

    if (!this._titleText) {
      this._adapter.setTitleVisibility(false);
    }

    if (this._message) {
      this._adapter.setMessage(this._message);
    }

    this._adapter.setMessageVisibility(!!this._message);

    if (!this._canCancel) {
      this._adapter.setCancelButtonVisibility(false);
    } else {
      this._attachCancelClickListener();
    }

    if (!this._showSpinner) {
      this._adapter.setSpinnerVisibility(false);
    }

    if (!this._showProgressBar) {
      this._adapter.setProgressBarVisibility(false);
    } else {
      this._adapter.setProgressBarDeterminate(this._progressBarDeterminate);
      this._adapter.setProgressBarProgress(this._progress);
      this._adapter.setProgressBarBuffer(this._buffer);
    }

    if (this._width) {
      this._adapter.setSurfaceWidth(typeof this._width === 'number' ? `${this._width}px` : this._width);
    }

    if ((!this._message || this._message.length === 0) && this._showSpinner && (!this.titleText || this._titleText.length === 0) && !this._canCancel) {
      this._adapter.setContainerInvisible();
    }

    this.fadeIn();
  }

  /**
   * Removes the element from the DOM.
   * @param {boolean} [force=false] Whether to force removal of the busy indicator or not.
   */
  public hide(force = false): void {
    if (force) {
      if (this._manageFocus) {
        this._releaseFocus();
      }
      this._adapter.remove();
      this._adapter.removeParentAttribute(BUSY_INDICATOR_CONSTANTS.attributes.PARENT_OPEN);
    } else {
      this.fadeOut();
      this._adapter.hideBackdrop();
      setTimeout(() => {
        if (this._manageFocus) {
          this._releaseFocus();
        }
        this._adapter.remove();
        this._adapter.removeParentAttribute(BUSY_INDICATOR_CONSTANTS.attributes.PARENT_OPEN);
      }, BUSY_INDICATOR_CONSTANTS.numbers.TRANSITION_LENGTH);
    }
  }

  /** Sets the elements opacity to 0 which triggers the CSS transition to fade out. */
  public fadeOut(): void {
    this._adapter.setSurfaceOpacity(0);
  }

  /** Sets the elements opacity to 1 which triggers the CSS transition to fade in after the current delay value. */
  public fadeIn(): void {
    this._adapter.showBackdrop();
    this._adapter.setSurfaceOpacity(1);
    if (this._manageFocus) {
      this._captureFocus();
    }
  }

  /** Attaches the click listener to the cancel button. */
  private _attachCancelClickListener(): void {
    if (!this._cancelListenerAttached) {
      this._adapter.addCancelButtonEventListener('click', this._onCancelClick.bind(this));
      this._cancelListenerAttached = true;
    }
  }

  /** Handles clicks on the cancel button. */
  private _onCancelClick(): void {
    this._adapter.setCancelButtonAttribute('disabled', 'disabled');
    this._adapter.setCancelButtonText(BUSY_INDICATOR_CONSTANTS.strings.CANCELLING);
    this._adapter.removeCancelButtonEventListener('click', this._onCancelClick);
    this._adapter.emitHostEvent(BUSY_INDICATOR_CONSTANTS.events.CANCEL);
  }

  /** Cache currently focused element, set focus to the busy indicator. */
  private _captureFocus(): void {
    this._previouslyFocusedElement = this._adapter.getFocusedElement();
    this._adapter.captureFocus();
  }

  /** Gives focus back to the element that had it when the busy indicator was displayed. */
  private _releaseFocus(): void {
    if (this._previouslyFocusedElement && this._adapter.hasFocus()) {
      this._previouslyFocusedElement.focus();
    }
  }

  /** The title to be displayed. */
  public set titleText(value: string) {
    if (this._titleText !== value) {
      this._titleText = value;
      this._adapter.setTitle(this._titleText);
      this._adapter.setTitleVisibility(!!this._titleText);
      this._adapter.setHostAttribute(BUSY_INDICATOR_CONSTANTS.attributes.TITLE_TEXT, this._titleText);
    }
  }
  public get titleText(): string {
    return this._titleText;
  }

  /** The message to be displayed. */
  public set message(value: string) {
    if (this._message !== value) {
      this._message = value;
      this._adapter.setMessage(this._message);
      this._adapter.setMessageVisibility(!!this._message);
      this._adapter.setHostAttribute(BUSY_INDICATOR_CONSTANTS.attributes.MESSAGE, this._message);
    }
  }
  public get message(): string {
    return this._message;
  }

  /** Controls whether the cancel button is visible or not. */
  public set cancel(canCancel: boolean) {
    if (this._canCancel !== canCancel) {
      this._canCancel = canCancel;
      this._adapter.setCancelButtonVisibility(!!this._canCancel);

      if (this._canCancel) {
        this._attachCancelClickListener();
      } else {
        this._adapter.removeCancelButtonEventListener('click', this._onCancelClick);
      }

      this._adapter.setHostAttribute(BUSY_INDICATOR_CONSTANTS.attributes.CANCEL, this._canCancel.toString());
    }
  }
  public get cancel(): boolean {
    return this._canCancel;
  }

  /** Controls whether the progress spinner is visible or not. */
  public set spinner(showSpinner: boolean) {
    if (this._showSpinner !== showSpinner) {
      this._showSpinner = showSpinner;
      this._adapter.setSpinnerVisibility(!!this._showSpinner);
      this._adapter.setHostAttribute(BUSY_INDICATOR_CONSTANTS.attributes.SPINNER, '' + this._showSpinner);
    }
  }
  public get spinner(): boolean {
    return this._showSpinner;
  }

  /** Controls whether the progres bar is visible or not. */
  public set progressBar(showProgressBar: boolean) {
    if (this._showProgressBar !== showProgressBar) {
      this._showProgressBar = showProgressBar;
      this._adapter.setProgressBarVisibility(!!this._showProgressBar);
      this._adapter.setHostAttribute(BUSY_INDICATOR_CONSTANTS.attributes.PROGRESS_BAR, this._showProgressBar.toString());
    }
  }
  public get progressBar(): boolean {
    return this._showProgressBar;
  }

  /** Sets the progress bar mode. */
  public set progressBarDeterminate(determinate: boolean) {
    if (this._progressBarDeterminate !== determinate) {
      this._progressBarDeterminate = determinate;
      this._adapter.setProgressBarDeterminate(determinate);
    }
  }
  public get progressBarDeterminate(): boolean {
    return this._progressBarDeterminate;
  }

  /** The progress amount of the progress bar. */
  public set progress(value: number) {
    if (this._progress !== value && this._progressBarDeterminate) {
      this._progress = value;
      this._adapter.setProgressBarProgress(value);
    }
  }
  public get progress(): number {
    return this._progress;
  }

  /** The buffer amount of the progress bar. */
  public set buffer(value: number) {
    if (this._buffer !== value && this._progressBarDeterminate) {
      this._buffer = value;
      this._adapter.setProgressBarBuffer(value);
      this._adapter.setHostAttribute(BUSY_INDICATOR_CONSTANTS.attributes.BUFFER, isDefined(this._buffer) ? this._buffer.toString() : '0');
    }
  }
  public get buffer(): number {
    return this._buffer;
  }

  public get direction(): BusyIndicatorLayoutDirection {
    return this._direction;
  }
  public set direction(value: BusyIndicatorLayoutDirection) {
    if (value !== this._direction) {
      this._direction = value;
      this._applyDirection();
    }
  }

  private _applyDirection(): void {
    if (this._direction) {
      this._adapter.setHostAttribute(BUSY_INDICATOR_CONSTANTS.attributes.DIRECTION, String(this._direction));
    }
  }

  /** Sets the width of the busy indicator element. */
  public set width(value: number | 'auto') {
    if (this._width !== value) {
      if (typeof value === 'number' && value < 0) {
        value = 'auto';
      }
      this._width = value;
      this._adapter.setSurfaceWidth(typeof this._width === 'number' ? `${this._width}px` : this._width);
      this._adapter.setHostAttribute(BUSY_INDICATOR_CONSTANTS.attributes.WIDTH, this._width.toString());
    }
  }
  public get width(): number | 'auto' {
    return this._width;
  }

  public get manageFocus(): boolean {
    return this._manageFocus;
  }
  public set manageFocus(value: boolean) {
    if (this._manageFocus !== value) {
      this._manageFocus = value;
      this._adapter.toggleHostAttribute(BUSY_INDICATOR_CONSTANTS.attributes.MANAGE_FOCUS, this._manageFocus);
    }
  }

  public get fixed(): boolean {
    return this._fixed;
  }
  public set fixed(value: boolean) {
    if (this._fixed !== value) {
      this._fixed = value;
      this._adapter.setFixed(this._fixed);
      this._adapter.toggleHostAttribute(BUSY_INDICATOR_CONSTANTS.attributes.FIXED, this._fixed);
    }
  }
}

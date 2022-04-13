import { addClass, getShadowElement, removeElement, replaceElement, getActiveElement, toggleAttribute, toggleClass } from '@tylertech/forge-core';
import { BackdropAppearance, BACKDROP_CONSTANTS, IBackdropComponent } from '../backdrop';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { ILinearProgressComponent } from '../linear-progress';
import { IBusyIndicatorComponent } from './busy-indicator';
import { BUSY_INDICATOR_CONSTANTS } from './busy-indicator-constants';

export interface IBusyIndicatorAdapter extends IBaseAdapter {
  setContainerInvisible(): void;
  setSurfaceOpacity: (opacity: number) => void;
  setFixed(value: boolean): void;
  setTitle: (title: string) => void;
  setMessage: (message: string) => void;
  setTitleVisibility: (visible: boolean) => void;
  setMessageVisibility: (visible: boolean) => void;
  setCancelButtonVisibility: (visible: boolean) => void;
  setSpinnerVisibility: (visible: boolean) => void;
  setProgressBarVisibility: (visible: boolean) => void;
  setProgressBarDeterminate: (determinate: boolean) => void;
  setProgressBarProgress: (value: number) => void;
  setProgressBarBuffer: (value: number) => void;
  addCancelButtonEventListener: (type: string, listener: () => void) => void;
  removeCancelButtonEventListener: (type: string, listener: () => void) => void;
  setCancelButtonAttribute: (name: string, value: string) => void;
  setCancelButtonText: (text: string) => void;
  setSurfaceWidth: (value: string) => void;
  captureFocus: () => void;
  remove: () => void;
  hideBackdrop: () => void;
  setBackdropAppearance(appearance: BackdropAppearance): void;
  setParentAttribute(name: string, value: string): void;
  removeParentAttribute(name: string): void;
  getFocusedElement(): HTMLElement;
  hasFocus(): boolean;
}

/**
 * Provides facilities for interacting with the internal DOM of `BusyIndicatorComponent`.
 */
export class BusyIndicatorAdapter extends BaseAdapter<IBusyIndicatorComponent> implements IBusyIndicatorAdapter {
  private _surfaceElement: HTMLElement;
  private _titleElement: HTMLElement;
  private _titlePlaceholderElement: Comment;
  private _messageElement: HTMLElement;
  private _messagePlaceholderElement: Comment;
  private _cancelButtonElement: HTMLElement;
  private _cancelButtonPlaceholderElement: Comment;
  private _spinnerElement: HTMLElement;
  private _spinnerPlaceholderElement: Comment;
  private _progressBarContainerElement: HTMLElement;
  private _progressBarContainerPlaceholderElement: Comment;
  private _progressBarElement: ILinearProgressComponent;
  private _backdropElement: IBackdropComponent;
  private _parentElement: HTMLElement | null = null;

  constructor(component: IBusyIndicatorComponent) {
    super(component);
    this._surfaceElement = getShadowElement(component, BUSY_INDICATOR_CONSTANTS.selectors.SURFACE);
    this._titleElement = getShadowElement(component, BUSY_INDICATOR_CONSTANTS.selectors.TITLE);
    this._messageElement = getShadowElement(component, BUSY_INDICATOR_CONSTANTS.selectors.MESSAGE);
    this._cancelButtonElement = getShadowElement(component, BUSY_INDICATOR_CONSTANTS.selectors.CANCEL);
    this._spinnerElement = getShadowElement(component, BUSY_INDICATOR_CONSTANTS.selectors.SPINNER);
    this._progressBarContainerElement = getShadowElement(component, BUSY_INDICATOR_CONSTANTS.selectors.PROGRESS_BAR_CONTAINER);
    this._progressBarElement = getShadowElement(component, BUSY_INDICATOR_CONSTANTS.selectors.PROGRESS_BAR) as ILinearProgressComponent;
    this._backdropElement = getShadowElement(component, BUSY_INDICATOR_CONSTANTS.selectors.BACKDROP) as IBackdropComponent;
  }

  /**
   * Sets the opacity of the content element.
   * @param opacity The opacity value.
   */
  public setSurfaceOpacity(opacity: number): void {
    this._surfaceElement.style.opacity = opacity.toString();
  }

  public setFixed(value: boolean): void {
    toggleAttribute(this._backdropElement, value, BACKDROP_CONSTANTS.attributes.FIXED);
    toggleClass(this._surfaceElement, value, BUSY_INDICATOR_CONSTANTS.classes.SURFACE_FIXED);
  }

  /**
   * Sets the content of the title element.
   * @param title The title text.
   */
  public setTitle(title: string): void {
    this._titleElement.innerText = title;
  }

  /**
   * Sets the content of the message element.
   * @param message The message text.
   */
  public setMessage(message: string): void {
    this._messageElement.innerText = message;
  }

  /**
   * Sets the visibility of the title element by adding or removing it from the DOM.
   * @param visible Whether the title is visible or not.
   */
  public setTitleVisibility(visible: boolean): void {
    this._titlePlaceholderElement = this._toggleElement(visible, BUSY_INDICATOR_CONSTANTS.selectors.TITLE, this._titleElement, this._titlePlaceholderElement);
  }

  /**
   * Adds or removes the cancel button from the DOM.
   * @param visible The visibility value.
   */
  public setCancelButtonVisibility(visible: boolean): void {
    this._cancelButtonPlaceholderElement = this._toggleElement(visible, BUSY_INDICATOR_CONSTANTS.selectors.CANCEL, this._cancelButtonElement, this._cancelButtonPlaceholderElement);
  }

  /**
   * Adds or removes the message element from the DOM.
   * @param visible The visibility value.
   */
  public setMessageVisibility(visible: boolean): void {
    this._messagePlaceholderElement = this._toggleElement(visible, BUSY_INDICATOR_CONSTANTS.selectors.MESSAGE, this._messageElement, this._messagePlaceholderElement);
  }

  /**
   * Adds or removes the spinner element from the DOM.
   * @param visible The visibility value.
   */
  public setSpinnerVisibility(visible: boolean): void {
    this._spinnerPlaceholderElement = this._toggleElement(visible, BUSY_INDICATOR_CONSTANTS.selectors.SPINNER, this._spinnerElement, this._spinnerPlaceholderElement);
  }

  /**
   * Adds or removes the progress bar element from the DOM.
   * @param visible The visibility value.
   */
  public setProgressBarVisibility(visible: boolean): void {
    this._progressBarContainerPlaceholderElement = this._toggleElement(
      visible,
      BUSY_INDICATOR_CONSTANTS.selectors.PROGRESS_BAR_CONTAINER,
      this._progressBarContainerElement,
      this._progressBarContainerPlaceholderElement
    );
  }

  /**
   * Sets the determinate state of the progress bar component.
   * @param {boolean} determinate The determinate value.
   */
  public setProgressBarDeterminate(determinate: boolean): void {
    this._progressBarElement.determinate = determinate;
  }

  /**
   * Sets the progress percent for the progress bar component.
   * @param value The progress percent.
   */
  public setProgressBarProgress(value: number): void {
    this._progressBarElement.progress = value;
  }

  /**
   * Sets the progress bar component buffer percent.
   * @param value The buffer percent.
   */
  public setProgressBarBuffer(value: number): void {
    this._progressBarElement.buffer = value;
  }

  /**
   * Adds an event listener to the cancel button.
   * @param type The event type.
   * @param listener The event listener.
   */
  public addCancelButtonEventListener(type: string, listener: () => void): void {
    this._cancelButtonElement.addEventListener(type, listener);
  }

  /**
   * Removes an event listener from the cancel button.
   * @param type The event type.
   * @param listener The event listener.
   */
  public removeCancelButtonEventListener(type: string, listener: () => void): void {
    this._cancelButtonElement.removeEventListener(type, listener);
  }

  /**
   * Sets an attribute on the cancel button.
   * @param name The attribute name.
   * @param value The attribute value.
   */
  public setCancelButtonAttribute(name: string, value: string): void {
    this._cancelButtonElement.setAttribute(name, value);
  }

  /**
   * Sets the text displayed in the cancel button element.
   * @param text The text value.
   */
  public setCancelButtonText(text: string): void {
    this._cancelButtonElement.innerText = text;
  }

  /**
   * Sets the width of the surface element.
   * @param value The CSS width.
   */
  public setSurfaceWidth(value: string): void {
    this._surfaceElement.style.width = value.toString();
  }

  /**
   * Sets focus to the busy indicator component element.
   */
  public captureFocus(): void {
    this._surfaceElement.focus();
  }

  /**
   * Removes the busy indicator component from its parent.
   */
  public remove(): void {
    removeElement(this._component);
  }

  /**
   * Hides the backdrop by fading it out.
   */
  public hideBackdrop(): void {
    this._backdropElement.fadeOut();
  }

  private _toggleElement(isVisible: boolean, selector: string, element: Node, placeholder: Comment): Comment {
    const exists = !!getShadowElement(this._component, selector);

    if (!placeholder) {
      placeholder = document.createComment(`(${BUSY_INDICATOR_CONSTANTS.elementName}) ${selector}`);
    }

    if (isVisible && !exists) {
      replaceElement(element, placeholder);
    } else if (!isVisible && exists) {
      replaceElement(placeholder, element);
    }

    return placeholder;
  }

  public setContainerInvisible(): void {
    addClass(BUSY_INDICATOR_CONSTANTS.classes.SURFACE_INVISIBLE, this._surfaceElement);
  }

  public setBackdropAppearance(appearance: BackdropAppearance): void {
    this._backdropElement.setAttribute(BACKDROP_CONSTANTS.attributes.APPEARANCE, String(appearance));
  }

  public setParentAttribute(name: string, value: string): void {
    this._parentElement = this._component.parentElement;
    if (this._parentElement) {
      this._parentElement.setAttribute(name, value);
    }
  }

  public removeParentAttribute(name: string): void {
    if (this._parentElement) {
      this._parentElement.removeAttribute(name);
      this._parentElement = null;
    }
  }

  public getFocusedElement(): HTMLElement {
    return getActiveElement() as HTMLElement;
  }

  public hasFocus(): boolean {
    const activeElement = this.getFocusedElement();
    return this._component === activeElement || this._surfaceElement === activeElement || this._surfaceElement.contains(activeElement);
  }
}

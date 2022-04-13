import { calcSizeUnattached, toggleClass } from '@tylertech/forge-core';
import { FLOATING_LABEL_CONSTANTS } from './floating-label-constants';

export interface IFloatingLabel {
  isFloating: boolean;
  float(float: boolean): void;
  getWidth(): number;
  destroy(): void;
}

export class FloatingLabel implements IFloatingLabel {
  constructor(private _labelElement: HTMLLabelElement) {
    this._labelElement.classList.add(FLOATING_LABEL_CONSTANTS.classes.FLOATING_LABEL);
  }

  /** Returns the current label floating state. */
  public get isFloating(): boolean {
    return this._hasFloatClass();
  }

  public destroy(): void {
    this._labelElement.classList.remove(FLOATING_LABEL_CONSTANTS.classes.FLOATING_LABEL);
    this._labelElement = undefined as any;
  }

  /**
   * Sets the floating state of the label element.
   * @param float If true, sets the label to float, otherwise un-float.
   */
  public float(float: boolean): void {
    toggleClass(this._labelElement, float, FLOATING_LABEL_CONSTANTS.classes.FLOAT);
  }

  /** Returns the scroll width of the label element. */
  public getWidth(): number {
    if (this._labelElement.offsetParent !== null) {
      return this._labelElement.scrollWidth;
    }
    return calcSizeUnattached(this._labelElement).width;
  }

  private _hasFloatClass(): boolean {
    return this._labelElement.classList.contains(FLOATING_LABEL_CONSTANTS.classes.FLOAT);
  }
}

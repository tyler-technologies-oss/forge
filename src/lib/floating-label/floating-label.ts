import { FloatingLabelAdapter } from './floating-label-adapter';
import { FloatingLabelFoundation } from './floating-label-foundation';

export interface IFloatingLabel {
  isFloating: boolean;
  float(float: boolean, alwaysFloat?: boolean): void;
  getWidth(): number;
  destroy(opts?: { cancelFloat?: boolean }): void;
}

export class FloatingLabel implements IFloatingLabel {
  private _foundation: FloatingLabelFoundation;

  constructor(private _labelElement: HTMLLabelElement) {
    this._foundation = new FloatingLabelFoundation(new FloatingLabelAdapter(this._labelElement));
    this._foundation.initialize();
  }

  /** Returns the current label floating state. */
  public get isFloating(): boolean {
    return this._foundation.isFloating;
  }

  public destroy({ cancelFloat = false } = {}): void {
    this._foundation.disconnect({ cancelFloat });
    this._labelElement = undefined as any;
  }

  /**
   * Sets the floating state of the label element.
   * @param shouldFloat If true, sets the label to float, otherwise un-float.
   * @param alwaysFloat If true, sets the label to always float, defaults to: `false`.
   */
  public float(shouldFloat: boolean, alwaysFloat = false): void {
    this._foundation.float(shouldFloat, alwaysFloat);
  }

  /** Returns the scroll width of the label element. */
  public getWidth(): number {
    return this._foundation.getWidth();
  }
}

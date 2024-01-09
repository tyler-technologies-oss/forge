import { AbstractConstructor, MixinBase, internals } from '../../../constants';
import { IBaseComponent } from '../../base/base-component';

/**
 * An element that is integrated with native form validation.
 */
export interface IWithFormValidity extends IBaseComponent {
  required: boolean;

  readonly validity: ValidityState;
  readonly validationMessage: string;
  readonly willValidate: boolean;

  checkValidity(): boolean;
  reportValidity(): boolean;
  setCustomValidity(error: string): void;
}

export declare abstract class WithFormValidityContract {
  public abstract required: boolean;

  public get validity(): ValidityState;
  public get validationMessage(): string;
  public get willValidate(): boolean;

  public checkValidity(): boolean;
  public reportValidity(): boolean;
  public setCustomValidity(error: string): void;
}

/**
 * Provides form validity functionality for an element.
 * 
 * @param base The base component to mix into.
 * @returns The mixed-in base component.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function WithFormValidity<TBase extends MixinBase>(base: TBase) {
  abstract class FormValidity extends base implements IWithFormValidity {
    public abstract required: boolean;

    public get validity(): ValidityState {
      return this[internals].validity;
    }

    public get validationMessage(): string {
      return this[internals].validationMessage;
    }

    public get willValidate(): boolean {
      return this[internals].willValidate;
    }

    // Needed for Safari, see https://bugs.webkit.org/show_bug.cgi?id=261432
    // Replace with this.internals.validity.customError when resolved.
    protected _hasCustomValidityError = false;

    public checkValidity(): boolean {
      return this[internals].checkValidity();
    }

    public reportValidity(): boolean {
      return this[internals].reportValidity();
    }

    public setCustomValidity(error: string): void {
      this._hasCustomValidityError = error !== '';
      this[internals].setCustomValidity({ customError: this._hasCustomValidityError }, error);
    }
  }

  return FormValidity as AbstractConstructor<WithFormValidityContract> & TBase;
}

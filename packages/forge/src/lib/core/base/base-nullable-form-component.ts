import { BaseFormComponent, IBaseFormComponent } from './base-form-component.js';

export interface IBaseNullableFormComponent<T = string> extends IBaseFormComponent<T> {
  required: boolean;

  readonly validity: ValidityState;
  readonly validationMessage: string;
  readonly willValidate: boolean;

  checkValidity(): boolean;
  reportValidity(): boolean;
  setCustomValidity(error: string): void;
}

export abstract class BaseNullableFormComponent<T = string> extends BaseFormComponent<T> {
  public abstract required: boolean;

  public abstract get validity(): ValidityState;
  public abstract get validationMessage(): string;
  public abstract get willValidate(): boolean;

  // Needed for Safari, see https://bugs.webkit.org/show_bug.cgi?id=261432
  // Replace with this.internals.validity.customError when resolved.
  protected _hasCustomValidityError = false;

  public abstract checkValidity(): boolean;
  public abstract reportValidity(): boolean;
  public abstract setCustomValidity(error: string): void;
}

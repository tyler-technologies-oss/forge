import { internals } from '../../constants';

export interface IBaseComponent extends HTMLElement {}

/** Any Custom HTML element. Some elements directly implement this interface, while others implement it via an interface that inherits it. */
export abstract class BaseComponent extends HTMLElement implements IBaseComponent {}

export interface IBaseFormComponent<T = string, K = T> extends IBaseComponent {
  value: T;
  disabled: boolean;
  readonly: boolean;
  name: string;

  readonly form: HTMLFormElement | null;
  readonly labels: NodeList;
  readonly [internals]: ElementInternals;

  formResetCallback(): void;
  formStateRestoreCallback(state: unknown, reason: 'restore' | 'autocomplete'): void;
  formDisabledCallback(isDisabled: boolean): void;
}

/** Any form associated Custom HTML element. */
export abstract class BaseFormComponent<T = string> extends BaseComponent implements IBaseFormComponent<T> {
  public static formAssociated = true;

  public abstract value: T;
  public abstract disabled: boolean;
  public abstract readonly: boolean;
  public abstract name: string;

  public abstract get form(): HTMLFormElement | null;
  public abstract get labels(): NodeList;
  public abstract get [internals](): ElementInternals;

  public abstract formResetCallback(): void;
  public abstract formStateRestoreCallback(state: unknown, reason: 'restore' | 'autocomplete'): void;
  public abstract formDisabledCallback(isDisabled: boolean): void;
}

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

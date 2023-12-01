import { MixinBase, MixinReturn, internals } from '../../constants';
import { BaseComponent, IBaseComponent } from './base-component';

export interface IBaseFormComponent<T = string> extends IBaseComponent {
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

/**
 * Any form associated Custom HTML element.
 */
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

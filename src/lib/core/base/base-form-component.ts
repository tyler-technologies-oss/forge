import { internals } from '../../constants';
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

  /** @ignore */
  public abstract value: T;
  /** @ignore */
  public abstract disabled: boolean;
  /** @ignore */
  public abstract readonly: boolean;
  /** @ignore */
  public abstract name: string;

  /** @ignore */
  public abstract get form(): HTMLFormElement | null;
  /** @ignore */
  public abstract get labels(): NodeList;
  /** @ignore */
  public abstract get [internals](): ElementInternals;

  /** @ignore */
  public abstract formResetCallback(): void;
  /** @ignore */
  public abstract formStateRestoreCallback(state: unknown, reason: 'restore' | 'autocomplete'): void;
  /** @ignore */
  public abstract formDisabledCallback(isDisabled: boolean): void;
}

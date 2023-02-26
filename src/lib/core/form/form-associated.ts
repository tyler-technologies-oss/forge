export interface IFormAssociated {
  readonly _internals: ElementInternals;
  formDisabledCallback?(isDisabled: boolean): void;
  formResetCallback?(): void;
  formStateRestoreCallback?(state: string | File | FormData | null | undefined, mode: 'restore' | 'autocomplete'): void;
  formAssociatedCallback?(form: HTMLFormElement): void;
  readonly form: HTMLElement | null;
  readonly name: string | null;
  readonly validity: ValidityState;
  readonly validationMessage: string;
  readonly willValidate: boolean;
  checkValidity(): void;
  reportValidity(): void;
}

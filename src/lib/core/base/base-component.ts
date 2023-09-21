export interface IBaseComponent extends HTMLElement {}

/** Any Custom HTML element. Some elements directly implement this interface, while others implement it via an interface that inherits it. */
export abstract class BaseComponent extends HTMLElement implements IBaseComponent {}

export interface IBaseFormComponent extends IBaseComponent {
  disabled: boolean;
  required: boolean;
  name: string;
  readonly form: HTMLFormElement | null;
  readonly labels: NodeList;
  readonly validity: ValidityState;
  readonly validityMessage: string;
  readonly willValidate: boolean;
  readonly internals: ElementInternals;
  setFormValue(value: string | File | FormData | null, state?: string | File | FormData | null | undefined): void;
  checkValidity(): boolean;
  reportValidity(): boolean;
  setCustomValidity(error: string): void;
}

export abstract class BaseFormComponent extends BaseComponent implements IBaseFormComponent {
  public disabled: boolean;
  public required: boolean;
  
  public readonly internals: ElementInternals;

  public get name(): string {
    throw new Error('Method not implemented.');
  }
  public set name(value: string) {
    throw new Error('Method not implemented.');
  }

  public get form(): HTMLFormElement | null {
    throw new Error('Method not implemented.');
  }

  public get labels(): NodeList {
    throw new Error('Method not implemented.');
  }

  public get validity(): ValidityState {
    throw new Error('Method not implemented.');
  }

  public get validityMessage(): string {
    throw new Error('Method not implemented.');
  }

  public get willValidate(): boolean {
    throw new Error('Method not implemented.');
  }

  public setFormValue(value: string | File | FormData | null, state?: string | File | FormData | null | undefined): void {
    throw new Error('Method not implemented.');
  }

  public checkValidity(): boolean {
    throw new Error('Method not implemented.');
  }

  public reportValidity(): boolean {
    throw new Error('Method not implemented.');
  }

  public setCustomValidity(error: string): void {
    throw new Error('Method not implemented.');
  }
}

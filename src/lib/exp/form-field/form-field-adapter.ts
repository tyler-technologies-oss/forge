import { IFormFieldComponent } from './form-field';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IFormFieldAdapter {}

export class FormFieldAdapter implements IFormFieldAdapter {
  constructor(private _component: IFormFieldComponent) {}
}

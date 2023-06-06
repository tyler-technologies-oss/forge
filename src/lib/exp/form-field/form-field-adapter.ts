import { IFormFieldComponent } from './form-field';

export interface IFormFieldAdapter {

}

export class FormFieldAdapter implements IFormFieldAdapter {
  constructor(private _component: IFormFieldComponent) {}
}

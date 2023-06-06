import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IFormFieldAdapter } from './form-field-adapter';

export interface IFormFieldFoundation extends ICustomElementFoundation {

}

export class FormFieldFoundation implements IFormFieldFoundation {
  constructor(private _adapter: IFormFieldAdapter) {}

  public initialize(): void {

  }

  public disconnect(): void {

  }
}

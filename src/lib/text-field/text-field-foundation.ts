import { ITextFieldAdapter } from './text-field-adapter';
import { FieldFoundation, IFieldFoundation } from '../field/field-foundation';

export interface ITextFieldFoundation extends IFieldFoundation {}

export class TextFieldFoundation extends FieldFoundation implements ITextFieldFoundation {
  constructor(protected _adapter: ITextFieldAdapter) {
    super(_adapter);
  }

  public initialize(): void {
    super.initialize();
    this._adapter.detectTextarea();
  }
}

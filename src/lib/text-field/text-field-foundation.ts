import { ITextFieldAdapter } from './text-field-adapter';
import { FieldFoundation, IFieldFoundation } from '../field/field-foundation';

export interface ITextFieldFoundation extends IFieldFoundation {}

export class TextFieldFoundation extends FieldFoundation implements ITextFieldFoundation {
  private _min: number | null;
  private _max: number | null;
  private _step: number | null;

  constructor(protected _adapter: ITextFieldAdapter) {
    super(_adapter);
  }

  public initialize(): void {
    super.initialize();
    this._adapter.detectTextarea();
    this._min = this._adapter.getMin();
    this._max = this._adapter.getMax();
    this._step = this._adapter.getStep();
  }

  protected override _onInputAttributeChanged(name: string, value: string | null): void {
    super._onInputAttributeChanged(name, value);

    switch (name) {
      case 'type':
        console.log(value);
        break;
      case 'min':
        console.log(value);
        break;
      case 'max':
        console.log(value);
        break;
      case 'step':
        console.log(value);
        break;
    }
  }
}

import { ICustomElementFoundation } from '@tylertech/forge-core';
import { ISelectAdapterExp } from './select-adapter';

export interface ISelectFoundationExp extends ICustomElementFoundation {

}

export class SelectFoundationExp implements ISelectFoundationExp {
  constructor(private _adapter: ISelectAdapterExp) {}

  public initialize(): void {

  }

  public disconnect(): void {

  }
}

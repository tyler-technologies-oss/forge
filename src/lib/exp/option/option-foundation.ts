import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IOptionAdapterExp } from './option-adapter';

export interface IOptionFoundationExp extends ICustomElementFoundation {

}

export class OptionFoundationExp implements IOptionFoundationExp {
  constructor(private _adapter: IOptionAdapterExp) {}

  public initialize(): void {

  }

  public disconnect(): void {

  }
}

import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IStackAdapter } from './stack-adapter';

export interface IStackFoundation extends ICustomElementFoundation {

}

export class StackFoundation implements IStackFoundation {
  constructor(private _adapter: IStackAdapter) {}

  public initialize(): void {

  }

  public disconnect(): void {

  }
}

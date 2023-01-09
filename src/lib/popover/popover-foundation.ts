import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IPopoverAdapter } from './popover-adapter';

export interface IPopoverFoundation extends ICustomElementFoundation {

}

export class PopoverFoundation implements IPopoverFoundation {
  constructor(private _adapter: IPopoverAdapter) {}

  public initialize(): void {

  }

  public disconnect(): void {

  }
}

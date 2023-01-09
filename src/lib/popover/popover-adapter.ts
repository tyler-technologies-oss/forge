import { IPopoverComponent } from './popover';

export interface IPopoverAdapter {

}

export class PopoverAdapter implements IPopoverAdapter {
  constructor(private _component: IPopoverComponent) {}
}

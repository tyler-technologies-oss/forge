import { IStackComponent } from './stack';

export interface IStackAdapter {

}

export class StackAdapter implements IStackAdapter {
  constructor(private _component: IStackComponent) {}
}

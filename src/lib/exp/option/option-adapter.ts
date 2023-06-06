import { BaseAdapter, IBaseAdapter } from '../../core';
import { IOptionComponentExp } from './option';

export interface IOptionAdapterExp extends IBaseAdapter {

}

export class OptionAdapterExp extends BaseAdapter<IOptionComponentExp> implements IOptionAdapterExp {
  constructor(component: IOptionComponentExp) {
    super(component);
  }
}

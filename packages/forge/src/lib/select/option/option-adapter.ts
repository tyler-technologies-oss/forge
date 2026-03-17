import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter.js';
import { IOptionComponent } from './option.js';

export interface IOptionAdapter extends IBaseAdapter {
  setHostAttribute(name: string, value: string): void;
  removeHostAttribute(name: string): void;
}

/**
 * The DOM adapter behind the `<forge-option>` element.
 */
export class OptionAdapter extends BaseAdapter<IOptionComponent> {
  constructor(component: IOptionComponent) {
    super(component);
  }
}

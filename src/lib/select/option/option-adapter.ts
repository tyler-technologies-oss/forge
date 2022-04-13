import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IOptionComponent } from './option';

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

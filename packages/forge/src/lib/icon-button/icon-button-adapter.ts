import { BaseButtonAdapter, IBaseButtonAdapter } from '../button/base/base-button-adapter.js';
import { IIconButtonComponent } from './icon-button.js';

export interface IIconButtonAdapter extends IBaseButtonAdapter<IIconButtonComponent> {}

export class IconButtonAdapter extends BaseButtonAdapter<IIconButtonComponent> implements IIconButtonAdapter {
  constructor(component: IIconButtonComponent) {
    super(component);
  }
}

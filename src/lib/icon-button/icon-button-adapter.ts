import { BaseButtonAdapter, IBaseButtonAdapter } from '../button/base/base-button-adapter';
import { IIconButtonComponent } from './icon-button';

export interface IIconButtonAdapter extends IBaseButtonAdapter {}

export class IconButtonAdapter extends BaseButtonAdapter implements IIconButtonAdapter {
  constructor(component: IIconButtonComponent) {
    super(component);
  }
}

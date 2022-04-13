import { getShadowElement, toggleClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IOpenIconComponent } from './open-icon';
import { OPEN_ICON_CONSTANTS } from './open-icon-constants';
import { ICON_CONSTANTS, IIconComponent } from '../icon';

export interface IOpenIconAdapter extends IBaseAdapter {
  setOrientation: (orientation: string) => void;
  setOpenState: (open: boolean) => void;
}

export class OpenIconAdapter extends BaseAdapter<IOpenIconComponent> implements IOpenIconAdapter {
  private _openIcon: HTMLElement;
  private _iconElement: IIconComponent;

  constructor(component: IOpenIconComponent) {
    super(component);
    this._openIcon = getShadowElement(component, `.${OPEN_ICON_CONSTANTS.classes.ICON}`);
    this._iconElement = getShadowElement(component, ICON_CONSTANTS.elementName) as IIconComponent;
  }

  public setOrientation(orientation: string): void {
    if (orientation === OPEN_ICON_CONSTANTS.strings.ORIENTATION_HORIZONTAL) {
      this._iconElement.name = 'keyboard_arrow_right';
    } else {
      this._iconElement.name = 'keyboard_arrow_down';
    }
  }

  public setOpenState(open: boolean): void {
    toggleClass(this._openIcon, open, OPEN_ICON_CONSTANTS.classes.ICON_OPEN);
  }
}

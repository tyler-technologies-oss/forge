import { getShadowElement, removeClass, toggleClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { ILabelValueComponent } from './label-value';
import { LabelValueAlignment, LABEL_VALUE_CONSTANTS } from './label-value-constants';

export interface ILabelValueAdapter extends IBaseAdapter {
  setEmpty(isEmpty: boolean): void;
  setEllipsis(ellipsis: boolean): void;
  setRoomy(isRoomy: boolean): void;
  setDense(isDense: boolean): void;
  setAlignment(value: LabelValueAlignment): void;
}

export class LabelValueAdapter extends BaseAdapter<ILabelValueComponent> implements ILabelValueAdapter {
  private _rootElement: HTMLElement;

  constructor(component: ILabelValueComponent) {
    super(component);
    this._rootElement = getShadowElement(component, LABEL_VALUE_CONSTANTS.selectors.ROOT);
  }

  public setEmpty(isEmpty: boolean): void {
    if (isEmpty) {
      this._rootElement.classList.add(LABEL_VALUE_CONSTANTS.classes.EMPTY);
    } else {
      this._rootElement.classList.remove(LABEL_VALUE_CONSTANTS.classes.EMPTY);
    }
  }

  public setEllipsis(ellipsis: boolean): void {
    if (ellipsis) {
      this._rootElement.classList.add(LABEL_VALUE_CONSTANTS.classes.ELLIPSIS);
    } else {
      this._rootElement.classList.remove(LABEL_VALUE_CONSTANTS.classes.ELLIPSIS);
    }
  }

  public setRoomy(isRoomy: boolean): void {
    toggleClass(this._rootElement, isRoomy, LABEL_VALUE_CONSTANTS.classes.ROOMY);
  }

  public setDense(isDense: boolean): void {
    toggleClass(this._rootElement, isDense, LABEL_VALUE_CONSTANTS.classes.DENSE);
  }

  public setAlignment(value: LabelValueAlignment): void {
    removeClass([LABEL_VALUE_CONSTANTS.classes.ALIGN_CENTER, LABEL_VALUE_CONSTANTS.classes.ALIGN_RIGHT], this._rootElement);

    switch (value) {
      case 'center':
        this._rootElement.classList.add(LABEL_VALUE_CONSTANTS.classes.ALIGN_CENTER);
        break;
      case 'right':
        this._rootElement.classList.add(LABEL_VALUE_CONSTANTS.classes.ALIGN_RIGHT);
        break;
    }
  }
}

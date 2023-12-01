import { getShadowElement } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base';
import { IFieldComponent } from './field';
import { FieldLabelPosition, FIELD_CONSTANTS } from './field-constants';

export interface IFieldAdapter extends IBaseAdapter {
  setLabelPosition(value: FieldLabelPosition): void;
}

export class FieldAdapter extends BaseAdapter<IFieldComponent> implements IFieldAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _labelElement: HTMLElement;

  constructor(component: IFieldComponent) {
    super(component);

    this._rootElement = getShadowElement(component, FIELD_CONSTANTS.selectors.ROOT);
    this._labelElement = getShadowElement(component, FIELD_CONSTANTS.selectors.LABEL);
  }

  /**
   * Moves the label element to the start or end of the root element, ensuring that the DOM order
   * matches the visual order.
   */
  public setLabelPosition(value: FieldLabelPosition): void {
    this._labelElement.remove();

    if (value === 'inline-end') {
      this._rootElement.append(this._labelElement);
    } else {
      this._rootElement.prepend(this._labelElement);
    }
  }
}

import { BaseAdapter, IBaseAdapter } from '../core/base';
import { IFieldComponent } from './field';

export interface IFieldAdapter extends IBaseAdapter {}

export class FieldAdapter extends BaseAdapter<IFieldComponent> implements IFieldAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _labelElement: HTMLElement;
  private readonly _stateLayerElement: HTMLElement;

  constructor(component: IFieldComponent) {
    super(component);
  }
}

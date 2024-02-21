import { BaseAdapter, IBaseAdapter } from '@tylertech/forge/core';
import { IFieldComponent } from '../field';
import { IBaseField } from './base-field';

export interface IBaseFieldAdapter extends IBaseAdapter {
  click(): void;
  applyLabel(value: string | null): void;
  setFieldProperty<K extends keyof IFieldComponent>(name: K, value: IFieldComponent[K]): void;
  floatLabelWithoutAnimation(value: boolean): void;
  tryFloatLabel(force?: boolean): void;
  readonly hasValue: boolean;
  readonly hasPlaceholder: boolean;
}

export abstract class BaseFieldAdapter extends BaseAdapter<IBaseField> implements IBaseFieldAdapter {
  protected abstract _fieldElement: IFieldComponent;

  public abstract click(): void;
  public abstract applyLabel(value: string | null): void;
  public abstract tryFloatLabel(force?: boolean): void;
  public abstract get hasValue(): boolean;
  public abstract get hasPlaceholder(): boolean;
  
  public setFieldProperty<K extends keyof IFieldComponent>(name: K, value: IFieldComponent[K]): void {
    this._fieldElement[name] = value;
  }

  public floatLabelWithoutAnimation(value: boolean): void {
    this._fieldElement.floatLabelWithoutAnimation(value);
  }
}

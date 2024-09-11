import { IListAdapter } from './list-adapter';
import { LIST_CONSTANTS } from './list-constants';

export interface IListCore {
  dense: boolean;
  indented: boolean;
  selectedValue: unknown | unknown[];
  twoLine: boolean;
  threeLine: boolean;
  wrap: boolean;
  noninteractive: boolean;
}

export class ListCore implements IListCore {
  private _dense = false;
  private _indented = false;
  private _selectedValue: unknown | unknown[];
  private _twoLine = false;
  private _threeLine = false;
  private _wrap = false;
  private _noninteractive = false;

  constructor(private _adapter: IListAdapter) {}

  public initialize(): void {
    if (this._selectedValue !== undefined && this._selectedValue !== null) {
      this._adapter.setSelectedListItems(this._selectedValue);
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.setListItemsProperty('dense', this._dense);
      this._adapter.toggleHostAttribute(LIST_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  public get indented(): boolean {
    return this._indented;
  }
  public set indented(value: boolean) {
    if (this._indented !== value) {
      this._indented = value;
      this._adapter.setListItemsProperty('indented', this._indented);
      this._adapter.toggleHostAttribute(LIST_CONSTANTS.attributes.INDENTED, this._indented);
    }
  }

  public get selectedValue(): unknown | unknown[] {
    return this._selectedValue;
  }
  public set selectedValue(value: unknown | unknown[]) {
    if (this._selectedValue !== value) {
      this._selectedValue = value;
      this._adapter.setSelectedListItems(this._selectedValue);
    }
  }

  public get twoLine(): boolean {
    return this._twoLine;
  }
  public set twoLine(value: boolean) {
    if (this._twoLine !== value) {
      this._twoLine = value;
      this._adapter.setListItemsProperty('twoLine', this._twoLine);
      this._adapter.toggleHostAttribute(LIST_CONSTANTS.attributes.TWO_LINE, this._twoLine);
    }
  }

  public get threeLine(): boolean {
    return this._threeLine;
  }
  public set threeLine(value: boolean) {
    if (this._threeLine !== value) {
      this._threeLine = value;
      this._adapter.setListItemsProperty('threeLine', this._threeLine);
      this._adapter.toggleHostAttribute(LIST_CONSTANTS.attributes.THREE_LINE, this._threeLine);
    }
  }

  public get wrap(): boolean {
    return this._wrap;
  }
  public set wrap(value: boolean) {
    if (this._wrap !== value) {
      this._wrap = value;
      this._adapter.setListItemsProperty('wrap', this._wrap);
      this._adapter.toggleHostAttribute(LIST_CONSTANTS.attributes.WRAP, this._wrap);
    }
  }

  public get noninteractive(): boolean {
    return this._noninteractive;
  }
  public set noninteractive(value: boolean) {
    if (this._noninteractive !== value) {
      this._noninteractive = value;
      this._adapter.setListItemsProperty('noninteractive', this._noninteractive);
      this._adapter.toggleHostAttribute(LIST_CONSTANTS.attributes.NONINTERACTIVE, this._noninteractive);
    }
  }
}

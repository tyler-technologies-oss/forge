import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IListAdapter } from './list-adapter';
import { LIST_CONSTANTS } from './list-constants';

export interface IListFoundation extends ICustomElementFoundation {
  static: boolean;
  nonInteractive: boolean;
  disabled: boolean;
  dense: boolean;
  propagateClick: boolean;
  indented: boolean;
  selectedValue: unknown | unknown[];
  twoLine: boolean;
  threeLine: boolean;
  wrap: boolean;
}

export class ListFoundation implements IListFoundation {
  private _nonInteractive = false;
  private _disabled = false;
  private _dense = false;
  private _propagateClick = true;
  private _indented = false;
  private _selectedValue: unknown | unknown[];
  private _twoLine = false;
  private _threeLine = false;
  private _wrap = false;
  private _keydownListener: EventListener;

  constructor(private _adapter: IListAdapter) {
    this._keydownListener = this._onKeydown.bind(this);
  }

  public initialize(): void {
    this._adapter.initialize();

    if (!this._nonInteractive) {
      this._adapter.addHostListener('keydown', this._keydownListener);
    }

    if (this._selectedValue !== undefined && this._selectedValue !== null) {
      this._adapter.setSelectedListItems(this._selectedValue);
    }
  }

  private _onKeydown(evt: KeyboardEvent): void {
    const { key, altKey, ctrlKey, shiftKey, metaKey } = evt;

    if (altKey || ctrlKey || shiftKey || metaKey) {
      return;
    }

    if (key === 'Home') {
      evt.preventDefault();
      this._adapter.focusFirstListItem();
    } else if (key === 'End') {
      evt.preventDefault();
      this._adapter.focusLastListItem();
    } else if (key === 'ArrowUp') {
      evt.preventDefault();
      this._adapter.focusPreviousListItem();
    } else if (key === 'ArrowDown') {
      evt.preventDefault();
      this._adapter.focusNextListItem();
    }
  }

  public updateRole(): void {
    this._adapter.updateListItemRole();
  }

  public get static(): boolean {
    return this.nonInteractive;
  }
  public set static(value: boolean) {
    this.nonInteractive = value;
  }

  public get nonInteractive(): boolean {
    return this._nonInteractive;
  }
  public set nonInteractive(value: boolean) {
    if (this._nonInteractive !== value) {
      this._nonInteractive = value;
      this._adapter.toggleHostListener('keydown', this._keydownListener, !this._nonInteractive);
      this._adapter.updateListItems(li => li.nonInteractive = this._nonInteractive);
      this._adapter.toggleHostAttribute(LIST_CONSTANTS.attributes.STATIC, this._nonInteractive);
      this._adapter.toggleHostAttribute(LIST_CONSTANTS.attributes.NON_INTERACTIVE, this._nonInteractive);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.updateListItems(li => li.disabled = this._disabled);
      this._adapter.toggleHostAttribute(LIST_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.updateListItems(li => li.dense = this._dense);
      this._adapter.toggleHostAttribute(LIST_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  public get propagateClick(): boolean {
    return this._propagateClick;
  }
  public set propagateClick(value: boolean) {
    if (this._propagateClick !== value) {
      this._propagateClick = value;
      this._adapter.updateListItems(li => li.propagateClick = this._propagateClick);
      this._adapter.setHostAttribute(LIST_CONSTANTS.attributes.PROPAGATE_CLICK, this._propagateClick ? 'true' : 'false');
    }
  }

  public get indented(): boolean {
    return this._indented;
  }
  public set indented(value: boolean) {
    if (this._indented !== value) {
      this._indented = value;
      this._adapter.updateListItems(li => li.indented = this._indented);
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
      this._adapter.updateListItems(li => li.twoLine = this._twoLine);
      this._adapter.toggleHostAttribute(LIST_CONSTANTS.attributes.TWO_LINE, this._twoLine);
    }
  }

  public get threeLine(): boolean {
    return this._threeLine;
  }
  public set threeLine(value: boolean) {
    if (this._threeLine !== value) {
      this._threeLine = value;
      this._adapter.updateListItems(li => li.threeLine = this._threeLine);
      this._adapter.toggleHostAttribute(LIST_CONSTANTS.attributes.THREE_LINE, this._threeLine);
    }
  }

  public get wrap(): boolean {
    return this._wrap;
  }
  public set wrap(value: boolean) {
    if (this._wrap !== value) {
      this._wrap = value;
      this._adapter.updateListItems(li => li.wrap = this._wrap);
      this._adapter.toggleHostAttribute(LIST_CONSTANTS.attributes.WRAP, this._wrap);
    }
  }
}

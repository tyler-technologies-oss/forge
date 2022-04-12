import { ICustomElementFoundation, isDefined } from '@tylertech/forge-core';

import { IListAdapter } from './list-adapter';
import { LIST_CONSTANTS } from './list-constants';
import { LIST_ITEM_CONSTANTS, IListItemComponent, IListItemSelectEventData } from '../list-item';

export interface IListFoundation extends ICustomElementFoundation {
  static: boolean;
  dense: boolean;
  propagateClick: boolean;
  indented: boolean;
  selectedValue: any;
}

const ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];

/**
 * The foundation class behind the `<forge-list>` component.
 */
export class ListFoundation implements IListFoundation {
  private _static = false;
  private _dense = false;
  private _propagateClick = true;
  private _indented = false;
  private _selectedValue: any;
  private _keydownListener: (evt: KeyboardEvent) => void;

  constructor(private _adapter: IListAdapter) {
    this._keydownListener = (evt: KeyboardEvent) => this._onKeydown(evt);
  }

  public initialize(): void {
    this._adapter.initializeAccessibility();
    
    if (!this._static) {
      this._adapter.addListener('keydown', this._keydownListener);
    }

    if (this._selectedValue) {
      this._adapter.setSelectedListItems(this._selectedValue);
    }
  }

  private _onKeydown(evt: KeyboardEvent): void {
    const isArrowDown = evt.key === 'ArrowDown' || evt.keyCode === 40;
    const isArrowUp = evt.key === 'ArrowUp' || evt.keyCode === 38;
    const isHome = evt.key === 'Home' || evt.keyCode === 36;
    const isEnd = evt.key === 'End' || evt.keyCode === 35;
    const isEnter = evt.key === 'Enter' || evt.keyCode === 13;
    const isSpace = evt.key === 'Space' || evt.keyCode === 32;
    const isTab = evt.key === 'Tab' || evt.keyCode === 9;

    // We don't capture modifier keys
    if (evt.altKey || evt.ctrlKey || evt.shiftKey || evt.metaKey) {
      return;
    }

    if (!isEnter && !isSpace && !isTab) {
      this._preventDefaultEvent(evt);
    }

    if (isHome) {
      this._adapter.focusFirstListItem();
    } else if (isEnd) {
      this._adapter.focusLastListItem();
    } else if (isArrowDown) {
      this._adapter.focusNextListItem();
    } else if (isArrowUp) {
      this._adapter.focusPreviousListItem();
    } else if (isEnter || isSpace) {
      if (evt.target && (evt.target as HTMLElement).tagName.toLowerCase() === LIST_ITEM_CONSTANTS.elementName) {
        this._preventDefaultEvent(evt);
        const listItem = evt.target as IListItemComponent;
        const data: IListItemSelectEventData = {
          value: listItem.value,
          listItem
        };
        this._adapter.emitHostEvent(LIST_ITEM_CONSTANTS.events.SELECT, data);
      }
    }
  }

  /**
   * Ensures that preventDefault is only called if the containing element doesn't
   * consume the event, and it will cause an unintended scroll.
   * @param {Event} evt
   */
  private _preventDefaultEvent(evt: Event): void {
    const tagName = `${(evt.target as HTMLElement).tagName}`.toLowerCase();
    if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
      evt.preventDefault();
    }
  }

  private _setSelectedValue(value: any): void {
    let values = value instanceof Array ? value : [value];
    values = values.filter(v => isDefined(v));
    this._adapter.setSelectedListItems(values);
  }

  /** Gets/sets whether the list has all static items or not. */
  public get static(): boolean {
    return this._static;
  }
  public set static(value: boolean) {
    if (this._static !== value) {
      this._static = value;

      if (!this._static) {
        this._adapter.addListener('keydown', this._keydownListener);
      } else {
        this._adapter.removeListener('keydown', this._keydownListener);
      }

      this._adapter.updateListItems(li => li.static = this._static);

      if (this._static) {
        this._adapter.setHostAttribute(LIST_CONSTANTS.attributes.STATIC);
      } else {
        this._adapter.removeHostAttribute(LIST_CONSTANTS.attributes.STATIC);
      }
    }
  }

  /** Gets/sets whether the list has all dense items or not. */
  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.updateListItems(li => li.dense = this._dense);
      if (this._dense) {
        this._adapter.setHostAttribute(LIST_CONSTANTS.attributes.DENSE);
      } else {
        this._adapter.removeHostAttribute(LIST_CONSTANTS.attributes.DENSE);
      }
    }
  }

  public get propagateClick(): boolean {
    return this._propagateClick;
  }
  public set propagateClick(value: boolean) {
    if (this._propagateClick !== value) {
      this._propagateClick = value;
      this._adapter.updateListItems(li => li.propagateClick = this._propagateClick);
      this._adapter.setHostAttribute(LIST_CONSTANTS.attributes.PROPAGATE_CLICK, '' + !!this._propagateClick);
    }
  }

  public get indented(): boolean {
    return this._indented;
  }
  public set indented(value: boolean) {
    if (this._indented !== value) {
      this._indented = value;
      this._adapter.updateListItems(li => li.indented = this._indented);
      if (this._indented) {
        this._adapter.setHostAttribute(LIST_CONSTANTS.attributes.INDENTED);
      } else {
        this._adapter.removeHostAttribute(LIST_CONSTANTS.attributes.INDENTED);
      }
    }
  }

  public get selectedValue(): any {
    return this._selectedValue;
  }
  public set selectedValue(value: any) {
    this._selectedValue = value;
    this._setSelectedValue(value);
  }
}

import { coerceBoolean, FoundationProperty } from '@tylertech/forge-core';

import { IListDropdownAware, ListDropdownAware } from '../../list-dropdown/list-dropdown-aware';
import { IPopupComponent } from '../../popup';
import {
  BASE_SELECT_CONSTANTS, ISelectOption,
  ISelectOptionGroup,
  SelectBeforeValueChangeCallback, SelectOptionBuilder,
  SelectSelectedTextBuilder
} from './base-select-constants';
import { IBaseSelectFoundation } from './base-select-foundation';


export interface IBaseSelectComponent extends IListDropdownAware {
  value: any;
  selectedIndex: number | number[];
  options: ISelectOption[] | ISelectOptionGroup[];
  multiple: boolean;
  open: boolean;
  _internals: ElementInternals;
  optionBuilder: SelectOptionBuilder;
  selectedTextBuilder: SelectSelectedTextBuilder;
  popupElement: IPopupComponent | undefined;
  beforeValueChange: SelectBeforeValueChangeCallback<any>;
  appendOptions(options: ISelectOption[] | ISelectOption[]): void;
  selectAll(): void;
  deselectAll(): void;
}

export abstract class BaseSelectComponent<T extends IBaseSelectFoundation> extends ListDropdownAware implements IBaseSelectComponent {
  public static formAssociated = true;

  public _internals: ElementInternals;
  protected abstract _foundation: T;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  /** Gets/sets the value. */
  @FoundationProperty()
  public declare value: any;
  
  /** Gets/sets the selected index. */
  @FoundationProperty()
  public declare selectedIndex: number | number[];
  
  /** Gets/sets the available options. */
  @FoundationProperty()
  public declare options: ISelectOption[] | ISelectOptionGroup[];

  /** Gets/sets the multiple select state. */
  @FoundationProperty()
  public declare multiple: boolean;
  
  /** Gets the open state of the dropdown. */
  @FoundationProperty()
  public declare open: boolean;
  
  /** Sets the option builder callback that will be executed when building the option list in the dropdown. */
  @FoundationProperty()
  public declare optionBuilder: SelectOptionBuilder;
  
  /** Sets the selected text builder callback that will be executed when getting the selected text to display in the field. */
  @FoundationProperty()
  public declare selectedTextBuilder: SelectSelectedTextBuilder;

  /** Sets the callback to be executed when the user selects a value. */
  @FoundationProperty()
  public declare beforeValueChange: SelectBeforeValueChangeCallback<any>;

  /** Gets the popup element (when the dropdown is open). */
  @FoundationProperty({ set: false })
  public declare popupElement: IPopupComponent | undefined;
  
  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case BASE_SELECT_CONSTANTS.attributes.MULTIPLE:
        this.multiple = coerceBoolean(newValue);
        break;
      case BASE_SELECT_CONSTANTS.attributes.VALUE:
        this.value = newValue;
        break;
    }
  }

  public formResetCallback(): void {
    console.log('formResetCallback');
    const value = this.getAttribute(BASE_SELECT_CONSTANTS.attributes.VALUE);
    if (value) {
      this.value = value;
    }
  }

  public formStateRestoreCallback(state: string, reason: 'restore' | 'autocomplete'): void {
    console.log('formStateRestoreCallback', state, reason);
    if (state && reason === 'restore') {
      try {
        this.value = JSON.parse(state);
      } catch (e) {
        console.warn('[BaseSelect] Unable to restore state.', e);
      }
    }
  }

  public formAssociatedCallback(form: HTMLFormElement): void {
    console.log('formAssociatedCallback', form);
  }

  public appendOptions(options: ISelectOption[] | ISelectOptionGroup[]): void {
    this._foundation.appendOptions(options);
  }

  public selectAll(): void {
    this._foundation.selectAll();
  }
  
  public deselectAll(): void {
    this._foundation.deselectAll();
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }
}

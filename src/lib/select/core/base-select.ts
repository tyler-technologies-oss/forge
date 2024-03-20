import { coerceBoolean, FoundationProperty } from '@tylertech/forge-core';

import {
  SelectOptionBuilder,
  SelectSelectedTextBuilder,
  ISelectOption,
  ISelectOptionGroup,
  SelectBeforeValueChangeCallback,
  BASE_SELECT_CONSTANTS
} from './base-select-constants';
import { IBaseSelectFoundation } from './base-select-foundation';
import { IListDropdownAware, ListDropdownAware } from '../../list-dropdown/list-dropdown-aware';
import type { IPopoverComponent } from '../../popover/popover';


export interface IBaseSelectComponent extends IListDropdownAware {
  value: any;
  selectedIndex: number | number[];
  options: ISelectOption[] | ISelectOptionGroup[];
  multiple: boolean;
  open: boolean;
  optionBuilder: SelectOptionBuilder;
  selectedTextBuilder: SelectSelectedTextBuilder;
  popupElement: IPopoverComponent | undefined;
  beforeValueChange: SelectBeforeValueChangeCallback<any>;
  appendOptions(options: ISelectOption[] | ISelectOption[]): void;
  selectAll(): void;
  deselectAll(): void;
}

export abstract class BaseSelectComponent<T extends IBaseSelectFoundation> extends ListDropdownAware implements IBaseSelectComponent {
  protected _foundation: T;

  constructor() {
    super();
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

  /**
   * Gets the popup element (when the dropdown is open).
   * @readonly
   */
  @FoundationProperty({ set: false })
  public declare popupElement: IPopoverComponent | undefined;
  
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

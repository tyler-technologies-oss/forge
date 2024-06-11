import { coerceBoolean, coreProperty } from '@tylertech/forge-core';

import {
  SelectOptionBuilder,
  SelectSelectedTextBuilder,
  ISelectOption,
  ISelectOptionGroup,
  SelectBeforeValueChangeCallback,
  BASE_SELECT_CONSTANTS
} from './base-select-constants';
import { IBaseSelectCore } from './base-select-core';
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

export abstract class BaseSelectComponent<T extends IBaseSelectCore> extends ListDropdownAware implements IBaseSelectComponent {
  protected _core: T;

  constructor() {
    super();
  }

  /**
   * Gets/sets the value.
   * @attribute
   */
  @coreProperty()
  public declare value: any;

  /**
   * Gets/sets the selected index.
   * @attribute selected-index
   */
  @coreProperty()
  public declare selectedIndex: number | number[];

  /**
   * Gets/sets the available options.
   */
  @coreProperty()
  public declare options: ISelectOption[] | ISelectOptionGroup[];

  /**
   * Gets/sets the multiple select state.
   * @attribute
   */
  @coreProperty()
  public declare multiple: boolean;

  /**
   * Gets the open state of the dropdown.
   * @attribute
   */
  @coreProperty()
  public declare open: boolean;

  /**
   * Sets the option builder callback that will be executed when building the option list in the dropdown.
   */
  @coreProperty()
  public declare optionBuilder: SelectOptionBuilder;

  /**
   * Sets the selected text builder callback that will be executed when getting the selected text to display in the field.
   */
  @coreProperty()
  public declare selectedTextBuilder: SelectSelectedTextBuilder;

  /**
   * Sets the callback to be executed when the user selects a value.
   */
  @coreProperty()
  public declare beforeValueChange: SelectBeforeValueChangeCallback<any>;

  /**
   * Gets the popup element (when the dropdown is open).
   * @readonly
   */
  @coreProperty({ set: false })
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

  /** Dynamically appends options to the dropdown while it's open. */
  public appendOptions(options: ISelectOption[] | ISelectOptionGroup[]): void {
    this._core.appendOptions(options);
  }

  /** Selects all options. */
  public selectAll(): void {
    this._core.selectAll();
  }

  /** Deselects all options. */
  public deselectAll(): void {
    this._core.deselectAll();
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.disconnect();
  }
}

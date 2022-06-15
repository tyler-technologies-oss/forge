import { debounce, isDefined, isString, Platform, isDeepEqual, randomChars } from '@tylertech/forge-core';
import { highlightTextHTML } from '../core';
import { IListItemComponent } from '../list';
import { IListDropdownConfig, IListDropdownOption, ListDropdownAsyncStyle, ListDropdownFooterBuilder, ListDropdownHeaderBuilder } from '../list-dropdown';
import { IListDropdownAwareFoundation, ListDropdownAwareFoundation } from '../list-dropdown/list-dropdown-aware-foundation';
import { IOption, IOptionGroup } from '../select';
import { IAutocompleteAdapter } from './autocomplete-adapter';
import { AutocompleteFilterCallback, AutocompleteMode, AutocompleteOptionBuilder, AutocompleteSelectedTextBuilder, AUTOCOMPLETE_CONSTANTS, IAutocompleteOptionGroup, IAutocompleteSelectEventData } from './autocomplete-constants';
import { getSelectedOption, isOptionType, optionEqualPredicate, OptionType } from './autocomplete-utils';

export interface IAutocompleteFoundation extends IListDropdownAwareFoundation {
  mode: AutocompleteMode;
  multiple: boolean;
  value: string | string[] | IOption | IOption[] | null;
  debounce: number;
  filterOnFocus: boolean;
  allowUnmatched: boolean;
  popupTarget: string;
  optionBuilder: AutocompleteOptionBuilder;
  filter: AutocompleteFilterCallback;
  selectedTextBuilder: AutocompleteSelectedTextBuilder;
  isInitialized: boolean;
  open: boolean;
  matchKey: string | null;
  appendOptions(options: IOption[] | IAutocompleteOptionGroup[]): void;
  beforeValueChange: (value: any) => boolean | Promise<boolean>;
}

/**
 * The foundation class behind the `<forge-autocomplete>` element.
 */
export class AutocompleteFoundation extends ListDropdownAwareFoundation implements IAutocompleteFoundation {
  private _isInitialized = false;
  private _isDropdownOpen = false;
  private _mode: AutocompleteMode = AutocompleteMode.Default;
  private _multiple = false;
  private _debounce = AUTOCOMPLETE_CONSTANTS.numbers.DEFAULT_DEBOUNCE_TIME;
  private _allowUnmatched = false;
  private _popupTarget: string;
  private _filterOnFocus = true;
  private _optionBuilder: AutocompleteOptionBuilder;
  private _filter: AutocompleteFilterCallback;
  private _selectedTextBuilder: AutocompleteSelectedTextBuilder;
  private _options: IOption[] | IAutocompleteOptionGroup[] = [];
  private _filterText = '';
  private _selectedOptions: IOption[] = [];
  private _values: any[] = [];
  private _pendingFilterPromises: Array<Promise<IOption[] | IOptionGroup[]>> = [];
  private _identifier: string;
  private _matchKey: string | null = null;
  private _filterFn: () => Promise<void>;
  private _clickListener: (evt: MouseEvent) => void;
  private _focusListener: (evt: FocusEvent) => void;
  private _blurListener: (evt: FocusEvent) => void;
  private _inputListener: (evt: KeyboardEvent) => void;
  private _keydownListener: (evt: KeyboardEvent) => void;
  private _dropdownIconClickListener: (evt: MouseEvent) => void;
  private _dropdownIconMouseDownListener: (evt: MouseEvent) => void;
  private _clearButtonListener: (evt: MouseEvent) => void;
  private _dropdownScrollEndListener: () => void;
  private _dismissListener: () => void;
  private _activeChangeListener: (id: string) => void;
  private _targetWidthCallback: () => number;
  private _optionBuilderCallback: (option: IListDropdownOption, parentElement: HTMLElement) => HTMLElement;
  private _beforeValueChange: (value: any) => boolean | Promise<boolean>;
  private _valueChanging: Promise<boolean> | undefined;

  constructor(private _adapter: IAutocompleteAdapter) {
    super();
    this._clickListener = evt => this._onClick(evt);
    this._focusListener = () => this._onFocus();
    this._blurListener = evt => this._onBlur(evt);
    this._keydownListener = evt => this._onKeydown(evt);
    this._dropdownIconClickListener = evt => this._onDropdownIconClick(evt);
    this._dropdownScrollEndListener = () => this._onDropdownScrollEnd();
    this._dropdownIconMouseDownListener = evt => this._onDropdownIconMouseDown(evt);
    this._clearButtonListener = evt => this._onClear(evt);
    this._dismissListener = () => this._onDismiss();
    this._activeChangeListener = id => this._adapter.updateActiveDescendant(id);
    this._targetWidthCallback = () => this._adapter.getTargetElementWidth(this._popupTarget);
    this._optionBuilderCallback = (option: IListDropdownOption, parentElement: HTMLElement) => {
      return this._optionBuilder(option, this._filterText, parentElement as IListItemComponent);
    };
    this._identifier = randomChars();
  }

  public async initialize(): Promise<void> {
    if (!this._adapter.hasInputElement() && !this._adapter.setInputElement()) {
      throw new Error('An input element is required as a child of the autocomplete component.');
    }

    this._setInputListener();
    this._setFilterCallback();
    this._attachListeners();
    this._initializeAccessibility();

    if (this._values.length) {
      if (!this._selectedOptions.length) {
        try {
          await this._executeFilter();
        } catch (e) {
          console.error(e);
        }
        this._updateSelectedOptions(this._values);
      }
      this._adapter.setSelectedText(this._getSelectedText());
    }

    this._isInitialized = true;
  }

  public disconnect(): void {
    if (this._isInitialized) {
      this._detachListeners();
      this._isInitialized = false;
    }
    if (this._isDropdownOpen) {
      this._closeDropdown();
    }
  }

  private _attachListeners(): void {
    this._adapter.addInputListener('click', this._clickListener);
    this._adapter.addInputListener('focus', this._focusListener);
    this._adapter.addInputListener('blur', this._blurListener);
    this._adapter.addInputListener('input', this._inputListener);
    this._adapter.addInputListener('keydown', this._keydownListener);
    this._adapter.setDropdownIconListener('click', this._dropdownIconClickListener);
    this._adapter.setDropdownIconListener('mousedown', this._dropdownIconMouseDownListener);
    this._adapter.setClearButtonListener('click', this._clearButtonListener);
  }

  private _detachListeners(): void {
    this._adapter.removeInputListener('click', this._clickListener);
    this._adapter.removeInputListener('focus', this._focusListener);
    this._adapter.removeInputListener('blur', this._blurListener);
    this._adapter.removeInputListener('input', this._inputListener);
    this._adapter.removeInputListener('keydown', this._keydownListener);
    this._adapter.removeDropdownIconListener('click', this._dropdownIconClickListener);
    this._adapter.removeDropdownIconListener('mousedown', this._dropdownIconMouseDownListener);
    this._adapter.removeClearButtonListener('click', this._clearButtonListener);
  }

  private _setInputListener(): void {
    this._inputListener = (evt: KeyboardEvent) => this._onInput(evt);
  }

  private _setFilterCallback(): void {
    this._filterFn = isDefined(this._debounce) && this._debounce > 0 ? debounce(this._debounceFilter, this._debounce, false) : this._debounceFilter;
  }

  private _initializeAccessibility(): void {
    this._adapter.intializeInputAccessibility(this._identifier);
  }

  private get _flatOptions(): IOption[] {
    if (isOptionType(this._options, OptionType.Group)) {
      return (this._options as IAutocompleteOptionGroup[]).reduce((previousValue, currentValue) => previousValue.concat(currentValue.options), [] as IOption[]) as IOption[];
    }
    return this._options as IOption[];
  }

  private _onClick(evt: MouseEvent): void {
    if (!this._isDropdownOpen && this._filterOnFocus) {
      this._showDropdown();
    }
  }

  private _onDropdownIconMouseDown(evt: MouseEvent): void {
    evt.preventDefault(); // Always avoid changing focus when clicking the dropdown
  }

  private _onDropdownIconClick(evt: MouseEvent): void {
    if (!this._isDropdownOpen) {
      this._adapter.focus();
      window.requestAnimationFrame(() => this._showDropdown());
    } else {
      this._closeDropdown();
    }
  }

  private _onClear(evt: MouseEvent): void {
    if (!this._selectedOptions.length) {
      return;
    }
    this._clearValue();
    this._adapter.setSelectedText(this._getSelectedText());
  }

  private _onDropdownScrollEnd(): void {
    this._adapter.emitHostEvent(AUTOCOMPLETE_CONSTANTS.events.SCROLLED_BOTTOM);
  }

  private _onFocus(): void {
    if (!this._isDropdownOpen && this._adapter.getInputValue() && !Platform.isMobile) {
      this._adapter.selectInputValue();
    }
  }

  private _onBlur(evt: FocusEvent): void {
    // If the blur event was triggered by an element within the popup then ignore it
    if (this._adapter.isFocusWithinPopup(evt.relatedTarget as HTMLElement)) {
      return;
    }

    this._applyBlur();
  }

  private _applyBlur(): void {
    if (this._isDropdownOpen) {
      this._closeDropdown();
    }

    // If we are in stateless mode, we don't need to do anything further
    if (this._mode === AutocompleteMode.Stateless) {
      return;
    }

    if (!this._selectedOptions.length) {
      if (!this._allowUnmatched) {
        this._filterText = '';
        this._adapter.setSelectedText('');
      }
    } else {
      this._adapter.setSelectedText(this._getSelectedText());
    }
  }

  private _onInput(evt: KeyboardEvent): void {
    if (this._selectedOptions.length && !this._multiple && (!this._adapter.getInputValue() || this._allowUnmatched) && !this._adapter.isWrappingChipField()) {
      this._selectedOptions = [];
      this._values = [];
      this._emitChangeEvent();
    }
    this._filterText = this._adapter.getInputValue();
    this._filterFn();
  }

  private async _debounceFilter(): Promise<void> {
    // There is the potential that the user could have started a filter, then moved focus to another element
    // while a debounced filter is running. This check detects that scenario and stops all pending filters.
    if (!this._adapter.hasFocus()) {
      this._pendingFilterPromises = [];
      if (this._isDropdownOpen) {
        this._closeDropdown();
      }
      return;
    }

    // Keep track of these variables so we can use them when each filter callback completes
    const filterText = this._filterText; // Filter text just before the execution
    const filterPromise = this._executeFilter(); // Execute the filter and keep track of the filter promise object for use after it resolves

    // Keep track of all pending promises
    this._pendingFilterPromises.push(filterPromise);

    // If the dropdown is open, show the spinner and execute the filter. If not open, then we need to
    // show the dropdown (which will handle showing the spinner and executing the filter for us) so
    // we use the promise from that method instead.
    if (this._isDropdownOpen) {
      this._adapter.setBusyVisibility(true);
    } else {
      this._showDropdown({ filter: false });
    }

    try {
      await filterPromise;
    } catch {
      // When an exception occurs, we just flush the pending promises and clean up
      this._pendingFilterPromises = [];
      if (this._isDropdownOpen) {
        this._closeDropdown();
      }
      return;
    }

    // We only continue if the filter text before this result matches the latest filter text
    if (filterText === this._filterText) {
      this._pendingFilterPromises = [];
      this._onFilterComplete();
    } else {
      // If this is not the latest filter result, we ignore it and remove it from the pending promises
      const promiseIndex = this._pendingFilterPromises.indexOf(filterPromise);
      if (promiseIndex !== -1) {
        this._pendingFilterPromises.splice(promiseIndex, 1);
      }
    }
  }

  private _onKeydown(evt: KeyboardEvent): void {
    switch (evt.key) {
      case 'Tab':
        if (this._isDropdownOpen && !this._multiple) {
          this._selectActiveOption(false);
        }
        break;
      case 'Esc':
      case 'Escape':
        if (this._isDropdownOpen) {
          evt.preventDefault();
          this._closeDropdown();
        }
        break;
      case 'Down':
      case 'ArrowDown':
        evt.preventDefault();
        if (!this._isDropdownOpen) {
          this._showDropdown({ activateFirst: true });
        } else {
          this._adapter.propagateKey(evt.key);
        }
        break;
      case 'Up':
      case 'ArrowUp':
        evt.preventDefault();
        if (this._isDropdownOpen) {
          this._adapter.propagateKey(evt.key);
        }
        break;
      case 'Enter':
      case 'Home':
      case 'End':
        if (this._isDropdownOpen) {
          if (evt.key === 'Enter') {
            evt.stopPropagation();
          }
          evt.preventDefault();
          this._adapter.propagateKey(evt.key);
        }
        break;
      case 'Backspace':
      case 'Delete':
        const input = evt.target as HTMLInputElement;
        const value = this._adapter.getInputValue();
        const isRemovingAllChars = input.value.substring(input.selectionStart as number, input.selectionEnd as number) === input.value;
        const isBackspacingLastChar = value.length === 1 && input.selectionEnd === 1;
        const isDeletingLastChar = value.length === 1 && input.selectionEnd === 0;
        const isEmpty = !value || isRemovingAllChars || isBackspacingLastChar || isDeletingLastChar;
        
        // We only clear the value on empty when not around a chip-field and NOT in multiple mode
        if (!this._adapter.isWrappingChipField() && isEmpty && !this._multiple && this._values.length) {
          this._clearValue();
        }
        break;
    }
  }

  private _executeFilter(sendFilterText = true, sendValue = false): Promise<IOption[] | IAutocompleteOptionGroup[]> {
    if (!this._filter || typeof this._filter !== 'function') {
      throw new Error('A filter callback must be provided. Did you set the "filter" property?');
    }

    const filterText = sendFilterText ? this._filterText : '';
    const value = sendValue ? this._getValue() : null;

    return new Promise<IOption[] | IAutocompleteOptionGroup[]>((resolve, reject) => {
      return Promise.resolve(this._filter(filterText, value))
        .then(options => {
          this._options = options;
          resolve(this._options);
        })
        .catch(e => reject(`An unexpected error occurred while filtering: ${e}`));
    });
  }

  private _onFilterComplete(): void {
    if (!this._adapter.hasFocus()) {
      if (this._isDropdownOpen) {
        this._closeDropdown();
      }
      return;
    }

    if (this._options.length) {
      const sendFilterText = this._allowUnmatched && !this._selectedOptions.length;
      this._dropdownReady({ userTriggered: sendFilterText });
      if (this._filterText) {
        this._adapter.activateFirstOption();
      }
    } else {
      this._closeDropdown();
    }
  }

  private _clearValue(): void {
    this._selectedOptions = [];
    this._values = [];

    if (this._isDropdownOpen) {
      this._adapter.setSelectedOptions([]);
      this._adapter.clearActiveOption();
    }

    this._emitChangeEvent();
  }

  private async _showDropdown({ filter = true, userTriggered = true, activateFirst = false } = {}): Promise<void> {
    const sendFilterText = this._allowUnmatched && !this._selectedOptions.length;
    this._isDropdownOpen = true;
    const config: IListDropdownConfig = {
      options: this._options,
      multiple: this._multiple,
      selectedValues: [...this._values],
      id: `forge-autocomplete-${this._identifier}`,
      asyncStyle: ListDropdownAsyncStyle.Skeleton,
      optionLimit: this._optionLimit,
      popupClasses: this._popupClasses,
      headerBuilder: this._popupHeaderBuilder,
      footerBuilder: this._popupFooterBuilder,
      transform: label => {
        if (this._filterText) {
          // Highlight the filter text within the label
          const highlightElement = highlightTextHTML(label, this._filterText);
          if (highlightElement) {
            return highlightElement;
          }
        }
        return label;
      },
      allowBusy: true,
      optionBuilder: !!this._optionBuilder ? this._optionBuilderCallback : undefined,
      syncWidth: this._syncPopupWidth,
      observeScroll: this._observeScroll,
      observeScrollThreshold: this._observeScrollThreshold,
      scrollEndListener: this._dropdownScrollEndListener,
      activeChangeCallback: this._activeChangeListener,
      targetWidthCallback: this._targetWidthCallback,
      selectCallback: (value: any) => this._onSelect(value),
      closeCallback: () => this._closeDropdown()
    };

    this._adapter.show(config, this._popupTarget);
    this._adapter.toggleHostAttribute(AUTOCOMPLETE_CONSTANTS.attributes.OPEN, this._isDropdownOpen);

    if (filter) {
      if (this._options.length) {
        this._adapter.setBusyVisibility(true);
      }
      try {
        await this._executeFilter(sendFilterText);
      } catch (e) {
        console.error(e);
      }
      this._updateSelectedOptions(this._values);
    }

    // If we have any pending filter promises, then we will let those complete and update the dropdown separately after
    if (this._pendingFilterPromises.length) {
      return;
    }

    this._dropdownReady({ userTriggered, activateFirst });
  }

  private _dropdownReady({ userTriggered = true, activateFirst = false} = {}): void {
    if (!this._isDropdownOpen || !this._options.length || (userTriggered && !this._adapter.hasFocus())) {
      this._closeDropdown();
      return;
    }

    this._sortSelectedOptions();
    this._adapter.setBusyVisibility(false);
    this._adapter.setOptions(this._options);
    this._adapter.setDismissListener(this._dismissListener);

    if (activateFirst) {
      this._adapter.activateFirstOption();
    }
  }

  private _closeDropdown(): void {
    if (this._multiple) {
      this._filterText = '';
    }
    this._isDropdownOpen = false;
    this._adapter.hide(this._dismissListener);
    this._sortSelectedOptions();
    this._adapter.toggleHostAttribute(AUTOCOMPLETE_CONSTANTS.attributes.OPEN, this._isDropdownOpen);
  }

  private _sortSelectedOptions(): void {
    // When in multiple selection mode, we need to make sure that the selected options appear at the top of the list
    if (this._multiple && this._selectedOptions.length && isOptionType(this._options, OptionType.Option)) {
      const selectedOptions: IOption[] = [];
      const unselectedOptions: IOption[] = [];

      (this._options as IOption[]).forEach(option => {
        if (this._selectedOptions.find(o => optionEqualPredicate(o, option.value, this._matchKey))) {
          selectedOptions.push(option);
        } else {
          unselectedOptions.push(option);
        }
      });

      this._options = [...selectedOptions, ...unselectedOptions];
    }
  }

  /**
   * Handles selecting an item in the dropdown.
   * @param {string} selectedValue The string value to select.
   */
  private async _onSelect(selectedValue: string, keepFocus = true): Promise<void> {
    if (this._valueChanging) {
      return;
    }

    // If we are in stateless mode, then we need to just emit an event when selecting an option. The
    // selected values are not tracked in stateless mode
    if (this._mode === AutocompleteMode.Stateless) {
      const data: IAutocompleteSelectEventData = { value: selectedValue };
      const result = this._adapter.emitHostEvent(AUTOCOMPLETE_CONSTANTS.events.SELECT, data, true, true);
      if (result) {
        this._filterText = '';
        this._closeDropdown();
      }
      return;
    }

    const select = (): void => {
      const flatOptions = this._flatOptions;
      const option = flatOptions.find(o => optionEqualPredicate(o, selectedValue, this._matchKey)) as IOption;
      const value = option ? option.value : '';
      const label = option ? option.label : '';

      if (this._multiple) {
        const optionIndex = flatOptions.findIndex(o => optionEqualPredicate(o, selectedValue, this._matchKey));
        if (optionIndex >= 0) {
          const selected = this._selectedOptions.some(o => optionEqualPredicate(o, selectedValue, this._matchKey));
          this._adapter.toggleOptionMultiple(optionIndex, selected);
        }
        const selectedOption = getSelectedOption(this._selectedOptions, value);
        if (selectedOption) {
          const index = this._selectedOptions.indexOf(selectedOption);
          this._selectedOptions.splice(index, 1);
        } else {
          this._selectedOptions.push(option);
        }
      } else {
        if (isDefined(value)) {
          this._selectedOptions[0] = option;
          this._filterText = label;
        } else {
          this._selectedOptions = [];
          this._filterText = '';
        }
      }

      // Update the dropdown selection status if its open
      if (this._isDropdownOpen) {
        this._adapter.setSelectedOptions(this._selectedOptions);
      }

      // Keep the values in sync with the currently selected options
      this._values = this._selectedOptions.map(o => o.value);

      // Update the selected text in the input
      this._adapter.setSelectedText(this._getSelectedText());

      // Select the text in the input to allow for the next filter
      if (!Platform.isMobile && keepFocus) {
        this._adapter.selectInputValue();
      }

      if (this._multiple) {
        // If we're in multiselect mode, we need to toggle the selected option
        const index = flatOptions.findIndex(o => optionEqualPredicate(o, selectedValue, this._matchKey));
        const isSelected = this._values.includes(selectedValue);
        this._adapter.toggleOptionMultiple(index, isSelected);
      }

      this._emitChangeEvent();
    };

    // We close the dropdown immediately if in single selection mode
    if (this._isDropdownOpen && !this._multiple) {
      this._closeDropdown();
    }

    if (typeof this._beforeValueChange === 'function') {
      this._valueChanging = Promise.resolve(this._beforeValueChange.call(null, selectedValue, this._matchKey));
      const shouldContinue = await this._valueChanging;
      if (shouldContinue) {
        select();
      }
      this._valueChanging = undefined;
    } else {
      select();
    }
  }

  private _selectActiveOption(keepFocus = true): void {
    const activeOptionIndex = this._adapter.getActiveOptionIndex();
    if (typeof activeOptionIndex === 'number' && activeOptionIndex >= 0) {
      const option = this._flatOptions[activeOptionIndex];
      if (option) {
        this._onSelect(option.value, keepFocus);
      }
    }
  }

  private _emitChangeEvent(): void {
    this._adapter.emitHostEvent(AUTOCOMPLETE_CONSTANTS.events.CHANGE, this._getValue(), true);
  }

  /**
   * Retrieves the current value(s) from the selected options array based on whether
   * we are in multi-select mode or not.
   */
  private _getValue(): string | string[] | null {
    if (!this._values) {
      return null;
    }

    if (!this._values.length) {
      return this._multiple ? [] : null;
    }

    return this._multiple ? [...this._values] : this._values[0];
  }

  /**
   * Creates the selected text value from the selected label values.
   */
  private _getSelectedText(): string {
    if (this._adapter.isWrappingChipField()) {
      return '';
    }

    if (this._selectedTextBuilder) {
      return this._selectedTextBuilder(this._selectedOptions);
    } else {
      if (this._multiple) {
        if (this._values.length) {
          return `${this._values.length} ${this._values.length === 1 ? 'option' : 'options'} selected`;
        } else {
          return '';
        }
      } else {
        return this._selectedOptions.filter(o => o && o.label).map(o => o.label).join(' ').trim();
      }
    }
  }

  /**
     * Handles the user dismissing the dropdown. This is only called if the blur event was triggered
     * from within the popup element itself (in a custom template most likely).
     * @param keepFocus Keep focus on the dropdown or not.
     */
  private _onDismiss(): void {
    this._closeDropdown();
  }

  private async _applyValue(value: string | string[] | IOption | IOption[] | null): Promise<void> {
    let values: any[] = [];
    this._selectedOptions = [];

    if (!Array.isArray(value)) {
      values = isDefined(value) ? [value] : [];
    } else {
      values = value;
    }

    // If this is not a multi-select, then make sure we only allow one selected value
    if (!this._multiple && values.length > 1) {
      values = [values[0]];
    }

    if (isOptionType(values, OptionType.Option)) {
      this._values = values.map((o: IOption) => o.value);
      this._selectedOptions = values as IOption[];
    } else {
      this._values = values as any[];
    }

    // Ensure that the values passed are actually existing options
    const allOptions = this._flatOptions;
    if (values.length && allOptions.length) {
      this._updateSelectedOptions(values);
    }

    // Execute the filter now if we have a value, but not options yet (only if it has been initialized already)
    if (this._values.length && !this._selectedOptions.length && this._filter && this._isInitialized) {
      try {
        await this._executeFilter(false, true);
      } catch (e) {
        console.error(e);
      }
      this._updateSelectedOptions(this._values);
    }

    // Update filter text to match the label when on in multiselect mode
    if (!this._multiple) {
      this._filterText = this._selectedOptions.length ? this._selectedOptions[0].label : '';
    } else {
      this._filterText = '';
    }

    // Update the state of the component based on the existence of a selected value
    if (this._isInitialized) {
      this._adapter.setSelectedText(this._getSelectedText());
    }

    // When the value is changed programatically we should update the selected options
    if (this._isDropdownOpen) {
      this._adapter.setSelectedOptions(this._selectedOptions);
    }
  }

  private _updateSelectedOptions(values: Array<any | IOption>): void {
    const flatOptions = [...this._flatOptions, ...this._selectedOptions];

    if (this._selectedOptions.length) {
      this._selectedOptions = [];
    }

    if (isOptionType(values, OptionType.Option)) {
      for (const option of values as IOption[]) {
        const actualOption = flatOptions.find(o => optionEqualPredicate(o, option.value, this._matchKey));
        if (actualOption) {
          this._selectedOptions.push(actualOption);
        } else {
          this._selectedOptions.push(option);
        }
      }
    } else {
      for (const value of values as any[]) {
        const actualOption = flatOptions.find(o => optionEqualPredicate(o, value, this._matchKey));
        if (actualOption) {
          this._selectedOptions.push(actualOption);
        } else if (this._allowUnmatched) {
          this._selectedOptions.push({ label: value, value });
        }
      }
    }
  }

  /** Gets/sets the mode state. */
  public get mode(): AutocompleteMode {
    return this._mode;
  }
  public set mode(value: AutocompleteMode) {
    if (this._mode !== value) {
      this._mode = value;
      if (this._mode === AutocompleteMode.Stateless) {
        this._selectedOptions = [];
        if (this._isDropdownOpen) {
          this._closeDropdown();
        }
      }
      this._adapter.setHostAttribute(AUTOCOMPLETE_CONSTANTS.attributes.MODE, this._mode);
    }
  }

  /** Gets/sets the multi-select state. */
  public get multiple(): boolean {
    return this._multiple;
  }
  public set multiple(value: boolean) {
    if (this._multiple !== value) {
      this._multiple = value;
      this._adapter.setHostAttribute(AUTOCOMPLETE_CONSTANTS.attributes.MULTIPLE, isDefined(this._multiple) ? this._multiple.toString() : '');
    }
  }

  /** Gets/sets the value of the component. */
  public get value(): string | string[] | IOption | IOption[] | null {
    return this._getValue();
  }
  public set value(value: string | string[] | IOption | IOption[] | null) {
    let values: Array<string | IOption | IOption[] | string[]> = [];

    if (value === null || value === undefined) {
      values = [];
    } else if (Array.isArray(value)) {
      values = JSON.parse(JSON.stringify(value));
    } else if (isString(value)) {
      values = [value];
    } else {
      values = [JSON.parse(JSON.stringify(value))];
    }

    const hasNewValue = values.length !== this._values.length || values.some(v => !this._values.includes(v));
    if (!hasNewValue) {
      return;
    }

    // We only apply the new values if they have actually changed
    this._applyValue(value);
  }


  /** Gets/sets filter on focus settings which controls whether the dropdown displays automatically when focused. */
  public get filterOnFocus(): boolean {
    return this._filterOnFocus;
  }
  public set filterOnFocus(value: boolean) {
    if (this._filterOnFocus !== value) {
      this._filterOnFocus = value;
      this._adapter.setHostAttribute(AUTOCOMPLETE_CONSTANTS.attributes.FILTER_ON_FOCUS, isDefined(this._filterOnFocus) ? this._filterOnFocus.toString() : '');
    }
  }

  /** Controls whether unmatched text entered by the user will stay visible an option in the dropdown is not found. */
  public get allowUnmatched(): boolean {
    return this._allowUnmatched;
  }
  public set allowUnmatched(value: boolean) {
    if (this._allowUnmatched !== value) {
      this._allowUnmatched = value;

      if (isDefined(this._allowUnmatched)) {
        this._adapter.setHostAttribute(AUTOCOMPLETE_CONSTANTS.attributes.ALLOW_UNMATCHED, this._allowUnmatched.toString());
      }
    }
  }

  /** Gets/sets the property key to match the value to an option.  */
  public get matchKey(): string | null {
    return this._matchKey;
  }
  public set matchKey(value: string | null) {
    if (this._matchKey !== value) {
      this._matchKey = value;
    }
  }

  /** Gets/sets the selector that will be used to find an element to attach the popup to. Defaults to the input element. */
  public get popupTarget(): string {
    return this._popupTarget;
  }
  public set popupTarget(value: string) {
    if (this._popupTarget !== value) {
      this._popupTarget = value;
    }
  }

  /** Gets/sets the list of classes to apply to the popup element. */
  public get popupClasses(): string | string[] {
    return Array.isArray(this._popupClasses) ? [...this._popupClasses] : [this._popupClasses];
  }
  public set popupClasses(value: string | string[]) {
    if (this._popupClasses !== value) {
      this._popupClasses = Array.isArray(value) ? [...value] : [value];
    }
  }

  /** Gets/sets the builder callback to use for the popup header. */
  public set popupHeaderBuilder(value: ListDropdownHeaderBuilder) {
    this._popupHeaderBuilder = value;
  }

  /** Gets/sets the builder callback to use for the popup footer. */
  public set popupFooterBuilder(value: ListDropdownFooterBuilder) {
    this._popupFooterBuilder = value;
  }

  /** Gets/sets whether the popup width is synchronized with the popup target. */
  public get syncPopupWidth(): boolean {
    return this._syncPopupWidth;
  }
  public set syncPopupWidth(value: boolean) {
    if (this._syncPopupWidth !== value) {
      this._syncPopupWidth = value;
    }
  }

  /** Gets/sets the maximum number of options to display in the dropdown. */
  public get optionLimit(): number {
    return this._optionLimit;
  }
  public set optionLimit(value: number) {
    if (this._optionLimit !== value) {
      this._optionLimit = value;
    }
  }

  /** Gets/sets the debounce delay (milliseconds) for keyboard events. */
  public get debounce(): number {
    return this._debounce;
  }
  public set debounce(value: number) {
    if (this._debounce !== value) {
      this._debounce = value;

      if (this._isInitialized) {
        this._setFilterCallback();
      }

      this._adapter.setHostAttribute(AUTOCOMPLETE_CONSTANTS.attributes.DEBOUNCE, isDefined(this._debounce) ? this._debounce.toString() : '');
    }
  }

  /** Sets the item builder callback that will be executed when building the option list in the dropdown. */
  public get optionBuilder(): AutocompleteOptionBuilder {
    return this._optionBuilder;
  }
  public set optionBuilder(fn: AutocompleteOptionBuilder) {
    this._optionBuilder = fn;
  }

  /** Sets the filter callback that will be executed when fetching options for the autocomplete dropdown. */
  public get filter(): AutocompleteFilterCallback {
    return this._filter;
  }
  public set filter(cb: AutocompleteFilterCallback) {
    if (this._filter !== cb) {
      this._filter = cb;

      // If we have a value, but don't have any options yet then execute the filter
      if (this._isInitialized && this._values.length && !this._flatOptions.length && this._filter) {
        this._executeFilter().then(() => {
          this._updateSelectedOptions(this._values);
          this._adapter.setSelectedText(this._getSelectedText());
        });
      }
    }
  }

  /** Sets the selected text builder callback that will be executed when getting the selected text. */
  public get selectedTextBuilder(): AutocompleteSelectedTextBuilder {
    return this._selectedTextBuilder;
  }
  public set selectedTextBuilder(fn: AutocompleteSelectedTextBuilder) {
    this._selectedTextBuilder = fn;

    // If there are selected options, set the selected text again
    if (this._selectedOptions.length) {
      this._adapter.setSelectedText(this._getSelectedText());
    }
  }

  public get observeScroll(): boolean {
    return this._observeScroll;
  }
  public set observeScroll(value: boolean) {
    this._observeScroll = value;
  }

  public get observeScrollThreshold(): number {
    return this._observeScrollThreshold;
  }
  public set observeScrollThreshold(value: number) {
    this._observeScrollThreshold = value;
  }

  public appendOptions(options: IOption[] | IAutocompleteOptionGroup[]): void {
    if (!this._isDropdownOpen) {
      return;
    }
    this._options = [...this._options, ...options] as IOption[] | IAutocompleteOptionGroup[];
    this._adapter.appendOptions(options);
  }

  public get isInitialized(): boolean {
    return this._isInitialized;
  }

  public get open(): boolean {
    return this._isDropdownOpen;
  }
  public set open(value: boolean) {
    if (this._isDropdownOpen !== value) {
      if (value) {
        this._showDropdown({ userTriggered: false });
      } else {
        this._closeDropdown();
      }
    }
  }

  public get beforeValueChange(): (value: any) => boolean | Promise<boolean> {
    return this._beforeValueChange;
  }
  public set beforeValueChange(value: (value: any) => boolean | Promise<boolean>) {
    if (value !== this._beforeValueChange) {
      this._beforeValueChange = value;
    }
  }

  public get popupElement(): HTMLElement | null {
    return this._adapter.getPopupElement();
  }
}
